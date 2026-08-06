// Thin server-side client for the SE Ranking Data API.
// Docs: https://seranking.com/api/data/reference/  ·  auth: `Authorization: Token <key>`
// Set SERANKING_API_KEY in the environment to enable live pulls.

const BASE = "https://api.seranking.com/v1";

export const hasSeRankingKey = () => !!process.env.SERANKING_API_KEY;

async function call<T>(path: string, init?: RequestInit): Promise<T> {
  const key = process.env.SERANKING_API_KEY;
  if (!key) throw new Error("SERANKING_API_KEY is not set");
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Token ${key}`,
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`SE Ranking ${path} → ${res.status} ${await res.text().catch(() => "")}`.slice(0, 300));
  }
  return (await res.json()) as T;
}

const qs = (params: Record<string, string | number | undefined>) =>
  Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== "")
    .map(([k, v]) => `${k}=${encodeURIComponent(String(v))}`)
    .join("&");

/* ── shapes we actually consume (the API returns more) ── */

export interface SrOverview {
  organic?: {
    keywords_count?: number;
    traffic_sum?: number;
    price_sum?: number;
    top1_5?: number;
    top6_10?: number;
    top11_20?: number;
    top21_50?: number;
    top51_100?: number;
  };
}

export interface SrHistoryPoint {
  year: number;
  month: number;
  traffic_sum: number;
  keywords_count: number;
  price_sum?: number;
}

export interface SrKeyword {
  keyword: string;
  position: number;
  prev_pos?: number;
  volume: number;
  cpc?: number;
  difficulty?: number;
  url?: string;
  traffic?: number;
  /** "local_pack" when the #1 is the map listing rather than a blue link. */
  block_type?: string | null;
  serp_features?: string[];
}

export interface SrAuditStatus {
  status: "queued" | "processing" | "finished" | string;
  total_pages?: number;
  total_errors?: number;
  total_warnings?: number;
  total_passed?: number;
}

export interface SrAuditReport {
  total_pages: number;
  total_errors: number;
  total_warnings: number;
  total_passed?: number;
  total_notices?: number;
  is_finished: boolean;
  score_percent?: number;
  weighted_score_percent?: number;
  domain_props?: { dt?: number; backlinks?: string; domains?: string; domain?: string };
  sections?: {
    uid: string;
    name: string;
    props: Record<string, { code: string; status: string; name: string; value: number }>;
  }[];
}

/* ── endpoints ── */

export const domainOverview = (domain: string, source = "us") =>
  call<SrOverview>(`/domain/overview/db?${qs({ source, domain, with_subdomains: 1 })}`);

export const domainHistory = (domain: string, source = "us") =>
  call<{ data: SrHistoryPoint[] }>(
    `/domain/overview/history?${qs({ source, domain, type: "organic", with_subdomains: 1 })}`
  );

export const domainKeywords = (domain: string, source = "us", limit = 250) =>
  call<{ data: SrKeyword[] }>(
    `/domain/keywords?${qs({ source, domain, type: "organic", limit, order_field: "traffic", order_type: "desc" })}`
  );

export const relatedKeywords = (keyword: string, source = "us", limit = 100) =>
  call<{ keywords: { keyword: string; volume: number; difficulty?: number; cpc?: number; relevance?: number }[] }>(
    `/keywords/related?${qs({ source, keyword, limit, sort: "volume", sort_order: "desc" })}`
  );

export const createAudit = (domain: string, title: string, maxPages = 200) =>
  call<{ id: number }>("/site-audit/audits/standard", {
    method: "POST",
    body: JSON.stringify({ domain, title, settings: { max_pages: maxPages, send_report: 0 } }),
  });

export const auditStatus = (auditId: number) =>
  call<SrAuditStatus>(`/site-audit/audits/status?${qs({ audit_id: auditId })}`);

export const auditReport = (auditId: number) =>
  call<SrAuditReport>(`/site-audit/audits/report?${qs({ audit_id: auditId })}`);
