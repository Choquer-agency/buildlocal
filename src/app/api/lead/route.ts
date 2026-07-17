import { NextRequest, NextResponse } from "next/server";
import { getRecord, patchRecord } from "@/lib/crm-store";
import { pricingTiers } from "@/content/shared";

export const dynamic = "force-dynamic";

// A business owner submitted the "Schedule a Call" funnel → they're interested.
// Log it to the CRM (activity + notes) and ping Slack so Bryce can call them.
export async function POST(req: NextRequest) {
  const { slug, businessName, name, phone, email, package: pkg } =
    (await req.json()) as { slug: string; businessName?: string; name?: string; phone?: string; email?: string; package?: string };
  if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 });

  // Resolve the chosen package to its price → shown beside the name + set as deal value.
  const tier = pkg ? pricingTiers.find((t) => t.name === pkg) : undefined;
  const pkgLabel = pkg ? `${pkg}${tier ? ` (${tier.priceRange})` : ""}` : "a plan";
  const dealValue = tier?.monthlyPrice;

  const summary = `Interested via site — ${name || "?"} · ${phone || "no phone"}${email ? " · " + email : ""} · wants ${pkgLabel}`;

  try {
    const current = await getRecord(slug);
    const activity = [...(current.activity || []), { ts: new Date().toISOString(), label: `🔥 Became a lead — ${summary}` }].slice(-100);
    const notes = current.notes ? `${current.notes}\n${summary}` : summary;
    // Mark as a Lead the moment they submit interest — unless the deal is already
    // further along (contacted/quoted/won) or closed (lost), which we don't downgrade.
    const keep: (typeof current.status)[] = ["contacted", "no_answer", "quoted", "won", "lost"];
    const setLead = !keep.includes(current.status);
    await patchRecord(slug, {
      activity, notes,
      ...(setLead ? { status: "lead" as const } : {}),
      // Set the client's deal value to the price of the package they picked.
      ...(dealValue ? { dealValue } : {}),
    });
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
        text: `🔥 *Lead!* ${businessName || slug} is interested.\n👤 ${name || "?"}  📞 ${phone || "no phone"}${email ? "  ✉️ " + email : ""}\n📦 Wants: *${pkgLabel}*\n${base}/p/${slug}`,
      }),
    }).catch(() => {});
  }

  return NextResponse.json({ ok: true });
}
