"use client";

import { Workout } from "@/lib/types";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type Store = {
  plan: Workout[];
  saved: Workout[];
  done: number[];
};

type AddToPlanResult = "added" | "already-in-plan" | "full";

type FitlogContextValue = {
  store: Store;

  // addToPlan: (w: Workout) => void;
  addToPlan: (w: Workout) => AddToPlanResult;
  removeFromPlan: (id: number) => void;

  savedWorkout: (w: Workout) => void;
  removeSaved: (id: number) => void;

  toggleDone: (id: number) => void;

  isInPlan: (id: number) => boolean;
  isSaved: (id: number) => boolean;
};

const FitlogContext = createContext<FitlogContextValue | null>(null);

const KEY = "fitlog-store-v1";

const initialStore: Store = {
  plan: [],
  saved: [],
  done: [],
};

export function FitlogProvider({ children }: { children: React.ReactNode }) {
  // Read existing data once when the client initializes
  const [store, setStore] = useState<Store>(() => {
    if (typeof window === "undefined") {
      return initialStore;
    }

    try {
      const raw = localStorage.getItem(KEY);

      return raw ? JSON.parse(raw) : initialStore;
    } catch {
      return initialStore;
    }
  });

  // Save store whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(store));
    } catch {
      // Ignore localStorage errors
    }
  }, [store]);

  // Add workout to plan
  const addToPlan = useCallback((workout: Workout): AddToPlanResult => {
    let result: AddToPlanResult = "added";

    setStore((prev) => {
      // Already in today's plan
      if (prev.plan.some((item) => item.id === workout.id)) {
        result = "already-in-plan";
        return prev;
      }

      // Only incomplete workouts occupy active slots
      const activeCount = prev.plan.filter(
        (item) => !prev.done.includes(item.id),
      ).length;

      // Maximum 5 active workouts
      if (activeCount >= 5) {
        result = "full";
        return prev;
      }

      return {
        ...prev,
        plan: [...prev.plan, workout],
      };
    });

    return result;
  }, []);

  /* const addToPlan = useCallback((workout: Workout) => {
    setStore((prev) => {
      // Already in plan;
      if (prev.plan.some((item) => item.id === workout.id)) {
        return prev;
      }

      // Maximum 5 workouts
      if (prev.plan.length >= 5) {
        return prev;
      }

      return {
        ...prev,
        plan: [...prev.plan, workout],
      };
    });
  }, []); */

  // Remove workout from plan
  const removeFromPlan = useCallback((id: number) => {
    setStore((prev) => ({
      ...prev,
      plan: prev.plan.filter((item) => item.id !== id),
      done: prev.done.filter((item) => item !== id),
    }));
  }, []);

  // Save workout
  const savedWorkout = useCallback((workout: Workout) => {
    setStore((prev) => {
      const alreadySaved = prev.saved.some((item) => item.id === workout.id);

      if (alreadySaved) {
        return prev;
      }

      return {
        ...prev,
        saved: [...prev.saved, workout],
      };
    });
  }, []);

  // Remove saved workout
  const removeSaved = useCallback((id: number) => {
    setStore((prev) => ({
      ...prev,
      saved: prev.saved.filter((item) => item.id !== id),
    }));
  }, []);

  // Mark/unmark workout as done
  const toggleDone = useCallback((id: number) => {
    setStore((prev) => {
      const alreadyDone = prev.done.includes(id);

      return {
        ...prev,
        done: alreadyDone
          ? prev.done.filter((item) => item !== id)
          : [...prev.done, id],
      };
    });
  }, []);

  // Check whether workout is in plan
  const isInPlan = useCallback(
    (id: number) => {
      return store.plan.some((item) => item.id === id);
    },
    [store.plan],
  );

  // Check whether workout is saved
  const isSaved = useCallback(
    (id: number) => {
      return store.saved.some((item) => item.id === id);
    },
    [store.saved],
  );

  // Memoize Context value
  const value = useMemo<FitlogContextValue>(
    () => ({
      store,
      addToPlan,
      removeFromPlan,
      savedWorkout,
      removeSaved,
      toggleDone,
      isInPlan,
      isSaved,
    }),
    [
      store,
      addToPlan,
      removeFromPlan,
      savedWorkout,
      removeSaved,
      toggleDone,
      isInPlan,
      isSaved,
    ],
  );

  return (
    <FitlogContext.Provider value={value}>{children}</FitlogContext.Provider>
  );
}

export function useFitlog() {
  const context = useContext(FitlogContext);

  if (!context) throw new Error("useFitlog must be used inside FitlogProvider");

  return context;
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

/* So the relationship becomes:

FitlogContextValue
        │
        ├── store
        ├── addToPlan()
        ├── removeFromPlan()
        ├── savedWorkout()
        ├── removeSaved()
        ├── toggleDone()
        ├── isInPlan()
        └── isSaved()
             ▲
             │
       Provider value


So the ideal pattern for your FitLog Context is:

useState
   ↓
useCallback → actions
   ↓
useMemo → context value
   ↓
Context.Provider

                    FitlogProvider
                          │
                    ┌─────▼─────┐
                    │ useState  │
                    │  store    │
                    └─────┬─────┘
                          │
              ┌───────────┴───────────┐
              │                       │
         useCallback              useEffect
              │                       │
        actions/functions        localStorage
              │
              ▼
          useMemo
              │
              ▼
       Context Provider
              │
              ▼
        useFitlog()


Add workout
    ↓
Already exists?
    ├── Yes → return prev
    │
    └── No
         ↓
    plan.length >= 5?
         ├── Yes → return prev
         │
         └── No
              ↓
         Add workout
*/
