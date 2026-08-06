// Prospect intel = the pre-call brief we build the moment a QR code is scanned.
// Pulls SE Ranking (traffic history, rankings, site audit) for the prospect's
// EXISTING website, caches it in Convex, and renders at /admin/prospect/[slug].
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../convex/_generated/api";
import SEED from "@/content/prospect-intel-seed.json";
import {
  auditReport,
  auditStatus,
  createAudit,
  domainHistory,
  domainKeywords,
  domainOverview,
  hasSeRankingKey,
  relatedKeywords,
  SrAuditReport,
  SrKeyword,
} from "./seranking";

const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL;
const client = () => new ConvexHttpClient(CONVEX_URL!);

/* ── report shape ── */

export interface TrafficPoint {
  /** "2026-08" */
  ym: string;
  label: string;
  traffic: number;
  keywords: number;
}

export interface RankedKeyword {
  keyword: string;
  position: number;
  volume: number;
  difficulty?: number;
  cpc?: number;
  /** True when the #1 is their Google Business Profile in the map pack, not the website. */
  localPack: boolean;
  /** Where the *website* ranks organically, when it also appears outside the map pack. */
  organicPosition?: number;
}

export interface OpportunityKeyword {
  keyword: string;
  /** null = not ranking anywhere in the top 100. */
  position: number | null;
  volume: number;
  difficulty?: number;
  cpc?: number;
  /** Estimated monthly clicks if moved into the top 3 (~30% CTR). */
  clicksAtTop3: number;
}

export interface SeoIssue {
  label: string;
  count: number;
  severity: "error" | "warning" | "notice";
  /** Plain-English "here's what it costs you" — the line to say on the phone. */
  why: string;
}

export interface ProspectIntel {
  slug: string;
  name: string;
  domain: string;
  existingWebsite?: string;
  fetchedAt: string;
  /** Set when SE Ranking was unavailable and this is seeded/stale data. */
  source: "live" | "seed";
  traffic: {
    history: TrafficPoint[];
    currentMonthly: number;
    peak: { ym: string; traffic: number } | null;
    keywordsCount: number;
    /** What that organic traffic would cost via Google Ads, per SE Ranking. */
    trafficValue: number;
  };
  topKeywords: RankedKeyword[];
  opportunities: OpportunityKeyword[];
  issues: SeoIssue[];
  audit: {
    score: number | null;
    pages: number;
    errors: number;
    warnings: number;
    domainTrust?: number;
    backlinks?: number;
    refDomains?: number;
  } | null;
  /** The one-line hook to open the call with. */
  headline: string;
}

/* ── issue code → why it matters (only codes we surface) ── */

const ISSUE_COPY: Record<string, string> = {
  description_missing:
    "Google writes its own snippet for these pages — you have no control over what a searcher reads before deciding to click.",
  image_no_alt:
    "Image alt text is missing, so Google can't read the job photos — and they never surface in image search.",
  images4xx: "Broken images: these are 404ing on the live site, so visitors see empty boxes.",
  h1_missing: "Pages with no H1 heading — Google has no clear signal for what the page is about.",
  h1_multiple: "Multiple H1s on a page split the topic signal instead of pointing at one keyword.",
  loading_speed: "Slow-loading pages. On mobile, most people leave before a slow page ever paints.",
  sitemap_missing: "No XML sitemap, so Google has to guess its way around the site.",
  sitemap_no_robots: "The sitemap isn't declared in robots.txt — Google isn't being pointed at the page list.",
  blocked_by_robots: "A page is blocked in robots.txt, so it can never rank.",
  no_inlinks: "Orphan page — nothing on the site links to it, so Google barely crawls it.",
  no_favicon: "No favicon: the browser tab and Google result show a blank placeholder instead of a logo.",
  twitter_missing: "No social card tags — links shared to Facebook/X show a bare URL, no image, no title.",
  title_missing: "Missing page title — the single most important on-page ranking element.",
  title_duplicate: "Duplicate page titles make separate pages compete with each other in search.",
  duplicate_content: "Duplicate content across pages, which splits ranking signals.",
  no_https: "No HTTPS — browsers flag the site as 'Not secure' to every visitor.",
  css_uncompressed: "Stylesheets aren't compressed, adding avoidable weight to every page load.",
  js_not_cached: "JavaScript isn't cached, so repeat visitors re-download it every time.",
  http4xx: "Broken pages returning 404s.",
  redirect_chain: "Redirect chains waste crawl budget and slow the first paint.",
  viewport_missing: "No viewport tag — the site won't scale correctly on phones.",
};

