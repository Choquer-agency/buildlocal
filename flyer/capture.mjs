/**
 * Batch-screenshot every business's OLD site + NEW site for the 6x9 mailer.
 *
 *   OLD  = business.existingWebsite            -> flyer/shots/<slug>-old.jpg
 *   NEW  = <BASE>/p/<slug>  (the site we built) -> flyer/shots/<slug>-new.jpg
 *   none = no existingWebsite                   -> uses flyer/shots/_no-website.jpg
 *
 * Crops to a clean 1200x1500 "hero" (top of page, no scroll), the right shape
 * for the tilted cards on back.html.
 *
 * Run from troker-landing/:
 *   node flyer/capture.mjs                 # everything
 *   node flyer/capture.mjs --only=new      # just the new sites (fast)
 *   node flyer/capture.mjs --only=old
 *   node flyer/capture.mjs --slug=divine-design-landscaping   # one business
 *   node flyer/capture.mjs --force         # re-shoot even if file exists
 *
 * Playwright auto-installs Chromium on first run.
 */
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SHOTS = path.join(__dirname, "shots");
fs.mkdirSync(SHOTS, { recursive: true });

// Where the BUILT sites are served right now (for the NEW screenshot). Defaults
// to the local dev server; override with NEW_BASE once they're deployed.
const BASE = process.env.NEW_BASE || process.env.NEXT_PUBLIC_PUBLISHED_BASE || "http://localhost:4500";
const CONCURRENCY = Number(process.env.SHOT_CONCURRENCY || 6);
// Capture at full desktop width (1440) so nothing on the right gets cut.
// The card aspect ratios match these exactly: NEW 4:5 portrait, OLD 16:10 landscape.
const VP_NEW = { width: 1440, height: 1800 };     // NEW = tall portrait (full desktop width)
const VP_OLD = { width: 1440, height: 900 };      // OLD = landscape above-the-fold

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, "").split("=");
    return [k, v ?? true];
  })
);

// ---- load businesses from the generated TS module (no build step needed) ----
function loadBusinesses() {
  const src = fs.readFileSync(path.join(__dirname, "..", "src", "content", "businesses.generated.ts"), "utf8");
  const json = src.slice(src.indexOf("["), src.lastIndexOf("]") + 1);
  // eslint-disable-next-line no-eval
  return eval(json);
}

let list = loadBusinesses();
if (args.slug) list = list.filter((b) => b.slug === args.slug);
console.log(`Loaded ${list.length} businesses · base ${BASE}`);

const exists = (f) => fs.existsSync(path.join(SHOTS, f));

async function shoot(page, url, outFile, vp, { settle = 2500 } = {}) {
  const out = path.join(SHOTS, outFile);
  if (!args.force && fs.existsSync(out)) return "skip";
  await page.setViewportSize(vp);
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
  } catch {
    try { await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 }); }
    catch { return "fail"; }
  }
  await page.waitForTimeout(settle);
  // try to dismiss obvious cookie/consent overlays on old sites
  await page.evaluate(() => {
    const kill = /cookie|consent|gdpr|accept/i;
    document.querySelectorAll("button,a").forEach((el) => {
      if (kill.test(el.textContent || "")) try { el.click(); } catch {}
    });
  }).catch(() => {});
  // full-viewport-width capture (no horizontal crop) at the card's aspect ratio
  await page.screenshot({
    path: out,
    clip: { x: 0, y: 0, width: vp.width, height: vp.height },
    type: "jpeg",
    quality: 82,
  });
  return "ok";
}

// generate a clean "no website" placeholder (OLD slot -> landscape) for the 78
async function makePlaceholder(page) {
  const out = "_no-website.jpg";
  if (!args.force && exists(out)) return;
  await page.setContent(`
    <div style="width:${VP_OLD.width}px;height:${VP_OLD.height}px;display:flex;flex-direction:column;
      align-items:center;justify-content:center;background:#1a1a1a;color:#fff;
      font-family:Arial,sans-serif;text-align:center;gap:18px;">
      <div style="font-size:90px">🔍</div>
      <div style="font-size:60px;font-weight:800;line-height:1.05">No website found</div>
      <div style="font-size:32px;color:#F2913B;font-weight:700">(yet)</div>
    </div>`);
  await page.screenshot({ path: path.join(SHOTS, out), clip: { x: 0, y: 0, ...VP_OLD }, type: "jpeg", quality: 90 });
  console.log("· placeholder _no-website.jpg ready");
}

async function run() {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: VP_NEW, deviceScaleFactor: 1, ignoreHTTPSErrors: true });

  const ph = await ctx.newPage();
  await makePlaceholder(ph);
  await ph.close();

  // build the work queue
  const jobs = [];
  for (const b of list) {
    if (args.only !== "new" && b.existingWebsite) {
      jobs.push({ url: b.existingWebsite, file: `${b.slug}-old.jpg`, kind: "old", slug: b.slug, vp: VP_OLD });
    }
    if (args.only !== "old") {
      jobs.push({ url: `${BASE}/p/${b.slug}`, file: `${b.slug}-new.jpg`, kind: "new", slug: b.slug, vp: VP_NEW });
    }
  }

  let done = 0, ok = 0, fail = 0, skip = 0;
  const fails = [];
  async function worker() {
    const page = await ctx.newPage();
    while (jobs.length) {
      const j = jobs.shift();
      const r = await shoot(page, j.url, j.file, j.vp);
      done++;
      if (r === "ok") ok++; else if (r === "skip") skip++; else { fail++; fails.push(`${j.kind} ${j.slug} ${j.url}`); }
      if (done % 20 === 0 || !jobs.length) process.stdout.write(`\r  ${done} done · ${ok} ok · ${skip} skip · ${fail} fail   `);
    }
    await page.close();
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  await browser.close();

  console.log(`\nDone. ${ok} captured, ${skip} skipped, ${fail} failed.`);
  if (fails.length) {
    fs.writeFileSync(path.join(__dirname, "capture-failures.txt"), fails.join("\n"));
    console.log(`Failures logged to flyer/capture-failures.txt (re-run, or they'll fall back to placeholder).`);
  }
}

run().catch((e) => { console.error(e); process.exit(1); });
