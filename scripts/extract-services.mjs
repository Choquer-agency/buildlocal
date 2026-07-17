// Pull a business's REAL service list from their existing website.
//
//   node scripts/extract-services.mjs az0002
//
// Renders their site, asks Gemini for the actual services they offer, and writes
// them to src/content/asset-overrides.json (merged onto the generated data).
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { loadEnv } from "./outscraper.mjs";

loadEnv();
const KEY = process.env.GEMINI_API_KEY;
const MODEL = "gemini-2.5-flash";
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const CONTENT = path.join(process.cwd(), "src/content");
const ASSETS_JSON = path.join(process.cwd(), "src/content/asset-overrides.json");

const code = process.argv[2];
if (!code) { console.error("Usage: node scripts/extract-services.mjs <code|slug>"); process.exit(1); }

// Load every generated pillar file (landscaping + roofing/hvac/pool/pest).
const M = "BusinessProfile[] = ";
const all = [];
for (const f of fs.readdirSync(CONTENT).filter((f) => /^businesses(\..+)?\.generated\.ts$/.test(f))) {
  const src = fs.readFileSync(path.join(CONTENT, f), "utf8");
  const i = src.indexOf(M);
  if (i < 0) continue;
  try { all.push(...JSON.parse(src.slice(i + M.length, src.lastIndexOf(";")))); } catch { /* empty stub */ }
}
const biz = all.find((b) => b.qrCode === code) || all.find((b) => b.slug === code);
if (!biz) { console.error(`No business for "${code}"`); process.exit(1); }
if (!biz.existingWebsite) { console.error(`${biz.name} has no existing website — skipping (keeps default catalog).`); process.exit(0); }

const slugify = (s) => s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 50);

const SCHEMA = {
  type: "object",
  properties: {
    services: {
      type: "array",
      items: { type: "object", properties: { name: { type: "string" }, blurb: { type: "string" } }, required: ["name", "blurb"] },
    },
    about: { type: "array", items: { type: "string" } },
    yearsInBusiness: { type: "number" },
  },
  required: ["services", "about", "yearsInBusiness"],
};

async function main() {
  console.log(`Rendering ${biz.existingWebsite} …`);
  let text = "";
  try {
    const dom = execSync(`"${CHROME}" --headless=new --disable-gpu --virtual-time-budget=12000 --dump-dom "${biz.existingWebsite}"`, { maxBuffer: 1024 * 1024 * 20, timeout: 60000 }).toString();
    text = dom.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 9000);
  } catch (e) {
    console.error("render failed:", e.message); process.exit(1);
  }

  const prompt = `Here is the rendered text of ${biz.name}'s website (a ${biz.primaryCategory} in ${biz.address.locality}, ${biz.address.region}). Extract REAL, accurate info — do not invent anything.\n\nReturn:\n- services: 4–6 services they ACTUALLY offer (short name 2–4 words + one-sentence blurb, in their words)\n- about: 2 short paragraphs about the company written from what the site actually says (history, what they specialize in, what makes them different) — warm, first/third person, no fabricated awards\n- yearsInBusiness: number of years in business if stated/derivable (e.g. "since 2008"), else 0\n\nWEBSITE TEXT:\n${text}`;

  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${KEY}`, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { thinkingConfig: { thinkingBudget: 0 }, responseMimeType: "application/json", responseSchema: SCHEMA, maxOutputTokens: 1200, temperature: 0.4 } }),
  });
  const j = await res.json();
  const out = j?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!out) { console.error("Gemini failed:", j?.error?.message || JSON.stringify(j).slice(0, 200)); process.exit(1); }
  const parsed = JSON.parse(out);
  const used = new Set();
  const services = parsed.services.slice(0, 6).map((s) => {
    let slug = slugify(s.name);
    while (used.has(slug)) slug += "-x";
    used.add(slug);
    return { name: s.name, slug, blurb: s.blurb };
  });

  // Build just this business's override patch.
  const patch = { services };
  if (Array.isArray(parsed.about) && parsed.about.length) patch.generatedCopy = { aboutBody: parsed.about.slice(0, 3) };
  if (parsed.yearsInBusiness && parsed.yearsInBusiness > 0) patch.yearsInBusiness = Math.round(parsed.yearsInBusiness);

  if (process.env.CRAWL_STAGE) {
    // Race-free batch mode: each process writes only its own file; crawl-batch
    // merges them into asset-overrides.json once at the end.
    fs.writeFileSync(path.join(process.env.CRAWL_STAGE, `${biz.slug}.json`), JSON.stringify(patch) + "\n");
  } else {
    const json = JSON.parse(fs.readFileSync(ASSETS_JSON, "utf8"));
    const cur = json[biz.slug] || {};
    json[biz.slug] = { ...cur, ...patch, generatedCopy: { ...(cur.generatedCopy || {}), ...(patch.generatedCopy || {}) } };
    fs.writeFileSync(ASSETS_JSON, JSON.stringify(json, null, 2) + "\n");
  }

  console.log(`✓ ${biz.name} — ${services.length} services, about:${(parsed.about || []).length ? "yes" : "no"}, years:${parsed.yearsInBusiness || "?"}`);
}
main().catch((e) => { console.error(e); process.exit(1); });
