export default function WorkoutCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      {/* Image */}
      <div className="aspect-video animate-pulse bg-panel-skeleton" />

      <div className="space-y-4 p-5">
        {/* Title */}
        <div className="h-6 w-3/4 animate-pulse rounded bg-panel-skeleton" />

        {/* Tags */}
        <div className="flex gap-2">
          <div className="h-6 w-16 animate-pulse rounded-full bg-panel-skeleton" />
          <div className="h-6 w-20 animate-pulse rounded-full bg-panel-skeleton" />
        </div>

        {/* Details */}
        <div className="flex gap-4">
          <div className="h-4 w-20 animate-pulse rounded bg-panel-skeleton" />
          <div className="h-4 w-20 animate-pulse rounded bg-panel-skeleton" />
        </div>
      </div>
    </div>
  );
}

/* export default function WorkoutCardSkeleton() {
  return (
    <div className="animate-pulse-soft overflow-hidden border-border bg-card">
      <div className="h-44 w-full bg-panel-skeleton" />

      <div className="flex flex-col gap-3 p-4">
        <div className="h-4 w-3/4 rounded bg-panel-skeleton" />

        <div className="h-3 w-1/2 rounded bg-panel-skeleton" />

        <div className="h-3 w-full rounded bg-panel-skeleton" />
      </div>
    </div>
  );
}
 */
