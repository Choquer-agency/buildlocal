"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-register";
import { useContactForm } from "@/context/ContactFormContext";

interface LpOfferProps {
  title: string;
  features: string[];
  priceAnchor: string;
  ctaLabel: string;
  ctaAction: "modal" | "scroll";
  scrollTarget?: string;
}

export function LpOffer({ title, features, priceAnchor, ctaLabel, ctaAction, scrollTarget }: LpOfferProps) {
  const { openModal } = useContactForm();
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".lp-offer-content", {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 75%", once: true },
        });
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
    <section ref={ref} className="py-16 md:py-20" style={{ backgroundColor: "#FFF9F0" }}>
      <div className="u-container">
        <div className="lp-offer-content max-w-[40rem] mx-auto text-center">
          <h2 className="font-sans font-medium text-fluid-h3 leading-[1.1] text-dark mb-10">
            {title}
          </h2>

          <div className="grid gap-3 text-left max-w-md mx-auto mb-10">
            {features.map((feature) => (
              <div key={feature} className="flex items-start gap-3">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="mt-0.5 flex-shrink-0">
                  <circle cx="10" cy="10" r="10" fill="#ff9500" fillOpacity="0.15" />
                  <path d="M6 10L8.5 12.5L14 7" stroke="#ff9500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="font-sans text-fluid-main text-dark">{feature}</span>
              </div>
            ))}
          </div>

          <p className="font-sans text-fluid-main text-dark opacity-50 mb-8">
            {priceAnchor}
          </p>

          <button
            onClick={handleCta}
            data-track="offer-cta"
            data-track-label={ctaLabel}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-brand text-dark rounded-sm px-8 py-4 font-sans font-medium text-fluid-main transition-all hover:brightness-110 min-h-[52px]"
            style={{ transitionDuration: "0.3s" }}
          >
            {ctaLabel}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 14L14 2M14 2H5M14 2V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <p className="font-sans text-fluid-small text-dark opacity-40 mt-4">
            No setup fees. No contracts. Cancel anytime.
          </p>
          <p className="font-sans text-fluid-small text-brand font-medium mt-2">
            Only 8 spots per month — don&apos;t wait.
          </p>
        </div>
      </div>
    </section>
  );
}
