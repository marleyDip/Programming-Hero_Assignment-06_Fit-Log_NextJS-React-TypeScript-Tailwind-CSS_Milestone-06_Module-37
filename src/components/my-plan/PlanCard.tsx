"use client";

import { useFitlog } from "@/context/fitlog-context";
import { Workout } from "@/lib/types";

import Image from "next/image";
import Link from "next/link";

import { toast } from "sonner";
import { Check, Clock3, Flame, Star, Trash2, X } from "../shared/icons";

export default function PlanCard({
  workout,
  saved = false,
}: {
  workout: Workout;
  saved?: boolean;
}) {
  const {
    removeFromPlan,
    removeSaved,
    toggleDone,
    store: { done, plan },
  } = useFitlog();

  const isDone = done.includes(workout.id);

  return (
    <article
      className={`flex flex-col gap-4 rounded-2xl border border-[#252b28] bg-[#111414] p-3 md:p-4 sm:flex-row sm:items-center ${isDone ? "opacity-60" : ""}`}
    >
      {/* Image */}
      <div className="relative h-24 w-full overflow-hidden rounded-xl bg-[#191e1c] sm:h-20 sm:w-28 sm:shrink-0">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="112px"
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-secondary text-base/normal font-bold uppercase tracking-wide">
            {workout.name}
          </h3>

          {isDone && (
            <span className="rounded-full bg-primary px-2 py-1 text-[8px] font-bold text-black">
              DONE
            </span>
          )}
        </div>

        <p className="mt-1 text-xs/[1.33] font-semibold text-muted-secondary">
          {workout.equipment}
        </p>

        <div className="mt-3 flex flex-wrap gap-3 md:gap-4 text-xs/[1.33] text-[#89918d]">
          <span className="flex gap-1.5">
            <Clock3 size={13} />
            {workout.duration}m
          </span>

          <span className="flex gap-1.5">
            <Flame size={13} />
            {workout.caloriesBurned} kcal
          </span>

          <span className="flex gap-1.5">
            <Star size={13} className="text-primary" />
            {workout.rating}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 sm:justify-end">
        <Link
          href={`/workout/${workout.id}`}
          className="rounded-full border border-[#343d39] px-3 py-2 text-muted-secondary text-xs font-semibold transition-colors hover:border-secondary hover:text-secondary glow"
        >
          View Details
        </Link>

        {saved ? (
          <button
            type="button"
            onClick={() => {
              removeSaved(workout.id);

              toast.error("Removed from saved", {
                description: "Workout removed from your saved list.",
              });
            }}
            className="grid h-9 w-9 place-items-center rounded-full border border-[#343d39] text-muted-secondary transition-colors hover:border-red-400 hover:text-red-400 glow cursor-pointer"
            aria-label="Remove saved"
          >
            <X size={16} />
          </button>
        ) : (
          <>
            {/* Plan Toggle Done button */}
            <button
              type="button"
              /* onClick={() => {
                toggleDone(workout.id);

                toast.success(
                  isDone ? "Workout reopened" : "Workout completed",
                  {
                    description: isDone
                      ? "Workout moved back to your active plan."
                      : "Nice work. Workout marked as completed.",
                  },
                );
              }} */
              onClick={() => {
                if (isDone) {
                  // Current workout is completed.
                  // Reopening it will increase the active workout count by 1.
                  const activeCount = plan.filter(
                    (item) => !done.includes(item.id),
                  ).length;

                  if (activeCount >= 5) {
                    toast.warning("Plan is full", {
                      description:
                        "Complete or remove an active workout before reopening this one.",
                    });
                    return;
                  }

                  toggleDone(workout.id);

                  toast.info("Workout reopened", {
                    description: "Workout moved back to your active plan.",
                  });

                  return;

                  // toggleDone(workout.id);

                  // if (activeCount + 1 > 5) {
                  //   toast.warning("Plan is full", {
                  //     description:
                  //       "This workout is active again. Complete a workout before adding another.",
                  //   });
                  // } else {
                  //   toast.info("Workout reopened", {
                  //     description: "Workout moved back to your active plan.",
                  //   });
                  // }

                  // return;
                }

                // Mark workout as completed
                toggleDone(workout.id);

                toast.success("Workout completed", {
                  description: "Nice work. Workout marked as completed.",
                });
              }}
              aria-label={isDone ? "Mark as active" : "Mark as done"}
              className={`group relative grid size-9 place-items-center overflow-hidden rounded-full border transition-all duration-300 cursor-pointer ${
                isDone
                  ? "border-secondary bg-secondary text-[#0b0c0e] shadow-[0_0_20px_rgba(204,255,0,0.18)] hover:shadow-[0_0_28px_rgba(204,255,0,0.3)]"
                  : "border-white/10 bg-white/3 text-muted-secondary backdrop-blur-md hover:-translate-y-0.5 hover:border-primary-2/50 hover:bg-primary-2/10 hover:text-primary-2 hover:shadow-[0_0_20px_rgba(204,255,0,0.1)]"
              }`}
            >
              {/* Hover glow */}
              {!isDone && (
                <span className="absolute inset-0 scale-0 rounded-full bg-primary/10 transition-transform duration-300 group-hover:scale-100" />
              )}

              {/* Icon */}
              <Check
                size={16}
                strokeWidth={isDone ? 3 : 2}
                className={`relative z-10 transition-all duration-300 ${
                  isDone
                    ? "scale-110"
                    : "group-hover:scale-110 group-hover:rotate-3"
                }`}
              />

              {/* Completed pulse */}
              {isDone && (
                <span className="absolute inset-0 rounded-full border border-primary/40 animate-ping opacity-20" />
              )}
            </button>

            {/* Plan Delete Button */}
            <button
              type="button"
              onClick={() => {
                removeFromPlan(workout.id);

                toast.error("Workout Plan updated", {
                  description: `${workout.name} removed from today's plan.`,
                });
              }}
              className="group relative grid size-9 place-items-center overflow-hidden rounded-full border border-white/10 bg-white/3 text-muted-secondary shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-red-400/40 hover:bg-red-400/10 hover:text-red-400 hover:shadow-[0_0_20px_rgba(248,113,113,0.12)] active:translate-y-0 active:scale-95 cursor-pointer"
              aria-label="Remove"
            >
              <span className="absolute inset-0 rounded-full bg-red-400/0 blur-md transition-all duration-300 group-hover:bg-red-400/10" />

              <Trash2
                size={16}
                className="relative transition-transform duration-300 group-hover:scale-110"
              />
            </button>
          </>
        )}
      </div>
    </article>
  );
}

/*  
<button
  type="button"
  onClick={() => {
    toggleDone(workout.id);

    toast.success(
      isDone ? "Workout reopened" : "Workout completed",
      {
        description: isDone
          ? "Workout moved back to your active plan."
          : "Nice work. Workout marked as completed.",
      },
    );
  }}
  aria-label="Mark as done"
  // className="flex items-center gap-1.5 rounded-lg bg-[#1d241f] px-3 py-2 text-[10px] font-black uppercase hover:bg-[#27302a]"

  className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors glow cursor-pointer ${
    isDone
      ? "border-primary bg-primary text-[#0b0c0e]"
      : "border-border text-muted-2 hover:border-primary hover:text-primary"
  }`}
>
  <Check size={16} />
  {isDone ? "Undo" : "Mark as Done"}
</button>

*/
