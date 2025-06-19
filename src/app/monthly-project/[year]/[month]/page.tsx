import WeeklyProject from "@/app/components/ViewMyProject/WeeklyProject/WeeklyProject";

export default async function MonthlyProjectPage({
  params,
}: {
  params: { year: string; month: string };
}) {
  const resolvedParams = await params;
  const year = Number(resolvedParams.year);
  const month = Number(resolvedParams.month);

  // Pass a default week value or handle it in the WeeklyProject component
  return <WeeklyProject year={year} month={month} week={1} />;
}
