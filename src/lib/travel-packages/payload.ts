import type { TravelPackageSection } from "@/types/travel-package";

const SECTIONS = new Set<TravelPackageSection>(["signature", "coastal"]);

export function parseTravelPackagePayload(body: Record<string, unknown>) {
  const title = typeof body.title === "string" ? body.title.trim() : "";
  const content = typeof body.content === "string" ? body.content.trim() : "";
  const imageUrl = typeof body.image_url === "string" ? body.image_url.trim() : "";
  const href = typeof body.href === "string" && body.href.trim() ? body.href.trim() : "/contact";
  const section = body.section === "coastal" || body.section === "signature" ? body.section : "";
  const sortOrder = Number.isFinite(Number(body.sort_order)) ? Number(body.sort_order) : 0;

  if (!SECTIONS.has(section as TravelPackageSection)) {
    return { error: "Section must be Signature packages or Coastal escapes." } as const;
  }
  if (!title) {
    return { error: "Title is required." } as const;
  }
  if (!content) {
    return { error: "Content is required." } as const;
  }
  if (!imageUrl) {
    return { error: "Image is required." } as const;
  }

  return {
    payload: {
      section,
      title,
      content,
      image_url: imageUrl,
      href,
      sort_order: sortOrder,
    },
  } as const;
}
