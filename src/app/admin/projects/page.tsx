"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { deleteProject, getAllProjects } from "@/lib/api";
import { Project } from "@/types/project";
import { account } from "@/lib/appwrite";
import { useRouter } from "next/navigation";

export default function AdminProjects() {
  const router = useRouter();

  useEffect(() => {
    account.get().catch(() => {
      router.push("/admin/login");
    });
  }, [router]);

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    getAllProjects()
      .then((data: Project[]) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load projects");
        setLoading(false);
        console.error("Error loading projects:", err);
      });
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      try {
        await deleteProject(id);
        setProjects(projects.filter((p) => p.$id !== id));
      } catch (err) {
        setError("Failed to delete project");
        console.error("Error deleting project:", err);
      }
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600 text-center">
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="mb-4">
        <Link
          href="/admin/dashboard"
          className="text-blue-600 hover:underline mb-2 inline-block"
        >
          ← Back to Dashboard
        </Link>
      </div>
      <h1 className="text-2xl font-bold mb-4">Projects</h1>
      <Link
        href="/admin/projects/new"
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4 inline-block hover:bg-blue-700"
      >
        + Add New Project
      </Link>
      <div className="space-y-3">
        {projects.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No projects found.</p>
            <Link
              href="/admin/projects/new"
              className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Create your first project
            </Link>
          </div>
        ) : (
          projects.map((project: Project) => (
            <div
              key={project.$id}
              className="flex items-center gap-4 border border-gray-200 rounded-lg p-4 bg-white shadow-sm"
            >
              {/* Project Image Preview */}
              <div className="flex-shrink-0">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-16 h-16 object-cover rounded-lg border"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400 text-xs">No Image</span>
                  </div>
                )}
              </div>
              
              {/* Project Info */}
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{project.title}</h3>
                <p className="text-sm text-gray-500">
                  {new Date(project.date).toLocaleDateString()} • Week{" "}
                  {project.week}
                </p>
                {(project.performance || project.seo || project.accessibility || project.bestPractices) && (
                  <div className="flex gap-2 mt-1">
                    {project.performance && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        Perf: {project.performance}
                      </span>
                    )}
                    {project.seo && (
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        SEO: {project.seo}
                      </span>
                    )}
                    {project.accessibility && (
                      <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                        A11y: {project.accessibility}
                      </span>
                    )}
                    {project.bestPractices && (
                      <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">
                        BP: {project.bestPractices}
                      </span>
                    )}
                  </div>
                )}
              </div>
              
              {/* Actions */}
              <div className="flex items-center space-x-3">
                <Link
                  href={`/admin/projects/${project.$id}`}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(project.$id)}
                  className="text-red-600 hover:text-red-700 font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
