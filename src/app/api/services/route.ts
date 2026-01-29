import { supabaseServer } from "@/libs/supabase/server";
import { NextResponse } from "next/server";

export const GET = async () => {
  const response = await supabaseServer.from("service").select("*");
  const { data } = await response;
  return NextResponse.json(data);
};
