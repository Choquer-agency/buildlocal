# BuildLocal.agency Site Architecture
## Sprint 2 Deliverable — March 2026

**Purpose:** Blueprint for scaling from 15 pages to 349+ pages while maintaining sub-2-minute builds, clean internal linking, and maximum organic visibility.

**Depends on:** Sprint 1 Content Strategy (349 pages defined across 7 page types)

---

## 1. URL Structure Decisions

### Decision 1: Industry + City Pages — Nested

**Pattern:** `/industries/[trade]/[city]`
**Example:** `/industries/roofing/phoenix`

**Rationale:**
1. **Maps directly to Next.js App Router.** A single `src/app/industries/[slug]/[city]/page.tsx` route handles all 255 combinations with `generateStaticParams()`. No custom rewrite rules needed.
2. **Clear URL hierarchy.** Google can infer the parent-child relationship: `/industries/roofing` is the hub, `/industries/roofing/phoenix` is the child. This aligns with breadcrumb structure and passes PageRank upward through the URL tree.
3. **Breadcrumbs work naturally.** `Home > Industries > Roofing > Phoenix` maps 1:1 to the URL segments.
4. **Avoids slug collisions.** A flat URL like `/roofing-website-design-phoenix` would require a catch-all route or manual mapping. Nested routes are explicit.
5. **Consistent with content strategy.** The content strategy already defined the URL pattern as `/industries/[trade]/[city]`.

**Rejected alternative:** `/roofing-website-design-phoenix` (flat). While keyword-rich URLs can help marginally, the maintenance cost at 255 pages is high, slug parsing is brittle, and the SEO benefit of exact-match URLs has diminished since Google's EMD update.

### Decision 2: City Hub Pages

**Pattern:** `/locations/[city]`
**Example:** `/locations/phoenix`

**Rationale:**
1. **Avoids ambiguity with `/cities/`.** "Locations" is a broader term that works if BuildLocal ever expands beyond Arizona cities to regions or neighborhoods.
2. **Consistent with content strategy.** The strategy already specifies `/locations/[city]`.
3. **No conflict with existing routes.** No current route uses `/locations/`.

### Decision 3: Comparison Pages

**Pattern:** `/compare/[slug]`
**Example:** `/compare/buildlocal-vs-scorpion`

**Rationale:**
1. **Groups all comparison content under one path.** Makes it easy to exclude from sitemap or adjust crawl behavior if needed.
2. **Slug format is descriptive.** `buildlocal-vs-scorpion` is readable, includes both brand names (good for "alternative to X" searches), and is consistent across all 9 pages.

### Decision 4: Case Study Pages

**Pattern:** `/case-studies/[slug]`
**Example:** `/case-studies/roofing-company-phoenix`

**Rationale:**
1. **Separates case studies from blog posts.** Different content type, different intent (social proof vs. education), different schema markup.
2. **Slug includes trade + city.** Targets long-tail searches like "roofing company website case study."

### Decision 5: Blog Posts

**Pattern:** `/blog/[slug]` (keep existing — flat)
**Example:** `/blog/roofing-website-guide`

**Rationale:**
1. **45 posts do not need category routing.** Category routes (`/blog/seo/[slug]`) add complexity with minimal SEO benefit at this scale.
2. **Existing URLs are already indexed.** Several blog posts exist. Changing the pattern would require redirects for zero gain.
3. **Blog listing page stays at `/blog`.** Pagination added (see Section 9).

### Decision 6: Resource / Tool Pages

**Pattern:** `/tools/[slug]` for interactive tools, `/resources/[slug]` for static resources
**Examples:** `/tools/seo-roi-calculator`, `/tools/website-cost-calculator`, `/resources/website-launch-checklist`

**Rationale:**
1. **Separates interactive tools from downloadable resources.** Different UX expectations and schema types.
2. **Existing `/tools/seo-roi-calculator` URL is preserved.** No redirect needed.

### Decision 7: Existing Broad Industry Pages

**Action:** Keep `/industries/trades-home-services` as a category hub page. Do NOT delete or redirect.

**Rationale:**
1. **Already indexed by Google.** Breaking this URL sacrifices any accumulated authority.
2. **Serves as a category landing page.** Links to all 15 specific trade industry hubs. Acts as a gateway for visitors who don't know their exact category.
3. **The 4 existing broad pages become category hubs** that sit logically above the 15 specific trade hubs.

### Decision 8: Trailing Slash Policy

**Policy:** No trailing slashes. Enforce via Next.js `trailingSlash: false` (default).

All URLs are canonical without a trailing slash. If a user visits `/industries/roofing/`, Next.js will serve the page (no 404), but the canonical tag points to `/industries/roofing`.

### Decision 9: www vs. non-www

**Policy:** non-www (already enforced in middleware). Canonical URLs use `https://buildlocal.agency/...`.

---

## 2. Redirect Map

### Existing URLs That Change

No existing URLs need to change. All current routes are preserved:

| Existing URL | Action | Notes |
|---|---|---|
| `/industries/trades-home-services` | Keep | Becomes category hub linking to 15 trade hubs |
| `/industries/local-services` | Keep | Becomes category hub |
| `/industries/retail-lifestyle` | Keep | Becomes category hub |
| `/industries/professional-services` | Keep | Becomes category hub |
| `/blog/[slug]` (all existing posts) | Keep | No URL change |
| `/tools/seo-roi-calculator` | Keep | No URL change |
| `/services/[slug]` (all 4) | Keep | No URL change |

### Future-Proofing

If any URL must change in the future, add redirects in `next.config.mjs`:

```js
const nextConfig = {
  async redirects() {
    return [
      // Example: if we ever rename a slug
      // { source: '/old-path', destination: '/new-path', permanent: true },
    ];
  },
};
```

---

## 3. Full Page Hierarchy

