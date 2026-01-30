import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const response = NextResponse.json({ message: "Logout Succes" });
  response.cookies.delete("role", { path: "/" });
  response.cookies.delete("userId", { path: "/" });
  return response;
};
