"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function HeroImage() {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;

    if (!scene) return;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = scene.getBoundingClientRect();

      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      scene.style.setProperty("--mouse-x", `${x}`);
      scene.style.setProperty("--mouse-y", `${y}`);
    };

    const handleMouseLeave = () => {
      scene.style.setProperty("--mouse-x", "0");
      scene.style.setProperty("--mouse-y", "0");
    };

    scene.addEventListener("mousemove", handleMouseMove);
    scene.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      scene.removeEventListener("mousemove", handleMouseMove);
      scene.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={sceneRef}
      className="group relative mx-auto flex aspect-square w-full max-w-md items-center justify-center perspective-[1400px] [--mouse-x:0] [--mouse-y:0]"
    >
      {/* DEPTH 0 — Ambient background */}
      <div
        className=" absolute left-1/2 top-1/2 h-[75%] w-[75%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-500/10 blur-[80px] transition-transform duration-700 ease-out group-hover:scale-110"
        style={{
          transform:
            "translate3d(calc(-50% + var(--mouse-x) * -15px), calc(-50% + var(--mouse-y) * -15px), -100px)",
        }}
      />

      {/* DEPTH 1 — Orbit rings */}
      <div
        className="absolute inset-[9%] rounded-full border border-white/8 transition-transform duration-500 ease-out"
        style={{
          transform:
            "translate3d(calc(var(--mouse-x) * -12px), calc(var(--mouse-y) * -12px), -60px) rotateX(65deg) rotateZ(-12deg)",
        }}
      />

      <div
        className="absolute inset-[17%] rounded-full border border-fuchsia-400/12 transition-transform duration-500 ease-out"
        style={{
          transform:
            "translate3d(calc(var(--mouse-x) * -20px), calc(var(--mouse-y) * -20px), -40px) rotateX(65deg) rotateZ(25deg)",
        }}
      />

      {/* DEPTH 2 — Glass platform */}
      <div
        className="absolute inset-[8%] rounded-[2.5rem] border border-white/8 bg-white/25 backdrop-blur-[2px] shadow-2xl transition-transform duration-300 ease-out"
        style={{
          transform:
            "translate3d(calc(var(--mouse-x) * -8px), calc(var(--mouse-y) * -8px), -20px) rotateX(calc(var(--mouse-y) * -5deg)) rotateY(calc(var(--mouse-x) * 5deg))",
        }}
      />

      {/* DEPTH 3 — Main image */}
      <div
        className="relative z-10 aspect-square w-full max-w-[384px] transform-gpu transition-transform duration-200 ease-out"
        style={{
          transform:
            "translate3d(calc(var(--mouse-x) * 15px), calc(var(--mouse-y) * 15px), 80px) rotateX(calc(var(--mouse-y) * -10deg)) rotateY(calc(var(--mouse-x) * 10deg))",
        }}
      >
        {/* Ground shadow */}
        <div className="absolute left-1/2 bottom-[10%] h-[15%] w-[65%] -translate-x-1/2 rounded-full bg-black/30 blur-3xl transition-transform duration-500" />

        {/* Image */}
        <Image
          src="/images/banner.png"
          alt="FitLog Workout Banner"
          width={384}
          height={384}
          priority
          className="relative z-10 h-auto w-full object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.28)] transition-transform duration-500 ease-out group-hover:scale-[1.025]"
        />
      </div>

      {/* DEPTH 4 — Floating workout card */}
      <div
        className="absolute left-[1%] bottom-[14%] z-20 rounded-2xl border border-white/10 bg-black/45 px-4 py-3 shadow-xl backdrop-blur-xl transition-transform duration-200 ease-out"
        style={{
          transform:
            "translate3d(calc(var(--mouse-x) * 28px), calc(var(--mouse-y) * 28px), 140px) rotateX(calc(var(--mouse-y) * -5deg)) rotateY(calc(var(--mouse-x) * 5deg))",
        }}
      >
        <p className="text-[10px] uppercase tracking-[0.2em] text-white/45">
          Today&apos;s Goal
        </p>

        <div className="mt-1 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />

          <p className="text-sm font-semibold text-white">Stay Consistent</p>
        </div>
      </div>

      {/* DEPTH 5 — Workout statistics */}
      <div
        className="absolute right-[0%] top-[17%] z-20 rounded-2xl border border-white/10 bg-black/45 px-4 py-3 shadow-xl backdrop-blur-xl transition-transform duration-200 ease-out"
        style={{
          transform:
            "translate3d(calc(var(--mouse-x) * 38px), calc(var(--mouse-y) * 38px), 180px) rotateX(calc(var(--mouse-y) * -7deg)) rotateY(calc(var(--mouse-x) * 7deg))",
        }}
      >
        <p className="text-xs text-white/45">Workout</p>

        <p className="mt-1 text-xl font-bold text-white">
          45
          <span className="ml-1 text-xs font-normal text-white/45">min</span>
        </p>
      </div>

      {/* DEPTH 6 — Floating particles */}
      <span
        className="absolute right-[15%] bottom-[19%] z-30 h-3 w-3 rounded-full bg-fuchsia-400 shadow-lg shadow-fuchsia-500/40 transition-transform duration-200"
        style={{
          transform:
            "translate3d(calc(var(--mouse-x) * 55px), calc(var(--mouse-y) * 55px), 220px)",
        }}
      />

      <span
        className="absolute left-[18%] top-[22%] z-30 h-2 w-2 rounded-full bg-violet-400 shadow-lg shadow-violet-500/40 transition-transform duration-200"
        style={{
          transform:
            "translate3d(calc(var(--mouse-x) * 65px), calc(var(--mouse-y) * 65px), 200px)",
        }}
      />
    </div>
  );
}

/* How the 3D depth works

The important part is that each layer has a different movement multiplier:

  Background glow       →  -15px
  Orbit rings           →  -12px / -20px
  Glass platform        →  -8px
  Main image            →  +15px
  Goal card             →  +28px
  Stats card            →  +38px
  Particles             →  +55px / +65px

So when you move your mouse:

             🟣 Particle
                 ↗
       ┌─────────────────┐
       │    Stats Card   │  ← moves more
       │                 │
       │   🏃 BANNER     │  ← main depth
       │                 │
       │ Goal Card       │  ← moves less
       └─────────────────┘
          ◯ Orbit
       Background Glow

That difference in movement is what creates the parallax/depth illusion.

One important improvement over the previous version is that I'm using translate3d(..., ..., 80px) and progressively larger Z-depth values. Combined with perspective: 1400px, the browser actually renders the layers as a 3D scene rather than just moving flat elements around.

*/
