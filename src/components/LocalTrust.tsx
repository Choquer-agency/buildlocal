"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-register";
import { warmPalette } from "@/lib/colors";
import { MapPin, Users, Handshake } from "lucide-react";

interface LocalTrustProps {
  locality: string;
  stateCode: string;
  region: string;
  nearbyAreas: string;
}

export function LocalTrust({ locality, stateCode, region, nearbyAreas }: LocalTrustProps) {
  const ref = useRef<HTMLElement>(null);

  const trustSignals = [
    {
      icon: MapPin,
      label: `Based in ${locality}, ${stateCode}`,
      color: warmPalette[0],
    },
    {
      icon: Users,
      label: `60+ websites managed across ${region}`,
      color: warmPalette[4],
    },
    {
      icon: Handshake,
      label: "Fully managed — we handle everything",
      color: warmPalette[3],
    },
  ];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".local-heading", {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 75%", once: true },
        });

        gsap.from(".local-content", {
          y: 30,
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
    <section
      ref={ref}
      id="phoenix"
      className="section-space-main"
      style={{ backgroundColor: "#FFF9F0" }}
    >
      <div className="u-container">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-16 items-start">
          {/* Left: Copy */}
          <div>
            <p className="local-heading eyebrow text-brand mb-4">
              {locality}, {region}
            </p>
            <h2 className="local-heading font-sans font-medium text-fluid-h3 leading-[1.1] text-dark mb-8">
              Built for businesses in {locality}
            </h2>

            <div className="local-content space-y-5">
              <p className="font-sans text-fluid-main text-dark opacity-60 leading-relaxed">
                {locality} is one of the fastest-growing markets in the country,
                and small businesses need a strong online presence to keep up.
                Whether you&apos;re a roofer, a cleaning company, or a local
                restaurant in {locality}, your website is often the first
                impression customers have of your business.
              </p>
              <p className="font-sans text-fluid-main text-dark opacity-60 leading-relaxed">
                BuildLocal understands the businesses that make {region} run —
                trades companies, local services, retail shops, and professional
                firms. We build websites tuned to how {region} customers search,
                browse, and buy.
              </p>
              <p className="font-sans text-fluid-main text-dark opacity-60 leading-relaxed">
                We combine professional web design with local market knowledge —
                giving your business a website that is not just beautifully
                designed, but strategically built to generate leads and rank in
                local search results across {nearbyAreas}.
              </p>
            </div>
          </div>

          {/* Right: Trust signals */}
          <div className="local-content space-y-4 lg:mt-16">
            {trustSignals.map((signal) => {
              const Icon = signal.icon;
              return (
                <div
                  key={signal.label}
                  className="flex items-center gap-4 p-5 rounded-sm"
                  style={{
                    backgroundColor: "rgba(0,0,0,0.02)",
                    borderLeft: `3px solid ${signal.color}`,
                  }}
                >
                  <Icon
                    size={22}
                    className="flex-shrink-0"
                    style={{ color: signal.color }}
                  />
                  <span className="font-sans font-medium text-fluid-main text-dark">
                    {signal.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
