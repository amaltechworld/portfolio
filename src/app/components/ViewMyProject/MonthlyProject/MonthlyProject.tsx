"use client";
import { useEffect, useState } from "react";
import { getAllProjects } from "@/lib/api";
import { Project } from "@/types/project";
import Link from "next/link";
import { motion } from "framer-motion";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";

// Create a reusable LoadingSpinner component
const LoadingSpinner = () => (
  <div className="fixed inset-0 bg-white/80 z-50 flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
  </div>
);

export default function MonthlyProject() {
  // All state declarations at the top
  const [projects, setProjects] = useState<Project[]>([]);
  const [years, setYears] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [loading, setLoading] = useState(true);

  // Single useEffect for data fetching
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await getAllProjects();
        setProjects(data);
        const uniqueYears = Array.from(new Set(data.map((p) => p.year))).sort(
          (a, b) => b - a
        );
        setYears(uniqueYears);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Show loading spinner when loading is true
  if (loading) {
    return <LoadingSpinner />;
  }

  // Filter projects for selected year
  const projectsThisYear = projects.filter((p) => p.year === selectedYear);
  const months = Array.from(new Set(projectsThisYear.map((p) => p.month))).sort(
    (a, b) => a - b
  );

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8 min-h-screen pt-24">
        {/* Stats Section - Horizontal on md+ screens */}
        <div className="flex flex-col justify-between md:flex-row md:items-center md:space-x-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-8">
            <h2 className="text-2xl font-bold">
              Total Works ({projects.length})
            </h2>
            <p className="mt-2 md:mt-0">
              Total Works in {selectedYear} ({projectsThisYear.length})
            </p>
          </div>

          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="mt-4 md:mt-0 border p-2 rounded"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {months.map((month) => {
            const monthProjects = projectsThisYear.filter(
              (p) => p.month === month
            );
            if (monthProjects.length === 0) return null;

            const monthName = new Date(selectedYear, month - 1).toLocaleString(
              "default",
              { month: "long" }
            );

            return (
              <motion.div
                key={month}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Link href={`/monthly-project/${selectedYear}/${month}`}>
                  {/* Clean Card - Image Only */}
                  <div className="aspect-square overflow-hidden rounded-lg shadow-lg">
                    {monthProjects[0]?.image && (
                      <img
                        src={monthProjects[0].image}
                        alt={`${monthName} ${selectedYear} projects preview - ${
                          monthProjects.length
                        } project${monthProjects.length !== 1 ? "s" : ""}`}
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                        loading="lazy"
                        decoding="async"
                      />
                    )}
                  </div>
                  {/* Count Below Card */}
                  <p className="mt-3 text-center">
                    {monthName} ({monthProjects.length})
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
}
