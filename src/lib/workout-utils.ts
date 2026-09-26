import { SortKey, Workout } from "./types";

export function filterAndSortWorkouts(
  workouts: Workout[],
  query: string,
  sortKey: SortKey,
): Workout[] {
  const q = query.trim().toLowerCase();

  const filtered = q
    ? workouts.filter(
        (workout) =>
          workout.name.toLowerCase().includes(q) ||
          workout.muscleGroups.some((group) => group.toLowerCase().includes(q)),
      )
    : workouts;

  return [...filtered].sort((a, b) => {
    switch (sortKey) {
      case "duration":
        return a.duration - b.duration;

      case "calories":
        return a.caloriesBurned - b.caloriesBurned;

      case "rating":
        return b.rating - a.rating;

      default:
        return 0;
    }
  });
}
