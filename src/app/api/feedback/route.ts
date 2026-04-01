import { NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/admin";

export async function GET() {
  const supabase = createServiceRoleClient();
  const { data, error } = await supabase.from("feedback").select("*").order("created_at", { ascending: false });

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
    feedback_date: body.feedback_date ?? null,
    description: body.description ?? null,
    country: body.country ?? null,
    name: body.name ?? null,
    profile_pic_url: body.profile_pic_url ?? null,
  };

  const { data, error } = await supabase.from("feedback").insert(payload).select("*").single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
