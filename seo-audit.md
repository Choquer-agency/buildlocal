# SEO Audit: BuildLocal.agency

**Audit date:** 2026-03-31
**Auditor:** Automated technical audit
**Scope:** Live site (buildlocal.agency) + codebase (`troker-landing/`)
**Scale target:** 350+ pages (17 cities x 15 trades + services + blog)

---

## 1. Executive Summary

BuildLocal.agency is effectively invisible to search engines. The live site redirects via client-side JavaScript to `/lander`, which returns a 403 Forbidden error. Zero content is indexable. The sitemap lists only one URL pointing to the broken `/lander` path.

Meanwhile, the source code in `troker-landing/` contains a full Next.js site with 15+ page types, schema markup, blog posts, FAQ content, and industry/service pages. None of this is being served to users or crawlers.

This audit identifies **24 issues** across three priority tiers:

| Priority | Count | Summary |
|----------|-------|---------|
| P1 -- Critical | 5 | Site is broken, fake schema, force-dynamic blocks scaling, bad locality data |
| P2 -- Important | 9 | Hardcoded geo, missing sitemap index, canonical collisions, no 404 page |
| P3 -- Nice to have | 10 | Schema validation, breadcrumb UI, image optimization, performance |

**Bottom line:** Until P1 issues are resolved, the site has zero SEO value. No pages are indexed, no content is crawlable, and even the schema markup contains policy-violating fabricated ratings. Fix P1 before building any new pages.

---

## 2. Live Site Critical Issues

These findings are from the production deployment at `buildlocal.agency` as of the audit date.

### 2.1 Homepage redirects via JavaScript (not 301)

- **What happens:** Visiting `https://buildlocal.agency/` executes `window.location.href="/lander"`. This is a client-side JS redirect.
- **SEO impact:** Googlebot may or may not execute JS. Even if it does, a JS redirect is not treated as a permanent redirect. Google may index the blank redirect page, or may not follow the redirect at all. Zero link equity is passed.
- **Fix:** Remove the JS redirect. Deploy the full Next.js codebase so the homepage serves real content. If a redirect is truly needed, use a server-side 301 via `next.config.js` redirects or middleware.

### 2.2 /lander returns 403 Forbidden

- **What happens:** The redirect target (`/lander`) returns HTTP 403. No content is served.
- **SEO impact:** Total crawl failure. Googlebot logs a 403 and stops. The entire site appears broken.
- **Fix:** Either deploy the full site (preferred) or fix the `/lander` route permissions.

### 2.3 Sitemap contains only 1 URL

- **Live sitemap.xml contents:** Only `https://buildlocal.agency/lander`.
- **SEO impact:** Even if the site were serving content, only one page would be discoverable via the sitemap. The codebase generates a proper sitemap with all routes, but the deployed version is not using it.
- **Fix:** Deploy the full codebase. The Next.js `sitemap.ts` route handler generates a complete sitemap.

### 2.4 robots.txt does not match codebase

- **Live robots.txt:** Simple `User-agent: * Allow: /` with LLM-Policy directive.
- **Codebase robots.ts:** Generates rules for GPTBot, ChatGPT-User, Google-Extended, anthropic-ai, ClaudeBot -- all with explicit `Allow: /`.
- **SEO impact:** The live deployment is not using the Next.js-generated robots. When the full site deploys, verify the robots output matches expectations.

### 2.5 No content is indexable

- **Summary:** Between the JS redirect, the 403 on `/lander`, and the single-URL sitemap, search engines cannot access any content. Google Search Console would show zero indexed pages.
- **Fix:** Deploy the full Next.js codebase from `troker-landing/`.

---

## 3. P1 Fixes -- Critical

Fix all P1 issues before building any new pages. These block scaling to 350+ pages or create direct penalty risk.

---

### P1-1: Remove `force-dynamic` from all pages

- **Issue:** Every page exports `export const dynamic = "force-dynamic"` despite also defining `generateStaticParams()`. This contradicts static generation and forces every page to server-render on each request.
- **Where it occurs:**
  - `src/app/page.tsx` line 22
  - `src/app/industries/[slug]/page.tsx` line 19
  - `src/app/services/[slug]/page.tsx` line 19
  - `src/app/blog/[slug]/page.tsx` line 10
  - `src/app/sitemap.ts` line 9
  - `src/app/robots.ts` line 4
