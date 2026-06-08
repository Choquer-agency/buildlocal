import { NextRequest, NextResponse } from "next/server";
import { getRecord, patchRecord } from "@/lib/crm-store";

export const dynamic = "force-dynamic";

// A business owner submitted the "Schedule a Call" funnel → they're interested.
// Log it to the CRM (activity + notes) and ping Slack so Bryce can call them.
export async function POST(req: NextRequest) {
  const { slug, businessName, name, phone, email, package: pkg } =
    (await req.json()) as { slug: string; businessName?: string; name?: string; phone?: string; email?: string; package?: string };
  if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 });

  const summary = `Interested via site — ${name || "?"} · ${phone || "no phone"}${email ? " · " + email : ""} · wants ${pkg || "a plan"}`;

  try {
    const current = await getRecord(slug);
    const activity = [...(current.activity || []), { ts: new Date().toISOString(), label: `💰 ${summary}` }].slice(-100);
    const notes = current.notes ? `${current.notes}\n${summary}` : summary;
    // advance to "contacted" only if still early in the pipeline
    const early = ["new", "mailed", "scanned"].includes(current.status);
    await patchRecord(slug, { activity, notes, ...(early ? { status: "contacted" } : {}) });
  } catch (e) {
    console.error("lead log failed:", e);
  }

  // Slack
  const hook = process.env.SLACK_WEBHOOK_URL;
  if (hook) {
    const base = process.env.NEXT_PUBLIC_PUBLISHED_BASE || "https://buildlocal.agency";
    await fetch(hook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: `🔥 *Lead!* ${businessName || slug} is interested.\n👤 ${name || "?"}  📞 ${phone || "no phone"}${email ? "  ✉️ " + email : ""}\n📦 Wants: *${pkg || "a plan"}*\n${base}/p/${slug}`,
      }),
    }).catch(() => {});
  }

  return NextResponse.json({ ok: true });
}
