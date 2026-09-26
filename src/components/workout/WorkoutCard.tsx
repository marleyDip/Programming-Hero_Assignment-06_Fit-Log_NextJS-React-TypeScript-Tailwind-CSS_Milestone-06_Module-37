import { Workout } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { Clock3, Flame, Star } from "../shared/icons";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  // console.log("Workout", workout);

  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border-hero bg-panel-hero transition-all hover:-translate-y-1 hover:border-primary/40 hover:glow"
    >
      {/* Image and Badge */}
      <div className="relative aspect-[1.18] w-full overflow-hidden bg-panel-hero">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-linear-to-t from-[#0d100f]/80 via-transparent to-transparent" />

        <div className="absolute left-4 top-4 flex flex-wrap gap-1.5">
          {workout.muscleGroups.slice(0, 1).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/15 bg-black/45 px-2.5 py-1 text-[9px] font-medium uppercase tracking-wider text-white backdrop-blur"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex flex-wrap gap-2">
          {workout.muscleGroups.map((group) => (
            <span
              key={group}
              className="rounded-full bg-primary px-2.5 py-0.5 text-[11px]/[1.5] font-bold uppercase tracking-wider text-black"
            >
              {group}
            </span>
          ))}
        </div>

        <h3 className="mt-2 text-text font-secondary text-lg/[1.56] font-bold uppercase tracking-wide">
          {workout.name}
        </h3>

        <p className="mt-0.5 text-muted-soft text-xs/[1.33]">
          {workout.equipment}
        </p>

        <div className="mt-5 grid grid-cols-3 gap-2 border-t border-[#20242e] pt-4 text-xs/[1.33] text-muted-soft">
          <span className="flex items-center gap-1.5">
            <Clock3 size={13} /> {workout.duration}m
          </span>

          <span className="flex items-center gap-1.5">
            <Flame size={13} /> {workout.caloriesBurned}
          </span>

          <span className="flex items-center gap-1.5">
            <Star size={13} className="text-primary" /> {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}
