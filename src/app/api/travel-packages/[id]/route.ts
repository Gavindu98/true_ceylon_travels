import { NextResponse } from "next/server";
import { createServiceRoleClient, getServiceRoleConfigError } from "@/lib/supabase/admin";
import { parseTravelPackagePayload } from "@/lib/travel-packages/payload";
import { noStoreHeaders, revalidateTravelPackagePages } from "@/lib/travel-packages/revalidate";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Params = { params: Promise<{ id: string }> };

export async function PUT(request: Request, { params }: Params) {
  const configError = getServiceRoleConfigError();
  if (configError) {
    return NextResponse.json({ error: configError }, { status: 503, headers: noStoreHeaders });
  }

  const { id } = await params;
  const body = (await request.json()) as Record<string, unknown>;
  const parsed = parseTravelPackagePayload(body);
  if ("error" in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: 400, headers: noStoreHeaders });
  }

  const supabase = createServiceRoleClient();
  const { data, error } = await supabase
    .from("travel_packages")
    .update(parsed.payload)
    .eq("id", Number(id))
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500, headers: noStoreHeaders });
  }

  revalidateTravelPackagePages();
  return NextResponse.json(data, { headers: noStoreHeaders });
}

export async function DELETE(_: Request, { params }: Params) {
  const configError = getServiceRoleConfigError();
  if (configError) {
    return NextResponse.json({ error: configError }, { status: 503, headers: noStoreHeaders });
  }

  const { id } = await params;
  const supabase = createServiceRoleClient();
  const { error } = await supabase.from("travel_packages").delete().eq("id", Number(id));

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500, headers: noStoreHeaders });
  }

  revalidateTravelPackagePages();
  return NextResponse.json({ success: true }, { headers: noStoreHeaders });
}
