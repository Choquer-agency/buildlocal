/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * BusinessProfile — the normalized shape one scraped Google Business Profile
 * becomes. The site engine (`/p/[business]`) renders a full multi-page site
 * purely from this data, so there are ZERO AI tokens spent at build/render time.
 *
 * Pipeline order (see plan):
 *   1. scripts/scrape-gmb.ts        → raw GMB fields
 *   2. scripts/crawl-existing-sites → enrich businesses that already have a site
 *   3. scripts/generate-copy.ts     → fills `generatedCopy` + assigns `themeId`/`variant`
 *
 * The seed business below ("Sonoran Roots Landscaping") is hand-authored so Bryce
 * can review the template framework (Gate B) before we scrape + scale to 500.
 * It is representative of what one real AZ landscaping record will contain.
 */

export interface BusinessReview {
  author: string;
  rating: number; // 1–5
  text: string;
  relativeTime?: string; // e.g. "2 months ago"
}

export interface BusinessService {
  name: string;
  slug: string;
  /** One-line summary shown on cards (from generatedCopy in the real pipeline). */
  blurb: string;
  /** Optional longer body for the service detail page. */
  body?: string;
  /** Optional service-specific image. At scale, cards fall back to the photo pool. */
  image?: string;
}

/**
 * Optional grouped Services nav menu. When a business defines `serviceMenu`, the
 * nav dropdown renders these (with nested sub-menus for items that have
 * `children`) instead of the flat `services` list. Used to mirror a business's
 * real site IA (e.g. Hardscapes ▸ / Softscapes ▸). Slugs must exist in `services`.
 */
export interface ServiceMenuItem {
  label: string;
  /** Links to /services/<slug>. Omit on a pure header that only has children. */
  slug?: string;
  /** Sub-services shown in a flyout panel. */
  children?: ServiceMenuItem[];
}

export interface BusinessHours {
  day: string; // "Monday"
  hours: string; // "7:00 AM – 5:00 PM" or "Closed"
}

/** Per-business AI-written copy — generated ONCE in the pipeline, then static. */
export interface GeneratedCopy {
  heroH1: string;
  heroSubhead: string;
  aboutHeading: string;
  aboutBody: string[]; // paragraphs
  serviceAreaBlurb: string;
  ctaHeadline: string;
  ctaSubhead: string;
  metaTitle: string;
  metaDescription: string;
}

export interface BusinessProfile {
  /** URL slug — the path segment in /p/[business]. */
  slug: string;

  // ── Identity (from GMB) ──
  name: string;
  primaryCategory: string;
  categories: string[];

  // ── Contact ──
  phone: string; // display, e.g. "(480) 555-0147"
  email?: string;

  // ── Location ──
  address: {
    street?: string;
    locality: string; // "Gilbert"
    region: string; // "AZ"
    postalCode?: string;
  };
  lat: number;
  lng: number;
  serviceAreas: string[]; // nearby cities served

  // ── Trust signals (from GMB) ──
  rating: number;
  reviewCount: number;
  reviews: BusinessReview[];
  yearsInBusiness?: number;

  // ── Offerings ──
  services: BusinessService[];
  /** Optional grouped nav menu (sub-services). Falls back to flat `services`. */
  serviceMenu?: ServiceMenuItem[];

  // ── Hours ──
  hours: BusinessHours[];

