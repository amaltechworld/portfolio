"use client";

import React, { useEffect, useState, useRef } from "react";
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
  const [visibleProjects, setVisibleProjects] = useState<Project[]>([]);
  const observerRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(
              entry.target.getAttribute("data-index") || "0",
              10
            );
            setVisibleProjects((prev) => [...prev, projects[index]]);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = observerRef.current?.querySelectorAll(".lazy-load") || [];
    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [projects]);

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
    <div className="container mx-auto px-4 py-8" ref={observerRef}>
      {/* Stats Headings */}

      <h1 className="text-2xl font-bold mb-6">
        Projects for Week {week}
        <span className="block sm:inline">
          ({weekStart} - {weekEnd}{" "}
          {new Date(year, month - 1).toLocaleString("default", {
            month: "long",
          })}{" "}
          {year})
        </span>
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
        {projects.map((project: any, index: number) => (
          <motion.div
            key={project.$id}
            className="relative flex flex-col items-center w-full group lazy-load"
            data-index={index}
            initial={{ opacity: 0, y: 50 }} // Start from below with opacity 0
            animate={{
              opacity: visibleProjects.includes(project) ? 1 : 0,
              y: visibleProjects.includes(project) ? 0 : 50,
            }} // Slide in to position
            transition={{ duration: 0.5, delay: index * 0.1 }} // Staggered animation
            whileHover={{ scale: 1.05 }} // Hover effect
          >
            {/* Card Image */}
            <div className="w-full aspect-square bg-white rounded-xl shadow overflow-hidden relative">
              <img
                src={project.image}
                alt=""
                className="w-full h-full object-cover"
              />
              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-white/90 text-black flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-y-full group-hover:translate-y-0">
                <h3 className="text-lg font-bold py-2">Site Quality Report</h3>
                <p className="text-sm font-semibold">
                  Performance:{" "}
                  <span className="text-green-600">
                    {project.performance}/100
                  </span>
                </p>
                <p className="text-sm font-semibold">
                  SEO: <span className="text-green-600">{project.seo}/100</span>
                </p>
                <p className="text-sm font-semibold">
                  Accessibility:{" "}
                  <span className="text-green-600">
                    {project.accessibility}/100
                  </span>
                </p>
                <p className="text-sm font-semibold">
                  Best Practices:{" "}
                  <span className="text-green-600">
                    {project.bestPractices}/100
                  </span>
                </p>
              </div>
            </div>
            {/* Date */}
            <div className="mt-2 text-center text-base font-medium text-gray-700">
              {new Date(project.date).toLocaleDateString()}
            </div>
            {/* Visit Page Button */}
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 px-4 py-2 bg-[#f97316] text-white text-sm font-semibold rounded-lg shadow hover:bg-orange-600"
            >
              Visit Page
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DailyProject;
