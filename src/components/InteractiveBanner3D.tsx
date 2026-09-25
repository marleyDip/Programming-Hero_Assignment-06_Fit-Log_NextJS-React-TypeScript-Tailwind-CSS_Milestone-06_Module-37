"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function HeroImage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();

      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      container.style.setProperty("--rotate-x", `${-y * 12}deg`);
      container.style.setProperty("--rotate-y", `${x * 12}deg`);
      container.style.setProperty("--move-x", `${x * 12}px`);
      container.style.setProperty("--move-y", `${y * 12}px`);
    };

    const handleLeave = () => {
      container.style.setProperty("--rotate-x", "0deg");
      container.style.setProperty("--rotate-y", "0deg");
      container.style.setProperty("--move-x", "0px");
      container.style.setProperty("--move-y", "0px");
    };

    container.addEventListener("mousemove", handleMove);
    container.addEventListener("mouseleave", handleLeave);

    return () => {
      container.removeEventListener("mousemove", handleMove);
      container.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="group relative mx-auto flex aspect-square w-full max-w-md items-center justify-center perspective-distant"
      style={
        {
          "--rotate-x": "0deg",
          "--rotate-y": "0deg",
          "--move-x": "0px",
          "--move-y": "0px",
        } as React.CSSProperties
      }
    >
      {/* Ambient depth layers */}
      <div className="absolute inset-[12%] rounded-full bg-fuchsia-500/10 blur-3xl" />

      <div className="absolute right-[8%] top-[12%] h-24 w-24 rounded-full bg-violet-500/10 blur-2xl" />

      {/* 3D floating platform */}
      <div
        className=" absolute inset-[7%] rounded-4xl border border-white/10 bg-white/[0.035] shadow-2xl shadow-black/20 backdrop-blur-sm transition-transform duration-200 ease-out"
        style={{
          transform:
            "translate3d(var(--move-x), var(--move-y), 0) rotateX(var(--rotate-x)) rotateY(var(--rotate-y))",
        }}
      />

      {/* Back glow ring */}
      <div className="absolute inset-[13%] rounded-full border border-fuchsia-400/20 transition-transform duration-300 group-hover:scale-105" />

      {/* Main 3D image */}
      <div
        className="relative z-10 w-full max-w-[384px] aspect-square transform-gpu transition-transform duration-200 ease-out"
        style={{
          transform:
            "translate3d(var(--move-x), var(--move-y), 60px) rotateX(var(--rotate-x)) rotateY(var(--rotate-y))",
        }}
      >
        {/* Image shadow */}
        <div className="absolute inset-[12%] translate-y-8 rounded-full bg-black/30 blur-3xl" />

        <Image
          src="/images/banner.png"
          alt="FitLog Workout Banner"
          width={384}
          height={384}
          priority
          className="relative z-10 h-auto w-full object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.25)] transition-transform duration-300 group-hover:scale-[1.025]"
        />
      </div>

      {/* Floating UI card */}
      <div className="absolute bottom-[13%] left-[2%] z-20 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 shadow-xl backdrop-blur-xl transition-transform duration-300 group-hover:-translate-x-1">
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/50">
          Today&apos;s Goal
        </p>

        <p className="mt-1 text-sm font-semibold text-white">Stay Consistent</p>
      </div>

      {/* Floating stat */}
      <div className="absolute right-[1%] top-[18%] z-20 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 shadow-xl backdrop-blur-xl transition-transform duration-300 group-hover:translate-x-1">
        <p className="text-xs text-white/50">Workout</p>
        <p className="mt-1 text-lg font-bold text-white">
          45 <span className="text-xs font-normal text-white/50">min</span>
        </p>
      </div>

      {/* Small floating dot */}
      <span className="absolute right-[15%] bottom-[18%] z-20 h-3 w-3 rounded-full bg-fuchsia-400 shadow-lg shadow-fuchsia-500/40" />
    </div>
  );
}