  // ── Media ──
  photos: string[]; // GMB photo URLs (use placeholders until scraped)
  logoText?: string; // short brand mark if no logo image
  logoWordmark?: string; // nav-only text beside the pill when there's no logo image (defaults to `name`); use to show a brand line without changing body copy
  logo?: string; // logo image path (set during touch-ups → /biz-photos/<slug>/logo.webp)
  logoBlend?: string; // optional CSS mix-blend-mode for the logo (e.g. "darken" to drop a white bg)
  logoScale?: number; // optional nav-logo size multiplier (1 = default; e.g. 0.8 shrinks a wide wordmark)
  logoBadge?: boolean; // when false, hide the colored letter-badge and show wordmark text only (no logo image)
  fontKey?: string; // optional font override key (see src/lib/biz-fonts.ts)
  brandColor?: string; // primary brand color (hex) from their real branding
  brandColor2?: string; // secondary brand color (hex)
  heroVideo?: string; // optional hero background video URL/path
  bgOverride?: string; // optional neutral hex to replace secondary-tinted section bgs (softBg/heroBg)
  iconChipBg?: string; // optional hex to override the icon-chip tile background (defaults to softBg)
  iconChipFg?: string; // optional hex for the icon color on the chip (defaults to onColor(iconChipBg) → accent)
  ctaBg?: string; // optional hex to color the primary CTA buttons independently of the accent (defaults to accent)
  ctaFg?: string; // optional hex for the CTA button text/icon on ctaBg (defaults to onColor(ctaBg) → onAccent)
  chromeDark?: boolean; // dark (near-black) nav + footer so a WHITE logo stays visible
  navBg?: string; // optional hex to paint the nav pill a brand color (white text + contrasting CTA) — use for logos with BOTH white and dark parts that need a colored backdrop
  showAllServices?: boolean; // render every service as a card instead of the default 6-card teaser grid
  hideServicesNav?: boolean; // hide the Services dropdown in the nav (for portfolio firms with no services menu)

  // ── Source ──
  existingWebsite?: string; // if they already had one (crawled for extra data)
  placeId?: string;
  owner?: string; // GMB owner/profile title
  ownerLink?: string; // Google Maps contributor link
  googleMapsUrl?: string; // listing on Google Maps
  reviewsLink?: string; // Google reviews link
  photosCount?: number; // # of photos on the GMB listing
  verified?: boolean; // Google-verified listing

  // ── Trade pillar (set by pipeline; absent → "landscaping" for back-compat) ──
  trade?: "landscaping" | "roofing" | "hvac" | "pool" | "pest";

  // ── Presentation (assigned by pipeline) ──
  themeId: number; // index into THEMES
  variant: number; // hero/section layout variant (0–1)

  // ── Generated copy (pipeline) ──
  generatedCopy: GeneratedCopy;

  // ── Campaign tracking ──
  qrCode?: string; // short code the postcard QR encodes → /q/[code]
}

/* ──────────────────────────────────────────────────────────────────────────
   SEED BUSINESS (Gate B template proof) — replace with scraped data at scale.
   ────────────────────────────────────────────────────────────────────────── */

