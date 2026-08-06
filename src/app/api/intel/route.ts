import { NextRequest, NextResponse } from "next/server";
import { businessMap } from "@/content/businesses";
import { getIntel, getOrBuildIntel, seedKeywordFor } from "@/lib/prospect-intel";

export const dynamic = "force-dynamic";
// The audit poll can run ~2 min; Fluid Compute allows well beyond that.
export const maxDuration = 180;

// GET ?slug=... → cached intel (no live pull).
export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");
  if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 });
  return NextResponse.json({ intel: await getIntel(slug) });
}

// POST { slug, force? } → build/refresh the SE Ranking brief for a business.
// Called by the scan handler (warm-up) and the Refresh button.
export async function POST(req: NextRequest) {
  const { slug, force } = (await req.json().catch(() => ({}))) as { slug?: string; force?: boolean };
  if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 });

  const b = businessMap[slug];
  if (!b) return NextResponse.json({ error: "not found" }, { status: 404 });
  if (!b.existingWebsite) {
    return NextResponse.json({ error: "no existing website on file for this business" }, { status: 422 });
  }

  const intel = await getOrBuildIntel(
    { slug, name: b.name, existingWebsite: b.existingWebsite, seedKeyword: seedKeywordFor(b) },
    { force: !!force }
  );

  if (!intel) {
    return NextResponse.json(
      { error: "No data. Set SERANKING_API_KEY to enable live pulls." },
      { status: 503 }
    );
  }
  return NextResponse.json({ ok: true, intel });
}
