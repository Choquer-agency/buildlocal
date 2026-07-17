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

// FONTS are INLINED as data-URIs (subsetted woff2). Cross-origin @font-face is
// blocked by the renderer's CORS policy, so a hosted font URL silently fails and
// everything falls back to Arial (→ overflow). Inlining avoids the fetch entirely.
// The subsets are ~13 KB each, so the whole flyer stays well under Lob's 100k.
const fontUri = (rel) => `data:font/woff2;base64,${fs.readFileSync(path.join(__dirname, rel)).toString("base64")}`;
// Dual source per @font-face: inlined subset first (self-contained), then the
// CORS-hosted font as a fallback — so it renders whether Lob honors the data-URI
// or the cross-origin fetch.
const FONT = {
  "assets/fonts/ppneuemontreal-semibolditalic.otf": {
    src: `url(${fontUri("assets/fonts/subset/ppnm.woff2")}) format('woff2'), url('${BASE}/fonts/PPNeueMontreal-SemiBoldItalic.woff2') format('woff2')`,
  },
  "assets/fonts/IBMPlexMono-Regular.ttf": {
    src: `url(${fontUri("assets/fonts/subset/ibmmono.woff2")}) format('woff2'), url('${BASE}/fonts/IBMPlexMono-Regular.ttf') format('truetype')`,
  },
};
// IMAGES load fine cross-origin (no CORS needed for <img>), so keep them hosted.
const SVG = {
  "assets/logo.svg": `${BASE}/m/logo.svg`,
  "assets/peace.svg": `${BASE}/m/peace.svg`,
};

for (const side of ["front", "back"]) {
  let html = fs.readFileSync(path.join(__dirname, `${side}.html`), "utf8");
  // fonts: url('assets/fonts/X') format('...')  ->  inlined data-URI + hosted fallback
  html = html.replace(/url\('(assets\/fonts\/[^']+)'\)\s*format\('[^']+'\)/g, (m, p) => {
    const f = FONT[p];
    return f ? f.src : m;
  });
  // font-display:block hides text until the font loads; swap shows a fallback
  // instantly instead (harmless now that fonts are inlined, but safer).
  html = html.replace(/font-display:\s*block/g, "font-display:swap");
  // local svgs -> hosted urls
  html = html.replace(/src="(assets\/[^"]+\.svg)"/g, (m, p) => (SVG[p] ? `src="${SVG[p]}"` : m));
  const out = path.join(__dirname, `lob-${side}.html`);
  fs.writeFileSync(out, html);
  const chars = html.length;
  const ok = chars < 100000;
  console.log(`lob-${side}.html  ${chars.toLocaleString()} chars  ${ok ? "✓ under 100k" : "✗ OVER 100k"}`);
}
console.log(`\nUpload flyer/lob-front.html + flyer/lob-back.html to Lob (assets served from ${BASE}).`);
