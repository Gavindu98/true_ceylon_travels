import { NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/admin";

type Params = { params: Promise<{ id: string }> };

export async function GET(_: Request, { params }: Params) {
  const { id } = await params;
  const supabase = createServiceRoleClient();
  const { data, error } = await supabase.from("tour_memories").select("*").eq("id", Number(id)).single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function PUT(request: Request, { params }: Params) {
  const { id } = await params;
  const body = await request.json();
  const supabase = createServiceRoleClient();

  const payload = {
    title: body.title ?? null,
    description: body.description ?? null,
    traveler_count: body.traveler_count ?? null,
    place: body.place ?? null,
    date: body.date ? new Date(body.date).toISOString() : null,
    url: body.url ?? null,
  };

  const { data, error } = await supabase.from("tour_memories").update(payload).eq("id", Number(id)).select("*").single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function DELETE(_: Request, { params }: Params) {
  const { id } = await params;
  const supabase = createServiceRoleClient();

  const { error } = await supabase.from("tour_memories").delete().eq("id", Number(id));

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
