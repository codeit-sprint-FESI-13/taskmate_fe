import { NextResponse } from "next/server";

import { setTokenCookies } from "@/shared/lib/auth/cookies";

export function GET() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not allowed" }, { status: 403 });
  }

  const response = NextResponse.redirect(
    new URL(
      "/taskmate",
      process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000",
    ),
  );

  setTokenCookies(response, "dev-access-token", "dev-refresh-token");

  return response;
}
