"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-register";
import { useContactForm } from "@/context/ContactFormContext";
import { getPricingTiers } from "@/content/shared";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Pricing({ region, slug }: { region: string; slug: string }) {
  const pricingTiers = getPricingTiers(slug);
  const { openModal } = useContactForm();
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".pricing-heading", {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 75%", once: true },
        });

        gsap.from(".pricing-card", {
          y: 50,
          opacity: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 65%", once: true },
        });
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id="pricing" className="theme-dark section-space-main">
      <div className="u-container">
        <div className="text-center mb-16">
          <p className="pricing-heading eyebrow text-brand mb-4">Pricing</p>
          <h2 className="pricing-heading font-sans font-medium text-fluid-h2 leading-[1.1] text-white max-w-[28ch] mx-auto mb-6">
            Simple pricing.{" "}
            <span style={{ color: "#ff9500" }}>No setup fees. No contracts.</span>
          </h2>
          <p className="pricing-heading font-sans text-fluid-main text-white opacity-50 leading-relaxed max-w-[55ch] mx-auto">
            Every plan includes hosting, design, development, and ongoing support.
            Pick the one that fits your business.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {pricingTiers.map((tier) => (
            <div
              key={tier.name}
              className="pricing-card rounded-sm p-8 flex flex-col"
              style={{
                backgroundColor: tier.featured
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(255,255,255,0.05)",
                border: tier.featured
                  ? `1px solid ${tier.color}`
                  : "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div
                className="w-full h-1 rounded-full mb-6"
                style={{ backgroundColor: tier.color }}
              />
              <p className="font-mono text-sm text-white opacity-50 uppercase tracking-wider mb-2">
                {tier.name}
              </p>
              <p
                className="font-display text-fluid-h3 leading-none mb-4"
                style={{ color: tier.color }}
              >
                {tier.priceRange}
              </p>
              <p className="font-sans text-fluid-main text-white opacity-50 leading-relaxed mb-6">
                {tier.description}
              </p>
              <ul className="space-y-3 mb-8 flex-1">
                {tier.includes.map((item) => (
                  <li
                    key={item}
                    className="font-sans text-sm text-white opacity-70 flex items-start gap-3"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="flex-shrink-0 mt-0.5"
                    >
                      <path
                        d="M3 8.5L6.5 12L13 4"
                        stroke={tier.color}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => openModal()}
                data-track="pricing-cta"
                data-track-label={tier.name}
                className={tier.featured ? "btn justify-center" : "btn-secondary"}
                style={{ width: "100%" }}
              >
                <span className="text-sm">Book a Free Strategy Call</span>
                <span className="btn-arrow">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M1 13L13 1M13 1H3M13 1V11"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
            </div>
          ))}
        </div>

        <p className="font-sans text-sm text-white opacity-30 text-center mt-8 max-w-[55ch] mx-auto">
          All plans are month-to-month. Cancel anytime. Your site pays for itself with one extra customer.
        </p>
      </div>
    </section>
  );
}
