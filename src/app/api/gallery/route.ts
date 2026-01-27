import { supabaseServer } from "@/app/libs/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const response = await supabaseServer.from("gallery").select("*");
  const { data } = await response;
  return NextResponse.json({ data });
}
