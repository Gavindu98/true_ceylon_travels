export type TravelPackageSection = "signature" | "coastal";

export type TravelPackageRecord = {
  id: number;
  created_at: string | null;
  updated_at: string | null;
  section: TravelPackageSection;
  title: string;
  content: string;
  image_url: string;
  href: string;
  sort_order: number;
};

export const TRAVEL_PACKAGE_SECTIONS: { value: TravelPackageSection; label: string }[] = [
  { value: "signature", label: "Signature packages" },
  { value: "coastal", label: "Coastal escapes" },
];
