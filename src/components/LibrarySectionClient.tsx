"use client";

import { getAllWorkouts, getWorkouts } from "@/lib/api";
import { SortKey, Workout } from "@/lib/types";
import { useEffect, useMemo, useState } from "react";

export default function LibrarySection() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // const [error, setError] = useState(false);

  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("duration");

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("duration");

  useEffect(() => {
    const controller = new AbortController();

    const loadWorkouts = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getWorkouts(controller.signal);
        setWorkouts(data);
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }

        setError(
          error instanceof Error ? error.message : "Failed to load workouts",
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadWorkouts();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    getAllWorkouts()
      .then(setWorkouts)
      .catch(() =>
        setError(
          "Unable to load the workout library. Please refresh and try again.",
        ),
      )
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    let mounted = true;

    getAllWorkouts()
      .then((data) => {
        if (mounted) setWorkouts(data);
      })
      .catch(() => {
        /* if (mounted) setError(true); */

        if (mounted)
          setError(
            "Unable to load the workout library. Please refresh and try again.",
          );
      })
      .finally(() => {
        if (mounted) setIsLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const filter = useMemo(
    () =>
      workouts
        .filter(
          (w) =>
            w.name.toLowerCase().includes(search.toLowerCase()) ||
            w.muscleGroups.some((m) =>
              m.toLowerCase().includes(search.toLowerCase()),
            ),
        )
        .sort((a, b) =>
          sort === "rating"
            ? b.rating - a.rating
            : sort === "calories"
              ? b.caloriesBurned - a.caloriesBurned
              : a.duration - b.duration,
        ),
    [workouts, search, sort],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    let list = workouts;

    if (q) {
      list = list.filter(
        (w) =>
          w.name.toLowerCase().includes(q) ||
          w.muscleGroups.some((tag) => tag.toLowerCase().includes(q)),
      );
    }

    const sorted = [...list].sort((a, b) => {
      if (sortKey === "duration") return a.duration - b.duration;

      if (sortKey === "calories") return a.caloriesBurned - b.caloriesBurned;

      return b.rating - a.rating;
    });
  }, [workouts, query, sortKey]);

  return <div>LibrarySection</div>;
}
