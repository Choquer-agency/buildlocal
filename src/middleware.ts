import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Protect the internal CRM (/admin/*) with HTTP Basic Auth.
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const expected = process.env.ADMIN_PASSWORD || "buildlocal500";
    const header = request.headers.get("authorization");
    let authed = false;
    if (header?.startsWith("Basic ")) {
      try {
        const decoded = atob(header.slice(6)); // "user:pass"
        if (decoded.slice(decoded.indexOf(":") + 1) === expected) authed = true;
      } catch {
        /* fall through */
      }
    }
    if (!authed) {
      return new NextResponse("Authentication required.", {
        status: 401,
        headers: { "WWW-Authenticate": 'Basic realm="BuildLocal Admin", charset="UTF-8"' },
      });
    }
  }

  // www → non-www redirect is handled by Vercel domain config.
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|apple-icon\\.png|icon\\.png).*)",
  ],
};
