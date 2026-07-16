/**
 * Batch-capture OLD screenshots of each business's live external website.
 *
 * Only businesses with a non-empty existingWebsite are processed. Output:
 *   flyer/shots/<slug>-old.jpg  (same 1440×900 format as capture.mjs VP_OLD)
 *
 *   node flyer/capture-old-all.mjs
 *   node flyer/capture-old-all.mjs --skip-existing
 *   node flyer/capture-old-all.mjs --from-csv=flyer/lob-batch1-2026-07-09.csv --skip-existing
 *
 * Failures are logged and skipped (no placeholder written). Failed rows go to
 * flyer/shots/_failed-old.txt for manual retry.
 */
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const SHOTS = path.join(__dirname, "shots");
const FAILED_FILE = path.join(SHOTS, "_failed-old.txt");

// Match flyer/capture.mjs VP_OLD — landscape above-the-fold for the mailer card.
const VP_OLD = { width: 1440, height: 900 };
const DEVICE_SCALE = 1;
const SITE_TIMEOUT_MS = 30_000;
const SETTLE_MS = 2500;

const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";

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

function loadGenerated(file) {
  const src = fs.readFileSync(path.join(ROOT, "src", "content", file), "utf8");
  const json = src.slice(src.indexOf("["), src.lastIndexOf("]") + 1);
  // eslint-disable-next-line no-eval
  return eval(json);
}

/** Landscaping-only by default; all trades when --from-csv (batch is mixed). */
function loadBusinesses() {
  if (fromCsv) {
    return [
      ...loadGenerated("businesses.generated.ts"),
      ...loadGenerated("businesses.roofing.generated.ts"),
      ...loadGenerated("businesses.hvac.generated.ts"),
      ...loadGenerated("businesses.pool.generated.ts"),
      ...loadGenerated("businesses.pest.generated.ts"),
    ];
  }
  return loadGenerated("businesses.generated.ts");
}

/** Best-effort consent dismissal — never throws; shot proceeds either way. */
async function dismissConsent(page) {
  const selectors = [
    "#onetrust-accept-btn-handler",
    "#accept-cookies",
    "#cookie-accept",
    "[data-testid='cookie-accept']",
    "button#acceptAllButton",
    ".cc-accept",
    ".cc-btn.cc-dismiss",
    ".osano-cm-accept",
    ".js-cookie-consent-agree",
    "[aria-label*='Accept' i]",
    "[aria-label*='Agree' i]",
  ];
  for (const sel of selectors) {
    try {
      const el = page.locator(sel).first();
      if (await el.isVisible({ timeout: 400 })) {
        await el.click({ timeout: 1000 }).catch(() => {});
        return;
      }
    } catch { /* try next */ }
  }
  await page.evaluate(() => {
    const kill = /^(accept|agree|ok|got it|i agree|accept all|accept cookies|allow all|consent)/i;
    const soft = /cookie|consent|gdpr|accept all|agree/i;
    const nodes = [...document.querySelectorAll("button, a, [role='button']")];
    for (const el of nodes) {
      const t = (el.textContent || "").trim();
      if (!t || t.length > 48) continue;
      if (kill.test(t) || soft.test(t)) {
        try { el.click(); return; } catch { /* ignore */ }
      }
    }
  }).catch(() => {});
}

/**
 * In-memory URL cleanup for GMB/Yext junk — does NOT mutate generated data.
 *
 * Main bug: tracking query stored as a path via encoded "?":
 *   https://www.lyonsroofing.com/%3Futm_source%3DGMB%26...
 * → truncate at "%3F" → https://www.lyonsroofing.com/
 *
 * Also strip a literal "?" when what follows looks like utm/gmb tracking.
 */
function cleanCaptureUrl(raw) {
  let url = String(raw || "").trim();
  if (!url) return url;

  // Encoded "?" — drop "%3F" and everything after (case-insensitive).
  const encIdx = url.search(/%3[Ff]/);
  if (encIdx >= 0) url = url.slice(0, encIdx);

  // Literal "?" with tracking-style params (utm_ / gmb / gbp / gclid…).
  const qIdx = url.indexOf("?");
  if (qIdx >= 0) {
    const qs = url.slice(qIdx + 1);
    if (/utm_|gclid|fbclid|gmb|gbp|yext|localfx|campaign=/i.test(qs)) {
      url = url.slice(0, qIdx);
    }
  }

  // Normalize to origin + pathname (drop hash); keep real location paths.
  try {
    const u = new URL(url);
    url = `${u.protocol}//${u.host}${u.pathname || "/"}`;
  } catch {
    /* leave as truncated string */
  }

  return url;
}

function originUrl(raw) {
  try {
    const u = new URL(raw);
    return `${u.protocol}//${u.host}/`;
  } catch {
    return null;
  }
}

async function gotoWithFallback(page, url) {
  try {
    return await page.goto(url, { waitUntil: "networkidle", timeout: SITE_TIMEOUT_MS });
  } catch {
    return await page.goto(url, { waitUntil: "domcontentloaded", timeout: SITE_TIMEOUT_MS });
  }
}

