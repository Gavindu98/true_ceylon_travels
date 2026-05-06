import type { MetadataRoute } from "next";

const BASE_URL = "https://true-ceylon-travels.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    "",
    "/tours",
    "/tours/categories",
    "/day-tours",
    "/destinations",
    "/custom-tours",
    "/memories",
    "/feedbacks",
    "/contact",
  ];

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
