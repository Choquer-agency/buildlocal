"use client";

import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-register";

const stats = [
  { value: 175, suffix: "+", label: "Websites Built" },
  { value: 3, suffix: "x", label: "More Calls on Avg" },
  { value: 0, prefix: "$", label: "Setup Fees", display: "$0" },
  { value: 8, suffix: "+", label: "Years Experience" },
];

function AnimatedCounter({ value, prefix, suffix, display }: { value: number; prefix?: string; suffix?: string; display?: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!started || display) return;
    const duration = 1500;
    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [started, value, display]);

  useEffect(() => {
    const el = counterRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={counterRef} className="font-display text-fluid-h3 text-white leading-none">
      {display || `${prefix || ""}${count}${suffix || ""}`}
    </span>
  );
}

export function LpSocialProof() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".lp-stat", {
          y: 20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
        });
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="py-10 md:py-14 theme-dark" style={{ backgroundColor: "#0c0c0c" }}>
      <div className="u-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center">
          {stats.map((stat) => (
            <div key={stat.label} className="lp-stat">
              <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} display={stat.display} />
              <p className="font-mono text-xs uppercase tracking-wider text-white/50 mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
