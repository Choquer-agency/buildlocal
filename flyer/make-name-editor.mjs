/**
 * Generates flyer/names.html — a visual editor for all 500 business names.
 * Open it in a browser: each name is rendered in the real headline font; any
 * part that won't fit on row 1 shows RED. Edit names, then Export to write
 * flyer/name-overrides.json (build-audience.mjs picks it up automatically).
 *
 *   node flyer/make-name-editor.mjs   &&   open flyer/names.html
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { cleanName } from "./clean-name.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const src = fs.readFileSync(path.join(__dirname, "..", "src", "content", "businesses.generated.ts"), "utf8");
// eslint-disable-next-line no-eval
const data = eval(src.slice(src.indexOf("["), src.lastIndexOf("]") + 1));

const rows = data.map((b) => ({
  slug: b.slug,
  qr: b.qrCode || b.slug,
  original: b.name,
  clean: cleanName(b.name),
  hasSite: !!b.existingWebsite,
}));

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Flyer — Name Editor (500)</title>
<style>
  @font-face { font-family:'PPNM'; font-style:italic; font-weight:600; src:url('assets/fonts/ppneuemontreal-semibolditalic.otf') format('opentype'); font-display:block; }
  * { box-sizing:border-box; }
  body { margin:0; font-family:-apple-system,Segoe UI,Roboto,sans-serif; background:#1b1b1b; color:#eee; }
  header { position:sticky; top:0; background:#111; padding:14px 18px; border-bottom:1px solid #333; z-index:5; }
  header h1 { margin:0 0 6px; font-size:17px; }
  .legend { font-size:13px; color:#aaa; }
  .legend b.w { color:#fff; } .legend b.r { color:#ff5a5a; }
  .bar { margin-top:10px; display:flex; gap:8px; align-items:center; flex-wrap:wrap; }
  .bar input[type=search]{ background:#222; border:1px solid #444; color:#fff; padding:7px 10px; border-radius:6px; width:240px; }
  .bar button { background:#2a2a2a; border:1px solid #444; color:#eee; padding:7px 12px; border-radius:6px; cursor:pointer; font-size:13px; }
  .bar button.primary { background:#F2913B; border-color:#F2913B; color:#111; font-weight:700; }
  .bar button.active { background:#444; }
  .bar .stat { font-size:13px; color:#9c9; margin-left:auto; }
  table { border-collapse:collapse; width:100%; }
  th,td { padding:8px 12px; border-bottom:1px solid #2a2a2a; vertical-align:middle; text-align:left; }
  th { position:sticky; top:96px; background:#161616; font-size:12px; color:#999; z-index:4; }
  td.qr { font-family:monospace; color:#888; font-size:12px; white-space:nowrap; }
  td.orig { color:#777; font-size:12px; max-width:280px; }
  td.edit input { width:300px; background:#222; border:1px solid #444; color:#fff; padding:6px 8px; border-radius:5px; font-size:14px; }
  td.edit input.changed { border-color:#F2913B; }
  /* row-1 preview rendered in the real font; the dashed line = the right edge of row 1.
     Anything past the line (red) won't fit at full size. */
  .rowbox { position:relative; width:380px; border-right:1px dashed #666; padding-right:2px; }
  .row1 { font-family:'PPNM'; font-style:italic; font-weight:600; white-space:nowrap; line-height:1; }
  .row1 .ok { color:#fff; } .row1 .bad { color:#ff5a5a; }
  .badge { display:inline-block; min-width:46px; text-align:center; padding:2px 7px; border-radius:10px; font-size:12px; font-weight:700; }
  .b-green{ background:#1c3; color:#031; } .b-yellow{ background:#fd5; color:#420; } .b-red{ background:#f55; color:#300; }
  .nosite { color:#F2913B; font-size:11px; }
</style>
</head>
<body>
<header>
  <h1>Flyer Name Editor — 500 businesses</h1>
  <div class="legend">Row 1 preview in the real headline font. <b class="w">White</b> = fits · <b class="r">red</b> = won't fit at a good size, trim it. The badge shows the print font size (green ≥56px, yellow 44–55, red &lt;44 / overflow).</div>
  <div class="bar">
    <input type="search" id="q" placeholder="Search name / slug…">
    <button id="f-all" class="active">All</button>
    <button id="f-warn">⚠ Needs trim</button>
    <button id="f-edited">Edited</button>
    <button id="reset">Reset all</button>
    <button id="export" class="primary">⬇ Export overrides</button>
    <span class="stat" id="stat"></span>
  </div>
</header>
<table>
  <thead><tr><th>#</th><th>QR</th><th>Original (scraped)</th><th>Name on flyer</th><th>Row 1 preview</th><th>Size</th></tr></thead>
  <tbody id="tb"></tbody>
</table>

<script>
const DATA = ${JSON.stringify(rows)};
const ROW_W = 826;     // printable row width in px (~8.6in @ 96dpi)
const CAP = 78, FLOOR = 34, GOOD = 56, OKMIN = 44;
const DSCALE = 0.46;   // display scale for the preview cell
const LS = 'flyer-name-overrides-v1';
let overrides = {};
try { overrides = JSON.parse(localStorage.getItem(LS) || '{}'); } catch(e){}

const cv = document.createElement('canvas').getContext('2d');
const fontAt = px => \`italic 600 \${px}px PPNM\`;
function widthAt(text, px){ cv.font = fontAt(px); return cv.measureText(text).width; }
// largest size in [FLOOR,CAP] that fits ROW_W; <FLOOR means it overflows even floored
function fitSize(text){ const w1 = widthAt(text,100)/100; const max = ROW_W / w1; return { px: Math.max(FLOOR, Math.min(CAP, Math.floor(max))), overflow: max < FLOOR }; }
// index where text exceeds ROW_W at given px (for red split)
function cutIndex(text, px){ cv.font=fontAt(px); for(let i=1;i<=text.length;i++){ if(cv.measureText(text.slice(0,i)).width > ROW_W) return i-1; } return text.length; }

const name = r => (overrides[r.slug] ?? r.clean);
let filter = 'all', query = '';

function render(){
  const tb = document.getElementById('tb'); tb.innerHTML='';
  let shown=0, warn=0, edited=0;
  DATA.forEach((r,i)=>{
    const nm = name(r);
    const isEdited = overrides[r.slug] !== undefined && overrides[r.slug] !== r.clean;
    if(isEdited) edited++;
    const fit = fitSize(nm);
    const isWarn = fit.overflow || fit.px < OKMIN;
    if(isWarn) warn++;
    // filters
    if(filter==='warn' && !isWarn) return;
    if(filter==='edited' && !isEdited) return;
    if(query && !(nm.toLowerCase().includes(query)||r.slug.includes(query)||r.original.toLowerCase().includes(query))) return;
    shown++;

    // red split measured at the GOOD target size, so you see what overflows
    // BEFORE the headline shrinks. White = fits big; red = forces it smaller.
    const cut = cutIndex(nm, GOOD);
    const ok = nm.slice(0,cut), bad = nm.slice(cut);
    const dispPx = GOOD * DSCALE;

    const badgeCls = fit.overflow || fit.px<OKMIN ? 'b-red' : fit.px<GOOD ? 'b-yellow' : 'b-green';
    const tr = document.createElement('tr');
    tr.innerHTML = \`
      <td style="color:#666">\${i+1}</td>
      <td class="qr">\${r.qr}\${r.hasSite?'':'<br><span class=nosite>no site</span>'}</td>
      <td class="orig" title="\${r.original.replace(/"/g,'&quot;')}">\${r.original}</td>
      <td class="edit"><input data-slug="\${r.slug}" value="\${nm.replace(/"/g,'&quot;')}" class="\${isEdited?'changed':''}"></td>
      <td><div class="rowbox"><span class="row1" style="font-size:\${dispPx}px"><span class="ok">\${esc(ok)}</span><span class="bad">\${esc(bad)}</span></span></div></td>
      <td><span class="badge \${badgeCls}">\${fit.overflow?'!'+FLOOR:fit.px}px</span></td>\`;
    tb.appendChild(tr);
  });
  document.getElementById('stat').textContent = \`\${shown} shown · \${warn} need trim · \${edited} edited\`;
}
function esc(s){ return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

document.getElementById('tb').addEventListener('input', e=>{
  const slug = e.target.dataset.slug; if(!slug) return;
  const r = DATA.find(x=>x.slug===slug);
  const val = e.target.value;
  if(val === r.clean) delete overrides[slug]; else overrides[slug] = val;
  localStorage.setItem(LS, JSON.stringify(overrides));
  // live-update just this row's preview without full re-render (keep cursor)
  const tr = e.target.closest('tr');
  const fit = fitSize(val);
  const cut = cutIndex(val, GOOD); const dispPx = GOOD*DSCALE;
  const prev = tr.querySelector('.row1');
  prev.style.fontSize = dispPx+'px';
  prev.innerHTML = '<span class="ok">'+esc(val.slice(0,cut))+'</span><span class="bad">'+esc(val.slice(cut))+'</span>';
  const badge = tr.querySelector('.badge');
  badge.textContent = fit.overflow?'!'+FLOOR:fit.px+'px';
  badge.className = 'badge '+(fit.overflow||fit.px<OKMIN?'b-red':fit.px<GOOD?'b-yellow':'b-green');
  e.target.classList.toggle('changed', val!==r.clean);
});

document.getElementById('q').addEventListener('input', e=>{ query=e.target.value.toLowerCase().trim(); render(); });
for (const [id,f] of [['f-all','all'],['f-warn','warn'],['f-edited','edited']]) {
  document.getElementById(id).onclick = ()=>{ filter=f; document.querySelectorAll('.bar button').forEach(b=>b.classList.remove('active')); document.getElementById(id).classList.add('active'); render(); };
}
document.getElementById('reset').onclick = ()=>{ if(confirm('Clear ALL edits?')){ overrides={}; localStorage.removeItem(LS); render(); } };
document.getElementById('export').onclick = ()=>{
  const blob = new Blob([JSON.stringify(overrides,null,2)], {type:'application/json'});
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'name-overrides.json'; a.click();
  alert('Saved name-overrides.json to Downloads.\\nMove it into the flyer/ folder, then re-run build-audience.');
};

document.fonts.ready.then(render);
</script>
</body>
</html>`;

fs.writeFileSync(path.join(__dirname, "names.html"), html);
console.log("Wrote flyer/names.html  ·  open it:  open flyer/names.html");
