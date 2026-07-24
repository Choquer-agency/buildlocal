/**
 * Build the final Lob upload CSV for the pre-rendered image flyers.
 *
 *   node flyer/build-lob-csv.mjs   ->   flyer/lob-upload-batch1.csv
 *
 * One row per recipient: mailing address + hosted front/back image URLs + the
 * QR target (reference; the QR is already baked into the front & back images).
 * Upload with lob-image-front.html (front side) and lob-image-back.html (back).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const BASE = "https://demo.buildlocal.agency";
const SRC = path.join(__dirname, process.env.SRC_CSV || "lob-batch1-2026-07-09.csv");
const OUT = path.join(__dirname, process.env.OUT_CSV || "lob-upload-batch1.csv");

function parseCsv(t){const R=[];let r=[],f='',q=false;for(let i=0;i<t.length;i++){const c=t[i];if(q){if(c=='"'){if(t[i+1]=='"'){f+='"';i++;}else q=false;}else f+=c;}else if(c=='"')q=true;else if(c==','){r.push(f);f='';}else if(c=='\n'){r.push(f);R.push(r);r=[];f='';}else if(c!='\r')f+=c;}if(f.length||r.length){r.push(f);R.push(r);}return R;}
const cell=(v)=>/[",\n]/.test(String(v??''))?`"${String(v).replace(/"/g,'""')}"`:String(v??'');

const rows = parseCsv(fs.readFileSync(SRC,'utf8').trim());
const hdr = rows[0]; const c=(n)=>hdr.indexOf(n);

const headers = [
  "to.name","to.address_line1","to.address_line2","to.address_city","to.address_state","to.address_zip",
  "front_image","back_image","qr_target",
  "metadata_slug","metadata_qr_code","metadata_trade","metadata_mailable",
];

const out=[headers.join(",")];
let mailable=0, missingImg=[];
for(const r of rows.slice(1)){
  const slug=r[c('metadata_slug')]; const code=r[c('metadata_qr_code')];
  if(!slug) continue;
  const front=`${BASE}/m/flyers/${slug}-front.png`;
  const back=`${BASE}/m/flyers/${slug}-back.png`;
  // verify the images exist locally before listing them
  if(!fs.existsSync(path.join(ROOT,'public','m','flyers',`${slug}-front.png`))) missingImg.push(slug+' (front)');
  if(!fs.existsSync(path.join(ROOT,'public','m','flyers',`${slug}-back.png`))) missingImg.push(slug+' (back)');
  if(r[c('metadata_mailable')]==='yes') mailable++;
  const row={
    "to.name": r[c('name')]||r[c('business_name')],
    "to.address_line1": r[c('address_line1')]||"",
    "to.address_line2": r[c('address_line2')]||"",
    "to.address_city": r[c('address_city')]||"",
    "to.address_state": r[c('address_state')]||"AZ",
    "to.address_zip": r[c('address_zip')]||"",
    front_image: front, back_image: back,
    qr_target: `${BASE}/q/${code}`,
    metadata_slug: slug, metadata_qr_code: code,
    metadata_trade: r[c('metadata_trade')], metadata_mailable: r[c('metadata_mailable')],
  };
  out.push(headers.map(h=>cell(row[h])).join(","));
}
fs.writeFileSync(OUT, out.join("\n"));
console.log(`Wrote ${out.length-1} rows → flyer/lob-upload-batch1.csv`);
console.log(`  mailable (has address): ${mailable} | missing images: ${missingImg.length}`);
if(missingImg.length) console.log("  MISSING:", missingImg.slice(0,20).join(", "));
