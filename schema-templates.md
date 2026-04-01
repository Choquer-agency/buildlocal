# BuildLocal.agency -- Schema Markup Templates

**Purpose:** JSON-LD structured data templates for all page types across the 350+ page BuildLocal site.
**Last updated:** 2026-03-31
**Schema files location:** `src/lib/schema-*.ts`

---

## Table of Contents

1. [Schema Architecture Overview](#1-schema-architecture-overview)
2. [Fixes to Existing Schema](#2-fixes-to-existing-schema)
3. [New Schema Templates](#3-new-schema-templates)
   - [A. Industry+City Page](#template-a-industrycity-page)
   - [B. Industry Hub Page](#template-b-industry-hub-page)
   - [C. City Hub Page](#template-c-city-hub-page)
   - [D. Comparison Page](#template-d-comparison-page)
   - [E. Case Study Page](#template-e-case-study-page)
   - [F. Resource/Tool Page](#template-f-resourcetool-page)
   - [G. Enhanced Homepage](#template-g-enhanced-homepage)
   - [H. Pricing Page](#template-h-pricing-page)
4. [Validation Checklist](#4-validation-checklist)
5. [Implementation Notes](#5-implementation-notes)
6. [SpeakableSpecification Selectors](#6-speakablespecification-selectors)

---

## 1. Schema Architecture Overview

### Schema Types by Page Type

| Page Type | LocalBusiness | Service | WebPage | FAQPage | HowTo | BreadcrumbList | ItemList | Article | WebApp | OfferCatalog | WebSite |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Homepage | X | X | X | X | X | -- | -- | -- | -- | X | X |
| Industry Hub (`/industries/[trade]`) | -- | X | X | X | X | X | X | -- | -- | -- | -- |
| Industry+City (`/industries/[trade]/[city]`) | X | X | X | X | X | X | -- | -- | -- | -- | -- |
| City Hub (`/locations/[city]`) | X | -- | X | X | -- | X | X | -- | -- | -- | -- |
| Service (`/services/[slug]`) | -- | X | X | X | X | X | -- | -- | -- | -- | -- |
| Blog Post (`/blog/[slug]`) | -- | -- | X | -- | -- | X | -- | X | -- | -- | -- |
| Blog Index (`/blog`) | -- | -- | X | -- | -- | X | -- | -- | -- | -- | -- |
| Comparison (`/compare/[slug]`) | -- | -- | X | X | -- | X | X | -- | -- | -- | -- |
| Case Study (`/case-studies/[slug]`) | -- | -- | X | -- | -- | X | -- | X | -- | -- | -- |
| Tool (`/tools/[slug]`) | -- | -- | X | X | -- | X | -- | -- | X | -- | -- |
| Pricing (`/pricing`) | -- | -- | X | X | -- | X | -- | -- | -- | X | -- |

### How Schemas Interconnect via @id References

Every page references back to the canonical Organization/LocalBusiness defined on the homepage. This prevents redundant Organization definitions and creates a connected knowledge graph.

```
Homepage (#business)          <-- Canonical Organization node
  |
  +-- WebSite (#website)      <-- Canonical WebSite node
  |     |
  |     +-- All WebPage nodes reference via "isPartOf: { @id: .../#website }"
  |
  +-- Service nodes reference via "provider: { @id: .../#business }"
  +-- All pages' WebPage nodes reference via "about: { @id: .../#business }" or "about: { @id: .../page/#service }"
```

**Key @id identifiers used throughout the site:**

| @id | Type | Defined On |
|---|---|---|
| `https://buildlocal.agency/#business` | LocalBusiness + ProfessionalService | Homepage |
| `https://buildlocal.agency/#website` | WebSite | Homepage |
| `https://buildlocal.agency/#webpage` | WebPage | Homepage |
| `https://buildlocal.agency/#faq` | FAQPage | Homepage |
| `https://buildlocal.agency/industries/[trade]/#service` | Service | Industry Hub |
| `https://buildlocal.agency/industries/[trade]/[city]/#service` | Service | Industry+City |
| `https://buildlocal.agency/industries/[trade]/[city]/#webpage` | WebPage | Industry+City |
| `https://buildlocal.agency/services/[slug]/#service` | Service | Service Page |
| `https://buildlocal.agency/blog/[slug]/#article` | BlogPosting | Blog Post |
| `https://buildlocal.agency/locations/[city]/#localbusiness` | LocalBusiness | City Hub |

### The @graph Pattern

All schema files use the `@graph` pattern, which wraps multiple schema objects inside a single JSON-LD `<script>` tag. This is the recommended approach because:

1. Single `@context` declaration for the entire block
2. Entities can cross-reference each other via `@id`
3. Search engines parse the full graph as one connected unit
4. Fewer `<script>` tags in the DOM

```json
{
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "LocalBusiness", "@id": ".../#business", ... },
    { "@type": "WebPage", "@id": ".../#webpage", "about": { "@id": ".../#business" }, ... },
    { "@type": "FAQPage", ... },
    { "@type": "BreadcrumbList", ... }
  ]
}
```

---

## 2. Fixes to Existing Schema

### FIX 1: Remove Fake AggregateRating (CRITICAL)

**File:** `src/lib/schema.ts`
**Problem:** The `getDomainRating()` function generates fake review ratings from a domain name hash. This violates Google's structured data policies and risks a manual action penalty.

**Action:** Delete the entire `getDomainRating` function (lines 5-15) and remove the AggregateRating block from the `@graph` array (lines 120-130).

Remove this function entirely:

```typescript
// DELETE THIS ENTIRE FUNCTION
function getDomainRating(domain: string): { ratingValue: string; ratingCount: string; reviewCount: string } {
  let hash = 0;
  for (let i = 0; i < domain.length; i++) {
    hash = ((hash << 5) - hash) + domain.charCodeAt(i);
    hash |= 0;
  }
  const seed = Math.abs(hash);
  const ratingValue = (4.7 + (seed % 3) * 0.1).toFixed(1);
  const ratingCount = String(38 + (seed % 21));
  return { ratingValue, ratingCount, reviewCount: ratingCount };
}
```

Remove this block from the `@graph` array:

```typescript
// DELETE THIS BLOCK FROM THE @graph ARRAY
(() => {
  const rating = getDomainRating(config.domain);
  return {
    "@type": "AggregateRating",
    itemReviewed: { "@id": `${domain}/#business` },
    ratingValue: rating.ratingValue,
    bestRating: "5",
    ratingCount: rating.ratingCount,
    reviewCount: rating.reviewCount,
  };
})(),
```

**When to re-add:** Only when real, verified reviews exist. Use Google Business Profile reviews or a third-party platform (e.g., Trustpilot) and pull real data.

---

### FIX 2: Fix LocalBusiness areaServed (CRITICAL)

**File:** `src/lib/schema.ts`
**Problem:** `defaultConfig.locality` is `"USA"`, so the homepage schema generates `{ "@type": "City", "name": "USA" }` -- "USA" is not a city.

**Action:** Change the homepage `areaServed` to represent national coverage properly:

Replace the current `areaServed` in `schema.ts`:

```typescript
// CURRENT (BROKEN)
areaServed: [
  { "@type": "City", name: locality },    // locality = "USA" -- wrong
  { "@type": "State", name: region },      // region = "United States" -- wrong type
],
```

With:

```typescript
// FIXED
areaServed: {
  "@type": "Country",
  name: "United States",
  sameAs: "https://en.wikipedia.org/wiki/United_States",
},
```

For city-specific pages (industry+city, city hub), `areaServed` should use the city and state:

```typescript
areaServed: [
  {
    "@type": "City",
    name: "{{cityName}}",
    containedInPlace: {
      "@type": "State",
      name: "{{stateName}}",
    },
  },
],
```

---

### FIX 3: Fix Homepage BreadcrumbList (MINOR)

**File:** `src/lib/schema.ts`
**Problem:** A single-item BreadcrumbList containing only "Home" is invalid per Google's documentation. BreadcrumbList requires at least 2 items to be useful.

**Action:** Remove the BreadcrumbList entirely from the homepage schema. The homepage IS the root -- it does not need breadcrumbs.

Remove this block from the `@graph` array in `schema.ts`:

```typescript
// DELETE THIS BLOCK -- single-item breadcrumbs are invalid
{
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: domain,
    },
  ],
},
```

---

### FIX 4: Enhance Organization/LocalBusiness Node

**File:** `src/lib/schema.ts`
**Action:** Add missing properties to the LocalBusiness node in the homepage `@graph`:

Add these properties to the existing LocalBusiness object:

```typescript
{
  "@type": ["LocalBusiness", "ProfessionalService"],
  "@id": `${domain}/#business`,
  name: config.brandName,
  // ... existing properties ...

  // ADD THESE:
  logo: {
    "@type": "ImageObject",
    url: `${domain}/logo.png`,
    width: 512,
    height: 512,
  },
  image: `${domain}/og-image.png`,
  foundingDate: "2024",
  sameAs: [
    // Add real URLs when available:
    // "https://www.facebook.com/buildlocal",
    // "https://www.instagram.com/buildlocal",
    // "https://www.linkedin.com/company/buildlocal",
    // "https://x.com/buildlocal",
  ],
  // Uncomment when applicable:
  // numberOfEmployees: {
  //   "@type": "QuantitativeValue",
  //   value: 5,
  // },
}
```

---

## 3. New Schema Templates

---

### Template A: Industry+City Page

**URL pattern:** `/industries/[trade]/[city]`
**Example:** `/industries/roofing/phoenix`
**Page count:** ~255 pages (15 trades x 17 cities)
**File to create:** `src/lib/schema-industry-city.ts`

#### TypeScript Function Signature

```typescript
interface IndustryCitySchemaParams {
  trade: string;           // e.g., "Roofing"
  tradeSlug: string;       // e.g., "roofing"
  cityName: string;        // e.g., "Phoenix"
  citySlug: string;        // e.g., "phoenix"
  stateName: string;       // e.g., "Arizona"
  stateCode: string;       // e.g., "AZ"
  latitude: number;        // e.g., 33.4484
  longitude: number;       // e.g., -112.0740
  metaTitle: string;
  metaDescription: string;
  faqs: Array<{ question: string; answer: string }>;
  processSteps: Array<{ step: number; title: string; description: string }>;
}

export function generateIndustryCitySchema(
  config: DomainConfig,
  params: IndustryCitySchemaParams
): object;
```

#### Complete JSON-LD Template

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "ProfessionalService"],
      "@id": "https://buildlocal.agency/industries/{{tradeSlug}}/{{citySlug}}/#localbusiness",
      "name": "BuildLocal -- {{trade}} Web Design in {{cityName}}",
      "description": "{{metaDescription}}",
      "url": "https://buildlocal.agency/industries/{{tradeSlug}}/{{citySlug}}",
      "telephone": "+17782374700",
      "email": "hello@buildlocal.agency",
      "priceRange": "$195 - $595/mo",
      "areaServed": [
        {
          "@type": "City",
          "name": "{{cityName}}",
          "containedInPlace": {
            "@type": "State",
            "name": "{{stateName}}"
          }
        }
      ],
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "{{latitude}}",
        "longitude": "{{longitude}}"
      },
      "parentOrganization": {
        "@id": "https://buildlocal.agency/#business"
      },
      "serviceType": [
        "{{trade}} Website Design",
        "{{trade}} SEO",
        "{{trade}} Web Development"
      ],
      "knowsAbout": [
        "{{trade}} Website Design",
        "{{trade}} Lead Generation",
        "{{trade}} SEO",
        "Web Design for {{trade}} Companies in {{cityName}}"
      ]
    },

    {
      "@type": "Service",
      "@id": "https://buildlocal.agency/industries/{{tradeSlug}}/{{citySlug}}/#service",
      "name": "{{trade}} Website Design in {{cityName}}, {{stateCode}}",
      "description": "Professional website design and development for {{trade.toLowerCase()}} companies in {{cityName}}, {{stateName}}. Built for leads, SEO, and mobile.",
      "provider": {
        "@id": "https://buildlocal.agency/#business"
      },
      "areaServed": {
        "@type": "City",
        "name": "{{cityName}}",
        "containedInPlace": {
          "@type": "State",
          "name": "{{stateName}}"
        }
      },
      "serviceType": "{{trade}} Website Design",
      "offers": {
        "@type": "AggregateOffer",
        "lowPrice": "195",
        "highPrice": "595",
        "priceCurrency": "USD",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "unitCode": "MON",
          "unitText": "month"
        }
      }
    },

    {
      "@type": "WebPage",
      "@id": "https://buildlocal.agency/industries/{{tradeSlug}}/{{citySlug}}/#webpage",
      "url": "https://buildlocal.agency/industries/{{tradeSlug}}/{{citySlug}}",
      "name": "{{metaTitle}}",
      "description": "{{metaDescription}}",
      "isPartOf": {
        "@id": "https://buildlocal.agency/#website"
      },
      "about": {
        "@id": "https://buildlocal.agency/industries/{{tradeSlug}}/{{citySlug}}/#service"
      },
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": [".hero h1", ".hero p", ".city-stats", "#faq"]
      }
    },

    {
      "@type": "FAQPage",
      "@id": "https://buildlocal.agency/industries/{{tradeSlug}}/{{citySlug}}/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "{{faqs[0].question}}",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "{{faqs[0].answer}}"
          }
        },
        {
          "@type": "Question",
          "name": "{{faqs[1].question}}",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "{{faqs[1].answer}}"
          }
        },
        {
          "@type": "Question",
          "name": "{{faqs[2].question}}",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "{{faqs[2].answer}}"
          }
        },
        {
          "@type": "Question",
          "name": "{{faqs[3].question}}",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "{{faqs[3].answer}}"
          }
        },
        {
          "@type": "Question",
          "name": "{{faqs[4].question}}",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "{{faqs[4].answer}}"
          }
        }
      ]
    },

    {
      "@type": "HowTo",
      "name": "How We Build {{trade}} Websites in {{cityName}}",
      "description": "Our four-step process for designing and building {{trade.toLowerCase()}} websites for {{cityName}}, {{stateCode}} businesses.",
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "{{processSteps[0].title}}",
          "text": "{{processSteps[0].description}}"
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "{{processSteps[1].title}}",
          "text": "{{processSteps[1].description}}"
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "{{processSteps[2].title}}",
          "text": "{{processSteps[2].description}}"
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "{{processSteps[3].title}}",
          "text": "{{processSteps[3].description}}"
        }
      ]
    },

    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://buildlocal.agency"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "{{trade}}",
          "item": "https://buildlocal.agency/industries/{{tradeSlug}}"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "{{cityName}}",
          "item": "https://buildlocal.agency/industries/{{tradeSlug}}/{{citySlug}}"
        }
      ]
    }
  ]
}
```

#### TypeScript Generator

```typescript
// src/lib/schema-industry-city.ts

import { DomainConfig } from "@/content/config";

interface IndustryCitySchemaParams {
  trade: string;
  tradeSlug: string;
  cityName: string;
  citySlug: string;
  stateName: string;
  stateCode: string;
  latitude: number;
  longitude: number;
  metaTitle: string;
  metaDescription: string;
  faqs: Array<{ question: string; answer: string }>;
  processSteps: Array<{ step: number; title: string; description: string }>;
}

export function generateIndustryCitySchema(
  config: DomainConfig,
  params: IndustryCitySchemaParams
) {
  const domain = `https://${config.domain}`;
  const pageUrl = `${domain}/industries/${params.tradeSlug}/${params.citySlug}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      // LocalBusiness scoped to this city+trade
      {
        "@type": ["LocalBusiness", "ProfessionalService"],
        "@id": `${pageUrl}/#localbusiness`,
        name: `${config.brandName} — ${params.trade} Web Design in ${params.cityName}`,
        description: params.metaDescription,
        url: pageUrl,
        ...(config.telephone && { telephone: config.telephone }),
        ...(config.email && { email: config.email }),
        priceRange: "$195 - $595/mo",
        areaServed: [
          {
            "@type": "City",
            name: params.cityName,
            containedInPlace: {
              "@type": "State",
              name: params.stateName,
            },
          },
        ],
        geo: {
          "@type": "GeoCoordinates",
          latitude: params.latitude,
          longitude: params.longitude,
        },
        parentOrganization: { "@id": `${domain}/#business` },
        serviceType: [
          `${params.trade} Website Design`,
          `${params.trade} SEO`,
          `${params.trade} Web Development`,
        ],
        knowsAbout: [
          `${params.trade} Website Design`,
          `${params.trade} Lead Generation`,
          `${params.trade} SEO`,
          `Web Design for ${params.trade} Companies in ${params.cityName}`,
        ],
      },

      // Service
      {
        "@type": "Service",
        "@id": `${pageUrl}/#service`,
        name: `${params.trade} Website Design in ${params.cityName}, ${params.stateCode}`,
        description: `Professional website design and development for ${params.trade.toLowerCase()} companies in ${params.cityName}, ${params.stateName}. Built for leads, SEO, and mobile.`,
        provider: { "@id": `${domain}/#business` },
        areaServed: {
          "@type": "City",
          name: params.cityName,
          containedInPlace: { "@type": "State", name: params.stateName },
        },
        serviceType: `${params.trade} Website Design`,
        offers: {
          "@type": "AggregateOffer",
          lowPrice: "195",
          highPrice: "595",
          priceCurrency: "USD",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            unitCode: "MON",
            unitText: "month",
          },
        },
      },

      // WebPage with SpeakableSpecification
      {
        "@type": "WebPage",
        "@id": `${pageUrl}/#webpage`,
        url: pageUrl,
        name: params.metaTitle,
        description: params.metaDescription,
        isPartOf: { "@id": `${domain}/#website` },
        about: { "@id": `${pageUrl}/#service` },
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: [".hero h1", ".hero p", ".city-stats", "#faq"],
        },
      },

      // FAQPage
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}/#faq`,
        mainEntity: params.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },

      // HowTo
      {
        "@type": "HowTo",
        name: `How We Build ${params.trade} Websites in ${params.cityName}`,
        description: `Our four-step process for designing and building ${params.trade.toLowerCase()} websites for ${params.cityName}, ${params.stateCode} businesses.`,
        step: params.processSteps.map((s) => ({
          "@type": "HowToStep",
          position: s.step,
          name: s.title,
          text: s.description,
        })),
      },

      // BreadcrumbList (3 levels)
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: domain },
          {
            "@type": "ListItem",
            position: 2,
            name: params.trade,
            item: `${domain}/industries/${params.tradeSlug}`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: params.cityName,
            item: pageUrl,
          },
        ],
      },
    ],
  };
}
```

#### Data Population Notes

| Field | Source |
|---|---|
| `trade`, `tradeSlug` | From `IndustryPageConfig` in `industries.ts` |
| `cityName`, `citySlug`, `stateName`, `stateCode` | From city data files (to be created) |
| `latitude`, `longitude` | From city data files -- hardcoded per city |
| `metaTitle`, `metaDescription` | Generated from template functions: `${trade} Web Design in ${cityName}, ${stateCode}` |
| `faqs` | Generated from trade+city FAQ template functions |
| `processSteps` | Shared from `IndustryPageConfig.processSteps` |

---

### Template B: Industry Hub Page

**URL pattern:** `/industries/[trade]`
**Example:** `/industries/roofing`
**Page count:** 15 pages
**File to modify:** `src/lib/schema-industry.ts` (extend existing)

#### TypeScript Function Signature

```typescript
interface IndustryHubSchemaParams {
  trade: string;           // e.g., "Roofing"
  tradeSlug: string;       // e.g., "roofing"
  metaTitle: string;
  metaDescription: string;
  faqs: Array<{ question: string; answer: string }>;
  processSteps: Array<{ step: number; title: string; description: string }>;
  cityPages: Array<{ cityName: string; citySlug: string }>;
}