// Issues we never lead with: cosmetic, or noise on a small brochure site.
const ISSUE_DENYLIST = new Set(["css_uncompressed", "js_not_cached", "twitter_missing"]);

const SEVERITY_RANK = { error: 3, warning: 2, notice: 1 } as const;

/* ── helpers ── */

export function domainOf(url?: string): string | null {
  if (!url) return null;
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const ym = (y: number, m: number) => `${y}-${String(m).padStart(2, "0")}`;

/** Pick the top 5 issues worth saying out loud, worst first. */
export function extractIssues(report: SrAuditReport): SeoIssue[] {
  const out: SeoIssue[] = [];
  for (const section of report.sections || []) {
    for (const prop of Object.values(section.props || {})) {
      if (!prop.value || prop.value <= 0) continue;
      if (ISSUE_DENYLIST.has(prop.code)) continue;
      const severity = (prop.status === "error" ? "error" : prop.status === "warning" ? "warning" : "notice") as SeoIssue["severity"];
      out.push({
        label: prop.name,
        count: prop.value,
        severity,
        why: ISSUE_COPY[prop.code] || `${section.name}: ${prop.name}.`,
      });
    }
  }
  // Rank by severity, but let breadth compete with it: "15 of 16 pages have no
  // meta description" is a better thing to say on a call than "4 broken images".
  const score = (i: SeoIssue) => SEVERITY_RANK[i.severity] * 10 + Math.min(i.count, 30);
  return out.sort((a, b) => score(b) - score(a) || b.count - a.count).slice(0, 5);
}

/**
 * Collapse SE Ranking's per-SERP rows into one row per keyword.
 * A business often appears twice for the same term: once at #1 in the map pack
 * (their Google Business Profile) and once deep in the organic results (their
 * website). That gap is the whole pitch, so keep both numbers.
 */
export function foldKeywords(rows: SrKeyword[]): RankedKeyword[] {
  const byKeyword = new Map<string, RankedKeyword>();
  for (const r of rows) {
    const isLocal = r.block_type === "local_pack";
    const existing = byKeyword.get(r.keyword);
    if (!existing) {
      byKeyword.set(r.keyword, {
        keyword: r.keyword,
        position: r.position,
        volume: r.volume,
        difficulty: r.difficulty,
        cpc: r.cpc,
        localPack: isLocal,
        organicPosition: isLocal ? undefined : r.position,
      });
      continue;
    }
    if (isLocal) {
      // Map-pack row wins the headline position; keep the organic number beside it.
      existing.organicPosition = existing.organicPosition ?? existing.position;
      existing.position = r.position;
      existing.localPack = true;
    } else {
      existing.organicPosition = Math.min(existing.organicPosition ?? Infinity, r.position);
      if (!existing.localPack) existing.position = Math.min(existing.position, r.position);
    }
  }
  return Array.from(byKeyword.values());
}

/** Build the "should be ranking for" list: real local demand they're missing. */
export function buildOpportunities(
  ranked: RankedKeyword[],
  candidates: { keyword: string; volume: number; difficulty?: number; cpc?: number }[]
): OpportunityKeyword[] {
  // Where does the *website* actually sit for each term?
  const websitePos = new Map<string, number>();
  for (const r of ranked) {
    const p = r.organicPosition ?? (r.localPack ? undefined : r.position);
    if (p !== undefined) websitePos.set(r.keyword, p);
  }
  return candidates
    .map((c) => {
      const position = websitePos.get(c.keyword) ?? null;
      return {
        keyword: c.keyword,
        position,
        volume: c.volume,
        difficulty: c.difficulty,
        cpc: c.cpc,
        clicksAtTop3: Math.round(c.volume * 0.3),
      };
    })
    // Only terms they are NOT already winning organically.
    .filter((o) => o.position === null || o.position > 10)
    .sort((a, b) => b.volume - a.volume || (a.position ?? 999) - (b.position ?? 999))
    .slice(0, 10);
}

/**
 * Total the opportunity list without double-counting.
 * SE Ranking reports the same volume+CPC for phrasings of one underlying query
 * ("tree service mesa az" / "mesa tree service" / "tree service mesa" are all
 * 210/mo), so summing every row inflates the number 2–3x. Count each distinct
 * demand group once — a figure that survives being quoted on a call.
 */
export function opportunityTotals(opportunities: OpportunityKeyword[]) {
  const groups = new Map<string, OpportunityKeyword>();
  for (const o of opportunities) {
    const key = `${o.volume}|${o.cpc ?? 0}`;
    // Keep the best-positioned phrasing as the group's representative.
    const existing = groups.get(key);
    if (!existing || (o.position ?? 999) < (existing.position ?? 999)) groups.set(key, o);
  }
  const distinct = Array.from(groups.values());
  return {
    clicks: distinct.reduce((sum, o) => sum + o.clicksAtTop3, 0),
    adValue: Math.round(distinct.reduce((sum, o) => sum + o.clicksAtTop3 * (o.cpc || 0), 0)),
    groups: distinct.length,
  };
}

/* ── the live build ── */

interface BuildInput {
  slug: string;
  name: string;
  existingWebsite?: string;
  /** Seed for the opportunity search, e.g. "tree service mesa az". */
  seedKeyword: string;
}

export async function buildIntel(input: BuildInput): Promise<ProspectIntel> {
  const domain = domainOf(input.existingWebsite);
  if (!domain) throw new Error(`${input.slug} has no existing website to analyse`);

  const [overview, history, keywords, related] = await Promise.all([
    domainOverview(domain).catch(() => null),
    domainHistory(domain).catch(() => ({ data: [] })),
    domainKeywords(domain).catch(() => ({ data: [] })),
    relatedKeywords(input.seedKeyword).catch(() => ({ keywords: [] })),
  ]);

  const audit = await runAudit(domain, input.name).catch(() => null);

  const trafficHistory: TrafficPoint[] = (history.data || [])
    .slice(-13)
    .map((p) => ({
      ym: ym(p.year, p.month),
      label: `${MONTHS[p.month - 1]} ${String(p.year).slice(2)}`,
      traffic: p.traffic_sum ?? 0,
      keywords: p.keywords_count ?? 0,
    }));

  const ranked = foldKeywords(keywords.data || []);
  const topKeywords = [...ranked]
    .sort((a, b) => a.position - b.position || b.volume - a.volume)
    .slice(0, 10);

  const opportunities = buildOpportunities(
    ranked,
    (related.keywords || []).map((k) => ({ keyword: k.keyword, volume: k.volume, difficulty: k.difficulty, cpc: k.cpc }))
  );

  const current = trafficHistory[trafficHistory.length - 1];
  const peak = trafficHistory.reduce<{ ym: string; traffic: number } | null>(
    (best, p) => (!best || p.traffic > best.traffic ? { ym: p.ym, traffic: p.traffic } : best),
    null
  );

  return {
    slug: input.slug,
    name: input.name,
    domain,
    existingWebsite: input.existingWebsite,
    fetchedAt: new Date().toISOString(),
    source: "live",
    traffic: {
      history: trafficHistory,
      currentMonthly: current?.traffic ?? overview?.organic?.traffic_sum ?? 0,
      peak,
      keywordsCount: overview?.organic?.keywords_count ?? current?.keywords ?? 0,
      trafficValue: Math.round(overview?.organic?.price_sum ?? 0),
    },
    topKeywords,
    opportunities,
    issues: audit ? extractIssues(audit) : [],
    audit: audit
      ? {
          score: audit.weighted_score_percent ?? audit.score_percent ?? null,
          pages: audit.total_pages,
          errors: audit.total_errors,
          warnings: audit.total_warnings,
          domainTrust: audit.domain_props?.dt,
          backlinks: Number(audit.domain_props?.backlinks) || undefined,
          refDomains: Number(audit.domain_props?.domains) || undefined,
        }
      : null,
    headline: makeHeadline(topKeywords, opportunities, current?.traffic ?? 0),
  };
}

/** Kick off an audit and poll until it finishes (they run ~30–90s on small sites). */
async function runAudit(domain: string, name: string, timeoutMs = 110_000): Promise<SrAuditReport | null> {
  const { id } = await createAudit(domain, `${name} — prospect audit`);
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    await new Promise((r) => setTimeout(r, 6000));
    const status = await auditStatus(id).catch(() => null);
    if (status?.status === "finished") return auditReport(id);
  }
  return null;
}

