"use client";

import { useEffect } from "react";

export function LpDataLayer({ variant }: { variant: string }) {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({
      event: "lp_view",
      lp_variant: variant,
    });
  }, [variant]);

  return null;
}