```
buildlocal.agency/
│
├── /                                          # Homepage
├── /about                                     # About page
├── /pricing                                   # Pricing page
├── /how-it-works                              # Process page
├── /portfolio                                 # Portfolio page
├── /faq                                       # FAQ page
│
├── /services/                                 # Service pages (4)
│   ├── /services/website-design
│   ├── /services/website-management
│   ├── /services/seo-local-search
│   └── /services/google-business-profile
│
├── /industries/                               # Industry section
│   │
│   │── /industries/trades-home-services       # Category hub (existing)
│   │── /industries/local-services             # Category hub (existing)
│   │── /industries/retail-lifestyle           # Category hub (existing)
│   │── /industries/professional-services      # Category hub (existing)
│   │
│   ├── /industries/roofing                    # Industry hub (NEW)
│   │   ├── /industries/roofing/phoenix
│   │   ├── /industries/roofing/scottsdale
│   │   ├── /industries/roofing/mesa
│   │   ├── /industries/roofing/tempe
│   │   ├── /industries/roofing/chandler
│   │   ├── /industries/roofing/gilbert
│   │   ├── /industries/roofing/glendale
│   │   ├── /industries/roofing/peoria
│   │   ├── /industries/roofing/surprise
│   │   ├── /industries/roofing/goodyear
│   │   ├── /industries/roofing/buckeye
│   │   ├── /industries/roofing/avondale
│   │   ├── /industries/roofing/tucson
│   │   ├── /industries/roofing/maricopa
│   │   ├── /industries/roofing/queen-creek
│   │   ├── /industries/roofing/cave-creek
│   │   └── /industries/roofing/fountain-hills
│   │
│   ├── /industries/foundation-repair          # Industry hub
│   │   └── ... (17 city pages)
│   │
│   ├── /industries/hvac                       # Industry hub
│   │   └── ... (17 city pages)
│   │
│   ├── /industries/plumbing                   # Industry hub
│   │   └── ... (17 city pages)
│   │
│   ├── /industries/electrical                 # Industry hub
│   │   └── ... (17 city pages)
│   │
│   ├── /industries/concrete-hardscaping       # Industry hub
│   │   └── ... (17 city pages)
│   │
│   ├── /industries/fencing                    # Industry hub
│   │   └── ... (17 city pages)
│   │
│   ├── /industries/water-damage-restoration   # Industry hub
│   │   └── ... (17 city pages)
│   │
│   ├── /industries/landscaping                # Industry hub
│   │   └── ... (17 city pages)
│   │
│   ├── /industries/painting                   # Industry hub
│   │   └── ... (17 city pages)
│   │
│   ├── /industries/general-contracting        # Industry hub
│   │   └── ... (17 city pages)
│   │
│   ├── /industries/pressure-washing           # Industry hub
│   │   └── ... (17 city pages)
│   │
│   ├── /industries/handyman                   # Industry hub
│   │   └── ... (17 city pages)
│   │
│   ├── /industries/flooring                   # Industry hub
│   │   └── ... (17 city pages)
│   │
│   └── /industries/siding-gutters             # Industry hub
│       └── ... (17 city pages)
│
├── /locations/                                # City section (17 city hubs)
│   ├── /locations/phoenix
│   ├── /locations/scottsdale
│   ├── /locations/mesa
│   ├── /locations/tempe
│   ├── /locations/chandler
│   ├── /locations/gilbert
│   ├── /locations/glendale
│   ├── /locations/peoria
│   ├── /locations/surprise
│   ├── /locations/goodyear
│   ├── /locations/buckeye
│   ├── /locations/avondale
│   ├── /locations/tucson
│   ├── /locations/maricopa
│   ├── /locations/queen-creek
│   ├── /locations/cave-creek
│   └── /locations/fountain-hills
│
├── /blog/                                     # Blog listing
│   ├── /blog/page/[num]                       # Paginated blog listing (page 2+)
│   ├── /blog/roofing-website-guide
│   ├── /blog/foundation-repair-website-guide
│   ├── /blog/hvac-website-guide
│   ├── /blog/plumbing-website-guide
│   ├── /blog/electrician-website-guide
│   ├── /blog/concrete-hardscaping-website-guide
│   ├── /blog/fencing-website-guide
│   ├── /blog/water-damage-restoration-website-guide
│   ├── /blog/landscaping-website-guide
│   ├── /blog/painting-website-guide
│   ├── /blog/general-contractor-website-guide
│   ├── /blog/pressure-washing-website-guide
│   ├── /blog/handyman-website-guide
│   ├── /blog/flooring-website-guide
│   ├── /blog/siding-gutters-website-guide
│   ├── /blog/website-roi-small-business
│   ├── /blog/cost-of-not-having-a-website
│   ├── /blog/website-vs-lead-gen-platforms
│   ├── /blog/how-much-does-a-trade-website-cost
│   ├── /blog/website-leads-vs-word-of-mouth
│   ├── /blog/google-reviews-and-your-website
│   ├── /blog/tracking-website-leads
│   ├── /blog/seasonal-website-strategy-trades
│   ├── /blog/arizona-contractor-market-2026
│   ├── /blog/phoenix-small-business-website-guide
│   ├── /blog/tucson-vs-phoenix-business-market
│   ├── /blog/east-valley-growth-trades
│   ├── /blog/west-valley-new-construction
│   ├── /blog/arizona-roofer-marketing
│   ├── /blog/scottsdale-luxury-trades
│   ├── /blog/local-seo-trades-beginners
│   ├── /blog/google-business-profile-trades
│   ├── /blog/what-makes-a-good-contractor-website
│   ├── /blog/mobile-first-website-trades
│   ├── /blog/website-speed-matters
│   ├── /blog/diy-website-vs-professional
│   ├── /blog/why-every-small-business-needs-a-website
│   ├── /blog/schema-markup-local-business
│   ├── /blog/questions-to-ask-web-designer
│   ├── /blog/red-flags-web-design-agencies
│   ├── /blog/website-contract-traps
│   ├── /blog/what-to-expect-first-month
│   ├── /blog/why-trades-businesses-switch-to-buildlocal
│   ├── /blog/website-redesign-checklist
│   └── /blog/when-to-replace-your-website
│
├── /compare/                                  # Comparison pages (9)
│   ├── /compare/buildlocal-vs-scorpion
│   ├── /compare/buildlocal-vs-thryv
│   ├── /compare/buildlocal-vs-hibu
│   ├── /compare/buildlocal-vs-blue-corona
│   ├── /compare/buildlocal-vs-webfx
│   ├── /compare/buildlocal-vs-wix
│   ├── /compare/buildlocal-vs-squarespace
│   ├── /compare/buildlocal-vs-godaddy
│   └── /compare/buildlocal-vs-local-agencies
│
├── /case-studies/                             # Case study pages (6)
│   ├── /case-studies/roofing-company-phoenix
│   ├── /case-studies/hvac-company-arizona
│   ├── /case-studies/plumbing-company-mesa
│   ├── /case-studies/foundation-repair-tucson
│   ├── /case-studies/landscaping-company-scottsdale
│   └── /case-studies/electrician-chandler
│
├── /tools/                                    # Interactive tools (3)
│   ├── /tools/seo-roi-calculator              # (existing)
│   ├── /tools/website-cost-calculator
│   └── /tools/website-grader
│
├── /resources/                                # Static resources (2)
│   ├── /resources/website-launch-checklist
│   └── /resources/trades-marketing-guide
│
└── /api/                                      # API routes (unchanged)
    ├── /api/lead-report
    └── /api/webhook/formspark
```

