"use client";

import { useEffect, useState } from "react";

export default function InitialLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => window.clearTimeout(timer);
  }, []);

  if (!loading) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-9999 grid place-items-center bg-[#0b0c0e]">
      <div className="flex flex-col items-center">
        {/* Logo */}
        <div className="relative grid size-20 place-items-center">
          {/* Glow */}
          <span className="absolute inset-0 rounded-3xl bg-primary/10 blur-2xl" />

          {/* Animated ring */}
          <span className="absolute inset-0 animate-[spin_1.8s_linear_infinite] rounded-3xl border border-white/10 border-t-primary" />

          {/* Glass logo */}
          <div className="relative grid size-14 place-items-center rounded-2xl border border-white/10 bg-[#111414]/90 shadow-[0_0_40px_rgba(204,255,0,0.1)] backdrop-blur-xl">
            <span className="font-secondary text-xl font-bold tracking-tight text-primary">
              S
            </span>
          </div>
        </div>

        {/* Brand */}
        <div className="mt-7 text-center">
          <h1 className="font-secondary text-base font-bold uppercase tracking-[0.3em] text-text">
            FitLog
          </h1>

          <p className="mt-2 text-[9px] uppercase tracking-[0.28em] text-muted-secondary">
            Your training space
          </p>
        </div>

        {/* Progress */}
        <div className="mt-7 h-px w-32 overflow-hidden bg-white/10">
          <span className="block h-full w-1/2 animate-[loading_1.2s_ease-in-out_infinite] bg-primary shadow-[0_0_12px_rgba(204,255,0,0.8)]" />
        </div>
      </div>
    </div>
  );
}

/* app/loading.tsx */

// export default function Loading() {
//   return (
//     <main className="grid min-h-[70vh] place-items-center px-6">
//       <div className="flex flex-col items-center">
//         {/* Logo mark */}
//         <div className="relative grid size-16 place-items-center">
//           {/* Outer glow */}
//           <span className="absolute inset-0 rounded-2xl bg-primary/10 blur-xl" />

//           {/* Rotating ring */}
//           <span className="absolute inset-0 animate-spin rounded-2xl border border-primary/10 border-t-primary" />

//           {/* Inner glass */}
//           <div className="relative grid size-12 place-items-center rounded-xl border border-white/10 bg-[#111414]/90 shadow-[0_0_30px_rgba(204,255,0,0.08)] backdrop-blur-xl">
//             <span className="text-lg font-black tracking-tighter text-primary">
//               s
//             </span>
//           </div>
//         </div>

//         {/* Brand */}
//         <div className="mt-6 text-center">
//           <p className="font-secondary text-sm font-bold uppercase tracking-[0.22em] text-text">
//             FitLog
//           </p>

//           <p className="mt-2 text-[9px] uppercase tracking-[0.28em] text-muted-secondary">
//             Loading your training space
//           </p>
//         </div>

//         {/* Progress line */}
//         <div className="mt-6 h-px w-32 overflow-hidden bg-white/10">
//           <span className="block h-full w-1/2 animate-[loading_1.4s_ease-in-out_infinite] bg-primary shadow-[0_0_12px_rgba(204,255,0,0.8)]" />
//         </div>
//       </div>
//     </main>
//   );
// }
