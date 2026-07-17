import Link from "next/link";
import {
  Leaf, Sprout, Trees, Droplets, Hammer, Scissors, Ruler,
  Phone, Star, MapPin, Clock, ArrowRight, ArrowUpRight, Check, Heart,
} from "lucide-react";
import { BusinessProfile } from "@/content/businesses";
import { Theme, onColor } from "@/lib/themes";
import { telHref } from "@/lib/schema-business";
import { tradeWords } from "@/lib/trade-copy";
import { BizContactForm } from "./BizContactForm";

/* ── helpers ── */

/**
 * Readable text colors for a section, derived from its own background luminance.
 * Light bg → near-black ink (the default look); dark bg → light ink. This keeps
 * any section legible even when a business's brand color makes softBg/heroBg dark.
 */
function ink(bg: string) {
  const light = onColor(bg) === "#ffffff"; // bg is dark → use light text
  const rgb = light ? "255,255,255" : "12,12,12";
  return {
    light,
    strong: `rgba(${rgb},0.95)`,
    body: `rgba(${rgb},${light ? 0.8 : 0.7})`,
    muted: `rgba(${rgb},${light ? 0.65 : 0.55})`,
    line: `rgba(${rgb},${light ? 0.18 : 0.1})`,
  };
}

function serviceIcon(slug: string, size = 22) {
  const s = slug.toLowerCase();
  if (/design|plan|consult/.test(s)) return <Ruler size={size} />;
  if (/xeri|desert|rock|gravel|succulent|cactus/.test(s)) return <Sprout size={size} />;
  if (/turf|grass|sod|lawn(?!.*(care|maint))|putting/.test(s)) return <Trees size={size} />;
  if (/paver|hardscape|stone|mason|concrete|patio|wall|walkway|deck|fire/.test(s)) return <Hammer size={size} />;
  if (/irrigat|sprinkler|drip|water/.test(s)) return <Droplets size={size} />;
  if (/maint|mow|clean|trim|weed|care|service/.test(s)) return <Scissors size={size} />;
  if (/tree|plant|shrub|garden|flower/.test(s)) return <Trees size={size} />;
  return <Leaf size={size} />;
}

/** Safely cycle through a business's photo pool so each slot gets an image. */
function pick(photos: string[], i: number): string | undefined {
  if (!photos || photos.length === 0) return undefined;
  return photos[i % photos.length];
}

function Stars({ rating, size = 16, color }: { rating: number; size?: number; color: string }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          fill={i <= Math.round(rating) ? color : "none"}
          stroke={color}
        />
      ))}
    </span>
  );
}

/* ── Hero (Theme 1: full-viewport media, overlay, floating bottom content) ── */

export function BizHero({ b, theme }: { b: BusinessProfile; theme: Theme }) {
  const c = b.generatedCopy;
  return (
    <header className="relative h-[100svh] min-h-[600px] overflow-hidden bg-black">
      {b.heroVideo ? (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" src={b.heroVideo} />
      ) : b.photos[0] ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={b.photos[0]} alt={b.name} className="absolute inset-0 w-full h-full object-cover" />
      ) : null}

      {/* Overlay — darker at the bottom so the white text pops */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.22) 42%, rgba(0,0,0,0.35) 100%)" }} />

      <div className="relative h-full u-container flex flex-col justify-end pb-14 md:pb-20 text-white">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-7">
          {/* Left: stars → heading → bright CTA (~48vw) */}
          <div className="lg:w-[48vw] lg:max-w-[48vw]">
            <div className="inline-flex items-center gap-2 mb-4">
              <Stars rating={b.rating} color="#ffffff" size={18} />
              <span className="font-mono text-xs md:text-sm opacity-90">{b.rating.toFixed(1)} · {b.reviewCount} reviews</span>
            </div>
            <h1 className="font-head font-medium leading-[1.04] tracking-tight mb-6" style={{ fontSize: "clamp(2.1rem, 4vw, 4.2rem)" }}>
              {c.heroH1}
            </h1>
            <a href={`/p/${b.slug}/contact`} className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-biz font-semibold text-fluid-main shadow-lg hover:opacity-90 transition-opacity" style={{ background: theme.ctaBg ?? theme.accent, color: theme.ctaFg ?? theme.onAccent }}>
              Get a Free Quote <ArrowRight size={18} />
            </a>
          </div>

          {/* Right: supporting body (~25vw) */}
          <div className="lg:w-[26vw] lg:max-w-[26vw] lg:pb-2">
            <p className="font-biz text-fluid-main opacity-85 leading-relaxed">{c.heroSubhead}</p>
            <p className="mt-4 font-mono text-xs opacity-70 flex items-center gap-2">
              <MapPin size={13} /> Serving {b.serviceAreas.slice(0, 4).join(", ")}{b.serviceAreas.length > 4 ? " & more" : ""}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ── Stat band ── */

