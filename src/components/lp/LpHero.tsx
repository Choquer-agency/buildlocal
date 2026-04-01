"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-register";
import { useContactForm } from "@/context/ContactFormContext";

interface LpHeroProps {
  eyebrow: string;
  h1: string;
  subhead: string;
  ctaLabel: string;
  ctaAction: "modal" | "scroll";
  scrollTarget?: string;
  microCopy: string;
  badges: string[];
}

export function LpHero({
  eyebrow,
  h1,
  subhead,
  ctaLabel,
  ctaAction,
  scrollTarget,
  microCopy,
  badges,
}: LpHeroProps) {
  const { openModal } = useContactForm();
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from(".lp-hero-heading", { y: 50, opacity: 0, duration: 0.9 })
          .from(".lp-hero-body", { y: 30, opacity: 0, duration: 0.7 }, "-=0.4")
          .from(".lp-hero-cta", { y: 20, opacity: 0, duration: 0.6 }, "-=0.3")
          .from(".lp-hero-badge", { y: 20, opacity: 0, duration: 0.5, stagger: 0.1 }, "-=0.3");
      });
    },
    { scope: ref }
  );

  function handleCta() {
    if (ctaAction === "modal") {
      openModal();
    } else if (scrollTarget) {
      document.querySelector(scrollTarget)?.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <header ref={ref} className="pt-28 pb-16 md:pt-36 md:pb-24" style={{ backgroundColor: "#FFF9F0" }}>
      <div className="u-container">
        <div className="max-w-[52rem]">
          <span className="lp-hero-heading font-mono text-xs uppercase tracking-wider text-brand mb-6 block">
            {eyebrow}
          </span>

          <h1 className="lp-hero-heading font-sans font-medium text-fluid-h1 leading-[1.08] tracking-tight text-dark max-w-[16ch] mb-6">
            {h1}
          </h1>

          <p className="lp-hero-body font-sans text-fluid-large text-dark opacity-60 max-w-[44ch] mb-10 leading-relaxed">
            {subhead}
          </p>

          <div className="lp-hero-cta flex flex-col sm:flex-row items-start gap-4 mb-4">
            <button
              onClick={handleCta}
              data-track="hero-cta"
              data-track-label={ctaLabel}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-brand text-dark rounded-sm px-8 py-4 font-sans font-medium text-fluid-main transition-all hover:brightness-110 min-h-[52px]"
              style={{ transitionDuration: "0.3s" }}
            >
              {ctaLabel}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 14L14 2M14 2H5M14 2V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <p className="lp-hero-cta font-sans text-fluid-small text-dark opacity-40 mb-2">
            {microCopy}
          </p>
          <p className="lp-hero-cta font-sans text-fluid-small text-brand font-medium mb-12">
            We only take on 8 new builds per month — limited spots available for April.
          </p>

          <div className="flex flex-wrap gap-6 pt-8 border-t" style={{ borderColor: "#ffca94" }}>
            {badges.map((badge) => (
              <div key={badge} className="lp-hero-badge flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8L6.5 11.5L13 4.5" stroke="#ff9500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="font-sans font-medium text-sm text-dark">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
