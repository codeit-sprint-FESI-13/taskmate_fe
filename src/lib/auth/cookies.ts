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
