"use client";

import { useMemo, useRef, useState } from "react";
import type { TrafficPoint } from "@/lib/prospect-intel";

// Single-series monthly organic traffic. One series → no legend; the heading
// names it. Brand orange carries identity; all text stays in ink tokens.
const W = 720;
const H = 240;
const PAD = { top: 22, right: 18, bottom: 30, left: 44 };
const PLOT_W = W - PAD.left - PAD.right;
const PLOT_H = H - PAD.top - PAD.bottom;
const ACCENT = "#ff9500";

function niceTicks(max: number, count = 4): number[] {
  if (max <= 0) return [0, 1];
  const raw = max / count;
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => s >= raw) ?? mag * 10;
  const ticks: number[] = [];
  for (let t = 0; t <= max + step / 2; t += step) ticks.push(Math.round(t));
  return ticks;
}

export function TrafficChart({ history }: { history: TrafficPoint[] }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hover, setHover] = useState<number | null>(null);

  const { pts, ticks, yMax } = useMemo(() => {
    const max = Math.max(...history.map((p) => p.traffic), 1);
    const tickList = niceTicks(max);
    const top = tickList[tickList.length - 1];
    const x = (i: number) => PAD.left + (history.length === 1 ? PLOT_W / 2 : (i / (history.length - 1)) * PLOT_W);
    const y = (v: number) => PAD.top + PLOT_H - (v / top) * PLOT_H;
    return {
      pts: history.map((p, i) => ({ ...p, x: x(i), y: y(p.traffic) })),
      ticks: tickList.map((t) => ({ v: t, y: y(t) })),
      yMax: top,
    };
  }, [history]);

  const line = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const area = `${line} L${pts[pts.length - 1]?.x.toFixed(1)},${PAD.top + PLOT_H} L${pts[0]?.x.toFixed(1)},${PAD.top + PLOT_H} Z`;

  const peakIdx = pts.reduce((best, p, i) => (p.traffic > pts[best].traffic ? i : best), 0);
  const lastIdx = pts.length - 1;
  const active = hover !== null ? pts[hover] : null;

  // Map pointer x → nearest month.
  function onMove(e: React.PointerEvent<SVGSVGElement>) {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = ((e.clientX - rect.left) / rect.width) * W;
    let nearest = 0;
    let dist = Infinity;
    pts.forEach((p, i) => {
      const d = Math.abs(p.x - px);
      if (d < dist) { dist = d; nearest = i; }
    });
    setHover(nearest);
  }

  return (
    <figure className="m-0">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto touch-none"
        role="img"
        aria-label={`Monthly organic search visits, ${history[0]?.label} to ${history[lastIdx]?.label}. Currently ${pts[lastIdx]?.traffic} visits per month.`}
        onPointerMove={onMove}
        onPointerLeave={() => setHover(null)}
      >
        <defs>
          <linearGradient id="tc-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={ACCENT} stopOpacity="0.22" />
            <stop offset="100%" stopColor={ACCENT} stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Recessive grid + y labels */}
        {ticks.map((t) => (
          <g key={t.v}>
            <line x1={PAD.left} x2={W - PAD.right} y1={t.y} y2={t.y} stroke="#0c0c0c" strokeOpacity="0.08" strokeWidth="1" />
            <text x={PAD.left - 9} y={t.y + 4} textAnchor="end" className="fill-dark/40 font-mono" fontSize="11">
              {t.v}
            </text>
          </g>
        ))}

        {/* x labels — every other month so they never collide */}
        {pts.map((p, i) =>
          i % 2 === 0 || i === lastIdx ? (
            <text key={p.ym} x={p.x} y={H - 9} textAnchor="middle" className="fill-dark/40 font-mono" fontSize="11">
              {p.label}
            </text>
          ) : null
        )}

        <path d={area} fill="url(#tc-fill)" />
        <path d={line} fill="none" stroke={ACCENT} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />

        {/* Crosshair */}
        {active && (
          <line x1={active.x} x2={active.x} y1={PAD.top} y2={PAD.top + PLOT_H} stroke="#0c0c0c" strokeOpacity="0.25" strokeWidth="1" />
        )}

        {/* Markers: peak + latest always, plus whatever is hovered */}
        {pts.map((p, i) => {
          const shown = i === peakIdx || i === lastIdx || i === hover;
          if (!shown) return null;
          return <circle key={p.ym} cx={p.x} cy={p.y} r="4.5" fill={ACCENT} stroke="#ffffff" strokeWidth="2" />;
        })}

        {/* Selective direct labels — never a number on every point */}
        {hover === null && (
          <>
            <text x={pts[peakIdx]?.x} y={pts[peakIdx]?.y - 11} textAnchor="middle" className="fill-dark/70 font-mono" fontSize="11">
              peak {pts[peakIdx]?.traffic}
            </text>
            {lastIdx !== peakIdx && (
              <text
                x={pts[lastIdx]?.x}
                y={pts[lastIdx]?.y - 11}
                textAnchor="end"
                className="fill-dark font-mono"
                fontSize="11"
                fontWeight="600"
              >
                now {pts[lastIdx]?.traffic}
              </text>
            )}
          </>
        )}

        {/* Tooltip */}
        {active && (
          <g transform={`translate(${Math.min(Math.max(active.x, PAD.left + 54), W - PAD.right - 54)},${PAD.top - 4})`}>
            <rect x="-54" y="-18" width="108" height="24" rx="4" fill="#0c0c0c" />
            <text x="0" y="-1" textAnchor="middle" fill="#ffffff" className="font-mono" fontSize="11">
              {active.label} · {active.traffic} visits
            </text>
          </g>
        )}

        <line x1={PAD.left} x2={W - PAD.right} y1={PAD.top + PLOT_H} y2={PAD.top + PLOT_H} stroke="#0c0c0c" strokeOpacity="0.18" strokeWidth="1" />
      </svg>

      <figcaption className="sr-only">
        Monthly organic visits from {history[0]?.label} to {history[lastIdx]?.label}. Peak {pts[peakIdx]?.traffic} in{" "}
        {pts[peakIdx]?.label}; currently {pts[lastIdx]?.traffic}. Scale 0–{yMax}.
      </figcaption>

      {/* Table view — identity and values never depend on the chart alone */}
      <details className="mt-3">
        <summary className="cursor-pointer font-mono text-xs text-dark/45 hover:text-dark/70">Show as table</summary>
        <table className="mt-2 w-full text-xs font-mono">
          <thead>
            <tr className="text-dark/45 text-left">
              <th className="py-1 font-normal">Month</th>
              <th className="py-1 font-normal text-right">Visits</th>
              <th className="py-1 font-normal text-right">Keywords</th>
            </tr>
          </thead>
          <tbody>
            {history.map((p) => (
              <tr key={p.ym} className="border-t border-dark/5">
                <td className="py-1">{p.label}</td>
                <td className="py-1 text-right">{p.traffic}</td>
                <td className="py-1 text-right">{p.keywords}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </figure>
  );
}
