/**
 * Site Content — Server-side fetcher with Turso + TS fallback
 *
 * Pattern: try Turso first → fall back to TS file.
 * This guarantees the site never breaks even if Turso is down.
 *
 * All functions are async (server-side only).
 */

import { getConfig } from "@/lib/turso";
import client from "@/lib/turso";
import { siteConfig as tsSiteConfig } from "@/data/site-data";
import { packagesContent as tsPackages } from "@/data/packages-content";
import { destinationsContent as tsDestinations } from "@/data/destinations-content";
import { pageFaqs as tsFaqs } from "@/data/page-faqs";

// ─── Types (re-exported for convenience) ───────────────────
export type Brand = typeof tsSiteConfig.brand;
export type Social = typeof tsSiteConfig.social;
export type Stat = typeof tsSiteConfig.stats[number];
export type Office = typeof tsSiteConfig.offices[number];
export type Testimonial = typeof tsSiteConfig.testimonials[number];
export type PageFaqs = typeof tsFaqs;
export type Packages = typeof tsPackages;
export type Destinations = typeof tsDestinations;
export type Navigation = typeof tsSiteConfig.navigation;
export type LanguageCourse = typeof tsSiteConfig.languageCourses;
export type ExamType = typeof tsSiteConfig.examTypes;
export type About = typeof tsSiteConfig.about;
export type Timeline = typeof tsSiteConfig.timeline;
export type ComparisonTable = typeof tsSiteConfig.comparisonTable;
export type TopDestination = typeof tsSiteConfig.topDestinations;
export type BudgetDestination = typeof tsSiteConfig.budgetDestinations;
export type PackageCard = typeof tsSiteConfig.packages;

// ─── Fetchers (Turso-first with TS fallback) ───────────────

export async function getBrand(): Promise<Brand> {
  try {
    const v = await getConfig<Brand>("brand");
    if (v) return v;
  } catch (e) {
    console.warn("[site-content] Turso getBrand failed, using TS fallback:", e);
  }
  return tsSiteConfig.brand;
}

export async function getSocial(): Promise<Social> {
  try {
    const v = await getConfig<Social>("social");
    if (v) return v;
  } catch (e) {
    console.warn("[site-content] Turso getSocial failed, using TS fallback:", e);
  }
  return tsSiteConfig.social;
}

export async function getStats(): Promise<Stat[]> {
  try {
    const v = await getConfig<Stat[]>("stats");
    if (Array.isArray(v) && v.length > 0) return v;
  } catch (e) {
    console.warn("[site-content] Turso getStats failed, using TS fallback:", e);
  }
  return tsSiteConfig.stats;
}

export async function getOffices(): Promise<Office[]> {
  try {
    const v = await getConfig<Office[]>("offices");
    if (Array.isArray(v) && v.length > 0) return v;
  } catch (e) {
    console.warn("[site-content] Turso getOffices failed, using TS fallback:", e);
  }
  return tsSiteConfig.offices;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    // First try CMS reviews table (full CRUD, client-editable)
    const result = await client.execute({
      sql: "SELECT name, text, rating, source, university, photo, country, program FROM reviews ORDER BY created_on DESC",
      args: [],
    });
    if (result.rows.length > 0) {
      return result.rows.map((row: any) => ({
        name: row.name,
        text: row.text,
        rating: row.rating,
        source: row.source,
        university: row.university,
        photo: row.photo,
        country: row.country || "",
        program: row.program || "",
      }));
    }
  } catch (e) {
    console.warn("[site-content] CMS reviews query failed, trying config key:", e);
  }
  // Fallback: try testimonials config key, then TS file
  try {
    const v = await getConfig<Testimonial[]>("testimonials");
    if (Array.isArray(v) && v.length > 0) return v;
  } catch (e) {
    console.warn("[site-content] Turso getTestimonials failed, using TS fallback:", e);
  }
  return tsSiteConfig.testimonials;
}

export async function getFaqs(): Promise<PageFaqs> {
  try {
    const v = await getConfig<PageFaqs>("faqs");
    if (v && typeof v === "object") return v;
  } catch (e) {
    console.warn("[site-content] Turso getFaqs failed, using TS fallback:", e);
  }
  return tsFaqs;
}

export async function getPackages(): Promise<Packages> {
  try {
    const v = await getConfig<Packages>("packages");
    if (v && typeof v === "object") return v;
  } catch (e) {
    console.warn("[site-content] Turso getPackages failed, using TS fallback:", e);
  }
  return tsPackages;
}

export async function getDestinations(): Promise<Destinations> {
  try {
    const v = await getConfig<Destinations>("destinations");
    if (v && typeof v === "object") return v;
  } catch (e) {
    console.warn("[site-content] Turso getDestinations failed, using TS fallback:", e);
  }
  return tsDestinations;
}

export async function getNavigation(): Promise<Navigation> {
  try {
    const v = await getConfig<Navigation>("navigation");
    if (Array.isArray(v) && v.length > 0) return v;
  } catch (e) {
    console.warn("[site-content] Turso getNavigation failed, using TS fallback:", e);
  }
  return tsSiteConfig.navigation;
}

