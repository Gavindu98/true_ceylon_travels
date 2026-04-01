import Image from "next/image";
import type { MemoryRecord } from "@/types/memory";

type Props = {
  memories: MemoryRecord[];
  onEdit?: (memory: MemoryRecord) => void;
  onDelete?: (memoryId: number) => void;
};

function isLocalImage(src: string) {
  return src.startsWith("/");
}

export default function MemoryCards({ memories, onEdit, onDelete }: Props) {
  if (!memories.length) {
    return <p className="text-sm text-slate-600">No memories yet.</p>;
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {memories.map((memory) => (
        <article key={memory.id} className="group relative overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-[#d7e4e4]">
          <div className="relative h-64 w-full">
            {isLocalImage(memory.url || "") ? (
              <Image
                src={memory.url || "/images/hero-lanka.svg"}
                alt={`${memory.title || "Memory"} - ${memory.place || "Sri Lanka"}`}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            ) : (
              // Use <img> for remote URLs to avoid Next.js remote host config errors.
              // Prefer direct image URLs (jpg/png/webp), not Google "imgres" links.
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={memory.url || "/images/hero-lanka.svg"}
                alt={`${memory.title || "Memory"} - ${memory.place || "Sri Lanka"}`}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="absolute inset-x-0 bottom-0 translate-y-6 p-5 !text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <h3 className="text-lg font-semibold !text-white">{memory.title || "Untitled Memory"}</h3>
              <p className="mt-1 text-sm !text-white">{memory.place || "Sri Lanka"}</p>
              {memory.description ? <p className="mt-2 line-clamp-2 text-xs !text-white">{memory.description}</p> : null}
            </div>
          </div>
          {(onEdit || onDelete) && (
            <div className="flex gap-2 p-4">
              {onEdit ? (
                <button
                  type="button"
                  onClick={() => onEdit(memory)}
                  className="rounded-full border border-[#0f766e] px-4 py-1.5 text-xs font-semibold text-[#0f766e] hover:bg-teal-50"
                >
                  Edit
                </button>
              ) : null}
              {onDelete ? (
                <button
                  type="button"
                  onClick={() => onDelete(memory.id)}
                  className="rounded-full border border-rose-400 px-4 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50"
                >
                  Delete
                </button>
              ) : null}
            </div>
          )}
        </article>
      ))}
    </div>
  );
}
