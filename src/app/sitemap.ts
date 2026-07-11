import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://unistation.ae";

  const staticPages = [
    "", "/about", "/destinations", "/packages", "/language-courses",
    "/tests-exams", "/library", "/team", "/testimonials", "/contact", "/resources",
  ];

  const languageSlugs = ["english", "turkish", "german", "spanish"];

  return [
    ...staticPages.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1.0 : 0.8,
    })),
    ...languageSlugs.map((slug) => ({
      url: `${baseUrl}/language-courses/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}