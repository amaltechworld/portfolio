"use client";
import { useState, useEffect } from "react";
import { createProject } from "@/lib/api";
import { useRouter } from "next/navigation";
import { account } from "@/lib/appwrite";

export default function NewProject() {
  

  const [form, setForm] = useState({
    title: "",
    image: "",
    date: "",
    link: "",
    year: "",
    month: "",
    week: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    account.get().catch(() => {
      router.push("/admin/login");
    });
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await createProject({
        ...form,
        year: Number(form.year),
        month: Number(form.month),
        week: Number(form.week),
      });
      router.push("/admin/projects");
    } catch (err: any) {
      setError(err.message || "Failed to create project");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Project</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["title", "image", "date", "link", "year", "month", "week"].map((field) => (
          <input
            key={field}
            name={field}
            type={field === "date" ? "date" : "text"}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={form[field as keyof typeof form]}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        ))}
        {error && <div className="text-red-500">{error}</div>}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Create</button>
      </form>
    </div>
  );
}