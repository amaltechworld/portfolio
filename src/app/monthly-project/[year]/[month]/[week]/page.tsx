import DailyProject from "@/app/components/ViewMyProject/DailyProject/DailyProject";

export default async function DailyProjectPage({
  params,
}: {
  params: Promise<{ year: string; month: string; week: string }>;
}) {
  // Add await to resolve params
  const resolvedParams = await params;

  const year = Number(resolvedParams.year);
  const month = Number(resolvedParams.month);
  const week = Number(resolvedParams.week);

  return <DailyProject year={year} month={month} week={week} />;
}
