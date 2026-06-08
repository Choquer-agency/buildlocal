// Server-side CRM persistence. Uses Convex when NEXT_PUBLIC_CONVEX_URL is set,
// otherwise a local JSON file (dev fallback). Keyed by business slug.
import fs from "node:fs";
import path from "node:path";
import { ConvexHttpClient } from "convex/browser";
import { CrmRecord, DEFAULT_CRM } from "./crm-types";
import { Theme, getTheme, customTheme, tint } from "./themes";
import { api } from "../../convex/_generated/api";

const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL;
const useConvex = !!CONVEX_URL;
const FILE = path.join(process.cwd(), "scripts/data/crm-state.json");

function client() { return new ConvexHttpClient(CONVEX_URL!); }

/** Normalize a Convex doc (or anything) into a clean CrmRecord. */
function toRecord(d: Record<string, unknown> | null | undefined): CrmRecord {
  if (!d) return { ...DEFAULT_CRM };
  return {
    status: (d.status as CrmRecord["status"]) || "new",
    buildStage: (d.buildStage as CrmRecord["buildStage"]) || "template",
    dealValue: d.dealValue as number | undefined,
    notes: d.notes as string | undefined,
    scans: (d.scans as string[]) || [],
    themeOverride: d.themeOverride as CrmRecord["themeOverride"],
    activity: (d.activity as CrmRecord["activity"]) || [],
    updatedAt: d.updatedAt as string | undefined,
  };
}

/* ── file fallback ── */
function readFile(): Record<string, CrmRecord> {
  try { return JSON.parse(fs.readFileSync(FILE, "utf8")); } catch { return {}; }
}
function writeFile(data: Record<string, CrmRecord>) {
  fs.mkdirSync(path.dirname(FILE), { recursive: true });
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

/* ── public API ── */
export async function getRecord(slug: string): Promise<CrmRecord> {
  if (useConvex) return toRecord(await client().query(api.crm.get, { slug }));
  return { ...DEFAULT_CRM, ...(readFile()[slug] || {}) };
}

export async function getRecords(slugs: string[]): Promise<Record<string, CrmRecord>> {
  const out: Record<string, CrmRecord> = {};
  for (const s of slugs) out[s] = { ...DEFAULT_CRM };
  if (useConvex) {
    const all = (await client().query(api.crm.list)) as Record<string, unknown>[];
    for (const d of all) out[d.slug as string] = toRecord(d);
    return out;
  }
  const file = readFile();
  for (const s of slugs) out[s] = { ...DEFAULT_CRM, ...(file[s] || {}) };
  return out;
}

export async function patchRecord(slug: string, patch: Partial<CrmRecord>): Promise<CrmRecord> {
  if (useConvex) return toRecord(await client().mutation(api.crm.patch, { slug, patch }));
  const all = readFile();
  const next: CrmRecord = { ...DEFAULT_CRM, ...all[slug], ...patch, updatedAt: new Date().toISOString() };
  all[slug] = next; writeFile(all); return next;
}

export async function recordScan(slug: string): Promise<CrmRecord> {
  if (useConvex) return toRecord(await client().mutation(api.crm.recordScan, { slug }));
  const current = { ...DEFAULT_CRM, ...readFile()[slug] };
  const scans = [...(current.scans || []), new Date().toISOString()];
  const advanced: CrmRecord["status"][] = ["contacted", "no_answer", "quoted", "won", "lost"];
  const status = advanced.includes(current.status) ? current.status : "scanned";
  const activity = [...(current.activity || []), { ts: new Date().toISOString(), label: "QR scanned ⚡" }];
  return patchRecord(slug, { scans, status, activity });
}

/**
 * Resolve the live theme. Priority: CRM color override (Convex) → the business's
 * real brand colors (from touch-ups) → assigned preset theme.
 */
export async function resolveTheme(b: {
  slug: string; themeId: number; brandColor?: string; brandColor2?: string; bgOverride?: string;
}): Promise<Theme> {
  const rec = await getRecord(b.slug);
  const o = rec.themeOverride;
  let t: Theme;
  if (o?.accent) t = customTheme(o.accent);
  else if (typeof o?.themeId === "number") t = getTheme(o.themeId);
  else if (b.brandColor) t = customTheme(b.brandColor, b.brandColor2);
  else t = getTheme(b.themeId);
  // Per-business: replace the secondary-tinted section backgrounds with a neutral
  // (keeps the secondary as an ACCENT, just not as a wash behind whole sections).
  if (b.bgOverride) t = { ...t, softBg: b.bgOverride, heroBg: tint(b.bgOverride, 0.5) };
  return t;
}
