import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Phone, MapPin, ExternalLink, Star, AlertTriangle, TrendingDown, ArrowLeft } from "lucide-react";
import { businessMap } from "@/content/businesses";
import { getRecord } from "@/lib/crm-store";
import { statusMeta } from "@/lib/crm-types";
import { getOrBuildIntel, opportunityTotals, seedKeywordFor, type ProspectIntel } from "@/lib/prospect-intel";
import { TrafficChart } from "@/components/admin/TrafficChart";
import { RefreshIntel } from "@/components/admin/RefreshIntel";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Prospect brief",
  robots: { index: false, follow: false },
};

const PUBLISHED_BASE = process.env.NEXT_PUBLIC_PUBLISHED_BASE || "https://buildlocal.agency";

const card = "rounded-lg border border-dark/10 bg-white";
const th = "py-2 px-3 text-left font-normal text-dark/45 font-mono text-[11px] uppercase tracking-wider";
const td = "py-2 px-3 align-middle";

function relTime(iso?: string) {
  if (!iso) return "never";
  const h = (Date.now() - new Date(iso).getTime()) / 3_600_000;
  if (h < 1) return `${Math.max(1, Math.round(h * 60))}m ago`;
  if (h < 48) return `${Math.round(h)}h ago`;
  return `${Math.round(h / 24)}d ago`;
}

/** Position → how it reads on a call. */
function posBadge(position: number | null, localPack = false) {
  if (position === null) return { text: "not ranking", cls: "bg-dark/8 text-dark/55" };
  if (localPack) return { text: `#${position} map`, cls: "bg-bg-green/35 text-[#15803d]" };
  if (position <= 3) return { text: `#${position}`, cls: "bg-bg-green/35 text-[#15803d]" };
  if (position <= 10) return { text: `#${position}`, cls: "bg-bg-yellow/45 text-[#b45309]" };
  if (position <= 20) return { text: `#${position} · pg 2`, cls: "bg-bg-orange/45 text-[#b45309]" };
  return { text: `#${position} · pg ${Math.ceil(position / 10)}`, cls: "bg-bg-red/25 text-[#b91c1c]" };
}

function StatTile({ label, value, sub, tone }: { label: string; value: string; sub?: string; tone?: "bad" | "good" }) {
  return (
    <div className={`${card} px-4 py-3`}>
      <p className="font-mono text-[11px] uppercase tracking-wider text-dark/45">{label}</p>
      <p
        className={`font-sans text-3xl leading-tight mt-1 ${
          tone === "bad" ? "text-[#b91c1c]" : tone === "good" ? "text-[#15803d]" : "text-dark"
        }`}
      >
        {value}
      </p>
      {sub && <p className="text-xs text-dark/50 mt-0.5">{sub}</p>}
    </div>
  );
}

