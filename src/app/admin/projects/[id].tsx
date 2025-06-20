"use client";
import { useEffect, useState } from "react";
import { getProject, updateProject } from "@/lib/api";
import { useRouter, useParams } from "next/navigation";
import { Project } from "@/types/project";
import { account } from "@/lib/appwrite";


export default function EditProject() {
    const router = useRouter();
    
    useEffect(() => {
      account.get().catch(() => {
        router.push("/admin/login");
      });
    }, [router]);

  
  const params = useParams();
  const id = params?.id as string;

  const [form, setForm] = useState<Partial<Project>>({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    getProject(id).then((data) => {
      setForm(data);
      setLoading(false);
    });
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await updateProject(id, {
        ...form,
        year: Number(form.year),
        month: Number(form.month),
        week: Number(form.week),
      });
      router.push("/admin/projects");
    } catch (err: any) {
      setError(err.message || "Failed to update project");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Project</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["title", "image", "date", "link", "year", "month", "week"].map((field) => (
          <input
            key={field}
            name={field}
            type={field === "date" ? "date" : "text"}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={form[field as keyof typeof form] || ""}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        ))}
        {error && <div className="text-red-500">{error}</div>}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Update</button>
      </form>
    </div>
  );
}