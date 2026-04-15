import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { PUBLIC_PATHS } from "@/constants/paths";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const isAuthenticated = Boolean(accessToken || refreshToken);

  // 토큰 있는데 랜더링/로그인/회원가입
  if (isAuthenticated && PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.redirect(new URL("/taskmate", request.url));
  }

  // 토큰 없는데 보호된 경로
  if (!isAuthenticated && !PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|mockServiceWorker|images/).*)",
  ],
};
