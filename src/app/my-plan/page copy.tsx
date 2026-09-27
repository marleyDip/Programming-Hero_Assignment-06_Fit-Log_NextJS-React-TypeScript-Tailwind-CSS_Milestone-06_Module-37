/* "use client";

import PlanCard from "@/components/my-plan/PlanCard";
import {
  ArrowRight,
  Clock3,
  Flame,
  ListChecks,
  Search,
  Trophy,
} from "@/components/shared/icons";
import { useFitlog } from "@/context/fitlog-context";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export default function MyPlan() {
  const {
    store: { plan, saved },
  } = useFitlog();

  const [tab, setTab] = useState<"plan" | "saved">("plan");

  const [search, setSearch] = useState("");

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("tab") === "saved")
      setTab("saved");
  }, []);

  const list = tab === "plan" ? plan : saved;

  const filtered = useMemo(
    () =>
      list.filter(
        (w) =>
          w.name.toLowerCase().includes(search.toLowerCase()) ||
          w.muscleGroups.some((m) =>
            m.toLowerCase().includes(search.toLowerCase()),
          ),
      ),
    [list, search],
  );

  const minutes = plan.reduce((a, w) => a + w.duration, 0),
    calories = plan.reduce((a, w) => a + w.caloriesBurned, 0);

  return (
    <section className="container-page px-5 py-12 md:px-10 md:py-24">
      <div className="flex flex-col gap-8 border-b border-[#252b28] pb-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[.22em] text-(--acid)">
            Training log
          </p>

          <h1 className="mt-3 font-display text-6xl font-extrabold uppercase leading-none sm:text-8xl">
            My Plan
          </h1>

          <p className="mt-4 text-sm text-muted-secondary">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        <Link
          href="/#library"
          className="inline-flex items-center gap-2 self-start rounded-xl border border-[#343d39] px-5 py-3 text-xs font-black uppercase hover:border-white sm:self-auto"
        >
          Browse workouts <ArrowRight size={15} />
        </Link>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        <Metric icon={<ListChecks />} label="Exercises" value={plan.length} />

        <Metric icon={<Clock3 />} label="Minutes" value={minutes} />

        <Metric icon={<Flame />} label="Calories" value={calories} />
      </div>

      <div className="mt-10 flex flex-col gap-4">
        <div className="flex rounded-xl border border-[#252b28] bg-[#101312] p-1">
          <button
            onClick={() => setTab("plan")}
            className={`flex-1 rounded-lg py-3 text-xs font-black uppercase ${tab === "plan" ? "bg-[#252d29] text-white" : "text-[#727b76]"}`}
          >
            Today&apos;s Plan{" "}
            <span className="ml-1 text-primary">{plan.length}</span>
          </button>

          <button
            onClick={() => setTab("saved")}
            className={`flex-1 rounded-lg py-3 text-xs font-black uppercase ${tab === "saved" ? "bg-[#252d29] text-white" : "text-[#727b76]"}`}
          >
            Saved <span className="ml-1 text-primary">{saved.length}</span>
          </button>
        </div>

        <div className="relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#707a74]"
            size={16}
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search this list..."
            className="h-12 w-full rounded-xl border border-line bg-[#111414] pl-11 pr-4 text-sm outline-none focus:border-[#68736d]"
          />
        </div>
      </div>

      {filtered.length ? (
        <div className="mt-5 grid gap-3">
          {filtered.map((w) => (
            <PlanCard key={w.id} workout={w} saved={tab === "saved"} />
          ))}
        </div>
      ) : (
        <Empty saved={tab === "saved"} />
      )}
    </section>
  );
}

function Metric({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-[#252b28] bg-[#111414] p-5">
      <div className="flex items-center justify-between">
        <span className="text-[#89918d]">{icon}</span>

        <span className="font-mono text-[9px] uppercase tracking-widest text-[#68716c]">
          Live
        </span>
      </div>

      <p className="mt-5 font-display text-4xl font-bold">{value}</p>

      <p className="font-mono text-[9px] uppercase tracking-widest text-[#727b76]">
        {label}
      </p>
    </div>
  );
}
function Empty({ saved }: { saved: boolean }) {
  return (
    <div className="mt-5 rounded-2xl border border-dashed border-[#343d39] bg-[#101312] px-6 py-16 text-center">
      <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#1b211e] text-(--acid)">
        <Trophy size={20} />
      </div>

      <h2 className="mt-5 font-display text-3xl font-bold uppercase">
        Nothing here yet
      </h2>

      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#7f8983]">
        {saved
          ? "Save a lift from the library and it will appear here."
          : "Browse the library and add a lift to get today moving."}
      </p>

      <Link
        href="/#library"
        className="mt-6 inline-flex rounded-xl bg-primary px-5 py-3 text-xs font-black uppercase text-black"
      >
        Go to workouts
      </Link>
    </div>
  );
}
 */
