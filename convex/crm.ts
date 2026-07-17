import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

const ADVANCED = ["contacted", "no_answer", "quoted", "won", "lost"];

const STATUS_LABELS: Record<string, string> = {
  new: "New", mailed: "Flyer Mailed", scanned: "QR Scanned", contacted: "Contacted",
  no_answer: "No Answer", quoted: "Quote Sent", won: "Won", lost: "Lost",
};
const BUILD_LABELS: Record<string, string> = { template: "Template", designing: "Designing", customized: "Customized" };
const THEME_NAMES = ["Sunset", "Verde", "Desert Sky", "Clay", "Sage", "Slate Teal"];

function diffLabels(prev: Record<string, unknown> | null, patch: Record<string, unknown>): string[] {
  const out: string[] = [];
  if (patch.status && patch.status !== prev?.status) out.push(`Status → ${STATUS_LABELS[patch.status as string] || patch.status}`);
  if (patch.buildStage && patch.buildStage !== prev?.buildStage) out.push(`Build → ${BUILD_LABELS[patch.buildStage as string] || patch.buildStage}`);
  if ("dealValue" in patch) out.push(patch.dealValue ? `Deal set to $${Number(patch.dealValue).toLocaleString()}` : "Deal value cleared");
  if ("themeOverride" in patch) {
    const o = patch.themeOverride as { accent?: string; themeId?: number } | undefined | null;
    out.push(!o ? "Color reset to default" : o.accent ? `Color → custom ${o.accent}` : typeof o.themeId === "number" ? `Color → ${THEME_NAMES[o.themeId] || "preset"}` : "Color changed");
  }
  if ("notes" in patch && patch.notes !== prev?.notes) out.push("Notes updated");
  return out;
}

// Live list of all CRM records (the admin table subscribes to this).
export const list = query({
  args: {},
  handler: async (ctx) => ctx.db.query("crm").collect(),
});

export const get = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) =>
    ctx.db.query("crm").withIndex("by_slug", (q) => q.eq("slug", slug)).unique(),
});

// Upsert a partial patch onto a business's record (+ optional activity append).
export const patch = mutation({
  args: { slug: v.string(), patch: v.any() },
  handler: async (ctx, { slug, patch }) => {
    const existing = await ctx.db.query("crm").withIndex("by_slug", (q) => q.eq("slug", slug)).unique();
    // Changing the color marks the build "customized".
    if (patch.themeOverride && !patch.buildStage) patch.buildStage = "customized";
    const labels = diffLabels(existing || null, patch);
    const fields: Record<string, unknown> = { ...patch, updatedAt: new Date().toISOString() };
    if (labels.length) {
      fields.activity = [...((existing?.activity) || []), ...labels.map((label) => ({ ts: new Date().toISOString(), label }))].slice(-100);
    }
    if (existing) {
      await ctx.db.patch(existing._id, fields);
      return { ...existing, ...fields };
    }
    const doc = { slug, status: "new", buildStage: "template", scans: [], activity: [], ...fields };
    await ctx.db.insert("crm", doc);
    return doc;
  },
});

// Record a QR scan: append timestamp, advance status, log activity.
export const recordScan = mutation({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    const existing = await ctx.db.query("crm").withIndex("by_slug", (q) => q.eq("slug", slug)).unique();
    const now = new Date().toISOString();
    const scans = [...((existing?.scans) || []), now];
    const status = existing && ADVANCED.includes(existing.status) ? existing.status : "scanned";
    const activity = [...((existing?.activity) || []), { ts: now, label: "QR scanned ⚡" }].slice(-100);
    const fields = { scans, status, activity, updatedAt: now };
    if (existing) {
      await ctx.db.patch(existing._id, fields);
      return { ...existing, ...fields };
    }
    const doc = { slug, status, buildStage: "template", scans, activity, updatedAt: now };
    await ctx.db.insert("crm", doc);
    return doc;
  },
});
