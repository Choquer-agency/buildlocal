"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-register";
import { warmPalette } from "@/lib/colors";
import { getExpandedFaqs } from "@/content/shared";

const categories = [
  { key: "all", label: "All" },
  { key: "service", label: "Services" },
  { key: "billing", label: "Billing" },
  { key: "website", label: "Website" },
  { key: "pricing", label: "Pricing" },
  { key: "process", label: "Process" },
  { key: "general", label: "General" },
] as const;

type CategoryKey = (typeof categories)[number]["key"];

export function FAQ({ locality, region, slug }: { locality: string; region: string; slug: string }) {
  const expandedFaqs = getExpandedFaqs(locality, region, slug);
  const ref = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".faq-heading", {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 75%", once: true },
        });
        gsap.from(".faq-item", {
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 65%", once: true },
        });
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id="faq" className="section-space-main" style={{ backgroundColor: "#FFF9F0" }}>
      <div className="u-container max-w-3xl">
        {/* Centered heading */}
        <div className="text-center mb-8">
          <p className="faq-heading eyebrow text-brand mb-4">FAQ</p>
          <h2 className="faq-heading font-sans font-medium text-fluid-h3 leading-[1.1] text-dark">
            Your questions, answered
          </h2>
        </div>

        {/* Category filters */}
        <div className="faq-heading flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => {
                setActiveCategory(cat.key);
                setOpenIndex(-1);
              }}
              className="font-mono text-xs uppercase tracking-wider px-4 py-2 rounded-full transition-all"
              style={{
                backgroundColor:
                  activeCategory === cat.key
                    ? "#F79C42"
                    : "rgba(0,0,0,0.04)",
                color:
                  activeCategory === cat.key ? "#fff" : "rgba(0,0,0,0.5)",
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordion — all items in DOM for crawlability, filtered via CSS */}
        {expandedFaqs.map((faq, i) => {
          const isVisible =
            activeCategory === "all" || faq.category === activeCategory;

          return (
            <div
              key={i}
              className="faq-item border-b border-dark-faded"
              style={{
                borderColor:
                  openIndex === i
                    ? warmPalette[i % warmPalette.length]
                    : undefined,
                transition: "border-color 0.3s",
                display: isVisible ? "block" : "none",
              }}
            >
              <button
                className="w-full flex items-center justify-between py-5 text-left group"
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
              >
                <span className="font-sans font-medium text-fluid-h6 text-dark pr-8">
                  {faq.question}
                </span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="flex-shrink-0 transition-all"
                  style={{
                    transform:
                      openIndex === i ? "rotate(45deg)" : "rotate(0deg)",
                    color:
                      openIndex === i
                        ? warmPalette[i % warmPalette.length]
                        : undefined,
                    transitionDuration: "0.3s",
                  }}
                >
                  <path
                    d="M10 4V16M4 10H16"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <div
                className="overflow-hidden transition-all"
                style={{
                  maxHeight: openIndex === i ? "500px" : "0px",
                  transitionDuration: "0.4s",
                  transitionTimingFunction: "cubic-bezier(0.625, 0.05, 0, 1)",
                }}
              >
                <p className="font-sans text-fluid-main text-dark opacity-60 leading-relaxed pb-5">
                  {faq.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
