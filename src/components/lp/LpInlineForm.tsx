"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-register";
import { submitForm } from "@/lib/form";

function pushDataLayer(data: Record<string, unknown>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push(data);
}

export function LpInlineForm() {
  const ref = useRef<HTMLElement>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const loadedAt = useRef(Date.now());
  const formStarted = useRef(false);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".lp-form-content", {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 75%", once: true },
        });
      });
    },
    { scope: ref }
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Honeypot check
    if (honeypot) return;

    // Timing check — reject if submitted too fast
    if (Date.now() - loadedAt.current < 3000) return;

    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      await submitForm({
        name: data.get("name"),
        email: data.get("email"),
        phone: data.get("phone"),
        formType: "free-mockup",
        pageUrl: window.location.href,
        submittedAt: new Date().toISOString(),
        _gotcha: "",
      });
      pushDataLayer({ event: "form_submit", form_type: "free-mockup" });
      setSuccess(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <section id="mockup-form" className="py-16 md:py-20" style={{ background: "linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 50%, #FFCC80 100%)" }}>
        <div className="u-container">
          <div className="max-w-[32rem] mx-auto text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M7 14L12 19L21 9" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="font-sans font-medium text-fluid-h3 text-dark mb-4">
              Your mockup is on its way!
            </h2>
            <p className="font-sans text-fluid-main text-dark opacity-60 leading-relaxed">
              We&apos;ll design a custom homepage mockup and send it to you within 48 hours. Keep an eye on your inbox.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="mockup-form"
      ref={ref}
      className="py-16 md:py-20"
      style={{ background: "linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 50%, #FFCC80 100%)" }}
    >
      <div className="u-container">
        <div className="lp-form-content max-w-[32rem] mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-sans font-medium text-fluid-h3 leading-[1.1] text-dark mb-3">
              Get your free mockup
            </h2>
            <p className="font-sans text-fluid-main text-dark opacity-60">
              Takes 30 seconds. We&apos;ll send your custom design within 48 hours.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 md:p-8 shadow-lg">
            {/* Honeypot */}
            <input
              type="text"
              name="_gotcha"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              style={{ display: "none" }}
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="grid gap-4">
              <div>
                <label htmlFor="lp-name" className="font-sans text-sm font-medium text-dark mb-1.5 block">
                  Your name
                </label>
                <input
                  id="lp-name"
                  name="name"
                  type="text"
                  required
                  placeholder="John Smith"
                  onFocus={() => {
                    if (!formStarted.current) {
                      formStarted.current = true;
                      pushDataLayer({ event: "form_start", form_type: "free-mockup" });
                    }
                  }}
                  className="w-full border border-dark/15 rounded-lg px-4 py-3 font-sans text-sm text-dark placeholder:text-dark/30 focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand transition-colors"
                />
              </div>

              <div>
                <label htmlFor="lp-email" className="font-sans text-sm font-medium text-dark mb-1.5 block">
                  Email
                </label>
                <input
                  id="lp-email"
                  name="email"
                  type="email"
                  required
                  placeholder="john@company.com"
                  className="w-full border border-dark/15 rounded-lg px-4 py-3 font-sans text-sm text-dark placeholder:text-dark/30 focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand transition-colors"
                />
              </div>

              <div>
                <label htmlFor="lp-phone" className="font-sans text-sm font-medium text-dark mb-1.5 block">
                  Phone
                </label>
                <input
                  id="lp-phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="(555) 123-4567"
                  className="w-full border border-dark/15 rounded-lg px-4 py-3 font-sans text-sm text-dark placeholder:text-dark/30 focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand transition-colors"
                />
              </div>
            </div>

            {error && (
              <p className="font-sans text-sm text-red-600 mt-3">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              data-track="form-submit-cta"
              data-track-label="Get My Free Mockup"
              className="w-full mt-6 inline-flex items-center justify-center gap-3 bg-brand text-dark rounded-lg px-8 py-4 font-sans font-medium text-fluid-main transition-all hover:brightness-110 min-h-[52px] disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ transitionDuration: "0.3s" }}
            >
              {loading ? (
                <span className="inline-block w-5 h-5 border-2 border-dark/30 border-t-dark rounded-full animate-spin" />
              ) : (
                <>
                  Get My Free Mockup
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M2 14L14 2M14 2H5M14 2V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </>
              )}
            </button>

            <p className="font-sans text-xs text-dark opacity-40 text-center mt-3">
              100% free. No credit card. No obligation.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
