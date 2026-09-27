import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Inter, Oswald } from "next/font/google";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { FitlogProvider } from "@/context/fitlog-context";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "FitLog - Workout Library",
  description:
    "Browse gym workouts, build today's plan, and track weekly calories with FitLog.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${inter.variable} ${oswald.variable} min-h-full bg-bg grid-noise text-text antialiased`}
      >
        <FitlogProvider>
          <Navbar />

          <main>{children}</main>

          <Footer />

          <Toaster
            theme="dark"
            position="bottom-right"
            toastOptions={{
              classNames: {
                toast:
                  "group !border !border-white/10 !bg-[#141816]/95 !text-[#f5f6f2] !shadow-[0_12px_40px_rgba(0,0,0,0.45)] !backdrop-blur-xl",
                title: "!text-sm !font-semibold !text-[#f5f6f2]",
                description: "!text-xs !text-[#9da6a1]",
                actionButton:
                  "!bg-[#ccff00] !text-[#0b0c0e] !font-semibold hover:!bg-[#d9ff4d]",
                cancelButton: "!bg-white/5 !text-[#9da6a1] hover:!bg-white/10",
              },
              style: {
                borderRadius: "16px",
                padding: "14px 16px",
              },
            }}
          />

          {/* <Toaster
            theme="dark"
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#171b1a",
                border: "1px solid #343d39",
                color: "#f4f6f2",
              },
            }}
          /> */}
        </FitlogProvider>
      </body>
    </html>
  );
}
