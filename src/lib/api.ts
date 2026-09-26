import { Workout } from "./types";

export const BASE_URL = "https://api.abcz.workers.dev/api/fitlog";

// Used here, ISR (incremental Static Regeneration) => API -> cache -> revalidate after 1 hour
// I think, the workout data doesn't need to be real-time that's why used ISR over "no-store".
export async function getAllWorkouts(): Promise<Workout[]> {
  // Here, fetch the data and store in response variable.
  const response = await fetch(BASE_URL, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Failed to load workouts (${response.status})`);
  }

  // Converting the API response into a JavaScript Value and return it.
  return response.json();
}

// Next.js `[id]` accepting a `string`, because route params are strings. So i will keep the id type only string, not number. Otherwise type => id: number | string
const getWorkoutById = async (id: string): Promise<Workout | null> => {
  const workoutId = Number(id);

  if (!Number.isInteger(workoutId)) {
    return null;
  }

  const res = await fetch(`${BASE_URL}/${workoutId}`, {
    next: { revalidate: 3600 },
  });

  if (res.ok) {
    const data: Workout | Workout[] = await res.json();

    // Nullish Coalescing Operator (??) - returns right side value only when left side value is null or undefined.
    if (Array.isArray(data)) {
      return data.find((workout) => workout.id === workoutId) ?? null;
    }

    return data;
  }

  if (res.status === 404) return null;

  /* if (!res.ok) {
    const workouts = await getAllWorkouts();

    // By default, URL / route param returns string, so convert number to string.
    return workouts.find((w) => String(w.id) === String(id)) ?? null;
  } */

  // If the detail endpoint doesn't work, find the workout from the full list
  const workouts = await getAllWorkouts();

  return workouts.find((workout) => workout.id === workoutId) ?? null;

  // return res.json();
};

export { getWorkoutById };

export async function getWorkouts(signal?: AbortSignal): Promise<Workout[]> {
  const response = await fetch(BASE_URL, {
    next: { revalidate: 3600 },
    signal,
  });

  if (!response.ok) {
    throw new Error(`Failed to load workouts (${response.status})`);
  }

  return response.json();
}

/* Here, we know already, "/api/fitlog/:id" always return one workout object. But here, i was make the code more defensive because the API might return either: 
                i) an object -> { ... }
                ii) an array -> [ { ... }, { ... }]  

Behind the Logic:
API response
     │
     ▼
  response.json()
     │
     ▼
    data
     │
     ├── Is it an array?
     │       │
     │       ├── YES → find workout by ID
     │       │
     │       └── NO  → return the object directly
     │
     ▼
 Workout | null

The detail API guarantees is a object, then this extra check isn't necessary. Do this for learning purpose.

    /api/fitlog/5 => { id: 5, ... }

*/
