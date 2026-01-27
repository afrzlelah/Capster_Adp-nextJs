import { supabaseServer } from "@/app/libs/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { username, email, password } = body;
  const { data } = await supabaseServer
    .from("users")
    .select("*")
    .eq(`username`, username)
    .single();

  if (data) {
    return NextResponse.json(
      { message: "Username has been used", status: 409 },
      { status: 409 },
    );
  }
  const { error } = await supabaseServer.from("users").insert({
    username,
    password,
    email,
  });
  if (error) {
    return NextResponse.json(
      { message: "Gagal membuat account", status: 400 },
      { status: 500 },
    );
  }
  return NextResponse.json(
    { message: "Succes create account", status: 201 },
    { status: 201 },
  );
};
