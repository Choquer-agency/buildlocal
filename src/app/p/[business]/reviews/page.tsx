import { notFound } from "next/navigation";
import { ArrowRight, Star } from "lucide-react";
import { getBusinessConfig } from "@/content/businesses";
import { resolveTheme } from "@/lib/crm-store";
import { BizReviews, BizCta } from "@/components/biz/BizSections";

interface PageProps {
  params: { business: string };
}

export const dynamic = "force-dynamic";

export default async function ReviewsPage({ params }: PageProps) {
  const b = getBusinessConfig(params.business);
  if (!b) notFound();
  const theme = await resolveTheme(b);
  const photo = b.photos[0];

  return (
    <>
      {/* Hero: text left, rounded image right — soft brand bg matching the review cards below */}
      <header style={{ background: theme.softBg }}>
        <div className="u-container pt-28 md:pt-32 pb-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div>
              <p className="font-mono text-xs uppercase tracking-wider mb-4" style={{ color: theme.accentOnSoft ?? theme.accent }}>Reviews</p>
              <h1 className="font-head font-medium leading-[1.05] text-dark mb-4" style={{ fontSize: "clamp(2.2rem, 3.5vw, 3.8rem)" }}>
                Loved by {b.address.locality} homeowners
              </h1>
              <div className="flex items-center gap-2 mb-5">
                <span className="inline-flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={18} fill={i <= Math.round(b.rating) ? theme.accent : "none"} stroke={theme.accent} />
                  ))}
                </span>
                <span className="font-biz text-fluid-main text-dark/60">{b.rating.toFixed(1)} · {b.reviewCount} reviews</span>
              </div>
              <p className="font-biz text-fluid-main text-dark/60 leading-relaxed max-w-[46ch] mb-7">
                Here&apos;s what homeowners across {b.address.locality} and the surrounding area say about working with {b.name}.
              </p>
              <a href={`/p/${b.slug}/contact`} className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-biz font-semibold text-fluid-main hover:opacity-90 transition-opacity" style={{ background: theme.ctaBg ?? theme.accent, color: theme.ctaFg ?? theme.onAccent }}>
                Get a Free Quote <ArrowRight size={17} />
              </a>
            </div>
            <div className="relative min-h-[46vh] lg:min-h-[64vh] rounded-3xl overflow-hidden">
              {photo && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={photo} alt={`${b.name} work`} className="absolute inset-0 w-full h-full object-cover" />
              )}
            </div>
          </div>
        </div>
      </header>

      <BizReviews b={b} theme={theme} all />
      <BizCta b={b} theme={theme} />
    </>
  );
}