export function generateIndustryHubSchema(
  config: DomainConfig,
  params: IndustryHubSchemaParams
): object;
```

#### Complete JSON-LD Template

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://buildlocal.agency/industries/{{tradeSlug}}/#service",
      "name": "{{trade}} Website Design",
      "description": "{{metaDescription}}",
      "provider": {
        "@id": "https://buildlocal.agency/#business"
      },
      "areaServed": {
        "@type": "Country",
        "name": "United States"
      },
      "serviceType": "{{trade}} Website Design",
      "offers": {
        "@type": "AggregateOffer",
        "lowPrice": "195",
        "highPrice": "595",
        "priceCurrency": "USD",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "unitCode": "MON",
          "unitText": "month"
        }
      }
    },

    {
      "@type": "ItemList",
      "@id": "https://buildlocal.agency/industries/{{tradeSlug}}/#citylist",
      "name": "{{trade}} Web Design by City",
      "description": "Browse {{trade.toLowerCase()}} web design services by city.",
      "numberOfItems": "{{cityPages.length}}",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "{{trade}} Web Design in {{cityPages[0].cityName}}",
          "url": "https://buildlocal.agency/industries/{{tradeSlug}}/{{cityPages[0].citySlug}}"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "{{trade}} Web Design in {{cityPages[1].cityName}}",
          "url": "https://buildlocal.agency/industries/{{tradeSlug}}/{{cityPages[1].citySlug}}"
        }
      ]
    },

    {
      "@type": "WebPage",
      "@id": "https://buildlocal.agency/industries/{{tradeSlug}}/#webpage",
      "url": "https://buildlocal.agency/industries/{{tradeSlug}}",
      "name": "{{metaTitle}}",
      "description": "{{metaDescription}}",
      "isPartOf": {
        "@id": "https://buildlocal.agency/#website"
      },
      "about": {
        "@id": "https://buildlocal.agency/industries/{{tradeSlug}}/#service"
      },
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": [".industry-hero h1", ".industry-hero p", "#why-website h2", "#faq"]
      }
    },

    {
      "@type": "FAQPage",
      "@id": "https://buildlocal.agency/industries/{{tradeSlug}}/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "{{faqs[0].question}}",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "{{faqs[0].answer}}"
          }
        }
      ]
    },

    {
      "@type": "HowTo",
      "name": "How We Build {{trade}} Websites",
      "description": "Our step-by-step process for building {{trade.toLowerCase()}} websites.",
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "{{processSteps[0].title}}",
          "text": "{{processSteps[0].description}}"
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "{{processSteps[1].title}}",
          "text": "{{processSteps[1].description}}"
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "{{processSteps[2].title}}",
          "text": "{{processSteps[2].description}}"
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "{{processSteps[3].title}}",
          "text": "{{processSteps[3].description}}"
        }
      ]
    },

    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://buildlocal.agency"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "{{trade}}",
          "item": "https://buildlocal.agency/industries/{{tradeSlug}}"
        }
      ]
    }
  ]
}
```

