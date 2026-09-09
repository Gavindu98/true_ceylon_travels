import { NextResponse } from "next/server";
import { createServiceRoleClient, getServiceRoleConfigError } from "@/lib/supabase/admin";
import { parseTravelPackagePayload } from "@/lib/travel-packages/payload";
import { noStoreHeaders, revalidateTravelPackagePages } from "@/lib/travel-packages/revalidate";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const configError = getServiceRoleConfigError();
  if (configError) {
    return NextResponse.json({ error: configError }, { status: 503, headers: noStoreHeaders });
  }

  const supabase = createServiceRoleClient();
  const { data, error } = await supabase
    .from("travel_packages")
    .select("*")
    .order("section", { ascending: true })
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500, headers: noStoreHeaders });
  }

  return NextResponse.json(data ?? [], { headers: noStoreHeaders });
}

export async function POST(request: Request) {
  const configError = getServiceRoleConfigError();
  if (configError) {
    return NextResponse.json({ error: configError }, { status: 503, headers: noStoreHeaders });
  }

  const body = (await request.json()) as Record<string, unknown>;
  const parsed = parseTravelPackagePayload(body);
  if ("error" in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: 400, headers: noStoreHeaders });
  }

  const supabase = createServiceRoleClient();
  const { data, error } = await supabase.from("travel_packages").insert(parsed.payload).select("*").single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500, headers: noStoreHeaders });
  }

  revalidateTravelPackagePages();
  return NextResponse.json(data, { status: 201, headers: noStoreHeaders });
}