/** The opening line: the sharpest gap between where they show up and where they don't. */
export function makeHeadline(
  top: RankedKeyword[],
  opportunities: OpportunityKeyword[],
  currentTraffic: number
): string {
  const mapWin = top.find((k) => k.localPack && k.position <= 3 && (k.organicPosition ?? 0) > 15);
  const biggestMiss = opportunities[0];
  if (mapWin && biggestMiss) {
    return `Ranks #${mapWin.position} on the map for "${mapWin.keyword}" but the website sits at #${mapWin.organicPosition} — and it's ${
      biggestMiss.position ? `#${biggestMiss.position}` : "nowhere"
    } for "${biggestMiss.keyword}" (${biggestMiss.volume}/mo).`;
  }
  if (biggestMiss) {
    return `The website is ${biggestMiss.position ? `#${biggestMiss.position}` : "not ranking"} for "${
      biggestMiss.keyword
    }" — ${biggestMiss.volume} searches a month going to competitors.`;
  }
  return `The website pulls about ${currentTraffic} organic visits a month.`;
}

/* ── store ── */

export async function getIntel(slug: string): Promise<ProspectIntel | null> {
  if (CONVEX_URL) {
    try {
      const doc = (await client().query(api.intel.get, { slug })) as { payload?: ProspectIntel } | null;
      if (doc?.payload) return doc.payload;
    } catch (error) {
      console.warn(`[intel] Convex read failed for ${slug}`, error);
    }
  }
  const seeded = (SEED as Record<string, ProspectIntel>)[slug];
  return seeded ?? null;
}

