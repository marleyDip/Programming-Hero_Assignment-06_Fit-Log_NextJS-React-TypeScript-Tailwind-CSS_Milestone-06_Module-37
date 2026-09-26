"use client";

import { Workout } from "@/lib/types";
import { Bookmark, Plus } from "../shared/icons";

export function WorkoutActions({ workout }: { workout: Workout }) {
  // console.log("Workout from Details page", workout);

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {/* Add to Plan */}
      <button
        type="button"
        className="group relative flex h-12 items-center justify-center gap-2 overflow-hidden rounded-xl bg-primary px-6 text-sm font-bold tracking-wide text-black shadow-[0_8px_25px_rgba(194,248,0,0.12)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#d8ff3d] hover:shadow-[0_12px_30px_rgba(194,248,0,0.2)] focus:outline-none focus:ring-2 focus:ring-primary/40 active:translate-y-0 cursor-pointer"
      >
        {/* Subtle shine */}
        <span
          aria-hidden="true"
          className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full"
        />

        <Plus
          aria-hidden="true"
          size={18}
          strokeWidth={2.5}
          className="relative transition-transform duration-200 group-hover:rotate-90"
        />

        <span className="relative">Add to plan</span>
      </button>

      {/* Save Workout */}
      <button
        type="button"
        className="group flex h-12 items-center justify-center gap-2 rounded-xl border border-border bg-card/60 px-6 text-sm font-semibold tracking-wide text-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-secondary/50 hover:bg-secondary/5 hover:text-primary focus:outline-none focus:ring-2 focus:ring-secondary/20 active:translate-y-0 cursor-pointer"
      >
        <Bookmark
          aria-hidden="true"
          size={17}
          strokeWidth={2}
          className="transition-all duration-200 group-hover:scale-110 group-hover:-rotate-6"
        />

        <span>Save for later</span>
      </button>
    </div>
  );
}
