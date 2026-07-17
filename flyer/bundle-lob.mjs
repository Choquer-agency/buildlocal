/**
 * Produce the Lob-ready flyer templates (< 100,000 chars — Lob's hard limit).
 *
 * Unlike the offline proofs (which inline everything), the Lob upload must stay
 * tiny: fonts + logo + peace are referenced by HOSTED URL (Lob fetches them at
 * print time), and the big per-recipient stuff — QR (in-code data-URI), Old/New
 * screenshots — comes from the CSV merge variables. Only the QR is embedded, and
 * it's ~3 KB, so the merged postcard stays well under the limit.
 *
 *   node flyer/bundle-lob.mjs   ->   flyer/lob-front.html  +  flyer/lob-back.html
 *
 * Upload flyer/lob-front.html + flyer/lob-back.html to Lob, with lob-batch1 CSV.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE = (process.env.NEXT_PUBLIC_PUBLISHED_BASE || "https://demo.buildlocal.agency").replace(/\/+$/, "");

// Map the template's local asset refs → hosted URLs on the deploy.
const FONT = {
  "assets/fonts/ppneuemontreal-semibolditalic.otf": { url: `${BASE}/fonts/PPNeueMontreal-SemiBoldItalic.woff2`, fmt: "woff2" },
  "assets/fonts/IBMPlexMono-Regular.ttf": { url: `${BASE}/fonts/IBMPlexMono-Regular.ttf`, fmt: "truetype" },
};
const SVG = {
  "assets/logo.svg": `${BASE}/m/logo.svg`,
  "assets/peace.svg": `${BASE}/m/peace.svg`,
};

for (const side of ["front", "back"]) {
  let html = fs.readFileSync(path.join(__dirname, `${side}.html`), "utf8");
  // fonts: url('assets/fonts/X.otf') format('opentype')  ->  hosted url + format
  html = html.replace(/url\('(assets\/fonts\/[^']+)'\)\s*format\('[^']+'\)/g, (m, p) => {
    const f = FONT[p];
    return f ? `url('${f.url}') format('${f.fmt}')` : m;
  });
  // local svgs -> hosted urls
  html = html.replace(/src="(assets\/[^"]+\.svg)"/g, (m, p) => (SVG[p] ? `src="${SVG[p]}"` : m));
  const out = path.join(__dirname, `lob-${side}.html`);
  fs.writeFileSync(out, html);
  const chars = html.length;
  const ok = chars < 100000;
  console.log(`lob-${side}.html  ${chars.toLocaleString()} chars  ${ok ? "✓ under 100k" : "✗ OVER 100k"}`);
}
console.log(`\nUpload flyer/lob-front.html + flyer/lob-back.html to Lob (assets served from ${BASE}).`);
