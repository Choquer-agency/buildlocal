import { NextRequest, NextResponse } from "next/server";
import { waitUntil } from "@vercel/functions";
import { getBusinessByQrCode } from "@/content/businesses";
import { recordScan } from "@/lib/crm-store";
import { getOrBuildIntel, seedKeywordFor } from "@/lib/prospect-intel";

export const dynamic = "force-dynamic";
// The background intel build (SE Ranking pull + site audit) runs past the redirect.
export const maxDuration = 180;

// QR target. On scan: log it, advance status to "scanned", ping Slack with the
// pre-call brief link, then redirect to the business's published site.
// The redirect is never blocked on the SE Ranking pull — that runs in the
// background so the brief is ready by the time the Slack link gets clicked.
export async function GET(req: NextRequest, { params }: { params: { code: string } }) {
  const biz = getBusinessByQrCode(params.code);
  if (!biz) return NextResponse.redirect(new URL("/", req.url));

  try {
    await recordScan(biz.slug);
    await notifySlack(biz);
    if (biz.existingWebsite) {
      waitUntil(
        getOrBuildIntel(
          {
            slug: biz.slug,
            name: biz.name,
            existingWebsite: biz.existingWebsite,
            seedKeyword: seedKeywordFor(biz),
          },
          // A scan means a call is imminent — don't serve yesterday's numbers.
          { maxAgeHours: 6 }
        ).catch((e) => console.error("intel warm-up failed:", e))
      );
    }
  } catch (e) {
    console.error("scan log failed:", e);
  }

  return NextResponse.redirect(new URL(`/p/${biz.slug}`, req.url));
}

interface ScanBiz {
  slug: string;
  name: string;
  phone: string;
  owner?: string;
  existingWebsite?: string;
  address: { locality: string; region: string };
}

async function notifySlack(biz: ScanBiz) {
  const hook = process.env.SLACK_WEBHOOK_URL;
  if (!hook) return;
  const base = process.env.NEXT_PUBLIC_PUBLISHED_BASE || "https://buildlocal.agency";
  const brief = `${base}/admin/prospect/${biz.slug}`;
  const site = `${base}/p/${biz.slug}`;
  const owner = biz.owner && biz.owner.trim().toLowerCase() !== biz.name.trim().toLowerCase() ? biz.owner : null;

  const text = `🔔 QR scanned — ${biz.name} · ${biz.phone || "no phone on file"}`;
  const body = {
    text, // notification fallback
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text:
            `🔔 *QR scanned — call them now*\n\n` +
            `*${biz.name}*${owner ? `\n👤 ${owner}` : ""}\n` +
            `📞 *${biz.phone || "No phone on file"}*\n` +
            `📍 ${biz.address.locality}, ${biz.address.region}`,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*<${brief}|📋 Open the pre-call brief>* — traffic, rankings + what's broken on their site\n<${site}|The site we built them>`,
        },
      },
      {
        type: "context",
        elements: [{ type: "mrkdwn", text: biz.existingWebsite ? `Their current site: ${biz.existingWebsite}` : "No existing website on file" }],
      },
    ],
  };

  await fetch(hook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).catch(() => {});
}
