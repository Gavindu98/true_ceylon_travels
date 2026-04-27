export type TourItemType = "day_tour" | "tour_category";

export type TourContentRecord = {
  id: number;
  created_at: string | null;
  updated_at: string | null;
  type: TourItemType;
  slug: string;
  title: string;
  short_description: string | null;
  location: string | null;
  duration: string | null;
  best_for: string | null;
  starting_price: string | null;
  route_flow: string | null;
  sample_duration: string | null;
  travel_style: string | null;
  cover_image_url: string | null;
  highlights: string[] | null;
  itinerary: string[] | null;
  inclusions: string[] | null;
  ideal_for: string[] | null;
  sample_destinations: string[] | null;
  featured_experiences: string[] | null;
  why_travelers_choose: string[] | null;
  package_includes: string[] | null;
  is_active: boolean | null;
  sort_order: number | null;
};

export type TourPageCoverRecord = {
  id: number;
  created_at: string | null;
  updated_at: string | null;
  page_key: "day-tours" | "tour-categories";
  title: string;
  subtitle: string | null;
  image_url: string | null;
};
