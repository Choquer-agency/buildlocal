"use client";

import { useState } from "react";
import { useContactForm } from "@/context/ContactFormContext";

const serviceItems = [
  {
    name: "On-Page SEO",
    color: "#F79C42",
    icon: (
      <svg viewBox="0 0 48 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect x="0" y="47.9922" width="15.9996" height="15.9996" transform="rotate(-90 0 47.9922)" fill="currentColor"/>
        <rect x="15.9961" y="63.9961" width="15.9996" height="15.9996" transform="rotate(-90 15.9961 63.9961)" fill="currentColor"/>
        <rect x="15.9961" y="31.9961" width="15.9996" height="15.9996" transform="rotate(-90 15.9961 31.9961)" fill="currentColor"/>
        <rect x="31.9922" y="80" width="15.9996" height="15.9996" transform="rotate(-90 31.9922 80)" fill="currentColor"/>
        <rect x="31.9922" y="16" width="15.9996" height="15.9996" transform="rotate(-90 31.9922 16)" fill="currentColor"/>
      </svg>
    ),
  },
  {
    name: "Technical SEO",
    color: "#FFDF40",
    icon: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect x="31.9922" width="15.9996" height="15.9996" fill="currentColor"/>
        <rect x="15.9961" y="15.9961" width="15.9996" height="15.9996" fill="currentColor"/>
        <rect x="47.9883" y="15.9961" width="15.9996" height="15.9996" fill="currentColor"/>
        <rect y="31.9922" width="15.9996" height="15.9996" fill="currentColor"/>
        <rect x="64" y="31.9922" width="15.9996" height="15.9996" fill="currentColor"/>
        <rect y="47.9961" width="15.9996" height="15.9996" fill="currentColor"/>
        <rect x="64" y="47.9961" width="15.9996" height="15.9996" fill="currentColor"/>
        <rect x="15.9961" y="64" width="15.9996" height="15.9996" fill="currentColor"/>
        <rect x="47.9883" y="64" width="15.9996" height="15.9996" fill="currentColor"/>
      </svg>
    ),
  },
  {
    name: "Local SEO",
    color: "#71CFA3",
    icon: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
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
    name: "Content Strategy",
    color: "#BCEFFF",
    icon: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
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
  {
    name: "Link Building",
    color: "#C4EF7A",
    icon: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect x="31.9922" width="15.9996" height="15.9996" fill="currentColor"/>
        <rect x="15.9961" y="15.9961" width="15.9996" height="15.9996" fill="currentColor"/>
        <rect x="31.9922" y="15.9961" width="15.9996" height="15.9996" fill="currentColor"/>
        <rect x="47.9883" y="15.9961" width="15.9996" height="15.9996" fill="currentColor"/>
        <rect y="31.9922" width="15.9996" height="15.9996" fill="currentColor"/>
        <rect x="15.9961" y="31.9922" width="15.9996" height="15.9996" fill="currentColor"/>
        <rect x="31.9922" y="31.9922" width="15.9996" height="15.9996" fill="currentColor"/>
        <rect x="47.9883" y="31.9922" width="15.9996" height="15.9996" fill="currentColor"/>
        <rect x="64" y="31.9922" width="15.9996" height="15.9996" fill="currentColor"/>
        <rect x="31.9922" y="47.9961" width="15.9996" height="15.9996" fill="currentColor"/>
        <rect x="31.9922" y="64" width="15.9996" height="15.9996" fill="currentColor"/>
      </svg>
    ),
  },
  {
    name: "SEO Reporting",
    color: "#D4AAFF",
    icon: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect x="31.9922" width="15.9996" height="15.9996" fill="currentColor"/>
        <rect x="15.9961" y="15.9961" width="15.9996" height="15.9996" fill="currentColor"/>
        <rect x="47.9883" y="15.9961" width="15.9996" height="15.9996" fill="currentColor"/>
        <rect y="31.9922" width="15.9996" height="15.9996" fill="currentColor"/>
        <rect x="31.9922" y="31.9922" width="15.9996" height="15.9996" fill="currentColor"/>
        <rect x="64" y="31.9922" width="15.9996" height="15.9996" fill="currentColor"/>
        <rect x="15.9961" y="47.9961" width="15.9996" height="15.9996" fill="currentColor"/>
        <rect x="47.9883" y="47.9961" width="15.9996" height="15.9996" fill="currentColor"/>
        <rect x="31.9922" y="64" width="15.9996" height="15.9996" fill="currentColor"/>
      </svg>
    ),
  },
  {
    name: "Conversion Optimization",
    color: "#FFB4C8",
    icon: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect x="15.9961" width="15.9996" height="15.9996" fill="currentColor"/>
        <rect x="31.9922" width="15.9996" height="15.9996" fill="currentColor"/>
        <rect x="47.9883" width="15.9996" height="15.9996" fill="currentColor"/>
        <rect y="15.9961" width="15.9996" height="15.9996" fill="currentColor"/>
        <rect x="64" y="15.9961" width="15.9996" height="15.9996" fill="currentColor"/>
        <rect y="31.9922" width="15.9996" height="15.9996" fill="currentColor"/>
        <rect x="64" y="31.9922" width="15.9996" height="15.9996" fill="currentColor"/>
        <rect y="47.9961" width="15.9996" height="15.9996" fill="currentColor"/>
        <rect x="15.9961" y="64" width="15.9996" height="15.9996" fill="currentColor"/>
        <rect x="31.9922" y="64" width="15.9996" height="15.9996" fill="currentColor"/>
        <rect x="47.9883" y="64" width="15.9996" height="15.9996" fill="currentColor"/>
      </svg>
    ),
  },
  {
    name: "Competitor Analysis",
    color: "#FFD4A8",
    icon: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect width="15.9996" height="15.9996" fill="currentColor"/>
        <rect x="64" width="15.9996" height="15.9996" fill="currentColor"/>
        <rect x="15.9961" y="15.9961" width="15.9996" height="15.9996" fill="currentColor"/>
        <rect x="47.9883" y="15.9961" width="15.9996" height="15.9996" fill="currentColor"/>
        <rect x="31.9922" y="31.9922" width="15.9996" height="15.9996" fill="currentColor"/>
        <rect x="15.9961" y="47.9961" width="15.9996" height="15.9996" fill="currentColor"/>
        <rect x="47.9883" y="47.9961" width="15.9996" height="15.9996" fill="currentColor"/>
        <rect y="64" width="15.9996" height="15.9996" fill="currentColor"/>
        <rect x="64" y="64" width="15.9996" height="15.9996" fill="currentColor"/>
      </svg>
    ),
  },
];

