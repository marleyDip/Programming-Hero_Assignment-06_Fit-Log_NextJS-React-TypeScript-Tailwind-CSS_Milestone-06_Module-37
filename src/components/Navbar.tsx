"use client";

import { useFitlog } from "@/context/fitlog-context";
import { useActiveNav } from "@/hooks/useActiveNav";
import Link from "next/link";
import { useState } from "react";
import Brand from "./shared/Brand";
import { Menu, X } from "./shared/icons";

const NAV_LINKS_Mobile: { href: string; label: string }[] = [
  { href: "/#library", label: "Workout" },
  { href: "/my-plan", label: "My Plan" },
];

const NAV_LINKS: string[][] = [
  ["Workout", "/#library"],
  ["My Plan", "/my-plan"],
];

const Navbar = () => {
  // const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const { isActive } = useActiveNav();

  // Derive the active link from the current route instead of syncing state in an effect.
  // const activeLabel = pathname === "/my-plan" ? "My Plan" : "Workout";

  // const isActive = (label: string) => activeLabel === label;

  // Here, store destructure from useFitlog and plan, save destructure from store
  const {
    store: { plan, saved },
  } = useFitlog();

  return (
    <header id="top" className="sticky top-0 z-50">
      <div className="m-1.5 md:m-0 border border-border/60 md:border-b bg-bg/75 rounded-4xl md:rounded-none backdrop-blur-xl backdrop-saturate-150 shadow-[0_4px_20px_rgba(0,0,0,0.18)] transition-all duration-300 hover:border-border hover:shadow-[0_8px_30px_rgba(0,0,0,0.28)]">
        <div className="container-page h-16 md:h-20 flex items-center justify-between gap-4">
          <Brand />

          {/* Desktop */}
          <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map(([name, href]) => (
              <Link
                key={name}
                href={href}
                className={`rounded-full px-4 py-2 text-xs/[1.33] transition-colors ${isActive(name) ? "bg-accent text-primary font-semibold" : "text-muted-soft hover:bg-panel-2 hover:text-muted font-medium"}`}
              >
                {name}
              </Link>
            ))}
          </nav>

          {/* Left Button */}
          {/* <div className="hidden items-center gap-6 sm:flex">
            <Link
              href="/my-plan"
              className="group flex items-center gap-2"
              aria-label={`Today's plan, ${plan.length} items`}
            >
              <span className="text-xs/[1.33] font-medium text-[#d1d5db]">
                Plan
              </span>

              <span className="grid place-items-center rounded-full px-1.5 py-0 md:py-0.5 text-[11px]/[1.45] font-bold text-black bg-primary transition-all duration-300 group-hover:-translate-y-0.5">
                {plan.length}
              </span>
            </Link>

            <Link
              href="/my-plan?tab=saved"
              className="group flex items-center gap-2"
              aria-label={`Saved, ${saved.length} items`}
            >
              <span className="text-xs/[1.33] font-medium text-muted-soft">
                Saved
              </span>

              <span className="grid place-items-center rounded-full px-1.5 py-0 md:py-0.5 text-[11px]/[1.45] font-medium text-[#d1d5db] border border-[#2d313b] transition-all duration-300 group-hover:-translate-y-0.5">
                {saved.length}
              </span>
            </Link>
          </div> */}

          <div className="hidden items-center gap-3 md:gap-4 sm:flex">
            {/* Plan */}
            <Link
              href="/my-plan"
              aria-label={`Today's plan, ${plan.length} items`}
              className="group relative flex h-9 items-center rounded-full border border-white/10 bg-white/3 px-4 pr-5 text-[#d1d5db] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary/6 hover:text-white hover:shadow-[0_8px_24px_rgba(204,255,0,0.08)]"
            >
              <span className="text-xs font-semibold tracking-wide">Plan</span>

              {/* Floating badge */}
              <span className="absolute -left-1.5 -top-2 grid min-w-5 h-5 place-items-center rounded-full border border-secondary/50 bg-primary px-1 text-[9px] font-black leading-none text-[#0b0c0e] shadow-[0_0_12px_rgba(204,255,0,0.3)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_18px_rgba(204,255,0,0.5)]">
                {plan.length}
              </span>
            </Link>

            {/* Saved */}
            <Link
              href="/my-plan?tab=saved"
              aria-label={`Saved, ${saved.length} items`}
              className="group relative flex h-9 items-center rounded-full border border-white/10 bg-white/3 px-4 pr-5 text-[#9da6a1] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/6 hover:text-white hover:shadow-[0_8px_24px_rgba(0,0,0,0.2)]"
            >
              <span className="text-xs font-semibold tracking-wide">Saved</span>

              {/* Floating badge */}
              <span className="absolute -left-1.5 -top-2 grid min-w-5 h-5 place-items-center rounded-full border border-[#0b0c0e] bg-[#202522] px-1 text-[9px] font-bold leading-none text-[#d1d5db] transition-all duration-300 group-hover:scale-110 group-hover:border-white/20 group-hover:bg-[#2a312d]">
                {saved.length}
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen((toggleMenu) => !toggleMenu)}
            className="grid place-items-center h-10 w-10 rounded-xl border border-line cursor-pointer hover:text-[#f4f6f2]/90 md:hidden"
            aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Navbar */}
        {isMenuOpen && (
          <div className="border-t border-[#202523] bg-[#0d100f] px-5 py-4 rounded-b-4xl rounded-t-2xl glow md:hidden">
            <div className="grid gap-2">
              {NAV_LINKS_Mobile.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  onClick={() => {
                    setIsMenuOpen(false);
                  }}
                  className={`rounded-full px-4 py-3 text-sm transition-colors ${isActive(label) ? "text-primary font-semibold" : "text-muted-soft font-medium hover:text-muted"}`}
                >
                  {label}
                </Link>
              ))}

              <div className="mt-2 flex gap-2">
                <Link
                  onClick={() => setIsMenuOpen(false)}
                  href="/my-plan"
                  aria-label={`Today's plan, ${plan.length} items`}
                  className="flex flex-1 justify-center rounded-xl bg-primary hover:bg-secondary py-3 text-sm font-black text-black"
                >
                  Plan {plan.length}
                </Link>

                <Link
                  onClick={() => setIsMenuOpen(false)}
                  href="/my-plan?tab=saved"
                  aria-label={`Saved, ${saved.length} items`}
                  className="flex flex-1 justify-center rounded-xl border border-[#46504b] py-3 text-sm font-black"
                >
                  Saved {saved.length}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
