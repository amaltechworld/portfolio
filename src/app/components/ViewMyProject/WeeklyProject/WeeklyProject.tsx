"use client";

import React, { useEffect, useState } from "react";
import { getAllProjects } from "@/lib/api";
import { Project } from "@/types/project";
import Link from "next/link";
import { motion } from "framer-motion";

type WeeklyProjectProps = {
  year: number;
  month: number;
};

const LoadingSpinner = () => (
  <div className="fixed inset-0 bg-white/80 z-50 flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

export default function WeeklyProject({ year, month }: WeeklyProjectProps) {
  // Define all hooks at the top level
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalProjects, setTotalProjects] = useState(0);
  const [yearlyProjects, setYearlyProjects] = useState(0);
  const [monthlyProjects, setMonthlyProjects] = useState(0);

  // Single useEffect for data fetching
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const allProjects = await getAllProjects();
        setProjects(allProjects);

        // Calculate totals
        setTotalProjects(allProjects.length);
        setYearlyProjects(allProjects.filter((p) => p.year === year).length);
        setMonthlyProjects(
          allProjects.filter((p) => p.year === year && p.month === month).length
        );
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [year, month]);

  if (loading) return <LoadingSpinner />;

  // Get projects for current month and organize by weeks
  const monthProjects = projects.filter(
    (p) => p.year === year && p.month === month
  );

  // Create week ranges (4 weeks)
  const weeks = [1, 2, 3, 4];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Stats Section - Vertical on mobile, Horizontal on md+ */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-start md:space-x-8 mb-8">
        <h1 className="text-2xl font-bold">Total Work ({totalProjects})</h1>
        <p className="mt-2 md:mt-0">
          Total Work in {year}: ({yearlyProjects})
        </p>
        <p className="mt-2 md:mt-0">
          Total Work in{" "}
          {new Date(year, month - 1).toLocaleString("default", {
            month: "long",
          })}
          : ({monthlyProjects})
        </p>
      </div>

      {/* Projects Grid - Image Only Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {weeks.map((week) => {
          const weekProjects = monthProjects.filter((p) => p.week === week);
          if (weekProjects.length === 0) return null;

          return (
            <motion.div
              key={week}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: week * 0.1 }}
            >
              <Link href={`/monthly-project/${year}/${month}/${week}`}>
                <div className="aspect-square overflow-hidden rounded-lg shadow-lg">
                  {weekProjects[0]?.image && (
                    <img
                      src={weekProjects[0].image}
                      alt=""
                      className="w-full h-full object-cover transform transition-transform hover:scale-105"
                    />
                  )}
                </div>
                <div className="mt-2 text-center">
                  Week {week} ({weekProjects.length})
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
