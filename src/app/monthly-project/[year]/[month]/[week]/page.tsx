import DailyProject from "@/app/components/ViewMyProject/DailyProject/DailyProject";

// Example: Replace with your real data fetching logic
const projects: { id: string; image: string; date: string; link: string }[] =
  [];

export default async function DailyProjectPage({
  params,
}: {
  params: { year: string; month: string; week: string };
}) {
  // Add await to resolve params
  const resolvedParams = await Promise.resolve(params);

  const year = Number(resolvedParams.year);
  const month = Number(resolvedParams.month);
  const week = Number(resolvedParams.week);

  return <DailyProject year={year} month={month} week={week} />;
}
