import { chromium } from "playwright";
const b = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await p.goto("http://localhost:4500/p/ground-zero-plumbing-ac-and-electrical-chandler", { waitUntil: "networkidle", timeout: 60000 });
await p.waitForTimeout(1200);
await p.screenshot({ path: ".tmp/gz-fp.png", fullPage: true });
const h = await p.evaluate(() => document.body.scrollHeight);
console.log("fullpage h", h);
await b.close();
