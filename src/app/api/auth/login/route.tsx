import { supabaseServer } from "@/libs/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { signValue } from "@/libs/signedCookie";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { username, password } = body;
  // validasi
  const { data, error } = await supabaseServer
    .from("users")
    .select("*")
    .eq(`username`, username)
    .single();

  if (!data || error) {
    return NextResponse.json(
      { message: "Username Tidak Ditemukan" },
      { status: 404 },
    );
  }

  if (data.password !== password) {
    return NextResponse.json({ message: "Password Salah" }, { status: 401 });
  }
  (await cookies()).set("role", await signValue(data.role), {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 3,
  });
  (await cookies()).set("userId", await signValue(data.id), {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 3,
  });

  return NextResponse.json({ message: "Login Succes", data }, { status: 200 });
}
