# UniStation Admin Panel — Implementation Plan

> **Status:** READY TO EXECUTE (waiting for user's "go" signal)
> **Last updated:** 2026-07-26
> **Estimated effort:** 1.5–2 days (~10–12 hours)
> **Approach:** Extend existing Turso-based admin (no new infrastructure)

---

## 📋 Decision Summary

| Question | Answer |
|---|---|
| Approach | Extend existing Turso admin (built for Georgia landing page) to cover the whole site |
| Why Turso over Keystatic | ✅ 80% infrastructure already exists; ✅ No GitHub OAuth needed; ✅ Real-time edits; ✅ Customer already familiar with the Georgia admin |
| Image editing | ❌ Not needed — admin only manages text, prices, descriptions, lists |
| Auth | Reuse existing password-based auth (`unistation2024`, configurable) |
| Cache strategy | ISR with `revalidate = 300` (5 min) — site visitors see cached pages, admin sees instant updates after cache expiry |
| Cost | $0 — Turso free tier already in use |

---

## 🏗️ Current Infrastructure (Already Built)

These pieces are already in place and will be reused:

| Component | Location | Status |
|---|---|---|
| Turso DB client | `src/lib/turso.ts` | ✅ Working |
| `site_config` table (key-value JSON storage) | Turso DB | ✅ Working |
| Config API (GET/PUT) | `src/app/api/config/route.ts` | ✅ Working |
| Password auth | Hardcoded `ADMIN_PASSWORD = "unistation2024"` | ✅ Working |
| Admin UI shell (802 lines, 8 tabs) | `src/app/admin/page.tsx` | ✅ Working (Georgia only) |
| Existing tabs: stats, universities, hero, contact, basicPackage, additionalPackage, registration, faqs | `src/app/admin/page.tsx` | ✅ Working |
| Session management (7-day persistence) | localStorage | ✅ Working |
| Save/Undo/Refresh pattern | Admin UI | ✅ Working |

---

## 🎯 Goal

Customer opens `https://unistation.ae/admin` → logs in → edits text/prices/descriptions/lists → saves → changes appear on the live site within 5 minutes.

### What customer can edit:
- ✅ Package details (name, price, description, features list, tiers)
- ✅ Destination content (hero subtitle, description, paragraphs, sections)
- ✅ FAQs (all 10 groups)
- ✅ Brand info (name, tagline, email, WhatsApp, social links)
- ✅ Stats (numbers shown on homepage)
- ✅ Testimonials (name, country, program, text)
- ✅ Offices (city, country, address)

### What customer CANNOT edit (stays in code):
- ❌ Images (managed via Webflow CDN / hardcoded URLs)
- ❌ Page layout / structure
- ❌ Routes / URL structure
- ❌ Component code

---

## 📊 Data Migration Plan

Convert TypeScript data files → Turso `site_config` rows.

| Current file | Lines | Turso key | Notes |
|---|---|---|---|
| `src/data/site-data.ts` → brand section | ~15 | `brand` | JSON: { name, logoUrl, tagline, email, whatsapp, ... } |
| `src/data/site-data.ts` → social section | ~10 | `social` | JSON: { instagram, tiktok, facebook, twitter, youtube } |
| `src/data/site-data.ts` → stats section | ~30 | `stats` | JSON array of { label, value } |
| `src/data/site-data.ts` → offices section | ~20 | `offices` | JSON array of { city, country, address, ... } |
| `src/data/site-data.ts` → testimonials section | ~30 | `testimonials` | JSON array of { name, country, program, text } |
| `src/data/page-faqs.ts` | 149 | `faqs` | JSON: { about: [...], contact: [...], destinations: [...], packages: [...], team: [...], resources: [...], testimonials: [...], library: [...], spain: [...], turkey: [...] } |
| `src/data/packages-content.ts` | 925 | `packages` | JSON: { uk: {...}, ukMedicine: {...}, earlyBird: {...}, europe: {...}, usa: {...}, canada: {...}, asia: {...}, spainFoundationYear: {...}, profileBuilding: {...} } |
| `src/data/destinations-content.ts` | 368 | `destinations` | JSON: { spain: {...}, turkey: {...} } |
| `src/data/site-data.ts` → topDestinations | ~10 | Stays in TS (image URLs only) | Customer doesn't manage images |
| `src/data/site-data.ts` → budgetDestinations | ~20 | Stays in TS (image URLs only) | Customer doesn't manage images |
| `src/data/site-data.ts` → team | ~50 | Stays via Webflow CMS | Already auto-synced |

---

## 🚀 Implementation Steps (Detailed)

### Phase 1: Migration Script (2 hours)

**File:** `scripts/migrate-to-turso.ts`

Create a Node script that:
1. Reads the existing TypeScript data files
2. Converts each section to JSON
3. Writes to Turso `site_config` table via `setConfig(key, value)`
4. Logs progress for each key migrated
5. Verifies roundtrip by reading back

**Acceptance criteria:**
- All 8 keys written to Turso successfully
- Read-back matches original data 1:1
- Script idempotent (safe to re-run)

---

### Phase 2: Data Layer Refactor (3 hours)

**Files to modify:**
- `src/lib/turso.ts` — already has `getConfig`, `setConfig`, `getAllConfig` ✅
- `src/lib/site-content.ts` (NEW) — server-side fetcher with caching

**New file: `src/lib/site-content.ts`**
```typescript
import { getConfig } from "@/lib/turso";
import { siteConfig as tsSiteConfig } from "@/data/site-data";
import { packagesContent as tsPackages } from "@/data/packages-content";
import { destinationsContent as tsDestinations } from "@/data/destinations-content";
import { pageFaqs as tsFaqs } from "@/data/page-faqs";

// Fallback pattern: try Turso first, fall back to TS file
// This guarantees the site never breaks even if Turso is down

export async function getBrand() {
  return (await getConfig("brand")) || tsSiteConfig.brand;
}
export async function getSocial() {
  return (await getConfig("social")) || tsSiteConfig.social;
}
export async function getStats() {
  return (await getConfig("stats")) || tsSiteConfig.stats;
}
export async function getOffices() {
  return (await getConfig("offices")) || tsSiteConfig.offices;
}
export async function getTestimonials() {
  return (await getConfig("testimonials")) || tsSiteConfig.testimonials;
}
export async function getFaqs() {
  return (await getConfig("faqs")) || tsFaqs;
}
export async function getPackages() {
  return (await getConfig("packages")) || tsPackages;
}
export async function getDestinations() {
  return (await getConfig("destinations")) || tsDestinations;
}
```

**Why fallback pattern?**
- If Turso is down → site still works (uses TS file)
- If admin sets bad data → we can manually revert by deleting the Turso key
- Zero risk of breaking production

---

### Phase 3: Page Updates (3 hours)

Update these pages to read from Turso (via `site-content.ts`):

| Page | What changes | Cache strategy |
|---|---|---|
| `src/app/page.tsx` (homepage) | Brand, stats, testimonials, FAQs from Turso | `export const revalidate = 300` |
| `src/app/packages/page.tsx` | Packages list from Turso | `export const revalidate = 300` |
| `src/app/packages/[slug]/page.tsx` | Single package from Turso | `export const revalidate = 300` |
| `src/app/destinations/page.tsx` | Stats, FAQs from Turso (destinations list stays static since it's image URLs) | `export const revalidate = 300` |
| `src/app/destinations/[slug]/page.tsx` | Spain/Turkey content from Turso | `export const revalidate = 300` |
| `src/app/about/page.tsx` | Brand, stats, FAQs from Turso | `export const revalidate = 300` |
| `src/app/contact/page.tsx` | Brand, offices, FAQs from Turso | `export const revalidate = 300` |
| `src/app/team/page.tsx` | FAQs from Turso | `export const revalidate = 300` |
| `src/app/resources/page.tsx` | FAQs from Turso | `export const revalidate = 300` |
| `src/app/library/page.tsx` | FAQs from Turso | `export const revalidate = 300` |
| `src/app/testimonials/page.tsx` | Testimonials from Turso | `export const revalidate = 300` |
| `src/app/tests-exams/page.tsx` | FAQs from Turso | `export const revalidate = 300` |
| `src/components/layout/Header.tsx` | Brand name/logo from Turso (optional) | Static (rebuilds on deploy) |
| `src/components/layout/Footer.tsx` | Brand, social, offices from Turso | Static (rebuilds on deploy) |

**ISR Strategy:**
- `revalidate = 300` means: pages regenerate at most every 5 minutes
- First visitor after admin saves: still sees old cached version
- Within 5 minutes: next visitor triggers regeneration
- Subsequent visitors: see fresh content
- Trade-off: 5 min delay vs. instant site speed for cached visitors

---

### Phase 4: Admin UI Extension (3 hours)

Extend `src/app/admin/page.tsx` with new tabs.

**Existing tabs (keep as-is):**
- 📊 stats
- 🎓 universities
- 🖼️ hero
- 📞 contact
- 📦 basicPackage
- ✈️ additionalPackage
- 📋 registration
- ❓ faqs

**New tabs to add:**

#### Tab: 🏢 Brand Info
- Brand name
- Logo URL (text field, customer pastes URL)
- Tagline
- Email
- WhatsApp number
- Copyright text

#### Tab: 📱 Social Links
- Instagram URL
- TikTok URL
- Facebook URL
- Twitter URL
- YouTube URL

#### Tab: 💬 Testimonials
- List editor: each item has { name, country, program, text }
- Add / remove / reorder
- Text areas for the testimonial body

#### Tab: 🏛️ Offices
- List editor: each item has { city, country, address, phone, email, hours }
- Add / remove

#### Tab: 📦 Packages (9 packages)
- Sub-tabs or dropdown to select package
- For each package:
  - Slug (read-only)
  - Title
  - Subtitle
  - Price (if applicable)
  - Intro text (textarea)
  - Tiers (list of { name, subtitle, price, features[], idealFor })
  - For each tier: features list of { title, description }
- This is the most complex tab — needs nested list editors

#### Tab: 🌍 Destinations (Spain + Turkey)
- Sub-tabs: Spain | Turkey
- For each destination:
  - Slug (read-only)
  - Hero subtitle
  - Hero description (textarea)
  - Stats list (4 items: { label, value })
  - Overview title
  - Overview paragraphs (list of textareas)
  - Additional sections (complex — depends on destination type)
    - Spain: two-paths, comparison-table, who-fits, cta
    - Turkey: key-advantages, student-cities, why-universities, things-to-consider, tuition-table, living-costs, post-graduation, why-unistation, majors, cta

#### Tab: ❓ FAQs (already exists)
- Already has a tab — just need to verify it covers all 10 FAQ groups
- Groups: about, contact, destinations, packages, team, resources, testimonials, library, spain, turkey

---

### Phase 5: Testing & Polish (1.5 hours)

1. **Migration test:** run script, verify data in Turso
2. **Read test:** each page loads correctly with Turso data
3. **Edit test:** change a price in admin → verify it appears on site within 5 min
4. **Fallback test:** simulate Turso outage → site still loads from TS files
5. **Mobile UI test:** admin works on mobile (existing admin already mobile-responsive)
6. **Customer documentation:** write a short guide (Arabic) with screenshots showing how to edit each section

---

## ⚠️ Risks & Mitigations

| Risk | Likelihood | Mitigation |
|---|---|---|
| Turso outage breaks site | Low | Fallback pattern — TS files always available |
| Admin enters bad data (e.g., deletes required field) | Medium | Validation on save + undo button (already exists) + TS fallback |
| 5-min cache delay confuses customer | Medium | Document clearly: "changes appear within 5 minutes" |
| Packages content is complex (nested 3 levels) | High | Build progressive UI — simple fields first, advanced expandable |
| Admin password leaked | Low | Customer can change password via env var `ADMIN_PASSWORD` |
| Turso free tier limit hit (9GB) | Very Low | All text data is < 1MB total |

---

## 📦 Deliverables

After completion, customer will have:

1. **Admin URL:** `https://unistation.ae/admin`
2. **Login:** password-protected (configurable via env var)
3. **Tabs covered:**
   - Brand Info ✏️
   - Social Links ✏️
   - Stats ✏️
   - Testimonials ✏️
   - Offices ✏️
   - Packages (9 packages, all fields) ✏️
   - Destinations (Spain + Turkey rich content) ✏️
   - FAQs (10 groups) ✏️
   - Universities ✏️ (existing)
   - Hero ✏️ (existing)
   - Contact ✏️ (existing)
   - Basic Package ✏️ (existing)
   - Additional Package ✏️ (existing)
   - Registration ✏️ (existing)
4. **Documentation:** Arabic guide with screenshots
5. **Backup:** TS files remain as fallback (never deleted)

---

## 🔧 Technical Decisions (Locked In)

| Decision | Choice | Reason |
|---|---|---|
| DB | Turso (existing) | Already integrated, free, fast |
| Auth | Password (existing) | Customer simplicity |
| Cache | ISR `revalidate = 300` | Balance: fast site + reasonable update delay |
| Image handling | None in admin | Customer won't edit images |
| Fallback | TS files | Safety net for DB outage |
| Migration | One-way script | TS → Turso, then TS becomes read-only fallback |
| Admin URL | `/admin` (existing) | Customer already knows it from Georgia page |

---

## 📅 Execution Timeline

| Hour | Task |
|---|---|
| 0:00 – 2:00 | Phase 1: Migration script |
| 2:00 – 5:00 | Phase 2: Data layer refactor |
| 5:00 – 8:00 | Phase 3: Page updates |
| 8:00 – 11:00 | Phase 4: Admin UI extension |
| 11:00 – 12:30 | Phase 5: Testing & polish |
| 12:30 – 13:00 | Deploy + final verification |

**Total: ~13 hours (1.5–2 working days)**

---

## ✅ Pre-flight Checklist (Before Starting)

- [ ] Confirm customer wants this approach (Turso-based, no image editing)
- [ ] Confirm admin password (keep `unistation2024` or change?)
- [ ] Confirm ISR cache duration (5 min OK?)
- [ ] Backup current TS data files (already in git, but verify)
- [ ] Verify Turso DB connection still works
- [ ] Confirm Vercel deployment pipeline works

---

## 🎯 Success Criteria

1. Customer logs into `/admin` with password
2. Customer edits a package price → saves
3. Within 5 minutes, the new price appears on the live site
4. If Turso goes down, site continues to work (TS fallback)
5. All existing pages still load with same speed (cached ISR)
6. No data loss — TS files remain as backup

---

**End of plan. Ready to execute on user's signal.**