**Total page count:** 6 (core) + 4 (services) + 4 (category hubs) + 15 (industry hubs) + 255 (industry+city) + 17 (city hubs) + 45 (blog) + 9 (compare) + 6 (case studies) + 3 (tools) + 2 (resources) = **362 pages**

---

## 4. Next.js Route File Structure

```
src/app/
├── page.tsx                                    # Homepage
├── layout.tsx                                  # Root layout
├── not-found.tsx                               # 404 page
├── robots.ts                                   # Dynamic robots.txt
├── sitemap.ts                                  # Sitemap index (refactored)
├── sitemap/
│   ├── [id]/route.ts                           # Dynamic sub-sitemaps
│
├── about/page.tsx
├── pricing/page.tsx
├── how-it-works/page.tsx
├── portfolio/page.tsx
├── faq/page.tsx
│
├── services/
│   └── [slug]/page.tsx                         # generateStaticParams() — 4 slugs
│
├── industries/
│   └── [slug]/
│       ├── page.tsx                            # Industry hub — generateStaticParams() — 19 slugs (4 existing + 15 new)
│       └── [city]/
│           └── page.tsx                        # Industry+city — generateStaticParams() — 255 combinations
│
├── locations/
│   └── [city]/
│       └── page.tsx                            # City hub — generateStaticParams() — 17 slugs
│
├── blog/
│   ├── page.tsx                                # Blog listing (page 1)
│   ├── page/
│   │   └── [num]/page.tsx                      # Paginated blog listing — generateStaticParams()
│   └── [slug]/page.tsx                         # Blog post — generateStaticParams() — 45 slugs
│
├── compare/
│   └── [slug]/page.tsx                         # Comparison page — generateStaticParams() — 9 slugs
│
├── case-studies/
│   └── [slug]/page.tsx                         # Case study — generateStaticParams() — 6 slugs
│
├── tools/
│   ├── seo-roi-calculator/page.tsx             # Existing (keep static route)
│   ├── website-cost-calculator/page.tsx        # New static route
│   └── website-grader/page.tsx                 # New static route
│
├── resources/
│   ├── website-launch-checklist/page.tsx       # New static route
│   └── trades-marketing-guide/page.tsx         # New static route
│
└── api/
    ├── lead-report/route.ts                    # Existing
    └── webhook/formspark/route.ts              # Existing
```

### generateStaticParams() Implementation Notes

**Industry hub page** (`src/app/industries/[slug]/page.tsx`):
```ts
export function generateStaticParams() {
  // Returns all 19 industry slugs (4 existing category + 15 specific trade)
  return getAllIndustrySlugs().map((slug) => ({ slug }));
}
```

**Industry+city page** (`src/app/industries/[slug]/[city]/page.tsx`):
```ts
export function generateStaticParams() {
  // Returns all 255 combinations
  const industries = getTradeIndustrySlugs(); // 15 trade slugs only
  const cities = getAllCitySlugs();           // 17 city slugs
  return industries.flatMap((slug) =>
    cities.map((city) => ({ slug, city }))
  );
}
```

**City hub page** (`src/app/locations/[city]/page.tsx`):
```ts
export function generateStaticParams() {
  return getAllCitySlugs().map((city) => ({ city }));
}
```

**Comparison page** (`src/app/compare/[slug]/page.tsx`):
```ts
export function generateStaticParams() {
  return getAllComparisonSlugs().map((slug) => ({ slug }));
}
```

**Case study page** (`src/app/case-studies/[slug]/page.tsx`):
```ts
export function generateStaticParams() {
  return getAllCaseStudySlugs().map((slug) => ({ slug }));
}
```

**Blog pagination** (`src/app/blog/page/[num]/page.tsx`):
```ts
const POSTS_PER_PAGE = 12;

export function generateStaticParams() {
  const totalPosts = getAllBlogPosts().length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  // Start from page 2 (page 1 is /blog)
  return Array.from({ length: totalPages - 1 }, (_, i) => ({
    num: String(i + 2),
  }));
}
```

### Critical: Remove `force-dynamic`

Every page that currently has `export const dynamic = "force-dynamic"` must have that line removed and replaced with static generation. The `getDomainConfig()` function currently calls `headers()`, which forces dynamic rendering. For static generation, domain config must be resolved at build time:

**Option A (Recommended):** Since `domainMap` only contains one entry (`buildlocal.agency`), hardcode `defaultConfig` at build time and remove the `headers()` dependency from page components. Use `getDomainConfig()` only in middleware or API routes.

**Option B:** Use `generateStaticParams()` with a domain parameter and generate pages per-domain. Only needed when multi-tenant actually has multiple domains.

```ts
// New: src/lib/getStaticDomainConfig.ts
import { defaultConfig } from "@/content/config";

export function getStaticDomainConfig() {
  // Build-time resolution. No headers() call.
  // When multi-tenant is needed, this reads from an env var or build-time config.
  return defaultConfig;
}
```

Replace `getDomainConfig()` with `getStaticDomainConfig()` in all page components. Keep `getDomainConfig()` for middleware, API routes, and any truly dynamic contexts.

---

## 5. Navigation Design

### Header Navigation (Desktop)

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  [Logo]    Industries ▾    Locations ▾    Services ▾    Pricing    Blog    [Get Started →]  │
└──────────────────────────────────────────────────────────────────────────────┘
```

**7 items total:** Industries (dropdown), Locations (dropdown), Services (dropdown), Pricing, Blog, About (in overflow or footer only), CTA button.

### Industries Mega Menu

When "Industries" is hovered/clicked, display a mega menu organized into two columns:

```
┌─────────────────────────────────────────────────────────────────┐
│  TRADES WE SERVE                    │  TOP MARKETS              │
│                                     │                           │
│  ★ Roofing                          │  Phoenix                  │
│  ★ HVAC                             │  Scottsdale               │
│  ★ Plumbing                         │  Mesa                     │
│  ★ Electrical                       │  Tucson                   │
│  ★ Foundation Repair                │  Tempe                    │
│    Concrete & Hardscaping           │  Chandler · Gilbert       │
│    Landscaping                      │                           │
│    Painting                         │  → View all 17 locations  │
│    General Contracting              │                           │
│    Fencing                          │                           │
│    Water Damage Restoration         │                           │
│    Pressure Washing                 │                           │
│    Handyman                         │                           │
│    Flooring                         │                           │
│    Siding & Gutters                 │                           │
│                                     │                           │
│  → View all industries              │                           │
└─────────────────────────────────────────────────────────────────┘
```

- Left column: All 15 trades, P1 trades marked with ★ and listed first.
- Right column: Top 7 cities as quick links, with a "View all locations" link.
- Clicking a trade goes to its industry hub (e.g., `/industries/roofing`).
- Clicking a city goes to its city hub (e.g., `/locations/phoenix`).

### Locations Dropdown

Simple dropdown (not mega menu):

```
┌───────────────────────┐
│  Phoenix              │
│  Scottsdale           │
│  Mesa                 │
│  Tucson               │
│  Tempe                │
│  Chandler             │
│  Gilbert              │
│  ─────────────────    │
│  → All AZ locations   │
└───────────────────────┘
```

Shows top 7 cities. "All AZ locations" links to a section on the homepage or a dedicated `/locations` index page if warranted later.

### Services Dropdown

```
┌────────────────────────────────┐
│  Website Design & Development  │
│  Website Management            │
│  SEO & Local Search            │
│  Google Business Profile       │
└────────────────────────────────┘
```

### Mobile Navigation (Hamburger)

```
[☰] → slides in from right

  Industries                    [+]
    → Roofing
    → HVAC
    → Plumbing
    → ... (all 15, scrollable)
  Locations                     [+]
    → Phoenix
    → Scottsdale
    → ... (all 17, scrollable)
  Services                      [+]
    → Website Design
    → Website Management
    → SEO & Local Search
    → Google Business Profile
  Pricing
  Blog
  About

  ┌──────────────────────────┐
  │  Get Your Free Mockup →  │
  └──────────────────────────┘