#### TypeScript Generator

```typescript
// Add to src/lib/schema-industry.ts (or replace generateIndustrySchema)

export function generateIndustryHubSchema(
  config: DomainConfig,
  params: IndustryHubSchemaParams
) {
  const domain = `https://${config.domain}`;
  const pageUrl = `${domain}/industries/${params.tradeSlug}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      // Service
      {
        "@type": "Service",
        "@id": `${pageUrl}/#service`,
        name: `${params.trade} Website Design`,
        description: params.metaDescription,
        provider: { "@id": `${domain}/#business` },
        areaServed: { "@type": "Country", name: "United States" },
        serviceType: `${params.trade} Website Design`,
        offers: {
          "@type": "AggregateOffer",
          lowPrice: "195",
          highPrice: "595",
          priceCurrency: "USD",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            unitCode: "MON",
            unitText: "month",
          },
        },
      },

      // ItemList of city sub-pages
      {
        "@type": "ItemList",
        "@id": `${pageUrl}/#citylist`,
        name: `${params.trade} Web Design by City`,
        description: `Browse ${params.trade.toLowerCase()} web design services by city.`,
        numberOfItems: params.cityPages.length,
        itemListElement: params.cityPages.map((city, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: `${params.trade} Web Design in ${city.cityName}`,
          url: `${domain}/industries/${params.tradeSlug}/${city.citySlug}`,
        })),
      },

      // WebPage with SpeakableSpecification
      {
        "@type": "WebPage",
        "@id": `${pageUrl}/#webpage`,
        url: pageUrl,
        name: params.metaTitle,
        description: params.metaDescription,
        isPartOf: { "@id": `${domain}/#website` },
        about: { "@id": `${pageUrl}/#service` },
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: [
            ".industry-hero h1",
            ".industry-hero p",
            "#why-website h2",
            "#faq",
          ],
        },
      },

      // FAQPage
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}/#faq`,
        mainEntity: params.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },

      // HowTo
      {
        "@type": "HowTo",
        name: `How We Build ${params.trade} Websites`,
        description: `Our step-by-step process for building ${params.trade.toLowerCase()} websites.`,
        step: params.processSteps.map((s) => ({
          "@type": "HowToStep",
          position: s.step,
          name: s.title,
          text: s.description,
        })),
      },

      // BreadcrumbList (2 levels)
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: domain },
          {
            "@type": "ListItem",
            position: 2,
            name: params.trade,
            item: pageUrl,
          },
        ],
      },
    ],
  };
}
```

#### Data Population Notes

| Field | Source |
|---|---|
| `trade`, `tradeSlug` | From `IndustryPageConfig` in `industries.ts` |
| `cityPages` | From city data -- all 17 cities for this trade |
| `faqs` | From `IndustryPageConfig.faqs()` -- should have 8+ FAQs |
| `processSteps` | From `IndustryPageConfig.processSteps` |

---

### Template C: City Hub Page

**URL pattern:** `/locations/[city]`
**Example:** `/locations/phoenix`
**Page count:** 17 pages
**File to create:** `src/lib/schema-city.ts`

#### TypeScript Function Signature

```typescript
interface CityHubSchemaParams {
  cityName: string;        // e.g., "Phoenix"
  citySlug: string;        // e.g., "phoenix"
  stateName: string;       // e.g., "Arizona"
  stateCode: string;       // e.g., "AZ"
  latitude: number;
  longitude: number;
  metaTitle: string;
  metaDescription: string;
  faqs: Array<{ question: string; answer: string }>;
  industryPages: Array<{ trade: string; tradeSlug: string }>;
}

export function generateCityHubSchema(
  config: DomainConfig,
  params: CityHubSchemaParams
): object;
```

#### Complete JSON-LD Template

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "ProfessionalService"],
      "@id": "https://buildlocal.agency/locations/{{citySlug}}/#localbusiness",
      "name": "BuildLocal -- Web Design in {{cityName}}, {{stateCode}}",
      "description": "{{metaDescription}}",
      "url": "https://buildlocal.agency/locations/{{citySlug}}",
      "telephone": "+17782374700",
      "email": "hello@buildlocal.agency",
      "priceRange": "$195 - $595/mo",
      "areaServed": {
        "@type": "City",
        "name": "{{cityName}}",
        "containedInPlace": {
          "@type": "State",
          "name": "{{stateName}}"
        }
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "{{latitude}}",
        "longitude": "{{longitude}}"
      },
      "parentOrganization": {
        "@id": "https://buildlocal.agency/#business"
      },
      "serviceType": [
        "Website Design",
        "Website Development",
        "SEO",
        "Google Business Profile Management"
      ]
    },

    {
      "@type": "ItemList",
      "@id": "https://buildlocal.agency/locations/{{citySlug}}/#industrylist",
      "name": "Web Design Services in {{cityName}} by Industry",
      "description": "Browse our {{cityName}} web design services by industry.",
      "numberOfItems": "{{industryPages.length}}",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "{{industryPages[0].trade}} Web Design in {{cityName}}",
          "url": "https://buildlocal.agency/industries/{{industryPages[0].tradeSlug}}/{{citySlug}}"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "{{industryPages[1].trade}} Web Design in {{cityName}}",
          "url": "https://buildlocal.agency/industries/{{industryPages[1].tradeSlug}}/{{citySlug}}"
        }
      ]
    },

    {
      "@type": "WebPage",
      "@id": "https://buildlocal.agency/locations/{{citySlug}}/#webpage",
      "url": "https://buildlocal.agency/locations/{{citySlug}}",
      "name": "{{metaTitle}}",
      "description": "{{metaDescription}}",
      "isPartOf": {
        "@id": "https://buildlocal.agency/#website"
      },
      "about": {
        "@id": "https://buildlocal.agency/locations/{{citySlug}}/#localbusiness"
      },
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": [".hero h1", ".hero p", ".city-overview", "#faq"]
      }
    },

    {
      "@type": "FAQPage",
      "@id": "https://buildlocal.agency/locations/{{citySlug}}/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "{{faqs[0].question}}",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "{{faqs[0].answer}}"
          }
        },
        {
          "@type": "Question",
          "name": "{{faqs[1].question}}",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "{{faqs[1].answer}}"
          }
        },
        {
          "@type": "Question",
          "name": "{{faqs[2].question}}",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "{{faqs[2].answer}}"
          }
        },
        {
          "@type": "Question",
          "name": "{{faqs[3].question}}",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "{{faqs[3].answer}}"
          }
        },
        {
          "@type": "Question",
          "name": "{{faqs[4].question}}",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "{{faqs[4].answer}}"
          }
        },
        {
          "@type": "Question",
          "name": "{{faqs[5].question}}",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "{{faqs[5].answer}}"
          }
        }
      ]
    },

    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://buildlocal.agency"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "{{cityName}}",
          "item": "https://buildlocal.agency/locations/{{citySlug}}"
        }
      ]
    }
  ]
}
```

