/**
 * Live end-to-end verification of the batch-1 QR campaign against the deploy.
 * For every one of the 200 mailing codes, assert BOTH:
 *   1. GET /q/<code>        → 307 redirect to /p/<slug> matching the CSV's slug
 *   2. GET /m/qr/<code>.png → 200 (the printed QR image is actually served)
 * Prints a pass count and lists any failures. Exit non-zero if anything fails.
 *
 *   BASE=https://demo.buildlocal.agency node flyer/verify-live.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE = (process.env.BASE || "https://demo.buildlocal.agency").replace(/\/+$/, "");

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

const rows = parseCsv(fs.readFileSync(path.join(__dirname, "lob-batch1-2026-07-09.csv"), "utf8").trim());
const hdr = rows[0];
const ci = hdr.indexOf("metadata_qr_code"), si = hdr.indexOf("metadata_slug");
const items = rows.slice(1).map((r) => ({ code: r[ci], slug: r[si] })).filter((x) => x.code);

async function checkOne({ code, slug }) {
  const errs = [];
  // 1) redirect target
  try {
    const r = await fetch(`${BASE}/q/${code}`, { redirect: "manual" });
    const loc = r.headers.get("location") || "";
    const gotSlug = loc.replace(/^https?:\/\/[^/]+/, "").replace(/^\/p\//, "").replace(/\/$/, "");
    if (r.status < 300 || r.status >= 400) errs.push(`/q/${code} status ${r.status}`);
    if (gotSlug !== slug) errs.push(`/q/${code} → "${gotSlug}" expected "${slug}"`);
  } catch (e) { errs.push(`/q/${code} fetch failed: ${e.message}`); }
  // 2) png served
  try {
    const r = await fetch(`${BASE}/m/qr/${code}.png`, { method: "GET" });
    if (r.status !== 200) errs.push(`/m/qr/${code}.png status ${r.status}`);
  } catch (e) { errs.push(`/m/qr/${code}.png fetch failed: ${e.message}`); }
  return errs;
}

// modest concurrency
const CONC = 12;
let idx = 0, pass = 0; const failures = [];
async function worker() {
  while (idx < items.length) {
    const it = items[idx++];
    const errs = await checkOne(it);
    if (errs.length) failures.push(...errs); else pass++;
  }
}
await Promise.all(Array.from({ length: CONC }, worker));

console.log(`\nBASE: ${BASE}`);
console.log(`PASS: ${pass}/${items.length} codes  (redirect→correct site AND png served)`);
if (failures.length) {
  console.error(`\n✗ ${failures.length} problem(s):`);
  for (const f of failures.slice(0, 40)) console.error("   " + f);
  process.exit(1);
}
console.log("✓ All 200 batch-1 QR codes verified end-to-end against the live deploy.");
