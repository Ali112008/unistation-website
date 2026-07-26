/**
 * Site Content — Server-side fetcher with Turso + TS fallback
 *
 * Pattern: try Turso first → fall back to TS file.
 * This guarantees the site never breaks even if Turso is down.
 *
 * All functions are async (server-side only).
 */

import { getConfig } from "@/lib/turso";
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

// ─── Static helpers (for stuff that doesn't go to Turso) ───

/**
 * Returns the destinations list (with image URLs) for the destinations index page.
 * Stays in TS file because customers don't manage images via admin.
 */
export function getDestinationsList() {
  return {
    topDestinations: tsSiteConfig.topDestinations,
    budgetDestinations: tsSiteConfig.budgetDestinations,
  };
}

/**
 * Returns team members (managed via Webflow CMS, not Turso).
 */
export function getTeamConfig() {
  return tsSiteConfig.team;
}

/**
 * Returns language courses config.
 */
export function getLanguageCoursesConfig() {
  return tsSiteConfig.languageCourses;
}

/**
 * Returns tests/exams config.
 */
export function getTestsConfig() {
  return tsSiteConfig.tests;
}

/**
 * Returns package cards (for packages index page) — managed via Webflow CMS.
 */
export function getPackageCards() {
  return tsSiteConfig.packages;
}
