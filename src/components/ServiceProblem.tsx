"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-register";

function PixelX({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
    >
      <rect width="16" height="16" fill={color} />
      <rect x="64" width="16" height="16" fill={color} />
      <rect x="16" y="16" width="16" height="16" fill={color} />
      <rect x="48" y="16" width="16" height="16" fill={color} />
      <rect x="32" y="32" width="16" height="16" fill={color} />
      <rect x="16" y="48" width="16" height="16" fill={color} />
      <rect x="48" y="48" width="16" height="16" fill={color} />
      <rect width="16" height="16" y="64" fill={color} />
      <rect x="64" y="64" width="16" height="16" fill={color} />
    </svg>
  );
}

const iconColor = "#E53935";

interface ServiceProblemProps {
  painPoints: { title: string; description: string }[];
  eyebrow: string;
  heading: string;
}

export function ServiceProblem({ painPoints, eyebrow, heading }: ServiceProblemProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".sp-heading", {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 75%", once: true },
        });

        gsap.from(".sp-card", {
          y: 50,
          opacity: 0,
          duration: 0.6,
          stagger: 0.12,
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
      className="section-space-main"
      style={{ backgroundColor: "#FFF9F0" }}
    >
      <div className="u-container">
        <div className="text-center mb-16">
          <p className="sp-heading eyebrow text-brand mb-4">
            {eyebrow}
          </p>
          <h2 className="sp-heading font-sans font-medium text-fluid-h2 leading-[1.1] text-dark max-w-[24ch] mx-auto mb-6">
            {heading}{" "}
            <span className="opacity-40">Here&apos;s how.</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {painPoints.map((point) => (
            <div key={point.title} className="sp-card p-6 text-center">
              <div className="flex justify-center mb-5">
                <PixelX color={iconColor} />
              </div>
              <h3 className="font-sans font-medium text-fluid-h6 text-dark mb-2">
                {point.title}
              </h3>
              <p className="font-sans text-fluid-main text-dark opacity-50 leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