#### TypeScript Generator

```typescript
// src/lib/schema-city.ts

import { DomainConfig } from "@/content/config";

interface CityHubSchemaParams {
  cityName: string;
  citySlug: string;
  stateName: string;
  stateCode: string;
  latitude: number;
  longitude: number;
  metaTitle: string;
  metaDescription: string;
  faqs: Array<{ question: string; answer: string }>;
  industryPages: Array<{ trade: string; tradeSlug: string }>;
}

export function generateCityHubSchema(
  config: DomainConfig,
  params: CityHubSchemaParams
) {
  const domain = `https://${config.domain}`;
  const pageUrl = `${domain}/locations/${params.citySlug}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      // LocalBusiness scoped to this city
      {
        "@type": ["LocalBusiness", "ProfessionalService"],
        "@id": `${pageUrl}/#localbusiness`,
        name: `${config.brandName} — Web Design in ${params.cityName}, ${params.stateCode}`,
        description: params.metaDescription,
        url: pageUrl,
        ...(config.telephone && { telephone: config.telephone }),
        ...(config.email && { email: config.email }),
        priceRange: "$195 - $595/mo",
        areaServed: {
          "@type": "City",
          name: params.cityName,
          containedInPlace: {
            "@type": "State",
            name: params.stateName,
          },
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: params.latitude,
          longitude: params.longitude,
        },
        parentOrganization: { "@id": `${domain}/#business` },
        serviceType: [
          "Website Design",
          "Website Development",
          "SEO",
          "Google Business Profile Management",
        ],
      },

      // ItemList of industry sub-pages for this city
      {
        "@type": "ItemList",
        "@id": `${pageUrl}/#industrylist`,
        name: `Web Design Services in ${params.cityName} by Industry`,
        description: `Browse our ${params.cityName} web design services by industry.`,
        numberOfItems: params.industryPages.length,
        itemListElement: params.industryPages.map((industry, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: `${industry.trade} Web Design in ${params.cityName}`,
          url: `${domain}/industries/${industry.tradeSlug}/${params.citySlug}`,
        })),
      },

      // WebPage with SpeakableSpecification
      {
        "@type": "WebPage",
        "@id": `${pageUrl}/#webpage`,
        url: pageUrl,
        name: params.metaTitle,
        description: params.metaDescription,
        isPartOf: { "@id": `${domain}/#website` },
        about: { "@id": `${pageUrl}/#localbusiness` },
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: [".hero h1", ".hero p", ".city-overview", "#faq"],
        },
      },

      // FAQPage
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}/#faq`,
        mainEntity: params.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },

      // BreadcrumbList (2 levels)
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: domain },
          {
            "@type": "ListItem",
            position: 2,
            name: params.cityName,
            item: pageUrl,
          },
        ],
      },
    ],
  };
}
```

#### City Data Reference

Each city needs the following data stored in a city config/data file:

```typescript
// Suggested: src/content/cities.ts
interface CityData {
  name: string;          // "Phoenix"
  slug: string;          // "phoenix"
  state: string;         // "Arizona"
  stateCode: string;     // "AZ"
  latitude: number;      // 33.4484
  longitude: number;     // -112.0740
  population?: number;   // 1_608_139
  timezone?: string;     // "America/Phoenix"
}
```

---

### Template D: Comparison Page

**URL pattern:** `/compare/[slug]`
**Example:** `/compare/buildlocal-vs-squarespace`
**Page count:** ~10 pages
**File to create:** `src/lib/schema-comparison.ts`

#### TypeScript Function Signature

```typescript
interface ComparisonSchemaParams {
  slug: string;                        // e.g., "buildlocal-vs-squarespace"
  title: string;                       // e.g., "BuildLocal vs Squarespace"
  description: string;
  metaTitle: string;
  competitors: Array<{
    name: string;
    description: string;
    url?: string;
  }>;
  faqs: Array<{ question: string; answer: string }>;
}

export function generateComparisonSchema(
  config: DomainConfig,
  params: ComparisonSchemaParams
): object;
```

#### Complete JSON-LD Template

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://buildlocal.agency/compare/{{slug}}/#webpage",
      "url": "https://buildlocal.agency/compare/{{slug}}",
      "name": "{{metaTitle}}",
      "description": "{{description}}",
      "isPartOf": {
        "@id": "https://buildlocal.agency/#website"
      },
      "about": {
        "@id": "https://buildlocal.agency/#business"
      },
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": [".comparison-table", ".hero h1", "#faq"]
      }
    },

    {
      "@type": "ItemList",
      "@id": "https://buildlocal.agency/compare/{{slug}}/#comparison",
      "name": "{{title}} Comparison",
      "description": "Feature-by-feature comparison of {{competitors[0].name}} and {{competitors[1].name}}.",
      "numberOfItems": "{{competitors.length}}",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@type": "Product",
            "name": "{{competitors[0].name}}",
            "description": "{{competitors[0].description}}",
            "url": "{{competitors[0].url}}"
          }
        },
        {
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@type": "Product",
            "name": "{{competitors[1].name}}",
            "description": "{{competitors[1].description}}",
            "url": "{{competitors[1].url}}"
          }
        }
      ]
    },

    {
      "@type": "FAQPage",
      "@id": "https://buildlocal.agency/compare/{{slug}}/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "{{faqs[0].question}}",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "{{faqs[0].answer}}"
          }
        },
        {
          "@type": "Question",
          "name": "{{faqs[1].question}}",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "{{faqs[1].answer}}"
          }
        },
        {
          "@type": "Question",
          "name": "{{faqs[2].question}}",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "{{faqs[2].answer}}"
          }
        },
        {
          "@type": "Question",
          "name": "{{faqs[3].question}}",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "{{faqs[3].answer}}"
          }
        },
        {
          "@type": "Question",
          "name": "{{faqs[4].question}}",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "{{faqs[4].answer}}"
          }
        },
        {
          "@type": "Question",
          "name": "{{faqs[5].question}}",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "{{faqs[5].answer}}"
          }
        },
        {
          "@type": "Question",
          "name": "{{faqs[6].question}}",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "{{faqs[6].answer}}"
          }
        },
        {
          "@type": "Question",
          "name": "{{faqs[7].question}}",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "{{faqs[7].answer}}"
          }
        }
      ]
    },

    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://buildlocal.agency"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "{{title}}",
          "item": "https://buildlocal.agency/compare/{{slug}}"
        }
      ]
    }
  ]
}
```

#### TypeScript Generator

```typescript
// src/lib/schema-comparison.ts

import { DomainConfig } from "@/content/config";

interface ComparisonSchemaParams {
  slug: string;
  title: string;
  description: string;
  metaTitle: string;
  competitors: Array<{
    name: string;
    description: string;
    url?: string;
  }>;
  faqs: Array<{ question: string; answer: string }>;
}

export function generateComparisonSchema(
  config: DomainConfig,
  params: ComparisonSchemaParams
) {
  const domain = `https://${config.domain}`;
  const pageUrl = `${domain}/compare/${params.slug}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      // WebPage
      {
        "@type": "WebPage",
        "@id": `${pageUrl}/#webpage`,
        url: pageUrl,
        name: params.metaTitle,
        description: params.description,
        isPartOf: { "@id": `${domain}/#website` },
        about: { "@id": `${domain}/#business` },
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: [".comparison-table", ".hero h1", "#faq"],
        },
      },

      // ItemList (comparison entities)
      {
        "@type": "ItemList",
        "@id": `${pageUrl}/#comparison`,
        name: `${params.title} Comparison`,
        description: `Feature-by-feature comparison of ${params.competitors.map((c) => c.name).join(" and ")}.`,
        numberOfItems: params.competitors.length,
        itemListElement: params.competitors.map((competitor, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Product",
            name: competitor.name,
            description: competitor.description,
            ...(competitor.url && { url: competitor.url }),
          },
        })),
      },

      // FAQPage
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}/#faq`,
        mainEntity: params.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },

      // BreadcrumbList
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: domain },
          {
            "@type": "ListItem",
            position: 2,
            name: params.title,
            item: pageUrl,
          },
        ],
      },
    ],
  };
}
```

---

### Template E: Case Study Page

**URL pattern:** `/case-studies/[slug]`
**Example:** `/case-studies/delgado-roofing`
**Page count:** ~10-20 pages
**File to create:** `src/lib/schema-case-study.ts`

#### TypeScript Function Signature

```typescript
interface CaseStudySchemaParams {
  slug: string;               // e.g., "delgado-roofing"
  title: string;              // e.g., "Delgado Roofing Case Study"
  headline: string;           // e.g., "How Delgado Roofing Got 3x More Leads"
  description: string;
  metaTitle: string;
  clientName: string;         // e.g., "Delgado Roofing"
  industry: string;           // e.g., "Roofing"
  cityName: string;           // e.g., "Phoenix"
  datePublished: string;      // ISO date
  dateModified: string;       // ISO date
  featuredImage?: string;     // path to image
  wordCount?: number;
}

