"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-register";

interface TestimonialItem {
  quote: string;
  name: string;
  company: string;
  metric: string;
  color: string;
}

const topTestimonials: TestimonialItem[] = [
  {
    quote: "Before BuildLocal, I had no website at all. Now I'm getting 3x more calls than I was from word of mouth alone. The site paid for itself in the first week.",
    name: "Marcus Delgado",
    company: "Delgado Roofing",
    metric: "3x more calls in week 1",
    color: "#F79C42",
  },
  {
    quote: "We started with no website at all. Now the site is our primary lead source — it drove $1.3 million in revenue over three years.",
    name: "Tom Vasquez",
    company: "Pedigree Painting",
    metric: "$0 to $1.3M revenue",
    color: "#FFDF40",
  },
  {
    quote: "We went from zero online presence to being booked solid within two months. Best $195 I spend every month.",
    name: "Sarah Mitchell",
    company: "Spotless Cleaning Co.",
    metric: "Booked solid in 2 months",
    color: "#DEDA8D",
  },
];

export function LpTestimonialsCompact() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".lp-testi-card", {
          y: 40,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 70%", once: true },
        });
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="py-16 md:py-20" style={{ backgroundColor: "#f8f8f8" }}>
      <div className="u-container">
        <p className="font-mono text-xs uppercase tracking-wider text-dark opacity-40 mb-3">
          Real results
        </p>
        <h2 className="font-sans font-medium text-fluid-h3 leading-[1.1] text-dark mb-10">
          They say it better than we do
        </h2>

        <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-3 md:overflow-visible md:pb-0" style={{ scrollbarWidth: "none" }}>
          {topTestimonials.map((t) => (
            <div
              key={t.name}
              className="lp-testi-card flex-shrink-0 w-[85vw] md:w-auto rounded-lg p-7 flex flex-col justify-between min-h-[300px] snap-start"
              style={{ backgroundColor: t.color }}
            >
              <div>
                <span className="inline-block font-mono text-xs uppercase tracking-wider bg-dark/10 rounded px-2 py-1 mb-5">
                  {t.metric}
                </span>
                <p className="font-sans text-fluid-h5 leading-[1.3] text-dark">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-3 mt-6">
                <div className="w-10 h-10 rounded-full bg-dark/10 flex items-center justify-center flex-shrink-0">
                  <span className="font-sans font-medium text-sm text-dark">{t.name.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-sans font-medium text-sm text-dark">{t.name}</p>
                  <p className="font-sans text-xs text-dark opacity-60">{t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
