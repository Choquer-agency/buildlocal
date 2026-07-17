/**
 * Fill front.html + back.html with one business's real data so you can eyeball
 * the design in a browser before sending to Lob.
 *
 *   node flyer/preview.mjs                                  # first business
 *   node flyer/preview.mjs --slug=divine-design-landscaping
 *
 * Writes flyer/_preview-front.html and flyer/_preview-back.html, then open them.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const args = Object.fromEntries(process.argv.slice(2).map((a) => {
  const [k, v] = a.replace(/^--/, "").split("="); return [k, v ?? true];
}));
const BASE = process.env.NEXT_PUBLIC_PUBLISHED_BASE || "https://buildlocal.agency";

const src = fs.readFileSync(path.join(__dirname, "..", "src", "content", "businesses.generated.ts"), "utf8");
// eslint-disable-next-line no-eval
const businesses = eval(src.slice(src.indexOf("["), src.lastIndexOf("]") + 1));
const b = args.slug ? businesses.find((x) => x.slug === args.slug) : businesses[0];
if (!b) { console.error("slug not found"); process.exit(1); }

const localShot = (f) => {
  const p = path.join(__dirname, "shots", f);
  return fs.existsSync(p) ? `shots/${f}` : null;
};

import { cleanName, headlineFont } from "./clean-name.mjs";

const displayName = cleanName(b.name);
const vars = {
  business_name: displayName,
  headline_font: headlineFont(displayName),
  deserves_line: b.existingWebsite ? "deserves a better" : "deserves a",
  qr_image_url: `https://api.qrserver.com/v1/create-qr-code/?size=1000x1000&margin=0&qzone=1&ecc=M&data=${encodeURIComponent(`${BASE}/q/${b.qrCode || b.slug}`)}`,
  old_shot_url: localShot(`${b.slug}-old.jpg`) || localShot("_no-website.jpg") || "https://placehold.co/1200x760/eee/999?text=OLD+site",
  new_shot_url: localShot(`${b.slug}-new.jpg`) || "https://placehold.co/1200x1500/eee/999?text=NEW+site",
};

for (const side of ["front", "back"]) {
  let html = fs.readFileSync(path.join(__dirname, `${side}.html`), "utf8");
  html = html.replace(/{{\s*(\w+)\s*}}/g, (_, k) => vars[k] ?? `{{${k}}}`);
  fs.writeFileSync(path.join(__dirname, `_preview-${side}.html`), html);
}
console.log(`Preview ready for "${b.name}":`);
console.log(`  open flyer/_preview-front.html  flyer/_preview-back.html`);
