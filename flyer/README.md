# Build Local — 6×9 Direct Mail Flyer (Lob)

Two HTML postcard sides + scripts to fill them for all 500 businesses.

| File | What it is |
|---|---|
| `front.html` | **Address side** — orange, "{name} deserves a better website" (PP Neue Montreal), Scan-to-see-yours + QR. Has the blank ink-free zone Lob prints the address/postage into. |
| `back.html` | **Before/after side** — white, "Scan to see your new website!", Old → New screenshots with arrow, QR call-to-action. |
| `clean-name.mjs` | Shared name cleaner + headline-size fitter. |
| `name-overrides.json` | Manual name fixes (slug→name) from the editor; wins over the cleaner. |
| `make-name-editor.mjs` | Builds `names.html` — visual editor for all 500 names (red = overflow). |
| `capture.mjs` | Screenshots every old + new site (Playwright, full desktop width). |
| `build-audience.mjs` | Generates `lob-audience.csv` with every merge variable filled. |
| `preview.mjs` | Fills the HTML with one real business to eyeball in a browser. |
| `bundle.mjs` | Inlines fonts + SVGs as base64 → **`dist/front.html` + `dist/back.html`** (upload these to Lob). |

### Merge variables (Lob `{{...}}` syntax)
`{{business_name}}` · `{{deserves_line}}` · `{{headline_font}}` · `{{qr_image_url}}` · `{{old_shot_url}}` · `{{new_shot_url}}`
Plus the recipient (`to.name`, `to.address_line1`, …) which Lob auto-prints into the ink-free zone on the address side.
`deserves_line` = "deserves a better" (has website) or "deserves a" (no website). `headline_font` auto-sizes the front headline per name.

The QR points at `https://buildlocal.agency/q/<qrCode>` — your existing `/q/[code]` route logs the scan, pings Slack, and redirects to `/p/<slug>`. So every scan is tracked per business.

---

## Workflow

Run everything from the `troker-landing/` directory.

**0. Review names** (optional — already done once, 74 overrides saved)
```bash
node flyer/make-name-editor.mjs && open flyer/names.html
# edit names, Export -> move name-overrides.json into flyer/
```

**1. Capture screenshots** (old sites + the new sites you built)
```bash
npm i -D playwright          # first time only
node flyer/capture.mjs       # ~1000 shots; uses 6 parallel browsers
# NEW sites must be reachable: set NEW_BASE, e.g.
# PORT=4500 npm run dev   then   NEW_BASE=http://localhost:4500 node flyer/capture.mjs
```
Output lands in `flyer/shots/<slug>-old.jpg` and `<slug>-new.jpg`. The 78 businesses
with no existing site automatically use `_no-website.jpg`. Failures are logged to
`flyer/capture-failures.txt` — re-run to retry, or they fall back to the placeholder.

**2. Host the screenshots** so Lob can fetch them at print time. Easiest:
```bash
mkdir -p public/m && cp flyer/shots/*.jpg public/m/    # served at buildlocal.agency/m/...
# then deploy buildlocal.agency
```
(Off-repo alternative: upload `flyer/shots/*` to Vercel Blob and run
`node flyer/build-audience.mjs --host=blob` with `SHOT_BASE` set to your Blob base.)

**3. Build the audience CSV**
```bash
node flyer/build-audience.mjs --mailing=mailing-list.csv
```
`mailing-list.csv` is your real mailing list with columns:
`slug,name,line1,line2,city,state,zip` (joined by slug). Without it the rows are
written but `to.address_line1` is blank — **Lob can't mail without street addresses.**

**4. Bundle for Lob** (inline fonts + SVGs as base64)
```bash
node flyer/bundle.mjs    # -> flyer/dist/front.html + flyer/dist/back.html
```

**5. Upload to Lob**
- Campaign → upload **`flyer/dist/front.html`** (address side) and **`flyer/dist/back.html`**.
- Upload `flyer/lob-audience.csv` as the audience.
- Lob maps `{{...}}` columns automatically.

### Preview before you send
```bash
node flyer/preview.mjs --slug=divine-design-landscaping
open flyer/_preview-front.html flyer/_preview-back.html
```

---

## Notes / decisions
- **6×9 full bleed** = 9.25×6.25in. Safe area 8.875×5.875in. Ink-free zone (address side)
  is the blank white 4×2.375in bottom-right — **don't put art there.**
- **QR** defaults to the free qrserver.com API (zero infra). For 100% print-time
  reliability with no external dependency, bake local PNGs and pass `--bake-qr`.
- **Fonts**: Archivo (headline) + Space Mono (kickers), loaded from Google Fonts.
- **No-website businesses (78)**: get the `_no-website.jpg` "No website found (yet)"
  card as their Old image — which is actually a *stronger* pitch. Consider mailing
  those a front-only variant, or filter them: they're flagged in the build output.