export async function getLanguageCourses(): Promise<LanguageCourse> {
  try {
    const v = await getConfig<LanguageCourse>("languageCourses");
    if (Array.isArray(v) && v.length > 0) return v;
  } catch (e) {
    console.warn("[site-content] Turso getLanguageCourses failed, using TS fallback:", e);
  }
  return tsSiteConfig.languageCourses;
}

export async function getExamTypes(): Promise<ExamType> {
  try {
    const v = await getConfig<ExamType>("examTypes");
    if (Array.isArray(v) && v.length > 0) return v;
  } catch (e) {
    console.warn("[site-content] Turso getExamTypes failed, using TS fallback:", e);
  }
  return tsSiteConfig.examTypes;
}

export async function getAbout(): Promise<About> {
  try {
    const v = await getConfig<About>("about");
    if (v && typeof v === "object") return v;
  } catch (e) {
    console.warn("[site-content] Turso getAbout failed, using TS fallback:", e);
  }
  return tsSiteConfig.about;
}

export async function getTimeline(): Promise<Timeline> {
  try {
    const v = await getConfig<Timeline>("timeline");
    if (Array.isArray(v) && v.length > 0) return v;
  } catch (e) {
    console.warn("[site-content] Turso getTimeline failed, using TS fallback:", e);
  }
  return tsSiteConfig.timeline;
}

export async function getComparisonTable(): Promise<ComparisonTable> {
  try {
    const v = await getConfig<ComparisonTable>("comparisonTable");
    if (v && typeof v === "object") return v;
  } catch (e) {
    console.warn("[site-content] Turso getComparisonTable failed, using TS fallback:", e);
  }
  return tsSiteConfig.comparisonTable;
}

export async function getTopDestinations(): Promise<TopDestination> {
  try {
    const v = await getConfig<TopDestination>("topDestinations");
    if (Array.isArray(v) && v.length > 0) return v;
  } catch (e) {
    console.warn("[site-content] Turso getTopDestinations failed, using TS fallback:", e);
  }
  return tsSiteConfig.topDestinations;
}

export async function getBudgetDestinations(): Promise<BudgetDestination> {
  try {
    const v = await getConfig<BudgetDestination>("budgetDestinations");
    if (Array.isArray(v) && v.length > 0) return v;
  } catch (e) {
    console.warn("[site-content] Turso getBudgetDestinations failed, using TS fallback:", e);
  }
  return tsSiteConfig.budgetDestinations;
}

export async function getPackageCards(): Promise<PackageCard> {
  try {
    const v = await getConfig<PackageCard>("packages");
    if (Array.isArray(v) && v.length > 0) return v;
  } catch (e) {
    console.warn("[site-content] Turso getPackageCards failed, using TS fallback:", e);
  }
  return tsSiteConfig.packages;
}

/**
 * Get a specific package by slug.
 */
export async function getPackageBySlug(slug: string) {
  const packages = await getPackages();
  // Try direct key match first
  const directKey = slug.replace(/-/g, "");
  if ((packages as any)[slug]) return (packages as any)[slug];
  // Try camelCase variants
  const camelKey = slug.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
  if ((packages as any)[camelKey]) return (packages as any)[camelKey];
  // Try direct key without dashes
  if ((packages as any)[directKey]) return (packages as any)[directKey];
  return null;
}

/**
 * Get a specific destination by slug.
 */
export async function getDestinationBySlug(slug: string) {
  const destinations = await getDestinations();
  return (destinations as any)[slug] || null;
}

// ─── Converted async helpers ──────────────────────────────

/**
 * Returns the destinations list (with image URLs) for the destinations index page.
 * Now fetches from Turso first, falls back to TS file.
 */
export async function getDestinationsList() {
  const [topDestinations, budgetDestinations] = await Promise.all([
    getTopDestinations(),
    getBudgetDestinations(),
  ]);
  return { topDestinations, budgetDestinations };
}

/**
 * Returns language courses config.
 * Now fetches from Turso first, falls back to TS file.
 */
export async function getLanguageCoursesConfig() {
  return getLanguageCourses();
}

/**
 * Returns tests/exams config.
 * Now fetches from Turso first, falls back to TS file.
 */
export async function getTestsConfig() {
  return getExamTypes();
}

// ─── Layout data convenience ──────────────────────────────

/**
 * Fetches all data needed by the root layout (Header, Footer, FloatingWhatsApp).
 * Runs all fetches in parallel for optimal performance.
 */
export async function getSiteLayoutData() {
  const [brand, social, navigation, offices, topDestinations, packages] =
    await Promise.all([
      getBrand(),
      getSocial(),
      getNavigation(),
      getOffices(),
      getTopDestinations(),
      getPackageCards(),
    ]);
  return { brand, social, navigation, offices, topDestinations, packages };
}

export type SiteLayoutData = Awaited<ReturnType<typeof getSiteLayoutData>>;
