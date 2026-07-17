/**
 * Render the Lob-ready templates (lob-front/lob-back) filled with one business's
 * real merge values + hosted asset URLs, exactly as Lob will — to confirm the
 * inlined fonts load and nothing overflows.  node flyer/shot-lob.mjs [slug]
 */
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE = "https://demo.buildlocal.agency";

// pull the sample row from the batch CSV (row 1)
function parseCsv(t) { const R = []; let r = [], f = "", q = false; for (let i = 0; i < t.length; i++) { const c = t[i]; if (q) { if (c === '"') { if (t[i + 1] === '"') { f += '"'; i++; } else q = false; } else f += c; } else if (c === '"') q = true; else if (c === ",") { r.push(f); f = ""; } else if (c === "\n") { r.push(f); R.push(r); r = []; f = ""; } else if (c !== "\r") f += c; } if (f.length || r.length) { r.push(f); R.push(r); } return R; }
const rows = parseCsv(fs.readFileSync(path.join(__dirname, "lob-batch1-2026-07-09.csv"), "utf8").trim());
const hdr = rows[0]; const col = (n) => hdr.indexOf(n);
const want = process.argv[2];
const row = want ? rows.slice(1).find((r) => r[col("metadata_slug")] === want) : rows[1];
const slug = row[col("metadata_slug")], code = row[col("metadata_qr_code")];

const vars = {
  business_name: row[col("business_name")],
  headline_font: row[col("headline_font")],
  deserves_line: row[col("deserves_line")],
  qr_image_url: `${BASE}/m/qr/${code}.png`,          // hosted PNG (Lob needs a URL, not a data-URI)
  old_shot_url: `${BASE}/m/${slug}-old.jpg`,
  new_shot_url: `${BASE}/m/${slug}-new.jpg`,
};

const W = 888, H = 600;
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 2 });
for (const side of ["front", "back"]) {
  let html = fs.readFileSync(path.join(__dirname, `lob-${side}.html`), "utf8");
  html = html.replace(/{{\s*(\w+)\s*}}/g, (_, k) => vars[k] ?? `{{${k}}}`);
  const tmp = path.join(__dirname, `_lobfill-${side}.html`);
  fs.writeFileSync(tmp, html);
  await page.goto("file://" + tmp, { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(__dirname, `_render-lob-${side}.png`), clip: { x: 0, y: 0, width: W, height: H } });
  fs.unlinkSync(tmp);
  console.log(`rendered lob-${side} (${vars.business_name}, ${code}) → flyer/_render-lob-${side}.png`);
}
await browser.close();
