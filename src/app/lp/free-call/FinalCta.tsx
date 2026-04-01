"use client";

export function FinalCta() {
  function handleClick() {
    document.querySelector("#callback-form")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section className="py-12 md:py-16 text-center" style={{ backgroundColor: "#FFF9F0" }}>
      <div className="u-container">
        <h2 className="font-sans font-medium text-fluid-h3 leading-[1.1] text-dark mb-4">
          Ready to talk?
        </h2>
        <p className="font-sans text-fluid-main text-dark opacity-50 mb-6">
          10 seconds. No commitment. A real person will call you back.
        </p>
        <button
          onClick={handleClick}
          data-track="final-cta"
          data-track-label="Have Our Team Call Me"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-brand text-dark rounded-sm px-8 py-4 font-sans font-medium text-fluid-main transition-all hover:brightness-110 min-h-[52px]"
          style={{ transitionDuration: "0.3s" }}
        >
          Have Our Team Call Me
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </section>
  );
}