```

Accordion-style expandable sections. CTA button pinned to bottom of the slide-out panel.

### Footer Navigation

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                                                                 │
│  SERVICES            INDUSTRIES         LOCATIONS          COMPANY              │
│  Website Design      Roofing            Phoenix            About                │
│  Website Management  HVAC               Scottsdale         Pricing              │
│  SEO & Local Search  Plumbing           Mesa               How It Works         │
│  Google Bus. Profile Electrical         Tucson             Portfolio             │
│                      Foundation Repair  Tempe              FAQ                  │
│  RESOURCES           Concrete           Chandler           Blog                 │
│  SEO ROI Calculator  Landscaping        Gilbert            Case Studies         │
│  Website Cost Calc   Painting           Glendale                                │
│  Website Grader      General Contract.  Peoria             COMPARE              │
│  Launch Checklist    Fencing            Surprise           vs. Scorpion         │
│  Marketing Guide     Water Damage Rest. Goodyear           vs. Wix             │
│                      Pressure Washing   Buckeye            vs. Squarespace      │
│                      Handyman           Avondale           vs. Local Agencies   │
│                      Flooring           Maricopa                                │
│                      Siding & Gutters   Queen Creek                             │
│                                         Cave Creek                              │
│                                         Fountain Hills                          │
│                                                                                 │
│  ─────────────────────────────────────────────────────────────────────────────  │
│  © 2026 BuildLocal. All rights reserved.   Privacy Policy · Terms of Service   │
└─────────────────────────────────────────────────────────────────────────────────┘
```

5 columns: Services, Industries (all 15), Locations (all 17), Company, Resources + Compare.

The footer is a critical internal linking asset. Every page on the site links to all 15 industry hubs and all 17 city hubs through the footer. This alone creates 362 pages x 32 hub links = 11,584 internal links pointing at hub pages.

---

## 6. Internal Linking Rules

### Rule 1: Industry Hub → City Pages

**Where:** On every industry hub page (e.g., `/industries/roofing`)
**What:** Link to all 17 city pages for that trade.
**How:** A grid/list section titled "Roofing Website Design by City" with 17 cards.
**Anchor text pattern:** `Roofing Website Design in [City]`

```
Example on /industries/roofing:
  → "Roofing Website Design in Phoenix"      → /industries/roofing/phoenix
  → "Roofing Website Design in Scottsdale"   → /industries/roofing/scottsdale
  → ... (all 17 cities)
```

### Rule 2: City Hub → Industry Pages

**Where:** On every city hub page (e.g., `/locations/phoenix`)
**What:** Link to all 15 industry pages for that city.
**How:** A grid section titled "Website Design for Phoenix Trades Businesses" with 15 cards.
**Anchor text pattern:** `[Trade] Website Design [City]`

```
Example on /locations/phoenix:
  → "Roofing Website Design Phoenix"         → /industries/roofing/phoenix
  → "HVAC Website Design Phoenix"            → /industries/hvac/phoenix
  → ... (all 15 trades)
```

### Rule 3: Industry+City → Parent Industry Hub

**Where:** On every industry+city page (e.g., `/industries/roofing/phoenix`)
**What:** Link back to the parent industry hub.
**How:** In breadcrumbs (always), in the intro paragraph, and in a "Learn More" CTA section.
**Anchor text pattern:** `[Trade] Website Design` or `Learn more about websites for [trade plural]`

```
Example on /industries/roofing/phoenix:
  → "Roofing Website Design"                 → /industries/roofing
```

### Rule 4: Industry+City → Parent City Hub

**Where:** On every industry+city page
**What:** Link back to the city hub.
**How:** In the local market section and in a "More services in [City]" sidebar/section.
**Anchor text pattern:** `Web Design in [City]` or `More website services in [City]`

```
Example on /industries/roofing/phoenix:
  → "Web Design in Phoenix"                  → /locations/phoenix
```

### Rule 5: Industry+City → Adjacent City Pages (Same Trade)

**Where:** On every industry+city page
**What:** Link to 3-5 geographically nearby cities for the same trade.
**How:** A "Nearby Areas" section at the bottom of the page.
**Anchor text pattern:** `[Trade] Website Design [Adjacent City]`

**Adjacency map (based on Phoenix metro geography):**

| City | Adjacent Cities (link to these) |
|---|---|
| Phoenix | Scottsdale, Tempe, Glendale, Mesa, Paradise Valley* |
| Scottsdale | Phoenix, Tempe, Fountain Hills, Cave Creek, Mesa |
| Mesa | Tempe, Chandler, Gilbert, Scottsdale, Phoenix |
| Tempe | Phoenix, Mesa, Scottsdale, Chandler, Guadalupe* |
| Chandler | Gilbert, Tempe, Mesa, Queen Creek, Phoenix |
| Gilbert | Chandler, Mesa, Queen Creek, Tempe, Scottsdale |
| Glendale | Phoenix, Peoria, Surprise, Avondale, Scottsdale |
| Peoria | Glendale, Surprise, Phoenix, Goodyear, Scottsdale |
| Surprise | Peoria, Goodyear, Buckeye, Glendale, Phoenix |
| Goodyear | Buckeye, Avondale, Surprise, Peoria, Phoenix |
| Buckeye | Goodyear, Surprise, Avondale, Phoenix, Maricopa |
| Avondale | Goodyear, Buckeye, Phoenix, Glendale, Tempe |
| Tucson | Maricopa, Phoenix (distant link OK — different metro) |
| Maricopa | Chandler, Gilbert, Tucson, Buckeye, Phoenix |
| Queen Creek | Gilbert, Chandler, Mesa, Maricopa, Fountain Hills |
| Cave Creek | Scottsdale, Fountain Hills, Phoenix, Peoria, Glendale |
| Fountain Hills | Scottsdale, Mesa, Cave Creek, Gilbert, Phoenix |