const sonoranRoots: BusinessProfile = {
  slug: "sonoran-roots-landscaping",
  name: "Sonoran Roots Landscaping",
  primaryCategory: "Landscaper",
  categories: ["Landscaper", "Lawn care service", "Landscape designer", "Irrigation equipment supplier"],

  phone: "(480) 555-0147",
  email: "hello@sonoranroots.com",

  address: {
    street: "1240 E Williams Field Rd",
    locality: "Gilbert",
    region: "AZ",
    postalCode: "85295",
  },
  lat: 33.3062,
  lng: -111.7421,
  serviceAreas: ["Gilbert", "Chandler", "Mesa", "Queen Creek", "Tempe", "San Tan Valley"],

  rating: 4.9,
  reviewCount: 127,
  yearsInBusiness: 12,
  reviews: [
    {
      author: "Marcus D.",
      rating: 5,
      text: "Sonoran Roots completely transformed our backyard with desert-friendly landscaping and a new paver patio. The crew was on time every day and the water bill dropped noticeably after they redid our irrigation. Couldn't be happier.",
      relativeTime: "3 weeks ago",
    },
    {
      author: "Jennifer A.",
      rating: 5,
      text: "We've used them for monthly maintenance for two years now. Always professional, always thorough. Our HOA constantly compliments the yard. Highly recommend for anyone in Gilbert.",
      relativeTime: "2 months ago",
    },
    {
      author: "Ray P.",
      rating: 5,
      text: "Had artificial turf installed for the dogs and it looks incredible — no more mud, no more dead grass in the AZ heat. Fair quote, no surprises, finished ahead of schedule.",
      relativeTime: "1 month ago",
    },
    {
      author: "Sandra L.",
      rating: 5,
      text: "Their design team listened to exactly what we wanted and came back with a plan that fit our budget. The xeriscape they put in is gorgeous and barely needs any water. Best contractor experience we've had.",
      relativeTime: "5 months ago",
    },
  ],

  services: [
    {
      name: "Landscape Design & Installation",
      slug: "landscape-design",
      blurb: "Custom desert landscape design and full installation built for the Arizona climate.",
      body: "From the first sketch to the final plant, we design and install outdoor spaces that thrive in the Sonoran Desert. Our team handles grading, plant selection, hardscape, and lighting so your yard looks intentional and stays beautiful year-round with minimal water.",
      image: "/demo/gardenbench.jpg",
    },
    {
      name: "Xeriscaping & Desert Landscaping",
      slug: "xeriscaping",
      blurb: "Water-wise xeriscape designs that cut your water bill and survive the heat.",
      body: "Xeriscaping is the smartest investment a Gilbert homeowner can make. We use native and drought-tolerant plants, decorative rock, and efficient drip irrigation to create a low-maintenance yard that looks great and slashes your monthly water costs.",
      image: "/demo/cactus.jpg",
    },
    {
      name: "Artificial Turf Installation",
      slug: "artificial-turf",
      blurb: "Pet- and kid-friendly synthetic turf that stays green through every AZ summer.",
      body: "No watering, no mowing, no mud. Our premium artificial turf gives you a perfect lawn 365 days a year — ideal for pets, play areas, and putting greens. We prep the base properly so it drains well and lasts for years.",
      image: "/demo/grass.jpg",
    },
    {
      name: "Paver Patios & Hardscaping",
      slug: "hardscaping",
      blurb: "Paver patios, walkways, retaining walls, and outdoor living spaces.",
      body: "Extend your living space outdoors with custom paver patios, walkways, seating walls, and fire features. We build hardscapes that handle the heat and tie your whole yard together.",
      image: "/demo/walkway.jpg",
    },
    {
      name: "Irrigation & Drip Systems",
      slug: "irrigation",
      blurb: "Smart irrigation install and repair to keep plants healthy and bills low.",
      body: "A properly tuned irrigation system is the difference between a thriving yard and a water bill nightmare. We install, repair, and optimize drip and sprinkler systems with smart controllers that water only when needed.",
      image: "/demo/sprinkler.jpg",
    },
    {
      name: "Lawn & Yard Maintenance",
      slug: "maintenance",
      blurb: "Reliable weekly and monthly maintenance to keep your property pristine.",
      body: "Set it and forget it. Our maintenance crews handle trimming, weeding, blowing, and seasonal cleanups on a schedule that fits your property — so it always looks its best without you lifting a finger.",
      image: "/demo/lawn.jpg",
    },
  ],

  hours: [
    { day: "Monday", hours: "7:00 AM – 5:00 PM" },
    { day: "Tuesday", hours: "7:00 AM – 5:00 PM" },
    { day: "Wednesday", hours: "7:00 AM – 5:00 PM" },
    { day: "Thursday", hours: "7:00 AM – 5:00 PM" },
    { day: "Friday", hours: "7:00 AM – 5:00 PM" },
    { day: "Saturday", hours: "8:00 AM – 1:00 PM" },
    { day: "Sunday", hours: "Closed" },
  ],

  // GMB scraper fills this with the business's real photos (typically 5–20).
  // The site distributes them across hero, service cards, gallery, about, and CTA.
  // (Demo uses keyword-stable loremflickr placeholders so every slot is on-topic.)
  photos: [
    "/demo/hero.jpg",
    "/demo/flowers.jpg",
    "/demo/walkway.jpg",
    "/demo/cactus.jpg",
    "/demo/paverpath.jpg",
    "/demo/agave.jpg",
    "/demo/grass.jpg",
    "/demo/gardenbench.jpg",
    "/demo/lawn.jpg",
  ],
  logoText: "SR",

  existingWebsite: undefined,
  placeId: "SEED-PLACE-ID",

  themeId: 1, // "Verde" — see src/lib/themes.ts
  variant: 0,

  generatedCopy: {
    heroH1: "Gilbert's Trusted Desert Landscaping Experts",
    heroSubhead:
      "Sonoran Roots Landscaping designs, installs, and maintains beautiful, water-wise outdoor spaces built for the Arizona climate — backed by 127 five-star reviews from your neighbors.",
    aboutHeading: "Locally owned, desert-grown, and trusted across the East Valley",
    aboutBody: [
      "For over 12 years, Sonoran Roots Landscaping has helped Gilbert, Chandler, and Mesa homeowners turn ordinary yards into outdoor spaces they actually want to spend time in. We specialize in the kind of low-water, high-impact landscaping that thrives in the Sonoran Desert.",
      "Every project starts with listening. We learn how you want to use your space, what your budget is, and what kind of maintenance you're willing to do — then we design something that fits. No upsells, no surprises, just honest work from a crew that shows up when they say they will.",
      "From full xeriscape transformations to weekly maintenance that keeps your HOA happy, we treat every property like it's our own.",
    ],
    serviceAreaBlurb:
      "Proudly serving Gilbert and the surrounding East Valley with desert landscaping, xeriscaping, artificial turf, and full-service yard maintenance.",
    ctaHeadline: "Ready for a yard you'll love coming home to?",
    ctaSubhead:
      "Get a free, no-pressure quote. We'll walk your property, listen to what you want, and give you an honest estimate.",
    metaTitle: "Sonoran Roots Landscaping | Desert Landscaping in Gilbert, AZ",
    metaDescription:
      "Award-winning desert landscaping, xeriscaping, and artificial turf in Gilbert, AZ. 4.9★ from 127 reviews. Free quotes. Serving the East Valley for 12+ years.",
  },

  qrCode: "sr01",
};

