"use client";

import { Workout } from "@/lib/types";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Store = { plan: Workout[]; saved: Workout[]; done: number[] };

type Ctx = Store & {
  addToPlan: (w: Workout) => boolean;
  removeFromPlan: (id: number) => void;
  saveWorkout: (w: Workout) => void;
  removeSaved: (id: number) => void;
  toggleDone: (id: number) => void;
  isInPlan: (id: number) => boolean;
  isSaved: (id: number) => boolean;
};

const FitLogContext = createContext<Ctx | null>(null);

const KEY = "fitlog-store-v1";

const initialStore: Store = {
  plan: [],
  saved: [],
  done: [],
};

export function FitLogProvider3({ children }: { children: React.ReactNode }) {
  // const [store, setStore] = useState<Store>({ plan: [], saved: [], done: [] });

  // const [hydrated, setHydrated] = useState(false);

  // useEffect(() => {
  //   try {
  //     const raw = localStorage.getItem(KEY);
  //     if (raw) setStore(JSON.parse(raw));
  //   } catch {
  //   } finally {
  //     setHydrated(true);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (!hydrated) return;

  //   try {
  //     localStorage.setItem(KEY, JSON.stringify(store));
  //   } catch {}
  // }, [store, hydrated]);

  const [store, setStore] = useState<Store>(() => {
    if (typeof window === "undefined") {
      return initialStore;
    }

    try {
      const raw = localStorage.getItem(KEY);

      if (!raw) return initialStore;

      const parsed = JSON.parse(raw) as Partial<Store>;

      if (
        parsed &&
        Array.isArray(parsed.plan) &&
        Array.isArray(parsed.saved) &&
        Array.isArray(parsed.done)
      ) {
        return {
          plan: parsed.plan,
          saved: parsed.saved,
          done: parsed.done,
        };
      }

      return initialStore;
    } catch {
      return initialStore;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(store));
    } catch {
      // Ignore localStorage errors
    }
  }, [store]);

  const value = useMemo<Ctx>(
    () => ({
      ...store,

      addToPlan: (w) => {
        if (store.plan.length >= 5 || store.plan.some((x) => x.id === w.id))
          return false;
        setStore((s) => ({ ...s, plan: [...s.plan, w] }));
        return true;
      },

      removeFromPlan: (id) =>
        setStore((s) => ({
          ...s,
          plan: s.plan.filter((x) => x.id !== id),
          done: s.done.filter((x) => x !== id),
        })),

      saveWorkout: (w) =>
        setStore((s) =>
          s.saved.some((x) => x.id === w.id)
            ? s
            : { ...s, saved: [...s.saved, w] },
        ),

      removeSaved: (id) =>
        setStore((s) => ({ ...s, saved: s.saved.filter((x) => x.id !== id) })),

      toggleDone: (id) =>
        setStore((s) => ({
          ...s,
          done: s.done.includes(id)
            ? s.done.filter((x) => x !== id)
            : [...s.done, id],
        })),

      isInPlan: (id) => store.plan.some((x) => x.id === id),

      isSaved: (id) => store.saved.some((x) => x.id === id),
    }),
    [store],
  );

  return (
    <FitLogContext.Provider value={value}>{children}</FitLogContext.Provider>
  );
}
export function useFitLog3() {
  const c = useContext(FitLogContext);
  if (!c) throw new Error("useFitLog must be used inside FitLogProvider");
  return c;
}
