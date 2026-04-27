import { NextResponse } from "next/server";
import { createServiceRoleClient, getServiceRoleConfigError } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Params = { params: Promise<{ id: string }> };

const toStringArray = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string");
  }
  if (typeof value === "string") {
    return value
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
};

export async function PUT(request: Request, { params }: Params) {
  const configError = getServiceRoleConfigError();
  if (configError) {
    return NextResponse.json({ error: configError }, { status: 503 });
  }

  const { id } = await params;
  const body = await request.json();
  const supabase = createServiceRoleClient();

  const payload = {
    type: body.type ?? "day_tour",
    slug: body.slug ?? "",
    title: body.title ?? "",
    short_description: body.short_description ?? "",
    location: body.location ?? null,
    duration: body.duration ?? null,
    best_for: body.best_for ?? null,
    starting_price: body.starting_price ?? null,
    route_flow: body.route_flow ?? null,
    sample_duration: body.sample_duration ?? null,
    travel_style: body.travel_style ?? null,
    cover_image_url: body.cover_image_url ?? null,
    highlights: toStringArray(body.highlights),
    itinerary: toStringArray(body.itinerary),
    inclusions: toStringArray(body.inclusions),
    ideal_for: toStringArray(body.ideal_for),
    sample_destinations: toStringArray(body.sample_destinations),
    featured_experiences: toStringArray(body.featured_experiences),
    why_travelers_choose: toStringArray(body.why_travelers_choose),
    package_includes: toStringArray(body.package_includes),
    is_active: body.is_active ?? true,
    sort_order: Number(body.sort_order ?? 0),
  };

  const { data, error } = await supabase.from("tour_content_items").update(payload).eq("id", Number(id)).select("*").single();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function DELETE(_: Request, { params }: Params) {
  const configError = getServiceRoleConfigError();
  if (configError) {
    return NextResponse.json({ error: configError }, { status: 503 });
  }

  const { id } = await params;
  const supabase = createServiceRoleClient();
  const { error } = await supabase.from("tour_content_items").delete().eq("id", Number(id));
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}
