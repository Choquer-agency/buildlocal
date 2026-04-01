"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-register";

interface FaqItem {
  question: string;
  answer: string;
}

interface LpFaqCompactProps {
  faqs: FaqItem[];
}

function FaqAccordion({ question, answer }: FaqItem) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-dark/10">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left min-h-[52px]"
      >
        <span className="font-sans font-medium text-fluid-main text-dark pr-4">{question}</span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          className={`flex-shrink-0 transition-transform duration-300 ${open ? "rotate-45" : ""}`}
        >
          <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? "max-h-[500px] pb-5" : "max-h-0"}`}
      >
        <p className="font-sans text-sm text-dark opacity-60 leading-relaxed pr-8">{answer}</p>
      </div>
    </div>
  );
}

export function LpFaqCompact({ faqs }: LpFaqCompactProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".lp-faq-content", {
          y: 20,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
        });
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="py-16 md:py-20">
      <div className="u-container">
        <div className="lp-faq-content max-w-[40rem] mx-auto">
          <h2 className="font-sans font-medium text-fluid-h3 leading-[1.1] text-dark mb-8">
            Common questions
          </h2>
          <div>
            {faqs.map((faq) => (
              <FaqAccordion key={faq.question} {...faq} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
