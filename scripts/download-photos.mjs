// Download each business's real Google hero photo into /public/biz-photos and
// rewrite photos[0] to the local path. Removes the runtime dependency on
// Google's CDN so the published sites load instantly.
//
//   node scripts/download-photos.mjs
import fs from "node:fs";
import path from "node:path";

const FILE = path.join(process.cwd(), "src/content/businesses.generated.ts");
const DIR = path.join(process.cwd(), "public/biz-photos");
const MARKER = "BusinessProfile[] = ";

fs.mkdirSync(DIR, { recursive: true });

function ext(ct) {
  if (!ct) return "jpg";
  if (ct.includes("webp")) return "webp";
  if (ct.includes("png")) return "png";
  return "jpg";
}

async function main() {
  const src = fs.readFileSync(FILE, "utf8");
  const head = src.slice(0, src.indexOf(MARKER) + MARKER.length);
  const arr = JSON.parse(src.slice(src.indexOf(MARKER) + MARKER.length, src.lastIndexOf(";")));

  const targets = arr.filter((b) => b.photos?.[0]?.startsWith("http"));
  console.log(`Downloading ${targets.length} hero photos → public/biz-photos …`);

  let ok = 0, fail = 0, done = 0;
  const POOL = 12;
  let idx = 0;
  async function worker() {
    while (idx < targets.length) {
      const b = targets[idx++];
      try {
        const res = await fetch(b.photos[0]);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const ct = res.headers.get("content-type") || "";
        const buf = Buffer.from(await res.arrayBuffer());
        const file = `${b.slug}.${ext(ct)}`;
        fs.writeFileSync(path.join(DIR, file), buf);
        b.photos[0] = `/biz-photos/${file}`;
        ok++;
      } catch (e) {
        // leave the original URL in place as a fallback
        fail++;
        if (fail <= 8) console.warn(`  ⚠ ${b.slug}: ${e.message}`);
      }
      if (++done % 50 === 0 || done === targets.length) console.log(`  ${done}/${targets.length} (ok ${ok}, fail ${fail})`);
    }
  }
  await Promise.all(Array.from({ length: POOL }, worker));

  fs.writeFileSync(FILE, head + JSON.stringify(arr, null, 2) + ";\n");
  console.log(`✓ Self-hosted ${ok} hero photos (fail ${fail}, left as remote URLs) → ${FILE}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
