// Process touch-up assets for ONE business: scale + convert to WebP, then wire
// the paths into src/content/asset-overrides.json (survives pipeline re-runs).
//
//   1. Drop files into _inbox/<code>/  (logo named "logo.*"; rest = photos)
//   2. node scripts/process-assets.mjs az0007
//
// Logo  → /public/biz-photos/<slug>/logo.(webp|svg)  (≤400w, transparent)
// Photos→ /public/biz-photos/<slug>/p1.webp …        (≤1600w, q80)
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const code = process.argv[2];
if (!code) { console.error("Usage: node scripts/process-assets.mjs <code|slug>"); process.exit(1); }

const root = process.cwd();
const GEN = path.join(root, "src/content/businesses.generated.ts");
const ASSETS_JSON = path.join(root, "src/content/asset-overrides.json");

// resolve code → slug
const src = fs.readFileSync(GEN, "utf8");
const M = "BusinessProfile[] = ";
const all = JSON.parse(src.slice(src.indexOf(M) + M.length, src.lastIndexOf(";")));
const biz = all.find((b) => b.qrCode === code) || all.find((b) => b.slug === code);
if (!biz) { console.error(`No business for code/slug "${code}"`); process.exit(1); }
const slug = biz.slug;

// Find the inbox folder by code (folders are named "az0007 — Business Name").
const inboxRoot = path.join(root, "_inbox");
const dirs = fs.existsSync(inboxRoot) ? fs.readdirSync(inboxRoot, { withFileTypes: true }).filter((d) => d.isDirectory()) : [];
const match = dirs.find((d) => d.name === code || d.name.startsWith(`${code} `) || d.name.startsWith(`${code}-`) || d.name.startsWith(`${code}—`));
const inbox = match ? path.join(inboxRoot, match.name) : path.join(inboxRoot, code);
if (!fs.existsSync(inbox)) { console.error(`Drop files in _inbox/${code}…/ first (folder not found)`); process.exit(1); }

const outDir = path.join(root, "public/biz-photos", slug);
fs.mkdirSync(outDir, { recursive: true });

const files = fs.readdirSync(inbox).filter((f) => /\.(png|jpe?g|webp|svg|avif|gif|tiff?)$/i.test(f));
const logoFile = files.find((f) => /logo/i.test(f));
const secondaryFile = files.find((f) => /second/i.test(f) && /colou?r/i.test(f));
const colorFile = files.find((f) => f !== secondaryFile && /colou?r/i.test(f));
const fontFile = files.find((f) => /font/i.test(f));
const special = new Set([logoFile, secondaryFile, colorFile, fontFile].filter(Boolean));
const photoFiles = files.filter((f) => !special.has(f)).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

/** Dominant color of a swatch/screenshot → hex. */
async function dominantHex(file) {
  const { data, info } = await sharp(file).resize(24, 24, { fit: "fill" }).raw().toBuffer({ resolveWithObject: true });
  let r = 0, g = 0, b = 0, n = 0;
  for (let i = 0; i < data.length; i += info.channels) { r += data[i]; g += data[i + 1]; b += data[i + 2]; n++; }
  const to = (x) => Math.round(x / n).toString(16).padStart(2, "0");
  return "#" + to(r) + to(g) + to(b);
}

const result = { slug };

async function run() {
  // Logo
  let logoPath;
  if (logoFile) {
    const inPath = path.join(inbox, logoFile);
    if (/\.svg$/i.test(logoFile)) {
      fs.copyFileSync(inPath, path.join(outDir, "logo.svg"));
      logoPath = `/biz-photos/${slug}/logo.svg`;
    } else {
      // If the source is already a cut-out PNG (real transparency), keep it as-is —
      // a near-white knockout would erase WHITE artwork on a transparent bg.
      // Only knock out a near-white background for logos that ship on a solid plate.
      const src = sharp(inPath).resize({ width: 400, withoutEnlargement: true }).ensureAlpha();
      const srcStats = await sharp(inPath).ensureAlpha().stats();
      const alreadyTransparent = srcStats.channels[3] && srcStats.channels[3].mean < 250;
      if (alreadyTransparent) {
        await src.webp({ quality: 90 }).toFile(path.join(outDir, "logo.webp"));
      } else {
        const { data, info } = await src.raw().toBuffer({ resolveWithObject: true });
        const ch = info.channels;
        for (let i = 0; i < data.length; i += ch) {
          if (data[i] > 238 && data[i + 1] > 238 && data[i + 2] > 238) data[i + 3] = 0;
        }
        await sharp(data, { raw: { width: info.width, height: info.height, channels: ch } }).webp({ quality: 90 }).toFile(path.join(outDir, "logo.webp"));
      }
      logoPath = `/biz-photos/${slug}/logo.webp`;
    }
    console.log(`  logo  → ${logoPath}`);
  }

  // Photos
  const photoPaths = [];
  for (let i = 0; i < photoFiles.length; i++) {
    const inPath = path.join(inbox, photoFiles[i]);
    const out = `p${i + 1}.webp`;
    await sharp(inPath).rotate().resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 80 }).toFile(path.join(outDir, out));
    const p = `/biz-photos/${slug}/${out}`;
    photoPaths.push(p);
    console.log(`  photo → ${p}  (${photoFiles[i]})`);
  }

  // Brand colors from screenshots
  let brandColor, brandColor2;
  if (colorFile) { brandColor = await dominantHex(path.join(inbox, colorFile)); console.log(`  color   → ${brandColor} (primary)`); }
  if (secondaryFile) { brandColor2 = await dominantHex(path.join(inbox, secondaryFile)); console.log(`  color2  → ${brandColor2} (secondary)`); }
  if (fontFile) console.log(`  font    → "${fontFile}" present (set fontKey from notes)`);

  // Merge into asset-overrides.json
  const json = JSON.parse(fs.readFileSync(ASSETS_JSON, "utf8"));
  json[slug] = json[slug] || {};
  if (logoPath) json[slug].logo = logoPath;
  if (photoPaths.length) json[slug].photos = photoPaths;
  if (brandColor) json[slug].brandColor = brandColor;
  if (brandColor2) json[slug].brandColor2 = brandColor2;
  fs.writeFileSync(ASSETS_JSON, JSON.stringify(json, null, 2) + "\n");

  // Best-effort: mark the business "Customized" in the CRM (Convex).
  try {
    const url = readEnv("NEXT_PUBLIC_CONVEX_URL");
    if (url) {
      const { ConvexHttpClient } = await import("convex/browser");
      const { api } = await import("../convex/_generated/api.js");
      await new ConvexHttpClient(url).mutation(api.crm.patch, { slug, patch: { buildStage: "customized" } });
      console.log("  CRM build stage → Customized");
    }
  } catch { /* non-fatal */ }

  console.log(`\n✓ ${biz.name} (${slug}) — logo:${logoPath ? "yes" : "no"}, photos:${photoPaths.length}. Wired into asset-overrides.json.`);
}

function readEnv(key) {
  try {
    for (const line of fs.readFileSync(path.join(root, ".env.local"), "utf8").split("\n")) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && m[1] === key) return m[2].trim();
    }
  } catch { /* ignore */ }
  return process.env[key];
}

run().catch((e) => { console.error(e); process.exit(1); });
