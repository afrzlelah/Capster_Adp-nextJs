import { supabaseServer } from "@/libs/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const response = await supabaseServer.from("gallery").select("*");
  const { data } = await response;
  return NextResponse.json({ data }, { status: 200 });
}

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();

  if (!formData)
    return NextResponse.json({ message: "Tidak ada data" }, { status: 404 });

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const image = formData.get("image") as File;

  // buat nama file
  const fileName = `${Date.now()}-${image.name}`;

  // insert database
  const { error } = await supabaseServer.storage
    .from("adp_gallery")
    .upload(fileName, image);

  if (error)
    return NextResponse.json(
      { message: "Error Upload Image" },
      { status: 500 },
    );

  // ambil public url dari image diatas

  const { data: publicUrl } = await supabaseServer.storage
    .from("adp_gallery")
    .getPublicUrl(fileName);

  //  insert data table
  const { error: errorInserDataTable } = await supabaseServer
    .from("gallery")
    .insert({
      name: name,
      description: description,
      image: publicUrl.publicUrl,
    });
  if (errorInserDataTable)
    return NextResponse.json(
      {
        status: 500,
        succes: false,
        message: "Failed to add data to DB Table",
      },
      { status: 500 },
    );
  return NextResponse.json(
    { status: 200, succes: true, message: "Upload Succes" },
    { status: 200 },
  );
};

export const DELETE = async (req: NextRequest) => {
  const id = await req.nextUrl.searchParams.get("id");
  const { error } = await supabaseServer
    .from("gallery")
    .delete()
    .eq("id", id)
    .single();
  if (error)
    return NextResponse.json(
      { status: 500, succes: false, message: "Failed to delete data" },
      { status: 500 },
    );
  return NextResponse.json(
    { message: "Succes to delete Data", succes: true },
    { status: 200 },
  );
};