/**
 * Capture one external site → flyer/shots/<slug>-old.jpg.
 * On failure: throws (caller logs / continues). Never writes a placeholder.
 * Hard timeout closes the page so a late screenshot cannot land after a FAIL log.
 */
async function captureOld(context, slug, url) {
  const out = path.join(SHOTS, `${slug}-old.jpg`);
  const page = await context.newPage();
  let timedOut = false;
  const hardMs = SITE_TIMEOUT_MS + SETTLE_MS + 5_000;
  const timer = setTimeout(() => {
    timedOut = true;
    page.close().catch(() => {});
  }, hardMs);

  try {
    await page.setViewportSize(VP_OLD);

    const cleaned = cleanCaptureUrl(url);
    const root = originUrl(cleaned || url);

    let response;
    try {
      response = await gotoWithFallback(page, cleaned);
      if (timedOut) throw new Error(`hard timeout after ${SITE_TIMEOUT_MS}ms`);
      if (!response || response.status() >= 400) {
        throw new Error(response ? `HTTP ${response.status()}` : "no response from navigation");
      }
    } catch (firstErr) {
      // Retry once against bare origin (protocol + host + "/").
      if (!root || root === cleaned) throw firstErr;
      response = await gotoWithFallback(page, root);
      if (timedOut) throw new Error(`hard timeout after ${SITE_TIMEOUT_MS}ms`);
      if (!response) throw new Error("no response from navigation");
      const status = response.status();
      if (status >= 400) throw new Error(`HTTP ${status} (after origin retry; tried ${cleaned})`);
    }

    await page.waitForTimeout(SETTLE_MS);
    await dismissConsent(page);
    await page.waitForTimeout(400);

    if (timedOut) throw new Error(`hard timeout after ${SITE_TIMEOUT_MS}ms`);

    // Write only after a successful load — failure paths never reach here.
    await page.screenshot({
      path: out,
      clip: { x: 0, y: 0, width: VP_OLD.width, height: VP_OLD.height },
      type: "jpeg",
      quality: 82,
    });
  } catch (err) {
    if (timedOut) throw new Error(`hard timeout after ${SITE_TIMEOUT_MS}ms`);
    throw err;
  } finally {
    clearTimeout(timer);
    await page.close().catch(() => {});
  }
}

async function main() {
  fs.mkdirSync(SHOTS, { recursive: true });

  const all = loadBusinesses();
  let pool = all;
  if (fromCsv) {
    const allowed = new Set(parseCsvSlugs(fromCsv));
    pool = all.filter((b) => allowed.has(b.slug));
  }
  const targets = pool.filter((b) => b.existingWebsite && String(b.existingWebsite).trim());
  const total = targets.length;
  console.log(
    `Batch OLD capture · ${total} of ${pool.length} in scope have existingWebsite` +
      `${skipExisting ? " · --skip-existing" : ""}` +
      `${fromCsv ? ` · --from-csv=${fromCsv}` : ""}`
  );
  console.log(`Viewport ${VP_OLD.width}×${VP_OLD.height} · timeout ${SITE_TIMEOUT_MS}ms · UA desktop Chrome`);

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: VP_OLD,
    deviceScaleFactor: DEVICE_SCALE,
    userAgent: USER_AGENT,
    ignoreHTTPSErrors: true,
  });

  const failed = []; // { slug, url, reason }
  let succeeded = 0;
  let skipped = 0;

  for (let i = 0; i < targets.length; i++) {
    const b = targets[i];
    const n = i + 1;
    const slug = b.slug;
    const url = String(b.existingWebsite).trim();
    const outFile = path.join(SHOTS, `${slug}-old.jpg`);

    if (skipExisting && fs.existsSync(outFile)) {
      skipped++;
      console.log(`[${n}/${total}] ${slug} — skip (exists)`);
      continue;
    }

    try {
      await captureOld(context, slug, url);
      // Confirm file landed; if not, treat as failure (don't leave a silent gap).
      if (!fs.existsSync(outFile)) throw new Error("shot file missing after capture");
      succeeded++;
      console.log(`[${n}/${total}] ${slug} — ok`);
    } catch (err) {
      const reason = (err && err.message) ? err.message.replace(/\s+/g, " ").trim() : String(err);
      failed.push({ slug, url, reason });
      console.log(`[${n}/${total}] ${slug} — FAILED: ${reason}`);
      // Do not write a placeholder; leave any pre-existing -old.jpg untouched on failure
      // (we only screenshot to disk after a successful load).
    }
  }

  await context.close().catch(() => {});
  await browser.close().catch(() => {});

  const lines = failed.map((f) => `${f.slug}\t${f.reason}\t${f.url}`);
  fs.writeFileSync(FAILED_FILE, lines.length ? lines.join("\n") + "\n" : "");

  console.log("\n── Summary ──");
  console.log(`total processed pool: ${total}`);
  console.log(`succeeded: ${succeeded}`);
  if (skipExisting) console.log(`skipped:   ${skipped}`);
  console.log(`failed:    ${failed.length}`);
  if (failed.length) {
    console.log("failed slugs:");
    for (const f of failed) console.log(`  ${f.slug} — ${f.reason}`);
    console.log(`Wrote ${FAILED_FILE}`);
  } else {
    console.log(`Wrote empty ${FAILED_FILE}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