- **Impact:** At 350+ pages, every request hits a serverless function. No CDN edge caching. Slow TTFB. Vercel serverless function concurrency limits will be reached quickly. Pages that define `generateStaticParams()` are explicitly designed for static generation -- `force-dynamic` negates this entirely.
- **Recommended fix:**
  1. Remove `export const dynamic = "force-dynamic"` from all page files.
  2. Refactor `getDomainConfig()` to not call `headers()` (see P1-2).
  3. For `sitemap.ts` and `robots.ts`, use a build-time config or environment variable instead of reading request headers.
  4. Pages with `generateStaticParams()` will then be statically generated at build time.
- **Effort:** Medium (requires solving P1-2 first)

---

### P1-2: `getDomainConfig()` forces dynamic rendering by calling `headers()`

- **Issue:** `getDomainConfig()` calls `headers()` from `next/headers` to read the `Host` header at runtime. In Next.js App Router, calling `headers()` automatically opts the page into dynamic rendering, making `force-dynamic` redundant but also making static generation impossible.
- **Where it occurs:** `src/lib/getDomainConfig.ts` lines 1-15
- **Impact:** Every page that calls `getDomainConfig()` (which is every page) becomes dynamically rendered regardless of other settings. This is the root cause that forces `force-dynamic` on everything.
- **Recommended fix:** For a single-domain deployment (buildlocal.agency), replace the runtime header lookup with a build-time config:
  ```typescript
  // src/lib/getDomainConfig.ts
  import { domainMap } from "@/content/domains";
  import { defaultConfig, DomainConfig } from "@/content/config";

  export function getDomainConfig(): DomainConfig {
    const domain = process.env.SITE_DOMAIN || "buildlocal.agency";
    return domainMap[domain] || defaultConfig;
  }
  ```
  Set `SITE_DOMAIN` as a build-time environment variable in Vercel. This eliminates the `headers()` call and allows full static generation. If multi-domain support is needed later, use Next.js middleware to rewrite requests to domain-specific paths instead.
- **Effort:** Small (but must be done before P1-1)

---

### P1-3: `defaultConfig` locality is "USA" -- incorrect schema and meta titles

- **Issue:** The default config sets `locality: "USA"` and `region: "United States"`. This cascades into multiple problems:
  - Schema markup says `areaServed: { "@type": "City", name: "USA" }` -- "USA" is not a city, this is semantically invalid.
  - Industry/service page meta titles use locality in generated titles (e.g., "Web Design for Plumbers in USA" instead of a real city).
  - `schemaAddress.locality` is "United States" -- should be a city name.
  - Blog related posts section says "More from USA".
- **Where it occurs:**
  - `src/content/config.ts` lines 131-157 (defaultConfig definition)
  - `src/lib/schema.ts` line 35 (`{ "@type": "City", name: locality }`)
  - `src/app/blog/[slug]/page.tsx` line 207 (`More from {config.locality}`)
  - `src/app/industries/[slug]/page.tsx` line 81 (heroH1 uses locality)
  - `src/app/services/[slug]/page.tsx` line 79 (heroH1 uses locality)
- **Impact:** Schema markup violations. Google may ignore or penalize incorrectly typed geographic entities. Page titles read unnaturally to users and search engines. Hurts local SEO targeting.
- **Recommended fix:** Update defaultConfig to use real geographic data:
  ```typescript
  locality: "Phoenix",
  stateCode: "AZ",
  nearbyAreas: "Scottsdale, Tempe, Mesa, and the Greater Phoenix area",
  region: "Arizona",
  regionAdjective: "Arizona-based",
  schemaAddress: {
    locality: "Phoenix",
    region: "AZ",
    country: "US",
  },
  geoCoordinates: {
    latitude: 33.4484,
    longitude: -112.0740,
  },
  geoRegionCode: "US-AZ",
  ```
  If BuildLocal is not specific to Phoenix, choose the primary market or use a national-level entity correctly (`{ "@type": "Country", name: "United States" }` instead of `"City"`).
- **Effort:** Small

---

### P1-4: Fake AggregateRating schema -- penalty risk

