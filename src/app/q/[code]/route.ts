import { NextRequest, NextResponse } from "next/server";
import { waitUntil } from "@vercel/functions";
import { getBusinessByQrCode } from "@/content/businesses";
import { recordScan } from "@/lib/crm-store";
import { getOrBuildIntel, seedKeywordFor } from "@/lib/prospect-intel";
import { notifyScan } from "@/lib/slack";

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
    await notifyScan(biz);
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
