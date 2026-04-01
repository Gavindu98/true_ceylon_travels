import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const PUBLIC_ADMIN_PATHS = new Set(["/admin", "/admin/signin", "/admin/signup"]);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  if (PUBLIC_ADMIN_PATHS.has(pathname)) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get("admin_access_token")?.value;
  if (!accessToken) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/signin";
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
