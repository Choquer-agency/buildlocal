// Slack pings for the sales loop. One message shape, used by the QR-scan
// handler and by the "Send to Slack" button on the pre-call brief.

export interface ScanBiz {
  slug: string;
  name: string;
  phone: string;
  owner?: string;
  existingWebsite?: string;
  address: { locality: string; region: string };
}

export interface BriefHighlights {
  headline?: string;
  monthlyTraffic?: number;
  healthScore?: number | null;
  missedClicks?: number;
}

/**
 * Post the "call them now" card: who they are, how to reach them, and a link
 * straight to the pre-call brief.
 * `reason` distinguishes a live scan from a manual re-send.
 */
export async function notifyScan(
  biz: ScanBiz,
  { reason = "scan", highlights }: { reason?: "scan" | "manual"; highlights?: BriefHighlights } = {}
): Promise<boolean> {
  const hook = process.env.SLACK_WEBHOOK_URL;
  if (!hook) return false;

  const base = process.env.NEXT_PUBLIC_PUBLISHED_BASE || "https://buildlocal.agency";
  const brief = `${base}/admin/prospect/${biz.slug}`;
  const site = `${base}/p/${biz.slug}`;
  const owner = biz.owner && biz.owner.trim().toLowerCase() !== biz.name.trim().toLowerCase() ? biz.owner : null;

  const title = reason === "scan" ? "🔔 *QR scanned — call them now*" : "📋 *Pre-call brief*";
  const text =
    reason === "scan"
      ? `🔔 QR scanned — ${biz.name} · ${biz.phone || "no phone on file"}`
      : `📋 Pre-call brief — ${biz.name} · ${biz.phone || "no phone on file"}`;

  const stats: string[] = [];
  if (highlights?.monthlyTraffic !== undefined) stats.push(`${highlights.monthlyTraffic} organic visits/mo`);
  if (highlights?.healthScore != null) stats.push(`site health ${highlights.healthScore}%`);
  if (highlights?.missedClicks) stats.push(`~${highlights.missedClicks} clicks/mo being missed`);

  const blocks: Record<string, unknown>[] = [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text:
          `${title}\n\n` +
          `*${biz.name}*${owner ? `\n👤 ${owner}` : ""}\n` +
          `📞 *${biz.phone || "No phone on file"}*\n` +
          `📍 ${biz.address.locality}, ${biz.address.region}`,
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text:
          `*<${brief}|📋 Open the pre-call brief>* — traffic, rankings + what's broken on their site\n` +
          `<${site}|The site we built them>`,
      },
    },
  ];

  if (highlights?.headline) {
    blocks.push({
      type: "section",
      text: { type: "mrkdwn", text: `_${highlights.headline}_` },
    });
  }

  blocks.push({
    type: "context",
    elements: [
      {
        type: "mrkdwn",
        text: [stats.join(" · "), biz.existingWebsite ? `Their site: ${biz.existingWebsite}` : "No existing website on file"]
          .filter(Boolean)
          .join("  ·  "),
      },
    ],
  });

  const res = await fetch(hook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, blocks }),
  }).catch(() => null);

  return !!res?.ok;
}
