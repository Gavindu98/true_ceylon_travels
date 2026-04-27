import { NextResponse } from "next/server";
import { createServiceRoleClient, getServiceRoleConfigError } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(request: Request) {
  const configError = getServiceRoleConfigError();
  if (configError) {
    return NextResponse.json({ error: configError }, { status: 503 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const supabase = createServiceRoleClient();
  const fileExt = file.name.includes(".") ? file.name.split(".").pop() : "jpg";
  const filePath = `tour-content/${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

  const { error: uploadError } = await supabase.storage.from("tour_memories").upload(filePath, file, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type || undefined,
  });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  const { data } = supabase.storage.from("tour_memories").getPublicUrl(filePath);
  return NextResponse.json({ publicUrl: data.publicUrl });
}
