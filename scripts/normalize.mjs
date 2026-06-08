// Normalize raw Outscraper records → src/content/businesses[.<niche>].generated.ts
//
//   node scripts/normalize.mjs                  (landscaping → businesses.generated.ts)
//   node scripts/normalize.mjs --niche=roofing  (→ businesses.roofing.generated.ts, qr ro0001+)
//
// Reads scripts/data/raw-<niche>.json, emits typed BusinessProfile[].
// The per-trade catalog + copy come from scripts/niches.mjs (used only as a
// FALLBACK for no-website businesses; sites get real services via
// extract-services.mjs). Copy is upgraded to unique AI text by generate-copy.mjs.
import fs from "node:fs";
import path from "node:path";
import { getNiche, nicheArg } from "./niches.mjs";

const niche = getNiche(nicheArg(process.argv));
const RAW = path.join(process.cwd(), niche.key === "landscaping" ? "scripts/data/raw-businesses.json" : `scripts/data/raw-${niche.key}.json`);
const OUT = path.join(process.cwd(), niche.key === "landscaping" ? "src/content/businesses.generated.ts" : `src/content/businesses.${niche.key}.generated.ts`);
const EXPORT_NAME = niche.key === "landscaping" ? "generatedBusinesses" : `generated_${niche.key}`;

/* ── theme assignment (mirror src/lib/themes.ts assignTheme) ── */
const THEME_COUNT = 6;
function assignTheme(seed) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return { themeId: h % THEME_COUNT, variant: (h >>> 8) % 2 };
}

/* ── helpers ── */
function slugify(s) {
  return s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60);
}
function fmtPhone(p) {
  if (!p) return "";
  const d = p.replace(/[^\d]/g, "").replace(/^1/, "");
  return d.length === 10 ? `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}` : p;
}
function relTime(s) {
  // "MM/DD/YYYY HH:MM:SS" → "x months/weeks/days ago"
  const m = s && s.match(/(\d{2})\/(\d{2})\/(\d{4})/);
  if (!m) return undefined;
  const then = new Date(+m[3], +m[1] - 1, +m[2]);
  const days = Math.max(0, Math.floor((Date.now() - then.getTime()) / 86400000));
  if (days < 14) return `${days || 1} day${days === 1 ? "" : "s"} ago`;
  if (days < 60) return `${Math.round(days / 7)} weeks ago`;
  if (days < 365) return `${Math.round(days / 30)} months ago`;
  const y = Math.round(days / 365);
  return `${y} year${y === 1 ? "" : "s"} ago`;
}
function parseHours(wh) {
  const order = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  if (!wh || typeof wh !== "object") return order.map((d) => ({ day: d, hours: "By appointment" }));
  return order.map((d) => {
    let h = wh[d] || "Closed";
    h = String(h).replace(/ | /g, " ").replace(/\s*-\s*/g, " – ").replace(/(\d)(AM|PM)/g, "$1 $2");
    return { day: d, hours: h };
  });
}

/* ── AZ neighbor map for service areas ── */
const NEIGHBORS = {
  Gilbert: ["Chandler", "Mesa", "Queen Creek", "Tempe", "San Tan Valley"],
  Chandler: ["Gilbert", "Tempe", "Mesa", "Ahwatukee", "Sun Lakes"],
  Mesa: ["Gilbert", "Tempe", "Chandler", "Apache Junction", "Scottsdale"],
  Tempe: ["Mesa", "Chandler", "Phoenix", "Gilbert", "Scottsdale"],
  Phoenix: ["Scottsdale", "Glendale", "Tempe", "Peoria", "Paradise Valley"],
  Scottsdale: ["Phoenix", "Tempe", "Mesa", "Paradise Valley", "Fountain Hills"],
  Glendale: ["Peoria", "Phoenix", "Surprise", "Avondale", "Tolleson"],
  Peoria: ["Glendale", "Surprise", "Phoenix", "Sun City"],
  Surprise: ["Peoria", "Glendale", "El Mirage", "Sun City West"],
  Goodyear: ["Avondale", "Buckeye", "Litchfield Park", "Phoenix"],
  Avondale: ["Goodyear", "Glendale", "Tolleson", "Phoenix"],
  "Queen Creek": ["Gilbert", "San Tan Valley", "Mesa", "Chandler"],
  Buckeye: ["Goodyear", "Avondale", "Litchfield Park"],
  Maricopa: ["Chandler", "Casa Grande", "Gilbert"],
  "San Tan Valley": ["Queen Creek", "Gilbert", "Mesa", "Florence"],
  "Apache Junction": ["Mesa", "Gold Canyon", "Queen Creek"],
  "Casa Grande": ["Maricopa", "Coolidge", "Eloy"],
};

/* ── service catalog + copy come from the niche config (fallback only) ── */
const CATALOG = niche.catalog;
const STOCK_POOL = niche.stockPool || [];

