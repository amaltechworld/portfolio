"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllProjects, deleteProject } from "@/lib/api"; // Make sure you have these functions
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

  useEffect(() => {
    getAllProjects().then((data) => {
      setProjects(data);
      setLoading(false);
    });
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      await deleteProject(id);
      setProjects(projects.filter((p) => p.$id !== id));
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Projects</h1>
      <Link href="/admin/projects/new" className="bg-blue-600 text-white px-4 py-2 rounded mb-4 inline-block">
        + Add New Project
      </Link>
      <ul>
        {projects.map((project : any) => (
          <li key={project.$id} className="flex justify-between items-center border-b py-2">
            <span>{project.title}</span>
            <div>
              <Link href={`/admin/projects/${project.$id}`} className="text-blue-600 mr-4">Edit</Link>
              <button onClick={() => handleDelete(project.$id)} className="text-red-600">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}