/* ── Registry ── */

import { generatedBusinesses } from "./businesses.generated";
import { generated_roofing } from "./businesses.roofing.generated";
import { generated_hvac } from "./businesses.hvac.generated";
import { generated_pool } from "./businesses.pool.generated";
import { generated_pest } from "./businesses.pest.generated";
import { overrides, BusinessOverride } from "./business-overrides";

/**
 * Active campaign = the top 100 of each of the 5 pillars (500 total). The
 * original landscaping scrape has 500 records; only the first 100 are "in play",
 * so the remaining 400 are moved BELOW the five-pillar set (kept, not deleted, as
 * overflow). Order: landscaping 1–100 → roofing → hvac → pool → pest → ls 101–500.
 */
const PER_PILLAR = 100;
const landscapingTop = generatedBusinesses.slice(0, PER_PILLAR);
const landscapingOverflow = generatedBusinesses.slice(PER_PILLAR);

const allGenerated: BusinessProfile[] = [
  ...landscapingTop,
  ...generated_roofing,
  ...generated_hvac,
  ...generated_pool,
  ...generated_pest,
  ...landscapingOverflow,
];

/** Apply a hand-edited override on top of generated data (deep-merge nested). */
function applyOverride(b: BusinessProfile, ov?: BusinessOverride): BusinessProfile {
  if (!ov) return b;
  return {
    ...b,
    ...ov,
    address: ov.address ? { ...b.address, ...ov.address } : b.address,
    generatedCopy: ov.generatedCopy ? { ...b.generatedCopy, ...ov.generatedCopy } : b.generatedCopy,
  };
}

export const businessMap: Record<string, BusinessProfile> = {
  [sonoranRoots.slug]: applyOverride(sonoranRoots, overrides[sonoranRoots.slug]),
  ...Object.fromEntries(
    allGenerated.map((b) => [b.slug, applyOverride(b, overrides[b.slug])])
  ),
};

export function getAllBusinessSlugs(): string[] {
  return Object.keys(businessMap);
}

export function getBusinessConfig(slug: string): BusinessProfile | undefined {
  return businessMap[slug];
}

/** Resolve a business by its QR short code (used by /q/[code]). */
export function getBusinessByQrCode(code: string): BusinessProfile | undefined {
  return Object.values(businessMap).find((b) => b.qrCode === code);
}
