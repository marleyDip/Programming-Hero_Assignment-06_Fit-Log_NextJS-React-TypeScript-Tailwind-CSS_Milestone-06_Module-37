"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const useActiveNav = () => {
  const pathname = usePathname();
  const [currentHash, setCurrentHash] = useState("");

  useEffect(() => {
    const updateHash = () => {
      setCurrentHash(window.location.hash);
    };

    updateHash();

    window.addEventListener("hashchange", updateHash);
    window.addEventListener("popstate", updateHash);

    return () => {
      window.removeEventListener("hashchange", updateHash);
      window.removeEventListener("popstate", updateHash);
    };
  }, [pathname]);

  const isActive = (name: string) => {
    // My Plan
    if (pathname === "/my-plan") {
      return name === "My Plan";
    }

    // Workout
    if (pathname === "/" && currentHash === "#library") {
      return name === "Workout";
    }

    return false;
  };

  return {
    isActive,
  };
};

/* "use client";


export const useActiveNav = () => {
  const pathname = usePathname();

  const [activeNav, setActiveNav] = useState<string | null>(null);

  const isActive = (name: string) => {
    // My Plan
    if (pathname === "/my-plan") {
      return name === "My Plan";
    }

    // Workout after clicking it
    if (pathname === "/" && activeNav === "Workout") {
      return name === "Workout";
    }

    // First visit to "/"
    return false;
  };

  const handleNavClick = (name: string) => {
    setActiveNav(name);
  };

  return {
    isActive,
    handleNavClick,
  };
}; */

/* "use client";

import { usePathname } from "next/navigation";

export const useActiveNav = () => {
  const pathname = usePathname();

  const isActive = (name: string) => {
    // On first visit to "/"
    if (pathname === "/") {
      return false;
    }

    // My Plan page
    if (pathname === "/my-plan") {
      return name === "My Plan";
    }

    return false;
  };

  return {
    isActive,
  };
}; 

*/

// "use client";

// import { usePathname } from "next/navigation";
// import { useState } from "react";

// export const useActiveNav = () => {
//   const pathname = usePathname();
//   // console.log("Pathname", pathname);

//   const [activeNav, setActiveNav] = useState<string | null>(null);

//   const handleNavClick = (name: string) => {
//     setActiveNav(name);
//   };

//   const isActive = (name: string) => {
//     // First visit to "/"
//     if (pathname === "/" && activeNav === null) {
//       return false;
//     }

//     // My Plan page
//     if (pathname === "/my-plan") {
//       return name === "My Plan";
//     }

//     // Workout section
//     if (pathname === "/" && activeNav === "Workout") {
//       return name === "Workout";
//     }

//     return false;
//   };

//   return {
//     isActive,
//     handleNavClick,
//   };
// };
