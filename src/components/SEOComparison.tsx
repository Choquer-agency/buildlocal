"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-register";
import { getComparison } from "@/content/shared";

function CellValue({ value }: { value: string | boolean }) {
  if (typeof value === "boolean") {
    return value ? (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full" style={{ backgroundColor: "rgba(113,207,163,0.15)" }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2 7.5L5.5 11L12 3" stroke="#71CFA3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    ) : (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full" style={{ backgroundColor: "rgba(229,57,53,0.1)" }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M3 3L11 11M11 3L3 11" stroke="#E53935" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    );
  }
  return <span>{value}</span>;
}

export function ServiceComparison({ slug }: { slug: string }) {
  const comparison = getComparison(slug);
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".compare-heading", {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 75%", once: true },
        });

        gsap.from(".compare-row", {
          y: 20,
          opacity: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 60%", once: true },
        });
      });
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      id="service-comparison"
      className="section-space-main"
      style={{ backgroundColor: "#FFF9F0" }}
    >
      <div className="u-container">
        <div className="text-center mb-16">
          <p className="compare-heading eyebrow text-brand mb-4">
            How We Compare
          </p>
          <h2 className="compare-heading font-sans font-medium text-fluid-h2 leading-[1.1] text-dark max-w-[28ch] mx-auto mb-6">
            BuildLocal vs DIY{" "}
            <span className="opacity-40">vs Freelancer</span>
          </h2>
          <p className="compare-heading font-sans text-fluid-main text-dark opacity-50 leading-relaxed max-w-[55ch] mx-auto">
            See how your website options compare across the factors that
            matter most to your business.
          </p>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto max-w-4xl mx-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b-2 border-dark/10">
                <th className="font-sans font-medium text-fluid-meta text-dark opacity-50 uppercase tracking-wider py-4 pr-6">
                  Feature
                </th>
                <th className="font-sans font-medium text-fluid-meta uppercase tracking-wider py-4 px-6" style={{ color: "#F79C42" }}>
                  BuildLocal
                </th>
                <th className="font-sans font-medium text-fluid-meta text-dark opacity-50 uppercase tracking-wider py-4 px-6">
                  DIY Builder
                </th>
                <th className="font-sans font-medium text-fluid-meta text-dark opacity-50 uppercase tracking-wider py-4 px-6">
                  Freelancer
                </th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row) => (
                <tr
                  key={row.feature}
                  className="compare-row border-b border-dark/5"
                >
                  <td className="font-sans font-medium text-sm text-dark py-3.5 pr-6">
                    {row.feature}
                  </td>
                  <td className="font-sans text-sm text-dark py-3.5 px-6">
                    <CellValue value={row.buildLocal} />
                  </td>
                  <td className="font-sans text-sm text-dark opacity-60 py-3.5 px-6">
                    <CellValue value={row.diyBuilder} />
                  </td>
                  <td className="font-sans text-sm text-dark opacity-60 py-3.5 px-6">
                    <CellValue value={row.freelancer} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-6">
          {(["buildLocal", "diyBuilder", "freelancer"] as const).map((approach) => (
            <div
              key={approach}
              className="compare-row rounded-sm p-6"
              style={{
                backgroundColor:
                  approach === "buildLocal"
                    ? "rgba(247,156,66,0.08)"
                    : "rgba(0,0,0,0.02)",
                border:
                  approach === "buildLocal"
                    ? "1px solid rgba(247,156,66,0.2)"
                    : "1px solid rgba(0,0,0,0.05)",
              }}
            >
              <h3
                className="font-sans font-medium text-fluid-h5 mb-4"
                style={{
                  color: approach === "buildLocal" ? "#F79C42" : undefined,
                }}
              >
                {approach === "buildLocal"
                  ? "BuildLocal"
                  : approach === "diyBuilder"
                    ? "DIY Builder"
                    : "Freelancer"}
              </h3>
              <div className="space-y-3">
                {comparison.map((row) => (
                  <div
                    key={row.feature}
                    className="flex justify-between items-center"
                  >
                    <span className="font-sans text-sm text-dark opacity-60">
                      {row.feature}
                    </span>
                    <span className="font-sans text-sm text-dark font-medium ml-4 text-right">
                      <CellValue value={row[approach]} />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="font-sans text-fluid-main text-dark opacity-50 leading-relaxed max-w-[65ch] mx-auto text-center mt-12">
          BuildLocal combines professional design, built-in SEO, and ongoing
          support — so you get a website that actually drives results, not just
          one that looks pretty.
        </p>
      </div>
    </section>
  );
}
