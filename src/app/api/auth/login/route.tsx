import { supabaseServer } from "@/libs/supabase/server";
import { NextRequest, NextResponse } from "next/server";

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

  return NextResponse.json({ message: "Login Succes", data }, { status: 200 });
}
