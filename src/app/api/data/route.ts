import { verifySignedValue } from "@/libs/signedCookie";
import { supabaseServer } from "@/libs/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const cookieUserId = req.cookies.get("userId")?.value;
  if (!cookieUserId)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const userId = await verifySignedValue(cookieUserId);

  if (!userId)
    return NextResponse.json({ message: "Blokced activity" }, { status: 401 });
  const { data } = await supabaseServer.from("users").select().eq("id", userId);
  return NextResponse.json(data);
};
