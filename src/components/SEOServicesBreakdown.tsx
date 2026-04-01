"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-register";
import { useContactForm } from "@/context/ContactFormContext";
import { getAgencyServices } from "@/content/shared";
import { warmPalette } from "@/lib/colors";

const serviceImages = [
  "/images/services/1.webp",
  "/images/services/2.webp",
  "/images/services/3.webp",
  "/images/services/4.webp",
  "/images/services/5.webp",
  "/images/services/6.webp",
];

export function ServicesBreakdown({ slug }: { slug: string }) {
  const agencyServices = getAgencyServices(slug);
  const { openModal } = useContactForm();
  const ref = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".wfsb-heading", {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 75%", once: true },
        });

        gsap.from(".wfsb-item", {
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.08,
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
      id="services"
      className="section-space-large"
      style={{ backgroundColor: "#FFF9F0" }}
    >
      <div className="u-container">
        <div className="wfsb-heading mb-10">
          <p className="eyebrow text-brand mb-3">Our Services</p>
          <h2 className="font-sans font-medium text-fluid-h3 leading-[1.1] text-dark">
            Everything you need to get online and grow
          </h2>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.15fr] gap-10 lg:gap-14 items-center max-w-5xl mx-auto">
          <div
            className="wfsb-heading relative overflow-hidden rounded-md order-2 lg:order-1 lg:sticky lg:top-24"
            style={{ aspectRatio: "1 / 1" }}
          >
            {serviceImages.map((src, i) => (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                key={src}
                src={src}
                alt={agencyServices[i]?.title || ""}
                className="absolute inset-0 w-full h-full object-cover transition-opacity"
                style={{
                  opacity: openIndex === i ? 1 : 0,
                  transitionDuration: "0.5s",
                  transitionTimingFunction: "cubic-bezier(0.625, 0.05, 0, 1)",
                }}
                loading={i === 0 ? "eager" : "lazy"}
              />
            ))}
          </div>

          <div className="order-1 lg:order-2">
            {agencyServices.map((service, i) => (
              <div
                key={service.slug}
                className="wfsb-item border-b border-dark-faded"
                style={{
                  borderColor:
                    openIndex === i
                      ? warmPalette[i % warmPalette.length]
                      : undefined,
                  transition: "border-color 0.3s",
                }}
              >
                <button
                  className="w-full flex items-center justify-between py-4 text-left group"
                  onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                >
                  <span className="font-sans font-medium text-fluid-main text-dark pr-6">
                    {service.title}
                  </span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="flex-shrink-0 transition-all"
                    style={{
                      transform:
                        openIndex === i ? "rotate(45deg)" : "rotate(0deg)",
                      color:
                        openIndex === i
                          ? warmPalette[i % warmPalette.length]
                          : undefined,
                      transitionDuration: "0.3s",
                    }}
                  >
                    <path
                      d="M10 4V16M4 10H16"
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
                    maxHeight: openIndex === i ? "500px" : "0px",
                    transitionDuration: "0.4s",
                    transitionTimingFunction: "cubic-bezier(0.625, 0.05, 0, 1)",
                  }}
                >
                  <p className="font-sans text-sm text-dark opacity-80 leading-relaxed mb-1.5">
                    {service.description}
                  </p>
                  <p className="font-sans text-sm text-dark opacity-50 leading-relaxed pb-4">
                    {service.longDescription}
                  </p>
                </div>
              </div>
            ))}

            <div className="pt-6">
              <button
                onClick={() => openModal()}
                className="inline-flex items-center gap-3 bg-brand text-dark rounded-sm px-8 py-4 font-sans font-medium text-fluid-main transition-all hover:brightness-110"
                style={{ transitionDuration: "0.3s" }}
              >
                Book a Free Strategy Call
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 14L14 2M14 2H5M14 2V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
