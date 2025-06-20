"use client";
import { useState } from "react";
import { databases, storage, ID } from "@/lib/appwrite"; // adjust import as needed

export default function ManageProject() {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    try {
      // 1. Upload image to Appwrite Storage
      let fileId = "";
      if (file) {
        const uploaded = await storage.createFile(
          "<BUCKET_ID>", // replace with your bucket ID
          ID.unique(),
          file
        );
        fileId = uploaded.$id;
      }

      // 2. Save project data to Appwrite Database
      await databases.createDocument(
        "<DATABASE_ID>", // replace with your database ID
        "<COLLECTION_ID>", // replace with your collection ID
        ID.unique(),
        {
          name,
          url,
          image: fileId,
        }
      );

      setMessage("Project uploaded successfully!");
      setName("");
      setUrl("");
      setFile(null);
    } catch (err: any) {
      setMessage("Failed to upload project.");
    }
  }

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Manage Project</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Project Name"
          className="w-full border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="url"
          placeholder="Project URL"
          className="w-full border p-2 rounded"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          className="w-full"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Upload Project
        </button>
      </form>
      {message && <div className="mt-4">{message}</div>}
    </div>
  );
}
