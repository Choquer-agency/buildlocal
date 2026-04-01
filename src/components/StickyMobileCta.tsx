"use client";

import { useContactForm } from "@/context/ContactFormContext";

export function StickyMobileCta() {
  const { openModal } = useContactForm();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-dark/10 shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">
      <div className="flex items-center gap-3 px-4 py-3">
        <button
          onClick={() => openModal()}
          className="w-full flex items-center justify-center gap-2 bg-brand text-dark rounded-lg py-3.5 font-sans font-medium text-sm"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
