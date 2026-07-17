"use client";

import { useEffect, useState } from "react";
import { X, ArrowRight, ArrowLeft, Check, Gift } from "lucide-react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { pricingTiers } from "@/content/shared";

const ORANGE = "#ff9500";
const CAL_LINK = "brycechoquer/buildlocal";
const CALCOM_URL = process.env.NEXT_PUBLIC_CALCOM_URL || "https://cal.com/brycechoquer/buildlocal";

export function LeadModal({
  open, onClose, slug, businessName,
}: { open: boolean; onClose: () => void; slug: string; businessName: string }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [pkg, setPkg] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: "buildlocal" });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  if (!open) return null;

  const canStep1 = form.name.trim() && form.phone.trim();

  async function submitLead(selectedPkg: string) {
    if (sent) return;
    setSent(true);
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, businessName, ...form, package: selectedPkg }),
      });
    } catch { /* ignore */ }
  }

  const inputCls = "w-full rounded-xl border border-dark/15 px-4 py-3.5 text-fluid-main text-dark placeholder:text-dark/35 focus:outline-none focus:ring-2 focus:ring-[#ff9500]";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center sm:p-4 overflow-y-auto"
      style={{ background: "rgba(255,149,0,0.82)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        className={`relative w-full bg-white shadow-2xl font-sans overflow-y-auto min-h-[100svh] sm:min-h-0 sm:max-h-[94vh] sm:rounded-2xl ${step === 4 ? "sm:max-w-3xl" : "sm:max-w-xl"}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* progress bar */}
        <div className="h-1.5 bg-dark/5">
          <div className="h-full transition-all duration-300" style={{ width: `${(step / 4) * 100}%`, background: ORANGE }} />
        </div>

        <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-dark/5 z-10" aria-label="Close">
          <X size={20} className="text-dark/50" />
        </button>

        <div className="p-8 sm:p-10">
          {/* STEP 1 — contact */}
          {step === 1 && (
            <div>
              <p className="font-mono text-xs uppercase tracking-wider mb-3" style={{ color: ORANGE }}>Step 1 of 4</p>
              <h2 className="font-sans font-medium text-fluid-h3 text-dark mb-2">Let&apos;s get you started</h2>
              <p className="text-dark/55 mb-7">Quick intro and we&apos;ll take it from there — no commitment.</p>
              <div className="grid gap-3">
                <input autoFocus placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} />
                <input placeholder="Phone number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputCls} />
                <input placeholder="Email (optional)" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls} />
              </div>
              <button disabled={!canStep1} onClick={() => setStep(2)}
                className="mt-7 w-full inline-flex items-center justify-center gap-2 rounded-full py-3.5 font-semibold text-white disabled:opacity-40 transition-opacity"
                style={{ background: ORANGE }}>
                Continue <ArrowRight size={17} />
              </button>
            </div>
          )}

          {/* STEP 2 — explainer */}
          {step === 2 && (
            <div className="text-center">
              <span className="inline-grid place-items-center rounded-full mx-auto mb-5" style={{ width: 60, height: 60, background: "#fff4e6", color: ORANGE }}>
                <Gift size={28} />
              </span>
              <h2 className="font-sans font-medium text-fluid-h3 text-dark mb-3">Your website is completely free</h2>
              <p className="text-dark/65 text-fluid-main leading-relaxed max-w-[42ch] mx-auto mb-2">
                The site we built for {businessName} is <strong>100% free</strong> when you&apos;re on one of our marketing packages.
              </p>
              <p className="text-dark/65 text-fluid-main leading-relaxed max-w-[42ch] mx-auto mb-8">
                No setup fees. <strong>No monthly commitment</strong> — cancel anytime. We go live and start helping you grow online.
              </p>
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3.5 font-semibold text-dark border border-dark/15">
                  <ArrowLeft size={16} /> Back
                </button>
                <button onClick={() => setStep(3)} className="flex-1 inline-flex items-center justify-center gap-2 rounded-full py-3.5 font-semibold text-white" style={{ background: ORANGE }}>
                  See the packages <ArrowRight size={17} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 — choose package */}
          {step === 3 && (
            <div>
              <p className="font-mono text-xs uppercase tracking-wider mb-3" style={{ color: ORANGE }}>Step 3 of 4</p>
              <h2 className="font-sans font-medium text-fluid-h3 text-dark mb-1">Pick the plan that fits</h2>
              <p className="text-dark/55 mb-5">Website included free with every plan. Change or cancel anytime.</p>
              <div className="grid gap-2.5 max-h-[42vh] overflow-y-auto pr-1 -mr-1">
                {pricingTiers.map((t) => {
                  const selected = pkg === t.name;
                  const tagline = t.description.split(".")[0];
                  return (
                    <button key={t.name} onClick={() => setPkg(t.name)}
                      className="text-left rounded-xl border-2 px-4 py-3.5 transition-colors w-full"
                      style={{ borderColor: selected ? ORANGE : "rgba(0,0,0,0.1)", background: selected ? "#fff8ef" : "#fff" }}>
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-dark">{t.name}</span>
                          {t.popular && <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full" style={{ background: ORANGE, color: "#fff" }}>Popular</span>}
                        </div>
                        <span className="font-semibold text-dark whitespace-nowrap">{t.priceRange}</span>
                      </div>
                      <p className="text-sm font-medium text-dark/70 mt-1">{tagline}.</p>
                      <ul className="mt-2.5 grid gap-1.5">
                        {t.includes.slice(0, 4).map((inc) => (
                          <li key={inc} className="flex items-start gap-2 text-xs text-dark/55 leading-snug">
                            <Check size={13} style={{ color: ORANGE }} className="mt-0.5 flex-shrink-0" />
                            <span>{inc.replace(/^\+\s*/, "")}</span>
                          </li>
                        ))}
                      </ul>
                    </button>
                  );
                })}
              </div>
              <div className="flex gap-3 mt-5">
                <button onClick={() => setStep(2)} className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3.5 font-semibold text-dark border border-dark/15">
                  <ArrowLeft size={16} /> Back
                </button>
                <button disabled={!pkg} onClick={() => { submitLead(pkg!); setStep(4); }}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-full py-3.5 font-semibold text-white disabled:opacity-40" style={{ background: ORANGE }}>
                  Continue <ArrowRight size={17} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4 — book a call (inline cal.com) */}
          {step === 4 && (
            <div className="text-center">
              <h2 className="font-sans font-medium text-fluid-h4 text-dark mb-1">You&apos;re in, {form.name.split(" ")[0] || "there"}! 🎉</h2>
              <p className="text-dark/60 text-sm leading-relaxed max-w-[46ch] mx-auto mb-4">
                Last step — grab a time with Bryce and we&apos;ll get {businessName} live{pkg ? ` on the ${pkg} plan` : ""}.
              </p>
              <div className="rounded-xl overflow-hidden border border-dark/10 text-left" style={{ height: "min(58vh, 520px)" }}>
                <Cal
                  namespace="buildlocal"
                  calLink={CAL_LINK}
                  style={{ width: "100%", height: "100%", overflow: "scroll" }}
                  config={{ layout: "month_view", useSlotsViewOnSmallScreen: "true" }}
                />
              </div>
              <p className="text-xs text-dark/40 mt-3">
                Prefer to talk now? Call (480) 680-9076 · or <a href={CALCOM_URL} target="_blank" rel="noreferrer" className="underline">open the calendar ↗</a>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
