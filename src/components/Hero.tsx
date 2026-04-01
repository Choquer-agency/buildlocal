"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-register";

const featureColors = ["#F79C42", "#71CFA3", "#BCEFFF"];

const features = [
  {
    num: "01",
    label: "No Setup Fees",
    icon: (
      <svg viewBox="0 0 48 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-auto">
        <rect x="0" y="47.9922" width="15.9996" height="15.9996" transform="rotate(-90 0 47.9922)" fill="currentColor"/>
        <rect x="15.9961" y="63.9961" width="15.9996" height="15.9996" transform="rotate(-90 15.9961 63.9961)" fill="currentColor"/>
        <rect x="15.9961" y="31.9961" width="15.9996" height="15.9996" transform="rotate(-90 15.9961 31.9961)" fill="currentColor"/>
        <rect x="31.9922" y="80" width="15.9996" height="15.9996" transform="rotate(-90 31.9922 80)" fill="currentColor"/>
        <rect x="31.9922" y="16" width="15.9996" height="15.9996" transform="rotate(-90 31.9922 16)" fill="currentColor"/>
      </svg>
    ),
  },
  {
    num: "02",
    label: "Managed Monthly",
    icon: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-auto">
        <rect x="47.9883" width="15.9996" height="15.9996" fill="currentColor"/>
        <rect x="15.9961" y="15.9961" width="15.9996" height="15.9996" fill="currentColor"/>
        <rect x="47.9883" y="15.9961" width="15.9996" height="15.9996" fill="currentColor"/>
        <rect x="31.9922" y="31.9922" width="15.9996" height="15.9996" fill="currentColor"/>
        <rect x="31.9922" y="47.9961" width="15.9996" height="15.9996" fill="currentColor"/>
        <rect y="63.9922" width="15.9996" height="15.9996" fill="currentColor"/>
        <rect x="15.9961" y="63.9922" width="15.9996" height="15.9996" fill="currentColor"/>
        <rect x="31.9922" y="63.9922" width="15.9996" height="15.9996" fill="currentColor"/>
        <rect x="47.9883" y="63.9922" width="15.9996" height="15.9996" fill="currentColor"/>
        <rect x="64" y="63.9922" width="15.9996" height="15.9996" fill="currentColor"/>
      </svg>
    ),
  },
  {
    num: "03",
    label: "Built to Convert",
    icon: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-auto">
        <rect width="15.9996" height="15.9996" fill="currentColor"/>
        <rect x="48.0039" width="15.9996" height="15.9996" fill="currentColor"/>
        <rect x="32.0078" y="16.0039" width="15.9996" height="15.9996" fill="currentColor"/>
        <rect x="48.0039" y="16.0039" width="15.9996" height="15.9996" fill="currentColor"/>
        <rect x="64" y="16.0039" width="15.9996" height="15.9996" fill="currentColor"/>
        <rect x="15.9961" y="32" width="15.9996" height="15.9996" fill="currentColor"/>
        <rect x="48.0039" y="32" width="15.9996" height="15.9996" fill="currentColor"/>
        <rect y="47.9961" width="15.9996" height="15.9996" fill="currentColor"/>
        <rect x="15.9961" y="47.9961" width="15.9996" height="15.9996" fill="currentColor"/>
        <rect x="32.0078" y="47.9961" width="15.9996" height="15.9996" fill="currentColor"/>
        <rect x="15.9961" y="64" width="15.9996" height="15.9996" fill="currentColor"/>
        <rect x="64" y="64" width="15.9996" height="15.9996" fill="currentColor"/>
      </svg>
    ),
  },
];

interface HeroProps {
  h1: string;
  subhead: string;
  region: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Hero({ h1, subhead, region }: HeroProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.from(".hero-heading", {
          y: 60,
          opacity: 0,
          duration: 1,
        })
          .from(".hero-body", { y: 30, opacity: 0, duration: 0.8 }, "-=0.5")
          .from(
            ".hero-feature",
            { y: 40, opacity: 0, duration: 0.7, stagger: 0.12 },
            "-=0.4"
          )
          .from(".hero-partners", { y: 20, opacity: 0, duration: 0.6 }, "-=0.3");
      });
    },
    { scope: ref }
  );

  return (
    <header ref={ref} className="section-space-hero" style={{ backgroundColor: "#FFF9F0" }}>
      <div className="u-container">
        <div className="max-w-[85rem] mx-auto">
          {/* Eyebrow */}
          <div className="hero-heading mb-6">
            <span className="font-mono text-xs uppercase tracking-wider text-brand">
              175+ Websites Built
            </span>
          </div>

          {/* Main heading */}
          <h1 className="hero-heading font-sans font-medium text-fluid-h1 leading-[1.1] tracking-tight text-dark max-w-[14ch] mb-6">
            {h1}
          </h1>

          {/* Body text — ~80% of H1 width */}
          <p className="hero-body font-sans text-fluid-large text-dark opacity-60 max-w-[42ch] mb-6 leading-relaxed">
            {subhead}
          </p>

          {/* Qualifier */}
          <p className="hero-body font-sans text-fluid-main text-dark opacity-40 max-w-[50ch] mb-16 leading-relaxed">
            For small businesses and trades companies who want a professional website without the headache.
          </p>

          {/* Feature items row with SVG icons */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 mb-16">
            {features.map((feat, i) => (
              <div key={feat.num} className="hero-feature flex items-center gap-5">
                <div className="h-6 flex-shrink-0" style={{ color: featureColors[i] }}>
                  {feat.icon}
                </div>
                <div>
                  <span className="font-mono text-xs text-grey-1 uppercase tracking-wider">
                    [{feat.num}]
                  </span>
                  <p className="font-sans font-medium text-fluid-main text-dark uppercase tracking-wide">
                    {feat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Partners line */}
          <div className="hero-partners flex items-center gap-4 pt-8 border-t" style={{ borderColor: "#ffca94" }}>
            <p className="font-sans text-fluid-main text-dark opacity-40">
              175+ websites built — and counting
            </p>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="opacity-40"
            >
              <path
                d="M12 5V19M12 19L5 12M12 19L19 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
}
