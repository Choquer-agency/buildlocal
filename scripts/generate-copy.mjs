// Generate UNIQUE per-business copy with Gemini, baked into businesses.generated.ts.
//
//   node scripts/generate-copy.mjs                    (landscaping, all)
//   node scripts/generate-copy.mjs --niche=roofing    (roofing file)
//   node scripts/generate-copy.mjs --limit=3          (first N, for testing)
//
// Each business gets distinct hero/about/CTA/meta copy so two businesses in the
// same city never read alike. On any error the existing copy is kept.
import fs from "node:fs";
import path from "node:path";
import { loadEnv } from "./outscraper.mjs";
import { getNiche, nicheArg } from "./niches.mjs";

loadEnv();
const KEY = process.env.GEMINI_API_KEY;
const MODEL = "gemini-2.5-flash";
const niche = getNiche(nicheArg(process.argv));
const FILE = path.join(process.cwd(), niche.key === "landscaping" ? "src/content/businesses.generated.ts" : `src/content/businesses.${niche.key}.generated.ts`);
const EXPORT_NAME = niche.key === "landscaping" ? "generatedBusinesses" : `generated_${niche.key}`;
const MARKER = "BusinessProfile[] = ";

const limit = (() => {
  const a = process.argv.find((x) => x.startsWith("--limit="));
  return a ? parseInt(a.split("=")[1], 10) : Infinity;
})();
const CONCURRENCY = 8;

const SCHEMA = {
  type: "object",
  properties: {
    heroH1: { type: "string" },
    heroSubhead: { type: "string" },
    aboutHeading: { type: "string" },
    aboutBody: { type: "array", items: { type: "string" } },
    serviceAreaBlurb: { type: "string" },
    ctaHeadline: { type: "string" },
    ctaSubhead: { type: "string" },
    metaTitle: { type: "string" },
    metaDescription: { type: "string" },
    serviceBlurbs: {
      type: "array",
      items: {
        type: "object",
        properties: { slug: { type: "string" }, blurb: { type: "string" } },
        required: ["slug", "blurb"],
      },
    },
  },
  required: ["heroH1", "heroSubhead", "aboutHeading", "aboutBody", "serviceAreaBlurb", "ctaHeadline", "ctaSubhead", "metaTitle", "metaDescription", "serviceBlurbs"],
};

function prompt(b) {
  const reviews = (b.reviews || []).slice(0, 2).map((r) => `"${r.text.slice(0, 140)}"`).join(" ");
  return `You are a senior conversion copywriter writing the website for a real local ${niche.category} (${niche.key}) business in Arizona. Write UNIQUE, specific, non-generic copy. Avoid clichés like "Your Trusted Partner". Vary sentence structure so this reads differently from other ${niche.key} companies. Be factual — only use the numbers/areas given; do NOT invent awards, years in business, or certifications.

Business: ${b.name}
City: ${b.address.locality}, ${b.address.region}
Category: ${b.primaryCategory}
Service areas: ${b.serviceAreas.join(", ")}
Services offered: ${b.services.map((s) => s.name).join(", ")}
Google rating: ${b.rating} stars from ${b.reviewCount} reviews
Real customer review snippets: ${reviews || "(none)"}

Write JSON with:
- heroH1: punchy headline (<= 9 words), specific to this company/city, no generic filler
- heroSubhead: 1-2 sentences, mention the city and what makes them worth calling, weave in the rating/reviews naturally
- aboutHeading: short section heading
- aboutBody: 2-3 short paragraphs, warm and local, grounded in the real reviews' themes
- serviceAreaBlurb: 1 sentence naming the areas served
- ctaHeadline: short call-to-action headline
- ctaSubhead: 1 sentence encouraging a free quote/call
- metaTitle: <= 60 chars, includes business name + city
- metaDescription: <= 155 chars, includes city + rating
- serviceBlurbs: an array with one entry per service slug below — each a UNIQUE 1-sentence description (vary wording, don't reuse the same phrasing across services). Slugs: ${b.services.map((s) => s.slug).join(", ")}`;
}

async function genCopy(b) {
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt(b) }] }],
      generationConfig: {
        thinkingConfig: { thinkingBudget: 0 },
        responseMimeType: "application/json",
        responseSchema: SCHEMA,
        maxOutputTokens: 1200,
        temperature: 1.0,
      },
    }),
  });
  const j = await res.json();
  const text = j?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error(j?.error?.message || "no text");
  const c = JSON.parse(text);
  if (!c.heroH1 || !Array.isArray(c.aboutBody)) throw new Error("bad shape");
  return c;
}

function applyServiceBlurbs(b, blurbs) {
  if (!Array.isArray(blurbs)) return;
  const map = new Map(blurbs.map((x) => [x.slug, x.blurb]));
  for (const s of b.services) {
    const nb = map.get(s.slug);
    if (nb) s.blurb = nb;
  }
}

async function main() {
  if (!KEY) throw new Error("GEMINI_API_KEY missing");
  const src = fs.readFileSync(FILE, "utf8");
  const arr = JSON.parse(src.slice(src.indexOf(MARKER) + MARKER.length, src.lastIndexOf(";")));
  const targets = arr.slice(0, limit);
  console.log(`Generating copy for ${targets.length}/${arr.length} businesses (model ${MODEL}, concurrency ${CONCURRENCY})…`);

  let done = 0, ok = 0, fail = 0;
  for (let i = 0; i < targets.length; i += CONCURRENCY) {
    const batch = targets.slice(i, i + CONCURRENCY);
    await Promise.all(batch.map(async (b) => {
      try {
        const c = await genCopy(b);
        const { serviceBlurbs, ...copy } = c;
        b.generatedCopy = copy;
        applyServiceBlurbs(b, serviceBlurbs);
        ok++;
      } catch (e) {
        fail++;
        console.warn(`  ⚠ ${b.name}: ${e.message.slice(0, 80)} (kept default)`);
      }
      done++;
      if (done % 10 === 0 || done === targets.length) console.log(`  ${done}/${targets.length} (ok ${ok}, fail ${fail})`);
    }));
  }

  const header = `/* AUTO-GENERATED by scripts/normalize.mjs (niche: ${niche.key}) — do not edit by hand. */\nimport type { BusinessProfile } from "./businesses";\n\nexport const ${EXPORT_NAME}: BusinessProfile[] = `;
  fs.writeFileSync(FILE, header + JSON.stringify(arr, null, 2) + ";\n");
  console.log(`✓ Wrote unique copy for ${ok} businesses → ${FILE}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
