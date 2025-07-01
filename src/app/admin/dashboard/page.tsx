"use client";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { account } from "@/lib/appwrite";

export default function AdminDashboard() {
    const router = useRouter();

    useEffect(() => {
      account.get().catch(() => {
        router.push("/admin/login");
      });
    }, [router]);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        <ul className="space-y-4">
          <li>
            <Link href="/admin/projects">
              <span className="text-blue-600 hover:underline block p-2 rounded hover:bg-gray-100">📁 Manage Projects</span>
            </Link>
          </li>
          <li>
            <Link href="/admin/projects/new">
              <span className="text-blue-600 hover:underline block p-2 rounded hover:bg-gray-100">➕ Add New Project</span>
            </Link>
          </li>
          <li>
            <Link href="/monthly-project">
              <span className="text-blue-600 hover:underline block p-2 rounded hover:bg-gray-100">📅 View Monthly Projects</span>
            </Link>
          </li>
          <li>
            <Link href="/">
              <span className="text-blue-600 hover:underline block p-2 rounded hover:bg-gray-100">🏠 View Portfolio</span>
            </Link>
          </li>
          <li>
            <button 
              onClick={() => {
                account.deleteSession('current').then(() => {
                  window.location.href = '/admin/login';
                });
              }}
              className="text-red-600 hover:underline block p-2 rounded hover:bg-gray-100 w-full text-left"
            >
              🚪 Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}