"use client";

export function FinalCta() {
  function handleClick() {
    document.querySelector("#mockup-form")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section className="py-12 md:py-16 text-center" style={{ backgroundColor: "#FFF9F0" }}>
      <div className="u-container">
        <h2 className="font-sans font-medium text-fluid-h3 leading-[1.1] text-dark mb-4">
          Ready to see your mockup?
        </h2>
        <p className="font-sans text-fluid-main text-dark opacity-50 mb-6">
          Takes 30 seconds. Completely free. No strings attached.
        </p>
        <button
          onClick={handleClick}
          data-track="final-cta"
          data-track-label="Get My Free Mockup"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-brand text-dark rounded-sm px-8 py-4 font-sans font-medium text-fluid-main transition-all hover:brightness-110 min-h-[52px]"
          style={{ transitionDuration: "0.3s" }}
        >
          Get My Free Mockup
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 14L14 2M14 2H5M14 2V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </section>
  );
}
