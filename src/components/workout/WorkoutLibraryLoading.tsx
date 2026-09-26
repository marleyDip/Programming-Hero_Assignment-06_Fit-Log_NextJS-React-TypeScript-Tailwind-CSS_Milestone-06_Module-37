import WorkoutCardSkeleton from "./WorkoutCardSkeleton";

export default function WorkoutLibraryLoading() {
  return (
    <section aria-label="Loading workout library" className="">
      <div className="container-page">
        {/* Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="h-9 w-44 animate-pulse rounded-lg bg-panel-skeleton" />

            <div className="mt-2 h-4 w-72 max-w-full animate-pulse rounded bg-panel-skeleton" />
          </div>

          {/* Search & Sort */}
          <div className="flex flex-col gap-3 md:flex-row">
            <div className="h-10 w-full animate-pulse rounded-full bg-panel-skeleton md:w-60" />

            <div className="h-10 w-full animate-pulse rounded-full bg-panel-skeleton md:w-40" />
          </div>
        </div>

        {/* Cards */}
        <div className="mt-6 grid grid-cols-1 gap-6 md:mt-8 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <WorkoutCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* import WorkoutCardSkeleton from "./WorkoutCardSkeleton";

export default function WorkoutLibraryLoading() {
  return (
    <section className="container-page py-20">
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 8 }).map((_, index) => (
          <WorkoutCardSkeleton key={index} />
        ))}
      </div>
    </section>
  );
}
*/