function pickServices(subtypes) {
  // Show the full fallback catalog so every no-website site feels complete;
  // subtype matches are surfaced first. (Sites get REAL services from
  // extract-services.mjs; this is only the no-site fallback.)
  const s = (subtypes || "").toLowerCase();
  const matched = CATALOG.filter((c) => c.match.some((m) => s.includes(m)));
  const rest = CATALOG.filter((c) => !matched.includes(c));
  return [...matched, ...rest].map((c) => ({
    name: c.name, slug: c.slug, blurb: c.blurb, ...(c.image ? { image: c.image } : {}),
  }));
}

function buildPhotos(realPhoto, seedHash) {
  // hero/primary = real GMB photo; rotate stock pool for the rest so galleries
  // vary. Non-landscaping niches have no stock pool → real photo only (service
  // cards fall back to the business's own photos in the component).
  const out = [];
  if (realPhoto) out.push(realPhoto);
  if (STOCK_POOL.length) {
    const rotated = [...STOCK_POOL.slice(seedHash % STOCK_POOL.length), ...STOCK_POOL.slice(0, seedHash % STOCK_POOL.length)];
    for (const p of rotated) { if (out.length >= 9) break; out.push(p); }
  }
  return out;
}

function defaultCopy(name, city, rating, reviewCount) {
  const loc = city || "the East Valley";
  const c = niche.copy;
  return {
    heroH1: c.h1(loc),
    heroSubhead: c.subhead(name, loc, rating, reviewCount),
    aboutHeading: c.aboutHeading(loc),
    aboutBody: c.aboutBody(name, loc),
    serviceAreaBlurb: c.areaBlurb(loc),
    ctaHeadline: c.ctaHeadline,
    ctaSubhead: c.ctaSubhead,
    metaTitle: c.metaTitle(name, loc),
    metaDescription: c.metaDescription(loc, rating, reviewCount),
  };
}

function main() {
  const raw = JSON.parse(fs.readFileSync(RAW, "utf8"));
  const usedSlugs = new Set();
  const out = [];
  let qrSeq = 1;

  for (const b of raw) {
    const city = b.__city || b.city || (b.query ? b.query.replace(new RegExp(`^${niche.query}\\s+`, "i"), "").replace(/\s+AZ$/i, "").trim() : "");
    let slug = slugify(b.name);
    if (!slug) continue;
    if (usedSlugs.has(slug)) slug = `${slug}-${slugify(city) || qrSeq}`;
    if (usedSlugs.has(slug)) slug = `${slug}-${qrSeq}`;
    usedSlugs.add(slug);

    const { themeId, variant } = assignTheme(b.place_id || slug);
    let seedHash = 0;
    for (const ch of b.place_id || slug) seedHash = (seedHash * 31 + ch.charCodeAt(0)) >>> 0;

    const reviews = (b.reviews_data || [])
      .filter((r) => r.review_text && r.review_text.trim())
      .slice(0, 6)
      .map((r) => ({
        author: r.author_title || "Verified customer",
        rating: r.review_rating || 5,
        text: r.review_text.trim().slice(0, 600),
        relativeTime: relTime(r.review_datetime_utc),
      }));

    out.push({
      slug,
      name: b.name,
      primaryCategory: b.category || niche.category,
      categories: (b.subtypes || b.category || niche.category).split(",").map((x) => x.trim()).filter(Boolean).slice(0, 6),
      phone: fmtPhone(b.phone),
      address: {
        street: b.street || undefined,
        locality: city,
        region: b.state_code || "AZ",
        postalCode: b.postal_code || undefined,
      },
      lat: b.latitude,
      lng: b.longitude,
      serviceAreas: [city, ...(NEIGHBORS[city] || ["Phoenix", "Mesa", "Chandler"])].filter(Boolean).slice(0, 6),
      rating: b.rating || 4.8,
      reviewCount: b.reviews || reviews.length,
      reviews,
      services: pickServices(b.subtypes),
      hours: parseHours(b.working_hours),
      photos: buildPhotos(b.photo, seedHash),
      logoText: b.name.replace(/[^A-Za-z ]/g, "").split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase() || "LB",
      existingWebsite: b.website || undefined,
      placeId: b.place_id,
      owner: b.owner_title || undefined,
      ownerLink: b.owner_link || undefined,
      googleMapsUrl: b.location_link || undefined,
      reviewsLink: b.reviews_link || undefined,
      photosCount: b.photos_count || undefined,
      verified: b.verified === true,
      trade: niche.key,
      themeId,
      variant,
      generatedCopy: defaultCopy(b.name, city, b.rating || 4.8, b.reviews || reviews.length),
      qrCode: `${niche.qrPrefix}${String(qrSeq++).padStart(4, "0")}`,
    });
  }

  const header = `/* AUTO-GENERATED by scripts/normalize.mjs (niche: ${niche.key}) — do not edit by hand. */\nimport type { BusinessProfile } from "./businesses";\n\nexport const ${EXPORT_NAME}: BusinessProfile[] = `;
  fs.writeFileSync(OUT, header + JSON.stringify(out, null, 2) + ";\n");
  console.log(`✓ Normalized ${out.length} ${niche.key} businesses → ${OUT}`);
}

main();