- **Issue:** `getDomainRating()` generates fabricated review ratings using a hash of the domain name. It produces ratings between 4.7-5.0 stars with 38-58 reviews. These reviews do not exist.
- **Where it occurs:** `src/lib/schema.ts` lines 5-15 (getDomainRating function), lines 120-130 (AggregateRating schema output)
- **Impact:** Google's structured data guidelines explicitly prohibit fabricated review markup. From Google's documentation: "Don't create fake reviews or add reviews for the wrong business." Violation can result in:
  - Manual action (penalty) removing all rich results from the site
  - Loss of trust signals across the entire domain
  - Removal of eligibility for review rich snippets permanently
- **Recommended fix:**
  1. **Immediately remove** the `getDomainRating()` function and the AggregateRating block from the schema graph.
  2. Delete lines 5-15 and lines 120-130 in `src/lib/schema.ts`.
  3. Only add AggregateRating back when you have real, verifiable reviews (Google Business Profile, Trustpilot, etc.) and can source the data from an API.
- **Effort:** Small

---

### P1-5: Deploy the full site (the actual #1 priority)

- **Issue:** The live site at buildlocal.agency is not serving the codebase in `troker-landing/`. It appears to be a separate/broken deployment that only has a JS redirect to a 403 page.
- **Where it occurs:** Production deployment configuration (Vercel, hosting provider, DNS).
- **Impact:** Nothing else in this audit matters until the site is serving real content. Zero SEO value. Zero indexation. Zero organic traffic potential.
- **Recommended fix:**
  1. Verify the Vercel project (or hosting provider) is connected to the correct repository and branch.
  2. Fix P1-2 and P1-3 first (domain config and locality).
  3. Deploy the full Next.js site.
  4. Verify `https://buildlocal.agency/` returns a 200 with the homepage content.
  5. Verify `https://buildlocal.agency/sitemap.xml` returns the full sitemap.
  6. Submit the sitemap in Google Search Console.
  7. Request indexing of key pages.
- **Effort:** Medium (depends on the deployment pipeline investigation)

---

## 4. P2 Fixes -- Important

Fix during the first week of the build sprint. These affect SEO quality and scaling readiness.

---

### P2-1: Geo meta tags hardcoded to Phoenix

- **Issue:** The root layout falls back to Phoenix coordinates and `US-AZ` geo region when config values are missing. The defaultConfig has `geoCoordinates: undefined` and no `geoRegionCode`, so the Phoenix fallbacks always activate.
- **Where it occurs:** `src/app/layout.tsx` lines 37-44
  ```typescript
  "geo.region": config.geoRegionCode || "US-AZ",
  "geo.placename": config.schemaAddress?.locality || "Phoenix",
  "geo.position": config.geoCoordinates
    ? `${config.geoCoordinates.latitude};${config.geoCoordinates.longitude}`
    : "33.4484;-112.0740",
  ICBM: config.geoCoordinates
    ? `${config.geoCoordinates.latitude}, ${config.geoCoordinates.longitude}`
    : "33.4484, -112.0740",
  ```
- **Impact:** Every page claims to be in Phoenix, Arizona. When scaling to 17 cities, each city page will incorrectly report Phoenix coordinates. While geo meta tags are less important than schema.org location data, they still provide signals to search engines for local queries.
- **Recommended fix:** Set proper values in defaultConfig (see P1-3). For city-specific pages, pass geo coordinates from the city config into page-level metadata overrides. Remove the Phoenix hardcoded fallbacks -- if geo data is missing, omit the tags entirely rather than serving incorrect data.
- **Effort:** Small

---

### P2-2: No sitemap index for scaling to 350+ URLs

- **Issue:** `sitemap.ts` generates a single flat sitemap. With 350+ URLs (17 cities x 15 trades + services + blog + static pages), a single sitemap becomes unwieldy.
- **Where it occurs:** `src/app/sitemap.ts` (entire file)
- **Impact:** A single sitemap with 350+ URLs works technically (Google supports up to 50,000) but is harder to monitor in Search Console (you cannot see indexing status by page type). Sub-sitemaps allow you to track which page types are being indexed.
- **Recommended fix:** Implement a sitemap index using Next.js `generateSitemaps()`:
  - `sitemap/0.xml` -- static pages (homepage, about, pricing, etc.)
  - `sitemap/1.xml` -- industry pages
  - `sitemap/2.xml` -- service pages
  - `sitemap/3.xml` -- city pages
  - `sitemap/4.xml` -- blog posts
  This makes Search Console monitoring much easier and allows targeted re-submission when specific page types are updated.
