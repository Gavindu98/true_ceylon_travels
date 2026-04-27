import { NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pageParam = Number(searchParams.get("page") ?? "0");
  const limitParam = Number(searchParams.get("limit") ?? "0");
  const hasPagination = Number.isFinite(pageParam) && Number.isFinite(limitParam) && pageParam > 0 && limitParam > 0;
  const page = hasPagination ? Math.max(1, Math.floor(pageParam)) : 1;
  const limit = hasPagination ? Math.min(24, Math.max(1, Math.floor(limitParam))) : 120;
  const from = (page - 1) * limit;
  const to = hasPagination ? from + limit - 1 : limit - 1;

  const supabase = createServiceRoleClient();
  const { data, error } = await supabase
    .from("tour_memories")
    .select("*")
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!hasPagination) {
    return NextResponse.json(data ?? [], {
      headers: {
        "Cache-Control": "public, s-maxage=120, stale-while-revalidate=300",
      },
    });
  }

  const items = data ?? [];
  const hasMore = items.length === limit;
  return NextResponse.json({ items, page, limit, hasMore }, {
    headers: {
      "Cache-Control": "public, s-maxage=120, stale-while-revalidate=300",
    },
  });
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
