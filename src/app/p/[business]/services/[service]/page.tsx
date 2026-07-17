import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Check, PenTool, Sun, Tag, ShieldCheck } from "lucide-react";
import { getBusinessConfig } from "@/content/businesses";
import { resolveTheme } from "@/lib/crm-store";
import { tradeWords } from "@/lib/trade-copy";
import { BizWhyChooseUs, BizGallery, BizReviews, BizCta } from "@/components/biz/BizSections";

interface PageProps {
  params: { business: string; service: string };
}

export function generateMetadata({ params }: PageProps): Metadata {
  const b = getBusinessConfig(params.business);
  const s = b?.services.find((x) => x.slug === params.service);
  if (!b || !s) return { robots: { index: false, follow: false } };
  return {
    robots: { index: false, follow: false },
    title: `${s.name} in ${b.address.locality}, ${b.address.region} | ${b.name}`,
    description: s.blurb,
  };
}

export const dynamic = "force-dynamic";

export default async function ServiceDetail({ params }: PageProps) {
  const b = getBusinessConfig(params.business);
  if (!b) notFound();
  const s = b.services.find((x) => x.slug === params.service);
  if (!s) notFound();
  const theme = await resolveTheme(b);
  const svcIndex = b.services.findIndex((x) => x.slug === s.slug);
  const heroImg = s.image ?? (b.photos.length ? b.photos[(svcIndex + 1) % b.photos.length] : undefined);
  const feature2Img = b.photos[(svcIndex + 2) % Math.max(b.photos.length, 1)] || heroImg;
  const az = b.address.region === "AZ" ? "Arizona" : "local";

  const heroBullets = [
    "Free on-site consultation & quote",
    `Built for the ${az} climate`,
    "Licensed, bonded & insured",
    "Workmanship guaranteed",
  ];

  const features = [
    { icon: <PenTool size={22} />, title: "Tailored to your space", desc: `Every ${s.name.toLowerCase()} project is planned around your property, budget, and how you want to use it.` },
    { icon: <Sun size={22} />, title: `Built for ${az}`, desc: tradeWords(b).builtForDesc },
    { icon: <Tag size={22} />, title: "Honest, upfront pricing", desc: "A clear quote after a free on-site visit — no surprises and no pressure." },
    { icon: <ShieldCheck size={22} />, title: "Done right, guaranteed", desc: "Licensed, bonded, insured crews who take pride in every last detail." },
  ];

  return (
    <>
      {/* Hero — text left (on white), rounded image right */}
      <header className="bg-white">
        <div className="u-container pt-28 md:pt-32 pb-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* Left: text */}
            <div className="flex flex-col justify-center">
              <p className="font-mono text-xs uppercase tracking-wider mb-4" style={{ color: theme.accentOnWhite ?? theme.accent }}>
                {b.address.locality} · {b.primaryCategory}
              </p>
              <h1 className="font-head font-medium leading-[1.05] text-dark mb-5" style={{ fontSize: "clamp(2.2rem, 3.5vw, 3.8rem)" }}>
                {s.name}
              </h1>
              <p className="font-biz text-fluid-large text-dark/60 leading-relaxed max-w-[46ch] mb-7">
                {s.body || s.blurb}
              </p>
              <a href={`/p/${b.slug}/contact`} className="inline-flex w-fit items-center gap-2 rounded-full px-7 py-3.5 font-biz font-semibold text-fluid-main mb-9 hover:opacity-90 transition-opacity" style={{ background: theme.ctaBg ?? theme.accent, color: theme.ctaFg ?? theme.onAccent }}>
                Get a Free Quote <ArrowRight size={17} />
              </a>
              <ul className="grid sm:grid-cols-2 gap-3">
                {heroBullets.map((pt) => (
                  <li key={pt} className="flex items-center gap-2.5 font-biz text-sm text-dark/70">
                    <span className="grid place-items-center rounded-full flex-shrink-0" style={{ width: 22, height: 22, background: theme.accent, color: theme.onAccent }}>
                      <Check size={13} />
                    </span>
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
            {/* Right: rounded image */}
            <div className="relative min-h-[46vh] lg:min-h-[70vh] rounded-3xl overflow-hidden">
              {heroImg && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={heroImg} alt={s.name} className="absolute inset-0 w-full h-full object-cover" />
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Section 2 — image left + 4 icon features */}
      <section className="bg-white">
        <div className="section-space-main">
          <div className="u-container">
            <p className="font-mono text-xs uppercase tracking-wider mb-4" style={{ color: theme.accentOnWhite ?? theme.accent }}>What you get</p>
            <h2 className="font-head font-medium text-fluid-h2 leading-[1.12] text-dark max-w-[22ch] mb-12">
              {s.name}, done the right way
            </h2>
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Features (left) */}
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-9">
                {features.map((f) => (
                  <div key={f.title}>
                    <span className="grid place-items-center rounded-xl mb-3" style={{ width: 46, height: 46, background: theme.iconChipBg ?? theme.softBg, color: theme.iconChipFg ?? theme.accent }}>
                      {f.icon}
                    </span>
                    <h3 className="font-biz font-semibold text-dark mb-1.5">{f.title}</h3>
                    <p className="font-biz text-fluid-main text-dark/55 leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>
              {/* Photo (right) */}
              {feature2Img && (
                <div className="rounded-2xl overflow-hidden aspect-[4/3.4]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={feature2Img} alt={`${b.name} ${s.name}`} className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <BizWhyChooseUs b={b} theme={theme} serviceName={s.name} />
      <BizGallery b={b} theme={theme} />
      <BizReviews b={b} theme={theme} />
      <BizCta b={b} theme={theme} />
    </>
  );
}
