"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-register";
import { useContactForm } from "@/context/ContactFormContext";

const values = [
  {
    num: "01",
    title: "Exceed expectations",
    description:
      "We don't just meet the brief — we push beyond it. Every project gets our full attention and our best thinking.",
    color: "#F79C42",
  },
  {
    num: "02",
    title: "Pursue growth & learning",
    description:
      "The web moves fast. We stay ahead by constantly learning new tools, techniques, and strategies — so your site never falls behind.",
    color: "#BCEFFF",
  },
  {
    num: "03",
    title: "Build a positive team",
    description:
      "Great work comes from great teams. We invest in each other, support each other, and bring that energy to every client relationship.",
    color: "#C4EF7A",
  },
  {
    num: "04",
    title: "Open & honest communication",
    description:
      "No jargon, no runaround. We tell you what's working, what's not, and what we recommend — straight up.",
    color: "#71CFA3",
  },
  {
    num: "05",
    title: "Embrace change",
    description:
      "New platforms, new algorithms, new opportunities. We don't resist change — we use it to give your business an edge.",
    color: "#E8D5FF",
  },
  {
    num: "06",
    title: "Serve our community",
    description:
      "We're committed to supporting small businesses and giving back to the communities we work in. Your growth is our mission.",
    color: "#FFD6E0",
  },
];

const certifications = [
  "175+ Websites Built",
  "60+ Sites Managed",
  "47% Avg. Traffic Increase",
  "Team of 5",
  "No Contracts",
  "$0 Setup Fees",
];

interface AboutProps {
  locality: string;
  region: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function About({ region }: AboutProps) {
  const { openModal } = useContactForm();
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".about-heading", {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });

        gsap.from(".about-body", {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.2,
        });

        gsap.from(".about-image > img:first-child", {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.3,
        });

        gsap.from(".about-mask", {
          scale: 0.8,
          opacity: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "back.out(1.4)",
          delay: 0.6,
        });

        gsap.from(".about-value", {
          y: 40,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".about-values", start: "top 75%", once: true },
        });

        gsap.from(".about-cert", {
          y: 20,
          opacity: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: ".about-certs", start: "top 80%", once: true },
        });
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} style={{ backgroundColor: "#FFF9F0" }}>
      {/* Hero section */}
      <div className="section-space-hero">
        <div className="u-container">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
            {/* Left: Text */}
            <div>
              <div className="about-heading flex items-center gap-2.5 mb-6">
                <span className="font-mono text-xs uppercase tracking-wider text-brand">
                  Who We Are
                </span>
              </div>

              <h1 className="about-heading font-sans font-medium text-fluid-h1 leading-[1.1] tracking-tight text-dark max-w-[16ch] mb-6">
                More than an agency — we become part of your team.
              </h1>

              <div className="about-body space-y-4">
                <p className="font-sans text-fluid-large text-dark opacity-60 leading-relaxed max-w-[48ch]">
                  We&apos;re a team of 5 designers, developers, and strategists who embed
                  ourselves into your business. We learn your audience, your processes, and
                  your pain points — so every website and strategy we create is designed
                  with SEO, CRO, and data-driven decisions at its core.
                </p>

                <p className="font-sans text-fluid-main text-dark opacity-50 leading-relaxed max-w-[48ch]">
                  With 175+ websites built and an average 47% increase in traffic within
                  six months, we know what works. Every element — from page structure to
                  user flow — is designed with precision, ensuring your site doesn&apos;t
                  just look great but becomes a business asset that scales.
                </p>

                <p className="font-sans text-fluid-main text-dark opacity-50 leading-relaxed max-w-[48ch]">
                  We don&apos;t guess. We test, measure, and refine. Through structured
                  processes and deep collaboration, we craft high-performance digital
                  assets that drive conversions.
                </p>

                <div className="pt-4">
                  <button onClick={() => openModal()} className="btn">
                    <span className="text-sm">Book a Free Strategy Call</span>
                    <span className="btn-arrow">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path
                          d="M1 13L13 1M13 1H3M13 1V11"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Photo collage */}
            <div className="about-image relative" style={{ minHeight: "540px" }}>
              {/* Main hero photo */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/about-hero.webp"
                alt="BuildLocal team"
                className="relative z-10 w-[75%] mx-auto rounded-lg shadow-xl"
                style={{ aspectRatio: "4/5", objectFit: "cover" }}
              />

              {/* Mask photo 1 — team member focused at desk */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/about-mask-1.webp"
                alt="Team member working at desk"
                className="about-mask absolute z-20 w-[38%] rounded-lg shadow-lg"
                style={{
                  top: "-4%",
                  right: "-2%",
                  transform: "rotate(4deg)",
                  aspectRatio: "4/5",
                  objectFit: "cover",
                }}
              />

              {/* Mask photo 2 — team walking downtown */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/about-mask-2.webp"
                alt="Team walking through the city"
                className="about-mask absolute z-20 w-[36%] rounded-lg shadow-lg"
                style={{
                  bottom: "2%",
                  left: "-4%",
                  transform: "rotate(-3deg)",
                  aspectRatio: "4/5",
                  objectFit: "cover",
                }}
              />

              {/* Mask photo 3 — working at monitor */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/about-mask-3.webp"
                alt="Designer working on a client project"
                className="about-mask absolute z-20 w-[35%] rounded-lg shadow-lg"
                style={{
                  bottom: "-6%",
                  right: "4%",
                  transform: "rotate(3deg)",
                  aspectRatio: "4/5",
                  objectFit: "cover",
                }}
              />

              {/* Mask photo 4 — team member playing chess */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/about-mask-4.webp"
                alt="Team member at the office"
                className="about-mask absolute z-5 w-[34%] rounded-lg shadow-lg"
                style={{
                  top: "8%",
                  left: "-6%",
                  transform: "rotate(-5deg)",
                  aspectRatio: "4/5",
                  objectFit: "cover",
                }}
              />

              <p className="relative z-10 font-mono text-xs text-dark opacity-30 mt-8 text-center">
                The BuildLocal Team
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Certifications bar */}
      <div className="about-certs border-t border-b" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
        <div className="u-container py-8">
          <div className="flex flex-wrap justify-center gap-4">
            {certifications.map((cert) => (
              <span
                key={cert}
                className="about-cert font-mono text-xs uppercase tracking-wider px-4 py-2 rounded-full"
                style={{ backgroundColor: "rgba(247,156,66,0.12)", color: "#0c0c0c" }}
              >
                {cert}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Values section */}
      <div className="about-values section-space-main">
        <div className="u-container">
          <div className="text-center mb-12">
            <p className="eyebrow text-brand mb-4">How We Work</p>
            <h2 className="font-sans font-medium text-fluid-h2 leading-[1.1] text-dark max-w-[22ch] mx-auto">
              Our values drive everything we build.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value) => (
              <div
                key={value.num}
                className="about-value p-8 rounded-sm"
                style={{ backgroundColor: "rgba(0,0,0,0.02)" }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: value.color }}
                  >
                    <span className="font-display text-xs text-dark">
                      {value.num}
                    </span>
                  </div>
                  <h3 className="font-sans font-medium text-fluid-h6 text-dark">
                    {value.title}
                  </h3>
                </div>
                <p className="font-sans text-fluid-main text-dark opacity-50 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
