import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

async function handler(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  const pathname = path.join("/");
  const { searchParams } = new URL(request.url);
  const queryString = searchParams.toString();
  const url = queryString
    ? `${process.env.BACKEND_URL}/${pathname}?${queryString}`
    : `${process.env.BACKEND_URL}/${pathname}`;

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const contentType = request.headers.get("Content-Type");

  const headers: HeadersInit = {
    ...(contentType && { "Content-Type": contentType }),
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
  };

  const hasBody = !["GET", "HEAD"].includes(request.method);
  const body = hasBody ? await request.text() : undefined;

  const backendRes = await fetch(url, {
    method: request.method,
    headers,
    body,
  });

  if (backendRes.status === 401) {
    const refreshToken = cookieStore.get("refreshToken")?.value;

    const refreshRes = await fetch(
      `${process.env.BACKEND_URL}/api/auth/refresh`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      },
    );

    if (!refreshRes.ok) {
      const response = NextResponse.json(
        { message: "세션이 만료되었습니다. 다시 로그인해주세요." },
        { status: 401 },
      );
      response.cookies.delete("accessToken");
      response.cookies.delete("refreshToken");
      return response;
    }

    const { accessToken: newAccessToken } = await refreshRes.json();

    const retryRes = await fetch(url, {
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
