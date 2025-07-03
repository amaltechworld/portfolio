"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { createProject } from "@/lib/api";
import { useRouter } from "next/navigation";
import { account, storage } from "@/lib/appwrite";
import { ID } from "appwrite";

export default function NewProject() {
  const [form, setForm] = useState({
    title: "",
    image: "",
    date: "",
    link: "",
    year: "",
    month: "",
    week: "",
    performance: "",
    seo: "",
    accessibility: "",
    bestPractices: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [uploading, setUploading] = useState(false);
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    try {
      // Upload file to Appwrite Storage
      const response = await storage.createFile(
        process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!, // You'll need to add this to your env
        ID.unique(),
        file
      );
      
      // Get the file URL
      const fileUrl = storage.getFileView(
        process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!,
        response.$id
      );
      
      return fileUrl.toString();
    } catch (_error) {
      throw new Error("Failed to upload image");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setUploading(true);

    try {
      let imageUrl = form.image;

      // Upload image if a file was selected
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      await createProject({
        ...form,
        image: imageUrl,
        year: Number(form.year),
        month: Number(form.month),
        week: Number(form.week),
        performance: Number(form.performance) || 0,
        seo: Number(form.seo) || 0,
        accessibility: Number(form.accessibility) || 0,
        bestPractices: Number(form.bestPractices) || 0,
      });
      router.push("/admin/projects");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to create project");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="mb-4 space-x-4">
        <Link href="/admin/dashboard" className="text-blue-600 hover:underline">
          ← Back to Dashboard
        </Link>
        <Link href="/admin/projects" className="text-blue-600 hover:underline">
          ← Back to Projects
        </Link>
      </div>
      <h1 className="text-2xl font-bold mb-4">Add New Project</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold border-b pb-2">
            Basic Information
          </h2>

          <div>
            <label className="block text-sm font-medium mb-1">Title *</label>
            <input
              name="title"
              type="text"
              placeholder="Project Title"
              value={form.title}
              onChange={handleChange}
              className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Date *</label>
              <input
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Project Link *
              </label>
              <input
                name="link"
                type="url"
                placeholder="https://example.com"
                value={form.link}
                onChange={handleChange}
                className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Year *</label>
              <input
                name="year"
                type="number"
                placeholder="2024"
                value={form.year}
                onChange={handleChange}
                className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Month *</label>
              <input
                name="month"
                type="number"
                min="1"
                max="12"
                placeholder="1-12"
                value={form.month}
                onChange={handleChange}
                className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Week *</label>
              <input
                name="week"
                type="number"
                min="1"
                max="4"
                placeholder="1-4"
                value={form.week}
                onChange={handleChange}
                className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Image Upload */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold border-b pb-2">Project Image</h2>

          <div>
            <label className="block text-sm font-medium mb-1">
              Upload Image (Image ratio 1:1)*
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            {imagePreview && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Preview:</p>
                <img
                  src={imagePreview}
                  alt="Project preview"
                  className="max-h-60 w-auto rounded-lg border shadow-sm"
                />
              </div>
            )}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold border-b pb-2">
            Performance Metrics
          </h2>
          <p className="text-sm text-gray-600">
            Enter scores from 0-100 for each metric
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Performance
              </label>
              <input
                name="performance"
                type="number"
                min="0"
                max="100"
                placeholder="94"
                value={form.performance}
                onChange={handleChange}
                className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">SEO</label>
              <input
                name="seo"
                type="number"
                min="0"
                max="100"
                placeholder="98"
                value={form.seo}
                onChange={handleChange}
                className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Accessibility
              </label>
              <input
                name="accessibility"
                type="number"
                min="0"
                max="100"
                placeholder="91"
                value={form.accessibility}
                onChange={handleChange}
                className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Best Practices
              </label>
              <input
                name="bestPractices"
                type="number"
                min="0"
                max="100"
                placeholder="92"
                value={form.bestPractices}
                onChange={handleChange}
                className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={uploading}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {uploading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                Creating...
              </>
            ) : (
              "Create Project"
            )}
          </button>
          <Link
            href="/admin/projects"
            className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
