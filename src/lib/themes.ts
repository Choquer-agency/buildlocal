/**
 * Theme system for the per-business sites (/p/[business]).
 *
 * Each BusinessProfile carries a `themeId` (index into THEMES) and a `variant`
 * (layout toggle), assigned in the pipeline by hashing the place_id. Two
 * landscapers in the same city therefore get different colors AND layouts, so
 * 500 generated sites never look like clones.
 *
 * Themes reuse the project's existing palette sensibility (warm/earthy +
 * desert greens) so everything still feels native to the design system.
 */

export interface Theme {
  id: number;
  name: string;
  /** Primary accent — buttons, links, eyebrows, highlights. */
  accent: string;
  /** Darker shade of accent for hover / depth. */
  accentDark: string;
  /** Hero background (soft tinted). */
  heroBg: string;
  /** Alternating soft section background. */
  softBg: string;
  /** Dark section background (stats / footer band). */
  darkBg: string;
  /** Text color that reads on the accent (usually white or near-black). */
  onAccent: string;
  /** Optional secondary brand color (highlights, alternate accents). */
  accent2?: string;
}

export const THEMES: Theme[] = [
  {
    id: 0,
    name: "Sunset",
    accent: "#ff9500",
    accentDark: "#cc7600",
    heroBg: "#FFF9F0",
    softBg: "#FFF4E6",
    darkBg: "#1a1a1a",
    onAccent: "#ffffff",
  },
  {
    id: 1,
    name: "Verde",
    accent: "#2f9e6f",
    accentDark: "#227a55",
    heroBg: "#F2FBF6",
    softBg: "#E9F7F0",
    darkBg: "#11241b",
    onAccent: "#ffffff",
  },
  {
    id: 2,
    name: "Desert Sky",
    accent: "#1f8fb3",
    accentDark: "#176d89",
    heroBg: "#F0FAFF",
    softBg: "#E6F5FB",
    darkBg: "#0e2230",
    onAccent: "#ffffff",
  },
  {
    id: 3,
    name: "Clay",
    accent: "#c2410c",
    accentDark: "#9a3208",
    heroBg: "#FFF6F2",
    softBg: "#FBEDE7",
    darkBg: "#261611",
    onAccent: "#ffffff",
  },
  {
    id: 4,
    name: "Sage",
    accent: "#5b7d2a",
    accentDark: "#46611f",
    heroBg: "#F7F9F0",
    softBg: "#EFF3E3",
    darkBg: "#1c2113",
    onAccent: "#ffffff",
  },
  {
    id: 5,
    name: "Slate Teal",
    accent: "#0f766e",
    accentDark: "#0b5c55",
    heroBg: "#F3FAF9",
    softBg: "#E7F4F2",
    darkBg: "#102220",
    onAccent: "#ffffff",
  },
];

export function getTheme(themeId: number): Theme {
  return THEMES[themeId % THEMES.length] ?? THEMES[0];
}

/* ── color math for custom (manual) brand colors ── */
function clamp(n: number) { return Math.max(0, Math.min(255, Math.round(n))); }
function parseHex(hex: string) {
  let c = hex.replace("#", "");
  if (c.length === 3) c = c.split("").map((x) => x + x).join("");
  const n = parseInt(c, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function toHex(r: number, g: number, b: number) {
  return "#" + [r, g, b].map((v) => clamp(v).toString(16).padStart(2, "0")).join("");
}
export function darken(hex: string, amt = 0.2) {
  const [r, g, b] = parseHex(hex);
  return toHex(r * (1 - amt), g * (1 - amt), b * (1 - amt));
}
export function tint(hex: string, amt: number) {
  const [r, g, b] = parseHex(hex);
  return toHex(r + (255 - r) * amt, g + (255 - g) * amt, b + (255 - b) * amt);
}

/** Relative luminance → choose readable text color on a background. */
export function onColor(hex: string): string {
  const [r, g, b] = parseHex(hex).map((v) => v / 255);
  const lum = 0.2126 * r + 0.7152 * g + 0.4152 * b;
  return lum > 0.6 ? "#0c0c0c" : "#ffffff";
}

/**
 * Build a cohesive theme from a primary (and optional secondary) brand color.
 * When a secondary is given, the soft section backgrounds take on that hue, so
 * the whole site reads in their two-color brand (e.g. purple accents on sage).
 */
export function customTheme(accent: string, secondary?: string): Theme {
  const hasSec = !!secondary;
  return {
    id: -1,
    name: "Custom",
    accent,
    accentDark: darken(accent, 0.22),
    accent2: secondary || accent,
    heroBg: hasSec ? tint(secondary!, 0.45) : tint(accent, 0.93),
    softBg: hasSec ? tint(secondary!, 0.25) : tint(accent, 0.88),
    darkBg: darken(accent, 0.78),
    onAccent: onColor(accent),
  };
}

/** Stable hash → theme/variant assignment for the pipeline (avoids Math.random). */
export function assignTheme(seed: string): { themeId: number; variant: number } {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return {
    themeId: h % THEMES.length,
    variant: (h >>> 8) % 2,
  };
}
