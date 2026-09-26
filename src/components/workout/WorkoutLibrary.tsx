import { getAllWorkouts } from "@/lib/api";

import LibrarySection from "./LibrarySection";
import WorkoutLibraryError from "./WorkoutLibraryError";

export default async function WorkoutLibrary() {
  try {
    const workouts = await getAllWorkouts();

    return <LibrarySection workouts={workouts} />;
  } catch (error) {
    console.error("Failed to load workouts:", error);

    return <WorkoutLibraryError />;
  }
}
