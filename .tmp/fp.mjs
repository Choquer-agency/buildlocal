import { chromium } from 'playwright-core';
const b = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto('http://localhost:4500/p/ideal-air-conditioning-and-insulation', { waitUntil: 'networkidle' });
// scroll to bottom to trigger reveal animations, then back up
await p.evaluate(async () => { for (let y=0; y<document.body.scrollHeight; y+=600){ window.scrollTo(0,y); await new Promise(r=>setTimeout(r,80)); } window.scrollTo(0,0); });
await p.waitForTimeout(500);
await p.screenshot({ path: '.tmp/ideal-fp.png', fullPage: true });
await b.close();
console.log('done');
