import WeeklyProject from "@/app/components/ViewMyProject/WeeklyProject/WeeklyProject";

export default async function MonthlyProjectPage({
  params,
}: {
  params: Promise<{ year: string; month: string }>;
}) {
  const resolvedParams = await params;
  const year = Number(resolvedParams.year);
  const month = Number(resolvedParams.month);

  return <WeeklyProject year={year} month={month} />;
}
