"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-register";
import { getPortfolioProjects } from "@/content/shared";
import { PortfolioProject } from "@/content/config";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Portfolio({ slug }: { slug?: string }) {
  const portfolioProjects = getPortfolioProjects(slug);
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const isScrollingRef = useRef(false);
  const total = portfolioProjects.length;

  // 5 copies for plenty of runway in both directions
  const copies = 5;
  const items: (PortfolioProject & { _key: string })[] = [];
  for (let c = 0; c < copies; c++) {
    portfolioProjects.forEach((p, i) => {
      items.push({ ...p, _key: `c${c}-${i}` });
    });
  }
  const middleStart = Math.floor(copies / 2) * total; // index of first item in middle copy

  // Scroll to a specific item index in the items array (no animation)
  const scrollToIndex = useCallback((idx: number) => {
    if (!trackRef.current) return;
    const el = trackRef.current;
    const child = el.children[idx] as HTMLElement;
    if (child) {
      // Center the card in the container
      const containerWidth = el.offsetWidth;
      const childCenter = child.offsetLeft + child.offsetWidth / 2;
      el.scrollLeft = childCenter - containerWidth / 2;
    }
  }, []);

  // On mount, jump to the middle copy
  useEffect(() => {
    scrollToIndex(middleStart);
  }, [middleStart, scrollToIndex]);

  // Navigate with smooth scroll, then silently reset to middle copy
  const goTo = useCallback(
    (direction: number) => {
      if (!trackRef.current || isScrollingRef.current) return;
      isScrollingRef.current = true;

      const newCurrent = ((current + direction) % total + total) % total;
      setCurrent(newCurrent);

      const el = trackRef.current;
      // Find the target in the copy after middle (for next) or before (for prev)
      // We always scroll from wherever we are to the next/prev sibling
      const currentScrollLeft = el.scrollLeft;

      // Find which child is closest to current scroll center
      const containerWidth = el.offsetWidth;
      const scrollCenter = currentScrollLeft + containerWidth / 2;
      const children = Array.from(el.children) as HTMLElement[];
      let closestIdx = 0;
      let closestDist = Infinity;
      for (let i = 0; i < children.length; i++) {
        const childCenter = children[i].offsetLeft + children[i].offsetWidth / 2;
        const dist = Math.abs(childCenter - scrollCenter);
        if (dist < closestDist) {
          closestDist = dist;
          closestIdx = i;
        }
      }

      const targetIdx = closestIdx + direction;
      if (targetIdx >= 0 && targetIdx < children.length) {
        const target = children[targetIdx];
        const targetCenter = target.offsetLeft + target.offsetWidth / 2;
        el.scrollTo({ left: targetCenter - containerWidth / 2, behavior: "smooth" });
      }

      // After smooth scroll finishes, silently reset to middle copy
      setTimeout(() => {
        scrollToIndex(middleStart + newCurrent);
        isScrollingRef.current = false;
      }, 500);
    },
    [current, total, middleStart, scrollToIndex]
  );

  const next = useCallback(() => goTo(1), [goTo]);
  const prev = useCallback(() => goTo(-1), [goTo]);

  // Sync dot indicators when user swipes on mobile
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (!el) { ticking = false; return; }
        const children = Array.from(el.children) as HTMLElement[];
        const containerWidth = el.offsetWidth;
        const scrollCenter = el.scrollLeft + containerWidth / 2;
        let closestIdx = 0;
        let closestDist = Infinity;
        for (let i = 0; i < children.length; i++) {
          const childCenter = children[i].offsetLeft + children[i].offsetWidth / 2;
          const dist = Math.abs(childCenter - scrollCenter);
          if (dist < closestDist) {
            closestDist = dist;
            closestIdx = i;
          }
        }
        const projectIdx = closestIdx % total;
        setCurrent(projectIdx);
        ticking = false;
      });
    }
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [total]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [next, prev]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".portfolio-heading", {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 75%", once: true },
        });
        gsap.from(".portfolio-slide", {
          x: 60,
          opacity: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 65%", once: true },
        });
      });
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      id="portfolio"
      className="relative flex flex-col py-12 md:py-0 md:h-screen md:min-h-[600px] md:max-h-[1000px]"
      style={{ backgroundColor: "#FFF9F0" }}
    >
      {/* Header */}
      <div className="u-container pb-6 md:pt-12 flex items-end justify-between gap-8 flex-shrink-0">
        <div>
          <p className="portfolio-heading eyebrow text-brand mb-3">Our Work</p>
          <h2 className="portfolio-heading font-sans font-medium text-fluid-h3 leading-[1.1] text-dark">
            Websites that speak for themselves
          </h2>
        </div>

        <div className="portfolio-heading hidden md:flex items-center gap-3 flex-shrink-0">
          <button
            onClick={prev}
            className="w-11 h-11 rounded-full border border-dark/10 flex items-center justify-center transition-all hover:bg-dark hover:text-white"
            style={{ transitionDuration: "0.25s" }}
            aria-label="Previous project"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="w-11 h-11 rounded-full border border-dark/10 flex items-center justify-center transition-all hover:bg-dark hover:text-white"
            style={{ transitionDuration: "0.25s" }}
            aria-label="Next project"
          >
            <ChevronRight size={20} />
          </button>
          <span className="font-mono text-xs text-dark/40 ml-2 tabular-nums">
            {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <span className="font-sans text-sm text-brand font-medium ml-2">
            125+ more!
          </span>
        </div>
      </div>

      {/* Slider */}
      <div className="md:flex-1 md:min-h-0 overflow-hidden">
        <div
          ref={trackRef}
          className="flex gap-[1.5625rem] md:h-full overflow-x-auto snap-x snap-mandatory md:snap-none md:overflow-x-hidden scrollbar-hide pb-4 md:pb-0 px-[7.5vw] md:px-8"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {items.map((project) => (
            <div
              key={project._key}
              className="portfolio-slide flex-shrink-0 flex flex-col w-[85vw] md:w-[calc((100%-3*1.25rem)/2.85)] snap-center md:snap-start"
            >
              {/* Image */}
              <div
                className="relative overflow-hidden group"
                style={{ aspectRatio: "1917 / 1237", borderRadius: "0.375rem" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover object-top transition-transform group-hover:scale-110"
                  style={{ transitionDuration: "0.6s", transitionTimingFunction: "cubic-bezier(0.625, 0.05, 0, 1)" }}
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>

              {/* Text below */}
              <div className="pt-4">
                <h3 className="font-sans font-medium text-fluid-h6 text-dark leading-tight">
                  {project.name}
                </h3>
                <p className="font-sans text-fluid-main text-dark opacity-50 mt-1 leading-relaxed">
                  {project.description}
                </p>
                {project.caseStudy && (
                  <div className="mt-3 pt-3 border-t border-dark/10 space-y-2">
                    <p className="font-sans text-xs text-dark opacity-40 uppercase tracking-wider font-medium">Case Study</p>
                    <p className="font-sans text-sm text-dark opacity-60 leading-relaxed">
                      <span className="font-medium opacity-80">Challenge:</span> {project.caseStudy.challenge}
                    </p>
                    <p className="font-sans text-sm text-dark opacity-60 leading-relaxed">
                      <span className="font-medium opacity-80">Result:</span> {project.caseStudy.result}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile dots */}
      <div className="md:hidden flex justify-center gap-1.5 py-4 flex-shrink-0">
        {portfolioProjects.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setCurrent(i);
              scrollToIndex(middleStart + i);
            }}
            className="w-2 h-2 rounded-full transition-all"
            style={{
              backgroundColor: i === current ? "#ff9500" : "rgba(0,0,0,0.15)",
              transitionDuration: "0.25s",
            }}
            aria-label={`Go to project ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
