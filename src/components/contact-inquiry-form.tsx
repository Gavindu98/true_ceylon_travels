"use client";

import { useState } from "react";

type ContactFormState = {
  name: string;
  email: string;
  phone_number: string;
  travel_date: string;
  head_count: string;
  trip_details: string;
};

const initialState: ContactFormState = {
  name: "",
  email: "",
  phone_number: "",
  travel_date: "",
  head_count: "",
  trip_details: "",
};

export default function ContactInquiryForm() {
  const [form, setForm] = useState<ContactFormState>(initialState);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    const res = await fetch("/api/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data: { error?: string } = await res.json();

    if (!res.ok) {
      setError(data.error || "Failed to submit inquiry.");
      setLoading(false);
      return;
    }

    setMessage("Inquiry submitted successfully. We will contact you soon.");
    setForm(initialState);
    setLoading(false);
  };

  return (
    <form className="mt-6 space-y-4" onSubmit={onSubmit}>
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-700">
          Full Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={form.name}
          onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
          placeholder="Your name"
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none ring-[#0f766e] focus:ring-2"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
          placeholder="you@example.com"
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none ring-[#0f766e] focus:ring-2"
        />
      </div>

      <div>
        <label htmlFor="phone" className="mb-1 block text-sm font-medium text-slate-700">
          Phone / WhatsApp
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          value={form.phone_number}
          onChange={(e) => setForm((prev) => ({ ...prev, phone_number: e.target.value }))}
          placeholder="+94..."
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none ring-[#0f766e] focus:ring-2"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="travelDate" className="mb-1 block text-sm font-medium text-slate-700">
            Travel Date
          </label>
          <input
            id="travelDate"
            name="travelDate"
            type="date"
            value={form.travel_date}
            onChange={(e) => setForm((prev) => ({ ...prev, travel_date: e.target.value }))}
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none ring-[#0f766e] focus:ring-2"
          />
        </div>
        <div>
          <label htmlFor="headCount" className="mb-1 block text-sm font-medium text-slate-700">
            Traveler Count
          </label>
          <input
            id="headCount"
            name="headCount"
            type="number"
            min={1}
            value={form.head_count}
            onChange={(e) => setForm((prev) => ({ ...prev, head_count: e.target.value }))}
            placeholder="e.g. 4"
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none ring-[#0f766e] focus:ring-2"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-slate-700">
          Trip Details
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          value={form.trip_details}
          onChange={(e) => setForm((prev) => ({ ...prev, trip_details: e.target.value }))}
          placeholder="Tell us what you want to explore..."
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none ring-[#0f766e] focus:ring-2"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="rounded-full bg-[#0f766e] px-6 py-3 text-sm font-semibold text-white hover:bg-[#115e59] disabled:opacity-60"
      >
        {loading ? "Sending..." : "Send Inquiry"}
      </button>
      {message ? <p className="text-sm text-emerald-700">{message}</p> : null}
      {error ? <p className="text-sm text-rose-600">{error}</p> : null}
    </form>
  );
}
