"use client";

import { useState } from "react";
import { ArrowRight, Phone } from "lucide-react";
import { LeadModal } from "./LeadModal";

// Appears on EVERY demo site: tells the owner who built it + how to get it.
const BUILDLOCAL_URL = "https://buildlocal.agency";
const BUILDLOCAL_PHONE = "(480) 680-9076";

export function BuildLocalPromo({ slug, businessName }: { slug: string; businessName: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
    <section className="font-sans" style={{ background: "#ff9500" }}>
      <div className="u-container py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-7 text-center md:text-left">
          {/* Left: DEMO WEBSITE BUILT BY → clickable logo + name */}
          <a href={BUILDLOCAL_URL} target="_blank" rel="noreferrer" className="text-white group">
            <p className="text-xs uppercase tracking-[0.2em] opacity-80 mb-2">Demo website built by</p>
            <div className="flex items-center justify-center md:justify-start gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logo.svg" alt="BuildLocal" className="h-9 w-auto brightness-0 invert" />
              <span className="font-semibold text-2xl group-hover:opacity-90 transition-opacity">BuildLocal.Agency</span>
            </div>
          </a>

          {/* Right: pitch text BESIDE a short CTA, phone below */}
          <div className="flex flex-col items-center md:items-end gap-3">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <p className="text-white font-medium text-fluid-main max-w-[30ch] text-center sm:text-right leading-snug">
                Get a free website — included with our marketing services
              </p>
              <button onClick={() => setOpen(true)}
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 font-semibold text-sm text-dark hover:bg-dark hover:text-white transition-colors whitespace-nowrap">
                Schedule a Call <ArrowRight size={16} />
              </button>
            </div>
            <a href={`tel:+1${BUILDLOCAL_PHONE.replace(/[^\d]/g, "")}`} className="inline-flex items-center gap-1.5 font-semibold text-sm text-white">
              <Phone size={15} /> {BUILDLOCAL_PHONE}
            </a>
          </div>
        </div>
      </div>
    </section>
    <LeadModal open={open} onClose={() => setOpen(false)} slug={slug} businessName={businessName} />
    </>
  );
}
