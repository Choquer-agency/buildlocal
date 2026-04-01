"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-register";

const projects = [
  { image: "/images/portfolio/project-3.webp", label: "Painting Contractor", name: "Pedigree Painting" },
  { image: "/images/portfolio/project-5.webp", label: "Crane & Rigging", name: "Far North Crane" },
  { image: "/images/portfolio/project-1.webp", label: "Notary Services", name: "LC Notary" },
];

export function MockupPreview() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".lp-mockup-card", {
          y: 60,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 70%", once: true },
        });
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="py-16 md:py-20 overflow-hidden">
      <div className="u-container">
        <p className="font-mono text-xs uppercase tracking-wider text-dark opacity-40 mb-3">
          Recent work
        </p>
        <h2 className="font-sans font-medium text-fluid-h3 leading-[1.1] text-dark mb-10 max-w-[22ch]">
          Here&apos;s what our clients&apos; sites look like
        </h2>

        <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-3 md:overflow-visible md:pb-0" style={{ scrollbarWidth: "none" }}>
          {projects.map((project) => (
            <div
              key={project.name}
              className="lp-mockup-card flex-shrink-0 w-[80vw] md:w-auto rounded-lg overflow-hidden bg-white border border-dark/8 snap-start"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.image}
                  alt={`${project.name} website`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/40 to-transparent" />
              </div>
              <div className="p-5">
                <span className="font-mono text-[10px] uppercase tracking-wider text-brand">
                  {project.label}
                </span>
                <p className="font-sans font-medium text-sm text-dark mt-1">{project.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
