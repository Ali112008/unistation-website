import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://unistation.ae";

  // Static pages (top-level)
  const staticPages = [
    "", "/about", "/destinations", "/packages", "/language-courses",
    "/tests-exams", "/library", "/team", "/testimonials", "/contact", "/resources",
  ];

  // Clean URL destinations
  const destinationSlugs = ["spain", "turkey"];

  // Clean URL packages
  const packageSlugs = [
    "uk", "uk-medicine", "early-bird",
    "spain-foundation-year", "profile-building",
    "usa", "canada", "europe", "asia",
    "australia", "new-zealand",
  ];

  // Clean URL language courses (/ielts replaces /english)
  const languageSlugs = ["ielts", "german", "spanish", "turkish"];

  return [
    ...staticPages.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1.0 : 0.8,
    })),
    ...destinationSlugs.map((slug) => ({
      url: `${baseUrl}/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...packageSlugs.map((slug) => ({
      url: `${baseUrl}/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...languageSlugs.map((slug) => ({
      url: `${baseUrl}/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
