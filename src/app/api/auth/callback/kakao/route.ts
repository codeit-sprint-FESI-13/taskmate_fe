import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const state = searchParams.get("state");
  const redirectPath = state === "signup" ? "/signup" : "/login";

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  if (error || !code) {
    return Response.redirect(
      `${baseUrl}${redirectPath}?error=${error ?? "unknown"}&social=kakao`,
    );
  }

  if (!process.env.BACKEND_URL) {
    return Response.redirect(
      `${baseUrl}${redirectPath}?error=oauth_failed&social=kakao`,
    );
  }

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/auth/kakao?code=${code}&redirectUri=${baseUrl}/api/auth/callback/kakao`,
    );
    if (!response.ok) {
      return Response.redirect(
        `${baseUrl}${redirectPath}?error=oauth_failed&social=kakao`,
      );
    }
    const data = await response.json();

    if (!data?.data?.accessToken || !data?.data?.refreshToken) {
      return Response.redirect(
        `${baseUrl}${redirectPath}?error=oauth_failed&social=kakao`,
      );
    }

    const res = NextResponse.redirect(`${baseUrl}/taskmate`);
    res.cookies.set("accessToken", data.data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 59,
    });

    res.cookies.set("refreshToken", data.data.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 14,
    });

    return res;
  } catch {
    return Response.redirect(
      `${baseUrl}${redirectPath}?error=oauth_failed&social=kakao`,
    );
  }
}
