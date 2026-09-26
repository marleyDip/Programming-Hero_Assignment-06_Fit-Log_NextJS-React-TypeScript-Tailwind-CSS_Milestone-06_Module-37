export default function LoadingWorkout() {
  return (
    <div className="grid-noise">
      <section className="container-page py-10 md:py-16">
        {/* Back link skeleton */}
        <div className="mb-8 flex items-center gap-2">
          <div className="h-3 w-3 animate-pulse-soft rounded-full bg-card" />
          <div className="h-3 w-28 animate-pulse-soft rounded-full bg-card" />
        </div>

        <div className="grid gap-8 md:gap-12 lg:grid-cols-[.9fr_1.1fr]">
          {/* Left - Image skeleton */}
          <div className="aspect-square w-full animate-pulse-soft rounded-2xl border border-border bg-card lg:aspect-auto lg:h-full lg:min-h-175" />

          {/* Right - Details */}
          <div className="flex flex-col justify-center">
            {/* Breadcrumb / category */}
            <div className="h-3 w-32 animate-pulse-soft rounded-full bg-card" />

            {/* Title */}
            <div className="mt-4 space-y-2">
              <div className="h-10 w-4/5 animate-pulse-soft rounded bg-card" />
              <div className="h-10 w-3/5 animate-pulse-soft rounded bg-card" />
            </div>

            {/* Description */}
            <div className="mt-4 space-y-2">
              <div className="h-4 w-full animate-pulse-soft rounded bg-card" />
              <div className="h-4 w-11/12 animate-pulse-soft rounded bg-card" />
              <div className="h-4 w-3/4 animate-pulse-soft rounded bg-card" />
            </div>

            {/* Muscle groups */}
            <div className="mt-5 flex flex-wrap gap-2.5">
              <div className="h-7 w-20 animate-pulse-soft rounded-full bg-card" />
              <div className="h-7 w-24 animate-pulse-soft rounded-full bg-card" />
              <div className="h-7 w-16 animate-pulse-soft rounded-full bg-card" />
            </div>

            {/* Stats grid */}
            <div className="mt-7 grid grid-cols-2 overflow-hidden rounded-2xl border border-border bg-[#111414] sm:grid-cols-3">
              {Array.from({ length: 7 }).map((_, index) => (
                <div
                  key={index}
                  className="border-b border-r border-[#242a27] p-4"
                >
                  <div className="h-2 w-16 animate-pulse-soft rounded-full bg-card" />
                  <div className="mt-2 h-4 w-20 animate-pulse-soft rounded bg-card" />
                </div>
              ))}
            </div>

            {/* Instructions */}
            <div className="mt-8">
              <div className="h-5 w-28 animate-pulse-soft rounded bg-card" />

              <div className="mt-4 grid gap-3">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex gap-4 rounded-xl border border-[#242a27] bg-[#101312] p-4"
                  >
                    {/* Number */}
                    <div className="h-5 w-6 shrink-0 animate-pulse-soft rounded bg-card" />

                    {/* Instruction text */}
                    <div className="flex-1 space-y-2">
                      <div className="h-3.5 w-full animate-pulse-soft rounded bg-card" />
                      <div className="h-3.5 w-4/5 animate-pulse-soft rounded bg-card" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-9 grid gap-3 sm:grid-cols-2">
              <div className="h-12 animate-pulse-soft rounded-xl bg-card" />
              <div className="h-12 animate-pulse-soft rounded-xl bg-card" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* export default function LoadingWorkout() {
  return (
    <div className="container-page py-10 md:py-14">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="aspect-square w-full animate-pulse-soft rounded-2xl border border-base-border bg-base-card lg:aspect-auto lg:h-full lg:min-h-130" />
        <div className="flex flex-col gap-4">
          <div className="h-6 w-40 animate-pulse-soft rounded-full bg-base-card" />
          <div className="h-10 w-3/4 animate-pulse-soft rounded bg-base-card" />
          <div className="h-16 w-full animate-pulse-soft rounded bg-base-card" />
          <div className="h-56 w-full animate-pulse-soft rounded-2xl bg-base-card" />
        </div>
      </div>
    </div>
  );
}
 */
