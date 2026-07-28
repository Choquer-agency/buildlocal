import { Metadata } from "next";
import { businessMap } from "@/content/businesses";
import { getRecords } from "@/lib/crm-store";
import { CrmTable, CrmRow } from "@/components/admin/CrmTable";
import { ConvexClientProvider } from "@/components/admin/ConvexClientProvider";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "BuildLocal CRM — Scraped Businesses",
  robots: { index: false, follow: false },
};

const PUBLISHED_BASE = process.env.NEXT_PUBLIC_PUBLISHED_BASE || "https://buildlocal.agency";
// Phones scan this base (LAN IP while local; the published domain once deployed).
const SCAN_BASE = process.env.NEXT_PUBLIC_SCAN_BASE || PUBLISHED_BASE;
// Stable base for links you CLICK on this Mac (localhost survives IP changes).
const LOCAL_BASE = process.env.NEXT_PUBLIC_LOCAL_BASE || "http://localhost:4500";

// Campaign = the 5 pillars × 100 (qr codes az/ro/hv/pl/pc 0001–0100). Everything
// else (overflow landscaping az0101–az0500 + the demo seed) is hidden in a
// separate view.
const PILLAR_ORDER: Record<string, number> = { landscaping: 0, roofing: 1, hvac: 2, pool: 3, pest: 4 };
const qrNum = (b: { qrCode?: string }) => {
  const m = (b.qrCode || "").match(/(\d{4})$/);
  return m ? parseInt(m[1], 10) : 9999;
};
const tradeOf = (b: { trade?: string }) => b.trade || "landscaping";
const isCampaign = (b: { qrCode?: string }) => /^[a-z]{2}\d{4}$/.test(b.qrCode || "") && qrNum(b) <= 100;
// First Campaign = Batch 1, the Lob mail drop of 2026-07-09: the first 40 of each
// pillar (qr xx0001–xx0040). Exactly matches flyer/lob-batch1-2026-07-09.csv (200).
const isFirstCampaign = (b: { qrCode?: string }) => /^[a-z]{2}\d{4}$/.test(b.qrCode || "") && qrNum(b) <= 40;

export default async function CrmPage() {
  // Campaign first (grouped by pillar, then number), then overflow by number.
  const businesses = Object.values(businessMap).sort((a, b) => {
    const ca = isCampaign(a), cb = isCampaign(b);
    if (ca !== cb) return ca ? -1 : 1;
    if (ca) {
      const p = PILLAR_ORDER[tradeOf(a)] - PILLAR_ORDER[tradeOf(b)];
      if (p !== 0) return p;
    }
    return qrNum(a) - qrNum(b);
  });
  const records = await getRecords(businesses.map((b) => b.slug));

  // Everything before go-live was internal QR testing — those scans/statuses are
  // noise. Ignore any scan older than SCAN_CUTOFF so the CRM starts clean; real
  // scans (from mailed postcards) land after this date and show normally.
  const SCAN_CUTOFF = process.env.NEXT_PUBLIC_SCAN_CUTOFF || "2026-07-28T00:00:00.000Z";
  for (const rec of Object.values(records)) {
    const realScans = (rec.scans || []).filter((ts) => ts >= SCAN_CUTOFF);
    rec.scans = realScans;
    // a status of "scanned" was derived from a (now-filtered) test scan → reset it
    if (realScans.length === 0 && rec.status === "scanned") rec.status = "new";
    if (rec.activity) rec.activity = rec.activity.filter((a) => a.ts >= SCAN_CUTOFF);
  }

  const rows: CrmRow[] = businesses.map((b) => ({
    campaign: isCampaign(b),
    firstCampaign: isFirstCampaign(b),
    trade: b.trade || "landscaping",
    slug: b.slug,
    name: b.name,
    owner: b.owner,
    ownerLink: b.ownerLink,
    phone: b.phone,
    email: b.email,
    locality: b.address.locality,
    street: b.address.street,
    existingWebsite: b.existingWebsite,
    rating: b.rating,
    reviewCount: b.reviewCount,
    photosCount: b.photosCount,
    categories: b.categories,
    themeId: b.themeId,
    qrCode: b.qrCode || b.slug,
    placeId: b.placeId,
    googleMapsUrl: b.googleMapsUrl,
    reviewsLink: b.reviewsLink,
    verified: b.verified,
    // Clicked on this Mac → localhost (stable). Scanned by phone → LAN IP.
    siteUrl: `${LOCAL_BASE}/p/${b.slug}`,
    qrTarget: `${SCAN_BASE}/q/${b.qrCode || b.slug}`,
    record: records[b.slug],
  }));

  return (
    <ConvexClientProvider>
      <CrmTable rows={rows} publishedBase={PUBLISHED_BASE} />
    </ConvexClientProvider>
  );
}
