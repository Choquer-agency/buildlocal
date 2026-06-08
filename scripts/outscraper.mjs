// Minimal Outscraper client + .env.local loader (Node 18+, global fetch).
import fs from "node:fs";
import path from "node:path";

export function loadEnv() {
  const p = path.join(process.cwd(), ".env.local");
  if (!fs.existsSync(p)) return;
  for (const line of fs.readFileSync(p, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
  }
}

const BASE = "https://api.app.outscraper.com";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * Submit an Outscraper request async, then poll until it finishes.
 * Returns the `data` array (one entry per query).
 */
export async function osRequest(endpoint, params, { pollMs = 4000, maxPolls = 90 } = {}) {
  const key = process.env.OUTSCRAPER_API_KEY;
  if (!key) throw new Error("OUTSCRAPER_API_KEY missing (add to .env.local)");

  const qs = new URLSearchParams({ ...params, async: "true" });
  const submit = await fetch(`${BASE}/${endpoint}?${qs}`, { headers: { "X-API-KEY": key } });
  const sub = await submit.json().catch(() => ({}));

  // Surface billing/auth/rate errors immediately instead of polling a dead URL.
  if (!submit.ok || sub.error) {
    const msg = sub.errorMessage || sub.message || JSON.stringify(sub).slice(0, 200);
    throw new Error(`Outscraper ${submit.status}: ${msg}`);
  }

  // Sometimes returns immediately with data.
  if (sub.status === "Success" && sub.data) return sub.data;

  const resultsUrl = sub.results_location || (sub.id ? `${BASE}/requests/${sub.id}` : null);
  if (!resultsUrl) throw new Error(`Outscraper: no results_location/id in submit response: ${JSON.stringify(sub).slice(0, 200)}`);
  for (let i = 0; i < maxPolls; i++) {
    await sleep(pollMs);
    const r = await fetch(resultsUrl, { headers: { "X-API-KEY": key } });
    const j = await r.json();
    if (j.status === "Success") return j.data;
    if (j.status === "Error" || j.status === "Failed") throw new Error(`Outscraper failed: ${JSON.stringify(j).slice(0, 300)}`);
  }
  throw new Error(`Outscraper timed out after ${maxPolls} polls (${endpoint})`);
}
