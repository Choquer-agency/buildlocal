"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-register";

interface WhySEOItem {
  title: string;
  description: string;
}

interface IndustryWhySEOProps {
  items: WhySEOItem[];
  industryTitle: string;
  color: string;
}

export function IndustryWhySEO({
  items,
  industryTitle,
  color,
}: IndustryWhySEOProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".iww-heading", {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 75%", once: true },
        });

        gsap.from(".iww-card", {
          y: 50,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 65%", once: true },
        });
      });
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      id="why-seo"
      className="theme-dark section-space-main"
    >
      <div className="u-container">
        <div className="text-center mb-16">
          <p className="iww-heading eyebrow text-brand mb-4">
            Why SEO
          </p>
          <h2 className="iww-heading font-sans font-medium text-fluid-h2 leading-[1.1] text-white max-w-[28ch] mx-auto mb-6">
            Why SEO matters for{" "}
            <span className="opacity-40">{industryTitle.toLowerCase()}</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {items.map((item) => (
            <div
              key={item.title}
              className="iww-card p-8 rounded-sm"
              style={{
                backgroundColor: "rgba(255,255,255,0.05)",
                borderLeft: `3px solid ${color}`,
              }}
            >
              <h3 className="font-sans font-medium text-fluid-h6 text-white mb-3">
                {item.title}
              </h3>
              <p className="font-sans text-fluid-main text-white opacity-50 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