export default async function ProspectBriefPage({ params }: { params: { slug: string } }) {
  const b = businessMap[params.slug];
  if (!b) notFound();

  const [record, intel] = await Promise.all([
    getRecord(params.slug),
    getOrBuildIntel({
      slug: params.slug,
      name: b.name,
      existingWebsite: b.existingWebsite,
      seedKeyword: seedKeywordFor(b),
    }).catch(() => null),
  ]);

  const status = statusMeta(record.status);
  const lastScan = record.scans?.[record.scans.length - 1];
  const ourSite = `${PUBLISHED_BASE}/p/${b.slug}`;
  const addr = `${b.address.street ? `${b.address.street}, ` : ""}${b.address.locality}, ${b.address.region} ${b.address.postalCode || ""}`.trim();

  return (
    <main className="min-h-screen bg-grey pb-16">
      {/* ── header ── */}
      <div className="bg-dark text-white">
        <div className="max-w-container-sm mx-auto px-5 py-6">
          <Link href="/admin/businesses" className="inline-flex items-center gap-1.5 font-mono text-xs text-white/50 hover:text-white mb-3">
            <ArrowLeft size={13} /> Back to CRM
          </Link>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-brand mb-1">Pre-call brief</p>
              <h1 className="font-sans font-medium text-3xl">{b.name}</h1>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 mt-3 text-sm text-white/75">
                <a href={`tel:${b.phone.replace(/[^\d+]/g, "")}`} className="inline-flex items-center gap-1.5 text-brand hover:underline font-medium">
                  <Phone size={14} /> {b.phone}
                </a>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={14} className="text-white/40" /> {addr}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Star size={14} className="text-brand" /> {b.rating} · {b.reviewCount} reviews
                </span>
              </div>
            </div>
            <div className="text-right">
              <span
                className="inline-block rounded-full px-3 py-1 text-xs font-medium"
                style={{ background: status.bg, color: status.color }}
              >
                {status.label}
              </span>
              <p className="font-mono text-xs text-white/45 mt-2">
                {record.scans?.length || 0} scan{record.scans?.length === 1 ? "" : "s"} · last {relTime(lastScan)}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-5">
            <a href={ourSite} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-md bg-brand text-dark px-3 py-1.5 text-sm font-medium hover:opacity-90">
              The site we built <ExternalLink size={13} />
            </a>
            {b.existingWebsite && (
              <a href={b.existingWebsite} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-md border border-white/25 px-3 py-1.5 text-sm hover:bg-white/10">
                Their current site <ExternalLink size={13} />
              </a>
            )}
            {b.googleMapsUrl && (
              <a href={b.googleMapsUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-md border border-white/25 px-3 py-1.5 text-sm hover:bg-white/10">
                Google listing <ExternalLink size={13} />
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-container-sm mx-auto px-5 mt-6 space-y-5">
        {!intel ? (
          <div className={`${card} p-5`}>
            <p className="font-medium">No SEO data yet.</p>
            <p className="text-sm text-dark/60 mt-1">
              {b.existingWebsite
                ? "Set SERANKING_API_KEY in the environment, then hit Refresh to pull live data."
                : "This business has no existing website on file, so there's nothing to analyse."}
            </p>
            <div className="mt-3"><RefreshIntel slug={b.slug} /></div>
          </div>
        ) : (
          <Brief intel={intel} />
        )}
      </div>
    </main>
  );
}

function Brief({ intel }: { intel: ProspectIntel }) {
  const { traffic, topKeywords, opportunities, issues, audit } = intel;
  const mapOnly = topKeywords.filter((k) => k.localPack && (k.organicPosition ?? 999) > 10).length;
  const missed = opportunityTotals(opportunities);

  return (
    <>
      {/* ── the opener ── */}
      <div className={`${card} border-brand/40 bg-brand/5 p-5`}>
        <p className="font-mono text-[11px] uppercase tracking-wider text-dark/50 mb-1.5">Open with this</p>
        <p className="font-sans text-lg leading-snug">{intel.headline}</p>
        <p className="font-mono text-[11px] text-dark/40 mt-3">
          {intel.domain} · SE Ranking data {relTime(intel.fetchedAt)}
          {intel.source === "seed" && " · cached snapshot"}
        </p>
      </div>

      {/* ── numbers ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatTile
          label="Organic visits / mo"
          value={String(traffic.currentMonthly)}
          sub={`worth ~$${traffic.trafficValue}/mo in ads`}
          tone={traffic.currentMonthly < 100 ? "bad" : undefined}
        />
        <StatTile label="Keywords ranking" value={String(traffic.keywordsCount)} sub={`${mapOnly} won by the map listing, not the site`} />
        <StatTile
          label="Site health"
          value={audit?.score != null ? `${audit.score}%` : "—"}
          sub={audit ? `${audit.errors} errors · ${audit.warnings} warnings` : undefined}
          tone={audit?.score != null && audit.score < 80 ? "bad" : undefined}
        />
        <StatTile
          label="Missed clicks / mo"
          value={`~${missed.clicks}`}
          sub={
            missed.adValue
              ? `~$${missed.adValue.toLocaleString()}/mo of ad value · ${missed.groups} search terms`
              : "if top 3 for the terms below"
          }
          tone="bad"
        />
      </div>

      {/* ── traffic ── */}
      <div className={`${card} p-5`}>
        <div className="flex items-baseline justify-between flex-wrap gap-2 mb-1">
          <h2 className="font-sans font-medium text-lg">Organic search traffic, last 12 months</h2>
          <p className="font-mono text-xs text-dark/45">{intel.domain}</p>
        </div>
        <p className="text-sm text-dark/60 mb-4">
          Visits from Google to their current website — not calls from the map listing.
          {traffic.peak && traffic.peak.traffic > traffic.currentMonthly && (
            <> Peaked at {traffic.peak.traffic}/mo, now {traffic.currentMonthly}.</>
          )}
        </p>
        <TrafficChart history={traffic.history} />
      </div>

      {/* ── keywords ── */}
      <div className="grid lg:grid-cols-2 gap-5">
        <div className={`${card} overflow-hidden`}>
          <div className="px-5 pt-4 pb-3">
            <h2 className="font-sans font-medium text-lg">What they rank for now</h2>
            <p className="text-sm text-dark/60 mt-0.5">
              Green &ldquo;map&rdquo; badges are their Google Business Profile winning the map pack. The grey number is
              where their <em>website</em> actually sits.
            </p>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-grey">
              <tr>
                <th className={th}>Keyword</th>
                <th className={`${th} text-right`}>Vol</th>
                <th className={`${th} text-right`}>Position</th>
                <th className={`${th} text-right`}>Site</th>
              </tr>
            </thead>
            <tbody>
              {topKeywords.map((k) => {
                const badge = posBadge(k.position, k.localPack);
                return (
                  <tr key={k.keyword} className="border-t border-dark/6">
                    <td className={`${td} font-medium`}>{k.keyword}</td>
                    <td className={`${td} text-right font-mono text-dark/60`}>{k.volume}</td>
                    <td className={`${td} text-right`}>
                      <span className={`inline-block rounded px-1.5 py-0.5 font-mono text-[11px] ${badge.cls}`}>{badge.text}</span>
                    </td>
                    <td className={`${td} text-right font-mono text-xs ${(k.organicPosition ?? 0) > 20 ? "text-[#b91c1c]" : "text-dark/50"}`}>
                      {k.organicPosition ? `#${k.organicPosition}` : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className={`${card} overflow-hidden`}>
          <div className="px-5 pt-4 pb-3">
            <h2 className="font-sans font-medium text-lg">What they should rank for</h2>
            <p className="text-sm text-dark/60 mt-0.5">
              Real local demand their website is buried for. &ldquo;If top 3&rdquo; is the monthly clicks at a ~30% click
              rate.
            </p>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-grey">
              <tr>
                <th className={th}>Keyword</th>
                <th className={`${th} text-right`}>Vol</th>
                <th className={`${th} text-right`}>Now</th>
                <th className={`${th} text-right`}>If top 3</th>
              </tr>
            </thead>
            <tbody>
              {opportunities.map((o) => {
                const badge = posBadge(o.position);
                return (
                  <tr key={o.keyword} className="border-t border-dark/6">
                    <td className={`${td} font-medium`}>{o.keyword}</td>
                    <td className={`${td} text-right font-mono text-dark/60`}>{o.volume}</td>
                    <td className={`${td} text-right`}>
                      <span className={`inline-block rounded px-1.5 py-0.5 font-mono text-[11px] ${badge.cls}`}>{badge.text}</span>
                    </td>
                    <td className={`${td} text-right font-mono text-[#15803d]`}>+{o.clicksAtTop3}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── issues ── */}
      <div className={`${card} p-5`}>
        <div className="flex items-baseline justify-between flex-wrap gap-2">
          <h2 className="font-sans font-medium text-lg">Top 5 problems with their website</h2>
          {audit && (
            <p className="font-mono text-xs text-dark/45">
              {audit.pages} pages crawled · health {audit.score}%
              {audit.refDomains != null && ` · ${audit.refDomains} referring domains`}
            </p>
          )}
        </div>
        <ol className="mt-4 space-y-3">
          {issues.map((issue, i) => (
            <li key={issue.label} className="flex gap-3">
              <span className="font-mono text-xs text-dark/35 pt-1 w-4 shrink-0">{i + 1}</span>
              <div className="min-w-0">
                <p className="font-medium flex items-center gap-2 flex-wrap">
                  {issue.severity === "error" ? (
                    <AlertTriangle size={14} className="text-[#b91c1c] shrink-0" aria-hidden />
                  ) : (
                    <TrendingDown size={14} className="text-[#b45309] shrink-0" aria-hidden />
                  )}
                  {issue.label}
                  <span
                    className={`rounded px-1.5 py-0.5 font-mono text-[11px] ${
                      issue.severity === "error" ? "bg-bg-red/25 text-[#b91c1c]" : "bg-bg-yellow/45 text-[#b45309]"
                    }`}
                  >
                    {issue.severity} · {issue.count}
                  </span>
                </p>
                <p className="text-sm text-dark/65 mt-0.5">{issue.why}</p>
              </div>
            </li>
          ))}
          {issues.length === 0 && <li className="text-sm text-dark/50">No audit data — hit Refresh to run one.</li>}
        </ol>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-3">
        <p className="font-mono text-xs text-dark/40">
          Data: SE Ranking · pulled {relTime(intel.fetchedAt)}
        </p>
        <RefreshIntel slug={intel.slug} />
      </div>
    </>
  );
}
