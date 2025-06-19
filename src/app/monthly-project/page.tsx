"use client";
import { useEffect, useState } from "react";
import { getAllProjects } from "@/lib/api";
import { Project } from "@/types/project";
import Link from "next/link";
import { motion } from "framer-motion";

export default function MonthlyProjectPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [years, setYears] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await getAllProjects();
      setProjects(data);

      // Get unique years from projects
      const uniqueYears = [...new Set(data.map((p) => p.year))].sort(
        (a, b) => b - a
      );
      setYears(uniqueYears);
    };

    fetchProjects();
  }, []);

  const projectsThisYear = projects.filter((p) => p.year === selectedYear);
  const months = [...new Set(projectsThisYear.map((p) => p.month))].sort(
    (a, b) => a - b
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Total Work ({projects.length})</h1>
          <p>
            Total Work in {selectedYear}: ({projectsThisYear.length})
          </p>
        </div>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="border p-2 rounded"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {months.map((month) => {
          const monthProjects = projectsThisYear.filter(
            (p) => p.month === month
          );
          if (monthProjects.length === 0) return null;

          return (
            <motion.div
              key={month}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Link href={`/monthly-project/${selectedYear}/${month}`}>
                <div className="relative overflow-hidden rounded-lg shadow-lg">
                  {monthProjects[0]?.image && (
                    <img
                      src={monthProjects[0].image}
                      alt={`Projects from ${month}`}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white">
                    {new Date(0, month - 1).toLocaleString("default", {
                      month: "long",
                    })}
                    ({monthProjects.length})
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
