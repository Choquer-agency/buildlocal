"use client";

import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-register";
import { getPortfolioProjects } from "@/content/shared";
import { PortfolioProject } from "@/content/config";

/* ─── Case Study Expandable ─── */

function CaseStudySection({
  caseStudy,
}: {
  caseStudy: { challenge: string; approach: string; result: string };
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-4">
      <button
        onClick={() => setOpen(!open)}
        className="font-sans text-sm font-medium flex items-center gap-2 transition-colors"
        style={{ color: "#F79C42" }}
      >
        <span>{open ? "Hide" : "View"} Case Study</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 20 20"
          fill="none"
          className="transition-transform"
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transitionDuration: "0.3s",
          }}
        >
          <path
            d="M5 8L10 13L15 8"
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
          maxHeight: open ? "600px" : "0px",
          transitionDuration: "0.4s",
          transitionTimingFunction: "cubic-bezier(0.625, 0.05, 0, 1)",
        }}
      >
        <div className="pt-4 space-y-3">
          <div>
            <p className="font-sans text-xs font-medium uppercase tracking-wider text-dark opacity-50 mb-1">
              Challenge
            </p>
            <p className="font-sans text-sm text-dark opacity-70 leading-relaxed">
              {caseStudy.challenge}
            </p>
          </div>
          <div>
            <p className="font-sans text-xs font-medium uppercase tracking-wider text-dark opacity-50 mb-1">
              Approach
            </p>
            <p className="font-sans text-sm text-dark opacity-70 leading-relaxed">
              {caseStudy.approach}
            </p>
          </div>
          <div>
            <p className="font-sans text-xs font-medium uppercase tracking-wider text-dark opacity-50 mb-1">
              Result
            </p>
            <p className="font-sans text-sm text-dark opacity-70 leading-relaxed">
              {caseStudy.result}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Project Card ─── */

function ProjectCard({ project }: { project: PortfolioProject }) {
  return (
    <div
      className="rounded-2xl overflow-hidden flex flex-col"
      style={{
        backgroundColor: "#fff",
        boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
      }}
    >
      <div className="relative w-full" style={{ aspectRatio: "16/10" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <p
          className="font-mono text-xs uppercase tracking-wider mb-2"
          style={{ color: "#F79C42" }}
        >
          {project.category}
        </p>
        <h3 className="font-sans font-medium text-fluid-h5 text-dark leading-tight mb-2">
          {project.name}
        </h3>
        {project.description && (
          <p className="font-sans text-fluid-main text-dark opacity-60 leading-relaxed">
            {project.description}
          </p>
        )}
        {project.caseStudy && (
          <CaseStudySection caseStudy={project.caseStudy} />
        )}
      </div>
    </div>
  );
}

/* ─── Portfolio Content ─── */

export function PortfolioContent({ slug }: { slug?: string }) {
  const projects = getPortfolioProjects(slug);
  const heroRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".portfolio-hero-heading", {
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
        gsap.from(".portfolio-hero-sub", {
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
        gsap.from(".portfolio-card", {
          y: 60,
          opacity: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 75%",
            once: true,
          },
        });
      });
    },
    { scope: gridRef }
  );

  return (
    <>
      {/* Hero */}
      <section
        ref={heroRef}
        className="section-space-main"
        style={{ backgroundColor: "#FFF9F0" }}
      >
        <div className="u-container max-w-3xl text-center">
          <h1 className="portfolio-hero-heading font-sans font-medium text-fluid-h2 leading-[1.1] text-dark mb-6">
            175+ websites built. Here are a few.
          </h1>
          <p className="portfolio-hero-sub font-sans text-fluid-main text-dark opacity-60 leading-relaxed max-w-xl mx-auto">
            Every site we build is designed to generate leads and look
            professional.
          </p>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section
        ref={gridRef}
        className="section-space-main"
        style={{ backgroundColor: "#fff" }}
      >
        <div className="u-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, i) => (
              <div key={i} className="portfolio-card">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section
        className="section-space-main"
        style={{ backgroundColor: "#FFF9F0" }}
      >
        <div className="u-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <p
                className="font-sans font-medium text-fluid-h2"
                style={{ color: "#F79C42" }}
              >
                175+
              </p>
              <p className="font-sans text-fluid-main text-dark opacity-60 mt-2">
                Websites built for small businesses
              </p>
            </div>
            <div>
              <p
                className="font-sans font-medium text-fluid-h2"
                style={{ color: "#F79C42" }}
              >
                60+
              </p>
              <p className="font-sans text-fluid-main text-dark opacity-60 mt-2">
                Websites under active management
              </p>
            </div>
            <div>
              <p
                className="font-sans font-medium text-fluid-h2"
                style={{ color: "#F79C42" }}
              >
                $0
              </p>
              <p className="font-sans text-fluid-main text-dark opacity-60 mt-2">
                Setup fees on every plan
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
