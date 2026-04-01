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

const TOTAL_STEPS = 4;

const tradeTypes = [
  "Roofing",
  "HVAC",
  "Plumbing",
  "Electrical",
  "Painting",
  "Landscaping",
  "Concrete / Hardscaping",
  "Fencing",
  "Foundation Repair",
  "General Contracting",
  "Cleaning Services",
  "Pest Control",
  "Auto Repair",
  "Salon / Barbershop",
  "Other",
];

const goalOptions = [
  "Get more phone calls",
  "Rank higher on Google",
  "Look more professional",
  "Beat my competitors online",
  "Replace an outdated website",
  "Get my first website",
];

const inputClasses =
  "w-full border border-dark/15 rounded-lg px-4 py-3 font-sans text-sm text-dark placeholder:text-dark/30 focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand transition-colors";
const labelClasses = "font-sans text-sm font-medium text-dark mb-1.5 block";

export function LpMockupForm() {
  const ref = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const loadedAt = useRef(Date.now());
  const formStarted = useRef(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    companyName: "",
    tradeType: "",
    tradeTypeOther: "",
    serviceArea: "",
    services: "",
    targetCustomers: "",
    currentWebsite: "",
    goals: [] as string[],
    hasLogo: "",
    colorPreferences: "",
    notes: "",
  });

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

  function updateField(field: string, value: string | string[]) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  }

  function toggleGoal(goal: string) {
    setForm((prev) => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter((g) => g !== goal)
        : [...prev.goals, goal],
    }));
  }

  function validateStep(): boolean {
    const newErrors: Record<string, string> = {};
    switch (step) {
      case 0:
        if (!form.name.trim()) newErrors.name = "Required";
        if (!form.email.trim()) newErrors.email = "Required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Invalid email";
        if (!form.phone.trim()) newErrors.phone = "Required";
        break;
      case 1:
        if (!form.companyName.trim()) newErrors.companyName = "Required";
        if (!form.tradeType) newErrors.tradeType = "Required";
        if (!form.serviceArea.trim()) newErrors.serviceArea = "Required";
        break;
      case 2:
        if (!form.services.trim()) newErrors.services = "Required";
        break;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function goNext() {
    if (!validateStep()) return;
    if (step === 0 && !formStarted.current) {
      formStarted.current = true;
      pushDataLayer({ event: "form_start", form_type: "free-mockup" });
    }
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  }

  function goBack() {
    setStep((s) => Math.max(s - 1, 0));
  }

  async function handleSubmit() {
    if (honeypot) return;
    if (Date.now() - loadedAt.current < 3000) return;
    if (!validateStep()) return;

    setLoading(true);
    setError("");

    try {
      await submitForm({
        name: form.name,
        email: form.email,
        phone: form.phone,
        companyName: form.companyName,
        tradeType: form.tradeType === "Other" ? form.tradeTypeOther : form.tradeType,
        serviceArea: form.serviceArea,
        services: form.services,
        targetCustomers: form.targetCustomers,
        currentWebsite: form.currentWebsite,
        goals: form.goals.join(", "),
        hasLogo: form.hasLogo,
        colorPreferences: form.colorPreferences,
        notes: form.notes,
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
              Your mockup is in the works!
            </h2>
            <p className="font-sans text-fluid-main text-dark opacity-60 leading-relaxed mb-2">
              We&apos;ve got everything we need. Our team will design a custom homepage mockup for <strong>{form.companyName}</strong> and send it to <strong>{form.email}</strong> within 48 hours.
            </p>
            <p className="font-sans text-sm text-dark opacity-40">
              Keep an eye on your inbox. We may reach out if we have any questions.
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
        <div className="lp-form-content max-w-[36rem] mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-sans font-medium text-fluid-h3 leading-[1.1] text-dark mb-3">
              Get your free mockup
            </h2>
            <p className="font-sans text-fluid-main text-dark opacity-60">
              Tell us about your business and we&apos;ll design a custom homepage — on us.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg">
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

            {/* Progress bar */}
            <div className="flex items-center gap-3 mb-8">
              {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                <div
                  key={i}
                  className="h-1.5 rounded-full flex-1 transition-all duration-300"
                  style={{
                    backgroundColor: i <= step ? "#ff9500" : "rgba(0,0,0,0.08)",
                  }}
                />
              ))}
              <span className="font-mono text-xs text-dark opacity-40 ml-1">
                {step + 1}/{TOTAL_STEPS}
              </span>
            </div>

            {/* Step 1: Your Info */}
            {step === 0 && (
              <div>
                <h3 className="font-sans font-medium text-lg text-dark mb-1">Your info</h3>
                <p className="font-sans text-sm text-dark opacity-40 mb-6">So we can send you the mockup and follow up.</p>
                <div className="grid gap-4">
                  <div>
                    <label htmlFor="mf-name" className={labelClasses}>Full name *</label>
                    <input id="mf-name" type="text" required placeholder="John Smith" value={form.name} onChange={(e) => updateField("name", e.target.value)} className={inputClasses} />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="mf-email" className={labelClasses}>Email *</label>
                      <input id="mf-email" type="email" required placeholder="john@company.com" value={form.email} onChange={(e) => updateField("email", e.target.value)} className={inputClasses} />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <label htmlFor="mf-phone" className={labelClasses}>Phone *</label>
                      <input id="mf-phone" type="tel" required placeholder="(555) 123-4567" value={form.phone} onChange={(e) => updateField("phone", e.target.value)} className={inputClasses} />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Your Business */}
            {step === 1 && (
              <div>
                <h3 className="font-sans font-medium text-lg text-dark mb-1">Your business</h3>
                <p className="font-sans text-sm text-dark opacity-40 mb-6">Help us understand what you do and where you do it.</p>
                <div className="grid gap-4">
                  <div>
                    <label htmlFor="mf-company" className={labelClasses}>Company name *</label>
                    <input id="mf-company" type="text" required placeholder="Smith Roofing LLC" value={form.companyName} onChange={(e) => updateField("companyName", e.target.value)} className={inputClasses} />
                    {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>}
                  </div>
                  <div>
                    <label htmlFor="mf-trade" className={labelClasses}>What type of business? *</label>
                    <select id="mf-trade" required value={form.tradeType} onChange={(e) => updateField("tradeType", e.target.value)} className={`${inputClasses} bg-white`}>
                      <option value="" disabled>Select your trade...</option>
                      {tradeTypes.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                    {errors.tradeType && <p className="text-red-500 text-xs mt-1">{errors.tradeType}</p>}
                  </div>
                  {form.tradeType === "Other" && (
                    <div>
                      <label htmlFor="mf-trade-other" className={labelClasses}>Tell us what you do</label>
                      <input id="mf-trade-other" type="text" placeholder="e.g., Pool installation, Garage doors..." value={form.tradeTypeOther} onChange={(e) => updateField("tradeTypeOther", e.target.value)} className={inputClasses} />
                    </div>
                  )}
                  <div>
                    <label htmlFor="mf-area" className={labelClasses}>Service area / city *</label>
                    <input id="mf-area" type="text" required placeholder="e.g., Phoenix, AZ and surrounding areas" value={form.serviceArea} onChange={(e) => updateField("serviceArea", e.target.value)} className={inputClasses} />
                    {errors.serviceArea && <p className="text-red-500 text-xs mt-1">{errors.serviceArea}</p>}
                  </div>
                  <div>
                    <label htmlFor="mf-website" className={labelClasses}>Current website URL <span className="text-dark/40">(if you have one)</span></label>
                    <input id="mf-website" type="url" placeholder="https://yoursite.com" value={form.currentWebsite} onChange={(e) => updateField("currentWebsite", e.target.value)} className={inputClasses} />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Your Services */}
            {step === 2 && (
              <div>
                <h3 className="font-sans font-medium text-lg text-dark mb-1">Your services</h3>
                <p className="font-sans text-sm text-dark opacity-40 mb-6">We&apos;ll use this to build out the pages and messaging for your mockup.</p>
                <div className="grid gap-4">
                  <div>
                    <label htmlFor="mf-services" className={labelClasses}>List your main services *</label>
                    <textarea
                      id="mf-services"
                      required
                      rows={4}
                      placeholder={"e.g.,\n- Roof repair & replacement\n- Storm damage restoration\n- Gutter installation\n- Free inspections"}
                      value={form.services}
                      onChange={(e) => updateField("services", e.target.value)}
                      className={`${inputClasses} resize-none`}
                    />
                    {errors.services && <p className="text-red-500 text-xs mt-1">{errors.services}</p>}
                  </div>
                  <div>
                    <label htmlFor="mf-target" className={labelClasses}>Who are your ideal customers? <span className="text-dark/40">(optional)</span></label>
                    <input id="mf-target" type="text" placeholder="e.g., Homeowners, property managers, commercial buildings..." value={form.targetCustomers} onChange={(e) => updateField("targetCustomers", e.target.value)} className={inputClasses} />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Your Vision */}
            {step === 3 && (
              <div>
                <h3 className="font-sans font-medium text-lg text-dark mb-1">Your vision</h3>
                <p className="font-sans text-sm text-dark opacity-40 mb-6">Last step — help us nail the design.</p>
                <div className="grid gap-5">
                  <div>
                    <p className={labelClasses}>What&apos;s most important to you? <span className="text-dark/40">(pick all that apply)</span></p>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      {goalOptions.map((goal) => (
                        <button
                          key={goal}
                          type="button"
                          onClick={() => toggleGoal(goal)}
                          className={`text-left px-3 py-2.5 rounded-lg border text-sm font-sans transition-all ${
                            form.goals.includes(goal)
                              ? "border-brand bg-brand/10 text-dark font-medium"
                              : "border-dark/10 text-dark/60 hover:border-dark/25"
                          }`}
                        >
                          {form.goals.includes(goal) && (
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="inline mr-1.5 -mt-0.5">
                              <path d="M3 8L6.5 11.5L13 4.5" stroke="#ff9500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                          {goal}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="mf-logo" className={labelClasses}>Do you have a logo?</label>
                    <select id="mf-logo" value={form.hasLogo} onChange={(e) => updateField("hasLogo", e.target.value)} className={`${inputClasses} bg-white`}>
                      <option value="">Select...</option>
                      <option value="yes">Yes, I have a logo</option>
                      <option value="no">No, I need one</option>
                      <option value="needs-update">I have one but it needs updating</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="mf-colors" className={labelClasses}>Any color preferences? <span className="text-dark/40">(optional)</span></label>
                    <input id="mf-colors" type="text" placeholder="e.g., Blue and white, match our truck wrap, no preference..." value={form.colorPreferences} onChange={(e) => updateField("colorPreferences", e.target.value)} className={inputClasses} />
                  </div>
                  <div>
                    <label htmlFor="mf-notes" className={labelClasses}>Anything else we should know? <span className="text-dark/40">(optional)</span></label>
                    <textarea
                      id="mf-notes"
                      rows={3}
                      placeholder="Competitors you like, features you want, things you hate about your current site..."
                      value={form.notes}
                      onChange={(e) => updateField("notes", e.target.value)}
                      className={`${inputClasses} resize-none`}
                    />
                  </div>
                </div>
              </div>
            )}

            {error && (
              <p className="font-sans text-sm text-red-600 mt-4">{error}</p>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              {step > 0 ? (
                <button
                  type="button"
                  onClick={goBack}
                  className="flex items-center gap-2 font-sans text-sm text-dark opacity-50 hover:opacity-100 transition-opacity min-h-[44px]"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M10 2L4 8L10 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Back
                </button>
              ) : (
                <div />
              )}

              {step < TOTAL_STEPS - 1 ? (
                <button
                  type="button"
                  onClick={goNext}
                  data-track="form-next-step"
                  data-track-label={`Step ${step + 1} to ${step + 2}`}
                  className="flex items-center gap-2 bg-brand text-dark rounded-lg px-6 py-3 font-sans font-medium text-sm transition-all hover:brightness-110 min-h-[44px]"
                  style={{ transitionDuration: "0.3s" }}
                >
                  Next
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 2L12 8L6 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  data-track="form-submit-cta"
                  data-track-label="Get My Free Mockup"
                  className="flex items-center gap-2 bg-brand text-dark rounded-lg px-6 py-3 font-sans font-medium text-sm transition-all hover:brightness-110 min-h-[44px] disabled:opacity-50 disabled:cursor-not-allowed"
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
              )}
            </div>

            <p className="font-sans text-xs text-dark opacity-40 text-center mt-4">
              100% free. No credit card. No obligation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
