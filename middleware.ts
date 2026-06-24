import { NextResponse, type NextRequest } from "next/server";
import {
  ADMIN_ACCESS_TOKEN_COOKIE,
  getAdminAllowlist
} from "@/lib/auth/admin";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (!pathname.startsWith("/admin") || pathname === "/admin/login") {
    return NextResponse.next();
  }

  const hasAccessToken = Boolean(request.cookies.get(ADMIN_ACCESS_TOKEN_COOKIE)?.value);
  const hasConfiguredOwner = getAdminAllowlist().length > 0;

  if (!hasAccessToken || !hasConfiguredOwner) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("next", pathname);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"]
};
