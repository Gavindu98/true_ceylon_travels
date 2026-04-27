"use client";

import { useEffect, useRef, useState } from "react";
import type { MemoryRecord } from "@/types/memory";
import MemoryCards from "@/components/memory-cards";

type Props = {
  initialMemories: MemoryRecord[];
  pageSize?: number;
};

type PaginatedMemoriesResponse = {
  items: MemoryRecord[];
  page: number;
  limit: number;
  hasMore: boolean;
};

export default function MemoriesInfiniteList({ initialMemories, pageSize = 9 }: Props) {
  const [memories, setMemories] = useState<MemoryRecord[]>(initialMemories);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(initialMemories.length === pageSize);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const loadMore = async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    try {
      const nextPage = page + 1;
      const res = await fetch(`/api/memories?page=${nextPage}&limit=${pageSize}`, { cache: "no-store" });
      if (!res.ok) {
        setHasMore(false);
        return;
      }

      const payload: PaginatedMemoriesResponse = await res.json();
      const nextItems = Array.isArray(payload.items) ? payload.items : [];
      if (nextItems.length === 0) {
        setHasMore(false);
        return;
      }

      setMemories((prev) => [...prev, ...nextItems]);
      setPage(nextPage);
      setHasMore(Boolean(payload.hasMore));
    } catch {
      setHasMore(false);
    } finally {
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    const element = sentinelRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        void loadMore();
      },
      { rootMargin: "300px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [hasMore, loadingMore, page, pageSize]);

  return (
    <div className="space-y-6">
      <MemoryCards memories={memories} />
      <div ref={sentinelRef} className="h-2 w-full" />
      {loadingMore ? <p className="text-center text-sm text-slate-500">Loading more memories...</p> : null}
      {!hasMore ? <p className="text-center text-sm text-slate-500">You reached the end.</p> : null}
    </div>
  );
}