*Cities marked with * are not in our 17-city list; skip those links.

### Rule 6: Blog → Hub Pages

**Where:** On every blog post
**What:** Link to 1-3 relevant industry hubs and 1-2 relevant city hubs within the body content.
**How:** Contextual in-text links (not a generic sidebar). Each blog post's frontmatter/config should specify `relatedIndustries` and `relatedCities`.
**Anchor text pattern:** Vary naturally. Examples:
  - "If you're a roofer looking to improve your online presence, see our [roofing website design](/industries/roofing) page."
  - "Phoenix-area contractors can learn more on our [Phoenix web design](/locations/phoenix) page."

**Mapping (blog → hubs):**

| Blog Post | Links To (Industries) | Links To (Cities) |
|---|---|---|
| `roofing-website-guide` | roofing | phoenix, tucson |
| `arizona-contractor-market-2026` | all 15 hubs (via list) | all 17 city hubs (via list) |
| `phoenix-small-business-website-guide` | top 5 trades | phoenix |
| `east-valley-growth-trades` | top 5 trades | mesa, gilbert, chandler |
| `website-vs-lead-gen-platforms` | all (general) | phoenix |
| ... | (defined per post in content config) | |

### Rule 7: Homepage → Hub Pages

**Where:** Homepage
**What:** Link to top 6 industry hubs and top 5 city hubs.
**How:** Two sections:
  1. "Website Design for Every Trade" — cards for Roofing, HVAC, Plumbing, Electrical, Foundation Repair, Concrete & Hardscaping
  2. "Serving Arizona's Biggest Markets" — cards for Phoenix, Scottsdale, Mesa, Tucson, Tempe

**Anchor text pattern:** `[Trade] Website Design` for industry cards, `Web Design in [City]` for city cards.

### Rule 8: Cross-Trade Links on Industry+City Pages

**Where:** On every industry+city page
**What:** Suggest 2-3 related trades for the same city.
**How:** A "Related Services in [City]" section.
**Anchor text pattern:** `[Related Trade] Website Design [City]`

**Cross-trade mapping:**

| Trade | Related Trades |
|---|---|
| Roofing | Siding & Gutters, General Contracting, Painting |
| Foundation Repair | Concrete & Hardscaping, General Contracting, Plumbing |
| HVAC | Electrical, Plumbing, General Contracting |
| Plumbing | HVAC, Electrical, Water Damage Restoration |
| Electrical | HVAC, Plumbing, General Contracting |
| Concrete & Hardscaping | Landscaping, Foundation Repair, Fencing |
| Fencing | Landscaping, Concrete & Hardscaping, Painting |
| Water Damage Restoration | Plumbing, General Contracting, Painting |
| Landscaping | Concrete & Hardscaping, Fencing, Pressure Washing |
| Painting | Pressure Washing, Handyman, General Contracting |
| General Contracting | Roofing, Electrical, Plumbing |
| Pressure Washing | Painting, Landscaping, Handyman |
| Handyman | Painting, Pressure Washing, Electrical |
| Flooring | General Contracting, Painting, Concrete & Hardscaping |
| Siding & Gutters | Roofing, Painting, General Contracting |

### Rule 9: Comparison Pages → Relevant Pages

**Where:** On every comparison page
**What:** Link to pricing, relevant industry hubs, and case studies.
**Anchor text pattern:** `See our pricing` → `/pricing`, `Read the [trade] case study` → `/case-studies/[slug]`

### Rule 10: Case Studies → Hub Pages

**Where:** On every case study page
**What:** Link to the relevant industry hub and city hub.
**Anchor text pattern:** `See all [trade] website design projects` → industry hub, `More [city] web design work` → city hub.

### Internal Linking Summary Table

| From Page Type | Links To | # Links | Anchor Pattern |
|---|---|---|---|
| Industry hub | All 17 city pages (same trade) | 17 | `[Trade] Website Design in [City]` |
| City hub | All 15 trade pages (same city) | 15 | `[Trade] Website Design [City]` |
| Industry+city | Parent industry hub | 1 | `[Trade] Website Design` |
| Industry+city | Parent city hub | 1 | `Web Design in [City]` |
| Industry+city | 3-5 adjacent cities (same trade) | 3-5 | `[Trade] Website Design [City]` |
| Industry+city | 2-3 related trades (same city) | 2-3 | `[Related Trade] Website Design [City]` |
| Blog post | 1-3 industry hubs | 1-3 | Contextual, varied |
| Blog post | 1-2 city hubs | 1-2 | Contextual, varied |
| Homepage | Top 6 industry hubs | 6 | `[Trade] Website Design` |
| Homepage | Top 5 city hubs | 5 | `Web Design in [City]` |
| Case study | Relevant industry hub + city hub | 2 | Contextual |
| Comparison | Pricing + case studies | 2-4 | Contextual |
| Footer (all pages) | All 15 industry hubs + 17 city hubs | 32 | Trade name / City name |

---

## 7. Breadcrumb Structure

Breadcrumbs use JSON-LD `BreadcrumbList` schema on every page. The visual breadcrumb matches the schema.

### Per Page Type

**Homepage:**
```
(no breadcrumb — this is the root)
```

**Industry Hub:**
```
Home → Industries → Roofing
```
JSON-LD: `[{Home, /}, {Industries, /industries/trades-home-services}, {Roofing, /industries/roofing}]`

Note: "Industries" breadcrumb links to the existing `/industries/trades-home-services` category hub. This preserves that page's utility as a parent.

**Industry+City:**
```
Home → Industries → Roofing → Phoenix
```
JSON-LD: `[{Home, /}, {Industries, /industries/trades-home-services}, {Roofing, /industries/roofing}, {Phoenix, /industries/roofing/phoenix}]`

**City Hub:**
```
Home → Locations → Phoenix
```
JSON-LD: `[{Home, /}, {Locations, /locations/phoenix}]`

Note: There is no `/locations` index page, so "Locations" in the breadcrumb is a non-linked label or links to the homepage section that lists locations.

**Blog Listing:**
```
Home → Blog
```

**Blog Post:**
```
Home → Blog → [Post Title]
```
JSON-LD: `[{Home, /}, {Blog, /blog}, {Post Title, /blog/[slug]}]`

