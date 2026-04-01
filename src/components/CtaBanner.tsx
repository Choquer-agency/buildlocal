"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-register";
import { useContactForm } from "@/context/ContactFormContext";

export function CtaBanner() {
  const { openModal } = useContactForm();
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".cta-banner-content", {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
        });
      });
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      className="section-space-large"
      style={{
        background: "linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 50%, #FFCC80 100%)",
      }}
    >
      <div className="u-container text-center">
        <div className="cta-banner-content">
          <p className="font-mono text-fluid-small uppercase tracking-wider opacity-60 mb-6">
            Ready to get started?
          </p>
          <h2 className="font-sans font-medium text-fluid-h2 leading-[1.05] max-w-[18ch] mx-auto mb-8 text-dark">
            Ready to turn your website into a conversion machine?
          </h2>
          <p className="font-sans text-fluid-main text-dark opacity-50 max-w-[48ch] mx-auto mb-10 leading-relaxed">
            Book a free strategy call and we&apos;ll walk you through exactly how we can build a site that drives leads for your business. No commitment, no pressure.
          </p>
          <button
            onClick={() => openModal()}
            className="inline-flex items-center gap-3 bg-brand text-dark rounded-sm px-8 py-4 font-sans font-medium text-fluid-main transition-all hover:brightness-110"
            style={{ transitionDuration: "0.3s" }}
          >
            Book a Free Strategy Call
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 14L14 2M14 2H5M14 2V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <p className="font-sans text-fluid-small text-dark opacity-40 mt-6">
            No setup fees. No contracts. Cancel anytime.
          </p>

          {/* Founder */}
          <div className="flex items-center justify-center gap-4 mt-10 pt-8 border-t" style={{ borderColor: "rgba(0,0,0,0.1)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/founder-opt.webp"
              alt="BuildLocal Founder"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="text-left">
              <p className="font-sans font-medium text-sm text-dark">BuildLocal Team</p>
              <p className="font-sans text-xs text-dark opacity-50">
                Founder &middot; 175+ websites built &middot; 60+ managed
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
