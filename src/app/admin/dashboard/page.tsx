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
              <span className="text-blue-600 hover:underline">Manage Projects</span>
            </Link>
          </li>
          <li>
            <Link href="/">
              <span className="text-blue-600 hover:underline">View Portfolio</span>
            </Link>
          </li>
          {/* Add more admin links here */}
        </ul>
      </div>
    </div>
  );
}