"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { account } from "@/lib/appwrite"; // Adjust this import as needed

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // try {
    //   await account.createEmailPasswordSession(email, password);
    //   // Redirect to dashboard on success
    //   router.push("/admin/dashboard");
    // } catch (err: any) {
    //   setError("Login failed. Please check your email and password.");
    // } finally {
    //   setLoading(false);
    // }
    try {
      await account.createEmailPasswordSession(email, password);
      router.push("/admin/dashboard");
    } catch (err: any) {
      if (err.code === 401) {
        setError("Invalid email or password, or your account is not verified.");
      } else {
        setError("Login failed. Please try again.");
      }
    }
  }

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Admin Login</h2>
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
      {error && <div className="text-red-500 mt-4">{error}</div>}
    </div>
  );
}
