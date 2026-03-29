import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:8080";

async function handler(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  const pathname = path.join("/");
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const contentType = request.headers.get("Content-Type");

  const headers: HeadersInit = {
    ...(contentType && { "Content-Type": contentType }),
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
  };

  const hasBody = !["GET", "HEAD"].includes(request.method);
  const body = hasBody ? await request.text() : undefined;

  //${BACKEND_URL} _ 추가예정

  console.log("백엔드 요청 URL:", `${BACKEND_URL}/${pathname}`);
  const backendRes = await fetch(`${BACKEND_URL}/${pathname}`, {
    method: request.method,
    headers,
    body,
  });

  if (backendRes.status === 401) {
    const refreshToken = cookieStore.get("refreshToken")?.value;

    const refreshRes = await fetch(`${BACKEND_URL}/api/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (!refreshRes.ok) {
      return NextResponse.json({ message: "" }, { status: 401 });
    }

    const { accessToken: newAccessToken } = await refreshRes.json();

    const retryRes = await fetch(`${BACKEND_URL}/${pathname}`, {
      method: request.method,
      headers: {
        ...headers,
        Authorization: `Bearer ${newAccessToken}`,
      },
      body,
    });

    const data = await retryRes.json();
    const res = NextResponse.json(data, { status: retryRes.status });

    res.cookies.set("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return res;
  }

  const data = await backendRes.json();
  return NextResponse.json(data, { status: backendRes.status });
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
