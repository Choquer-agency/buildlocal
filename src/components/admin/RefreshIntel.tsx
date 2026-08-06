"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";

// Force a fresh SE Ranking pull for this business (audit included, so it can
// take up to ~2 minutes).
export function RefreshIntel({ slug }: { slug: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function refresh() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/intel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, force: true }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || `Refresh failed (${res.status})`);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Refresh failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex items-center gap-3">
      {error && <span className="text-xs text-[#b91c1c]">{error}</span>}
      <button
        onClick={refresh}
        disabled={busy}
        className="inline-flex items-center gap-1.5 rounded-md border border-dark/15 bg-white px-3 py-1.5 text-sm font-medium hover:bg-dark/5 disabled:opacity-50"
      >
        <RefreshCw size={13} className={busy ? "animate-spin" : ""} />
        {busy ? "Pulling SE Ranking…" : "Refresh data"}
      </button>
    </div>
  );
}
