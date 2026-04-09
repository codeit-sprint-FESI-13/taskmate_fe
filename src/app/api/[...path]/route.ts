import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { deleteTokenCookies, setTokenCookies } from "@/lib/auth/cookies";

async function refreshAndRetry({
  refreshToken,
  url,
  request,
  headers,
  body,
}: {
  refreshToken: string | undefined;
  url: string;
  request: NextRequest;
  headers: HeadersInit;
  body: ArrayBuffer | undefined;
}) {
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
    deleteTokenCookies(response);
    return response;
  }

  const {
    data: { accessToken: newAccessToken, refreshToken: newRefreshToken },
  } = await refreshRes.json();

  if (!newAccessToken) {
    const response = NextResponse.json(
      { message: "세션이 만료되었습니다. 다시 로그인해주세요." },
      { status: 401 },
    );
    deleteTokenCookies(response);
    return response;
  }

  const retryRes = await fetch(url, {
    method: request.method,
    headers: {
      ...headers,
      Authorization: `Bearer ${newAccessToken}`,
    },
    body,
  });

  if (retryRes.status === 204) return new NextResponse(null, { status: 204 });

  const data = await retryRes.json();
  const res = NextResponse.json(data, { status: retryRes.status });

  setTokenCookies(res, newAccessToken, newRefreshToken);

  return res;
}

async function handler(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  try {
    const { path } = await params;
    const pathname = path.join("/");
    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();

    if (!process.env.BACKEND_URL) {
      return NextResponse.json({ message: "서버 설정 오류" }, { status: 500 });
    }

    const url = queryString
      ? `${process.env.BACKEND_URL}/${pathname}?${queryString}`
      : `${process.env.BACKEND_URL}/${pathname}`;

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;

    const contentType = request.headers.get("Content-Type");

    const headers: HeadersInit = {
      ...(contentType && { "Content-Type": contentType }),
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    };

    const hasBody = !["GET", "HEAD"].includes(request.method);
    const body = hasBody ? await request.arrayBuffer() : undefined;

    const backendRes = await fetch(url, {
      method: request.method,
      headers,
      body,
    });

    if (
      (backendRes.status === 401 || backendRes.status === 403) &&
      refreshToken
    ) {
      return refreshAndRetry({ refreshToken, url, request, headers, body });
    }

    if (backendRes.status === 204)
      return new NextResponse(null, { status: 204 });
    const data = await backendRes.json();
    return NextResponse.json(data, { status: backendRes.status });
  } catch {
    return NextResponse.json(
      { message: "서버와 통신할 수 없습니다." },
      { status: 503 },
    );
  }
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
