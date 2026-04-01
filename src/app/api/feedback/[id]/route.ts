import { NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/admin";

type Params = { params: Promise<{ id: string }> };

export async function PUT(request: Request, { params }: Params) {
  const { id } = await params;
  const body = await request.json();
  const supabase = createServiceRoleClient();

  const payload = {
    title: body.title ?? null,
    feedback_date: body.feedback_date ?? null,
    description: body.description ?? null,
    country: body.country ?? null,
    name: body.name ?? null,
    profile_pic_url: body.profile_pic_url ?? null,
  };

  const { data, error } = await supabase.from("feedback").update(payload).eq("id", Number(id)).select("*").single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function DELETE(_: Request, { params }: Params) {
  const { id } = await params;
  const supabase = createServiceRoleClient();
  const { error } = await supabase.from("feedback").delete().eq("id", Number(id));

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
