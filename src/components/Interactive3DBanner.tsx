"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";

interface Interactive3DBannerProps {
  src?: string;
  alt?: string;
}

export default function Interactive3DBanner({
  src = "/images/banner.png",
  alt = "FitLog Workout Banner",
}: Interactive3DBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState(
    "rotateX(0deg) rotateY(0deg) scale(1)",
  );
  const [glareStyle, setGlareStyle] = useState({ opacity: 0, background: "" });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Max tilt in degrees
    const maxTilt = 14;
    const rotateY = ((x - centerX) / centerX) * maxTilt;
    const rotateX = -((y - centerY) / centerY) * maxTilt;

    setTransform(`rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`);

    // Glare follows cursor position
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    setGlareStyle({
      opacity: 0.35,
      background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.8), transparent 60%)`,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransform("rotateX(0deg) rotateY(0deg) scale(1)");
    setGlareStyle({ opacity: 0, background: "" });
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-md aspect-square flex items-center justify-center perspective-distant">
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative z-10 w-full max-w-[384px] aspect-square rounded-2xl transition-transform duration-150 ease-out will-change-transform transform-3d shadow-2xl"
        style={{ transform }}
      >
        {/* Image layer, slightly raised in 3D space */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden transform-[translateZ(20px)]">
          <Image
            src={src}
            alt={alt}
            width={384}
            height={384}
            priority
            className="w-full h-full object-contain"
          />
        </div>

        {/* Glare overlay that follows the cursor */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-150 transform-[translateZ(21px)]"
          style={{
            opacity: glareStyle.opacity,
            background: glareStyle.background,
          }}
        />

        {/* Soft drop shadow beneath, sunk into the 3D space */}
        <div className="absolute inset-0 rounded-2xl bg-black/20 blur-2xl transform-[translateZ(-30px)] -z-10" />
      </div>
    </div>
  );
}
