import { NextResponse } from "next/server";
import { createServiceRoleClient, getServiceRoleConfigError } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const configError = getServiceRoleConfigError();
  if (configError) {
    return NextResponse.json({ error: configError }, { status: 503 });
  }

  const supabase = createServiceRoleClient();
  const { data, error } = await supabase.from("tour_page_covers").select("*");
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data ?? []);
}

export async function POST(request: Request) {
  const configError = getServiceRoleConfigError();
  if (configError) {
    return NextResponse.json({ error: configError }, { status: 503 });
  }

  const body = await request.json();
  const supabase = createServiceRoleClient();

  const payload = {
    page_key: body.page_key,
    title: body.title ?? "",
    subtitle: body.subtitle ?? "",
    image_url: body.image_url ?? null,
  };

  const { data, error } = await supabase
    .from("tour_page_covers")
    .upsert(payload, { onConflict: "page_key" })
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}
