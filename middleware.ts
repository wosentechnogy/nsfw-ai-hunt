import { NextResponse, type NextRequest } from "next/server";
import {
  ADMIN_ACCESS_TOKEN_COOKIE,
  ADMIN_REFRESH_TOKEN_COOKIE,
  getAdminAllowlist
} from "@/lib/auth/admin";
import { getClientEnv } from "@/lib/env";

function readUserId(value: unknown) {
  if (!value || typeof value !== "object" || !("id" in value)) {
    return null;
  }

  const id = value.id;

  return typeof id === "string" ? id : null;
}

function redirectToLogin(request: NextRequest, pathname: string) {
  const loginUrl = new URL("/admin/login", request.url);
  loginUrl.searchParams.set("next", pathname);

  const response = NextResponse.redirect(loginUrl);
  response.cookies.delete(ADMIN_ACCESS_TOKEN_COOKIE);
  response.cookies.delete(ADMIN_REFRESH_TOKEN_COOKIE);

  return response;
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (!pathname.startsWith("/admin") || pathname === "/admin/login") {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get(ADMIN_ACCESS_TOKEN_COOKIE)?.value;
  const allowlist = getAdminAllowlist();

  if (!accessToken || allowlist.length === 0) {
    return redirectToLogin(request, pathname);
  }

  try {
    const env = getClientEnv();
    const response = await fetch(`${env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/user`, {
      headers: {
        apikey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        Authorization: `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      return redirectToLogin(request, pathname);
    }

    const userId = readUserId(await response.json());

    if (!userId || !allowlist.includes(userId)) {
      return redirectToLogin(request, pathname);
    }
  } catch {
    return redirectToLogin(request, pathname);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"]
};
