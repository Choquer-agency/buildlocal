"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw, Send, Check } from "lucide-react";

const btn =
  "inline-flex items-center gap-1.5 rounded-md border border-dark/15 bg-white px-3 py-1.5 text-sm font-medium hover:bg-dark/5 disabled:opacity-50";

// Force a fresh SE Ranking pull for this business (audit included, so it can
// take up to ~2 minutes), or re-send the brief link to Slack.
export function RefreshIntel({ slug }: { slug: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState<"refresh" | "slack" | null>(null);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function post(action: "refresh" | "slack") {
    setBusy(action);
    setError(null);
    try {
      const res = await fetch("/api/intel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, force: action === "refresh", slack: action === "slack" }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || `Failed (${res.status})`);
      if (action === "slack") {
        if (body.slackSent === false) throw new Error("SLACK_WEBHOOK_URL is not set");
        setSent(true);
        setTimeout(() => setSent(false), 4000);
      } else {
        router.refresh();
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {error && <span className="text-xs text-[#b91c1c]">{error}</span>}
      <button onClick={() => post("slack")} disabled={!!busy} className={btn}>
        {sent ? <Check size={13} className="text-[#15803d]" /> : <Send size={13} />}
        {busy === "slack" ? "Sending…" : sent ? "Sent to Slack" : "Send to Slack"}
      </button>
      <button onClick={() => post("refresh")} disabled={!!busy} className={btn}>
        <RefreshCw size={13} className={busy === "refresh" ? "animate-spin" : ""} />
        {busy === "refresh" ? "Pulling SE Ranking…" : "Refresh data"}
      </button>
    </div>
  );
}
