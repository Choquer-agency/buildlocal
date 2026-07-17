import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getRecord, patchRecord } from "@/lib/crm-store";
import { businessMap } from "@/content/businesses";
import { CrmRecord, statusMeta, buildMeta } from "@/lib/crm-types";
import { THEMES } from "@/lib/themes";

export const dynamic = "force-dynamic";

// GET ?slug=... → full business profile + CRM record (for the detail drawer).
export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");
  if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 });
  const business = businessMap[slug];
  if (!business) return NextResponse.json({ error: "not found" }, { status: 404 });
  const record = await getRecord(slug);
  return NextResponse.json({ business, record });
}

// POST { slug, patch } → update record (+ activity log + revalidate on color change).
export async function POST(req: NextRequest) {
  const { slug, patch } = (await req.json()) as { slug: string; patch: Partial<CrmRecord> };
  if (!slug || !patch) return NextResponse.json({ error: "slug + patch required" }, { status: 400 });

  const prev = await getRecord(slug);

  // Changing the color = the build is now "customized".
  if (patch.themeOverride && !patch.buildStage) patch.buildStage = "customized";

  // Build an activity label from what changed.
  const labels: string[] = [];
  if (patch.status && patch.status !== prev.status) labels.push(`Status → ${statusMeta(patch.status).label}`);
  if (patch.buildStage && patch.buildStage !== prev.buildStage) labels.push(`Build → ${buildMeta(patch.buildStage).label}`);
  if (patch.dealValue !== undefined) labels.push(patch.dealValue ? `Deal set to $${patch.dealValue.toLocaleString()}` : "Deal value cleared");
  if ("themeOverride" in patch) {
    const o = patch.themeOverride;
    labels.push(!o ? "Color reset to default" : o.accent ? `Color → custom ${o.accent}` : typeof o.themeId === "number" ? `Color → ${THEMES[o.themeId]?.name}` : "Color changed");
  }
  if (patch.notes !== undefined && patch.notes !== prev.notes) labels.push("Notes updated");

  if (labels.length) {
    const activity = [...(prev.activity || []), ...labels.map((label) => ({ ts: new Date().toISOString(), label }))].slice(-100);
    patch.activity = activity;
  }

  const next = await patchRecord(slug, patch);

  if (patch.themeOverride !== undefined) {
    for (const p of [`/p/${slug}`, `/p/${slug}/services`, `/p/${slug}/about`, `/p/${slug}/areas`, `/p/${slug}/reviews`, `/p/${slug}/contact`]) {
      try { revalidatePath(p); } catch { /* ignore */ }
    }
  }
  return NextResponse.json({ ok: true, record: next });
}
