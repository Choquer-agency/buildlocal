"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-register";
import { warmPalette } from "@/lib/colors";

const benefits = [
  {
    title: "Get Found on Google",
    description:
      "97% of consumers search online for local businesses. Without a website optimized for search, you're invisible to the people actively looking for what you offer. We build every site with local SEO baked in from day one.",
    color: warmPalette[0],
  },
  {
    title: "Look Professional & Build Trust",
    description:
      "First impressions matter — 75% of people judge a business's credibility based on its website. A clean, professional site tells customers you're legitimate, established, and worth their time and money.",
    color: warmPalette[1],
  },
  {
    title: "Generate Leads While You Sleep",
    description:
      "Your website works 24/7 — capturing leads through contact forms, phone calls, and booking requests even when you're off the clock. Wake up to new inquiries without lifting a finger.",
    color: warmPalette[2],
  },
  {
    title: "Stop Losing to Competitors",
    description:
      "Your competitors who have websites are getting the customers that should be yours. Every day without a professional online presence is another day you're handing business to the competition.",
    color: warmPalette[3],
  },
  {
    title: "No Tech Headaches",
    description:
      "We handle everything — hosting, updates, security, and backups. You never have to worry about your site going down, getting hacked, or falling behind on updates. Just focus on running your business.",
    color: warmPalette[4],
  },
  {
    title: "Grow When You're Ready",
    description:
      "Start with what you need today and scale up when the time is right. Add pages, upgrade your plan, or expand your online presence — we make it easy to grow at your own pace.",
    color: warmPalette[5],
  },
];

export function WhyWebsite() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".why-heading", {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 75%", once: true },
        });

        gsap.from(".why-card", {
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
    <section ref={ref} id="why-website" className="theme-dark section-space-large">
      <div className="u-container">
        <div className="text-center mb-16">
          <p className="why-heading eyebrow text-brand mb-4">Why It Matters</p>
          <h2 className="why-heading font-sans font-medium text-fluid-h2 leading-[1.1] text-white max-w-[28ch] mx-auto mb-6">
            Your website is your{" "}
            <span className="opacity-40">24/7 salesperson.</span>
          </h2>
          <p className="why-heading font-sans text-fluid-main text-white opacity-50 leading-relaxed max-w-[55ch] mx-auto">
            A professional website doesn&apos;t just look good — it works for
            you around the clock. Generating leads, building trust, and
            bringing in customers while you focus on what you do best.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="why-card p-8 rounded-sm"
              style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
            >
              <div
                className="w-2 h-2 rounded-full mb-5"
                style={{ backgroundColor: benefit.color }}
              />
              <h3 className="font-sans font-medium text-fluid-h6 text-white mb-3">
                {benefit.title}
              </h3>
              <p className="font-sans text-fluid-main text-white opacity-50 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