- **Effort:** Medium

---

### P2-3: Missing OG images

- **Issue:** `defaultConfig.ogImage` is undefined. The layout falls back to `/images/og-default.jpg` which may not exist or be optimized.
- **Where it occurs:** `src/content/config.ts` line 18 (`ogImage?: string` -- optional, not set), `src/app/layout.tsx` line 21 (fallback)
- **Impact:** When pages are shared on social media, LinkedIn, or in messaging apps, they show no preview image or a broken image. OG images significantly increase click-through rates from social shares (2-3x higher engagement with images).
- **Recommended fix:**
  1. Create a high-quality default OG image at `/public/images/og-default.jpg` (1200x630px).
  2. Set `ogImage` in defaultConfig.
  3. For scaling: implement a Next.js OG image route (`app/og/route.tsx`) that dynamically generates OG images per page type using `@vercel/og` or `satori`. Template variables: page title, industry icon, city name.
- **Effort:** Medium

---

### P2-4: robots.ts output differs from live robots.txt

- **Issue:** The codebase generates structured robots rules via `src/app/robots.ts` including explicit AI crawler permissions. The live site serves a completely different robots.txt with an `LLM-Policy` directive that does not exist in the codebase.
- **Where it occurs:** `src/app/robots.ts` lines 1-19 (codebase version), live site robots.txt (production version)
- **Impact:** After deploying the full site, the robots output will change. Existing crawler behavior may shift. The `LLM-Policy` directive and `llms.txt` reference will be lost unless added to the codebase version.
- **Recommended fix:**
  1. Add the `llms.txt` reference to `robots.ts` if LLM discoverability is desired (add to the `host` or use Next.js metadata API).
  2. Verify the deployed robots.txt matches expectations after deploying the full site.
  3. Create an `llms.txt` file in the public directory if you want to maintain LLM crawling instructions.
- **Effort:** Small

---

### P2-5: Keywords meta tag (dead weight)

- **Issue:** A hardcoded `keywords` meta tag with generic terms exists in the root layout.
- **Where it occurs:** `src/app/layout.tsx` line 13
  ```typescript
  keywords: "small business website, affordable web design, managed website service, ..."
  ```
- **Impact:** Google has officially ignored the keywords meta tag since 2009. Bing may use it as a minor spam signal. It exposes your target keywords to competitors. No SEO benefit.
- **Recommended fix:** Remove the `keywords` property from the metadata object. Replace with nothing -- focus keyword targeting efforts on title tags, headings, and content.
- **Effort:** Small

---

### P2-6: Blog posts use `force-dynamic` but content is build-time static

- **Issue:** Blog posts are loaded from a pre-generated manifest (`scripts/generate-blog-manifest.mjs`) and MDX files. The content is entirely static. Yet `blog/[slug]/page.tsx` exports `force-dynamic`.
- **Where it occurs:** `src/app/blog/[slug]/page.tsx` line 10
- **Impact:** Blog posts should be the easiest pages to statically generate -- the content never changes between deployments. Dynamic rendering adds unnecessary latency and server cost. With 50+ blog posts planned, this multiplies waste.
- **Recommended fix:** Resolved by P1-1 and P1-2. Once `getDomainConfig()` stops calling `headers()`, remove `force-dynamic` and add `generateStaticParams()` to blog pages if not present.
- **Effort:** Small (part of P1-1/P1-2 fix)

---

### P2-7: Canonical URL on layout.tsx points all pages to homepage

