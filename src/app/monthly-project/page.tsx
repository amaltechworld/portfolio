import { Metadata } from "next";
import MonthlyProject from "@/app/components/ViewMyProject/MonthlyProject/MonthlyProject";

export const metadata: Metadata = {
  title: "Monthly Projects - Amal Raj Portfolio",
  description:
    "Browse through monthly project collections showcasing web development work organized by months and years.",
  keywords: [
    "monthly projects",
    "portfolio",
    "web development",
    "project gallery",
    "Amal Raj",
  ],
  openGraph: {
    title: "Monthly Projects - Amal Raj Portfolio",
    description:
      "Browse through monthly project collections showcasing web development work.",
    type: "website",
  },
};

export default function MonthlyProjectPage() {
  return <MonthlyProject />;
}
