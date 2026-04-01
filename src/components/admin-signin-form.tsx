"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminSigninForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data: { error?: string; message?: string } = await res.json();

    if (!res.ok) {
      setError(data.error || "Sign in failed.");
      setLoading(false);
      return;
    }

    setMessage(data.message || "Sign in successful.");
    setLoading(false);
    setTimeout(() => {
      router.push("/admin/dashboard");
    }, 600);
  };

  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      <div className="space-y-2">
        <label htmlFor="admin-email" className="block text-sm font-medium text-slate-700">
          Email Address
        </label>
        <input
          id="admin-email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-4 py-3"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="admin-password" className="block text-sm font-medium text-slate-700">
          Password
        </label>
        <input
          id="admin-password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-4 py-3"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-1 rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold !text-white"
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>
      {message ? <p className="text-sm text-emerald-700">{message}</p> : null}
      {error ? <p className="text-sm text-rose-600">{error}</p> : null}
    </form>
  );
}