export function generateCaseStudySchema(
  config: DomainConfig,
  params: CaseStudySchemaParams
): object;
```

#### Complete JSON-LD Template

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://buildlocal.agency/case-studies/{{slug}}/#article",
      "headline": "{{headline}}",
      "description": "{{description}}",
      "datePublished": "{{datePublished}}",
      "dateModified": "{{dateModified}}",
      "author": {
        "@type": "Organization",
        "@id": "https://buildlocal.agency/#business"
      },
      "publisher": {
        "@type": "Organization",
        "@id": "https://buildlocal.agency/#business",
        "name": "BuildLocal",
        "logo": {
          "@type": "ImageObject",
          "url": "https://buildlocal.agency/logo.png"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://buildlocal.agency/case-studies/{{slug}}/#webpage"
      },
      "image": "https://buildlocal.agency{{featuredImage}}",
      "wordCount": "{{wordCount}}",
      "articleSection": "Case Study",
      "keywords": "{{clientName}}, {{industry}}, web design, {{cityName}}, case study",
      "about": {
        "@type": "LocalBusiness",
        "name": "{{clientName}}",
        "industry": "{{industry}}",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "{{cityName}}"
        }
      },
      "inLanguage": "en"
    },

    {
      "@type": "WebPage",
      "@id": "https://buildlocal.agency/case-studies/{{slug}}/#webpage",
      "url": "https://buildlocal.agency/case-studies/{{slug}}",
      "name": "{{metaTitle}}",
      "description": "{{description}}",
      "isPartOf": {
        "@id": "https://buildlocal.agency/#website"
      },
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": [".case-study-title", ".case-study-intro", ".results-summary"]
      }
    },

    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://buildlocal.agency"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "{{title}}",
          "item": "https://buildlocal.agency/case-studies/{{slug}}"
        }
      ]
    }
  ]
}
```

#### TypeScript Generator

```typescript
// src/lib/schema-case-study.ts

import { DomainConfig } from "@/content/config";

interface CaseStudySchemaParams {
  slug: string;
  title: string;
  headline: string;
  description: string;
  metaTitle: string;
  clientName: string;
  industry: string;
  cityName: string;
  datePublished: string;
  dateModified: string;
  featuredImage?: string;
  wordCount?: number;
}

export function generateCaseStudySchema(
  config: DomainConfig,
  params: CaseStudySchemaParams
) {
  const domain = `https://${config.domain}`;
  const pageUrl = `${domain}/case-studies/${params.slug}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      // Article
      {
        "@type": "Article",
        "@id": `${pageUrl}/#article`,
        headline: params.headline,
        description: params.description,
        datePublished: params.datePublished,
        dateModified: params.dateModified,
        author: {
          "@type": "Organization",
          "@id": `${domain}/#business`,
        },
        publisher: {
          "@type": "Organization",
          "@id": `${domain}/#business`,
          name: config.brandName,
          logo: {
            "@type": "ImageObject",
            url: `${domain}/logo.png`,
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${pageUrl}/#webpage`,
        },
        ...(params.featuredImage && {
          image: {
            "@type": "ImageObject",
            url: `${domain}${params.featuredImage}`,
            width: 1200,
            height: 630,
          },
        }),
        ...(params.wordCount && { wordCount: params.wordCount }),
        articleSection: "Case Study",
        keywords: `${params.clientName}, ${params.industry}, web design, ${params.cityName}, case study`,
        about: {
          "@type": "LocalBusiness",
          name: params.clientName,
          industry: params.industry,
          address: {
            "@type": "PostalAddress",
            addressLocality: params.cityName,
          },
        },
        inLanguage: "en",
      },

      // WebPage with SpeakableSpecification
      {
        "@type": "WebPage",
        "@id": `${pageUrl}/#webpage`,
        url: pageUrl,
        name: params.metaTitle,
        description: params.description,
        isPartOf: { "@id": `${domain}/#website` },
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: [
            ".case-study-title",
            ".case-study-intro",
            ".results-summary",
          ],
        },
      },

      // BreadcrumbList
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: domain },
          {
            "@type": "ListItem",
            position: 2,
            name: params.title,
            item: pageUrl,
          },
        ],
      },
    ],
  };
}
```

---

### Template F: Resource/Tool Page

**URL pattern:** `/tools/[slug]`
**Example:** `/tools/website-cost-calculator`
**Page count:** ~5-10 pages
**File to create:** `src/lib/schema-tool.ts`

#### TypeScript Function Signature

```typescript
interface ToolSchemaParams {
  slug: string;                // e.g., "website-cost-calculator"
  name: string;                // e.g., "Website Cost Calculator"
  description: string;
  metaTitle: string;
  applicationCategory: string; // e.g., "BusinessApplication"
  operatingSystem: string;     // "Any" (web-based)
  faqs: Array<{ question: string; answer: string }>;
}

export function generateToolSchema(
  config: DomainConfig,
  params: ToolSchemaParams
): object;
```

#### Complete JSON-LD Template

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": "https://buildlocal.agency/tools/{{slug}}/#application",
      "name": "{{name}}",
      "description": "{{description}}",
      "url": "https://buildlocal.agency/tools/{{slug}}",
      "applicationCategory": "{{applicationCategory}}",
      "operatingSystem": "Any",
      "browserRequirements": "Requires JavaScript",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "author": {
        "@id": "https://buildlocal.agency/#business"
      },
      "provider": {
        "@id": "https://buildlocal.agency/#business"
      }
    },

    {
      "@type": "WebPage",
      "@id": "https://buildlocal.agency/tools/{{slug}}/#webpage",
      "url": "https://buildlocal.agency/tools/{{slug}}",
      "name": "{{metaTitle}}",
      "description": "{{description}}",
      "isPartOf": {
        "@id": "https://buildlocal.agency/#website"
      },
      "mainEntity": {
        "@id": "https://buildlocal.agency/tools/{{slug}}/#application"
      },
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": [".tool-title", ".tool-description", "#faq"]
      }
    },

    {
      "@type": "FAQPage",
      "@id": "https://buildlocal.agency/tools/{{slug}}/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "{{faqs[0].question}}",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "{{faqs[0].answer}}"
          }
        },
        {
          "@type": "Question",
          "name": "{{faqs[1].question}}",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "{{faqs[1].answer}}"
          }
        },
        {
          "@type": "Question",
          "name": "{{faqs[2].question}}",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "{{faqs[2].answer}}"
          }
        }
      ]
    },

    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://buildlocal.agency"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "{{name}}",
          "item": "https://buildlocal.agency/tools/{{slug}}"
        }
      ]
    }
  ]
}
```

#### TypeScript Generator

