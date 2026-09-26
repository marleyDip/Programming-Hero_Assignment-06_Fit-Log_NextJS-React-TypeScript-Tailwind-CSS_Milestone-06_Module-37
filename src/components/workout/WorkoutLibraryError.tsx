export default function WorkoutLibraryError() {
  return (
    <section className="border-b border-border">
      <div className="container-page py-20">
        <div className="mx-auto flex max-w-md flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card">
            <span className="text-xl text-secondary">!</span>
          </div>

          <h2 className="mt-5 text-xl font-semibold text-text">
            Unable to load workouts
          </h2>

          <p className="mt-2 text-sm leading-6 text-muted-soft">
            We couldn&apos;t load the workout library right now. Please try
            again later.
          </p>
        </div>
      </div>
    </section>
  );
}

/* export default function WorkoutLibraryError() {
  return (
    <section className="container-page py-20">
      <div className="flex flex-col items-center justify-center text-center">
        <h2 className="text-xl font-semibold text-primary">
          Unable to load workouts
        </h2>

        <p className="mt-2 text-sm text-muted-soft">
          Something went wrong while loading the workout library.
        </p>
      </div>
    </section>
  );
} */

/* "use client";

type WorkoutLibraryErrorProps = {
  reset: () => void;
};

export default function WorkoutLibraryError({
  reset,
}: WorkoutLibraryErrorProps) {
  return (
    <section className="container-page py-20">
      <div className="flex flex-col items-center justify-center text-center">
        <h2 className="text-xl font-semibold text-primary">
          Unable to load workouts
        </h2>

        <p className="mt-2 text-sm text-muted-soft">
          Something went wrong while loading the workout library.
        </p>

        <button
          onClick={reset}
          className="mt-6 rounded-full bg-accent px-5 py-2 text-sm font-semibold text-primary transition-opacity hover:opacity-80"
        >
          Try Again
        </button>
      </div>
    </section>
  );
}
 */
