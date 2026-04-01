export function LpFooterMinimal() {
  return (
    <>
      <footer className="py-8 border-t border-dark/8">
        <div className="u-container flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="flex items-center gap-2 cursor-default">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo.svg" alt="BuildLocal" className="h-5 opacity-40" />
          </span>
          <p className="font-sans text-xs text-dark opacity-30 text-center">
            No setup fees. No contracts. Cancel anytime.
          </p>
          <p className="font-sans text-xs text-dark opacity-30">
            &copy; {new Date().getFullYear()} BuildLocal
          </p>
        </div>
      </footer>
      {/* Spacer for StickyMobileCta */}
      <div className="h-[68px] md:hidden" />
    </>
  );
}
