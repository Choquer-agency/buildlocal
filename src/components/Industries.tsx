"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-register";
import Link from "next/link";
import { getIndustriesServed } from "@/content/shared";
import { getAllIndustrySlugs } from "@/content/industries";
import {
  Heart,
  Building,
  Building2,
  Home,
  Sun,
  Factory,
  Wrench,
  DollarSign,
  Brain,
  Stethoscope,
  Users,
  HandHeart,
  Briefcase,
  Scale,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Heart,
  Building,
  Building2,
  Home,
  Sun,
  Factory,
  Wrench,
  DollarSign,
  Brain,
  Stethoscope,
  Users,
  HandHeart,
  Briefcase,
  Scale,
  UtensilsCrossed,
};

/* Map cluster industry names → industry page slugs */
const nameToSlug: Record<string, string> = {
  "Healthcare & Medical": "healthcare",
  "Legal Services": "legal",
  "Home Services": "home-services",
  "Real Estate": "real-estate",
  "Restaurants & Hospitality": "hospitality",
  "Professional Services": "professional-services",
};

const industrySlugs = new Set(getAllIndustrySlugs());

function getIndustryLink(name: string): string | null {
  const slug = nameToSlug[name];
  return slug && industrySlugs.has(slug) ? `/industries/${slug}` : null;
}

interface IndustriesProps {
  locality: string;
  region: string;
  slug: string;
}

export function Industries({ locality, region, slug }: IndustriesProps) {
  const ref = useRef<HTMLElement>(null);
  const industries = getIndustriesServed(locality, region, slug);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".ind-heading", {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 75%", once: true },
        });

        gsap.from(".ind-card", {
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
    <section ref={ref} id="industries" className="theme-dark section-space-main">
      <div className="u-container">
        <div className="text-center mb-16">
          <p className="ind-heading eyebrow text-brand mb-4">Who We Help</p>
          <h2 className="ind-heading font-sans font-medium text-fluid-h2 leading-[1.1] text-white max-w-[28ch] mx-auto mb-6">
            SEO that drives results{" "}
            <span className="opacity-40">for {locality.toLowerCase()}</span>
          </h2>
          <p className="ind-heading font-sans text-fluid-main text-white opacity-50 leading-relaxed max-w-[55ch] mx-auto">
            We&apos;ve driven organic growth for businesses across {region} — with
            strategies tailored to each market&apos;s unique search landscape.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry) => {
            const Icon = iconMap[industry.icon];
            const href = getIndustryLink(industry.name);
            const card = (
              <div
                className="ind-card p-8 rounded-sm h-full"
                style={{
                  backgroundColor: "rgba(255,255,255,0.05)",
                  borderLeft: `3px solid ${industry.color}`,
                }}
              >
                {Icon && (
                  <Icon
                    size={24}
                    className="mb-5"
                    style={{ color: industry.color }}
                  />
                )}
                <h3 className="font-sans font-medium text-fluid-h6 text-white mb-3">
                  {industry.name}
                </h3>
                <p className="font-sans text-fluid-main text-white opacity-50 leading-relaxed">
                  {industry.description}
                </p>
                {href && (
                  <span className="inline-block mt-4 font-mono text-xs uppercase tracking-wider text-brand opacity-70">
                    Learn more →
                  </span>
                )}
              </div>
            );
            return href ? (
              <Link key={industry.name} href={href} className="block transition-transform hover:scale-[1.02]">
                {card}
              </Link>
            ) : (
              <div key={industry.name}>{card}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
