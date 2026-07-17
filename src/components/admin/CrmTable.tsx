"use client";

import { useState, useEffect, useMemo } from "react";
import { useQuery, useMutation } from "convex/react";
import { Link2, ExternalLink, Copy, Check, X, ChevronDown, ChevronUp, Download } from "lucide-react";
import {
  CrmRecord, SALES_STATUSES, statusMeta, DEFAULT_CRM,
} from "@/lib/crm-types";
import { api } from "../../../convex/_generated/api";

// Map a Convex doc → CrmRecord (client-side, no fs).
function toRec(d: Record<string, unknown>): CrmRecord {
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

export interface CrmRow {
  campaign?: boolean; firstCampaign?: boolean; trade?: string;
  slug: string; name: string; owner?: string; ownerLink?: string;
  phone: string; email?: string; locality: string; street?: string;
  existingWebsite?: string; rating: number; reviewCount: number; photosCount?: number;
  categories: string[]; themeId: number; qrCode: string; placeId?: string;
  googleMapsUrl?: string; reviewsLink?: string; verified?: boolean;
  siteUrl: string; qrTarget: string; record: CrmRecord;
}

function qrSrc(url: string, size = 120) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&margin=1&data=${encodeURIComponent(url)}`;
}
function relTime(iso?: string) {
  if (!iso) return null;
  const s = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 60) return `${s}s ago`;
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}
const lastScanOf = (rec: CrmRecord) => rec.scans?.[rec.scans.length - 1];

type SortKey = "name" | "rating" | "reviewCount" | "lastScan" | "deal" | null;

const PILLARS: [string, string][] = [
  ["landscaping", "Landscaping"], ["roofing", "Roofing"], ["hvac", "HVAC"], ["pool", "Pool"], ["pest", "Pest"],
];

export function CrmTable({ rows: allRows }: { rows: CrmRow[]; publishedBase?: string }) {
  const [state, setState] = useState<Record<string, CrmRecord>>(
    Object.fromEntries(allRows.map((r) => [r.slug, r.record || { ...DEFAULT_CRM }]))
  );
  // Top-level scope: First Campaign (Batch 1, 200) · full 5-pillar campaign (500) ·
  // hidden overflow landscaping (400).
  const [view, setView] = useState<"first" | "campaign" | "overflow">("campaign");
  const [tradeFilter, setTradeFilter] = useState("");
  const counts = useMemo(() => ({
    first: allRows.filter((r) => r.firstCampaign).length,
    campaign: allRows.filter((r) => r.campaign).length,
    overflow: allRows.filter((r) => !r.campaign).length,
  }), [allRows]);
  const rows = useMemo(
    () => allRows.filter((r) => {
      const inView = view === "first" ? !!r.firstCampaign : view === "campaign" ? !!r.campaign : !r.campaign;
      return inView && (!tradeFilter || (r.trade || "landscaping") === tradeFilter);
    }),
    [allRows, view, tradeFilter]
  );
  const [tab, setTab] = useState<"all" | CrmRecord["status"]>("all");
  const [q, setQ] = useState("");
  const [websiteFilter, setWebsiteFilter] = useState<"all" | "yes" | "no">("all");
  const [cityFilter, setCityFilter] = useState("");
  const [sort, setSort] = useState<{ key: SortKey; dir: 1 | -1 }>({ key: null, dir: 1 });
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [drawer, setDrawer] = useState<string | null>(null);
  const [qrModal, setQrModal] = useState<{ url: string; code: string; name: string } | null>(null);

  const patchMut = useMutation(api.crm.patch);
  // Live data from Convex — merges in scans + edits from any device, in real time.
  const live = useQuery(api.crm.list);
  useEffect(() => {
    if (!live) return;
    setState((prev) => {
      const n = { ...prev };
      for (const d of live as Record<string, unknown>[]) n[d.slug as string] = toRec(d);
      return n;
    });
  }, [live]);

  async function update(slug: string, patch: Partial<CrmRecord>) {
    setState((prev) => ({ ...prev, [slug]: { ...prev[slug], ...patch } }));
    try { await patchMut({ slug, patch }); } catch { /* keep optimistic */ }
  }
  async function bulkApply(patch: Partial<CrmRecord>) {
    const slugs = Array.from(selected);
    setState((prev) => { const n = { ...prev }; slugs.forEach((s) => (n[s] = { ...n[s], ...patch })); return n; });
    setSelected(new Set());
    await Promise.all(slugs.map((s) => patchMut({ slug: s, patch })));
  }

  const withSite = rows.filter((r) => r.existingWebsite).length;
  const scanned = rows.filter((r) => (state[r.slug]?.scans?.length || 0) > 0).length;
  const won = rows.filter((r) => state[r.slug]?.status === "won").length;
  const pipeline = rows.reduce((sum, r) => sum + (state[r.slug]?.dealValue || 0), 0);
  const countFor = (status: string) => rows.filter((r) => (state[r.slug]?.status || "new") === status).length;
  const cities = Array.from(new Set(rows.map((r) => r.locality).filter(Boolean))).sort();

  const ql = q.trim().toLowerCase();
  let visible = rows.filter((r) => {
    const rec = state[r.slug] || DEFAULT_CRM;
    if (tab !== "all" && (rec.status || "new") !== tab) return false;
    if (websiteFilter === "yes" && !r.existingWebsite) return false;
    if (websiteFilter === "no" && r.existingWebsite) return false;
    if (cityFilter && r.locality !== cityFilter) return false;
    if (ql && !`${r.name} ${r.owner ?? ""} ${r.locality} ${r.phone} ${r.qrCode}`.toLowerCase().includes(ql)) return false;
    return true;
  });
  if (sort.key) {
    const k = sort.key;
    visible = [...visible].sort((a, b) => {
      const va = k === "name" ? a.name.toLowerCase() : k === "rating" ? a.rating : k === "reviewCount" ? a.reviewCount : k === "deal" ? (state[a.slug]?.dealValue || 0) : new Date(lastScanOf(state[a.slug] || DEFAULT_CRM) || 0).getTime();
      const vb = k === "name" ? b.name.toLowerCase() : k === "rating" ? b.rating : k === "reviewCount" ? b.reviewCount : k === "deal" ? (state[b.slug]?.dealValue || 0) : new Date(lastScanOf(state[b.slug] || DEFAULT_CRM) || 0).getTime();
      return (va < vb ? -1 : va > vb ? 1 : 0) * sort.dir;
    });
  }

  function toggleSort(key: SortKey) {
    setSort((s) => (s.key === key ? { key, dir: (s.dir === 1 ? -1 : 1) as 1 | -1 } : { key, dir: 1 }));
  }
  function exportCsv() {
    const cols = ["Name", "Owner", "Phone", "Email", "City", "HasWebsite", "Website", "Rating", "Reviews", "Status", "DealValue", "BuildStage", "Scans", "LastScan", "Code", "SiteURL", "GoogleMaps", "Notes"];
    const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const lines = [cols.join(",")];
    for (const r of visible) {
      const rec = state[r.slug] || DEFAULT_CRM;
      lines.push([r.name, r.owner, r.phone, r.email, r.locality, r.existingWebsite ? "Yes" : "No", r.existingWebsite, r.rating, r.reviewCount, statusMeta(rec.status).label, rec.dealValue, rec.themeOverride ? "Customized" : rec.buildStage, rec.scans?.length || 0, lastScanOf(rec) || "", r.qrCode, r.siteUrl, r.googleMapsUrl, rec.notes].map(esc).join(","));
    }
    const blob = new Blob([lines.join("\n")], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `buildlocal-crm-${tab}.csv`;
    a.click();
  }

  const allVisibleSelected = visible.length > 0 && visible.every((r) => selected.has(r.slug));
  const th = "text-left font-mono text-[10px] uppercase tracking-wider text-dark/50 px-2.5 py-2 whitespace-nowrap";
  const td = "px-2.5 py-2.5 align-top text-sm border-t border-dark/8";
  const SortH = ({ k, label }: { k: SortKey; label: string }) => (
    <th className={`${th} cursor-pointer select-none`} onClick={() => toggleSort(k)}>
      <span className="inline-flex items-center gap-0.5">{label}{sort.key === k && (sort.dir === 1 ? <ChevronUp size={11} /> : <ChevronDown size={11} />)}</span>
    </th>
  );

  return (
    <main className="min-h-screen bg-grey">
      <div className="bg-dark text-white sticky top-0 z-20">
        <div className="px-6 py-5 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-brand mb-1">BuildLocal · Internal CRM</p>
            <h1 className="font-sans font-medium text-2xl">
              {view === "first" ? "First Campaign — Batch 1 (mailed 2026-07-09)" : view === "campaign" ? "AZ 5-Pillar Campaign — 500" : "Overflow Landscaping (hidden)"}
            </h1>
            {/* Scope toggle: first campaign (batch 1, 200) · campaign 500 · overflow 400 */}
            <div className="mt-2 inline-flex rounded-lg bg-white/10 p-0.5 text-sm font-sans">
              <button
                onClick={() => { setView("first"); setTradeFilter(""); }}
                className={`px-3 py-1 rounded-md transition-colors ${view === "first" ? "bg-brand text-dark font-medium" : "text-white/70 hover:text-white"}`}
              >
                First Campaign · {counts.first}
              </button>
              <button
                onClick={() => setView("campaign")}
                className={`px-3 py-1 rounded-md transition-colors ${view === "campaign" ? "bg-brand text-dark font-medium" : "text-white/70 hover:text-white"}`}
              >
                Campaign · {counts.campaign}
              </button>
              <button
                onClick={() => { setView("overflow"); setTradeFilter(""); }}
                className={`px-3 py-1 rounded-md transition-colors ${view === "overflow" ? "bg-brand text-dark font-medium" : "text-white/70 hover:text-white"}`}
              >
                Overflow · {counts.overflow}
              </button>
            </div>
          </div>
          <div className="flex gap-7 font-sans">
            <Stat label="Businesses" value={`${rows.length}`} />
            <Stat label="Have site" value={`${withSite}`} />
            <Stat label="Scanned" value={`${scanned}`} />
            <Stat label="Won" value={`${won}`} />
            <Stat label="Pipeline $" value={`$${pipeline.toLocaleString()}`} />
          </div>
        </div>
      </div>

      {/* Stage tabs */}
      <div className="bg-white border-b border-dark/8 sticky top-[89px] z-10">
        <div className="px-3 md:px-5 pt-2.5 flex items-center gap-2 flex-wrap">
          <TabBtn active={tab === "all"} onClick={() => setTab("all")} label="All" count={rows.length} />
          {SALES_STATUSES.map((s) => (
            <TabBtn key={s.value} active={tab === s.value} onClick={() => setTab(s.value)} label={s.label} count={countFor(s.value)} dot={s.color} />
          ))}
          <div className="ml-auto">
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search…" className="w-56 rounded-md border border-dark/12 px-3 py-1.5 text-sm focus:outline-none focus:ring-2" />
          </div>
        </div>
        {/* Filters + export */}
        <div className="px-3 md:px-5 py-2 flex items-center gap-2 flex-wrap text-xs">
          {view !== "overflow" && (
            <FilterSel label="Industry" value={tradeFilter} onChange={setTradeFilter} opts={[["", "All 5 trades"], ...PILLARS]} />
          )}
          <FilterSel label="Website" value={websiteFilter} onChange={(v) => setWebsiteFilter(v as "all" | "yes" | "no")} opts={[["all", "All"], ["yes", "Has site"], ["no", "No site"]]} />
          <FilterSel label="City" value={cityFilter} onChange={setCityFilter} opts={[["", "All cities"], ...cities.map((c) => [c, c] as [string, string])]} />
          <button onClick={exportCsv} className="ml-auto inline-flex items-center gap-1.5 rounded-md border border-dark/15 px-3 py-1.5 hover:bg-dark/5 font-medium">
            <Download size={13} /> Export CSV
          </button>
        </div>
      </div>

      {/* Bulk bar */}
      {selected.size > 0 && (
        <div className="bg-brand/10 border-b border-brand/30 px-5 py-2.5 flex items-center gap-3 sticky top-[178px] z-10">
          <span className="font-medium text-sm">{selected.size} selected</span>
          <span className="text-sm text-dark/50">Set status:</span>
          <select onChange={(e) => e.target.value && bulkApply({ status: e.target.value as CrmRecord["status"] })} defaultValue="" className="rounded-md border border-dark/15 px-2 py-1 text-sm">
            <option value="" disabled>Choose…</option>
            {SALES_STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
          <button onClick={() => setSelected(new Set())} className="text-sm text-dark/50 hover:text-dark underline ml-2">Clear</button>
        </div>
      )}

      <div className="p-3 md:p-5">
        <p className="font-mono text-xs text-dark/40 mb-2">{visible.length} result{visible.length === 1 ? "" : "s"}{tab !== "all" ? ` · ${statusMeta(tab).label}` : ""}</p>
        <div className="overflow-x-auto rounded-lg border border-dark/10 bg-white shadow-sm">
          <table className="w-full border-collapse">
            <thead className="bg-grey">
              <tr>
                <th className={th}><input type="checkbox" checked={allVisibleSelected} onChange={(e) => setSelected(e.target.checked ? new Set(visible.map((r) => r.slug)) : new Set())} /></th>
                <th className={th}>QR</th>
                <th className={th}>Code</th>
                <SortH k="name" label="Business" />
                <th className={th}>Owner</th>
                <th className={th}>Phone</th>
                <th className={th}>City</th>
                <th className={th}>Website</th>
                <th className={th}>Status</th>
                <SortH k="deal" label="Deal $" />
                <SortH k="lastScan" label="Last scan" />
                <th className={th}>Notes</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((r) => {
                const rec = state[r.slug] || DEFAULT_CRM;
                const lastScan = relTime(lastScanOf(rec));
                const sm = statusMeta(rec.status);
                return (
                  <tr key={r.slug} className={`hover:bg-grey/50 ${selected.has(r.slug) ? "bg-brand/5" : ""}`}>
                    <td className={td}><input type="checkbox" checked={selected.has(r.slug)} onChange={(e) => setSelected((s) => { const n = new Set(s); if (e.target.checked) n.add(r.slug); else n.delete(r.slug); return n; })} /></td>
                    <td className={td}>
                      <button onClick={() => setQrModal({ url: r.qrTarget, code: r.qrCode, name: r.name })} className="relative block" title="Click to enlarge & scan">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={qrSrc(r.qrTarget, 120)} alt="QR" width={52} height={52} className="rounded border border-dark/10 hover:ring-2 hover:ring-brand" />
                        {(rec.scans?.length || 0) > 0 && <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-white text-[10px] font-bold rounded-full w-5 h-5 grid place-items-center">{rec.scans.length}</span>}
                      </button>
                    </td>
                    <td className={td}><CodeChip code={r.qrCode} /></td>
                    <td className={`${td} font-medium min-w-[160px]`}>
                      <button onClick={() => setDrawer(r.slug)} className="text-left hover:text-brand">{r.name}</button>
                      {r.verified && <span className="ml-1.5 text-[10px] font-mono text-green-600">✓</span>}
                    </td>
                    <td className={`${td} min-w-[110px] text-xs`}>{r.owner ? (r.ownerLink ? <a href={r.ownerLink} target="_blank" className="text-blue-600 hover:underline">{r.owner}</a> : r.owner) : <span className="text-dark/30">—</span>}</td>
                    <td className={`${td} whitespace-nowrap text-xs`}>{r.phone ? <a href={`tel:${r.phone}`} className="text-blue-600 hover:underline">{r.phone}</a> : "—"}</td>
                    <td className={`${td} text-xs`}>{r.locality}</td>
                    <td className={td}>
                      <div className="flex items-center gap-1.5">
                        {r.existingWebsite
                          ? <span className="rounded-full bg-green-100 text-green-700 text-[11px] font-medium px-2 py-0.5">Yes</span>
                          : <span className="rounded-full bg-red-100 text-red-600 text-[11px] font-medium px-2 py-0.5">No</span>}
                        {/* Orange box → the site WE built for them */}
                        <a href={r.siteUrl} target="_blank" rel="noreferrer" title="Site we built" className="grid place-items-center w-7 h-7 rounded-md bg-brand hover:opacity-90">
                          <Link2 size={14} className="text-dark" />
                        </a>
                        {/* White box → their existing/old website (only if they have one) */}
                        {r.existingWebsite && (
                          <a href={r.existingWebsite} target="_blank" rel="noreferrer" title="Their old website" className="grid place-items-center w-7 h-7 rounded-md border border-dark/15 bg-white hover:bg-dark/5">
                            <ExternalLink size={14} className="text-dark" />
                          </a>
                        )}
                      </div>
                    </td>
                    <td className={td}>
                      <select value={rec.status} onChange={(e) => update(r.slug, { status: e.target.value as CrmRecord["status"] })} className="rounded-md border-0 text-xs font-medium px-2 py-1.5 cursor-pointer" style={{ background: sm.bg, color: sm.color }}>
                        {SALES_STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                      </select>
                    </td>
                    <td className={td}>
                      <div className="flex items-center"><span className="text-dark/40 text-xs">$</span>
                        <input type="number" defaultValue={rec.dealValue ?? ""} onBlur={(e) => update(r.slug, { dealValue: e.target.value ? Number(e.target.value) : undefined })} placeholder="—" className="w-16 rounded-md border border-dark/12 px-1.5 py-1 text-xs focus:ring-2" />
                      </div>
                    </td>
                    <td className={`${td} whitespace-nowrap text-xs`}>{lastScan ?<span className="text-amber-600 font-medium">⚡ {lastScan}</span> : <span className="text-dark/30">—</span>}</td>
                    <td className={td}><input defaultValue={rec.notes ?? ""} onBlur={(e) => update(r.slug, { notes: e.target.value || undefined })} placeholder="notes…" className="w-28 rounded-md border border-dark/12 px-2 py-1 text-xs focus:ring-2" /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {drawer && (
        <BusinessDrawer
          slug={drawer}
          onClose={() => setDrawer(null)}
          onSaveNotes={(notes) => update(drawer, { notes })}
        />
      )}

      {qrModal && (
        <div className="fixed inset-0 z-50 bg-black/60 grid place-items-center" onClick={() => setQrModal(null)}>
          <div className="bg-white rounded-xl p-7 text-center max-w-sm" onClick={(e) => e.stopPropagation()}>
            <p className="font-sans font-medium text-lg text-dark mb-1">{qrModal.name}</p>
            <p className="font-mono text-xs text-dark/40 mb-4">{qrModal.code}</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={qrSrc(qrModal.url, 600)} alt="QR code" width={280} height={280} className="mx-auto rounded-lg border border-dark/10" />
            <p className="font-sans text-sm text-dark/60 mt-4">📱 Scan with your phone to test the full flow</p>
            <p className="font-mono text-[11px] text-dark/40 mt-2 break-all">{qrModal.url}</p>
            <button onClick={() => setQrModal(null)} className="mt-5 rounded-md bg-dark text-white px-5 py-2 text-sm font-medium">Close</button>
          </div>
        </div>
      )}
    </main>
  );
}

/* ── Drawer ── */
function BusinessDrawer({ slug, onClose, onSaveNotes }: { slug: string; onClose: () => void; onSaveNotes: (n: string) => void }) {
  const [data, setData] = useState<{ business: CrmRow & Record<string, unknown>; record: CrmRecord } | null>(null);
  useEffect(() => {
    let alive = true;
    fetch(`/api/crm?slug=${slug}`).then((r) => r.json()).then((d) => { if (alive) setData(d); }).catch(() => {});
    return () => { alive = false; };
  }, [slug]);
  const b = data?.business as unknown as { name: string; phone: string; email?: string; address: { street?: string; locality: string; region: string; postalCode?: string }; existingWebsite?: string; googleMapsUrl?: string; reviewsLink?: string; rating: number; reviewCount: number; services: { name: string; blurb: string }[]; reviews: { author: string; rating: number; text: string; relativeTime?: string }[]; qrCode?: string } | undefined;
  const rec = data?.record;
  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
      <aside className="fixed right-0 top-0 bottom-0 w-full max-w-[520px] bg-white z-50 shadow-2xl overflow-y-auto">
        <div className="sticky top-0 bg-dark text-white px-6 py-4 flex items-center justify-between">
          <h2 className="font-sans font-medium text-lg">{b?.name || "Loading…"}</h2>
          <button onClick={onClose} className="p-1.5 rounded-md hover:bg-white/10"><X size={18} /></button>
        </div>
        {!b ? (
          <div className="p-6 text-dark/50">Loading…</div>
        ) : (
          <div className="p-6 space-y-6">
            <Section title="Contact">
              <Field label="Phone" value={b.phone} href={`tel:${b.phone}`} />
              {b.email && <Field label="Email" value={b.email} />}
              <Field label="Address" value={`${b.address.street ? b.address.street + ", " : ""}${b.address.locality}, ${b.address.region} ${b.address.postalCode ?? ""}`} />
              <Field label="Existing website" value={b.existingWebsite || "— none —"} href={b.existingWebsite} />
              {b.googleMapsUrl && <Field label="Google Maps" value="Open listing ↗" href={b.googleMapsUrl} />}
            </Section>

            <Section title={`Scans (${rec?.scans?.length || 0})`}>
              {rec?.scans?.length ? (
                <ul className="space-y-1.5">{[...rec.scans].reverse().map((s, i) => <li key={i} className="text-sm text-amber-700">⚡ {new Date(s).toLocaleString()} ({relTime(s)})</li>)}</ul>
              ) : <p className="text-sm text-dark/40">No scans yet.</p>}
            </Section>

            <Section title="Design requests / notes (for the team)">
              <textarea defaultValue={rec?.notes ?? ""} onBlur={(e) => onSaveNotes(e.target.value)} rows={4} placeholder={`e.g. "${b.qrCode}: match their real green, add patio photos, tighten hero copy"`} className="w-full rounded-md border border-dark/15 px-3 py-2 text-sm focus:ring-2" />
              <p className="text-xs text-dark/40 mt-1">Tip: copy the code <code className="font-mono">{b.qrCode}</code> and paste it into the terminal with your requested changes.</p>
            </Section>

            <Section title={`Reviews (${b.reviewCount})`}>
              <div className="space-y-3">
                {b.reviews?.slice(0, 6).map((rv, i) => (
                  <div key={i} className="rounded-md bg-grey p-3">
                    <p className="text-xs font-medium">{"★".repeat(Math.round(rv.rating))} <span className="text-dark/50">{rv.author}{rv.relativeTime ? ` · ${rv.relativeTime}` : ""}</span></p>
                    <p className="text-sm text-dark/70 mt-1">{rv.text}</p>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Services">
              <ul className="space-y-1.5">{b.services?.map((s, i) => <li key={i} className="text-sm"><span className="font-medium">{s.name}</span> — <span className="text-dark/60">{s.blurb}</span></li>)}</ul>
            </Section>

            {rec?.activity?.length ? (
              <Section title="Activity log">
                <ul className="space-y-1.5">{[...rec.activity].reverse().map((a, i) => <li key={i} className="text-sm text-dark/60"><span className="font-mono text-xs text-dark/40">{new Date(a.ts).toLocaleString()}</span> — {a.label}</li>)}</ul>
              </Section>
            ) : null}
          </div>
        )}
      </aside>
    </>
  );
}
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (<div><p className="font-mono text-[11px] uppercase tracking-wider text-dark/40 mb-2">{title}</p>{children}</div>);
}
function Field({ label, value, href }: { label: string; value: string; href?: string }) {
  return (<div className="flex justify-between gap-4 py-1 border-b border-dark/6 text-sm"><span className="text-dark/50">{label}</span>{href ? <a href={href} target="_blank" className="text-blue-600 hover:underline text-right truncate max-w-[60%]">{value}</a> : <span className="text-right truncate max-w-[60%]">{value}</span>}</div>);
}

/* ── small controls ── */
function FilterSel({ label, value, onChange, opts }: { label: string; value: string; onChange: (v: string) => void; opts: [string, string][] }) {
  return (
    <label className="inline-flex items-center gap-1.5 text-dark/50">
      {label}:
      <select value={value} onChange={(e) => onChange(e.target.value)} className="rounded-md border border-dark/12 px-2 py-1 text-xs text-dark focus:ring-2">
        {opts.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
      </select>
    </label>
  );
}
function TabBtn({ active, onClick, label, count, dot }: { active: boolean; onClick: () => void; label: string; count: number; dot?: string }) {
  return (
    <button onClick={onClick} className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${active ? "bg-dark text-white" : "text-dark/60 hover:bg-dark/[0.05]"}`}>
      {dot && <span className="w-2 h-2 rounded-full" style={{ background: dot }} />}
      {label}
      <span className={`text-xs rounded-full px-1.5 ${active ? "bg-white/20" : "bg-dark/8 text-dark/50"}`}>{count}</span>
    </button>
  );
}
function Stat({ label, value }: { label: string; value: string }) {
  return (<div><p className="font-sans font-medium text-2xl text-brand">{value}</p><p className="font-mono text-[10px] uppercase tracking-wider opacity-60">{label}</p></div>);
}
function CodeChip({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1200); }} className="inline-flex items-center gap-1 rounded-md bg-dark/5 hover:bg-dark/10 px-2 py-1 font-mono text-xs text-dark" title="Click to copy code">
      {copied ? <Check size={12} className="text-green-600" /> : <Copy size={12} className="text-dark/40" />}{code}
    </button>
  );
}
