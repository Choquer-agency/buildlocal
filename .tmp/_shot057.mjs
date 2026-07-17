import puppeteer from "puppeteer";
const b = await puppeteer.launch({ headless: "new", args:["--no-sandbox"] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 900 });
await p.goto("http://localhost:4500/p/ultimate-roofing-scottsdale", { waitUntil: "networkidle0", timeout: 60000 });
await new Promise(r=>setTimeout(r,1500));
await p.screenshot({ path: ".tmp/057-hero.png" });
// scroll to services
await p.evaluate(()=>window.scrollTo(0, window.innerHeight*1.15));
await new Promise(r=>setTimeout(r,1200));
await p.screenshot({ path: ".tmp/057-services.png" });
await b.close();
console.log("done");
