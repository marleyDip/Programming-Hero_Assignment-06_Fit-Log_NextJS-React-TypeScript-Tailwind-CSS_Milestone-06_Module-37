import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Inter, Oswald } from "next/font/google";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
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
    "FitLog is a dark, no-nonsense gym companion for planning and tracking your workouts.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${oswald.variable} h-full antialiased`}
    >
      <Navbar />

      <main>{children}</main>

      <Footer />
    </html>
  );
}
