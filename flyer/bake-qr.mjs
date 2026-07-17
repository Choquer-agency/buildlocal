/**
 * Bake self-hosted QR PNGs for the flyer campaign — NO third-party QR API at
 * print or scan time (100% self-contained reliability).
 *
 *   node flyer/bake-qr.mjs
 *   NEXT_PUBLIC_PUBLISHED_BASE=https://demo.buildlocal.agency node flyer/bake-qr.mjs
 *
 * Each PNG public/m/qr/<code>.png encodes exactly  <BASE>/q/<code>  at error-
 * correction level H (~30% damage tolerance). After baking, EVERY PNG is decoded
 * back and asserted to equal its intended URL — the script exits non-zero if a
 * single one is wrong, so a bad batch can never ship silently.
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

// Regenerate exactly the codes that already exist (filename === QR code), so the
// set is a 1:1 replacement — no code can be added or dropped by accident.
const codes = fs.readdirSync(OUT_DIR)
  .filter((f) => f.endsWith(".png"))
  .map((f) => f.replace(/\.png$/, ""))
  .sort();

if (!codes.length) { console.error("No existing PNGs in", OUT_DIR); process.exit(1); }

// H = highest error correction; margin 1 quiet zone; 1000px for crisp print.
const QR_OPTS = { errorCorrectionLevel: "H", margin: 1, width: 1000, color: { dark: "#000000ff", light: "#ffffffff" } };

// 1) BAKE
for (const code of codes) {
  const target = `${BASE}/q/${code}`;
  await QRCode.toFile(path.join(OUT_DIR, `${code}.png`), target, QR_OPTS);
}
console.log(`Baked ${codes.length} QR PNGs → public/m/qr/   (encoding ${BASE}/q/<code>, ECC=H)`);

// 2) VERIFY — decode every PNG back and assert exact match
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
console.log("✓ All QR codes verified — every image encodes its exact intended URL.");