**Comparison Page:**
```
Home → Compare → BuildLocal vs. [Competitor]
```
JSON-LD: `[{Home, /}, {Compare, /compare/buildlocal-vs-scorpion}]`

Note: No `/compare` index page needed. "Compare" is a label-only breadcrumb.

**Case Study:**
```
Home → Case Studies → [Case Study Title]
```
JSON-LD: `[{Home, /}, {Case Studies, /case-studies/roofing-company-phoenix}]`

**Service Page:**
```
Home → Services → [Service Title]
```
JSON-LD: `[{Home, /}, {Services, /services/website-design}]`

**Tool Page:**
```
Home → Tools → [Tool Name]
```

**Resource Page:**
```
Home → Resources → [Resource Name]
```

### Breadcrumb Component Implementation

```tsx
// src/components/Breadcrumbs.tsx
interface BreadcrumbItem {
  label: string;
  href?: string; // undefined = current page (last item, no link)
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

// Renders both visual breadcrumb nav and JSON-LD BreadcrumbList schema
```

---

## 8. Sitemap Strategy

### Current Problem

The existing `sitemap.ts` returns a single flat array of all URLs. At 362 pages, this is still manageable, but it uses `force-dynamic` and calls `headers()`, which prevents static generation.

### Recommended: Sitemap Index with Sub-Sitemaps

Split into a sitemap index (`/sitemap.xml`) that references multiple sub-sitemaps organized by page type:

| Sub-Sitemap | URL | Pages | Priority | Change Freq |
|---|---|---|---|---|
| Core pages | `/sitemap/core.xml` | 6 | 1.0 (homepage), 0.8-0.9 (others) | monthly |
| Services | `/sitemap/services.xml` | 4 | 0.9 | monthly |
| Industry hubs | `/sitemap/industries.xml` | 19 | 0.9 | monthly |
| Industry+city | `/sitemap/industry-cities.xml` | 255 | 0.8 | monthly |
| City hubs | `/sitemap/locations.xml` | 17 | 0.9 | monthly |
| Blog | `/sitemap/blog.xml` | 45+ | 0.7-0.8 | weekly |
| Compare | `/sitemap/compare.xml` | 9 | 0.7 | monthly |
| Case studies | `/sitemap/case-studies.xml` | 6 | 0.8 | monthly |
| Tools & resources | `/sitemap/tools.xml` | 5 | 0.7 | monthly |

### Priority Values

| Page Type | Priority | Rationale |
|---|---|---|
| Homepage | 1.0 | Root of authority |
| Pricing | 0.9 | High-converting page |
| Industry hubs | 0.9 | Hub pages, highest SEO value |
| City hubs | 0.9 | Hub pages, geo-authority |
| Service pages | 0.9 | Core commercial pages |
| Industry+city pages | 0.8 | High volume, high intent |
| Case studies | 0.8 | Social proof, conversion support |
| Blog posts | 0.7 | Informational, supports hubs |
| Comparison pages | 0.7 | Decision-stage, lower volume |
| Tools/resources | 0.7 | Lead magnets, utility pages |
| About, FAQ, How It Works | 0.6-0.7 | Supporting pages |

### Implementation

Replace the current `sitemap.ts` with a sitemap index approach. Next.js 14 supports `generateSitemaps()` for this:

**Option A: Multiple static sitemap files using `generateSitemaps()`**

```ts
// src/app/sitemap.ts

import { MetadataRoute } from "next";

export async function generateSitemaps() {
  return [
    { id: "core" },
    { id: "services" },
    { id: "industries" },
    { id: "industry-cities" },
    { id: "locations" },
    { id: "blog" },
    { id: "compare" },
    { id: "case-studies" },
    { id: "tools" },
  ];
}

export default async function sitemap({
  id,
}: {
  id: string;
}): Promise<MetadataRoute.Sitemap> {
  const domain = "buildlocal.agency";

  switch (id) {
    case "core":
      return [
        { url: `https://${domain}`, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
        { url: `https://${domain}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
        { url: `https://${domain}/pricing`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
        { url: `https://${domain}/how-it-works`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
        { url: `https://${domain}/portfolio`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
        { url: `https://${domain}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
      ];

    case "services":
      return getAllServiceSlugs().map((slug) => ({
        url: `https://${domain}/services/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.9,
      }));

    case "industries":
      return getAllIndustrySlugs().map((slug) => ({
        url: `https://${domain}/industries/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.9,
      }));

    case "industry-cities":
      const trades = getTradeIndustrySlugs();
      const cities = getAllCitySlugs();
      return trades.flatMap((trade) =>
        cities.map((city) => ({
          url: `https://${domain}/industries/${trade}/${city}`,
          lastModified: new Date(),
          changeFrequency: "monthly" as const,
          priority: 0.8,
        }))
      );

    case "locations":
      return getAllCitySlugs().map((city) => ({
        url: `https://${domain}/locations/${city}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.9,
      }));

    case "blog":
      const posts = getAllBlogPosts();
      return [
        { url: `https://${domain}/blog`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
        ...posts.map((post) => ({
          url: `https://${domain}/blog/${post.slug}`,
          lastModified: new Date(post.modifiedDate),
          changeFrequency: "monthly" as const,
          priority: 0.7,
        })),
      ];

    case "compare":
      return getAllComparisonSlugs().map((slug) => ({
        url: `https://${domain}/compare/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }));

    case "case-studies":
      return getAllCaseStudySlugs().map((slug) => ({
        url: `https://${domain}/case-studies/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.8,
      }));

    case "tools":
      return [
        { url: `https://${domain}/tools/seo-roi-calculator`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
        { url: `https://${domain}/tools/website-cost-calculator`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
        { url: `https://${domain}/tools/website-grader`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
        { url: `https://${domain}/resources/website-launch-checklist`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 },
        { url: `https://${domain}/resources/trades-marketing-guide`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 },
      ];

    default:
      return [];
  }
}
```

This produces:
- `/sitemap.xml` — sitemap index (auto-generated by Next.js)
- `/sitemap/core.xml`, `/sitemap/services.xml`, etc. — sub-sitemaps

### robots.ts Update

Remove `force-dynamic`. Hardcode the domain or use env var:

```ts
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const domain = "buildlocal.agency";
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
    ],
    sitemap: `https://${domain}/sitemap.xml`,
  };
}
```

---

## 9. Canonical URL Rules

### Rule 1: Self-Referencing Canonicals on Every Page

Every page must include a `<link rel="canonical">` pointing to itself. This is set via Next.js `generateMetadata()`:

```ts
alternates: {
  canonical: `https://buildlocal.agency/industries/roofing/phoenix`,
}
```

### Rule 2: No Trailing Slash

Canonical URLs never include a trailing slash. If someone visits `/industries/roofing/`, the canonical is `/industries/roofing`. Next.js handles this by default with `trailingSlash: false`.

### Rule 3: Always Lowercase

All slugs must be lowercase. If a URL is accessed with uppercase characters, middleware should 301 redirect to lowercase.

### Rule 4: Handling Duplicate Content Between Industry+City Pages

The 255 industry+city pages share a common template. To avoid thin/duplicate content flags:

1. **Each page must have unique content.** City-specific market data, local competitor stats, city-specific pain points, unique FAQ answers. The content strategy already specifies this.
2. **Unique title tags and meta descriptions.** Template: `[Trade] Website Design [City] AZ | Websites for [Trade Plural] — BuildLocal`
3. **Unique H1.** Template: `[Trade] Website Design in [City], Arizona`
4. **Self-referencing canonical.** No cross-canonicalization between city variants. Each page targets a unique keyword.
5. **No `noindex`.** All 255 pages should be indexed. They target distinct long-tail keywords.

### Rule 5: Multi-Tenant Canonical Handling

When/if multiple domains are added to `domainMap`, each domain's pages must canonical to that domain (not cross-domain). The canonical is always on the serving domain:

```
https://buildlocal.agency/industries/roofing → canonical: https://buildlocal.agency/industries/roofing
https://other-domain.com/industries/roofing  → canonical: https://other-domain.com/industries/roofing
```

If the same content exists on two domains, use `rel="alternate"` with `hreflang` (only if geo-targeting differs) or choose one canonical and `noindex` the other.

---

## 10. Pagination Strategy

### Blog Listing Page

**Posts per page:** 12 (fits a 3x4 grid on desktop, 2x6 on tablet, 1x12 on mobile).

**URL scheme:**
- Page 1: `/blog` (no page number in URL)
- Page 2: `/blog/page/2`
- Page 3: `/blog/page/3`
- Page 4: `/blog/page/4` (45 posts / 12 per page = 4 pages)

**SEO requirements:**
- Each paginated page has a unique canonical (`/blog/page/2` canonicals to itself, NOT to `/blog`).
- `rel="prev"` and `rel="next"` tags (even though Google says they ignore them, Bing uses them):
  ```html
  <!-- On /blog/page/2 -->
  <link rel="prev" href="https://buildlocal.agency/blog" />
  <link rel="next" href="https://buildlocal.agency/blog/page/3" />
  ```
- Each paginated page has a unique title: `Blog — Page 2 | BuildLocal`
- The meta description can be the same across pages (or omitted for pages 2+, letting Google generate it).

**Implementation:**
```
src/app/blog/
├── page.tsx                    # Page 1 — lists first 12 posts
└── page/
    └── [num]/page.tsx          # Pages 2+ — generateStaticParams()
