import { supabaseServer } from "@/libs/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { username, email, password } = body;

  const { error } = await supabaseServer.from("users").insert({
    username,
    password,
    email,
  });

  if (error) {
    return NextResponse.json(
      { message: "Gagal membuat account", status: 500 },
      { status: 500 },
    );
  }

  return NextResponse.json(
    { message: "Succes create account", status: 201 },
    { status: 201 },
  );
};
