import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { getBusinessConfig } from "@/content/businesses";
import { resolveTheme } from "@/lib/crm-store";
import { tradeWords } from "@/lib/trade-copy";
import { BizServicesGrid, BizCta } from "@/components/biz/BizSections";

interface PageProps {
  params: { business: string };
}

export const dynamic = "force-dynamic";

export default async function ServicesPage({ params }: PageProps) {
  const b = getBusinessConfig(params.business);
  if (!b) notFound();
  const theme = await resolveTheme(b);
  const tw = tradeWords(b);
  const az = b.address.region === "AZ" ? "Arizona" : "local";
  const photo = b.photos[0];

  return (
    <>
      {/* Hero: heading left, body right, then a full-width photo (fits ~1 screen) */}
      <section className="bg-white">
        <div className="u-container pt-32 md:pt-44 pb-14 md:pb-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 lg:items-end">
            <h1 className="font-head font-medium leading-[1.04] text-dark" style={{ fontSize: "clamp(2.3rem, 4.2vw, 4.4rem)" }}>
              {tw.lead} services in {b.address.locality}, {b.address.region}
            </h1>
            <div className="lg:pb-2">
              <p className="font-biz text-fluid-main text-dark/60 leading-relaxed mb-5 max-w-[46ch]">
                {tw.servicesIntro(b.name, az)}
              </p>
              <a href={`/p/${b.slug}/contact`} className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-biz font-semibold text-fluid-main hover:opacity-90 transition-opacity" style={{ background: theme.ctaBg ?? theme.accent, color: theme.ctaFg ?? theme.onAccent }}>
                Get a Free Quote <ArrowRight size={17} />
              </a>
            </div>
          </div>
        </div>
        {photo && (
          <div className="w-full overflow-hidden" style={{ height: "60vh" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo} alt={`${b.name} ${tw.noun} work`} className="w-full h-full object-cover" />
          </div>
        )}
      </section>

      <BizServicesGrid b={b} theme={theme} heading={`Everything ${b.name.split(/\s+/)[0]} does`} />
      <BizCta b={b} theme={theme} />
    </>
  );
}
