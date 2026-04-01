"use client";

import { useEffect, useState } from "react";
import { useContactForm } from "@/context/ContactFormContext";

interface LpNavProps {
  ctaLabel: string;
  ctaAction: "modal" | "scroll";
  scrollTarget?: string;
}

export function LpNav({ ctaLabel, ctaAction, scrollTarget }: LpNavProps) {
  const { openModal } = useContactForm();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleCta() {
    if (ctaAction === "modal") {
      openModal();
    } else if (scrollTarget) {
      document.querySelector(scrollTarget)?.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="u-container flex items-center justify-between py-4">
        <span className="flex items-center gap-2 cursor-default">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo.svg" alt="BuildLocal" className="h-7" />
          <span className="font-sans font-medium text-base tracking-tight text-dark">BuildLocal</span>
        </span>
        <button
          onClick={handleCta}
          data-track="nav-cta"
          data-track-label={ctaLabel}
          className="bg-brand text-dark rounded-sm px-5 py-3 font-sans font-medium text-sm transition-all hover:brightness-110 min-h-[44px]"
          style={{ transitionDuration: "0.3s" }}
        >
          {ctaLabel}
        </button>
      </div>
    </nav>
  );
}
