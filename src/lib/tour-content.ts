import { dayTours as fallbackDayTours, tourStyles as fallbackTourStyles } from "@/data/nav-tour-data";
import { createServiceRoleClient } from "@/lib/supabase/admin";
import type { TourContentRecord, TourPageCoverRecord } from "@/types/tour-content";

const toStringArray = (value: unknown): string[] => {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string");
};

export async function getTourContentData() {
  const fallback = {
    dayTours: fallbackDayTours,
    tourStyles: fallbackTourStyles,
    covers: [] as TourPageCoverRecord[],
  };

  try {
    const supabase = createServiceRoleClient();
    const [{ data: itemData, error: itemError }, { data: coverData, error: coverError }] = await Promise.all([
      supabase.from("tour_content_items").select("*").eq("is_active", true).order("sort_order", { ascending: true }),
      supabase.from("tour_page_covers").select("*"),
    ]);

    if (itemError || coverError || !itemData) {
      return fallback;
    }

    const rows = itemData as TourContentRecord[];
    const dayTours = rows
      .filter((row) => row.type === "day_tour")
      .map((row) => ({
        slug: row.slug,
        title: row.title,
        description: row.short_description ?? "",
        coverImageUrl: row.cover_image_url ?? "",
        location: row.location ?? "",
        duration: row.duration ?? "",
        bestFor: row.best_for ?? "",
        startingPrice: row.starting_price ?? "",
        highlights: toStringArray(row.highlights),
        itinerary: toStringArray(row.itinerary),
        inclusions: toStringArray(row.inclusions),
        idealFor: toStringArray(row.ideal_for),
      }));

    const tourStyles = rows
      .filter((row) => row.type === "tour_category")
      .map((row) => ({
        slug: row.slug,
        title: row.title,
        description: row.short_description ?? "",
        coverImageUrl: row.cover_image_url ?? "",
        routeFlow: row.route_flow ?? "",
        sampleDuration: row.sample_duration ?? "",
        travelStyle: row.travel_style ?? "",
        sampleDestinations: toStringArray(row.sample_destinations),
        featuredExperiences: toStringArray(row.featured_experiences),
        whyTravelersChoose: toStringArray(row.why_travelers_choose),
        packageIncludes: toStringArray(row.package_includes),
      }));

    return {
      dayTours: dayTours.length > 0 ? dayTours : fallbackDayTours,
      tourStyles: tourStyles.length > 0 ? tourStyles : fallbackTourStyles,
      covers: (coverData as TourPageCoverRecord[] | null) ?? [],
    };
  } catch {
    return fallback;
  }
}
