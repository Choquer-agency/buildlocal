// Scrape AZ trade businesses from Google Maps via Outscraper.
//
// Usage:
//   node scripts/scrape-gmb.mjs --niche=roofing --max=100 --perCity=10 --reviews=8
//   node scripts/scrape-gmb.mjs --cities=Gilbert,Chandler --perCity=10 --max=20 --reviews=6
//   node scripts/scrape-gmb.mjs --max=500 --perCity=40 --reviews=8        (full landscaping run)
//
// Niche (defaults to landscaping): landscaping | roofing | hvac | pool | pest.
// Writes raw results to scripts/data/raw-<niche>.json (landscaping →
// raw-businesses.json for back-compat), deduped by place_id.
import fs from "node:fs";
import path from "node:path";
import { loadEnv, osRequest } from "./outscraper.mjs";
import { getNiche, nicheArg } from "./niches.mjs";

loadEnv();
const niche = getNiche(nicheArg(process.argv));

// AZ metros to spread the sample across (mirrors src/content/cities.ts).
const AZ_CITIES = [
  "Phoenix", "Mesa", "Chandler", "Gilbert", "Scottsdale", "Tempe", "Glendale",
  "Peoria", "Surprise", "Goodyear", "Avondale", "Queen Creek", "Buckeye",
  "Maricopa", "San Tan Valley", "Apache Junction", "Casa Grande",
];

function arg(name, def) {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.split("=")[1] : def;
}

const cities = (arg("cities", "") ? arg("cities").split(",") : AZ_CITIES).map((s) => s.trim());
const perCity = parseInt(arg("perCity", "40"), 10);
const maxTotal = parseInt(arg("max", "500"), 10);
const reviewsLimit = parseInt(arg("reviews", "8"), 10);

const OUT = path.join(process.cwd(), niche.key === "landscaping" ? "scripts/data/raw-businesses.json" : `scripts/data/raw-${niche.key}.json`);

async function main() {
  console.log(`Scraping ${niche.key} across ${cities.length} AZ cities · perCity=${perCity} · max=${maxTotal} · reviews=${reviewsLimit}`);
  const byPlaceId = new Map();

  // 1) Search each city for this trade.
  for (const city of cities) {
    if (byPlaceId.size >= maxTotal) break;
    try {
      const data = await osRequest("maps/search-v3", {
        query: `${niche.query} ${city} AZ`,
        limit: String(perCity),
      });
      const results = (data && data[0]) || [];
      let added = 0;
      for (const b of results) {
        if (!b.place_id || byPlaceId.has(b.place_id)) continue;
        if (b.business_status && b.business_status !== "OPERATIONAL") continue;
        b.__city = city;          // reliable city for normalize (search city)
        b.__niche = niche.key;    // which trade this came from
        byPlaceId.set(b.place_id, b);
        added++;
        if (byPlaceId.size >= maxTotal) break;
      }
      console.log(`  ${city}: +${added} (total ${byPlaceId.size})`);
    } catch (e) {
      console.warn(`  ${city}: search failed — ${e.message}`);
    }
  }

  const businesses = [...byPlaceId.values()];
  console.log(`Collected ${businesses.length} unique businesses. Fetching reviews…`);

  // 2) Fetch real review text per business — concurrent pool for speed.
  if (reviewsLimit > 0) {
    const POOL = 8;
    let idx = 0, done = 0;
    async function worker() {
      while (idx < businesses.length) {
        const b = businesses[idx++];
        try {
          const data = await osRequest("maps/reviews-v3", { query: b.place_id, reviewsLimit: String(reviewsLimit) });
          b.reviews_data = ((data && data[0]) || {}).reviews_data || [];
        } catch (e) {
          b.reviews_data = [];
          console.warn(`  reviews failed for ${b.name}: ${e.message}`);
        }
        if (++done % 25 === 0 || done === businesses.length) console.log(`  reviews ${done}/${businesses.length}`);
      }
    }
    await Promise.all(Array.from({ length: POOL }, worker));
  }

  fs.writeFileSync(OUT, JSON.stringify(businesses, null, 2));
  console.log(`✓ Wrote ${businesses.length} businesses → ${OUT}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
