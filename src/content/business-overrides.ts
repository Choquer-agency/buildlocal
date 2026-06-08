import { BusinessProfile } from "./businesses";

/**
 * Hand-edited touch-ups, applied ON TOP of the auto-generated data and never
 * overwritten by the pipeline. This is where per-business edits live:
 * logo, swapped photos, font, and copy tweaks. (Brand COLOR is set separately
 * via the CRM color control → stored in Convex.)
 *
 * Deep-merged: `generatedCopy` and `address` merge field-by-field; arrays
 * (photos, services) replace wholesale when provided.
 *
 * Key = business slug. Example:
 *   "acme-landscaping": {
 *     logo: "/biz-photos/acme-landscaping/logo.webp",
 *     fontKey: "serif",
 *     photos: ["/biz-photos/acme-landscaping/1.webp", "/biz-photos/acme-landscaping/2.webp"],
 *     generatedCopy: { heroH1: "Scottsdale's Premier Desert Landscapers" },
 *   },
 */
import assetOverrides from "./asset-overrides.json";

export type BusinessOverride = Partial<Omit<BusinessProfile, "generatedCopy" | "address">> & {
  generatedCopy?: Partial<BusinessProfile["generatedCopy"]>;
  address?: Partial<BusinessProfile["address"]>;
};

/**
 * MANUAL touch-ups (copy, font, services, name). Edit this object by hand.
 * Image/logo paths are managed automatically in asset-overrides.json by
 * scripts/process-assets.mjs — both are merged below (manual wins on conflict).
 */
const manual: Record<string, BusinessOverride> = {
  "diamond-cut-landscaping": {
    heroVideo: "/biz-photos/diamond-cut-landscaping/hero.mp4", // from diamondcutaz.com/services hero
  },
  "divine-design-landscaping": {
    fontKey: "elegant",
    heroVideo: "/biz-photos/divine-design-landscaping/hero.mp4",
  },
  "ams-landscaping": {
    bgOverride: "#F6F4EF", // cream — their secondary (blue) read too strong as a section bg; kept as accent only
  },
  // Services re-checked against dssggogreen.com/service/ — extract-services had pulled
  // default-catalog filler blurbs; these names + blurbs are their real site wording.
  "diamond-stone-and-synthetic-grass": {
    chromeDark: true, // their logo is white → black nav + black footer so it stays visible
    services: [
      { name: "Synthetic Grass", slug: "synthetic-grass", blurb: "High-quality synthetic grass with a natural look and soft feel — ideal for backyards, play areas, pet-friendly spaces, and commercial properties." },
      { name: "Concrete Pavers", slug: "concrete-pavers", blurb: "Elegant, durable concrete pavers that enhance any outdoor space with style and strength." },
      { name: "Travertine & Porcelain Tile", slug: "travertine-porcelain-tile", blurb: "Premium travertine and porcelain tile for patios, walkways, and pool decks — timeless beauty built to last." },
      { name: "Outdoor Kitchens", slug: "outdoor-kitchens", blurb: "Custom outdoor kitchens that turn your backyard into a chef's paradise — perfect for entertaining in Arizona's weather." },
      { name: "Alumawood Pergolas", slug: "alumawood-pergolas", blurb: "Durable, low-maintenance Alumawood pergolas with the classic look of wood, the resilience of aluminum, and welcome shade." },
      { name: "Landscape Lighting", slug: "landscape-lighting", blurb: "Illuminate your outdoors with stunning landscape lighting that enhances safety, ambiance, and curb appeal." },
      // extra entries below feed the scrolling marquee (cards show the first 6)
      { name: "Putting Greens", slug: "putting-greens", blurb: "Custom putting greens for golf lovers — a fun, low-maintenance feature that adds value and play to any yard." },
      { name: "Decorative Rock", slug: "decorative-rock", blurb: "High-quality decorative rock for xeriscaping, pathways, and garden accents — low-maintenance and eco-friendly." },
      { name: "Irrigation Install & Repair", slug: "irrigation", blurb: "Professionally installed and repaired irrigation systems that keep your landscape green while conserving water." },
      { name: "Turf Cleaning", slug: "turf-cleaning", blurb: "Professional turf cleaning and subscription maintenance to keep your artificial grass clean, odor-free, and like new." },
    ],
  },
};

const assets = assetOverrides as Record<string, BusinessOverride>;

export const overrides: Record<string, BusinessOverride> = (() => {
  const out: Record<string, BusinessOverride> = {};
  for (const slug of Array.from(new Set([...Object.keys(assets), ...Object.keys(manual)]))) {
    out[slug] = {
      ...assets[slug],
      ...manual[slug],
      generatedCopy: { ...assets[slug]?.generatedCopy, ...manual[slug]?.generatedCopy },
      address: { ...assets[slug]?.address, ...manual[slug]?.address },
    };
  }
  return out;
})();
