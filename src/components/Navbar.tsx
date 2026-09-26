"use client";

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
  const { isActive, handleNavClick } = useActiveNav();

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <header className="sticky top-0 z-50 bg-bg">
      <div className="m-1.5 md:m-0 border border-border/60 md:border-b bg-bg/75 rounded-4xl md:rounded-none backdrop-blur-xl backdrop-saturate-150 shadow-[0_4px_20px_rgba(0,0,0,0.18)] transition-all duration-300 hover:border-border hover:shadow-[0_8px_30px_rgba(0,0,0,0.28)]">
        <div className="container-page h-16 md:h-20 flex items-center justify-between gap-4">
          <Brand />

          {/* Desktop */}
          <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map(([name, href]) => {
              // const isActive =
              //   name === "My Plan" ? path === "/my-plan" : path === "/";

              // console.log(name, isActive);

              return (
                <Link
                  key={name}
                  href={href}
                  onClick={() => handleNavClick(name)}
                  className={`rounded-full px-4 py-2 text-xs/[1.33]  transition-colors ${isActive(name) ? "bg-accent text-primary font-semibold" : "text-muted-soft hover:bg-panel-2 hover:text-muted font-medium"}`}
                >
                  {name}
                </Link>
              );
            })}
          </nav>

          {/* Left Button */}
          <div className="hidden items-center gap-6 sm:flex">
            <Link
              href="/my-plan"
              className="group flex items-center gap-2"
              aria-label={`Saved,  items`}
            >
              <span className="text-xs/[1.33] font-medium text-[#d1d5db]">
                Plan
              </span>

              <span className="grid place-items-center rounded-full px-1.5 py-0 md:py-0.5 text-[11px]/[1.45] font-bold text-black bg-primary transition-all duration-300 group-hover:-translate-y-0.5">
                0
              </span>
            </Link>

            <Link
              href="/my-plan"
              className="group flex items-center gap-2"
              aria-label={`Saved,  items`}
            >
              <span className="text-xs/[1.33] font-medium text-muted-soft">
                Saved
              </span>

              <span className="grid place-items-center rounded-full px-1.5 py-0 md:py-0.5 text-[11px]/[1.45] font-medium text-[#d1d5db] border border-[#2d313b] transition-all duration-300 group-hover:-translate-y-0.5">
                0
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

                    handleNavClick(label);
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
                  className="flex flex-1 justify-center rounded-xl bg-primary hover:bg-secondary py-3 text-sm font-black text-black"
                >
                  Plan 0
                </Link>

                <Link
                  onClick={() => setIsMenuOpen(false)}
                  href="/my-plan?tab=saved"
                  className="flex flex-1 justify-center rounded-xl border border-[#46504b] py-3 text-sm font-black"
                >
                  Saved 0
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

/* 
<Link
  href="/my-plan"
  className="group relative flex items-center gap-2"
  aria-label="Plan, items"
>
  <span className="relative z-10 text-xs/[1.33] font-medium text-[#d1d5db]">
    Plan
  </span>

  <span
    className="
      absolute left-7 top-1/2
      grid -translate-y-1/2 place-items-center
      rounded-full bg-primary px-1.5 py-0.5
      text-[11px]/[1.45] font-bold text-black
      opacity-0 transition-all duration-300
      group-hover:left-1 group-hover:opacity-100
    "
  >
    0
  </span>
</Link>

*/
