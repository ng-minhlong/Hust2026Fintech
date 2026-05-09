import { type NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { guestRegex, isDevelopmentEnvironment } from "./lib/constants";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // health check
  if (pathname.startsWith("/ping")) {
    return new Response("pong", { status: 200 });
  }

  // skip auth routes
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
    secureCookie: !isDevelopmentEnvironment,
  });

  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  const publicRoutes = ["/", "/login", "/register"];
  const isPublic = publicRoutes.includes(pathname);

  const isGuest = guestRegex.test(token?.email ?? "");

  const isAuthenticated = !!token && !isGuest;

  // ❌ chưa login hoặc là guest → chặn protected
  if (!isAuthenticated && !isPublic) {
    return NextResponse.redirect(new URL(`${base}/login`, request.url));
  }

  // ❗ tránh redirect loop khi đang ở /login
  if (!isAuthenticated && pathname === "/login") {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/chat/:path*",
    "/login",
    "/register",
    "/api/:path*",
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};