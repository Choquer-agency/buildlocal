"use client";

import { useState, useEffect } from "react";
import { Phone, Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import { Theme } from "@/lib/themes";
import { telHref, areaSlug } from "@/lib/schema-business";

interface BizNavProps {
  slug: string;
  name: string;
  logo?: string;
  logoBlend?: string;
  logoText?: string;
  phone: string;
  theme: Theme;
  dark?: boolean;
  services: { name: string; slug: string }[];
  areas: string[];
}

export function BizNav({ slug, name, logo, logoBlend, logoText, phone, theme, dark, services, areas }: BizNavProps) {
  const [open, setOpen] = useState(false);
  const base = `/p/${slug}`;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const serviceItems = services.map((s) => ({ label: s.name, href: `${base}/services/${s.slug}` }));
  const areaItems = areas.map((a) => ({ label: a, href: `${base}/areas/${areaSlug(a)}` }));

  // Dark chrome (for white logos): near-black pill + light text. Light is the default.
  const borderC = dark ? "border-white/10" : "border-dark/10";
  const linkC = dark
    ? "text-white/75 hover:text-white hover:bg-white/10"
    : "text-dark/70 hover:text-dark hover:bg-dark/[0.05]";
  const shell = open
    ? `rounded-3xl ${dark ? "bg-[#0d0d0d]" : "bg-white"}`
    : `rounded-full backdrop-blur-lg ${dark ? "bg-[#0d0d0d]/85" : "bg-white/80"}`;

  return (
    <header className="font-sans fixed top-4 left-0 right-0 z-50 px-4">
      <div className={`mx-auto max-w-6xl border ${borderC} shadow-lg transition-[border-radius] ${shell}`}>
        <nav className="flex items-center justify-between gap-3 pl-5 pr-2 py-2">
          {/* Brand */}
          <a href={base} className="flex items-center gap-2.5 min-w-0">
            {logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logo} alt={name} className="h-11 w-auto max-w-[190px] object-contain -my-2" style={{ mixBlendMode: (logoBlend as React.CSSProperties["mixBlendMode"]) || undefined }} />
            ) : (
              <>
                <span className="flex-shrink-0 grid place-items-center rounded-md font-semibold text-xs" style={{ width: 32, height: 32, background: theme.accent, color: theme.onAccent }}>
                  {logoText || name.slice(0, 2).toUpperCase()}
                </span>
                <span className="font-semibold text-base tracking-tight text-dark truncate max-w-[180px]">{name}</span>
              </>
            )}
          </a>

          {/* Center links */}
          <div className="hidden lg:flex items-center gap-0.5">
            <NavDropdown label="Services" allHref={`${base}/services`} items={serviceItems} dark={dark} />
            <NavDropdown label="Areas" allHref={`${base}/areas`} items={areaItems} dark={dark} />
            <a href={`${base}/reviews`} className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${linkC}`}>Reviews</a>
            <a href={`${base}/about`} className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${linkC}`}>About</a>
            <a href={`${base}/contact`} className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${linkC}`}>Contact</a>
          </div>

          {/* Right: phone + bright CTA */}
          <div className="flex items-center gap-2">
            <a href={telHref(phone)} className={`hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold px-2 ${dark ? "text-white" : "text-dark"}`}>
              <Phone size={14} style={{ color: theme.accent }} /> {phone}
            </a>
            <a href={`${base}/contact`} className="hidden sm:inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 font-semibold text-sm shadow-sm hover:opacity-90 transition-opacity" style={{ background: theme.accent, color: theme.onAccent }}>
              Free Quote <ArrowRight size={15} />
            </a>
            <button onClick={() => setOpen(!open)} className={`lg:hidden p-2 rounded-full border ${dark ? "border-white/15 text-white" : "border-dark/10"}`} aria-label="Toggle menu">
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
            {/* mobile CTA — right of the menu button */}
            <a href={`${base}/contact`} className="sm:hidden inline-flex items-center gap-1.5 rounded-full px-4 py-2 font-semibold text-sm" style={{ background: theme.accent, color: theme.onAccent }}>
              Quote <ArrowRight size={14} />
            </a>
          </div>
        </nav>

        {/* Mobile menu */}
        {open && (
          <div className={`lg:hidden border-t px-3 py-3 flex flex-col gap-1 max-h-[70vh] overflow-y-auto ${dark ? "border-white/10" : "border-dark/8"}`}>
            <MobileGroup label="Services" allHref={`${base}/services`} items={serviceItems} onNav={() => setOpen(false)} dark={dark} />
            <MobileGroup label="Areas" allHref={`${base}/areas`} items={areaItems} onNav={() => setOpen(false)} dark={dark} />
            {[["Reviews", "reviews"], ["About", "about"], ["Contact", "contact"]].map(([label, path]) => (
              <a key={path} href={`${base}/${path}`} onClick={() => setOpen(false)} className={`rounded-lg px-3 py-2.5 text-base font-medium ${dark ? "text-white hover:bg-white/10" : "text-dark hover:bg-dark/[0.04]"}`}>{label}</a>
            ))}
            <a href={telHref(phone)} className={`rounded-lg px-3 py-2.5 text-base font-semibold flex items-center gap-2 ${dark ? "text-white" : "text-dark"}`}>
              <Phone size={16} style={{ color: theme.accent }} /> {phone}
            </a>
            <a href={`${base}/contact`} className="mt-1 inline-flex items-center justify-center gap-1.5 rounded-full py-3 font-semibold text-sm" style={{ background: theme.accent, color: theme.onAccent }}>
              Get a Free Quote <ArrowRight size={15} />
            </a>
          </div>
        )}
      </div>
    </header>
  );
}

function NavDropdown({ label, allHref, items, dark }: { label: string; allHref: string; items: { label: string; href: string }[]; dark?: boolean }) {
  const trigger = dark
    ? "text-white/75 hover:text-white hover:bg-white/10"
    : "text-dark/70 hover:text-dark hover:bg-dark/[0.05]";
  return (
    <div className="relative group">
      <a href={allHref} className={`inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${trigger}`}>
        {label} <ChevronDown size={13} className="mt-0.5 opacity-60" />
      </a>
      <div className="absolute top-full left-0 pt-2 opacity-0 invisible translate-y-1 transition-all duration-150 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0">
        <div className={`min-w-[240px] rounded-2xl border shadow-xl p-2 ${dark ? "border-white/10 bg-[#141414]" : "border-dark/10 bg-white"}`}>
          {items.map((it) => (
            <a key={it.href} href={it.href} className={`block rounded-lg px-3 py-2 text-sm transition-colors ${dark ? "text-white/75 hover:bg-white/10 hover:text-white" : "text-dark/75 hover:bg-dark/[0.04] hover:text-dark"}`}>{it.label}</a>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileGroup({ label, allHref, items, onNav, dark }: { label: string; allHref: string; items: { label: string; href: string }[]; onNav: () => void; dark?: boolean }) {
  return (
    <div className="py-1">
      <a href={allHref} onClick={onNav} className={`block rounded-lg px-3 py-2.5 text-base font-semibold ${dark ? "text-white hover:bg-white/10" : "text-dark hover:bg-dark/[0.04]"}`}>{label}</a>
      <div className="pl-3 grid">
        {items.map((it) => (
          <a key={it.href} href={it.href} onClick={onNav} className={`rounded-lg px-3 py-2 text-sm ${dark ? "text-white/65 hover:bg-white/10" : "text-dark/65 hover:bg-dark/[0.04]"}`}>{it.label}</a>
        ))}
      </div>
    </div>
  );
}
