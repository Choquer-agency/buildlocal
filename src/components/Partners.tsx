"use client";

const supportingPartners = [
  { name: "Google Analytics", logo: "/images/logos/google-ads.svg" },
  { name: "Zapier", logo: "/images/logos/zapier.webp" },
  { name: "Figma", logo: "/images/logos/figma.svg" },
];

export function Partners() {
  return (
    <section className="section-space-main" style={{ backgroundColor: "#FFF9F0" }}>
      <div className="u-container">
        <div className="flex flex-col items-center">
          <p className="eyebrow text-brand mb-6">Trusted Tools & Partners</p>

          <h3 className="font-sans font-medium text-fluid-h3 text-dark text-center mb-3">
            Google Partner
          </h3>
          <p className="font-sans text-fluid-main text-dark opacity-40 mb-12">
            Certified Google Partner Agency
          </p>

          {/* Divider */}
          <div className="w-12 h-px bg-dark/10 mb-10" />

          {/* Supporting logos */}
          <p className="font-mono text-xs uppercase tracking-wider text-dark opacity-30 mb-6">
            Tools we use to drive results
          </p>
          <div className="flex items-center justify-center gap-8 md:gap-14 flex-wrap">
            {supportingPartners.map((p) => (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                key={p.name}
                src={p.logo}
                alt={p.name}
                width={100}
                height={32}
                className="object-contain"
                style={{ transitionDuration: "0.3s", height: "32px", width: "auto", maxWidth: "120px" }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
