"use client";

import { SortKey, Workout } from "@/lib/types";
import { filterAndSortWorkouts } from "@/lib/workout-utils";

import { useMemo, useState } from "react";

import SearchInput from "../shared/SearchInput";
import SortDropdown from "../shared/SortDropdown";

import { SearchX } from "../shared/icons";
import WorkoutCard from "./WorkoutCard";

type Props = {
  workouts: Workout[];
};

export default function LibrarySection({ workouts }: Props) {
  // console.log(workouts);

  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("duration");

  const filteredWorkouts = useMemo(
    () => filterAndSortWorkouts(workouts, query, sortKey),
    [workouts, query, sortKey],
  );

  // console.log("Search", filteredWorkouts);

  return (
    <section id="library" className="scroll-mt-24">
      <div className="container-page pb-12 md:pb-16">
        {/* Header & Search + Sort */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          {/* Header */}
          <div>
            <h2 className="uppercase font-secondary text-text text-3xl/[1.2] font-bold tracking-tight">
              The Library
            </h2>

            <p className="mt-1 text-sm/[1.43] text-muted-soft">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          {/* Search & Sort */}
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            {/* Search */}
            <SearchInput
              value={query}
              onChange={setQuery}
              placeholder="Search by name or tag"
            />

            {/* Sort */}
            <SortDropdown value={sortKey} onChange={setSortKey} />
          </div>
        </div>

        {/* Cards */}
        <div className="mt-6 md:mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredWorkouts.length === 0 ? (
            <div className="col-span-full flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/40 px-6 py-12 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card text-secondary">
                <SearchX className="h-5 w-5" aria-hidden="true" />
              </div>

              <h3 className="mt-5 text-base font-semibold text-text">
                No workouts found
              </h3>

              <p className="mt-2 max-w-sm text-sm leading-6 text-muted-soft">
                We couldn&apos;t find any lifts matching{" "}
                <span className="font-medium text-text">
                  &quot;{query}&quot;
                </span>
                .
              </p>

              <button
                type="button"
                onClick={() => setQuery("")}
                className="mt-5 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-muted transition-all duration-200 hover:border-secondary/50 hover:bg-secondary/10 hover:text-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 cursor-pointer"
              >
                Clear search
              </button>
            </div>
          ) : (
            filteredWorkouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}

/*
Server Component
    │
    └── fetch + cache
            │
            ▼
    workouts props
            │
            ▼
Client Component
    │
    ├── query
    ├── sortKey
    └── filteredWorkouts

That's a very natural Next.js pattern:
   
    => Server Components fetch data.
    => Client Components handle interactivity.

    => ISR works now ( revalidate: 3600 )
*/
