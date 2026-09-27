import MyPlanClient from "./MyPlanClient";

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
