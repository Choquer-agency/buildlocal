/**
 * Scraped GMB titles are SEO-stuffed ("ABC Inc. - Best Landscaper in Mesa, AZ").
 * Reduce to the core brand name for the flyer headline.
 * Edge cases where the real brand sits AFTER a delimiter can be overridden
 * per-business in the CRM (nameOverride) — see build-audience.mjs.
 */
export function cleanName(name) {
  let n = (name || "").split(/\s[-–—|]\s/)[0];   // cut at " - ", " | ", " — "
  n = n.split(",")[0];                            // cut at first comma
  n = n.replace(/\s*\([^)]*\)/g, " ");            // drop (parentheticals)
  n = n.replace(/\s+in\s+[A-Z][\w'.]*(?:\s+[A-Z][\w'.]*)*\s*,?\s*(?:AZ|Arizona)\b.*$/i, ""); // "... in Gilbert, AZ"
  n = n.replace(/\s*,?\s*(?:AZ|Arizona)\s*$/i, ""); // trailing state
  n = n.replace(/\b(L\.?L\.?C\.?|Inc\.?|Co\.?|Corp\.?|Ltd\.?)\.?$/i, ""); // trailing legal suffix
  return n.replace(/[\s\-–—|,&]+$/, "").trim();
}

export function headlineFont(name) {
  const maxLen = Math.max((name || "").length, 17); // "deserves a better" = 17
  return Math.max(34, Math.min(78, Math.floor(806 / (0.52 * maxLen))));
}
