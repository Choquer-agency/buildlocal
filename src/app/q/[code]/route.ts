import { NextRequest, NextResponse } from "next/server";
import { getBusinessByQrCode } from "@/content/businesses";
import { recordScan } from "@/lib/crm-store";

export const dynamic = "force-dynamic";

// QR target. On scan: log it, advance status to "scanned", ping Slack, then
// redirect to the business's published site.
export async function GET(req: NextRequest, { params }: { params: { code: string } }) {
  const biz = getBusinessByQrCode(params.code);
  if (!biz) return NextResponse.redirect(new URL("/", req.url));

  try {
    await recordScan(biz.slug);
    await notifySlack(biz.name, biz.slug, biz.phone, biz.owner);
  } catch (e) {
    console.error("scan log failed:", e);
  }

  return NextResponse.redirect(new URL(`/p/${biz.slug}`, req.url));
}

async function notifySlack(name: string, slug: string, phone: string, owner?: string) {
  const hook = process.env.SLACK_WEBHOOK_URL;
  if (!hook) return;
  const base = process.env.NEXT_PUBLIC_PUBLISHED_BASE || "https://buildlocal.agency";
  const ownerLine = owner && owner.trim().toLowerCase() !== name.trim().toLowerCase() ? `\n👤 ${owner}` : "";
  const text =
    `🔔 *QR scanned!*\n` +
    `${name} just looked at their site.${ownerLine}\n\n` +
    `${phone || "No phone on file"}\n` +
    `*Call them now*\n\n` +
    `${base}/p/${slug}`;
  await fetch(hook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  }).catch(() => {});
}
