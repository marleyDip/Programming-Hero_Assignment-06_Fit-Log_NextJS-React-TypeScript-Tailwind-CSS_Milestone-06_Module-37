"use client";

import PlanCard from "@/components/my-plan/PlanCard";
import SearchInput from "@/components/shared/SearchInput";
import SortDropdown from "@/components/shared/SortDropdown";
import {
  ArrowRight,
  Clock3,
  Flame,
  ListChecks,
  Trophy,
} from "@/components/shared/icons";

import { useFitlog } from "@/context/fitlog-context";
import { SortKey } from "@/lib/types";
import { filterAndSortWorkouts } from "@/lib/workout-utils";

import Link from "next/link";
import { useMemo, useState } from "react";

type Tab = "plan" | "saved";
type MyPlanClientProps = {
  initialTab: Tab;
};

export default function MyPlanClient({ initialTab }: MyPlanClientProps) {
  const {
    store: { plan, saved },
  } = useFitlog();

  /* const searchParams = useSearchParams();
  // const initialTab = searchParams.get("tab");
  // const [tab, setTab] = useState<Tab>( initialTab === "saved" ? "saved" : "plan" );

  const [tab, setTab] = useState<Tab>(
    searchParams.get("tab") === "saved" ? "saved" : "plan",
  ); */

  const [tab, setTab] = useState<Tab>(initialTab);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortKey>("duration");

  const list = tab === "plan" ? plan : saved;

  const filteredLists = useMemo(
    () => filterAndSortWorkouts(list, search, sort),
    [list, search, sort],
  );

  const minutes = plan.reduce((total, workout) => total + workout.duration, 0);

  const calories = plan.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0,
  );

  const handleTabChange = (nextTab: Tab) => {
    setTab(nextTab);
    setSearch("");
    setSort("duration");
  };

  return (
    <section className="container-page p-6 md:p-12">
      {/* Header */}
      <div className="flex flex-col gap-8 border-b border-[#252b28] pb-10 sm:flex-row sm:items-end sm:justify-between">
        {/* Heading */}
        <div>
          <p className="text-[10px] uppercase tracking-[.22em] text-primary">
            Training log
          </p>

          <h1 className="font-secondary mt-3 text-text text-3xl/[1.2] md:text-4xl/[1.2] font-bold uppercase tracking-tight">
            My Plan
          </h1>

          <p className="mt-4 text-sm/[1.43] text-muted-secondary">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* Navigation */}
        <Link
          href="/#library"
          className="group inline-flex items-center gap-2 self-start rounded-xl border border-[#343d39] px-5 py-3 text-xs font-black uppercase transition-all hover:border-primary hover:bg-primary hover:text-black sm:self-auto"
        >
          Browse workouts
          <ArrowRight
            size={15}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>

      {/* Metrics */}
      <div className="mt-6 md:mt-8 grid gap-3 sm:grid-cols-3">
        <Metric icon={<ListChecks />} label="Exercises" value={plan.length} />

        <Metric icon={<Clock3 />} label="Minutes" value={minutes} />

        <Metric icon={<Flame />} label="Calories" value={calories} />
      </div>

      {/* Tabs & Filters */}
      <div className="mt-10 flex flex-col gap-4 rounded-2xl border border-[#252b28] bg-[#101312] p-2 md:flex-row md:items-center md:justify-between">
        {/* Tabs */}
        <div className="flex rounded-xl bg-[#0b0e0d] p-1">
          <TabButton
            active={tab === "plan"}
            label="Today's Plan"
            count={plan.length}
            onClick={() => handleTabChange("plan")}
          />

          <TabButton
            active={tab === "saved"}
            label="Saved"
            count={saved.length}
            onClick={() => handleTabChange("saved")}
          />
        </div>

        {/* Search & Sort */}
        <div className="flex flex-col gap-2 sm:flex-row">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search this list..."
          />

          <SortDropdown value={sort} onChange={setSort} />
        </div>
      </div>

      {/* Result info */}
      {list.length > 0 && (
        <div className="mt-5 flex items-center justify-between">
          <p className="text-[10px] uppercase tracking-[.16em] text-[#68716c]">
            {filteredLists.length}{" "}
            {filteredLists.length === 1 ? "workout" : "workouts"} found
          </p>

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="text-[10px] font-bold uppercase tracking-widest text-[#89918d] transition-colors hover:text-primary-2 cursor-grab"
            >
              Clear search
            </button>
          )}
        </div>
      )}

      {/* Workout list */}
      {filteredLists.length > 0 ? (
        <div className="mt-3 grid gap-3">
          {filteredLists.map((workout) => (
            <PlanCard
              key={workout.id}
              workout={workout}
              saved={tab === "saved"}
            />
          ))}
        </div>
      ) : (
        <Empty saved={tab === "saved"} searched={Boolean(search)} />
      )}
    </section>
  );
}

/* Tab Component */
function TabButton({
  active,
  label,
  count,
  onClick,
}: {
  active: boolean;
  label: string;
  count: number;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative rounded-lg px-5 py-2.5 text-xs/[1.33] font-bold transition-all duration-200 cursor-grab ${
        active
          ? "bg-[#252d29] text-text shadow-sm"
          : "text-[#727b76] hover:text-white"
      }`}
    >
      {label}

      <span
        className={`ml-1.5 transition-colors ${
          active ? "text-primary" : "text-[#59615d]"
        }`}
      >
        {count}
      </span>

      {active && (
        <span className="absolute inset-x-4 -bottom-0.75 h-px bg-primary-2 shadow-[0_0_8px_rgba(204,255,0,0.7)]" />
      )}
    </button>
  );
}

/* Metric Component */
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
    <div className="group rounded-2xl border border-[#252b28] bg-[#111414] p-5 md:p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#343d39] hover:bg-[#141817]">
      <div className="flex items-center justify-between">
        <span className="text-[#89918d] transition-colors group-hover:text-primary">
          {icon}
        </span>

        <span className="text-[9px] uppercase tracking-widest text-[#68716c]">
          Live
        </span>
      </div>

      <p className="mt-5 font-secondary group-hover:text-secondary text-4xl/[1.11] font-bold">
        {value}
      </p>

      <p className="mt-0.5 text-[9px] uppercase tracking-widest text-[#727b76]">
        {label}
      </p>
    </div>
  );
}

/* Empty Component */
function Empty({ saved, searched }: { saved: boolean; searched: boolean }) {
  return (
    <div className="mt-5 rounded-2xl border border-dashed border-[#343d39] bg-[#101312] px-6 py-16 text-center">
      <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#1b211e] text-primary">
        <Trophy size={20} />
      </div>

      <h2 className="mt-5 font-secondary text-3xl font-bold uppercase">
        {searched ? "No matches found" : "Nothing here yet"}
      </h2>

      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#7f8983]">
        {searched
          ? "Try another workout name or muscle group."
          : saved
            ? "Save a lift from the library and it will appear here."
            : "Browse the library and add a lift to get today moving."}
      </p>

      {!searched && (
        <Link
          href="/#library"
          className="mt-6 inline-flex rounded-xl bg-secondary hover:bg-primary-2 px-5 py-3 text-xs font-bold uppercase text-black transition-all hover:scale-[1.02] hover:shadow-[0_0_24px_rgba(204,255,0,0.18)]"
        >
          Go to workouts
        </Link>
      )}
    </div>
  );
}

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
