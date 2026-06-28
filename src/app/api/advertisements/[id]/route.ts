import { NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/admin";

type Params = { params: Promise<{ id: string }> };

export async function GET(_: Request, { params }: Params) {
  const { id } = await params;
  const supabase = createServiceRoleClient();
  const { data, error } = await supabase.from("advertisements").select("*").eq("id", Number(id)).single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function PUT(request: Request, { params }: Params) {
  const { id } = await params;
  const body = await request.json();
  const title = typeof body.title === "string" ? body.title.trim() : "";
  const imageUrl = typeof body.image_url === "string" ? body.image_url.trim() : "";

  if (!title) {
    return NextResponse.json({ error: "Title is required." }, { status: 400 });
  }

  if (!imageUrl) {
    return NextResponse.json({ error: "Image is required." }, { status: 400 });
  }

  const supabase = createServiceRoleClient();
  const { data, error } = await supabase
    .from("advertisements")
    .update({ title, image_url: imageUrl })
    .eq("id", Number(id))
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function DELETE(_: Request, { params }: Params) {
  const { id } = await params;
  const supabase = createServiceRoleClient();

  const { error } = await supabase.from("advertisements").delete().eq("id", Number(id));

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
