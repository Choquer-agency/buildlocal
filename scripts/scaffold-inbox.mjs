// Create the local _inbox/ working folders — one per business, named
// "<qrCode> — <Business Name>" — so you can drop logo/color/photos into each
// and then run: node scripts/process-assets.mjs <qrCode>
//
//   node scripts/scaffold-inbox.mjs            # all businesses (every generated file)
//   node scripts/scaffold-inbox.mjs landscaping  # just the main landscaping list (az####)
//
// Safe to re-run: existing folders are left untouched (never overwrites assets).
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const only = process.argv[2]; // optional filter: "landscaping" | "hvac" | "pool" | "roofing" | "pest"

const FILES = {
  landscaping: "src/content/businesses.generated.ts",
  hvac: "src/content/businesses.hvac.generated.ts",
  pool: "src/content/businesses.pool.generated.ts",
  roofing: "src/content/businesses.roofing.generated.ts",
  pest: "src/content/businesses.pest.generated.ts",
};

function load(file) {
  const src = fs.readFileSync(path.join(root, file), "utf8");
  const M = "BusinessProfile[] = ";
  return JSON.parse(src.slice(src.indexOf(M) + M.length, src.lastIndexOf(";")));
}

const inboxRoot = path.join(root, "_inbox");
fs.mkdirSync(inboxRoot, { recursive: true });

// A short README so the file-naming rules are always at hand.
fs.writeFileSync(
  path.join(inboxRoot, "README.txt"),
  [
    "Drop assets into the matching <code> folder, then process it:",
    "    node scripts/process-assets.mjs az0003",
    "",
    "File naming inside each folder:",
    "  logo*            -> the logo (e.g. logo.png, logo.svg)",
    "  *color*          -> primary brand color screenshot/swatch",
    "  *secondary color*-> secondary brand color screenshot/swatch",
    "  *font*           -> font reference (optional)",
    "  everything else  -> photos (p1.webp, p2.webp, ... in name order)",
    "",
    "This whole folder is gitignored — it never gets committed.",
  ].join("\n") + "\n"
);

const entries = only ? [FILES[only]].filter(Boolean) : Object.values(FILES);
if (only && entries.length === 0) {
  console.error(`Unknown filter "${only}". Use one of: ${Object.keys(FILES).join(", ")}`);
  process.exit(1);
}

let created = 0, skipped = 0;
for (const file of entries) {
  for (const b of load(file)) {
    const safeName = (b.name || b.slug).replace(/[\/\\:]/g, "-").trim();
    const dir = path.join(inboxRoot, `${b.qrCode} - ${safeName}`);
    if (fs.existsSync(dir)) { skipped++; continue; }
    fs.mkdirSync(dir, { recursive: true });
    created++;
  }
}

console.log(`✓ _inbox ready — ${created} folders created, ${skipped} already existed.`);
console.log(`  Location: ${inboxRoot}`);
