"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ Import useRouter
import { useSignup } from "../../src/hook/useSignup";

export default function SignupPage() {
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
  });

  const { handleSignup, error, loading } = useSignup();
  const router = useRouter(); // ✅ Initialize router

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-100 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">Create an Account</h2>

        {error && (
          <div className="bg-red-100 text-red-800 px-4 py-2 rounded text-sm text-center">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="text"
            placeholder="Username"
            className="border border-gray-300 w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button
            onClick={() => handleSignup(form)}
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold transition ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 active:scale-95"
            }`}
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </div>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <span
            className="text-blue-600 hover:underline cursor-pointer font-medium"
            onClick={() => router.push("/signin")} // ✅ Use router.push
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
}
