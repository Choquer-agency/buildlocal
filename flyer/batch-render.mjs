/**
 * Batch-render all 200 flyers (front + back) as print-res images with each
 * business's own name, fresh rebranded screenshot, and baked-in QR.
 *
 *   node flyer/batch-render.mjs            # all rows in lob-batch1 CSV
 *   node flyer/batch-render.mjs --limit=3  # first N (smoke test)
 *
 * Per business:
 *   1. capture NEW-site screenshot from localhost:7790/p/<slug> (current, rebranded)
 *      → public/m/<slug>-new.jpg  (1440x1800 portrait, matches the back template)
 *   2. render FRONT → public/m/flyers/<slug>-front.png  (name + baked QR)
 *   3. render BACK  → public/m/flyers/<slug>-back.png    (old→new + baked QR)
 * Fonts/logo/peace/QR/screenshots are all inlined so nothing is fetched at print.
 */
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import QRCode from "qrcode";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const BASE = "https://demo.buildlocal.agency";     // what the QR encodes
const DEV = "http://localhost:7790";               // where we capture rebranded sites
const OUT_FLYERS = path.join(ROOT, "public", "m", "flyers");
const OUT_SHOTS = path.join(ROOT, "public", "m");
fs.mkdirSync(OUT_FLYERS, { recursive: true });

const args = Object.fromEntries(process.argv.slice(2).map((a) => { const [k,v]=a.replace(/^--/,'').split('='); return [k, v??true]; }));
const LIMIT = args.limit ? parseInt(args.limit,10) : Infinity;
const NO_CAPTURE = !!args['no-capture'];              // reuse existing new.jpg
const SIDES = args.side ? [args.side] : ['front','back'];  // --side=back to re-render only backs
const ONLY = args.slug ? String(args.slug) : null;

// ── CSV ──
function parseCsv(txt){const R=[];let r=[],f='',q=false;for(let i=0;i<txt.length;i++){const c=txt[i];if(q){if(c=='"'){if(txt[i+1]=='"'){f+='"';i++;}else q=false;}else f+=c;}else if(c=='"')q=true;else if(c==','){r.push(f);f='';}else if(c=='\n'){r.push(f);R.push(r);r=[];f='';}else if(c!='\r')f+=c;}if(f.length||r.length){r.push(f);R.push(r);}return R;}
const rows = parseCsv(fs.readFileSync(path.join(__dirname,'lob-batch1-2026-07-09.csv'),'utf8').trim());
const hdr = rows[0]; const col=(n)=>hdr.indexOf(n);
const SKIP = !!args['skip-existing'];
const both = (slug)=>fs.existsSync(path.join(OUT_FLYERS,`${slug}-front.png`)) && fs.existsSync(path.join(OUT_FLYERS,`${slug}-back.png`));
const biz = rows.slice(1).map(r=>({
  slug:r[col('metadata_slug')], code:r[col('metadata_qr_code')],
  name:r[col('business_name')], deserves:r[col('deserves_line')], font:r[col('headline_font')],
  hasOld: !!r[col('old_shot_url')],
})).filter(b=>b.slug).filter(b=>!(SKIP && both(b.slug))).slice(0, LIMIT);
console.log(`rendering ${biz.length} businesses${SKIP?' (skip-existing on)':''}`);

// ── inline assets ──
const MIME={'.otf':'font/otf','.ttf':'font/ttf','.svg':'image/svg+xml','.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png','.webp':'image/webp'};
const uri=(abs)=>`data:${MIME[path.extname(abs).toLowerCase()]};base64,${fs.readFileSync(abs).toString('base64')}`;
const asset=(rel)=>uri(path.join(__dirname,rel));
function shot(name){ for(const d of [OUT_SHOTS, path.join(__dirname,'shots')]){ const p=path.join(d,name); if(fs.existsSync(p)) return uri(p);} return null; }
async function qrUri(code){ const svg=await QRCode.toString(`${BASE}/q/${code}`,{type:'svg',errorCorrectionLevel:'H',margin:1}); return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`; }

const frontTpl=fs.readFileSync(path.join(__dirname,'front.html'),'utf8');
const backTpl=fs.readFileSync(path.join(__dirname,'back.html'),'utf8');
function inlineAssets(html){
  return html
    .replace(/url\('(assets\/fonts\/[^']+)'\)/g,(_,p)=>`url(${asset(p)})`)
    .replace(/src="(assets\/[^"]+\.svg)"/g,(_,p)=>`src="${asset(p)}"`);
}
function fill(html,vars){ return html.replace(/{{\s*(\w+)\s*}}/g,(_,k)=>vars[k]??`{{${k}}}`); }

const W=888,H=600,DSF=3.125;
const noWebsite = shot('_no-website.jpg')||'';

const browser=await chromium.launch();
const capPage=await browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1,ignoreHTTPSErrors:true}).then(c=>c.newPage());
const flyerPage=await browser.newContext({viewport:{width:W,height:H},deviceScaleFactor:DSF}).then(c=>c.newPage());

let done=0, failed=[];
for(const b of biz){
  try{
    if(ONLY && b.slug!==ONLY) continue;
    // 1) fresh NEW-site screenshot (portrait 1440x1800 from the top of the rebranded site)
    if(!NO_CAPTURE) try{
      await capPage.setViewportSize({width:1440,height:900});
      await capPage.goto(`${DEV}/p/${b.slug}`,{waitUntil:'networkidle',timeout:30000});
      await capPage.waitForTimeout(1800);
      await capPage.screenshot({path:path.join(OUT_SHOTS,`${b.slug}-new.jpg`),clip:{x:0,y:0,width:1440,height:1800},type:'jpeg',quality:88});
    }catch(e){ /* keep any existing new.jpg */ }

    const qr=await qrUri(b.code);
    const vars={ business_name:b.name, deserves_line:b.deserves, headline_font:b.font, qr_image_url:qr,
      old_shot_url:(b.hasOld && shot(`${b.slug}-old.jpg`))||noWebsite, new_shot_url:shot(`${b.slug}-new.jpg`)||'' };

    const tpls={front:frontTpl,back:backTpl};
    for(const side of SIDES){ const tpl=tpls[side];
      const html=fill(inlineAssets(tpl),vars);
      const tmp=path.join(__dirname,`_bf-${side}.html`); fs.writeFileSync(tmp,html);
      await flyerPage.goto('file://'+tmp,{waitUntil:'networkidle',timeout:30000});
      await flyerPage.waitForTimeout(300);
      await flyerPage.screenshot({path:path.join(OUT_FLYERS,`${b.slug}-${side}.png`),clip:{x:0,y:0,width:W,height:H}});
      fs.unlinkSync(tmp);
    }
    done++;
    if(done%10===0) console.log(`  ${done}/${biz.length}…`);
  }catch(e){ failed.push(b.slug+': '+e.message); }
}
await browser.close();
console.log(`\nDONE: ${done}/${biz.length} rendered → public/m/flyers/<slug>-{front,back}.png`);
if(failed.length){ console.log(`FAILED ${failed.length}:`); failed.slice(0,20).forEach(f=>console.log('  '+f)); }
