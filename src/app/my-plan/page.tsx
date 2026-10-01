import { Metadata } from "next";
import MyPlanClient from "./MyPlanClient";

// SEO Metadata for the My Plan page
export const metadata: Metadata = {
  title: "My Plan | FitLog",
  description:
    "Manage your FitLog workout plan, saved workouts, and completed exercises. Build and track your personalized training routine.",

  keywords: [
    "FitLog",
    "workout plan",
    "fitness planner",
    "saved workouts",
    "workout tracker",
    "exercise planner",
    "training plan",
  ],

  alternates: {
    canonical: "https://sofian-fit-log.vercel.app/my-plan",
  },

  openGraph: {
    title: "My Plan | FitLog",
    description:
      "Build, manage, and track your personalized workout plan with FitLog.",
    url: "https://sofian-fit-log.vercel.app/my-plan",
    siteName: "FitLog",
    type: "website",
  },

  twitter: {
    card: "summary",
    title: "My Plan | FitLog",
    description:
      "Build, manage, and track your personalized workout plan with FitLog.",
  },

  robots: {
    index: false,
    follow: true,
  },
};

type MyPlanPageProps = {
  searchParams: Promise<{
    tab?: string;
  }>;
};

export default async function MyPlanPage({ searchParams }: MyPlanPageProps) {
  const params = await searchParams;

  const initialTab = params.tab === "saved" ? "saved" : "plan";

  return <MyPlanClient initialTab={initialTab} />;
}