```typescript
// src/lib/schema-tool.ts

import { DomainConfig } from "@/content/config";

interface ToolSchemaParams {
  slug: string;
  name: string;
  description: string;
  metaTitle: string;
  applicationCategory: string;
  operatingSystem: string;
  faqs: Array<{ question: string; answer: string }>;
}

export function generateToolSchema(
  config: DomainConfig,
  params: ToolSchemaParams
) {
  const domain = `https://${config.domain}`;
  const pageUrl = `${domain}/tools/${params.slug}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      // WebApplication
      {
        "@type": "WebApplication",
        "@id": `${pageUrl}/#application`,
        name: params.name,
        description: params.description,
        url: pageUrl,
        applicationCategory: params.applicationCategory,
        operatingSystem: params.operatingSystem || "Any",
        browserRequirements: "Requires JavaScript",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        author: { "@id": `${domain}/#business` },
        provider: { "@id": `${domain}/#business` },
      },

      // WebPage with SpeakableSpecification
      {
        "@type": "WebPage",
        "@id": `${pageUrl}/#webpage`,
        url: pageUrl,
        name: params.metaTitle,
        description: params.description,
        isPartOf: { "@id": `${domain}/#website` },
        mainEntity: { "@id": `${pageUrl}/#application` },
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: [".tool-title", ".tool-description", "#faq"],
        },
      },

      // FAQPage
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}/#faq`,
        mainEntity: params.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },

      // BreadcrumbList
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: domain },
          {
            "@type": "ListItem",
            position: 2,
            name: params.name,
            item: pageUrl,
          },
        ],
      },
    ],
  };
}
```

---

### Template G: Enhanced Homepage

**URL:** `/` (root)
**File to modify:** `src/lib/schema.ts`
**Changes:** Remove AggregateRating, fix areaServed, add sameAs/logo/foundingDate, remove BreadcrumbList, add OfferCatalog

#### Complete JSON-LD Template (Replacement)

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "ProfessionalService"],
      "@id": "https://buildlocal.agency/#business",
      "name": "BuildLocal",
      "description": "We design, build, and manage high-performance websites for small businesses. No setup fees, no contracts. Fully managed from $195/month.",
      "url": "https://buildlocal.agency",
      "telephone": "+17782374700",
      "email": "hello@buildlocal.agency",
      "logo": {
        "@type": "ImageObject",
        "url": "https://buildlocal.agency/logo.png",
        "width": 512,
        "height": 512
      },
      "image": "https://buildlocal.agency/og-image.png",
      "foundingDate": "2024",
      "sameAs": [],
      "areaServed": {
        "@type": "Country",
        "name": "United States",
        "sameAs": "https://en.wikipedia.org/wiki/United_States"
      },
      "priceRange": "$195 - $595/mo",
      "serviceType": [
        "Website Design",
        "Website Development",
        "Web Hosting",
        "SEO",
        "Google Business Profile Management"
      ],
      "knowsAbout": [
        "Website Design",
        "Website Development",
        "Web Hosting",
        "Search Engine Optimization",
        "Google Business Profile Management",
        "Responsive Web Design",
        "Conversion Rate Optimization"
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Website Plans",
        "itemListElement": [
          {
            "@type": "Offer",
            "name": "Starter Plan",
            "description": "Professional website with hosting, SSL, and monthly updates.",
            "price": "195",
            "priceCurrency": "USD",
            "priceSpecification": {
              "@type": "UnitPriceSpecification",
              "price": "195",
              "priceCurrency": "USD",
              "unitCode": "MON",
              "unitText": "month"
            }
          },
          {
            "@type": "Offer",
            "name": "Growth Plan",
            "description": "Everything in Starter plus SEO, analytics, and priority support.",
            "price": "295",
            "priceCurrency": "USD",
            "priceSpecification": {
              "@type": "UnitPriceSpecification",
              "price": "295",
              "priceCurrency": "USD",
              "unitCode": "MON",
              "unitText": "month"
            }
          },
          {
            "@type": "Offer",
            "name": "Premium Plan",
            "description": "Full-service website management with advanced SEO, Google Business Profile, and conversion optimization.",
            "price": "595",
            "priceCurrency": "USD",
            "priceSpecification": {
              "@type": "UnitPriceSpecification",
              "price": "595",
              "priceCurrency": "USD",
              "unitCode": "MON",
              "unitText": "month"
            }
          }
        ]
      }
    },

    {
      "@type": "WebPage",
      "@id": "https://buildlocal.agency/#webpage",
      "url": "https://buildlocal.agency",
      "name": "{{metaTitle}}",
      "description": "{{metaDescription}}",
      "isPartOf": {
        "@id": "https://buildlocal.agency/#website"
      },
      "about": {
        "@id": "https://buildlocal.agency/#business"
      },
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": ["#hero h1", "#hero p", "#why-buildlocal h2", "#faq"]
      }
    },

    {
      "@type": "WebSite",
      "@id": "https://buildlocal.agency/#website",
      "url": "https://buildlocal.agency",
      "name": "BuildLocal",
      "publisher": {
        "@id": "https://buildlocal.agency/#business"
      }
    },

    {
      "@type": "FAQPage",
      "@id": "https://buildlocal.agency/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "{{faqs[0].question}}",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "{{faqs[0].answer}}"
          }
        }
      ]
    },

    {
      "@type": "HowTo",
      "name": "Our Web Development Process",
      "description": "Our four-step process for designing and building websites for small businesses.",
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "{{processSteps[0].title}}",
          "text": "{{processSteps[0].description}}"
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "{{processSteps[1].title}}",
          "text": "{{processSteps[1].description}}"
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "{{processSteps[2].title}}",
          "text": "{{processSteps[2].description}}"
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "{{processSteps[3].title}}",
          "text": "{{processSteps[3].description}}"
        }
      ]
    },

    {
      "@type": "Service",
      "serviceType": "{{service.title}}",
      "description": "{{service.description}}",
      "provider": {
        "@id": "https://buildlocal.agency/#business"
      },
      "areaServed": {
        "@type": "Country",
        "name": "United States"
      }
    }
  ]
}
```

#### TypeScript Generator (Replacement for schema.ts)

```typescript
// src/lib/schema.ts -- REPLACEMENT

import { DomainConfig } from "@/content/config";
import { getExpandedFaqs } from "@/content/shared";
import { processSteps, agencyServices } from "@/content/shared";

// REMOVED: getDomainRating function (fake ratings)

export function generateSchema(config: DomainConfig) {
  const domain = `https://${config.domain}`;
  const expandedFaqs = getExpandedFaqs(
    config.locality,
    config.region,
    config.slug
  );

  return {
    "@context": "https://schema.org",
    "@graph": [
      // LocalBusiness + ProfessionalService (canonical Organization node)
      {
        "@type": ["LocalBusiness", "ProfessionalService"],
        "@id": `${domain}/#business`,
        name: config.brandName,
        description: config.metaDescription,
        url: domain,
        ...(config.telephone && { telephone: config.telephone }),
        ...(config.email && { email: config.email }),
        logo: {
          "@type": "ImageObject",
          url: `${domain}/logo.png`,
          width: 512,
          height: 512,
        },
        image: `${domain}/og-image.png`,
        foundingDate: "2024",
        sameAs: [
          // Populate with real social URLs when available:
          // "https://www.facebook.com/buildlocal",
          // "https://www.instagram.com/buildlocal",
          // "https://www.linkedin.com/company/buildlocal",
          // "https://x.com/buildlocal",
        ],
        // FIXED: areaServed now uses Country instead of broken City("USA")
        areaServed: {
          "@type": "Country",
          name: "United States",
          sameAs: "https://en.wikipedia.org/wiki/United_States",
        },
        priceRange: "$195 - $595/mo",
        serviceType: [
          "Website Design",
          "Website Development",
          "Web Hosting",
          "SEO",
          "Google Business Profile Management",
        ],
        knowsAbout: [
          "Website Design",
          "Website Development",
          "Web Hosting",
          "Search Engine Optimization",
          "Google Business Profile Management",
          "Responsive Web Design",
          "Conversion Rate Optimization",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Website Plans",
          itemListElement: [
            {
              "@type": "Offer",
              name: "Starter Plan",
              description:
                "Professional website with hosting, SSL, and monthly updates.",
              price: "195",
              priceCurrency: "USD",
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                price: "195",
                priceCurrency: "USD",
                unitCode: "MON",
                unitText: "month",
              },
            },
            {
              "@type": "Offer",
              name: "Growth Plan",
              description:
                "Everything in Starter plus SEO, analytics, and priority support.",
              price: "295",
              priceCurrency: "USD",
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                price: "295",
                priceCurrency: "USD",
                unitCode: "MON",
                unitText: "month",
              },
            },
            {
              "@type": "Offer",
              name: "Premium Plan",
              description:
                "Full-service website management with advanced SEO, Google Business Profile, and conversion optimization.",
              price: "595",
              priceCurrency: "USD",
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                price: "595",
                priceCurrency: "USD",
                unitCode: "MON",
                unitText: "month",
              },
            },
          ],
        },
      },

      // WebPage
      {
        "@type": "WebPage",
        "@id": `${domain}/#webpage`,
        url: domain,
        name: config.metaTitle,
        description: config.metaDescription,
        isPartOf: { "@id": `${domain}/#website` },
        about: { "@id": `${domain}/#business` },
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["#hero h1", "#hero p", "#why-buildlocal h2", "#faq"],
        },
      },

      // WebSite
      {
        "@type": "WebSite",
        "@id": `${domain}/#website`,
        url: domain,
        name: config.brandName,
        publisher: { "@id": `${domain}/#business` },
      },

      // FAQPage
      {
        "@type": "FAQPage",
        "@id": `${domain}/#faq`,
        mainEntity: expandedFaqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },

      // HowTo
      {
        "@type": "HowTo",
        name: "Our Web Development Process",
        description:
          "Our four-step process for designing and building websites for small businesses.",
        step: processSteps.map((s) => ({
          "@type": "HowToStep",
          position: s.step,
          name: s.title,
          text: s.description,
        })),
      },

      // REMOVED: AggregateRating (was using fake/generated ratings)

      // Services
      ...agencyServices.map(
        (service: { title: string; description: string }) => ({
          "@type": "Service",
          serviceType: service.title,
          description: service.description,
          provider: { "@id": `${domain}/#business` },
          areaServed: {
            "@type": "Country",
            name: "United States",
          },
        })
      ),

      // REMOVED: BreadcrumbList (single-item breadcrumb on homepage is invalid)
    ],
  };
}
```

---

### Template H: Pricing Page

**URL:** `/pricing`
**Page count:** 1 page
**File to create:** `src/lib/schema-pricing.ts`

#### TypeScript Function Signature

```typescript
interface PricingSchemaParams {
  metaTitle: string;
  metaDescription: string;
  faqs: Array<{ question: string; answer: string }>;
  tiers: Array<{
    name: string;
    price: number;
    description: string;
    includes: string[];
  }>;
}

