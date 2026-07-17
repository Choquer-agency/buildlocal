# BuildLocal — 5-Pillar AZ Campaign · Team Handoff

The "500 machine": scrape Google Business Profiles → auto-build a full multi-page
website per business on the shared **Theme 1** template → mail a postcard with a
tracked QR code → scans surface in a real-time CRM → close by phone.

**Campaign = 5 trade pillars × 100 = 500 sites:** Landscaping → Roofing → HVAC →
Pool → Pest. (The original landscaping scrape has 500; only the first 100 are in
the campaign — the other 400 are "overflow", hidden in the CRM.)

## Run it locally
```bash
npm install
PORT=4500 npm run dev -- -p 4500 -H 0.0.0.0
# Sites:  http://localhost:4500/p/<slug>
# CRM:    http://localhost:4500/admin/businesses   (Basic Auth, ADMIN_PASSWORD)
```
Secrets live in `.env.local` (git-ignored — ask Bryce): `OUTSCRAPER_API_KEY`,
`GEMINI_API_KEY`, `SLACK_WEBHOOK_URL`, `ADMIN_PASSWORD`,
`NEXT_PUBLIC_CONVEX_URL` / `CONVEX_DEPLOYMENT`, `NEXT_PUBLIC_FORMSPARK_ID`,
`NEXT_PUBLIC_SCAN_BASE` / `NEXT_PUBLIC_LOCAL_BASE`.

> ⚠️ **Never run `npm run build` while `npm run dev` is running** — it corrupts
> `.next` and pages render unstyled. Fix: kill dev, `rm -rf .next`, restart.

## Data pipeline (scripts/), per trade
Each trade ("niche") is parameterized via `scripts/niches.mjs`
(`landscaping | roofing | hvac | pool | pest`; QR prefixes `az/ro/hv/pl/pc`).
```bash
node scripts/scrape-gmb.mjs   --niche=roofing --max=100 --perCity=12 --reviews=6
node scripts/normalize.mjs    --niche=roofing      # → businesses.roofing.generated.ts (qr ro0001+)
node scripts/generate-copy.mjs --niche=roofing     # unique AI copy (Gemini)
node scripts/crawl-batch.mjs 1 100 --niche=roofing # pulls each site's REAL services/about/years
```
- **Never hand-edit** `businesses*.generated.ts` — they're regenerated.
- Manual touch-ups: `src/content/business-overrides.ts` (font/video/copy) +
  `src/content/asset-overrides.json` (script-managed: logo/photos/colors/services).
- `crawl-batch` runs `extract-services.mjs` 6-wide via per-slug staging files
  (race-free), then merges once into `asset-overrides.json`. Businesses with no
  website keep the per-trade fallback catalog from `niches.mjs`.

## Key code
| Path | What |
|---|---|
| `src/content/businesses.ts` | Registry — concats all 5 generated files; campaign 500 first, overflow last |
| `src/lib/trade-copy.ts` | Per-trade UI strings (headings, why-us, area/service copy) |
| `src/lib/themes.ts` / `src/lib/crm-store.ts` | Theme assignment + CRM persistence (Convex) |
| `src/components/biz/*` | Theme 1 sections (hero, services, why-us, reviews, footer, BuildLocal promo) |
| `src/app/p/[business]/*` | The per-business multi-page site (noindex, force-dynamic) |
| `src/app/admin/businesses` | CRM — Campaign (500) vs Overflow (400) views + per-industry filter |
| `src/app/q/[code]/route.ts` | QR scan tracker → Convex + Slack ping → redirect to site |
| `convex/` | Real-time backend (crm table). `npx convex dev` / `npx convex deploy` |
| `flyer/` | Lob 6×9 postcard (front/back) + capture/audience scripts |

## Deploy
Demo sites deploy to a SEPARATE noindex Vercel project **`buildlocal-az-demos`**
(NOT the live `buildlocal.agency` / choquer-marketing project). Whole deploy is
noindex (`next.config` `X-Robots-Tag` + per-page robots). `vercel deploy --prod --yes`.

## Status (as of this branch)
- ✅ 500 campaign businesses scraped + normalized + unique AI copy
- ✅ Real-site service crawl: landscaping 97, roofing 93, hvac 93, pool 83, pest 96
- ✅ CRM campaign/overflow split + per-industry filter
- ⬜ Lob postcard sender (`scripts/send-postcards.mjs`) — needs Lob key + return address
- ⬜ Prod Convex deploy + redeploy demos with the new 400
