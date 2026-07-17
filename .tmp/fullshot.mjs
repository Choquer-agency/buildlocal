import { chromium } from 'playwright-core';
import sharp from 'sharp';
const b = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto('http://localhost:4500/p/ac-repair-near-me-of-scottsdale', { waitUntil: 'networkidle' });
await p.screenshot({ path: '.tmp/fp.png', fullPage: true });
await b.close();
const meta = await sharp('.tmp/fp.png').metadata();
console.log('full size', meta.width, meta.height);
// slice into bands of ~1300px tall after the hero
const band = 1300;
let y = 900, i = 1;
while (y < meta.height) {
  const h = Math.min(band, meta.height - y);
  await sharp('.tmp/fp.png').extract({ left:0, top:y, width:meta.width, height:h }).toFile(`.tmp/band${i}.png`);
  console.log('band', i, 'y', y, 'h', h);
  y += h; i++;
}
