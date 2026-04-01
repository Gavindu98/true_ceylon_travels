import { NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/admin";

export async function GET() {
  const supabase = createServiceRoleClient();
  const { data, error } = await supabase.from("contact").select("*").order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data ?? []);
}

export async function POST(request: Request) {
  const body = await request.json();
  const supabase = createServiceRoleClient();

  const payload = {
    name: body.name ?? null,
    email: body.email ?? null,
    phone_number: body.phone_number ?? null,
    travel_date: body.travel_date ? new Date(body.travel_date).toISOString() : null,
    head_count: body.head_count ? Number(body.head_count) : null,
    trip_details: body.trip_details ?? null,
  };

  const { data, error } = await supabase.from("contact").insert(payload).select("*").single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
