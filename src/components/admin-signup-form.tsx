"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminSignupForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, confirmPassword }),
    });

    const data: { error?: string; message?: string } = await res.json();

    if (!res.ok) {
      setError(data.error || "Sign up failed.");
      setLoading(false);
      return;
    }

    setMessage(data.message || "Sign up successful.");
    setLoading(false);
    setTimeout(() => {
      router.push("/admin/signin");
    }, 800);
  };

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full rounded-lg border border-slate-300 px-4 py-2.5"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full rounded-lg border border-slate-300 px-4 py-2.5"
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-full rounded-lg border border-slate-300 px-4 py-2.5"
      />
      <button type="submit" disabled={loading} className="rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white">
        {loading ? "Creating..." : "Create User"}
      </button>
      {message ? <p className="text-sm text-emerald-700">{message}</p> : null}
      {error ? <p className="text-sm text-rose-600">{error}</p> : null}
    </form>
  );
}
