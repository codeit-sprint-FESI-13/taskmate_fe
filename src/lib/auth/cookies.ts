import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const ACCESS_TOKEN_COOKIE = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 59,
};

const REFRESH_TOKEN_COOKIE = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 14,
};

// NextResponse 방식 (route handler용)
// google/kakao callback, [...path] route에서 사용
export function setTokenCookies(
  response: NextResponse,
  accessToken: string,
  refreshToken?: string,
) {
  response.cookies.set("accessToken", accessToken, ACCESS_TOKEN_COOKIE);
  if (refreshToken) {
    response.cookies.set("refreshToken", refreshToken, REFRESH_TOKEN_COOKIE);
  }
}

// cookieStore 방식 (server action용)
// loginAction.ts에서 사용
export async function setTokenCookiesServerAction(
  accessToken: string,
  refreshToken: string,
) {
  const cookieStore = await cookies();
  cookieStore.set("accessToken", accessToken, ACCESS_TOKEN_COOKIE);
  cookieStore.set("refreshToken", refreshToken, REFRESH_TOKEN_COOKIE);
}

export function deleteTokenCookies(response: NextResponse) {
  response.cookies.delete("accessToken");
  response.cookies.delete("refreshToken");
}
