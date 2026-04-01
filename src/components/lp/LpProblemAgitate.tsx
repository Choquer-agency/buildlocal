"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-register";

interface PainPoint {
  title: string;
  description: string;
}

interface LpProblemAgitateProps {
  title: string;
  subtitle: string;
  painPoints: PainPoint[];
}

export function LpProblemAgitate({ title, subtitle, painPoints }: LpProblemAgitateProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".lp-pain-heading", {
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 75%", once: true },
        });
        gsap.from(".lp-pain-card", {
          y: 40,
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
    <section ref={ref} className="py-16 md:py-20">
      <div className="u-container">
        <p className="lp-pain-heading font-mono text-xs uppercase tracking-wider text-dark opacity-40 mb-3">
          {subtitle}
        </p>
        <h2 className="lp-pain-heading font-sans font-medium text-fluid-h3 leading-[1.1] text-dark max-w-[20ch] mb-12">
          {title}
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {painPoints.map((point) => (
            <div
              key={point.title}
              className="lp-pain-card bg-white rounded-lg border border-dark/8 p-7"
            >
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center mb-5">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M4.5 4.5L13.5 13.5M13.5 4.5L4.5 13.5" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="font-sans font-medium text-fluid-main text-dark mb-2">
                {point.title}
              </h3>
              <p className="font-sans text-sm text-dark opacity-50 leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
