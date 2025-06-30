"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { account } from "@/lib/appwrite";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Check if already logged in
  useEffect(() => {
    const checkSession = async () => {
      try {
        await account.get(); // If session exists
        router.push("/admin/dashboard"); // Redirect
      } catch (_) {
        // No session, do nothing
      }
    };
    checkSession();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await account.createEmailPasswordSession(email, password);
      router.push("/admin/dashboard");
    } catch (err: any) {
      setError("Login failed. Please check your email and password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {error && <div className="text-red-500 mt-4 text-center">{error}</div>}
    </div>
  );
}
