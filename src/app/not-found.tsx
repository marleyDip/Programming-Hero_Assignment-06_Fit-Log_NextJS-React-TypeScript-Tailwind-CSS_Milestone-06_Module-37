import { ArrowLeft, Compass } from "@/components/shared/icons";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page relative flex min-h-[70vh] items-center justify-center overflow-hidden py-20">
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl"
      />

      <div className="relative w-full max-w-xl text-center">
        {/* Icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-card/80 shadow-[0_0_40px_rgba(194,248,0,0.06)] backdrop-blur-sm">
          <Compass aria-hidden="true" className="h-7 w-7 text-primary" />
        </div>

        {/* 404 */}
        <p className="mt-8 font-secondary text-7xl/[0.9] font-bold tracking-tight text-primary sm:text-8xl">
          404
        </p>

        {/* Heading */}
        <h1 className="mt-5 text-2xl font-bold tracking-tight text-text sm:text-3xl">
          Lift not found
        </h1>

        {/* Description */}
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-soft sm:text-base">
          Looks like this lift has left the library. The page may have moved,
          been removed, or never existed in the first place.
        </p>

        {/* CTA */}
        <div className="mt-8 flex justify-center">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-black shadow-[0_8px_30px_rgba(194,248,0,0.12)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-secondary hover:shadow-[0_10px_35px_rgba(194,248,0,0.18)] focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            <ArrowLeft
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5"
            />
            Back to workouts
          </Link>
        </div>

        {/* Bottom status */}
        <div className="mx-auto mt-10 flex w-fit items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-2 text-[11px] font-medium uppercase tracking-wider text-muted-soft backdrop-blur-sm">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(194,248,0,0.6)]"
          />
          FitLog Workout Library
        </div>
      </div>
    </div>
  );
}

/* import { Compass } from "@/components/shared/icons";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center gap-4 py-20 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-base-card text-primary">
        <Compass className="h-7 w-7" />
      </span>

      <h1 className=" text-5xl font-bold text-primary">404</h1>

      <h2 className=" text-xl font-bold uppercase tracking-wide">
        Lift not found
      </h2>

      <p className="max-w-sm text-sm text-muted-soft">
        That page doesn&apos;t exist, or the lift may have been removed from the
        library.
      </p>

      <Link
        href="/"
        className="mt-2 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2.5 font-bold uppercase tracking-wide text-base transition-transform hover:scale-[1.03]"
      >
        Back to workouts
      </Link>
    </div>
  );
}
 */
