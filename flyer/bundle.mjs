/**
 * Make the flyer HTML self-contained for Lob: inline the fonts + local SVGs as
 * base64 data URIs so Lob's renderer (no local file access) renders them exactly
 * like the browser preview. Merge variables ({{...}}) and the remote QR /
 * screenshot URLs are left untouched.
 *
 *   node flyer/bundle.mjs   ->   flyer/dist/front.html  +  flyer/dist/back.html
 *
 * Upload flyer/dist/front.html and flyer/dist/back.html to Lob.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, "dist");
fs.mkdirSync(distDir, { recursive: true });

const MIME = { ".otf": "font/otf", ".ttf": "font/ttf", ".svg": "image/svg+xml" };
function dataUri(rel) {
  const ext = path.extname(rel).toLowerCase();
  const buf = fs.readFileSync(path.join(__dirname, rel));
  return `data:${MIME[ext]};base64,${buf.toString("base64")}`;
}

for (const side of ["front", "back"]) {
  let html = fs.readFileSync(path.join(__dirname, `${side}.html`), "utf8");
  html = html.replace(/url\('(assets\/fonts\/[^']+)'\)/g, (_, p) => `url(${dataUri(p)})`);
  html = html.replace(/src="(assets\/[^"]+\.svg)"/g, (_, p) => `src="${dataUri(p)}"`);
  const out = path.join(distDir, `${side}.html`);
  fs.writeFileSync(out, html);
  console.log(`${side}.html -> dist/${side}.html  (${(html.length / 1024).toFixed(0)} KB)`);
}
console.log("\nUpload flyer/dist/front.html + flyer/dist/back.html to Lob.");
