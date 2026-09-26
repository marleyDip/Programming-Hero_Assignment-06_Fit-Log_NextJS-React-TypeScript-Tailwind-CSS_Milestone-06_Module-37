import Hero from "@/components/Hero";
import WorkoutLibrary from "@/components/workout/WorkoutLibrary";
import WorkoutLibraryLoading from "@/components/workout/WorkoutLibraryLoading";
import { Suspense } from "react";

export default async function Home() {
  return (
    <>
      <Hero />

      <Suspense fallback={<WorkoutLibraryLoading />}>
        <WorkoutLibrary />
      </Suspense>

      {/* <WorkoutLibraryWrapper /> */}
    </>
  );
}

/* 
                    page.tsx
                       │
                ┌──────┴──────┐
                │             │
              Hero          Suspense
                              │
                    ┌─────────┴─────────┐
                    │                   │
               Loading             WorkoutLibrary
                                        │
                                  getAllWorkouts()
                                        │
                              ┌─────────┴─────────┐
                              │                   │
                           success              error
                              │                   │
                       LibrarySection       Error UI
                              │
                    ┌─────────┴─────────┐
                    │                   │
                 Search              Sort
                    │                   │
                 Client              Client

*/

/* 
                    Home
                     │
          ┌──────────┴──────────┐
          │                     │
        Hero             WorkoutLibraryWrapper
                                │
                       Error Boundary
                                │
                           Suspense
                         ┌──────┴──────┐
                         │             │
                      Loading       Success
                         │             │
                  8 Skeletons     WorkoutLibrary
                                       │
                                 getAllWorkouts()
                                       │
                                       ▼
                                  API + ISR
                                       │
                                       ▼
                                LibrarySection
                                  │        │
                               Search     Sort


page.tsx                         Server
│
├── Hero                         Server
│
└── Suspense
     │
     └── WorkoutLibrary          Server/async
          │
          ├── LibrarySection     Client
          │
          └── Error UI
               └── Retry         Client


               
Home
│
├── Hero                    ← always renders
│
└── Suspense
     │
     ├── Loading             → 8 skeleton cards
     │
     └── ErrorBoundary
          │
          ├── Error          → workout error UI
          │
          └── WorkoutLibrary
               │
               └── LibrarySection

*/

/*  
page.tsx
  │
  ├── getAllWorkouts()
  │       │
  │       ├── loading → loading.tsx
  │       │
  │       ├── error   → error.tsx
  │       │
  │       └── success
  │             │
  │             ▼
  │       LibrarySection
  │             │
  │             ├── search
  │             └── sorting

page.tsx → data fetching

LibrarySection.tsx → interactivity

loading.tsx → loading UI

error.tsx → error UI
*/
