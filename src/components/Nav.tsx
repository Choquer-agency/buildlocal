'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { useScroll } from '@/components/ui/use-scroll';
import { useContactForm } from '@/context/ContactFormContext';

const navLinks = [
  { label: "Industries", href: "/industries/roofing", isDropdown: true },
  { label: "Our Work", href: "/portfolio" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
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
  const [open, setOpen] = React.useState(false);
  const scrolled = useScroll(10);

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 border-b border-transparent md:mx-6 md:rounded-md md:border md:transition-all md:duration-500 md:ease-out',
          {
            'supports-[backdrop-filter]:bg-white/70 border-dark/8 backdrop-blur-lg md:top-2 md:mx-auto md:max-w-7xl md:shadow-lg':
              scrolled && !open,
            'bg-white/90': open,
          },
        )}
      >
        <nav
          className={cn(
            'u-container flex h-20 w-full items-center justify-between md:h-[68px] md:transition-all md:duration-500 md:ease-out',
            {
              'md:px-4': scrolled,
            },
          )}
        >
          {/* Logo */}
          <a
            href="/"
            className="font-sans font-medium text-xl tracking-tight flex items-center gap-2"
          >
            <img
              src="/images/logo.svg"
              alt={brandName}
              className="h-6 w-auto"
            />
            {brandName}
          </a>

          {/* Desktop Nav Links — centered */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) =>
              link.isDropdown ? (
                <div key={link.href} className="relative group">
                  <a
                    href={link.href}
                    className="inline-flex items-center gap-1 rounded-md px-4 py-2.5 text-base font-medium text-dark/60 transition-colors hover:text-dark hover:bg-dark/[0.04]"
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
                          className="block px-4 py-2 font-sans text-sm text-dark/70 hover:text-dark hover:bg-dark/[0.03] transition-all"
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
                  className="inline-flex items-center rounded-md px-4 py-2.5 text-base font-medium text-dark/60 transition-colors hover:text-dark hover:bg-dark/[0.04]"
                >
                  {link.label}
                </a>
              )
            )}
          </div>

          {/* Desktop CTA + Pricing */}
          <div className="hidden md:flex items-center gap-4">
            <span className="font-mono text-sm tracking-wide text-dark/50 whitespace-nowrap">
              Websites from <strong className="text-brand font-semibold">$195/mo</strong>
            </span>
            <button
              onClick={() => openModal()}
              data-track="nav-cta"
              data-track-label="Book a Free Strategy Call"
              className="btn whitespace-nowrap"
              style={{
                background: '#ff9500',
                color: '#fff',
                borderColor: '#ff9500',
              }}
            >
              <span className="text-base">Book a Free Strategy Call</span>
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
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-md border border-dark/10"
            data-track="nav-hamburger"
            aria-label="Toggle menu"
          >
            <MenuToggleIcon open={open} className="size-5" duration={300} />
          </button>
        </nav>

        {/* Mobile Menu */}
        <div
          className={cn(
            'bg-white/95 fixed top-20 right-0 bottom-0 left-0 z-50 flex flex-col overflow-hidden border-t border-dark/10 md:hidden',
            open ? 'block' : 'hidden',
          )}
        >
          <div
            data-slot={open ? 'open' : 'closed'}
            className={cn(
              'data-[slot=open]:animate-in data-[slot=open]:zoom-in-95 data-[slot=closed]:animate-out data-[slot=closed]:zoom-out-95 ease-out',
              'flex h-full w-full flex-col justify-between gap-y-2 p-6',
            )}
          >
            <div className="grid gap-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="flex items-center rounded-md px-3 py-3 text-lg font-sans font-medium text-dark transition-colors hover:bg-dark/[0.04]"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-mono text-sm text-dark/50 text-center">
                Websites from <strong className="text-brand">$195/mo</strong>
              </p>
              <button
                onClick={() => { setOpen(false); openModal(); }}
                data-track="nav-mobile-cta"
                data-track-label="Book a Free Strategy Call"
                className="w-full py-3.5 rounded-lg font-sans font-medium text-sm text-white text-center"
                style={{ background: '#ff9500' }}
              >
                Book a Free Strategy Call
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
