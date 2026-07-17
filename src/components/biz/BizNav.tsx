"use client";

import { useState } from "react";
import { Phone, Menu, X, ArrowRight, ChevronDown, ChevronRight } from "lucide-react";
import { Theme } from "@/lib/themes";
import { ServiceMenuItem } from "@/content/businesses";
import { telHref, areaSlug } from "@/lib/schema-business";

/** A nav menu entry — a link, a header with children, or both. */
type NavItem = { label: string; href?: string; children?: NavItem[] };

interface BizNavProps {
  slug: string;
  name: string;
  logo?: string;
  logoBlend?: string;
  logoScale?: number;
  logoText?: string;
  logoWordmark?: string;
  logoBadge?: boolean;
  phone: string;
  theme: Theme;
  dark?: boolean;
  /** Paint the nav pill this hex (white text + contrasting CTA). For logos with both white and dark parts. */
  navBg?: string;
  services: { name: string; slug: string }[];
  /** Optional grouped Services menu (sub-services). Falls back to flat `services`. */
  serviceMenu?: ServiceMenuItem[];
  /** Hide the Services dropdown entirely (portfolio firms with no services menu). */
  hideServices?: boolean;
  areas: string[];
}

export function BizNav({ slug, name, logo, logoBlend, logoScale, logoText, logoWordmark, logoBadge, phone, theme, dark, navBg, services, serviceMenu, hideServices, areas }: BizNavProps) {
  const [open, setOpen] = useState(false);
  const base = `/p/${slug}`;

  // Grouped menu when provided (mirrors the business's real site IA), else flat.
  const buildMenu = (items: ServiceMenuItem[]): NavItem[] =>
    items.map((it) => ({
      label: it.label,
      href: it.slug ? `${base}/services/${it.slug}` : undefined,
      children: it.children ? buildMenu(it.children) : undefined,
    }));
  const serviceItems: NavItem[] = serviceMenu?.length
    ? buildMenu(serviceMenu)
    : services.map((s) => ({ label: s.name, href: `${base}/services/${s.slug}` }));
  const areaItems: NavItem[] = areas.map((a) => ({ label: a, href: `${base}/areas/${areaSlug(a)}` }));

  // Dark chrome (for white logos): near-black pill + light text. Light is the default.
  // A brand-colored pill (navBg) uses the same light-on-dark text treatment, but the pill
  // background comes from the hex via inline style instead of a bg class.
  const chrome = !!navBg || dark; // light text + light borders on a dark/colored pill
  const borderC = chrome ? "border-white/10" : "border-dark/10";
  const linkC = chrome
    ? "text-white/75 hover:text-white hover:bg-white/10"
    : "text-dark/70 hover:text-dark hover:bg-dark/[0.05]";
  const shellShape = open ? "rounded-3xl" : "rounded-full backdrop-blur-lg";
  const shellBg = navBg
    ? "" // background set via inline style below
    : open
    ? dark ? "bg-[#0d0d0d]" : "bg-white"
    : dark ? "bg-[#0d0d0d]/85" : "bg-white/80";
  const shell = `${shellShape} ${shellBg}`;
  // CTA buttons: on a brand-colored pill the accent would blend in, so flip to a white chip.
  const ctaStyle = navBg
    ? { background: "#fff", color: navBg }
    : { background: theme.ctaBg ?? theme.accent, color: theme.ctaFg ?? theme.onAccent };

  return (
    <header className="font-sans fixed top-4 left-0 right-0 z-50 px-4">
      <div className={`mx-auto max-w-6xl border ${borderC} shadow-lg transition-[border-radius] ${shell}`} style={navBg ? { backgroundColor: navBg } : undefined}>
        <nav className="flex items-center justify-between gap-3 pl-5 pr-2 py-2">
          {/* Brand */}
          <a href={base} className="flex items-center gap-2.5 min-w-0">
            {logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logo} alt={name} className="h-11 w-auto max-w-[190px] object-contain -my-2" style={{ mixBlendMode: (logoBlend as React.CSSProperties["mixBlendMode"]) || undefined, ...(logoScale ? { height: `${2.75 * logoScale}rem`, maxWidth: `${190 * logoScale}px` } : {}) }} />
            ) : (
              <>
                {logoBadge !== false && (
                  <span className="flex-shrink-0 grid place-items-center rounded-md font-semibold text-xs" style={{ width: 32, height: 32, background: theme.accent, color: theme.onAccent }}>
                    {logoText || name.slice(0, 2).toUpperCase()}
                  </span>
                )}
                <span className={`font-semibold tracking-tight truncate ${chrome ? "text-white" : "text-dark"} ${logoBadge === false ? "text-sm max-w-[300px]" : "text-base max-w-[180px]"}`}>{logoWordmark || name}</span>
              </>
            )}
          </a>

          {/* Center links */}
          <div className="hidden lg:flex items-center gap-0.5">
            {!hideServices && <NavDropdown label="Services" allHref={`${base}/services`} items={serviceItems} dark={chrome} />}
            <NavDropdown label="Areas" allHref={`${base}/areas`} items={areaItems} dark={chrome} />
            <a href={`${base}/reviews`} className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${linkC}`}>Reviews</a>
            <a href={`${base}/about`} className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${linkC}`}>About</a>
            <a href={`${base}/contact`} className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${linkC}`}>Contact</a>
          </div>

          {/* Right: phone + bright CTA */}
          <div className="flex items-center gap-2">
            <a href={telHref(phone)} className={`hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold px-2 ${chrome ? "text-white" : "text-dark"}`}>
              <Phone size={14} style={{ color: navBg ? "#fff" : dark ? theme.accent : (theme.accentOnWhite ?? theme.accent) }} /> {phone}
            </a>
            <a href={`${base}/contact`} className="hidden sm:inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 font-semibold text-sm shadow-sm hover:opacity-90 transition-opacity" style={ctaStyle}>
              Free Quote <ArrowRight size={15} />
            </a>
            <button onClick={() => setOpen(!open)} className={`lg:hidden p-2 rounded-full border ${chrome ? "border-white/15 text-white" : "border-dark/10"}`} aria-label="Toggle menu">
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
            {/* mobile CTA — right of the menu button */}
            <a href={`${base}/contact`} className="sm:hidden inline-flex items-center gap-1.5 rounded-full px-4 py-2 font-semibold text-sm" style={ctaStyle}>
              Quote <ArrowRight size={14} />
            </a>
          </div>
        </nav>

        {/* Mobile menu */}
        {open && (
          <div className={`lg:hidden border-t px-3 py-3 flex flex-col gap-1 max-h-[70vh] overflow-y-auto ${chrome ? "border-white/10" : "border-dark/8"}`}>
            {!hideServices && <MobileGroup label="Services" allHref={`${base}/services`} items={serviceItems} onNav={() => setOpen(false)} dark={chrome} />}
            <MobileGroup label="Areas" allHref={`${base}/areas`} items={areaItems} onNav={() => setOpen(false)} dark={chrome} />
            {[["Reviews", "reviews"], ["About", "about"], ["Contact", "contact"]].map(([label, path]) => (
              <a key={path} href={`${base}/${path}`} onClick={() => setOpen(false)} className={`rounded-lg px-3 py-2.5 text-base font-medium ${chrome ? "text-white hover:bg-white/10" : "text-dark hover:bg-dark/[0.04]"}`}>{label}</a>
            ))}
            <a href={telHref(phone)} className={`rounded-lg px-3 py-2.5 text-base font-semibold flex items-center gap-2 ${chrome ? "text-white" : "text-dark"}`}>
              <Phone size={16} style={{ color: navBg ? "#fff" : dark ? theme.accent : (theme.accentOnWhite ?? theme.accent) }} /> {phone}
            </a>
            <a href={`${base}/contact`} className="mt-1 inline-flex items-center justify-center gap-1.5 rounded-full py-3 font-semibold text-sm" style={ctaStyle}>
              Get a Free Quote <ArrowRight size={15} />
            </a>
          </div>
        )}
      </div>
    </header>
  );
}

function NavDropdown({ label, allHref, items, dark }: { label: string; allHref: string; items: NavItem[]; dark?: boolean }) {
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
            <DropItem key={it.href || it.label} it={it} dark={dark} />
          ))}
        </div>
      </div>
    </div>
  );
}

// A single dropdown row. Items with children open a flyout sub-panel to the side.
function DropItem({ it, dark }: { it: NavItem; dark?: boolean }) {
  const rowC = dark
    ? "text-white/75 hover:bg-white/10 hover:text-white"
    : "text-dark/75 hover:bg-dark/[0.04] hover:text-dark";
  if (!it.children?.length) {
    return <a href={it.href} className={`block rounded-lg px-3 py-2 text-sm transition-colors ${rowC}`}>{it.label}</a>;
  }
  return (
    <div className="relative group/sub">
      <div className={`flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm cursor-default transition-colors ${rowC}`}>
        {it.label} <ChevronRight size={13} className="opacity-50" />
      </div>
      <div className="absolute top-0 left-full pl-2 opacity-0 invisible -translate-x-1 transition-all duration-150 group-hover/sub:opacity-100 group-hover/sub:visible group-hover/sub:translate-x-0">
        <div className={`min-w-[230px] rounded-2xl border shadow-xl p-2 ${dark ? "border-white/10 bg-[#141414]" : "border-dark/10 bg-white"}`}>
          {it.children.map((c) => (
            <a key={c.href || c.label} href={c.href} className={`block rounded-lg px-3 py-2 text-sm transition-colors ${rowC}`}>{c.label}</a>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileGroup({ label, allHref, items, onNav, dark }: { label: string; allHref: string; items: NavItem[]; onNav: () => void; dark?: boolean }) {
  const linkC = dark ? "text-white/65 hover:bg-white/10" : "text-dark/65 hover:bg-dark/[0.04]";
  return (
    <div className="py-1">
      <a href={allHref} onClick={onNav} className={`block rounded-lg px-3 py-2.5 text-base font-semibold ${dark ? "text-white hover:bg-white/10" : "text-dark hover:bg-dark/[0.04]"}`}>{label}</a>
      <div className="pl-3 grid">
        {items.map((it) =>
          it.children?.length ? (
            <div key={it.label} className="py-0.5">
              <div className={`px-3 pt-2 pb-1 text-xs font-semibold uppercase tracking-wide ${dark ? "text-white/40" : "text-dark/40"}`}>{it.label}</div>
              <div className="pl-2 grid">
                {it.children.map((c) => (
                  <a key={c.href || c.label} href={c.href} onClick={onNav} className={`rounded-lg px-3 py-2 text-sm ${linkC}`}>{c.label}</a>
                ))}
              </div>
            </div>
          ) : (
            <a key={it.href || it.label} href={it.href} onClick={onNav} className={`rounded-lg px-3 py-2 text-sm ${linkC}`}>{it.label}</a>
          ),
        )}
      </div>
    </div>
  );
}
