import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const GET = async () => {
  const roleSigned = (await cookies()).get("role")?.value;
  if (!roleSigned) return NextResponse.json({});

  const [role, p] = roleSigned?.split("|");
  const result = roleSigned ? role : "";
  console.log(result);
  return NextResponse.json(result);
};
