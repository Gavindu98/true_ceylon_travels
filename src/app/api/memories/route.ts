import { NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/admin";

export async function GET() {
  const supabase = createServiceRoleClient();
  const { data, error } = await supabase
    .from("tour_memories")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data ?? []);
}

export async function POST(request: Request) {
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

  const { data, error } = await supabase.from("tour_memories").insert(payload).select("*").single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
