"use client";

import { useEffect, useState } from "react";
import MemoryCards from "@/components/memory-cards";
import type { MemoryRecord } from "@/types/memory";

export default function HomeMemories() {
  const [memories, setMemories] = useState<MemoryRecord[]>([]);

  useEffect(() => {
    const loadMemories = async () => {
      const res = await fetch("/api/memories", { cache: "no-store" });
      if (!res.ok) return;
      const data: MemoryRecord[] = await res.json();
      setMemories(data);
    };

    void loadMemories();
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-6 py-10 lg:px-8">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Tour Memories</h2>
          <p className="mt-2 text-slate-600">Real moments with our happy clients from around the world.</p>
        </div>
      </div>
      <MemoryCards memories={memories} />
    </section>
  );
}
