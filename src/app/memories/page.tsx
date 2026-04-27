import Link from "next/link";
import MemoriesInfiniteList from "@/components/memories-infinite-list";
import { createServiceRoleClient } from "@/lib/supabase/admin";
import type { MemoryRecord } from "@/types/memory";

export const revalidate = 300;

export default async function MemoriesPage() {
  const pageSize = 9;
  let memories: MemoryRecord[] = [];

  try {
    const supabase = createServiceRoleClient();
    const { data, error } = await supabase
      .from("tour_memories")
      .select("*")
      .order("id", { ascending: false })
      .limit(pageSize);

    if (!error && data) {
      memories = data as MemoryRecord[];
    }
  } catch {
    memories = [];
  }

  return (
    <main className="min-h-screen bg-[var(--color-surface)] text-[var(--foreground)]">
      <section className="bg-gradient-to-r from-[#0f766e] to-[#115e59] text-white">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
          <h1 className="text-4xl font-bold sm:text-5xl">All Tour Memories</h1>
          <p className="mt-4 max-w-2xl text-teal-50">Real travel moments shared by our guests across Sri Lanka.</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10 lg:px-8">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex rounded-full border border-[#0f766e] px-4 py-2 text-sm font-semibold text-[#0f766e] transition hover:bg-teal-50"
          >
            Back to Home
          </Link>
        </div>
        <MemoriesInfiniteList initialMemories={memories} pageSize={pageSize} />
      </section>
    </main>
  );
}
