import { supabaseServer } from "@/libs/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export const getGallery = async (req: NextRequest) => {
  const response = await fetch(`http://localhost:3000/api/gallery`);
  const result = await response.json();
  return NextResponse.json({ result });
};

export const getGalleryViaDB = async (
  req: NextRequest,
  order: boolean = true
) => {
  const { data, error } = await supabaseServer
    .from("gallery")
    .select()
    .order("created_at", { ascending: order });
  if (error) return NextResponse.json({ message: "Error" }, { status: 500 });
};
