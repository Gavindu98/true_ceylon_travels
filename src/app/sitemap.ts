import type { MetadataRoute } from "next";
import { destinations } from "@/data/destinations";
import { honeymoonTrips } from "@/data/honeymoon-trips";
import { getTourContentData } from "@/lib/tour-content";

const BASE_URL = "https://trueceylontravels.com";

const staticRoutes = [
  "",
  "/tours",
  "/tours/categories",
  "/day-tours",
  "/honeymoon-trips",
  "/destinations",
  "/custom-tours",
  "/about",
  "/memories",
  "/feedbacks",
  "/contact",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const { dayTours, tourStyles } = await getTourContentData();

  const pages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));

  const dayTourPages: MetadataRoute.Sitemap = dayTours.map((tour) => ({
    url: `${BASE_URL}/day-tours/${tour.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const categoryPages: MetadataRoute.Sitemap = tourStyles.map((category) => ({
    url: `${BASE_URL}/tours/categories/${category.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const honeymoonPages: MetadataRoute.Sitemap = honeymoonTrips.map((trip) => ({
    url: `${BASE_URL}/honeymoon-trips/${trip.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const destinationPages: MetadataRoute.Sitemap = destinations.map((destination) => ({
    url: `${BASE_URL}/destinations/${destination.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...pages, ...dayTourPages, ...categoryPages, ...honeymoonPages, ...destinationPages];
}