export function BizStats({ b, theme }: { b: BusinessProfile; theme: Theme }) {
  const stats = [
    { value: b.rating.toFixed(1), label: "Average rating" },
    { value: `${b.reviewCount}`, label: "5-star reviews" },
    { value: `${b.yearsInBusiness ?? "10"}+`, label: "Years in business" },
    { value: `${b.serviceAreas.length}`, label: "Cities served" },
  ];
  return (
    <section style={{ background: theme.darkBg }} className="text-white">
      <div className="section-space-small">
        <div className="u-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-biz font-medium text-fluid-h3" style={{ color: theme.accent }}>{s.value}</p>
                <p className="font-biz text-fluid-small opacity-70">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Services grid (Section 2: centered head, image→solid hover cards, marquee) ── */

function marqueeWords(b: BusinessProfile): string[] {
  // Derive from the business's REAL service names (works for any trade), led by
  // the trade word. Shortened to the first couple words of each service.
  const short = (name: string) => name.split(/[\s/&,]+/).filter(Boolean).slice(0, 2).join(" ");
  const words = [tradeWords(b).lead, ...b.services.map((s) => short(s.name))];
  return Array.from(new Set(words)).slice(0, 8);
}

export function BizServicesGrid({ b, theme, heading }: { b: BusinessProfile; theme: Theme; heading?: string }) {
  const services = b.showAllServices ? b.services : b.services.slice(0, 6);
  const words = marqueeWords(b);
  const marquee = [...words, ...words].map((w, i) => (
    <span key={i} className="inline-flex items-center">
      <span className="px-6">{w}</span>
      <span>&bull;</span>
    </span>
  ));
  return (
    <section style={{ background: "#fff" }} className="overflow-hidden">
      <div className="section-space-main">
        {/* Centered heading */}
        <div className="u-container text-center">
          <p className="font-mono text-xs uppercase tracking-wider mb-4" style={{ color: theme.accentOnWhite ?? theme.accent }}>
            What we offer
          </p>
          <h2 className="font-head font-medium text-fluid-h2 leading-[1.12] text-dark max-w-[34ch] mx-auto mb-12">
            {heading || tradeWords(b).servicesHeading(b.address.locality)}
          </h2>
        </div>

        {/* Cards: image bg → solid color + icon on hover */}
        <div className="u-container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => {
              const img = s.image ?? pick(b.photos, i + 1);
              return (
                <Link key={s.slug} href={`/p/${b.slug}/services/${s.slug}`}
                  className="group relative aspect-[4/5] rounded-2xl overflow-hidden">
                  {/* base image */}
                  {img && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={img} alt={s.name} className="absolute inset-0 w-full h-full object-cover" />
                  )}
                  {/* default legibility gradient */}
                  <div className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.05) 55%)" }} />
                  {/* solid color on hover — 80% so the image peeks through */}
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-80" style={{ background: theme.accentDark }} />
                  {/* content */}
                  <div className="absolute inset-0 p-6 flex flex-col text-white">
                    <span className="opacity-0 -translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                      {serviceIcon(s.slug, 100)}
                    </span>
                    <div className="mt-auto pr-12">
                      <h3 className="font-biz font-semibold leading-tight mb-1.5" style={{ fontSize: "clamp(1.7rem, 1.4vw + 1rem, 2.4rem)" }}>{s.name}</h3>
                      <p className="font-biz text-sm text-white/75 leading-relaxed max-h-0 opacity-0 overflow-hidden transition-all duration-300 group-hover:max-h-32 group-hover:opacity-100">
                        {s.blurb}
                      </p>
                    </div>
                  </div>
                  {/* link arrow, bottom-right — appears on hover */}
                  <span className="absolute bottom-5 right-5 grid place-items-center w-11 h-11 rounded-full bg-white text-dark opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    <ArrowUpRight size={20} />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Big scrolling marquee heading (sans), ~half in view */}
        <div className="mt-16 md:mt-24 select-none" aria-hidden="true">
          <div className="flex w-max animate-marquee whitespace-nowrap font-biz font-semibold leading-none text-dark/[0.07]"
            style={{ fontSize: "clamp(4rem, 12vw, 11rem)" }}>
            {marquee}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Why choose us (Section 3) ── */

export function BizWhyChooseUs({ b, theme, serviceName }: { b: BusinessProfile; theme: Theme; serviceName?: string }) {
  const review = b.reviews.find((r) => r.text);
  const img = pick(b.photos, 2) || b.photos[0];
  const az = b.address.region === "AZ" ? "Arizona" : "local";
  const tw = tradeWords(b).whyPoints(az);
  const points = [
    { icon: <Leaf size={20} />, ...tw[0] },
    { icon: <Heart size={20} />, ...tw[1] },
  ];
  return (
    <section style={{ background: "#fff" }}>
      <div className="section-space-main">
        <div className="u-container grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: image + floating testimonial card */}
          <div className="relative">
            {img && (
              <div className="rounded-2xl overflow-hidden aspect-[4/3.4]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt={`${b.name} work`} className="w-full h-full object-cover" />
              </div>
            )}
            {review && (
              <div className="absolute bottom-4 left-4 right-10 sm:right-auto sm:max-w-[340px] bg-white rounded-xl shadow-xl p-4">
                <p className="font-biz text-sm text-dark leading-snug line-clamp-2">&ldquo;{review.text}&rdquo;</p>
                <div className="flex items-center gap-3 mt-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`https://i.pravatar.cc/80?u=${encodeURIComponent(review.author + b.slug)}`} alt={review.author} className="w-9 h-9 rounded-full object-cover" />
                  <div>
                    <p className="font-biz font-semibold text-xs text-dark">{review.author}</p>
                    <p className="font-biz text-xs text-dark/45">{b.address.locality}, {b.address.region}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right: copy + points + CTA */}
          <div>
            <p className="font-mono text-xs uppercase tracking-wider mb-4" style={{ color: theme.accentOnWhite ?? theme.accent }}>
              Why us
            </p>
            <h2 className="font-head font-medium text-fluid-h2 leading-[1.12] text-dark mb-5">
              {serviceName
                ? `Why choose ${b.name.split(/\s+/)[0]} for your ${serviceName.toLowerCase()}`
                : `Why ${b.address.locality} homeowners choose ${b.name.split(/\s+/)[0]}`}
            </h2>
            <p className="font-biz text-fluid-main text-dark/65 leading-relaxed mb-8 max-w-[46ch]">
              {b.generatedCopy.aboutBody[0]}
            </p>
            <div className="grid gap-5 mb-9">
              {points.map((p) => (
                <div key={p.title} className="flex items-start gap-4">
                  <span className="grid place-items-center rounded-full flex-shrink-0" style={{ width: 44, height: 44, background: theme.iconChipBg ?? theme.chipBg ?? theme.softBg, color: theme.iconChipFg ?? theme.accentOnChip ?? theme.accentOnSoft ?? theme.accent }}>
                    {p.icon}
                  </span>
                  <div>
                    <p className="font-biz font-semibold text-dark mb-0.5">{p.title}</p>
                    <p className="font-biz text-fluid-main text-dark/55 leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <a href={`/p/${b.slug}/contact`} className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-biz font-semibold text-fluid-main hover:opacity-90 transition-opacity" style={{ background: theme.ctaBg ?? theme.accent, color: theme.ctaFg ?? theme.onAccent }}>
              Get in touch <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── About ── */

export function BizAbout({ b, theme }: { b: BusinessProfile; theme: Theme }) {
  const c = b.generatedCopy;
  const t = ink(theme.heroBg);
  return (
    <section style={{ background: theme.heroBg }}>
      <div className="section-space-main">
        <div className="u-container grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider mb-4" style={{ color: theme.accentOnHero ?? theme.accent }}>
              About {b.name}
            </p>
            <h2 className="font-head font-medium text-fluid-h2 leading-[1.12] mb-6" style={{ color: t.strong }}>
              {c.aboutHeading}
            </h2>
            <div className="space-y-4 font-biz text-fluid-main leading-relaxed" style={{ color: t.body }}>
              {c.aboutBody.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>
          <div className="grid gap-3">
            {pick(b.photos, 2) && (
              <div className="rounded-lg overflow-hidden h-64">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={pick(b.photos, 2)} alt={`${b.name} work`} className="w-full h-full object-cover" />
              </div>
            )}
            {(b.photos?.length || 0) >= 4 && (
              <div className="grid grid-cols-2 gap-3 mb-2">
                {[pick(b.photos, 3), pick(b.photos, 4)].map((src, i) => (
                  <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-lg">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt={`${b.name} project`} className="absolute inset-0 w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
            {[
              "Locally owned & operated",
              "Free, no-pressure quotes",
              "Licensed, bonded & insured",
              `${b.rating.toFixed(1)}★ from ${b.reviewCount} verified reviews`,
            ].map((point) => (
              <div key={point} className="flex items-center gap-3 rounded-md bg-white border border-dark/8 px-5 py-4">
                <span className="grid place-items-center rounded-full flex-shrink-0" style={{ width: 28, height: 28, background: theme.accent, color: theme.onAccent }}>
                  <Check size={16} />
                </span>
                <span className="font-biz text-fluid-main text-dark">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Reviews ── */

export function BizReviews({ b, theme, all = false }: { b: BusinessProfile; theme: Theme; all?: boolean }) {
  const list = all ? b.reviews : b.reviews.slice(0, 3);
  const t = ink(theme.softBg);
  return (
    <section style={{ background: theme.softBg }}>
      <div className="section-space-main">
        {/* Heading + 1-sentence body, centered */}
        <div className="u-container text-center mb-12">
          <p className="font-mono text-xs uppercase tracking-wider mb-4" style={{ color: theme.accentOnSoft ?? theme.accent }}>
            Reviews
          </p>
          <h2 className="font-head font-medium text-fluid-h2 leading-[1.12] max-w-[22ch] mx-auto mb-4" style={{ color: t.strong }}>
            What {b.address.locality} homeowners say
          </h2>
          <p className="font-biz text-fluid-main max-w-[52ch] mx-auto" style={{ color: t.muted }}>
            Rated {b.rating.toFixed(1)} stars across {b.reviewCount} reviews from homeowners across {b.address.locality} and the surrounding area.
          </p>
        </div>

        <div className="u-container grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {list.map((r, i) => (
            <figure key={i} className="relative rounded-2xl bg-white border border-dark/8 shadow-sm p-7 flex flex-col">
              {/* big faint quote mark */}
              <span className="absolute top-5 right-6 font-head leading-none select-none" style={{ color: theme.accent, opacity: 0.18, fontSize: "3.5rem" }} aria-hidden>&rdquo;</span>
              <Stars rating={r.rating} color={theme.accent} size={18} />
              <blockquote className="mt-4 font-biz text-fluid-main text-dark/80 leading-relaxed">
                {r.text}
              </blockquote>
              <div className="mt-6 pt-5 border-t border-dark/8 flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`https://i.pravatar.cc/80?u=${encodeURIComponent(r.author + b.slug)}`} alt={r.author} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="font-biz font-semibold text-sm text-dark">{r.author}</p>
                  <p className="font-biz text-xs text-dark/45">{b.address.locality}, {b.address.region}{r.relativeTime ? ` · ${r.relativeTime}` : ""}</p>
                </div>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Service areas ── */

export function BizAreas({ b, theme }: { b: BusinessProfile; theme: Theme }) {
  const shots = (b.photos || []).slice(0, 4);
  const t = ink(theme.softBg);
  return (
    <section style={{ background: theme.softBg }}>
      <div className="section-space-main">
        <div className="u-container grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider mb-4" style={{ color: theme.accentOnSoft ?? theme.accent }}>
              Service area
            </p>
            <h2 className="font-head font-medium text-fluid-h2 leading-[1.12] max-w-[16ch] mb-5" style={{ color: t.strong }}>
              Proudly serving {b.address.locality} &amp; the surrounding area
            </h2>
            <p className="font-biz text-fluid-main leading-relaxed mb-7 max-w-[48ch]" style={{ color: t.body }}>
              {b.generatedCopy.serviceAreaBlurb}
            </p>
            <div className="flex flex-wrap gap-2.5">
              {b.serviceAreas.map((area) => (
                <span key={area} className="inline-flex items-center gap-2 rounded-full bg-white border border-dark/10 px-4 py-2 font-biz text-fluid-small text-dark">
                  <MapPin size={13} style={{ color: theme.accent }} /> {area}
                </span>
              ))}
            </div>
          </div>
          {shots.length >= 2 && (
            <div className="grid grid-cols-2 gap-3">
              {shots.map((src, i) => (
                <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt={`${b.name} project ${i + 1}`} className="absolute inset-0 w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ── Gallery ── */

export function BizGallery({ b, theme }: { b: BusinessProfile; theme: Theme }) {
  if (!b.photos || b.photos.length < 2) return null;
  const shots = b.photos.slice(0, 6);
  const t = ink(theme.softBg);
  return (
    <section style={{ background: theme.softBg }}>
      <div className="section-space-main">
        <div className="u-container">
          <p className="font-mono text-xs uppercase tracking-wider mb-4" style={{ color: theme.accentOnSoft ?? theme.accent }}>
            Recent work
          </p>
          <h2 className="font-head font-medium text-fluid-h2 leading-[1.12] max-w-[20ch] mb-10" style={{ color: t.strong }}>
            See what we&apos;ve built around {b.address.locality}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {shots.map((src, i) => (
              <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-lg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`${b.name} project ${i + 1}`}
                  className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Hours ── */

export function BizHours({ b, theme }: { b: BusinessProfile; theme: Theme }) {
  return (
    <div className="rounded-lg border border-dark/10 bg-white overflow-hidden">
      <div className="px-5 py-4 flex items-center gap-2 border-b border-dark/8" style={{ background: theme.softBg }}>
        <Clock size={16} style={{ color: theme.accent }} />
        <span className="font-biz font-medium" style={{ color: ink(theme.softBg).strong }}>Hours</span>
      </div>
      <ul className="divide-y divide-dark/6">
        {b.hours.map((h) => (
          <li key={h.day} className="flex items-center justify-between px-5 py-2.5">
            <span className="font-biz text-fluid-small text-dark/70">{h.day}</span>
            <span className="font-biz text-fluid-small text-dark">{h.hours}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── CTA band ── */

export function BizCta({ b, theme }: { b: BusinessProfile; theme: Theme }) {
  const c = b.generatedCopy;
  const bg = pick(b.photos, 6);
  return (
    <section className="relative overflow-hidden" style={{ background: theme.accentDark }}>
      {bg && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={bg} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0" style={{ background: theme.accentDark, opacity: 0.55 }} />
        </>
      )}
      <div className="section-space-main relative">
        <div className="u-container text-center max-w-2xl mx-auto" style={{ color: onColor(theme.accentDark) }}>
          <h2 className="font-head font-medium text-fluid-h2 leading-[1.12] mb-4">{c.ctaHeadline}</h2>
          <p className="font-biz text-fluid-large opacity-90 mb-8">{c.ctaSubhead}</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href={telHref(b.phone)}
              className="inline-flex items-center gap-2 rounded-md px-6 py-3.5 font-biz font-medium text-fluid-main bg-white"
              style={{ color: theme.accentDark }}
            >
              <Phone size={17} /> {b.phone}
            </a>
            <a
              href={`/p/${b.slug}/contact`}
              className="inline-flex items-center gap-2 rounded-md px-6 py-3.5 font-biz font-medium text-fluid-main border border-white/40 hover:bg-white/10 transition-colors"
            >
              Request a Free Quote <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Contact section (wraps the client form) ── */

export function BizContactSection({ b, theme }: { b: BusinessProfile; theme: Theme }) {
  const t = ink(theme.heroBg);
  return (
    <section style={{ background: theme.heroBg }}>
      <div className="section-space-main">
        <div className="u-container grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider mb-4" style={{ color: theme.accentOnHero ?? theme.accent }}>
              Get in touch
            </p>
            <h2 className="font-head font-medium text-fluid-h3 leading-[1.15] mb-5" style={{ color: t.strong }}>
              Request your free quote
            </h2>
            <p className="font-biz text-fluid-main leading-relaxed mb-8 max-w-[42ch]" style={{ color: t.body }}>
              Tell us a little about your project and {b.name} will get back to you fast. Prefer to talk now? Give us a call.
            </p>
            <div className="grid gap-4 mb-6">
              <a href={telHref(b.phone)} className="flex items-center gap-3">
                <span className="grid place-items-center rounded-md flex-shrink-0" style={{ width: 42, height: 42, background: theme.accent, color: theme.onAccent }}>
                  <Phone size={18} />
                </span>
                <span className="font-biz text-fluid-main" style={{ color: t.strong }}>{b.phone}</span>
              </a>
              <div className="flex items-center gap-3">
                <span className="grid place-items-center rounded-md flex-shrink-0" style={{ width: 42, height: 42, background: theme.accent, color: theme.onAccent }}>
                  <MapPin size={18} />
                </span>
                <span className="font-biz text-fluid-main" style={{ color: t.strong }}>
                  {b.address.street ? `${b.address.street}, ` : ""}{b.address.locality}, {b.address.region} {b.address.postalCode ?? ""}
                </span>
              </div>
            </div>
            <BizHours b={b} theme={theme} />
          </div>
          <div className="rounded-lg bg-white border border-dark/10 p-6 sm:p-8 shadow-sm self-start">
            <BizContactForm
              businessName={b.name}
              businessSlug={b.slug}
              locality={b.address.locality}
              services={b.services.map((s) => ({ name: s.name, slug: s.slug }))}
              theme={theme}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
