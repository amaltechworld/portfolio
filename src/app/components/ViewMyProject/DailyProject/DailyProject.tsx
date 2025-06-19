"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getAllProjects } from "@/lib/api";
import { Project } from "@/types/project";

const LoadingSpinner = () => (
  <div className="fixed inset-0 bg-white/80 z-50 flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

const DailyProject = ({
  week,
  year,
  month,
}: {
  week: number;
  year: number;
  month: number;
}) => {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projects = await getAllProjects();
        setProjects(projects);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [year, month, week]);

  if (loading) return <LoadingSpinner />;

  // Calculate week start/end dates
  const daysInMonth = new Date(year, month, 0).getDate();
  const baseWeekLength = Math.floor(daysInMonth / 4);
  const remainder = daysInMonth % 4;

  const weekRanges = [];
  let start = 1;
  for (let i = 0; i < 4; i++) {
    let end = start + baseWeekLength - 1 + (i < remainder ? 1 : 0);
    weekRanges.push([start, end]);
    start = end + 1;
  }
  const [weekStart, weekEnd] = weekRanges[week - 1];

  // Filter projects for this week (assuming project.date is "YYYY-MM-DD")
  const filteredProjects = projects.filter((p) => {
    const d = new Date(p.date);
    return (
      d.getFullYear() === year &&
      d.getMonth() + 1 === month &&
      d.getDate() >= weekStart &&
      d.getDate() <= weekEnd
    );
  });

  // Calculate stats
  const totalWorks = projects.length;
  const totalWorksInMonth = projects.filter((p) => {
    const d = new Date(p.date);
    return d.getFullYear() === year && d.getMonth() + 1 === month;
  }).length;
  const totalWorksInWeek = filteredProjects.length;

  return (
    <div className="p-4">
      {/* Stats Headings */}

      <h1 className="text-3xl font-bold mb-6">
        Projects for Week {week} ({weekStart} - {weekEnd}{" "}
        {new Date(year, month - 1).toLocaleString("default", {
          month: "long",
        })}{" "}
        {year})
      </h1>
      <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-2 sm:gap-4 mb-6">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold">Total Works</h2>
          <span>({totalWorks})</span>
        </div>
        <div className="flex items-center gap-2 font-semibold">
          <span className="sm:ml-4">Total Works in this month</span>
          <span>({totalWorksInMonth})</span>
        </div>
        <div className="flex items-center gap-2 font-semibold">
          <span className="sm:ml-4">Total Works in this week</span>
          <span>({totalWorksInWeek})</span>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {filteredProjects.map((project: any) => (
          <motion.a
            key={project.$id}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center w-full"
          >
            <div className="w-full aspect-square bg-white rounded-xl shadow overflow-hidden">
              <img
                src={project.image}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-2 text-center text-base font-medium text-gray-700">
              {new Date(project.date).toLocaleDateString()}
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default DailyProject;