export function generatePricingSchema(
  config: DomainConfig,
  params: PricingSchemaParams
): object;
```

#### Complete JSON-LD Template

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://buildlocal.agency/pricing/#webpage",
      "url": "https://buildlocal.agency/pricing",
      "name": "{{metaTitle}}",
      "description": "{{metaDescription}}",
      "isPartOf": {
        "@id": "https://buildlocal.agency/#website"
      },
      "about": {
        "@id": "https://buildlocal.agency/#business"
      },
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": [".pricing-hero h1", ".pricing-hero p", "#faq"]
      }
    },

    {
      "@type": "OfferCatalog",
      "@id": "https://buildlocal.agency/pricing/#offers",
      "name": "BuildLocal Website Plans",
      "description": "Monthly website plans for small businesses. No setup fees, no contracts.",
      "provider": {
        "@id": "https://buildlocal.agency/#business"
      },
      "numberOfItems": 3,
      "itemListElement": [
        {
          "@type": "Offer",
          "name": "Starter Plan",
          "description": "Professional website with hosting, SSL, and monthly updates.",
          "price": "195",
          "priceCurrency": "USD",
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": "195",
            "priceCurrency": "USD",
            "unitCode": "MON",
            "unitText": "month",
            "billingDuration": {
              "@type": "QuantitativeValue",
              "value": 1,
              "unitCode": "MON"
            }
          },
          "eligibleRegion": {
            "@type": "Country",
            "name": "United States"
          },
          "availability": "https://schema.org/InStock",
          "seller": {
            "@id": "https://buildlocal.agency/#business"
          },
          "itemOffered": {
            "@type": "Service",
            "name": "Starter Website Plan",
            "description": "Professional website with hosting, SSL, and monthly updates."
          }
        },
        {
          "@type": "Offer",
          "name": "Growth Plan",
          "description": "Everything in Starter plus SEO, analytics, and priority support.",
          "price": "295",
          "priceCurrency": "USD",
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": "295",
            "priceCurrency": "USD",
            "unitCode": "MON",
            "unitText": "month",
            "billingDuration": {
              "@type": "QuantitativeValue",
              "value": 1,
              "unitCode": "MON"
            }
          },
          "eligibleRegion": {
            "@type": "Country",
            "name": "United States"
          },
          "availability": "https://schema.org/InStock",
          "seller": {
            "@id": "https://buildlocal.agency/#business"
          },
          "itemOffered": {
            "@type": "Service",
            "name": "Growth Website Plan",
            "description": "Everything in Starter plus SEO, analytics, and priority support."
          }
        },
        {
          "@type": "Offer",
          "name": "Premium Plan",
          "description": "Full-service website management with advanced SEO, Google Business Profile, and conversion optimization.",
          "price": "595",
          "priceCurrency": "USD",
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": "595",
            "priceCurrency": "USD",
            "unitCode": "MON",
            "unitText": "month",
            "billingDuration": {
              "@type": "QuantitativeValue",
              "value": 1,
              "unitCode": "MON"
            }
          },
          "eligibleRegion": {
            "@type": "Country",
            "name": "United States"
          },
          "availability": "https://schema.org/InStock",
          "seller": {
            "@id": "https://buildlocal.agency/#business"
          },
          "itemOffered": {
            "@type": "Service",
            "name": "Premium Website Plan",
            "description": "Full-service website management with advanced SEO, Google Business Profile, and conversion optimization."
          }
        }
      ]
    },

    {
      "@type": "FAQPage",
      "@id": "https://buildlocal.agency/pricing/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "{{faqs[0].question}}",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "{{faqs[0].answer}}"
          }
        },
        {
          "@type": "Question",
          "name": "{{faqs[1].question}}",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "{{faqs[1].answer}}"
          }
        }
      ]
    },

    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://buildlocal.agency"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Pricing",
          "item": "https://buildlocal.agency/pricing"
        }
      ]
    }
  ]
}
```

#### TypeScript Generator

```typescript
// src/lib/schema-pricing.ts

import { DomainConfig } from "@/content/config";

interface PricingSchemaParams {
  metaTitle: string;
  metaDescription: string;
  faqs: Array<{ question: string; answer: string }>;
  tiers: Array<{
    name: string;
    price: number;
    description: string;
    includes: string[];
  }>;
}

export function generatePricingSchema(
  config: DomainConfig,
  params: PricingSchemaParams
) {
  const domain = `https://${config.domain}`;
  const pageUrl = `${domain}/pricing`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      // WebPage
      {
        "@type": "WebPage",
        "@id": `${pageUrl}/#webpage`,
        url: pageUrl,
        name: params.metaTitle,
        description: params.metaDescription,
        isPartOf: { "@id": `${domain}/#website` },
        about: { "@id": `${domain}/#business` },
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: [".pricing-hero h1", ".pricing-hero p", "#faq"],
        },
      },

      // OfferCatalog
      {
        "@type": "OfferCatalog",
        "@id": `${pageUrl}/#offers`,
        name: `${config.brandName} Website Plans`,
        description:
          "Monthly website plans for small businesses. No setup fees, no contracts.",
        provider: { "@id": `${domain}/#business` },
        numberOfItems: params.tiers.length,
        itemListElement: params.tiers.map((tier) => ({
          "@type": "Offer",
          name: `${tier.name} Plan`,
          description: tier.description,
          price: String(tier.price),
          priceCurrency: "USD",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: String(tier.price),
            priceCurrency: "USD",
            unitCode: "MON",
            unitText: "month",
            billingDuration: {
              "@type": "QuantitativeValue",
              value: 1,
              unitCode: "MON",
            },
          },
          eligibleRegion: {
            "@type": "Country",
            name: "United States",
          },
          availability: "https://schema.org/InStock",
          seller: { "@id": `${domain}/#business` },
          itemOffered: {
            "@type": "Service",
            name: `${tier.name} Website Plan`,
            description: tier.description,
          },
        })),
      },

      // FAQPage
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}/#faq`,
        mainEntity: params.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },

      // BreadcrumbList
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: domain },
          {
            "@type": "ListItem",
            position: 2,
            name: "Pricing",
            item: pageUrl,
          },
        ],
      },
    ],
  };
}
```

---

## 4. Validation Checklist

### Tools for Validation

| Tool | URL | Use For |
|---|---|---|
| Google Rich Results Test | https://search.google.com/test/rich-results | Test if schema triggers rich results (FAQ, HowTo, BreadcrumbList) |
| Schema.org Validator | https://validator.schema.org/ | Full schema.org compliance check |
| Google Structured Data Testing Tool | https://developers.google.com/search/docs/appearance/structured-data | General structured data debugging |
| JSON-LD Playground | https://json-ld.org/playground/ | Validate JSON-LD syntax and expansion |

### How to Validate Each Template

1. **Build the page locally** (`npm run dev`)
2. **View page source** and copy the JSON-LD from the `<script type="application/ld+json">` tag
3. **Paste into Google Rich Results Test** -- check for errors and warnings
4. **Paste into Schema.org Validator** -- check for type mismatches or missing required properties
5. **Verify in Google Search Console** after deployment -- check the Enhancements reports for FAQ, Breadcrumbs, HowTo

### Common Validation Errors and Fixes

| Error | Cause | Fix |
|---|---|---|
| `"name" field is missing` | Schema node missing a `name` property | Every typed entity needs a `name` |
| `"item" field is missing in ListItem` | BreadcrumbList ListItem without `item` URL | Add `item` property with full URL to every ListItem except the last (current page) |
| `Single item in BreadcrumbList` | Homepage has a 1-item breadcrumb | Remove BreadcrumbList from homepage entirely |
| `AggregateRating without reviews` | Rating with no linked Review objects | Only use AggregateRating when backed by real reviews |
| `"mainEntity" is empty` | FAQPage with no questions | Ensure at least 2 FAQ questions per FAQPage |
| `URL mismatch` | Schema URL does not match canonical URL | Ensure `url` in schema matches `<link rel="canonical">` |
| `"@type": "City", "name": "USA"` | Incorrect geographic type | Use `Country` for national, `City` for city-level only |
| `Missing "image" in Article` | Article/BlogPosting without image | Always include `image` property for Article types |
| `priceSpecification without unitCode` | Price without billing period | Include `unitCode: "MON"` for monthly billing |

### Automated Validation for CI/CD

Add a build-time validation step that checks every generated schema:

```typescript
// scripts/validate-schema.ts

import Ajv from "ajv";

/**
 * Run during build or CI to catch schema issues before deployment.
 *
 * Usage: npx tsx scripts/validate-schema.ts
 */

function validateSchema(schema: object, pagePath: string): string[] {
  const errors: string[] = [];

  // 1. Must have @context
  if (!("@context" in schema)) {
    errors.push(`${pagePath}: Missing @context`);
  }

  // 2. Must have @graph or @type at root
  if (!("@graph" in schema) && !("@type" in schema)) {
    errors.push(`${pagePath}: Missing @graph or @type`);
  }

  // 3. Check each @graph node
  const graph = (schema as any)["@graph"] || [schema];
  for (const node of graph) {
    // Every node should have @type
    if (!node["@type"]) {
      errors.push(`${pagePath}: Node missing @type`);
    }

    // BreadcrumbList must have 2+ items
    if (node["@type"] === "BreadcrumbList") {
      const items = node.itemListElement || [];
      if (items.length < 2) {
        errors.push(
          `${pagePath}: BreadcrumbList has ${items.length} items (need 2+)`
        );
      }
    }

    // FAQPage must have 2+ questions
    if (node["@type"] === "FAQPage") {
      const questions = node.mainEntity || [];
      if (questions.length < 2) {
        errors.push(
          `${pagePath}: FAQPage has ${questions.length} questions (need 2+)`
        );
      }
    }

    // Check for fake ratings
    if (node["@type"] === "AggregateRating") {
      errors.push(
        `${pagePath}: AggregateRating found -- ensure this uses real review data`
      );
    }

    // areaServed should not have City type with country name
    if (node.areaServed) {
      const areas = Array.isArray(node.areaServed)
        ? node.areaServed
        : [node.areaServed];
      for (const area of areas) {
        if (
          area["@type"] === "City" &&
          ["USA", "United States", "US"].includes(area.name)
        ) {
          errors.push(
            `${pagePath}: areaServed has City type with country name "${area.name}"`
          );
        }
      }
    }
  }

  return errors;
}

