export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const from = searchParams.get("from");
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const clientId = process.env.KAKAO_CLIENT_ID;

  if (!clientId) {
    return Response.redirect(`${baseUrl}/login?error=oauth_unavailable`);
  }

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: `${baseUrl}/api/auth/callback/kakao`,
    response_type: "code",
    scope: "account_email,profile_nickname",
    state: from ?? "login",
  });

  return Response.redirect(`https://kauth.kakao.com/oauth/authorize?${params}`);
}
