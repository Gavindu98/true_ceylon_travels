import { NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/admin";
import { noStoreHeaders, revalidateAdvertisementPages } from "@/lib/advertisements/revalidate";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const supabase = createServiceRoleClient();
  const { data, error } = await supabase
    .from("advertisements")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500, headers: noStoreHeaders });
  }

  return NextResponse.json(data ?? [], { headers: noStoreHeaders });
}

export async function POST(request: Request) {
  const body = await request.json();
  const title = typeof body.title === "string" ? body.title.trim() : "";
  const imageUrl = typeof body.image_url === "string" ? body.image_url.trim() : "";

  if (!title) {
    return NextResponse.json({ error: "Title is required." }, { status: 400, headers: noStoreHeaders });
  }

  if (!imageUrl) {
    return NextResponse.json({ error: "Image is required." }, { status: 400, headers: noStoreHeaders });
  }

  const supabase = createServiceRoleClient();
  const { data, error } = await supabase
    .from("advertisements")
    .insert({ title, image_url: imageUrl })
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500, headers: noStoreHeaders });
  }

  revalidateAdvertisementPages();

  return NextResponse.json(data, { status: 201, headers: noStoreHeaders });
}