// Export for use in build pipeline
export { validateSchema };
```

Add to `package.json`:

```json
{
  "scripts": {
    "validate:schema": "npx tsx scripts/validate-schema.ts"
  }
}
```

---

## 5. Implementation Notes

### File Naming Convention

| File | Page Type | Status |
|---|---|---|
| `src/lib/schema.ts` | Homepage | Existing -- needs fixes (Section 2) |
| `src/lib/schema-industry.ts` | Industry Hub (`/industries/[trade]`) | Existing -- extend with ItemList |
| `src/lib/schema-service.ts` | Service (`/services/[slug]`) | Existing -- no changes needed |
| `src/lib/schema-blog.ts` | Blog Post + Blog Index | Existing -- no changes needed |
| `src/lib/schema-industry-city.ts` | Industry+City (`/industries/[trade]/[city]`) | **NEW** |
| `src/lib/schema-city.ts` | City Hub (`/locations/[city]`) | **NEW** |
| `src/lib/schema-comparison.ts` | Comparison (`/compare/[slug]`) | **NEW** |
| `src/lib/schema-case-study.ts` | Case Study (`/case-studies/[slug]`) | **NEW** |
| `src/lib/schema-tool.ts` | Tool/Resource (`/tools/[slug]`) | **NEW** |
| `src/lib/schema-pricing.ts` | Pricing (`/pricing`) | **NEW** |

### TypeScript Interfaces Summary

All param interfaces are defined above per template. Here is a consolidated reference:

```typescript
// src/lib/schema-types.ts -- shared types for all schema generators

export interface SchemaFAQ {
  question: string;
  answer: string;
}

export interface SchemaProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface SchemaCityRef {
  cityName: string;
  citySlug: string;
}

export interface SchemaIndustryRef {
  trade: string;
  tradeSlug: string;
}

export interface SchemaCompetitor {
  name: string;
  description: string;
  url?: string;
}

export interface SchemaPricingTier {
  name: string;
  price: number;
  description: string;
  includes: string[];
}
```

### Handling City-Specific Data

City coordinates, state codes, and names should be stored in a dedicated data file:

```typescript
// src/content/cities.ts

export interface CityData {
  name: string;
  slug: string;
  state: string;
  stateCode: string;
  latitude: number;
  longitude: number;
  population?: number;
}

export const cities: CityData[] = [
  { name: "Phoenix", slug: "phoenix", state: "Arizona", stateCode: "AZ", latitude: 33.4484, longitude: -112.0740, population: 1608139 },
  { name: "Scottsdale", slug: "scottsdale", state: "Arizona", stateCode: "AZ", latitude: 33.4942, longitude: -111.9261, population: 241361 },
  { name: "Mesa", slug: "mesa", state: "Arizona", stateCode: "AZ", latitude: 33.4152, longitude: -111.8315, population: 504258 },
  { name: "Tempe", slug: "tempe", state: "Arizona", stateCode: "AZ", latitude: 33.4255, longitude: -111.9400, population: 180587 },
  { name: "Chandler", slug: "chandler", state: "Arizona", stateCode: "AZ", latitude: 33.3062, longitude: -111.8413, population: 275987 },
  { name: "Gilbert", slug: "gilbert", state: "Arizona", stateCode: "AZ", latitude: 33.3528, longitude: -111.7890, population: 267918 },
  { name: "Glendale", slug: "glendale", state: "Arizona", stateCode: "AZ", latitude: 33.5387, longitude: -112.1860, population: 248325 },
  { name: "Peoria", slug: "peoria", state: "Arizona", stateCode: "AZ", latitude: 33.5806, longitude: -112.2374, population: 190985 },
  { name: "Surprise", slug: "surprise", state: "Arizona", stateCode: "AZ", latitude: 33.6292, longitude: -112.3680, population: 141664 },
  { name: "Tucson", slug: "tucson", state: "Arizona", stateCode: "AZ", latitude: 32.2226, longitude: -110.9747, population: 542629 },
  { name: "Goodyear", slug: "goodyear", state: "Arizona", stateCode: "AZ", latitude: 33.4353, longitude: -112.3585, population: 95294 },
  { name: "Buckeye", slug: "buckeye", state: "Arizona", stateCode: "AZ", latitude: 33.3703, longitude: -112.5838, population: 91502 },
  { name: "Avondale", slug: "avondale", state: "Arizona", stateCode: "AZ", latitude: 33.4356, longitude: -112.3496, population: 89867 },
  { name: "Casa Grande", slug: "casa-grande", state: "Arizona", stateCode: "AZ", latitude: 32.8795, longitude: -111.7574, population: 57278 },
  { name: "Queen Creek", slug: "queen-creek", state: "Arizona", stateCode: "AZ", latitude: 33.2487, longitude: -111.6343, population: 65832 },
  { name: "Maricopa", slug: "maricopa", state: "Arizona", stateCode: "AZ", latitude: 33.0581, longitude: -112.0476, population: 58782 },
  { name: "Flagstaff", slug: "flagstaff", state: "Arizona", stateCode: "AZ", latitude: 35.1983, longitude: -111.6513, population: 73964 },
];
```

### Avoiding Redundant Organization/LocalBusiness Definitions

**Rule:** Only the homepage schema (`schema.ts`) defines the full `LocalBusiness` + `ProfessionalService` entity with `@id: ".../#business"`. All other pages reference it via `@id`:

```typescript
// CORRECT -- reference the canonical business node
provider: { "@id": `${domain}/#business` },
parentOrganization: { "@id": `${domain}/#business` },
author: { "@id": `${domain}/#business` },

// INCORRECT -- redefining the full Organization on every page
provider: {
  "@type": ["LocalBusiness", "ProfessionalService"],
  "@id": `${domain}/#business`,
  name: "BuildLocal",
  url: domain,
  telephone: "+17782374700",
  email: "hello@buildlocal.agency",
},
```

**Exception:** City-specific pages (`/locations/[city]` and `/industries/[trade]/[city]`) define their OWN `LocalBusiness` node with a different `@id` (e.g., `.../#localbusiness`) and use `parentOrganization` to link back to the homepage's canonical node. This is intentional -- it gives Google city-specific business signals while maintaining the hierarchy.

**Note on existing schema-industry.ts and schema-service.ts:** These files currently inline `provider` with full Organization details. Update them to use `@id` references only:

```typescript
// BEFORE (schema-industry.ts line 25-30)
provider: {
  "@type": ["LocalBusiness", "ProfessionalService"],
  "@id": `${domain}/#business`,
  name: `${config.brandName} — ${region}`,
  url: domain,
  ...(config.telephone && { telephone: config.telephone }),
  ...(config.email && { email: config.email }),
},

// AFTER
provider: { "@id": `${domain}/#business` },
```

Apply the same fix to `schema-service.ts`.

---

## 6. SpeakableSpecification Selectors

SpeakableSpecification tells voice assistants (Google Assistant, Alexa) which parts of the page to read aloud. Each CSS selector should target concise, self-contained content.

### Selectors by Page Type

| Page Type | CSS Selectors | Rationale |
|---|---|---|
| **Homepage** | `#hero h1`, `#hero p`, `#why-buildlocal h2`, `#faq` | Hero text is the primary answer; FAQ covers common queries |
| **Industry Hub** | `.industry-hero h1`, `.industry-hero p`, `#why-website h2`, `#faq` | Trade-specific hero + why section for AEO |
| **Industry+City** | `.hero h1`, `.hero p`, `.city-stats`, `#faq` | City stats provide local context for voice answers |
| **City Hub** | `.hero h1`, `.hero p`, `.city-overview`, `#faq` | City overview summarizes local services |
| **Service** | `.service-hero h1`, `.service-hero p`, `#faq` | Service description + FAQ for voice queries |
| **Blog Post** | `.article-title`, `.article-intro` | Title and intro paragraph for article summaries |
| **Blog Index** | `.blog-hero h1`, `.blog-hero p` | Index description |
| **Comparison** | `.comparison-table`, `.hero h1`, `#faq` | Comparison data is the primary answer engine content |
| **Case Study** | `.case-study-title`, `.case-study-intro`, `.results-summary` | Results are the key voice-answer content |
| **Tool** | `.tool-title`, `.tool-description`, `#faq` | Tool description + FAQ for "how to use" queries |
| **Pricing** | `.pricing-hero h1`, `.pricing-hero p`, `#faq` | Pricing summary + FAQ for cost queries |

### Implementation Pattern

Every `WebPage` node in the schema should include:

```typescript
speakable: {
  "@type": "SpeakableSpecification",
  cssSelector: [/* selectors from table above */],
},
```

### Guidelines for Speakable Content

1. **Keep selectors targeting short content** -- voice assistants read 2-3 sentences max
2. **Avoid selectors that target entire sections** with hundreds of words
3. **Prefer heading + first paragraph** patterns over full section selectors
4. **FAQ sections** are ideal speakable targets -- they match voice query patterns directly
5. **Test with actual CSS selectors** -- make sure the selectors match elements that exist in the DOM

---

## Appendix: Quick Reference

### Business Constants (hardcode in all schemas)

```
brandName:   "BuildLocal"
domain:      "buildlocal.agency"
telephone:   "+17782374700"
email:       "hello@buildlocal.agency"
priceRange:  "$195 - $595/mo"
foundingDate: "2024"
logoUrl:     "https://buildlocal.agency/logo.png"
```

### Implementation Priority

1. **Fix existing schema bugs** (Section 2) -- immediate, affects current pages
2. **Template A: Industry+City** -- highest priority, 255 pages
3. **Template G: Enhanced Homepage** -- homepage is the canonical node everything references
4. **Template B: Industry Hub** -- extend existing schema-industry.ts
5. **Template C: City Hub** -- 17 new pages
6. **Template H: Pricing** -- standalone page
7. **Template D: Comparison** -- ~10 pages
8. **Template E: Case Study** -- as case studies are written
9. **Template F: Tool** -- as tools are built
