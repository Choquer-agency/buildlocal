"use client";

import { useState, useRef, useMemo } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-register";
import { warmPalette } from "@/lib/colors";
import { getExpandedFaqs } from "@/content/shared";
import { FAQItem } from "@/content/config";

/* ─── Category config ─── */

const categoryOrder = [
  "billing",
  "service",
  "website",
  "pricing",
  "process",
  "general",
] as const;

const categoryDisplayNames: Record<string, string> = {
  billing: "Billing & Plans",
  service: "Our Services",
  website: "Your Website",
  pricing: "Pricing",
  process: "How It Works",
  general: "General",
};

/* ─── Accordion Item ─── */

function AccordionItem({
  faq,
  colorIndex,
  isOpen,
  onToggle,
}: {
  faq: FAQItem;
  colorIndex: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="faq-page-item border-b border-dark-faded"
      style={{
        borderColor: isOpen
          ? warmPalette[colorIndex % warmPalette.length]
          : undefined,
        transition: "border-color 0.3s",
      }}
    >
      <button
        className="w-full flex items-center justify-between py-5 text-left group"
        onClick={onToggle}
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
            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
            color: isOpen
              ? warmPalette[colorIndex % warmPalette.length]
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
          maxHeight: isOpen ? "500px" : "0px",
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
}

/* ─── FAQ Content ─── */

export function FAQContent({
  locality,
  region,
  slug,
}: {
  locality: string;
  region: string;
  slug: string;
}) {
  const allFaqs = getExpandedFaqs(locality, region, slug);
  const [openKey, setOpenKey] = useState<string | null>(null);
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLElement>(null);

  // Group FAQs by category
  const groupedFaqs = useMemo(() => {
    const groups: Record<string, FAQItem[]> = {};
    for (const faq of allFaqs) {
      if (!groups[faq.category]) {
        groups[faq.category] = [];
      }
      groups[faq.category].push(faq);
    }
    return groups;
  }, [allFaqs]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".faq-page-hero-heading", {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top 80%",
            once: true,
          },
        });
        gsap.from(".faq-page-hero-sub", {
          y: 30,
          opacity: 0,
          duration: 0.8,
          delay: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top 80%",
            once: true,
          },
        });
      });
    },
    { scope: heroRef }
  );

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".faq-page-section", {
          y: 40,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 75%",
            once: true,
          },
        });
      });
    },
    { scope: contentRef }
  );

  // Build a flat index for color cycling
  let colorIndex = 0;

  return (
    <>
      {/* Hero */}
      <section
        ref={heroRef}
        className="section-space-main"
        style={{ backgroundColor: "#FFF9F0" }}
      >
        <div className="u-container max-w-3xl text-center">
          <h1 className="faq-page-hero-heading font-sans font-medium text-fluid-h2 leading-[1.1] text-dark mb-6">
            Frequently asked questions.
          </h1>
          <p className="faq-page-hero-sub font-sans text-fluid-main text-dark opacity-60 leading-relaxed max-w-xl mx-auto">
            Everything you need to know about BuildLocal.
          </p>
        </div>
      </section>

      {/* FAQ Sections by Category */}
      <section
        ref={contentRef}
        className="section-space-main"
        style={{ backgroundColor: "#fff" }}
      >
        <div className="u-container max-w-3xl">
          {categoryOrder.map((category) => {
            const faqs = groupedFaqs[category];
            if (!faqs || faqs.length === 0) return null;

            return (
              <div key={category} className="faq-page-section mb-16 last:mb-0">
                <h2 className="font-sans font-medium text-fluid-h4 text-dark mb-8">
                  {categoryDisplayNames[category]}
                </h2>
                {faqs.map((faq, i) => {
                  const currentColor = colorIndex++;
                  const key = `${category}-${i}`;
                  return (
                    <AccordionItem
                      key={key}
                      faq={faq}
                      colorIndex={currentColor}
                      isOpen={openKey === key}
                      onToggle={() =>
                        setOpenKey(openKey === key ? null : key)
                      }
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
