import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto('http://localhost:4500/p/az-perfect-comfort-heating-and-cooling', { waitUntil: 'load', timeout: 30000 });
await p.waitForTimeout(2500);
await p.screenshot({ path: '/tmp/apc_full.png', fullPage: true });
await b.close();
console.log('done');
