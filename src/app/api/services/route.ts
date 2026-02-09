import { supabaseServer } from "@/libs/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  const response = await supabaseServer.from("service").select("*");
  const { data } = await response;
  if (!data || data.length < 1)
    return NextResponse.json(
      { message: "Not Found, Nothing datas" },
      { status: 404 }
    );
  return NextResponse.json(data);
};

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { name, description, price } = await body;

  const { data, error } = await supabaseServer
    .from("service")
    .insert([{ name, description, price: Number(price) }])
    .select();
  if (error)
    return NextResponse.json(
      { success: true, message: error.message },
      { status: 500 }
    );

  return NextResponse.json(
    {
      success: true,
      message: "Berhasil menyimpan ke Storage",
      data: data[0],
    },
    { status: 201 }
  );
};
