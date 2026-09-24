"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";

export const useActiveNav = () => {
  const pathname = usePathname();
  // console.log("Pathname", pathname);

  const [activeNav, setActiveNav] = useState<string | null>(null);

  const handleNavClick = (name: string) => {
    setActiveNav(name);
  };

  const isActive = (name: string) => {
    // First visit to "/"
    if (pathname === "/" && activeNav === null) {
      return false;
    }

    // My Plan page
    if (pathname === "/my-plan") {
      return name === "My Plan";
    }

    // Workout section
    if (pathname === "/" && activeNav === "Workout") {
      return name === "Workout";
    }

    return false;
  };

  return {
    isActive,
    handleNavClick,
  };
};
