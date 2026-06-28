import MemoryCards from "@/components/memory-cards";
import type { MemoryRecord } from "@/types/memory";
import { createServiceRoleClient } from "@/lib/supabase/admin";
import Link from "next/link";

export default async function HomeMemories() {
  let memories: MemoryRecord[] = [];

  try {
    const supabase = createServiceRoleClient();
    const { data, error } = await supabase
      .from("tour_memories")
      .select("*")
      .order("id", { ascending: false })
      .limit(12);

    if (!error && data) {
      memories = data as MemoryRecord[];
    }
  } catch {
    memories = [];
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-10 lg:px-8">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Experiences with Customers</h2>
          <p className="mt-2 text-slate-600">Real moments with our happy clients from around the world.</p>
        </div>
        <Link
          href="/memories"
          className="rounded-full border border-[#0f766e] px-5 py-2 text-sm font-semibold text-[#0f766e] transition hover:bg-teal-50"
        >
          View All Memories
        </Link>
      </div>
      <MemoryCards memories={memories} />
    </section>
  );
}
