"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { clsx } from "clsx";
import { useContactForm } from "@/context/ContactFormContext";


const navLinks = [
  { label: "Industries", href: "/industries/roofing", isPage: true, isDropdown: true },
  { label: "Our Work", href: "/portfolio", isPage: true },
  { label: "Pricing", href: "/pricing", isPage: true },
  { label: "About", href: "/about", isPage: true },
  { label: "Blog", href: "/blog", isPage: true },
];

const industryDropdownLinks = [
  { label: "Roofing", href: "/industries/roofing" },
  { label: "HVAC", href: "/industries/hvac" },
  { label: "Plumbing", href: "/industries/plumbing" },
  { label: "Electrical", href: "/industries/electrical" },
  { label: "Foundation Repair", href: "/industries/foundation-repair" },
  { label: "Landscaping", href: "/industries/landscaping" },
  { label: "Painting", href: "/industries/painting" },
  { label: "Concrete", href: "/industries/concrete-hardscaping" },
  { label: "Fencing", href: "/industries/fencing" },
  { label: "General Contracting", href: "/industries/general-contracting" },
];

export function Nav({ brandName }: { brandName: string }) {
  const { openModal } = useContactForm();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 28);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollTo(href: string) {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <nav
        className={clsx(
          "fixed top-0 left-0 right-0 z-50 transition-all",
          scrolled ? "nav-scrolled" : ""
        )}
        style={{ transitionDuration: "var(--duration-half)" }}
      >
        <div
          className={clsx(
            "u-container flex items-center justify-between transition-all",
            scrolled ? "py-2 mx-6 mt-2 rounded-md" : "py-5"
          )}
          style={{
            transitionDuration: "var(--duration-half)",
            ...(scrolled
              ? { background: "rgba(255,255,255,0.8)", backdropFilter: "blur(16px)" }
              : {}),
          }}
        >
          {/* Logo */}
          <a
            href="/"
            className="font-sans font-medium text-base tracking-tight flex items-center gap-2"
            style={{ color: "inherit" }}
          >
            <img
              src="/images/logo.svg"
              alt={brandName}
              className="h-5 w-auto"
            />
            {brandName}
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) =>
              "isDropdown" in link && link.isDropdown ? (
                <div key={link.href} className="relative group">
                  <a
                    href={link.href}
                    className="text-fluid-main font-sans opacity-60 hover:opacity-100 transition-opacity flex items-center gap-1"
                    style={{ transitionDuration: "0.35s" }}
                  >
                    {link.label}
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="mt-0.5">
                      <path d="M2 4L5 7L8 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                  <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all" style={{ transitionDuration: "0.2s" }}>
                    <div className="bg-white rounded-lg shadow-xl border border-dark/8 py-2 min-w-[220px]">
                      {industryDropdownLinks.map((item) => (
                        <a
                          key={item.href}
                          href={item.href}
                          className="block px-4 py-2 font-sans text-sm text-dark opacity-70 hover:opacity-100 hover:bg-dark/[0.03] transition-all"
                        >
                          {item.label}
                        </a>
                      ))}
                      <div className="border-t border-dark/8 mt-1 pt-1">
                        <a
                          href="/industries/trades-home-services"
                          className="block px-4 py-2 font-sans text-sm text-brand font-medium hover:bg-dark/[0.03] transition-all"
                        >
                          View All Industries →
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-fluid-main font-sans opacity-60 hover:opacity-100 transition-opacity"
                  style={{ transitionDuration: "0.35s" }}
                >
                  {link.label}
                </a>
              )
            )}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <button
              onClick={() => openModal()}
              data-track="nav-cta"
              data-track-label="Book a Free Strategy Call"
              className="btn"
              style={{
                background: '#ff9500',
                color: '#fff',
                borderColor: '#ff9500',
              }}
            >
              <span className="text-sm">Book a Free Strategy Call</span>
              <span
                className="btn-arrow"
                style={{ background: 'rgba(255,255,255,0.2)' }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 13L13 1M13 1H3M13 1V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-track="nav-hamburger"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={clsx(
          "fixed inset-0 z-40 bg-light flex flex-col items-center justify-center gap-8 md:hidden transition-opacity",
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        style={{ transitionDuration: "var(--duration-half)" }}
      >
        {navLinks.map((link) =>
          "isPage" in link && link.isPage ? (
            <a
              key={link.href}
              href={link.href}
              className="text-fluid-h3 font-sans font-medium text-dark"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ) : (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-fluid-h3 font-sans font-medium text-dark"
            >
              {link.label}
            </button>
          )
        )}
        <button
          onClick={() => { setMobileOpen(false); openModal(); }}
          data-track="nav-mobile-cta"
          data-track-label="Book a Free Strategy Call"
          className="btn-secondary text-base"
        >
          Book a Free Strategy Call
        </button>
      </div>
    </>
  );
}
