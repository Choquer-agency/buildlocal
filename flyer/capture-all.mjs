/**
 * Batch-run NEW screenshot captures for every business — one at a time.
 *
 * Reuses flyer/capture.mjs (does not reimplement Playwright logic).
 *
 *   NEW_BASE=http://localhost:4500 node flyer/capture-all.mjs
 *   NEW_BASE=http://localhost:4500 node flyer/capture-all.mjs --skip-existing
 *   NEW_BASE=http://localhost:4500 node flyer/capture-all.mjs --from-csv=flyer/lob-batch1-2026-07-09.csv --skip-existing
 *
 * Failures are logged and skipped; the batch never aborts. Failed slugs are
 * written to flyer/shots/_failed.txt for a later re-run.
 */
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const SHOTS = path.join(__dirname, "shots");
const FAILED_FILE = path.join(SHOTS, "_failed.txt");
const CAPTURE = path.join(__dirname, "capture.mjs");

const NEW_BASE = process.env.NEW_BASE || "http://localhost:4500";
const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, "").split("=");
    return [k, v ?? true];
  })
);
const skipExisting = Boolean(args["skip-existing"]);
const fromCsv = typeof args["from-csv"] === "string" ? args["from-csv"] : null;

function parseCsvSlugs(filePath) {
  const abs = path.isAbsolute(filePath) ? filePath : path.join(ROOT, filePath);
  if (!fs.existsSync(abs)) throw new Error(`CSV not found: ${abs}`);
  const lines = fs.readFileSync(abs, "utf8").trim().split(/\r?\n/);
  if (!lines.length) return [];

  const parseRow = (line) => {
    const cells = [];
    let cur = "", inQ = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (c === '"') { inQ = !inQ; continue; }
      if (c === "," && !inQ) { cells.push(cur); cur = ""; continue; }
      cur += c;
    }
    cells.push(cur);
    return cells;
  };

  const cols = parseRow(lines[0]).map((s) => s.trim());
  let slugIdx = cols.indexOf("metadata_slug");
  if (slugIdx < 0) slugIdx = cols.indexOf("slug");
  if (slugIdx < 0) throw new Error(`CSV missing metadata_slug/slug column: ${abs}`);

  const seen = new Set();
  const slugs = [];
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    const slug = (parseRow(lines[i])[slugIdx] || "").trim();
    if (!slug || seen.has(slug)) continue;
    seen.add(slug);
    slugs.push(slug);
  }
  return slugs;
}

function loadSlugs() {
  if (fromCsv) return parseCsvSlugs(fromCsv);

  const src = fs.readFileSync(
    path.join(ROOT, "src", "content", "businesses.generated.ts"),
    "utf8"
  );
  const json = src.slice(src.indexOf("["), src.lastIndexOf("]") + 1);
  // eslint-disable-next-line no-eval
  const list = eval(json);
  return list.map((b) => b.slug);
}

function runCapture(slug) {
  return new Promise((resolve) => {
    const child = spawn(
      process.execPath,
      [CAPTURE, `--slug=${slug}`, "--only=new", "--force"],
      {
        cwd: ROOT,
        env: { ...process.env, NEW_BASE },
        stdio: ["ignore", "pipe", "pipe"],
      }
    );
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (d) => { stdout += d; });
    child.stderr.on("data", (d) => { stderr += d; });
    child.on("error", (err) => {
      resolve({ ok: false, reason: err.message });
    });
    child.on("close", (code) => {
      if (code === 0) {
        const outFile = path.join(SHOTS, `${slug}-new.jpg`);
        if (fs.existsSync(outFile)) resolve({ ok: true });
        else resolve({ ok: false, reason: "exit 0 but shot file missing" });
      } else {
        const detail = (stderr || stdout).trim().split("\n").filter(Boolean).pop() || `exit ${code}`;
        resolve({ ok: false, reason: detail });
      }
    });
  });
}

async function main() {
  fs.mkdirSync(SHOTS, { recursive: true });
  const slugs = loadSlugs();
  const total = slugs.length;
  console.log(
    `Batch NEW capture · ${total} businesses · NEW_BASE=${NEW_BASE}` +
      `${skipExisting ? " · --skip-existing" : ""}` +
      `${fromCsv ? ` · --from-csv=${fromCsv}` : ""}`
  );

  const failed = [];
  let succeeded = 0;
  let skipped = 0;

  for (let i = 0; i < slugs.length; i++) {
    const slug = slugs[i];
    const n = i + 1;
    const outFile = path.join(SHOTS, `${slug}-new.jpg`);

    if (skipExisting && fs.existsSync(outFile)) {
      skipped++;
      console.log(`[${n}/${total}] ${slug} — skip (exists)`);
      continue;
    }

    const result = await runCapture(slug);
    if (result.ok) {
      succeeded++;
      console.log(`[${n}/${total}] ${slug} — ok`);
    } else {
      failed.push(slug);
      console.log(`[${n}/${total}] ${slug} — FAILED: ${result.reason}`);
    }
  }

  fs.writeFileSync(FAILED_FILE, failed.length ? failed.join("\n") + "\n" : "");

  console.log("\n── Summary ──");
  console.log(`total:     ${total}`);
  console.log(`succeeded: ${succeeded}`);
  if (skipExisting) console.log(`skipped:   ${skipped}`);
  console.log(`failed:    ${failed.length}`);
  if (failed.length) {
    console.log("failed slugs:");
    for (const s of failed) console.log(`  ${s}`);
    console.log(`Wrote ${FAILED_FILE}`);
  } else {
    console.log(`Wrote empty ${FAILED_FILE}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
