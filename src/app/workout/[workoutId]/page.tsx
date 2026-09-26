import {
  Activity,
  ArrowLeft,
  Clock3,
  Dumbbell,
  Flame,
  Layers3,
  Repeat2,
  Star,
} from "@/components/shared/icons";
import { WorkoutActions } from "@/components/workout/WorkoutActions";
import { getWorkoutById } from "@/lib/api";
import { Workout } from "@/lib/types";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const SPEC_ROWS = (workout: Workout) => [
  {
    label: "Equipment",
    value: workout.equipment,
    icon: Dumbbell,
  },
  {
    label: "Difficulty",
    value: workout.difficulty,
    icon: Activity,
  },
  {
    label: "Sets",
    value: String(workout.sets),
    icon: Layers3,
  },
  {
    label: "Reps",
    value: workout.reps,
    icon: Repeat2,
  },
  {
    label: "Duration",
    value: `${workout.duration} min`,
    icon: Clock3,
  },
  {
    label: "Calories",
    value: `${workout.caloriesBurned} kcal`,
    icon: Flame,
  },
  {
    label: "Rating",
    value: `${workout.rating} / 5`,
    icon: Star,
  },
];

interface WorkoutPageProps {
  params: Promise<{
    workoutId: string;
  }>;
}

export default async function WorkoutDetailPage({ params }: WorkoutPageProps) {
  const { workoutId } = await params;
  // console.log("Workout ID", workoutId)

  const workout = await getWorkoutById(workoutId);
  // console.log("Workout Object", workout);

  if (!workout) {
    notFound();
  }

  return (
    <div className="grid-noise">
      <section className="container-page py-10 md:py-16">
        {/* Navigate to Library Section */}
        <Link
          href="/#library"
          className="group mb-8 inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-secondary hover:text-secondary"
        >
          <ArrowLeft
            size={14}
            className="transition-transform duration-500 group-hover:rotate-360 group-hover:-translate-x-1 group-hover:scale-105"
          />{" "}
          Back to library
        </Link>

        {/* Main Content */}
        <div className="grid gap-8 md:gap-12 lg:grid-cols-[.9fr_1.1fr]">
          {/* Left - Visual */}
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-[#232834] bg-[#171a21] lg:aspect-auto lg:h-full lg:min-h-175">
            {/* Image */}
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/65 via-transparent to-transparent" />

            {/* Badge */}
            <div className="absolute bottom-5 left-5 flex flex-wrap gap-2">
              {workout.muscleGroups.map((m) => (
                <span
                  key={m}
                  className="rounded-full bg-primary px-3 py-1.5 text-[9px] font-bold uppercase text-black"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>

          {/* Right - Details */}
          <div className="flex flex-col justify-center">
            {/* Workout ID */}
            <p className=" text-[10px] uppercase tracking-[.22em] text-primary">
              Workout / {String(workout.id).padStart(2, "0")}
            </p>

            {/* Name */}
            <h1 className="mt-4 font-secondary text-text text-4xl/[1.11] font-bold uppercase tracking-tight">
              {workout.name}
            </h1>

            {/* Description */}
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-soft sm:text-base">
              {workout.description}
            </p>

            {/* Muscle Group */}
            <div className="flex flex-wrap mt-5 gap-2.5">
              {workout.muscleGroups.map((group) => (
                <span
                  key={group}
                  className="rounded-full bg-primary-2 px-3.5 py-1 text-xs/[1.33] font-semibold text-line-2"
                >
                  {group}
                </span>
              ))}
            </div>

            {/* Workout Specifications - Panel */}
            <div className="mt-7 grid grid-cols-2 overflow-hidden rounded-2xl border border-line bg-[#111414] sm:grid-cols-3">
              {[
                ["Equipment", workout.equipment],
                ["Difficulty", workout.difficulty],
                ["Sets", String(workout.sets)],
                ["Reps", workout.reps],
                ["Duration", `${workout.duration} min`],
                ["Calories", `${workout.caloriesBurned} kcal`],
                ["Rating", String(workout.rating)],
              ].map(([l, v]) => (
                <div key={l} className="border-b border-r border-[#242a27] p-4">
                  <p className="text-[8px] uppercase tracking-widest text-[#69736d]">
                    {l}
                  </p>

                  <p className="mt-1 text-xs font-bold leading-5 text-white">
                    {v}
                  </p>
                </div>
              ))}
            </div>

            {/* Instructions */}
            <div className="mt-8">
              <h2 className="text-base/normal tracking-wider font-extrabold uppercase text-text">
                Instructions
              </h2>

              {/* Instructions List */}
              <ol className="mt-4 grid gap-3">
                {workout.instructions.map((step, i) => (
                  <li
                    key={step}
                    className="flex gap-4 rounded-xl border border-[#242a27] bg-[#101312] p-4"
                  >
                    <span className="text-sm/[1.63] font-bold text-primary">
                      0{i + 1}
                    </span>

                    <span className="text-sm leading-6 text-[#d1d5db]">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Action Button */}
            <div className="mt-9">
              <WorkoutActions workout={workout} />
            </div>
          </div>
        </div>

        {/* Workout Specifications - Table */}
        <div className="mx-auto md:mx-0 mt-12 md:mt-16 w-full md:w-2/3 lg:w-1/2">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-primary">
                Workout data
              </p>

              <h2 className="mt-1 text-lg font-extrabold uppercase tracking-tight text-text">
                Specifications Table
              </h2>
            </div>

            <span className="hidden text-[9px] font-medium uppercase tracking-widest text-muted-secondary sm:block">
              FitLog / Details
            </span>
          </div>

          <div className="overflow-hidden rounded-2xl border border-line bg-[#111414] p-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.18)]">
            {SPEC_ROWS(workout).map((row, idx) => {
              const Icon = row.icon;

              return (
                <div
                  key={row.label}
                  className={`group flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-200 hover:bg-panel-2/70 sm:gap-4 sm:px-4 ${
                    idx !== 0 ? "border-t border-[#242a27]" : ""
                  }`}
                >
                  {/* Icon */}
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-primary/10 bg-accent text-primary transition-all duration-200 group-hover:border-primary/25 group-hover:bg-primary/10 group-hover:shadow-[0_0_20px_rgba(194,248,0,0.08)] sm:h-10 sm:w-10 sm:rounded-xl">
                    <Icon
                      aria-hidden="true"
                      size={16}
                      strokeWidth={1.8}
                      className="transition-transform duration-200 group-hover:scale-110"
                    />
                  </div>

                  {/* Label */}
                  <div className="flex min-w-0 flex-1 items-center gap-2.5 sm:gap-3">
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary shadow-[0_0_8px_rgba(194,248,0,0.45)]"
                    />

                    <span className="truncate text-[9px] font-bold uppercase tracking-[0.16em] text-muted-soft sm:text-[10px]">
                      {row.label}
                    </span>
                  </div>

                  {/* Value */}
                  <span className="shrink-0 text-right text-xs font-bold text-[#e5e7eb] transition-colors duration-200 group-hover:text-primary sm:text-sm">
                    {row.value}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

/* const SPEC_ROWS = (
    workout: NonNullable<Awaited<ReturnType<typeof getWorkoutById>>>,
  ) => [
    { label: "EQUIPMENT", value: workout.equipment },
    { label: "DIFFICULTY", value: workout.difficulty },
    { label: "SETS", value: String(workout.sets) },
    { label: "REPS", value: workout.reps },
    { label: "DURATION", value: `${workout.duration} min` },
    { label: "CALORIES", value: `${workout.caloriesBurned} kcal` },
    { label: "RATING", value: String(workout.rating) },
  ]; 


  // All details - Table
  <div className="mt-7 overflow-hidden rounded-2xl border border-[#232834] bg-[#151922]">
    {SPEC_ROWS(workout).map((row, idx) => (
      <div
        key={row.label}
        className={`flex items-center justify-between px-6 py-3.5 ${
          idx !== 0 ? "border-t border-[#1e2330]" : ""
        }`}
      >
        <span className="text-xs/[1.33] font-bold tracking-wider text-muted-soft">
          {row.label}
        </span>

        <span className="text-sm/[1.43] font-medium text-[#e5e7eb]">
          {row.value}
        </span>
      </div>
    ))}
  </div>
  
*/
