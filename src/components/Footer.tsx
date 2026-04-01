"use client";

import Link from "next/link";
import { useContactForm } from "@/context/ContactFormContext";

const footerTags = [
  { label: "Website Design", color: "#d8e3fd" },
  { label: "Managed Hosting", color: "#fff1c6" },
  { label: "Local SEO", color: "#ffe5cd" },
  { label: "Mobile Responsive", color: "#d8e3fd" },
  { label: "Google Business Profile", color: "#d5ffcd" },
  { label: "Content Updates", color: "#e6d8fd" },
  { label: "Lead Generation", color: "#fdd8f4" },
  { label: "Analytics", color: "#fdd8d9" },
  { label: "SSL & Security", color: "#d1fffd" },
  { label: "No Contracts", color: "#fff1c6" },
];

export function Footer({ brandName }: { brandName: string }) {
  const { openModal } = useContactForm();

  return (
    <footer
      style={{
        background: "linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 50%, #FFCC80 100%)",
        color: "#0c0c0c",
      }}
    >
      {/* Big CTA section */}
      <div className="section-space-large">
        <div className="u-container text-center">
          <p className="font-mono text-fluid-small uppercase tracking-wider opacity-60 mb-6">
            Ready to get started?
          </p>
          <p className="font-sans font-medium text-fluid-h1 leading-[1.05] max-w-[16ch] mx-auto mb-8">
            Ready to turn your website into a conversion machine?
          </p>
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
          <p className="font-sans text-fluid-small opacity-40 mt-6">
            No setup fees. No contracts. Cancel anytime.
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t" style={{ borderColor: "rgba(0,0,0,0.15)" }}>
        <div className="u-container py-8">
          {/* Tag cloud */}
          <div className="flex flex-wrap gap-2 mb-8">
            {footerTags.map((tag) => (
              <span
                key={tag.label}
                className="font-mono text-xs md:text-xs px-4 py-2 md:px-3 md:py-1.5 rounded-full"
                style={{ backgroundColor: tag.color, color: "#0c0c0c" }}
              >
                {tag.label}
              </span>
            ))}
          </div>

          {/* Footer links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div>
              <p className="font-mono text-xs uppercase tracking-wider opacity-40 mb-3">
                Services
              </p>
              <ul className="space-y-2">
                <li>
                  <a href="#services" className="font-sans text-sm opacity-60 hover:opacity-100 transition-opacity" style={{ transitionDuration: "0.2s" }}>
                    Web Design
                  </a>
                </li>
                <li>
                  <a href="#services" className="font-sans text-sm opacity-60 hover:opacity-100 transition-opacity" style={{ transitionDuration: "0.2s" }}>
                    Web Development
                  </a>
                </li>
                <li>
                  <a href="#services" className="font-sans text-sm opacity-60 hover:opacity-100 transition-opacity" style={{ transitionDuration: "0.2s" }}>
                    SEO
                  </a>
                </li>
                <li>
                  <a href="#services" className="font-sans text-sm opacity-60 hover:opacity-100 transition-opacity" style={{ transitionDuration: "0.2s" }}>
                    Google Ads
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-wider opacity-40 mb-3">
                Company
              </p>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="font-sans text-sm opacity-60 hover:opacity-100 transition-opacity" style={{ transitionDuration: "0.2s" }}>
                    About Us
                  </Link>
                </li>
                <li>
                  <a href="#portfolio" className="font-sans text-sm opacity-60 hover:opacity-100 transition-opacity" style={{ transitionDuration: "0.2s" }}>
                    Our Work
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="font-sans text-sm opacity-60 hover:opacity-100 transition-opacity" style={{ transitionDuration: "0.2s" }}>
                    Pricing
                  </a>
                </li>
                <li>
                  <Link href="/blog" className="font-sans text-sm opacity-60 hover:opacity-100 transition-opacity" style={{ transitionDuration: "0.2s" }}>
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-wider opacity-40 mb-3">
                Industries
              </p>
              <ul className="space-y-2">
                {[
                  { label: "Roofing", href: "/industries/roofing" },
                  { label: "HVAC", href: "/industries/hvac" },
                  { label: "Plumbing", href: "/industries/plumbing" },
                  { label: "Electrical", href: "/industries/electrical" },
                  { label: "Landscaping", href: "/industries/landscaping" },
                  { label: "Painting", href: "/industries/painting" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="font-sans text-sm opacity-60 hover:opacity-100 transition-opacity" style={{ transitionDuration: "0.2s" }}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-wider opacity-40 mb-3">
                Resources
              </p>
              <ul className="space-y-2">
                <li>
                  <Link href="/faq" className="font-sans text-sm opacity-60 hover:opacity-100 transition-opacity" style={{ transitionDuration: "0.2s" }}>
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/how-it-works" className="font-sans text-sm opacity-60 hover:opacity-100 transition-opacity" style={{ transitionDuration: "0.2s" }}>
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="/tools/seo-roi-calculator" className="font-sans text-sm opacity-60 hover:opacity-100 transition-opacity" style={{ transitionDuration: "0.2s" }}>
                    Website ROI Calculator
                  </Link>
                </li>
                <li>
                  <Link href="/compare/buildlocal-vs-squarespace" className="font-sans text-sm opacity-60 hover:opacity-100 transition-opacity" style={{ transitionDuration: "0.2s" }}>
                    BuildLocal vs Squarespace
                  </Link>
                </li>
                <li>
                  <Link href="/compare/buildlocal-vs-wix" className="font-sans text-sm opacity-60 hover:opacity-100 transition-opacity" style={{ transitionDuration: "0.2s" }}>
                    BuildLocal vs Wix
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-wider opacity-40 mb-3">
                Get In Touch
              </p>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => openModal()} className="font-sans text-sm opacity-60 hover:opacity-100 transition-opacity text-left" style={{ transitionDuration: "0.2s" }}>
                    Contact Us
                  </button>
                </li>
                <li>
                  <button onClick={() => openModal()} className="font-sans text-sm opacity-60 hover:opacity-100 transition-opacity text-left" style={{ transitionDuration: "0.2s" }}>
                    Start a Project
                  </button>
                </li>
                <li>
                  <a href="mailto:hello@buildlocal.agency" className="font-sans text-sm opacity-60 hover:opacity-100 transition-opacity" style={{ transitionDuration: "0.2s" }}>
                    hello@buildlocal.agency
                  </a>
                </li>
              </ul>
              <div className="mt-4 space-y-1">
                <p className="font-sans text-xs opacity-40">Monday - Friday, 8 a.m. - 5 p.m. (PST)</p>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <span className="font-sans font-medium text-base flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo.svg"
                alt={brandName}
                className="h-5 w-auto"
              />
              {brandName}
            </span>
            <p className="font-sans text-fluid-small opacity-40">
              &copy; {new Date().getFullYear()} BuildLocal. All rights reserved.
            </p>
          </div>
        </div>
      </div>
      {/* Spacer for sticky mobile CTA bar */}
      <div className="h-16 md:hidden" />
    </footer>
  );
}
