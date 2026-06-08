/**
 * Build the Lob campaign audience CSV: one row per business, every merge
 * variable filled in (business_name, qr_image_url, old_shot_url, new_shot_url).
 *
 * Run from troker-landing/:
 *   node flyer/build-audience.mjs                       # all 500
 *   node flyer/build-audience.mjs --host=blob           # screenshots served from Vercel Blob (see HOSTING)
 *   node flyer/build-audience.mjs --mailing=list.csv    # join real mailing addresses by slug
 *
 * Output: flyer/lob-audience.csv
 *
 * HOSTING the screenshots (Lob fetches these URLs at print time):
 *   1. SITE  (default): copy flyer/shots/* into public/m/ and deploy buildlocal.agency.
 *                       URLs become https://buildlocal.agency/m/<slug>-old.jpg
 *   2. BLOB  (--host=blob): upload flyer/shots/* to Vercel Blob, paste the base
 *                       into SHOT_BASE below (one CDN URL, off-repo).
 *
 * QR: by default qr_image_url uses the qrserver.com API (zero infra). Pass
 *     --bake-qr to instead expect local PNGs at public/m/qr/<qrCode>.png.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { cleanName, headlineFont } from "./clean-name.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const args = Object.fromEntries(process.argv.slice(2).map((a) => {
  const [k, v] = a.replace(/^--/, "").split("="); return [k, v ?? true];
}));

const PUBLISHED_BASE = process.env.NEXT_PUBLIC_PUBLISHED_BASE || "https://buildlocal.agency";

// Where the screenshot JPGs live once deployed:
const SHOT_BASE = args.host === "blob"
  ? (process.env.SHOT_BASE || "https://PASTE-YOUR.public.blob.vercel-storage.com/m") // <- paste Vercel Blob base
  : `${PUBLISHED_BASE}/m`;

function loadBusinesses() {
  const src = fs.readFileSync(path.join(__dirname, "..", "src", "content", "businesses.generated.ts"), "utf8");
  const json = src.slice(src.indexOf("["), src.lastIndexOf("]") + 1);
  // eslint-disable-next-line no-eval
  return eval(json);
}

// optional: real mailing addresses keyed by slug -> {name,line1,line2,city,state,zip}
function loadMailing(file) {
  const txt = fs.readFileSync(path.join(__dirname, "..", file), "utf8").trim();
  const [hdr, ...rows] = txt.split(/\r?\n/);
  const cols = hdr.split(",").map((s) => s.trim());
  const map = {};
  for (const r of rows) {
    const cells = r.split(",");
    const o = Object.fromEntries(cols.map((c, i) => [c, (cells[i] || "").trim()]));
    if (o.slug) map[o.slug] = o;
  }
  return map;
}

const shotExists = (f) => fs.existsSync(path.join(__dirname, "shots", f));
const csvCell = (v) => {
  const s = String(v ?? "");
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

// Manual name overrides from the visual editor (flyer/names.html -> Export).
// slug -> exact name to print. Falls back to the auto-cleaner.
let NAME_OVERRIDES = {};
try {
  NAME_OVERRIDES = JSON.parse(fs.readFileSync(path.join(__dirname, "name-overrides.json"), "utf8"));
} catch { /* no overrides yet */ }
const displayName = (b) => NAME_OVERRIDES[b.slug] || cleanName(b.name);

function qrImageUrl(qrCode) {
  const target = `${PUBLISHED_BASE}/q/${qrCode}`;
  if (args["bake-qr"]) return `${SHOT_BASE}/qr/${qrCode}.png`;
  return `https://api.qrserver.com/v1/create-qr-code/?size=1000x1000&margin=0&qzone=1&ecc=M&data=${encodeURIComponent(target)}`;
}

const businesses = loadBusinesses();
const mailing = args.mailing ? loadMailing(args.mailing) : null;

// Lob audience columns: to.* are the recipient (auto-printed); the rest are merge vars.
const headers = [
  "to.name", "to.address_line1", "to.address_line2", "to.address_city", "to.address_state", "to.address_zip",
  "business_name", "deserves_line", "headline_font", "qr_image_url", "old_shot_url", "new_shot_url",
  "slug", "qr_code", "qr_target",
];

const lines = [headers.join(",")];
let noSite = 0, noMail = 0;

for (const b of businesses) {
  const m = mailing?.[b.slug] || {};
  if (!m.line1) noMail++;

  const oldFile = `${b.slug}-old.jpg`;
  const hasOld = b.existingWebsite && shotExists(oldFile);
  if (!b.existingWebsite) noSite++;
  const oldUrl = hasOld ? `${SHOT_BASE}/${oldFile}` : `${SHOT_BASE}/_no-website.jpg`;
  const newUrl = `${SHOT_BASE}/${b.slug}-new.jpg`;

  const row = {
    "to.name": m.name || b.owner || b.name,
    "to.address_line1": m.line1 || "",
    "to.address_line2": m.line2 || "",
    "to.address_city": m.city || b.address?.locality || "",
    "to.address_state": m.state || b.address?.region || "AZ",
    "to.address_zip": m.zip || "",
    business_name: displayName(b),
    headline_font: headlineFont(displayName(b)),
    deserves_line: b.existingWebsite ? "deserves a better" : "deserves a",
    qr_image_url: qrImageUrl(b.qrCode || b.slug),
    old_shot_url: oldUrl,
    new_shot_url: newUrl,
    slug: b.slug,
    qr_code: b.qrCode || b.slug,
    qr_target: `${PUBLISHED_BASE}/q/${b.qrCode || b.slug}`,
  };
  lines.push(headers.map((h) => csvCell(row[h])).join(","));
}

const out = path.join(__dirname, "lob-audience.csv");
fs.writeFileSync(out, lines.join("\n"));
console.log(`Wrote ${businesses.length} rows -> flyer/lob-audience.csv`);
console.log(`Screenshot base: ${SHOT_BASE}`);
console.log(`· ${noSite} businesses have no existing website (using _no-website.jpg)`);
if (mailing) console.log(`· ${noMail} rows are missing a mailing address (to.address_line1 blank)`);
else console.log(`· No --mailing list joined: to.address_line1 is blank. Lob needs real street addresses to mail.`);
