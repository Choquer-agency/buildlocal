"use client";

import { useRef, useState, useMemo } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-register";
import { useContactForm } from "@/context/ContactFormContext";

interface CostCalculatorProps {
  slug: string;
  region: string;
  locality: string;
}

export function CostCalculator({ region }: CostCalculatorProps) {
  const { openModal } = useContactForm();
  const ref = useRef<HTMLElement>(null);

  const [monthlyTraffic, setMonthlyTraffic] = useState(1000);
  const [conversionRate, setConversionRate] = useState(3);
  const [customerValue, setCustomerValue] = useState(5000);
  const [closeRate, setCloseRate] = useState(20);

  const results = useMemo(() => {
    const monthlyLeads = Math.round(monthlyTraffic * (conversionRate / 100));
    const monthlyCustomers = Math.round(monthlyLeads * (closeRate / 100));
    const monthlyRevenue = monthlyCustomers * customerValue;
    const annualRevenue = monthlyRevenue * 12;
    return { monthlyLeads, monthlyCustomers, monthlyRevenue, annualRevenue };
  }, [monthlyTraffic, conversionRate, customerValue, closeRate]);

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(n);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".calc-heading", {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 75%", once: true },
        });
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="section-space-large" style={{ backgroundColor: "#FFF9F0" }}>
      <div className="u-container max-w-4xl">
        <div className="calc-heading text-center mb-12">
          <p className="eyebrow text-brand mb-4">SEO ROI Calculator</p>
          <h2 className="font-sans font-medium text-fluid-h2 leading-[1.1] text-dark mb-4">
            What could SEO be worth to your {region} business?
          </h2>
          <p className="font-sans text-fluid-main text-dark opacity-50 leading-relaxed max-w-[55ch] mx-auto">
            Adjust the sliders to see how organic traffic translates into revenue for your business.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Inputs */}
          <div className="space-y-8">
            <div>
              <label className="font-sans font-medium text-sm text-dark mb-2 block">
                Target Monthly Organic Traffic
              </label>
              <input
                type="range"
                min={500}
                max={50000}
                step={500}
                value={monthlyTraffic}
                onChange={(e) => setMonthlyTraffic(Number(e.target.value))}
                className="w-full accent-brand"
              />
              <p className="font-mono text-sm text-brand mt-1">{monthlyTraffic.toLocaleString()} visitors/month</p>
            </div>

            <div>
              <label className="font-sans font-medium text-sm text-dark mb-2 block">
                Website Conversion Rate
              </label>
              <input
                type="range"
                min={1}
                max={10}
                step={0.5}
                value={conversionRate}
                onChange={(e) => setConversionRate(Number(e.target.value))}
                className="w-full accent-brand"
              />
              <p className="font-mono text-sm text-brand mt-1">{conversionRate}% of visitors become leads</p>
            </div>

            <div>
              <label className="font-sans font-medium text-sm text-dark mb-2 block">
                Average Customer Value
              </label>
              <input
                type="range"
                min={500}
                max={100000}
                step={500}
                value={customerValue}
                onChange={(e) => setCustomerValue(Number(e.target.value))}
                className="w-full accent-brand"
              />
              <p className="font-mono text-sm text-brand mt-1">{fmt(customerValue)} per customer</p>
            </div>

            <div>
              <label className="font-sans font-medium text-sm text-dark mb-2 block">
                Lead-to-Customer Close Rate
              </label>
              <input
                type="range"
                min={5}
                max={50}
                step={5}
                value={closeRate}
                onChange={(e) => setCloseRate(Number(e.target.value))}
                className="w-full accent-brand"
              />
              <p className="font-mono text-sm text-brand mt-1">{closeRate}% of leads become customers</p>
            </div>
          </div>

          {/* Results */}
          <div className="bg-dark rounded-lg p-8 flex flex-col justify-center">
            <p className="font-mono text-xs uppercase tracking-wider text-white opacity-40 mb-6">
              Projected SEO Results
            </p>

            <div className="space-y-6">
              <div>
                <p className="font-sans text-sm text-white opacity-50">Monthly Organic Leads</p>
                <p className="font-display text-4xl text-brand">{results.monthlyLeads}</p>
              </div>
              <div>
                <p className="font-sans text-sm text-white opacity-50">Monthly New Customers</p>
                <p className="font-display text-4xl text-white">{results.monthlyCustomers}</p>
              </div>
              <div>
                <p className="font-sans text-sm text-white opacity-50">Monthly Revenue from SEO</p>
                <p className="font-display text-4xl text-[#C4EF7A]">{fmt(results.monthlyRevenue)}</p>
              </div>
              <div className="pt-4 border-t border-white/10">
                <p className="font-sans text-sm text-white opacity-50">Annual Revenue Potential</p>
                <p className="font-display text-5xl text-[#C4EF7A]">{fmt(results.annualRevenue)}</p>
              </div>
            </div>

            <button
              onClick={() => openModal()}
              className="mt-8 inline-flex items-center justify-center gap-3 bg-brand text-dark rounded-sm px-8 py-4 font-sans font-medium text-fluid-main transition-all hover:brightness-110 w-full"
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
    </section>
  );
}
