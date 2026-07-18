/**
 * Build the Lob flyer proofs with the QR generated IN CODE (node-qrcode, inline
 * SVG data-URI, error-correction H). Nothing is fetched from a third party at
 * view or print time — the QR, fonts, logo and screenshots are all embedded.
 *
 *   node flyer/build-flyer.mjs                              # proof for a sample business
 *   node flyer/build-flyer.mjs --slug=divine-design-landscaping
 *   node flyer/build-flyer.mjs --embed-csv                  # bake in-code QR data-URIs into lob-batch1 CSV
 *
 * Proof output:  flyer/proof-front.html  +  flyer/proof-back.html  (open in a browser)
 * The Lob templates stay front.html / back.html ({{merge}} vars, per-recipient).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import QRCode from "qrcode";
import { cleanName, headlineFont } from "./clean-name.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const args = Object.fromEntries(process.argv.slice(2).map((a) => {
  const [k, v] = a.replace(/^--/, "").split("="); return [k, v ?? true];
}));
const BASE = (process.env.NEXT_PUBLIC_PUBLISHED_BASE || "https://demo.buildlocal.agency").replace(/\/+$/, "");
const CSV = path.join(__dirname, "lob-batch1-2026-07-09.csv");

// ── QR IN CODE — inline SVG data-URI, ECC H (survives ~30% print damage) ──
async function qrDataUri(code) {
  const svg = await QRCode.toString(`${BASE}/q/${code}`, { type: "svg", errorCorrectionLevel: "H", margin: 1 });
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

// ── minimal RFC-4180 CSV parse/serialize ──
function parseCsv(txt) {
  const rows = []; let row = [], field = "", q = false;
  for (let i = 0; i < txt.length; i++) {
    const c = txt[i];
    if (q) { if (c === '"') { if (txt[i + 1] === '"') { field += '"'; i++; } else q = false; } else field += c; }
    else if (c === '"') q = true;
    else if (c === ",") { row.push(field); field = ""; }
    else if (c === "\n") { row.push(field); rows.push(row); row = []; field = ""; }
    else if (c !== "\r") field += c;
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  return rows;
}
const csvCell = (v) => (/[",\n]/.test(String(v ?? "")) ? `"${String(v).replace(/"/g, '""')}"` : String(v ?? ""));

// ── EMBED MODE: rewrite the batch CSV's qr_image_url to in-code SVG data-URIs ──
if (args["embed-csv"]) {
  const rows = parseCsv(fs.readFileSync(CSV, "utf8").trim());
  const hdr = rows[0];
  const qi = hdr.indexOf("qr_image_url"), ci = hdr.indexOf("metadata_qr_code");
  let n = 0;
  for (let r = 1; r < rows.length; r++) {
    rows[r][qi] = await qrDataUri(rows[r][ci]); n++;
  }
  fs.writeFileSync(CSV, rows.map((r) => r.map(csvCell).join(",")).join("\n"));
  console.log(`Embedded ${n} in-code QR data-URIs into ${path.basename(CSV)} (qr_image_url column).`);
  process.exit(0);
}

// ── PROOF MODE: fill front/back with one business, everything inlined ──
function loadBusinesses() {
  const files = ["businesses.generated.ts", "businesses.roofing.generated.ts", "businesses.hvac.generated.ts", "businesses.pool.generated.ts", "businesses.pest.generated.ts"];
  let all = [];
  for (const f of files) {
    const p = path.join(ROOT, "src", "content", f);
    if (!fs.existsSync(p)) continue;
    const s = fs.readFileSync(p, "utf8");
    // eslint-disable-next-line no-eval
    all = all.concat(eval(s.slice(s.indexOf("["), s.lastIndexOf("]") + 1)));
  }
  return all;
}

const MIME = { ".otf": "font/otf", ".ttf": "font/ttf", ".svg": "image/svg+xml", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png" };
const dataUriFile = (abs) => `data:${MIME[path.extname(abs).toLowerCase()]};base64,${fs.readFileSync(abs).toString("base64")}`;
const assetUri = (rel) => dataUriFile(path.join(__dirname, rel));
function shotUri(name) {
  for (const dir of [path.join(ROOT, "public", "m"), path.join(__dirname, "shots")]) {
    const p = path.join(dir, name);
    if (fs.existsSync(p)) return dataUriFile(p);
  }
  return null;
}

const businesses = loadBusinesses();
const b = args.slug ? businesses.find((x) => x.slug === args.slug) : businesses[0];
if (!b) { console.error("slug not found"); process.exit(1); }

const displayName = cleanName(b.name);
const code = b.qrCode || b.slug;
const noWebsite = shotUri("_no-website.jpg") || "";
const vars = {
  business_name: displayName,
  // ~0.8x the auto size so the 3-line headline sits higher and clears Lob's
  // (larger-than-expected) address block on the lower-right.
  headline_font: Math.round(headlineFont(displayName) * 0.8),
  deserves_line: b.existingWebsite ? "deserves a better" : "deserves a",
  qr_image_url: await qrDataUri(code),
  old_shot_url: (b.existingWebsite && shotUri(`${b.slug}-old.jpg`)) || noWebsite,
  new_shot_url: shotUri(`${b.slug}-new.jpg`) || "",
};

for (const side of ["front", "back"]) {
  let html = fs.readFileSync(path.join(__dirname, `${side}.html`), "utf8");
  html = html.replace(/url\('(assets\/fonts\/[^']+)'\)/g, (_, p) => `url(${assetUri(p)})`);
  html = html.replace(/src="(assets\/[^"]+\.svg)"/g, (_, p) => `src="${assetUri(p)}"`);
  html = html.replace(/{{\s*(\w+)\s*}}/g, (_, k) => vars[k] ?? `{{${k}}}`);
  fs.writeFileSync(path.join(__dirname, `proof-${side}.html`), html);
}
console.log(`Proof ready for "${b.name}" (${code}), QR encodes ${BASE}/q/${code}`);
console.log("  → flyer/proof-front.html  +  flyer/proof-back.html  (self-contained: open in a browser)");
