"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { gsap } from "@/lib/gsap-register";
import { submitForm } from "@/lib/form";
import { useContactForm } from "@/context/ContactFormContext";
import { Check, X, ArrowRight, ArrowLeft } from "lucide-react";
import { clsx } from "clsx";

interface ContactFormModalProps {
  domain: string;
  region: string;
}

const TOTAL_SLIDES = 3;

const businessTypes = [
  "Trades / Home Services (roofing, HVAC, plumbing, etc.)",
  "Local Services (cleaning, pest control, auto repair, etc.)",
  "Retail / Lifestyle (salon, restaurant, fitness, etc.)",
  "Professional Services (accounting, consulting, insurance, etc.)",
  "Other",
];

const planInterests = [
  "Starter — $99/mo",
  "Professional — $195/mo",
  "Growth — $295/mo (Most Popular)",
  "Premium — $495/mo",
  "Not sure yet",
];

const timelines = [
  "ASAP — this week",
  "Within 2 weeks",
  "Within a month",
  "Flexible / no rush",
];

const referralSources = [
  "Google search",
  "Text message / cold outreach",
  "Referred by someone",
  "Social media",
  "Other",
];

function ProgressIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
        <div
          key={i}
          className={clsx(
            "h-1.5 rounded-full transition-all",
            i === current
              ? "w-8 bg-brand"
              : i < current
                ? "w-4 bg-brand/40"
                : "w-4 bg-dark/10"
          )}
          style={{ transitionDuration: "0.3s" }}
        />
      ))}
      <span className="ml-3 font-mono text-xs text-dark opacity-40">
        {current + 1} / {TOTAL_SLIDES}
      </span>
    </div>
  );
}