- **Issue:** The root layout metadata sets `canonical: https://${config.domain}` for all pages. Pages that do not explicitly override this in their own `generateMetadata()` will have their canonical URL pointing to the homepage.
- **Where it occurs:** `src/app/layout.tsx` lines 33-35
  ```typescript
  alternates: {
    canonical: `https://${config.domain}`,
  },
  ```
- **Impact:** Any page that does not override the canonical (e.g., `/about`, `/pricing`, `/how-it-works`, `/portfolio`, `/faq`, `/tools/seo-roi-calculator`) tells Google "this page is a duplicate of the homepage." Google may:
  - Deindex those pages entirely
  - Consolidate all ranking signals to the homepage
  - Ignore the pages in search results
  Industry pages, service pages, and blog posts DO override the canonical (confirmed in the code), but static pages likely do not.
- **Recommended fix:** Remove the canonical from the root layout metadata. Set canonical URLs explicitly in each page's `generateMetadata()` function. Use a utility function:
  ```typescript
  function getCanonical(config: DomainConfig, path: string) {
    return `https://${config.domain}${path}`;
  }
  ```
- **Effort:** Small

---

### P2-8: No custom 404 page

- **Issue:** No `not-found.tsx` file exists in the app directory. Next.js will render a default unstyled 404 page.
- **Where it occurs:** Missing file at `src/app/not-found.tsx`
- **Impact:** Users who hit broken links or mistyped URLs see a generic error page with no navigation, no branding, and no way to find content. This increases bounce rate and wastes the opportunity to redirect users to high-value pages. With 350+ pages, the probability of 404 hits increases (old URLs, typos, competitor link audits).
- **Recommended fix:** Create `src/app/not-found.tsx` with:
  - Branded design matching the site
  - Clear "Page not found" message
  - Navigation links (homepage, services, industries)
  - Search functionality (if available)
  - Links to popular pages
  - Proper `<title>` tag: "Page Not Found | BuildLocal"
- **Effort:** Small

---

### P2-9: Blog featured images use `<img>` instead of Next.js `<Image>`

- **Issue:** Blog post featured images use a plain HTML `<img>` tag instead of the Next.js `<Image>` component.
- **Where it occurs:** `src/app/blog/[slug]/page.tsx` lines 153-162
  ```tsx
  <img
    src={post.featuredImage}
    alt={post.title}
    width={1200}
    height={630}
    className="w-full h-auto"
    loading="lazy"
  />
  ```
- **Impact:** Missing automatic WebP/AVIF conversion, responsive `srcset`, blur placeholder, and CDN optimization that Next.js `<Image>` provides. Larger image payloads, slower LCP, worse Core Web Vitals.
- **Recommended fix:** Replace with Next.js `<Image>` component:
  ```tsx
  import Image from "next/image";
  // ...
  <Image
    src={post.featuredImage}
    alt={post.title}
    width={1200}
    height={630}
    className="w-full h-auto"
    priority // above the fold
  />
  ```
- **Effort:** Small

---

## 5. P3 Fixes -- Nice to Have

Fix within the first month. These improve quality and maintainability at scale.

---

### P3-1: No structured data validation in CI

- **Issue:** No automated testing ensures schema markup is valid JSON-LD and conforms to schema.org specifications.
- **Where it occurs:** Missing CI/CD configuration.
- **Impact:** As pages scale to 350+, invalid schema could silently appear -- missing required fields, wrong types, broken references. Google will silently drop invalid schema.
- **Recommended fix:** Add a CI step that:
  1. Builds the site
  2. Extracts JSON-LD from rendered pages
  3. Validates against schema.org using `schema-dts` or Google's Rich Results Test API
  4. Fails the build on invalid schema
- **Effort:** Medium

---

### P3-2: Missing `article:published_time` and `article:modified_time` in OG tags

- **Issue:** Blog post metadata includes `publishedTime` and `modifiedTime` in Open Graph tags (confirmed in code at `src/app/blog/[slug]/page.tsx` lines 33-34). This is actually implemented correctly.
- **Where it occurs:** `src/app/blog/[slug]/page.tsx` lines 33-34 -- already implemented.
- **Status:** RESOLVED (no action needed). The blog `generateMetadata()` does include `publishedTime` and `modifiedTime`. Verify these render correctly in the HTML output.
- **Effort:** None

---

### P3-3: No `rel="prev"/"next"` for paginated content

- **Issue:** No pagination link relations are implemented. Not currently needed (blog listing is not paginated), but will matter when blog content exceeds a single page.
- **Where it occurs:** Would affect `src/app/blog/page.tsx` (blog listing).
- **Impact:** Minimal now. Becomes relevant at 20+ blog posts when pagination is needed.
- **Recommended fix:** Implement when blog pagination is added. Use `<link rel="prev" href="...">` and `<link rel="next" href="...">` in the page metadata.
- **Effort:** Small (when the time comes)

---

### P3-4: Image optimization audit

- **Issue:** Need to verify all images across components use Next.js `<Image>` for automatic optimization (WebP, lazy loading, responsive sizes).
- **Where it occurs:** All components rendering images -- `Portfolio`, `Testimonials`, blog posts, etc.
- **Impact:** Unoptimized images are the most common cause of poor LCP scores. Large images served as PNG/JPEG instead of WebP add unnecessary payload.
- **Recommended fix:** Audit all `<img>` tags in components and replace with `<Image>`. Priority order: above-the-fold images first (hero, portfolio thumbnails).
- **Effort:** Medium

---

### P3-5: Alt text audit

- **Issue:** Comprehensive check needed that all images have descriptive, keyword-relevant alt text -- not just the image filename or generic placeholders.
- **Where it occurs:** All image-rendering components.
- **Impact:** Missing or poor alt text hurts image search rankings and accessibility (ADA compliance). With portfolio images, descriptive alt text like "Custom website design for Phoenix plumbing company" provides both SEO and accessibility value.
- **Recommended fix:** Create an alt text standard and audit all images against it. Alt text should describe the image content and include relevant keywords naturally.
- **Effort:** Small

---

### P3-6: No visible breadcrumb navigation

- **Issue:** Schema markup includes BreadcrumbList structured data, but no visible breadcrumb UI appears on pages. Google recommends that structured data match visible page content.
- **Where it occurs:** Blog posts have a visible breadcrumb (`src/app/blog/[slug]/page.tsx` lines 81-97) but industry and service pages do not.
- **Impact:** Breadcrumbs in schema without matching visible UI is a minor inconsistency. Visible breadcrumbs improve user navigation (especially with 350+ pages) and reinforce internal linking.
- **Recommended fix:** Add a shared `<Breadcrumb>` component and include it on industry, service, and city pages. Keep it consistent with the blog post breadcrumb pattern.
- **Effort:** Small

---

### P3-7: Homepage heading structure audit

- **Issue:** Verify H1 is used exactly once on the homepage, H2s are meaningful and keyword-rich, and heading hierarchy is logical (no skipping levels like H1 -> H3).
- **Where it occurs:** `src/app/page.tsx` and all imported section components (`Hero`, `Stats`, `Problem`, etc.).
- **Impact:** Heading hierarchy is a moderate on-page SEO signal. Multiple H1s dilute the primary topic signal. Skipped levels (H1 -> H3) confuse both crawlers and screen readers.
- **Recommended fix:** Audit all section components. Ensure exactly one H1 (in Hero), H2 for each major section, H3 for subsections. No skipping levels.
- **Effort:** Small

---

### P3-8: Internal link depth

- **Issue:** With only a homepage linking to 4 industry pages and 4 service pages, many pages are 2+ clicks from the homepage. As the site scales to 350+ pages, some pages could become 4+ clicks deep.
- **Where it occurs:** Site architecture and navigation components (`Nav`, `Footer`, internal links).
- **Impact:** Google's crawl budget allocation decreases with click depth. Pages 4+ clicks from the homepage may be crawled less frequently. Internal link equity dilutes with depth.
- **Recommended fix:**
  1. Add a comprehensive footer with links organized by city and service type.
  2. Add an HTML sitemap page with all links.
  3. Implement contextual internal links within page content (e.g., industry pages link to related services and nearby cities).
  4. Target: no page more than 3 clicks from the homepage.
- **Effort:** Medium

---

### P3-9: Page load performance (GSAP + Lenis)

- **Issue:** GSAP animation library (3.14.2) and Lenis smooth scroll library add JavaScript payload to every page.
- **Where it occurs:** `src/components/ClientLayout.tsx` and animation-related components.
- **Impact:** Estimated ~50KB gzipped JS added. This is within acceptable limits but should be monitored. If animations are not critical to conversion, consider lazy-loading them or removing them from SEO-focused landing pages.
- **Recommended fix:**
  1. Run Lighthouse on the deployed site and record Core Web Vitals (LCP, CLS, INP).
  2. If INP exceeds 200ms, investigate GSAP event handlers.
  3. If LCP exceeds 2.5s, defer non-critical animations.
  4. Consider code-splitting animations so they only load on pages that use them.
- **Effort:** Small (audit) / Medium (optimization if needed)

---

### P3-10: Missing `rel="noopener noreferrer"` on external links

- **Issue:** External links opening in new tabs should include `rel="noopener noreferrer"` for security (prevents reverse tabnapping) and minor performance benefit.
- **Where it occurs:** Any component with `target="_blank"` links.
- **Impact:** Security vulnerability (reverse tabnapping) and minor performance concern. Not an SEO ranking factor but a best practice.
- **Recommended fix:** Audit all `<a>` and `<Link>` tags with `target="_blank"` and add `rel="noopener noreferrer"`. Consider a linting rule to enforce this.
- **Effort:** Small

---

## 6. Schema Markup Audit

### What exists and works well

| Page type | Schema types | Status |
|-----------|-------------|--------|
| Homepage | LocalBusiness, ProfessionalService, WebPage, WebSite, FAQPage, HowTo, Service, BreadcrumbList | Present and well-structured |
| Industry pages | Service, WebPage (with speakable), FAQPage, HowTo, BreadcrumbList | Present and well-structured |
| Service pages | Service, WebPage (with speakable), FAQPage, HowTo, BreadcrumbList | Present and well-structured |
| Blog posts | BlogPosting, WebPage (with speakable), BreadcrumbList | Present and well-structured |
| Blog index | CollectionPage | Present |

The use of `SpeakableSpecification` on content pages is a strong differentiator for voice search optimization.

### What needs fixing

| Issue | Severity | File | Fix |
|-------|----------|------|-----|
| Fake AggregateRating | CRITICAL | `src/lib/schema.ts` lines 120-130 | Remove entirely (see P1-4) |
| Homepage BreadcrumbList is single-item | Low | `src/lib/schema.ts` lines 142-150 | Remove -- a single-item breadcrumb (just "Home") is technically invalid per schema.org spec |
| `areaServed` uses `"City"` for "USA" | High | `src/lib/schema.ts` line 35 | Fix locality in config (P1-3) or use `"Country"` type |
| Missing `sameAs` on Organization | Low | `src/lib/schema.ts` | Add social media profile URLs (LinkedIn, Instagram, etc.) |
| Missing `logo` on Organization | Medium | `src/lib/schema.ts` | Add `logo` property with URL to the brand logo image |
| Missing `openingHours` | Low | `src/lib/schema.ts` | Add `openingHoursSpecification` or note online-only with `"Mo-Su 00:00-23:59"` |
| Service schema missing `offers` | Low | `src/lib/schema.ts` lines 132-138 | Add `offers` with pricing tier links |

### Schema validation checklist for new page types

When adding city pages (17 cities x 15 trades), each page should include:
- `LocalBusiness` with city-specific `areaServed`, `address`, and `geo`
- `Service` with trade-specific `serviceType`
- `WebPage` with unique `name` and `description`
- `BreadcrumbList` with full path: Home > City > Trade
- `FAQPage` with city/trade-specific questions

---

## 7. Content Quality Assessment

### Strengths

- **FAQ content is comprehensive:** 19+ base questions with cluster-specific additions. Well-structured for both FAQ schema and user intent.
- **Industry pages address real pain points:** Trade-specific problems (not generic), which resonates with search intent for queries like "website for plumbers."
- **Testimonials are specific:** Named individuals with company names and specific outcomes. Stronger E-E-A-T signal than anonymous reviews.
- **Stats are concrete:** "175+ sites built," "47% avg traffic increase" -- specific numbers build credibility.
- **Author bios on blog posts:** E-E-A-T compliance with author name, role, and bio on every blog post.

### Weaknesses

| Gap | Impact | Priority |
|-----|--------|----------|
| Only 5 blog posts | Thin topical authority. Competitors with 50+ posts dominate informational queries. | High -- target 20 posts within 60 days |
| Only 4 broad industry categories | Missing 11 specific trade verticals. Each trade (plumbers, electricians, roofers, etc.) has unique search demand. | High -- core of the 350-page build |
| Zero city-specific content | No geo-targeted pages. "Web design Phoenix" queries have no landing page. | High -- core of the 350-page build |
| No comparison content | Missing "BuildLocal vs. Squarespace" or "BuildLocal vs. Wix" comparison pages that capture high-intent bottom-funnel queries. | Medium |
| No detailed case studies | Portfolio is a visual showcase, not deep content. Case study pages with before/after, process, and results would strengthen E-E-A-T. | Medium |
| Homepage is the only SEO landing page | All organic traffic must come through one URL. With 350+ pages, this diversifies dramatically. | Resolved by scaling plan |

---

## 8. Recommended Fix Order

Execute in this sequence. Each step depends on the previous one.

### Phase 1: Unblock the site (Days 1-2)

| Step | Task | Depends on | Effort |
|------|------|-----------|--------|
| 1.1 | Fix `defaultConfig` locality, region, geo data (P1-3) | Nothing | Small |
| 1.2 | Remove fake AggregateRating from `schema.ts` (P1-4) | Nothing | Small |
| 1.3 | Remove homepage single-item BreadcrumbList | Nothing | Small |
| 1.4 | Refactor `getDomainConfig()` to use env var instead of `headers()` (P1-2) | 1.1 | Small |
| 1.5 | Remove `force-dynamic` from all pages (P1-1) | 1.4 | Small |
| 1.6 | Remove `keywords` meta tag from layout (P2-5) | Nothing | Small |
| 1.7 | Fix canonical URL in root layout (P2-7) | Nothing | Small |

### Phase 2: Deploy and verify (Days 2-3)

| Step | Task | Depends on | Effort |
|------|------|-----------|--------|
| 2.1 | Deploy full site to buildlocal.agency (P1-5) | Phase 1 | Medium |
| 2.2 | Verify all pages return 200 | 2.1 | Small |
| 2.3 | Verify sitemap.xml contains all URLs | 2.1 | Small |
| 2.4 | Verify robots.txt output matches expectations (P2-4) | 2.1 | Small |
| 2.5 | Submit sitemap to Google Search Console | 2.3 | Small |
| 2.6 | Request indexing of homepage, top industry, top service pages | 2.5 | Small |

### Phase 3: Quality fixes (Days 3-5)

| Step | Task | Depends on | Effort |
|------|------|-----------|--------|
| 3.1 | Fix geo meta tag hardcoding (P2-1) | Phase 1 | Small |
| 3.2 | Create custom 404 page (P2-8) | Nothing | Small |
| 3.3 | Replace blog `<img>` with `<Image>` (P2-9) | Nothing | Small |
| 3.4 | Create default OG image (P2-3) | Nothing | Medium |
| 3.5 | Add `logo` and `sameAs` to Organization schema | Nothing | Small |

### Phase 4: Scale preparation (Week 2)

| Step | Task | Depends on | Effort |
|------|------|-----------|--------|
| 4.1 | Implement sitemap index (P2-2) | Phase 2 | Medium |
| 4.2 | Build city page template with city-specific schema | Phase 1 | Large |
| 4.3 | Build trade-specific industry page content (11 new trades) | Phase 1 | Large |
| 4.4 | Add visible breadcrumb component (P3-6) | Nothing | Small |
| 4.5 | Full image optimization audit (P3-4, P3-5) | Nothing | Medium |

### Phase 5: Ongoing (Month 1)

| Step | Task | Depends on | Effort |
|------|------|-----------|--------|
| 5.1 | Set up structured data validation in CI (P3-1) | Phase 4 | Medium |
| 5.2 | Run Lighthouse audit and optimize Core Web Vitals (P3-9) | Phase 2 | Medium |
| 5.3 | Publish 15 additional blog posts | Phase 2 | Large |
| 5.4 | Build comparison pages (vs. competitors) | Phase 2 | Medium |
| 5.5 | Implement internal linking strategy (P3-8) | Phase 4 | Medium |

---

## Appendix: Files Referenced

| File | Issues |
|------|--------|
| `src/content/config.ts` | P1-3 (locality "USA"), P2-3 (missing ogImage) |
| `src/lib/getDomainConfig.ts` | P1-2 (headers() call) |
| `src/lib/schema.ts` | P1-4 (fake ratings), schema fixes |
| `src/app/layout.tsx` | P2-1 (geo hardcoding), P2-5 (keywords), P2-7 (canonical) |
| `src/app/page.tsx` | P1-1 (force-dynamic) |
| `src/app/industries/[slug]/page.tsx` | P1-1 (force-dynamic) |
| `src/app/services/[slug]/page.tsx` | P1-1 (force-dynamic) |
| `src/app/blog/[slug]/page.tsx` | P1-1 (force-dynamic), P2-6 (static content), P2-9 (img tag) |
| `src/app/sitemap.ts` | P1-1 (force-dynamic), P2-2 (no index) |
| `src/app/robots.ts` | P1-1 (force-dynamic), P2-4 (mismatch) |
