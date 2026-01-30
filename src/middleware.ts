import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
  const role = request.cookies.get("role")?.value;
  const isAdmin = request.nextUrl.pathname.startsWith("/dashboard/admin-toko");
  const isUser = request.nextUrl.pathname.startsWith("/dashboard/users");

  if (isAdmin && role !== "admin") {
    return NextResponse.redirect(new URL("/gallery", request.url));
  }

  if (isUser && role !== "user") {
    return NextResponse.redirect(new URL("/gallery", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
