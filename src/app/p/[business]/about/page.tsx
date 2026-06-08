import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { getBusinessConfig } from "@/content/businesses";
import { resolveTheme } from "@/lib/crm-store";
import { tradeWords } from "@/lib/trade-copy";
import { BizAbout, BizCta } from "@/components/biz/BizSections";

interface PageProps {
  params: { business: string };
}

export const dynamic = "force-dynamic";

export default async function AboutPage({ params }: PageProps) {
  const b = getBusinessConfig(params.business);
  if (!b) notFound();
  const theme = await resolveTheme(b);
  const photo = b.photos[0];
  const az = b.address.region === "AZ" ? "Arizona" : "local";

  return (
    <>
      {/* Hero: heading left, body right, then a full-width photo */}
      <section className="bg-white">
        <div className="u-container pt-32 md:pt-44 pb-14 md:pb-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 lg:items-end">
            <h1 className="font-head font-medium leading-[1.04] text-dark" style={{ fontSize: "clamp(2.3rem, 4.2vw, 4.4rem)" }}>
              About {b.name}
            </h1>
            <div className="lg:pb-2">
              <p className="font-biz text-fluid-main text-dark/60 leading-relaxed mb-5 max-w-[46ch]">
                Locally owned and trusted across {b.address.locality}, {tradeWords(b).aboutLine(b.name, az)}
              </p>
              <a href={`/p/${b.slug}/contact`} className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-biz font-semibold text-fluid-main hover:opacity-90 transition-opacity" style={{ background: theme.accent, color: theme.onAccent }}>
                Get a Free Quote <ArrowRight size={17} />
              </a>
            </div>
          </div>
        </div>
        {photo && (
          <div className="w-full overflow-hidden" style={{ height: "60vh" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo} alt={`${b.name}`} className="w-full h-full object-cover" />
          </div>
        )}
      </section>

      <BizAbout b={b} theme={theme} />
      <BizCta b={b} theme={theme} />
    </>
  );
}
