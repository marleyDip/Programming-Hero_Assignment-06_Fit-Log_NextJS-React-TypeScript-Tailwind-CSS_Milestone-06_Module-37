"use client";

import { useFitlog } from "@/context/fitlog-context";
import { Workout } from "@/lib/types";
import { toast } from "sonner";
import { Bookmark, Plus } from "../shared/icons";

export function WorkoutActions({ workout }: { workout: Workout }) {
  // console.log("Workout from Details page", workout);

  // const { addToPlan, savedWorkout, isInPlan, isSaved, store: { plan } } = useFitlog();

  const { addToPlan, savedWorkout, isInPlan, isSaved, store } = useFitlog();

  // console.log(store);
  // { plan: Array(5), saved: Array(6), done: Array(0) }

  // inside used "store.plan" or destructure it
  const { plan, done } = store;
  // const { plan, saved, done } = store;

  // const full = plan.length >= 5 && !isInPlan(workout.id);
  // const full = plan.length >= 5;

  // Only incomplete workouts occupy the 5-workout limit
  const activeCount = plan.filter((item) => !done.includes(item.id)).length;

  const full = activeCount >= 5;

  const alreadyInPlan = isInPlan(workout.id);

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {/* Add to Plan */}
      <button
        type="button"
        // disabled={full || isInPlan(workout.id)}
        disabled={alreadyInPlan || full}
        /* onClick={() => {
          addToPlan(workout);

          toast.success("Workout added", {
            description: `${workout.name} - added to today's plan.`,
          });
        }} */
        onClick={() => {
          const result = addToPlan(workout);

          if (result === "added") {
            toast.success("Workout added", {
              description: `${workout.name} - added to today's plan.`,
            });
          }

          if (result === "already-in-plan") {
            toast.info("Already in plan", {
              description: `${workout.name} is already in today's plan.`,
            });
          }

          if (result === "full") {
            toast.error("Plan is full", {
              description: "Complete a workout before adding another one.",
            });
          }
        }}
        className="group relative flex h-12 items-center justify-center gap-2 overflow-hidden rounded-xl bg-primary px-6 text-sm font-bold tracking-wide text-black shadow-[0_8px_25px_rgba(194,248,0,0.12)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#d8ff3d] hover:shadow-[0_12px_30px_rgba(194,248,0,0.2)] focus:outline-none focus:ring-2 focus:ring-primary/40 active:translate-y-0 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
      >
        {/* Subtle shine */}
        {!alreadyInPlan && !full && (
          <span
            aria-hidden="true"
            className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full"
          />
        )}

        <Plus
          aria-hidden="true"
          size={18}
          strokeWidth={2.5}
          className="relative transition-transform duration-200 group-hover:rotate-90"
        />

        <span className="relative">
          {alreadyInPlan
            ? "Already in plan"
            : full
              ? "Plan is full"
              : "Add to today's plan"}
        </span>
      </button>

      {/* Save Workout */}
      <button
        type="button"
        onClick={() => {
          const alreadySaved = isSaved(workout.id);

          savedWorkout(workout);

          if (alreadySaved) {
            toast.warning("Already saved", {
              description: `${workout.name} is already in your saved list.`,
            });
          } else {
            toast.success("Workout saved", {
              description: `"${workout.name}" added to your saved workouts for later.`,
            });
          }

          /* toast.success(alreadySaved ? "Already saved" : "Workout saved", {
            description: alreadySaved
              ? `(${workout.name}), this workout is already in your saved list.`
              : `"${workout.name}" added to your saved workouts for later.`,
          }); */
        }}
        className="group flex h-12 items-center justify-center gap-2 rounded-xl border border-border bg-card/60 px-6 text-sm font-semibold tracking-wide text-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-secondary/50 hover:bg-secondary/5 hover:text-primary focus:outline-none focus:ring-2 focus:ring-secondary/20 active:translate-y-0 cursor-pointer"
      >
        <Bookmark
          aria-hidden="true"
          size={17}
          strokeWidth={2}
          className="transition-all duration-200 group-hover:scale-110 group-hover:-rotate-6"
        />

        <span>{isSaved(workout.id) ? "Saved" : "Save for later"}</span>
      </button>
    </div>
  );
}

/* Your data structure is:

useFitlog()
    │
    ├── store
    │    ├── plan
    │    ├── saved
    │    └── done
    │
    ├── addToPlan()
    ├── removeFromPlan()
    ├── savedWorkout()
    ├── removeSaved()
    ├── toggleDone()
    ├── isInPlan()
    └── isSaved()

Therefore: store.plan is correct.

*/
