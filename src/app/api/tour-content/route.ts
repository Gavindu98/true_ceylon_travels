import { NextResponse } from "next/server";
import { getTourContentData } from "@/lib/tour-content";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const data = await getTourContentData();
  return NextResponse.json(data);
}
