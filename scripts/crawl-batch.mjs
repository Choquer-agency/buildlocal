// Batch-crawl a range of businesses' real websites for accurate services + info.
//
//   node scripts/crawl-batch.mjs 1 100                  (az0001 … az0100)
//   node scripts/crawl-batch.mjs 1 100 --niche=roofing  (ro0001 … ro0100)
//   node scripts/crawl-batch.mjs 1 100 --niche=hvac --pool=6
//
// Runs extract-services.mjs CONCURRENTLY (each writes its own staging file →
// race-free), then merges every staging patch into asset-overrides.json once.
// Businesses with no website are skipped automatically.
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { getNiche, nicheArg } from "./niches.mjs";

const niche = getNiche(nicheArg(process.argv));
const nums = process.argv.slice(2).filter((a) => /^\d+$/.test(a));
const start = parseInt(nums[0] || "1", 10);
const end = parseInt(nums[1] || "100", 10);
const poolArg = process.argv.find((a) => a.startsWith("--pool="));
const POOL = poolArg ? parseInt(poolArg.split("=")[1], 10) : 6;

const codes = [];
for (let i = start; i <= end; i++) codes.push(niche.qrPrefix + String(i).padStart(4, "0"));

const STAGE = path.join(process.cwd(), "scripts/data/_crawl-stage");
fs.mkdirSync(STAGE, { recursive: true });
const ASSETS = path.join(process.cwd(), "src/content/asset-overrides.json");

let ok = 0, skip = 0, done = 0, idx = 0;

function run(code) {
  return new Promise((res) => {
    const p = spawn("node", ["scripts/extract-services.mjs", code], {
      cwd: process.cwd(),
      env: { ...process.env, CRAWL_STAGE: STAGE },
    });
    let out = "";
    p.stdout.on("data", (d) => (out += d));
    p.stderr.on("data", (d) => (out += d));
    p.on("close", () => {
      const good = out.includes("✓");
      if (good) ok++; else skip++;
      done++;
      const line = (out.split("\n").find((l) => l.includes("✓")) || "").trim().replace(/^✓\s*/, "");
      console.log(`[${done}/${codes.length}] ${code} — ${good ? line : "skipped (no site / fail)"}`);
      res();
    });
  });
}

async function worker() {
  while (idx < codes.length) await run(codes[idx++]);
}

console.log(`Crawling ${codes.length} ${niche.key} businesses (${codes[0]}–${codes[codes.length - 1]}) · pool=${POOL}…`);
await Promise.all(Array.from({ length: POOL }, worker));

// Merge every staging patch into asset-overrides.json (single writer, no race).
const json = JSON.parse(fs.readFileSync(ASSETS, "utf8"));
let merged = 0;
for (const f of fs.readdirSync(STAGE).filter((f) => f.endsWith(".json"))) {
  const slug = f.replace(/\.json$/, "");
  const patch = JSON.parse(fs.readFileSync(path.join(STAGE, f), "utf8"));
  const cur = json[slug] || {};
  json[slug] = { ...cur, ...patch, generatedCopy: { ...(cur.generatedCopy || {}), ...(patch.generatedCopy || {}) } };
  fs.unlinkSync(path.join(STAGE, f));
  merged++;
}
fs.writeFileSync(ASSETS, JSON.stringify(json, null, 2) + "\n");
fs.rmSync(STAGE, { recursive: true, force: true });

console.log(`\n✓ Done — ${ok} crawled, ${skip} skipped/failed · merged ${merged} into asset-overrides.json.`);
