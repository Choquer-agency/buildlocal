/**
 * Render the flyer proof HTML to PNGs at the real 6x9 print dimensions so we can
 * eyeball the styling.  node flyer/shot-proof.mjs [front|back|both]
 */
import { chromium } from "playwright";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const which = process.argv[2] || "both";
const sides = which === "both" ? ["front", "back"] : [which];

// 9.25in x 6.25in @ 96px/in = 888 x 600, rendered at 2x for clarity.
const W = 888, H = 600;
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 2 });
for (const side of sides) {
  const file = "file://" + path.join(__dirname, `proof-${side}.html`);
  await page.goto(file, { waitUntil: "networkidle" });
  await page.waitForTimeout(400);
  const out = path.join(__dirname, `_render-${side}.png`);
  await page.screenshot({ path: out, clip: { x: 0, y: 0, width: W, height: H } });
  console.log(`rendered ${side} → flyer/_render-${side}.png`);
}
await browser.close();
