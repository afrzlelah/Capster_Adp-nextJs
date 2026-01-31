import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySignedValue } from "./libs/signedCookie";

export default async function middleware(request: NextRequest) {
  const isAdmin = request.nextUrl.pathname.startsWith("/dashboard/admin-toko");
  const isUser = request.nextUrl.pathname.startsWith("/dashboard/users");

  const raw = request.cookies.get("role")?.value;
  const role = raw ? await verifySignedValue(raw) : null;

  if (isAdmin && role !== "admin") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isUser && role !== "user") {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}