export function Services() {
  const { openModal } = useContactForm();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="services" className="section-space-large theme-dark">
      <div className="u-container">
        <div className="mb-16 md:mb-20">
          <p className="eyebrow text-brand mb-5">What We Do</p>
          <h2 className="font-sans font-medium text-fluid-h2 leading-[1.1] text-light max-w-[22ch]">
            All the ways we can help you grow.
          </h2>
        </div>

        {/* Core SEO Services */}
        <div>
          {serviceItems.slice(0, 2).map((svc, i) => {
            const isActive = hoveredIndex === i;
            return (
              <div
                key={svc.name}
                className="flex items-center gap-4 lg:gap-6 cursor-pointer"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div
                  className="flex-shrink-0 transition-all duration-400 overflow-hidden"
                  style={{
                    color: svc.color,
                    width: isActive ? "4rem" : "0px",
                    height: "4rem",
                    opacity: isActive ? 1 : 0,
                  }}
                >
                  {svc.icon}
                </div>
                <span
                  className="font-sans font-normal leading-[1.05] block transition-colors duration-500"
                  style={{
                    fontSize: "clamp(1.5rem, 3vw + 0.75rem, 5.5rem)",
                    color: isActive ? svc.color : "rgba(255,255,255,0.15)",
                  }}
                >
                  {svc.name}
                </span>
              </div>
            );
          })}
        </div>

        {/* Supporting Services */}
        <div className="mt-12 mb-2">
          <p className="font-mono text-fluid-small uppercase tracking-wider text-light opacity-30 mb-6">
            Beyond rankings &mdash; how we support your growth
          </p>
        </div>
        <div>
          {serviceItems.slice(2).map((svc, i) => {
            const idx = i + 2;
            const isActive = hoveredIndex === idx;
            return (
              <div
                key={svc.name}
                className="flex items-center gap-4 lg:gap-6 cursor-pointer"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div
                  className="flex-shrink-0 transition-all duration-400 overflow-hidden"
                  style={{
                    color: svc.color,
                    width: isActive ? "3rem" : "0px",
                    height: "3rem",
                    opacity: isActive ? 1 : 0,
                  }}
                >
                  {svc.icon}
                </div>
                <span
                  className="font-sans font-normal leading-[1.05] block transition-colors duration-500"
                  style={{
                    fontSize: "clamp(1.2rem, 2vw + 0.5rem, 3.5rem)",
                    color: isActive ? svc.color : "rgba(255,255,255,0.1)",
                  }}
                >
                  {svc.name}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-16">
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
        </div>
      </div>
    </section>
  );
}
