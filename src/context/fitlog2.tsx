"use client";

import { Workout } from "@/lib/types";
import React, { createContext, useContext, useEffect, useState } from "react";

type Store = {
  plan: Workout[];
  saved: Workout[];
  done: number[];
};

const FitlogContext = createContext<Store | null>(null);

const KEY = "fitlog-store-v1";

const initialStore: Store = {
  plan: [],
  saved: [],
  done: [],
};

export function FitlogProvider2({ children }: { children: React.ReactNode }) {
  // const [store, setStore] = useState<Store>({ plan: [], saved: [], done: [] });

  const [store, setStore] = useState<Store>(initialStore);

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);

      if (raw) {
        const parsed: Store = JSON.parse(raw);
        setStore(parsed);
      }
    } catch {
      // Ignore invalid localStorage data
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    try {
      localStorage.setItem(KEY, JSON.stringify(store));
    } catch {
      // Ignore localStorage errors
    }
  }, [store, hydrated]);

  const value = {
    store,
    setStore,
    hydrated,
  };

  return (
    <FitlogContext.Provider value={value}>{children}</FitlogContext.Provider>
  );
}

export function useFitlog2() {
  const c = useContext(FitlogContext);

  if (!c) throw new Error("useFitlog must be used inside FitlogProvider");

  return c;
}

/* his warning is from the newer React/ESLint rule about calling a state setter synchronously inside useEffect.

  useEffect(() => {
    const raw = localStorage.getItem(KEY);

    if (raw) setStore(JSON.parse(raw));

    setHydrated(true);
  }, []);

does this sequence:

  Initial render
      ↓
  useEffect runs
      ↓
  setStore(...)
      ↓
  another render

The linter warns because the effect is being used to immediately derive/update React state.

For your case, though, localStorage is only available in the browser, so you still need client-side hydration.

the warning can still remain because setStore() is still inside the effect.

For a localStorage-backed store, I would actually recommend a different architecture.

Best practical solution for FitLog

Use a lazy state initializer:

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

  Then you don't need the first effect at all:

  One important Next.js consideration

There's a subtle issue here: server rendering and browser rendering can have different initial values.

On the server:

  typeof window === "undefined"

so: initialStore is returned.

In the browser, the initializer may return the localStorage value.

That can potentially create a hydration mismatch.

So if your FitLog app is using SSR and you want the most robust architecture, I'd keep the hydration boundary and avoid rendering localStorage-dependent UI until hydration is complete.

the key conceptual distinction is:

  useState(() => ...)
          ↑
  Read initial state

  useEffect(...)
          ↑
  Synchronize with external systems

localStorage is an external system, so the write belongs in useEffect. Reading it to construct the initial client state can be done through the lazy initializer.

*/