```

### Industry Hub — No Pagination Needed

17 city cards fit on one page. Display all 17 in a responsive grid. No pagination.

### City Hub — No Pagination Needed

15 industry cards fit on one page. Display all 15 in a responsive grid. No pagination.

### Blog Post Pages — No Pagination

Individual blog posts are single pages. Long posts should use a table of contents with jump links, not pagination.

---

## 11. Migration Plan

### Phase 1: Preserve Existing URLs (Zero Breaking Changes)

| Existing URL | Action | New Role |
|---|---|---|
| `/industries/trades-home-services` | Keep as-is | Category hub — add links to all 15 trade-specific hubs |
| `/industries/local-services` | Keep as-is | Category hub (retain for existing traffic) |
| `/industries/retail-lifestyle` | Keep as-is | Category hub (retain for existing traffic) |
| `/industries/professional-services` | Keep as-is | Category hub (retain for existing traffic) |
| `/services/website-design` | Keep as-is | No change |
| `/services/website-management` | Keep as-is | No change |
| `/services/seo-local-search` | Keep as-is | No change |
| `/services/google-business-profile` | Keep as-is | No change |
| `/blog/*` (all existing posts) | Keep as-is | No change |
| `/tools/seo-roi-calculator` | Keep as-is | No change |

**No redirects needed in Phase 1.** All existing URLs are preserved.

### Phase 2: Add New Routes

Add the following route files (no changes to existing files):

1. `src/app/industries/[slug]/[city]/page.tsx` — 255 industry+city pages
2. `src/app/locations/[city]/page.tsx` — 17 city hub pages
3. `src/app/compare/[slug]/page.tsx` — 9 comparison pages
4. `src/app/case-studies/[slug]/page.tsx` — 6 case study pages
5. `src/app/tools/website-cost-calculator/page.tsx` — 1 tool page
6. `src/app/tools/website-grader/page.tsx` — 1 tool page
7. `src/app/resources/website-launch-checklist/page.tsx` — 1 resource page
8. `src/app/resources/trades-marketing-guide/page.tsx` — 1 resource page
9. `src/app/blog/page/[num]/page.tsx` — paginated blog listing

### Phase 3: Update Existing Industry Hub

Update `src/app/industries/[slug]/page.tsx` to handle both old category slugs and new trade-specific slugs. The `generateStaticParams()` already calls `getAllIndustrySlugs()` — this function needs to return all 19 slugs (4 existing + 15 new).

Update `src/content/industries.ts`:
- Keep existing 4 category configs in `industryMap`
- Add 15 new trade-specific configs to `industryMap`
- `getAllIndustrySlugs()` returns all 19

### Phase 4: Remove `force-dynamic`

Remove `export const dynamic = "force-dynamic"` from every page:
- `src/app/sitemap.ts`
- `src/app/robots.ts`
- `src/app/industries/[slug]/page.tsx`
- `src/app/services/[slug]/page.tsx`
- `src/app/blog/[slug]/page.tsx`
- `src/app/page.tsx`
- (check all other pages)

Replace `getDomainConfig()` calls with `getStaticDomainConfig()` in all page components (see Section 4).

### Phase 5: Update Navigation

Update `Nav` component to include mega menu with all 15 trades and 17 cities.
Update `Footer` component to include all industry and city links.

---

## 12. Build Performance Notes

### Current State

- 15 pages with `force-dynamic` — every request is server-rendered at runtime.
- Build time is fast because nothing is pre-rendered.

### Target State

- 362 pages statically generated at build time.
- Build time must stay under 2 minutes on Vercel (Vercel hobby/pro plan).

### Strategy: Full Static Generation

**Why not ISR?** With 362 pages and content that changes infrequently (monthly at most), full static generation is simpler, cheaper, and faster for end users. There is no user-generated content or real-time data on these pages.

**Estimated build time breakdown:**

| Task | Estimated Time |
|---|---|
| Next.js compilation (TypeScript, Tailwind) | 20-30s |
| Static page generation (362 pages) | 30-60s |
| Image optimization (if using next/image) | 10-20s |
| **Total** | **60-110s** |

362 pages is well within Vercel's comfort zone. Next.js generates static pages in parallel. Each page is a simple template with data from TypeScript content files (no external API calls, no database queries), so per-page generation should take <200ms.

### Key Performance Optimizations

1. **No external data fetching at build time.** All content comes from local TypeScript/JSON files. No API calls, no CMS queries. This is the single biggest build speed advantage.

2. **Shared layouts.** The root layout, industry layout, and blog layout are compiled once and reused across all pages in their segment.

3. **Content data structure.** Store industry, city, and page data in typed TypeScript objects (as already done with `industryMap` in `industries.ts`). Create similar maps:

   ```ts
   // src/content/cities.ts
   export const cityMap: Record<string, CityConfig> = { ... };
   export function getAllCitySlugs(): string[] { return Object.keys(cityMap); }

   // src/content/comparisons.ts
   export const comparisonMap: Record<string, ComparisonConfig> = { ... };
   export function getAllComparisonSlugs(): string[] { return Object.keys(comparisonMap); }

   // src/content/case-studies.ts
   export const caseStudyMap: Record<string, CaseStudyConfig> = { ... };
   export function getAllCaseStudySlugs(): string[] { return Object.keys(caseStudyMap); }
   ```

4. **No dynamic imports in page components.** Use standard imports so webpack can tree-shake and bundle efficiently.

5. **Avoid `headers()`, `cookies()`, and `searchParams` in page components.** These force dynamic rendering. The `getDomainConfig()` → `getStaticDomainConfig()` migration (Section 4) handles this.

### ISR Fallback Plan

If build times exceed 2 minutes as pages grow beyond 500+:

1. Use `dynamicParams = true` (default) with ISR revalidation:
   ```ts
   export const revalidate = 86400; // Revalidate once per day
   ```
2. Only pre-render P1 pages (top ~50) at build time via `generateStaticParams()`.
3. Let P2/P3 pages generate on first request and cache for 24 hours.

This is a fallback, not the initial plan. 362 pages should build in well under 2 minutes.

### Vercel Configuration

No changes needed to `vercel.json` for static generation. The existing cron job for `/api/lead-report` continues to work independently.

Add to `next.config.mjs` if blog markdown tracing is needed for new content:

```js
const nextConfig = {
  outputFileTracingIncludes: {
    "/*": ["./src/content/**/*.md", "./src/content/**/*.json"],
  },
};
```

---

## 13. Content Data Architecture

### New Content Files to Create

```
src/content/
├── industries.ts          # Existing — expand with 15 new trade configs
├── cities.ts              # NEW — 17 city configs with CityConfig interface
├── comparisons.ts         # NEW — 9 comparison configs
├── case-studies.ts        # NEW — 6 case study configs
├── adjacency.ts           # NEW — city adjacency map for "nearby" links
├── cross-trades.ts        # NEW — related trades map for cross-linking
├── blog/
│   ├── manifest.json      # Existing — expand with new posts
│   └── posts/             # Existing — add new markdown files
├── services.ts            # Existing — no changes
├── config.ts              # Existing — add new interfaces
├── domains.ts             # Existing — no changes
├── clusters.ts            # Existing — no changes
└── shared.ts              # Existing — no changes
```

### CityConfig Interface

```ts
// src/content/cities.ts
export interface CityConfig {
  slug: string;
  name: string;                          // "Phoenix"
  state: string;                         // "Arizona"
  stateCode: string;                     // "AZ"
  metaTitle: string;                     // "Web Design Phoenix AZ | Small Business Websites — BuildLocal"
  metaDescription: string;
  heroH1: string;                        // "Website Design for Phoenix Businesses"
  heroSubhead: string;
  population: string;                    // "1.6M" (for local stats section)
  marketHighlights: string[];            // ["Fastest-growing metro in the US", ...]
  adjacentCities: string[];             // ["scottsdale", "tempe", "glendale", "mesa"]
  geoCoordinates: { lat: number; lng: number };
  priority: "P1" | "P2" | "P3";
}
```

### IndustryPageConfig Updates

The existing `IndustryPageConfig` interface already accepts `locality` and `region` as function parameters. For the 15 new trade-specific hubs, the config functions will generate hub content (non-city-specific). For the industry+city pages, those same functions will be called with the city's locality and region values.

The industry+city page component:

```tsx
// src/app/industries/[slug]/[city]/page.tsx
export default function IndustryCityPage({ params }: { params: { slug: string; city: string } }) {
  const industry = getIndustryConfig(params.slug);
  const city = getCityConfig(params.city);
  if (!industry || !city) notFound();

  // Use industry config functions with city-specific locality/region
  const h1 = industry.heroH1(city.name, city.state);
  // ... render page with city-specific data
}
```

---

## 14. Implementation Checklist

### Sprint 2 Deliverables (This Document)

- [x] URL structure decisions documented
- [x] Full page hierarchy defined
- [x] Next.js route structure specified
- [x] Navigation design (header, footer, mobile, mega menu)
- [x] Internal linking rules (10 rules with anchor text patterns)
- [x] Breadcrumb structure per page type
- [x] Sitemap strategy (index + sub-sitemaps)
- [x] Canonical URL rules
- [x] Pagination strategy
- [x] Migration plan (5 phases)
- [x] Build performance analysis

### Next Implementation Steps (Sprint 3+)

1. Create `src/content/cities.ts` with all 17 city configs
2. Add 15 trade-specific entries to `src/content/industries.ts`
3. Create `src/app/industries/[slug]/[city]/page.tsx`
4. Create `src/app/locations/[city]/page.tsx`
5. Create `src/lib/getStaticDomainConfig.ts`
6. Remove `force-dynamic` from all pages, replace `getDomainConfig()` with `getStaticDomainConfig()`
7. Refactor `sitemap.ts` to use `generateSitemaps()` pattern
8. Remove `force-dynamic` from `robots.ts`
9. Create `src/app/compare/[slug]/page.tsx` + content configs
10. Create `src/app/case-studies/[slug]/page.tsx` + content configs
11. Create blog pagination route
12. Update Nav component with mega menu
13. Update Footer component with full link set
14. Add Breadcrumbs component
15. Create new tool and resource page routes
16. Run full build and verify <2 min build time
17. Submit updated sitemap to Google Search Console

---

*This document is the implementation blueprint for BuildLocal's site architecture. All URL patterns, route structures, and linking rules defined here should be treated as the source of truth for development.*
