/** Default hero images for tour listing/detail pages when CMS cover is missing. */

export const DEFAULT_DAY_TOURS_HERO = "/images/cover/hero-safari-elephants.jpg";
export const DEFAULT_TOURS_HERO = "/images/cover/hero-sigiriya.jpg";
export const DEFAULT_TOUR_CATEGORIES_HERO = "/images/cover/hero-tea-train.jpg";
export const DEFAULT_HONEYMOON_HERO = "/images/cover/hero-beach-resort.jpg";

const DAY_TOUR_HEROES: Record<string, string> = {
  "colombo-city-tour": "/images/cover/colombo-city-tour-hero.jpg",
  "kandy-day-tour": "/images/cover/hero-kandy-city.jpg",
  "galle-day-tour": "/images/cover/hero-galle-fort.jpg",
  "sigiriya-day-tour": "/images/cover/hero-sigiriya.jpg",
  "yala-day-tour": "/images/cover/hero-safari-elephants.jpg",
  "wilpattu-day-tour": "/images/cover/hero-wildlife-deer.jpg",
  "whale-watching-day-tour": "/images/cover/hero-tropical-bay.jpg",
  "udawalawe-day-tour": "/images/cover/hero-elephant-river.jpg",
  "sinharaja-day-tour": "/images/cover/hero-nature-lagoon.jpg",
};

const TOUR_CATEGORY_HEROES: Record<string, string> = {
  "cultural-tours": "/images/cover/hero-cultural-fire.jpg",
  "wildlife-tours": "/images/cover/hero-safari-elephants.jpg",
  "beach-tours": "/images/cover/hero-coastline.jpg",
  "hill-country-tours": "/images/cover/hero-tea-train.jpg",
  "adventure-tours": "/images/cover/hero-mountain-road.jpg",
  "custom-tours": "/images/cover/hero-scenic-train.jpg",
};

const HONEYMOON_HEROES: Record<string, string> = {
  "coastal-romance-escape": "/images/cover/hero-tropical-bay.jpg",
  "hill-country-honeymoon": "/images/cover/hero-tea-train.jpg",
  "classic-island-romance": "/images/cover/hero-sigiriya.jpg",
  "wildlife-and-beach-romance": "/images/cover/hero-safari-elephants.jpg",
  "luxury-leisure-honeymoon": "/images/cover/hero-beach-resort.jpg",
  "short-romantic-getaway": "/images/cover/hero-galle-fort.jpg",
};

export function resolveDayTourHero(slug: string, coverImageUrl?: string | null) {
  const uploaded = coverImageUrl?.trim();
  if (uploaded) return uploaded;
  return DAY_TOUR_HEROES[slug] ?? DEFAULT_DAY_TOURS_HERO;
}

export function resolveTourCategoryHero(slug: string, coverImageUrl?: string | null) {
  const uploaded = coverImageUrl?.trim();
  if (uploaded) return uploaded;
  return TOUR_CATEGORY_HEROES[slug] ?? DEFAULT_TOUR_CATEGORIES_HERO;
}

export function resolveHoneymoonHero(slug: string, coverImageUrl?: string | null) {
  const uploaded = coverImageUrl?.trim();
  if (uploaded) return uploaded;
  return HONEYMOON_HEROES[slug] ?? DEFAULT_HONEYMOON_HERO;
}

export function resolvePageCoverHero(imageUrl: string | null | undefined, fallback: string) {
  return imageUrl?.trim() || fallback;
}
