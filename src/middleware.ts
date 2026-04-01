import { NextRequest, NextResponse } from "next/server";

export function middleware(_request: NextRequest) {
  // www → non-www redirect is handled by Vercel domain config.
  // Do NOT redirect here — it conflicts with Vercel's own redirects
  // and causes ERR_TOO_MANY_REDIRECTS.
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|apple-icon\\.png|icon\\.png).*)",
  ],
};
