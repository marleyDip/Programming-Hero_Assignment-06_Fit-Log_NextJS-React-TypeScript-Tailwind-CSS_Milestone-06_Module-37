export default function Loading() {
  return (
    <section className="container-page p-6 md:p-12">
      {/* Header */}
      <div className="flex flex-col gap-8 border-b border-[#252b28] pb-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          {/* Training log */}
          <div className="h-3 w-20 animate-pulse rounded bg-primary/20" />

          {/* Heading */}
          <div className="mt-4 h-10 w-40 animate-pulse rounded-lg bg-white/10 md:h-11 md:w-48" />

          {/* Description */}
          <div className="mt-4 h-4 w-72 max-w-full animate-pulse rounded bg-white/5" />
        </div>

        {/* Browse workouts button */}
        <div className="h-11 w-40 animate-pulse rounded-xl bg-white/5" />
      </div>

      {/* Metrics */}
      <div className="mt-6 grid gap-3 md:mt-8 sm:grid-cols-3">
        <MetricSkeleton />
        <MetricSkeleton />
        <MetricSkeleton />
      </div>

      {/* Tabs & Filters */}
      <div className="mt-10 flex flex-col gap-4 rounded-2xl border border-[#252b28] bg-[#101312] p-2 md:flex-row md:items-center md:justify-between">
        {/* Tabs */}
        <div className="flex rounded-xl bg-[#0b0e0d] p-1">
          <div className="h-10 w-28 animate-pulse rounded-lg bg-white/10" />
          <div className="h-10 w-20 animate-pulse rounded-lg bg-white/5" />
        </div>

        {/* Search & Sort */}
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="h-10 w-full animate-pulse rounded-xl bg-white/5 sm:w-52" />
          <div className="h-10 w-full animate-pulse rounded-xl bg-white/5 sm:w-32" />
        </div>
      </div>

      {/* Result info */}
      <div className="mt-5 flex items-center justify-between">
        <div className="h-3 w-28 animate-pulse rounded bg-white/5" />
      </div>

      {/* Workout list */}
      <div className="mt-3 grid gap-3">
        <PlanCardSkeleton />
        <PlanCardSkeleton />
        <PlanCardSkeleton />
      </div>
    </section>
  );
}

/* Metric Skeleton */
function MetricSkeleton() {
  return (
    <div className="rounded-2xl border border-[#252b28] bg-[#111414] p-5 md:p-6">
      <div className="flex items-center justify-between">
        {/* Icon */}
        <div className="size-5 animate-pulse rounded bg-white/5" />

        {/* Live */}
        <div className="h-2 w-8 animate-pulse rounded bg-white/5" />
      </div>

      {/* Value */}
      <div className="mt-5 h-10 w-14 animate-pulse rounded-lg bg-white/10" />

      {/* Label */}
      <div className="mt-2 h-2 w-16 animate-pulse rounded bg-white/5" />
    </div>
  );
}

/* Plan Card Skeleton */
function PlanCardSkeleton() {
  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-[#252b28] bg-[#111414] p-3 sm:flex-row sm:items-center md:p-4">
      {/* Image */}
      <div className="h-24 w-full animate-pulse rounded-xl bg-white/5 sm:h-20 sm:w-28 sm:shrink-0" />

      {/* Content */}
      <div className="min-w-0 flex-1">
        {/* Workout name */}
        <div className="h-5 w-44 animate-pulse rounded bg-white/10" />

        {/* Equipment */}
        <div className="mt-2 h-3 w-24 animate-pulse rounded bg-white/5" />

        {/* Workout metrics */}
        <div className="mt-3 flex gap-3 md:gap-4">
          <div className="h-3 w-12 animate-pulse rounded bg-white/5" />
          <div className="h-3 w-16 animate-pulse rounded bg-white/5" />
          <div className="h-3 w-10 animate-pulse rounded bg-white/5" />
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-2 sm:justify-end">
        {/* View details */}
        <div className="h-9 w-24 animate-pulse rounded-full bg-white/5" />

        {/* Done */}
        <div className="size-9 animate-pulse rounded-full bg-white/5" />

        {/* Delete */}
        <div className="size-9 animate-pulse rounded-full bg-white/5" />
      </div>
    </article>
  );
}

// export default function LoadingMyPlan() {
//   return (
//     <main className="container-page py-10 md:py-16">
//       {/* Page Header */}
//       <div className="mb-10">
//         <div className="h-3 w-20 animate-pulse rounded bg-white/10" />

//         <div className="mt-4 h-10 w-52 animate-pulse rounded-lg bg-white/10" />

//         <div className="mt-3 h-4 w-80 max-w-full animate-pulse rounded bg-white/5" />
//       </div>

//       {/* Tabs */}
//       <div className="mb-6 flex gap-2">
//         <div className="h-10 w-24 animate-pulse rounded-full bg-white/10" />
//         <div className="h-10 w-24 animate-pulse rounded-full bg-white/5" />
//       </div>

//       {/* Search + Sort */}
//       <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//         <div className="h-11 w-full animate-pulse rounded-xl border border-white/5 bg-white/[0.03] sm:max-w-md" />

//         <div className="h-11 w-full animate-pulse rounded-xl border border-white/5 bg-white/[0.03] sm:w-40" />
//       </div>

//       {/* Workout Cards */}
//       <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
//         {[1, 2, 3].map((item) => (
//           <WorkoutSkeleton key={item} />
//         ))}
//       </div>
//     </main>
//   );
// }

// function WorkoutSkeleton() {
//   return (
//     <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
//       {/* Image */}
//       <div className="aspect-[16/10] w-full animate-pulse bg-white/5" />

//       {/* Content */}
//       <div className="space-y-4 p-5">
//         {/* Category */}
//         <div className="h-3 w-20 animate-pulse rounded bg-white/10" />

//         {/* Title */}
//         <div className="space-y-2">
//           <div className="h-5 w-3/4 animate-pulse rounded bg-white/10" />
//           <div className="h-5 w-1/2 animate-pulse rounded bg-white/5" />
//         </div>

//         {/* Description */}
//         <div className="space-y-2">
//           <div className="h-3 w-full animate-pulse rounded bg-white/5" />
//           <div className="h-3 w-4/5 animate-pulse rounded bg-white/5" />
//         </div>

//         {/* Meta */}
//         <div className="flex gap-3 pt-2">
//           <div className="h-8 w-20 animate-pulse rounded-full bg-white/5" />
//           <div className="h-8 w-20 animate-pulse rounded-full bg-white/5" />
//         </div>

//         {/* Button */}
//         <div className="h-10 w-full animate-pulse rounded-xl bg-white/10" />
//       </div>
//     </div>
//   );
// }