export async function saveIntel(intel: ProspectIntel): Promise<void> {
  if (!CONVEX_URL) return;
  try {
    await client().mutation(api.intel.set, {
      slug: intel.slug,
      fetchedAt: intel.fetchedAt,
      // `undefined` is not a valid Convex value and the payload is full of
      // optional fields — round-tripping through JSON drops them.
      payload: JSON.parse(JSON.stringify(intel)),
    });
  } catch (error) {
    console.warn(`[intel] Convex write failed for ${intel.slug}`, error);
  }
}

/**
 * Read-through: return cached intel, refreshing when it's missing or stale.
 * Falls back to whatever we already have if the live pull fails, so the call
 * prep page always renders something.
 */
export async function getOrBuildIntel(
  input: BuildInput,
  { maxAgeHours = 24, force = false } = {}
): Promise<ProspectIntel | null> {
  const cached = await getIntel(input.slug);
  const ageHours = cached ? (Date.now() - new Date(cached.fetchedAt).getTime()) / 3_600_000 : Infinity;
  const fresh = cached?.source === "live" && ageHours < maxAgeHours;
  if (fresh && !force) return cached;
  if (!hasSeRankingKey()) return cached;

  try {
    const built = await buildIntel(input);
    await saveIntel(built);
    return built;
  } catch (error) {
    console.warn(`[intel] live build failed for ${input.slug}`, error);
    return cached;
  }
}

/** Seed keyword for the opportunity search: core service + city. */
export function seedKeywordFor(b: {
  primaryCategory?: string;
  categories?: string[];
  address: { locality: string; region: string };
}): string {
  const cat = (b.primaryCategory || b.categories?.[0] || "contractor").toLowerCase();
  return `${cat} ${b.address.locality} ${b.address.region}`.toLowerCase();
}
