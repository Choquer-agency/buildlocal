/**
 * Bake self-hosted QR PNGs for the flyer campaign — NO third-party QR API at
 * print or scan time (100% self-contained reliability).
 *
 *   node flyer/bake-qr.mjs
 *   NEXT_PUBLIC_PUBLISHED_BASE=https://demo.buildlocal.agency node flyer/bake-qr.mjs
 *
 * SOURCE OF TRUTH = the batch-1 mailing CSV (metadata_qr_code). We bake a PNG for
 * every code that is actually being mailed, plus any pre-existing PNG (so no image
 * is left encoding an old domain). Each PNG public/m/qr/<code>.png encodes exactly
 * <BASE>/q/<code> at error-correction level H (~30% damage tolerance).
 *
 * After baking, EVERY PNG is decoded back and asserted to equal its intended URL,
 * and we assert that EVERY mailing code has a PNG — the script exits non-zero on
 * any mismatch or gap, so a bad/incomplete batch can never ship silently.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import QRCode from "qrcode";
import { PNG } from "pngjs";
import jsQR from "jsqr";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE = (process.env.NEXT_PUBLIC_PUBLISHED_BASE || "https://demo.buildlocal.agency").replace(/\/+$/, "");
const OUT_DIR = path.join(__dirname, "..", "public", "m", "qr");
const CSV = path.join(__dirname, "lob-batch1-2026-07-09.csv");

// Minimal RFC-4180 CSV parser (handles quoted commas/newlines).
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

// Mailing codes (the set that MUST have a correct PNG), + code→slug for reporting.
const rows = parseCsv(fs.readFileSync(CSV, "utf8").trim());
const hdr = rows[0];
const ci = hdr.indexOf("metadata_qr_code"), si = hdr.indexOf("metadata_slug");
const mailing = rows.slice(1).map((r) => ({ code: r[ci], slug: r[si] })).filter((x) => x.code);
const mailingCodes = new Set(mailing.map((m) => m.code));

// Also refresh any pre-existing PNG so nothing lingers on an old domain.
fs.mkdirSync(OUT_DIR, { recursive: true });
const existing = fs.readdirSync(OUT_DIR).filter((f) => f.endsWith(".png")).map((f) => f.replace(/\.png$/, ""));
const codes = [...new Set([...mailingCodes, ...existing])].sort();

const QR_OPTS = { errorCorrectionLevel: "H", margin: 1, width: 1000, color: { dark: "#000000ff", light: "#ffffffff" } };

// 1) BAKE
for (const code of codes) {
  await QRCode.toFile(path.join(OUT_DIR, `${code}.png`), `${BASE}/q/${code}`, QR_OPTS);
}
console.log(`Baked ${codes.length} QR PNGs → public/m/qr/  (encoding ${BASE}/q/<code>, ECC=H)`);

// 2) COVERAGE — every mailing code must have a PNG
const missing = mailing.filter((m) => !fs.existsSync(path.join(OUT_DIR, `${m.code}.png`)));
if (missing.length) { console.error(`✗ ${missing.length} mailing codes have NO PNG:`, missing.slice(0, 20)); process.exit(1); }
console.log(`Coverage: all ${mailingCodes.size} mailing codes have a PNG ✓`);

// 3) VERIFY — decode every PNG back and assert exact match
const bad = [];
for (const code of codes) {
  const expected = `${BASE}/q/${code}`;
  const png = PNG.sync.read(fs.readFileSync(path.join(OUT_DIR, `${code}.png`)));
  const res = jsQR(new Uint8ClampedArray(png.data.buffer, png.data.byteOffset, png.data.length), png.width, png.height);
  if (!res || res.data !== expected) bad.push({ code, got: res ? res.data : "(unreadable)", expected });
}
console.log(`Verified ${codes.length - bad.length}/${codes.length} PNGs decode EXACTLY to ${BASE}/q/<code>`);
if (bad.length) {
  console.error(`\n✗ ${bad.length} MISMATCH(ES):`);
  for (const b of bad.slice(0, 20)) console.error(`   ${b.code}: got "${b.got}"  expected "${b.expected}"`);
  process.exit(1);
}
console.log("✓ All QR codes verified — every mailing code has a PNG encoding its exact intended URL.");
