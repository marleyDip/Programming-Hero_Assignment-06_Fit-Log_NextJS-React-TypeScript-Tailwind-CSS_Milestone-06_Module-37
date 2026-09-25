"use client";

import Image from "next/image";
import { MouseEvent, useState } from "react";

export default function InteractiveBanner() {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();

    // Find cursor coordinates relative to the element
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;

    // Normalize coordinates around the center (from -0.5 to 0.5)
    const centerX = x / box.width - 0.5;
    const centerY = y / box.height - 0.5;

    // Calculate rotation degrees (Max 15 degrees tilt)
    setRotateX(-centerY * 15);
    setRotateY(centerX * 15);
  };

  const handleMouseLeave = () => {
    // Reset to flat when mouse leaves
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      className="relative mx-auto w-full max-w-md aspect-square flex items-center justify-center perspective-[1000px] group cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 1. Interactive Pulsing Ambient Glow */}
      <div
        className="absolute inset-0 m-auto h-64 w-64 rounded-full bg-primary/15 blur-[80px] animate-pulse duration-4000 transition-transform group-hover:scale-125"
        aria-hidden="true"
      />

      {/* 2. 3D Tilt Image Container */}
      <div
        className="relative z-10 w-full max-w-[384px] aspect-square transition-transform duration-200 ease-out will-change-transform"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`,
        }}
      >
        <Image
          src="/images/banner.png"
          alt="FitLog Workout Banner"
          width={384}
          height={384}
          priority
          className="w-full h-auto object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)]"
        />
      </div>
    </div>
  );
}
