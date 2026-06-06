import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const provider = url.searchParams.get("provider");

  // OAuth callback handler for Decap CMS
  if (code && provider === "github") {
    // Exchange code for token
    const response = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          client_id: process.env.GITHUB_OAUTH_CLIENT_ID,
          client_secret: process.env.GITHUB_OAUTH_CLIENT_SECRET,
          code,
        }),
      }
    );
    const data = await response.json();
    
    // Return the token in a format Decap CMS expects
    return NextResponse.json({
      token: data.access_token,
      provider: "github",
    });
  }

  // Initial auth redirect
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  if (clientId) {
    const redirectUri = `${url.origin}/api/auth`;
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=repo&response_type=code`;
    return NextResponse.redirect(githubAuthUrl);
  }

  return NextResponse.json({ error: "OAuth not configured" }, { status: 500 });
}