export function ContactFormModal({ domain, region }: ContactFormModalProps) {
  const { isOpen, closeModal } = useContactForm();
  const mountTime = useRef(Date.now());
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    businessType: "",
    website: "",
    plan: "",
    timeline: "",
    referral: "",
    notes: "",
    _gotcha: "",
  });

  // Reset form after successful submission and close
  const handleClose = useCallback(() => {
    if (isSuccess) {
      setCurrentSlide(0);
      setIsSuccess(false);
      setErrors({});
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        businessType: "",
        website: "",
        plan: "",
        timeline: "",
        referral: "",
        notes: "",
        _gotcha: "",
      });
    }
    closeModal();
  }, [isSuccess, closeModal]); // eslint-disable-line react-hooks/exhaustive-deps

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      mountTime.current = Date.now();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Escape key
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) handleClose();
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, handleClose]);

  // Entrance animation
  useEffect(() => {
    if (isOpen && modalRef.current && backdropRef.current) {
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
      gsap.fromTo(
        modalRef.current,
        { y: 40, opacity: 0, scale: 0.97 },
        { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "power3.out", delay: 0.1 }
      );
    }
  }, [isOpen]);

  function validateSlide(index: number): boolean {
    const newErrors: Record<string, string> = {};

    switch (index) {
      case 0:
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
          newErrors.email = "Please enter a valid email";
        if (!formData.company.trim()) newErrors.company = "Company is required";
        break;
      case 1:
        if (!formData.businessType)
          newErrors.businessType = "Please select a business type";
        if (!formData.plan)
          newErrors.plan = "Please select a plan";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function animateSlide(direction: "next" | "back", callback: () => void) {
    if (!slideRef.current || isAnimating.current) return;
    isAnimating.current = true;

    const xOut = direction === "next" ? -60 : 60;
    const xIn = direction === "next" ? 60 : -60;

    gsap.to(slideRef.current, {
      x: xOut,
      opacity: 0,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => {
        callback();
        gsap.set(slideRef.current, { x: xIn });
        gsap.to(slideRef.current, {
          x: 0,
          opacity: 1,
          duration: 0.3,
          ease: "power3.out",
          onComplete: () => {
            isAnimating.current = false;
          },
        });
      },
    });
  }

  function goNext() {
    if (!validateSlide(currentSlide)) return;
    animateSlide("next", () => setCurrentSlide((s) => s + 1));
  }

  function goBack() {
    animateSlide("back", () => setCurrentSlide((s) => s - 1));
  }

  async function handleSubmit() {
    if (formData._gotcha || Date.now() - mountTime.current < 3000) return;
    if (!validateSlide(currentSlide)) return;

    setIsSubmitting(true);
    try {
      await submitForm({
        ...formData,
        websiteSource: domain,
        websiteRegion: region,
        submittedAt: new Date().toISOString(),
        pageUrl: typeof window !== "undefined" ? window.location.href : "",
      });
      setIsSuccess(true);
    } catch {
      setErrors({ submit: "Something went wrong. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  }

  function updateField(field: string, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  }

  if (!isOpen) return null;

  const inputClasses =
    "w-full px-4 py-3 rounded-md border border-dark-faded bg-light text-dark placeholder:text-dark/30 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all text-fluid-main font-sans";
  const selectClasses =
    "w-full px-4 py-3 rounded-md border border-dark-faded bg-light text-dark focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all text-fluid-main font-sans appearance-none";
  const labelClasses = "block text-sm font-sans font-medium text-dark mb-1.5";
  const errorClasses = "text-bg-red text-xs mt-1 font-sans";

  function renderSlide() {
    switch (currentSlide) {
      case 0:
        return (
          <div>
            <h3 className="font-sans font-medium text-fluid-h4 text-dark mb-2">
              Tell us about you
            </h3>
            <p className="font-sans text-fluid-main text-dark opacity-40 mb-6">
              Let&apos;s start with the basics.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClasses}>Full Name *</label>
                <input
                  type="text"
                  className={inputClasses}
                  placeholder="John Smith"
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                />
                {errors.name && <p className={errorClasses}>{errors.name}</p>}
              </div>
              <div>
                <label className={labelClasses}>Email Address *</label>
                <input
                  type="email"
                  className={inputClasses}
                  placeholder="john@company.com"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                />
                {errors.email && <p className={errorClasses}>{errors.email}</p>}
              </div>
              <div>
                <label className={labelClasses}>Phone Number</label>
                <input
                  type="tel"
                  className={inputClasses}
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                />
              </div>
              <div>
                <label className={labelClasses}>Business Name *</label>
                <input
                  type="text"
                  className={inputClasses}
                  placeholder="Acme Inc."
                  value={formData.company}
                  onChange={(e) => updateField("company", e.target.value)}
                />
                {errors.company && (
                  <p className={errorClasses}>{errors.company}</p>
                )}
              </div>
              <div className="sm:col-span-2">
                <label className={labelClasses}>Current Website URL</label>
                <input
                  type="url"
                  className={inputClasses}
                  placeholder="https://yoursite.com"
                  value={formData.website}
                  onChange={(e) => updateField("website", e.target.value)}
                />
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div>
            <h3 className="font-sans font-medium text-fluid-h4 text-dark mb-2">
              About your business
            </h3>
            <p className="font-sans text-fluid-main text-dark opacity-40 mb-6">
              Help us understand what you do.
            </p>
            <div className="space-y-4">
              <div>
                <label className={labelClasses}>
                  What type of business do you run? *
                </label>
                <select
                  className={selectClasses}
                  value={formData.businessType}
                  onChange={(e) => updateField("businessType", e.target.value)}
                >
                  <option value="">Select business type...</option>
                  {businessTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.businessType && (
                  <p className={errorClasses}>{errors.businessType}</p>
                )}
              </div>
              <div>
                <label className={labelClasses}>
                  Which plan interests you? *
                </label>
                <select
                  className={selectClasses}
                  value={formData.plan}
                  onChange={(e) => updateField("plan", e.target.value)}
                >
                  <option value="">Select a plan...</option>
                  {planInterests.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
                {errors.plan && (
                  <p className={errorClasses}>{errors.plan}</p>
                )}
              </div>
              <div>
                <label className={labelClasses}>
                  When do you want to go live?
                </label>
                <select
                  className={selectClasses}
                  value={formData.timeline}
                  onChange={(e) => updateField("timeline", e.target.value)}
                >
                  <option value="">Select timeline...</option>
                  {timelines.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div>
            <h3 className="font-sans font-medium text-fluid-h4 text-dark mb-2">
              Almost done
            </h3>
            <p className="font-sans text-fluid-main text-dark opacity-40 mb-6">
              Just a couple more things.
            </p>
            <div className="space-y-4">
              <div>
                <label className={labelClasses}>How did you find us?</label>
                <select
                  className={selectClasses}
                  value={formData.referral}
                  onChange={(e) => updateField("referral", e.target.value)}
                >
                  <option value="">Select...</option>
                  {referralSources.map((source) => (
                    <option key={source} value={source}>
                      {source}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClasses}>Anything else we should know?</label>
                <textarea
                  className={`${inputClasses} resize-none`}
                  rows={3}
                  placeholder="Additional context, questions, special requests..."
                  value={formData.notes}
                  onChange={(e) => updateField("notes", e.target.value)}
                />
              </div>
            </div>
            {errors.submit && (
              <p className="text-bg-red text-sm mt-4 font-sans">
                {errors.submit}
              </p>
            )}
          </div>
        );

      default:
        return null;
    }
  }

  const firstName = formData.name.split(" ")[0];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-dark/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative w-full max-w-3xl max-h-[85vh] bg-light rounded-lg border border-dark-faded overflow-hidden flex flex-col"
      >
        {/* Honeypot */}
        <input
          type="text"
          name="_gotcha"
          value={formData._gotcha}
          onChange={(e) => updateField("_gotcha", e.target.value)}
          style={{ display: "none" }}
          tabIndex={-1}
          autoComplete="off"
        />

        {isSuccess ? (
          /* Success Screen */
          <div className="flex-1 flex flex-col items-center justify-center px-8 py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-bg-green/30 flex items-center justify-center mb-6">
              <Check size={32} className="text-bg-green" />
            </div>
            <h2 className="font-sans font-medium text-fluid-h3 text-dark mb-3">
              Hey, {firstName}! Thank you.
            </h2>
            <p className="font-sans text-fluid-main text-dark opacity-60 mb-2 max-w-md">
              Someone from our team will reach out within 24 hours to schedule your strategy call.
            </p>
            <p className="font-sans text-fluid-small text-dark opacity-40 mb-8 max-w-md leading-relaxed">
              We&apos;ll walk through your business goals and show you exactly
              how we can help you grow online.
            </p>
            <button onClick={handleClose} className="btn">
              <span className="text-sm">Close</span>
              <span className="btn-arrow">
                <X size={14} />
              </span>
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center justify-between px-6 md:px-8 pt-6 pb-4">
              <ProgressIndicator current={currentSlide} />
              <button
                onClick={handleClose}
                aria-label="Close"
                className="p-1 text-dark opacity-40 hover:opacity-100 transition-opacity"
                style={{ transitionDuration: "0.2s" }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Slide Content */}
            <div className="flex-1 overflow-y-auto px-6 md:px-8 pb-4">
              <div ref={slideRef}>{renderSlide()}</div>
            </div>

            {/* Navigation Footer */}
            <div className="px-6 md:px-8 py-5 border-t border-dark-faded flex justify-between items-center">
              {currentSlide > 0 ? (
                <button
                  onClick={goBack}
                  className="flex items-center gap-2 font-sans text-fluid-main text-dark opacity-50 hover:opacity-100 transition-opacity"
                  style={{ transitionDuration: "0.2s" }}
                >
                  <ArrowLeft size={16} />
                  Back
                </button>
              ) : (
                <div />
              )}

              {currentSlide < TOTAL_SLIDES - 1 ? (
                <button
                  onClick={goNext}
                  className="btn-secondary flex items-center gap-2"
                >
                  Next
                  <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="btn-secondary flex items-center gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Submit"}
                  {!isSubmitting && <ArrowRight size={16} />}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
