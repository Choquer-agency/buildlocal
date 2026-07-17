import { notFound } from "next/navigation";
import { Metadata } from "next";
import { ArrowRight, MapPin } from "lucide-react";
import { getBusinessConfig } from "@/content/businesses";
import { resolveTheme } from "@/lib/crm-store";
import { areaSlug } from "@/lib/schema-business";
import { tradeWords } from "@/lib/trade-copy";
import { BizServicesGrid, BizReviews, BizCta } from "@/components/biz/BizSections";

interface PageProps {
  params: { business: string; area: string };
}

export const dynamic = "force-dynamic";

function findArea(b: ReturnType<typeof getBusinessConfig>, slug: string) {
  return b?.serviceAreas.find((a) => areaSlug(a) === slug);
}

export function generateMetadata({ params }: PageProps): Metadata {
  const b = getBusinessConfig(params.business);
  const area = findArea(b, params.area);
  if (!b || !area) return { robots: { index: false, follow: false } };
  const tw = tradeWords(b);
  return {
    robots: { index: false, follow: false },
    title: `${tw.areaH1(area, b.address.region)} | ${b.name}`,
    description: `${b.name} provides professional ${tw.noun} in ${area}, ${b.address.region}. ${b.rating}★ from ${b.reviewCount} reviews. Free quotes.`,
  };
}

export default async function AreaPage({ params }: PageProps) {
  const b = getBusinessConfig(params.business);
  if (!b) notFound();
  const area = findArea(b, params.area);
  if (!area) notFound();
  const theme = await resolveTheme(b);
  const tw = tradeWords(b);
  const az = b.address.region === "AZ" ? "Arizona" : "local";
  const photo = b.photos[0];

  return (
    <>
      {/* Hero */}
      <section className="bg-white">
        <div className="u-container pt-32 md:pt-44 pb-14 md:pb-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 lg:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-wider mb-4 inline-flex items-center gap-2" style={{ color: theme.accentOnWhite ?? theme.accent }}>
                <MapPin size={13} /> {area}, {b.address.region}
              </p>
              <h1 className="font-head font-medium leading-[1.04] text-dark" style={{ fontSize: "clamp(2.3rem, 4.2vw, 4.4rem)" }}>
                {tw.areaH1(area, b.address.region)}
              </h1>
            </div>
            <div className="lg:pb-2">
              <p className="font-biz text-fluid-main text-dark/60 leading-relaxed mb-5 max-w-[46ch]">
                {tw.areaBody(b.name, area, az)}
              </p>
              <a href={`/p/${b.slug}/contact`} className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-biz font-semibold text-fluid-main hover:opacity-90 transition-opacity" style={{ background: theme.ctaBg ?? theme.accent, color: theme.ctaFg ?? theme.onAccent }}>
                Get a Free Quote <ArrowRight size={17} />
              </a>
            </div>
          </div>
        </div>
        {photo && (
          <div className="w-full overflow-hidden" style={{ height: "55vh" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo} alt={`${b.name} ${tw.noun} in ${area}`} className="w-full h-full object-cover" />
          </div>
        )}
      </section>

      <BizServicesGrid b={b} theme={theme} heading={`${tw.lead} services in ${area}`} />
      <BizReviews b={b} theme={theme} />
      <BizCta b={b} theme={theme} />
    </>
  );
}
