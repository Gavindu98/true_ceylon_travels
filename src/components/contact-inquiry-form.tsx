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

    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data: { error?: string } = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to submit inquiry.");
        return;
      }

      setMessage("Thank you! Your inquiry has been sent. We will contact you soon.");
      setForm(initialState);
    } catch {
      setError("We could not send your inquiry. Please try again or contact us on WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="mt-7 space-y-5" onSubmit={onSubmit}>
      <div className="grid gap-5 sm:grid-cols-2">
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-semibold text-[#25453c]">
          Full Name <span className="text-amber-700">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          value={form.name}
          onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
          placeholder="Your name"
          className="min-h-12 w-full rounded-xl border border-[#ceddd5] bg-[#fbfdfb] px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-[#9dbcae] focus:border-[#0f766e] focus:bg-white focus:ring-4 focus:ring-[#0f766e]/10"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-semibold text-[#25453c]">
          Email Address <span className="text-amber-700">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={form.email}
          onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
          placeholder="you@example.com"
          className="min-h-12 w-full rounded-xl border border-[#ceddd5] bg-[#fbfdfb] px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-[#9dbcae] focus:border-[#0f766e] focus:bg-white focus:ring-4 focus:ring-[#0f766e]/10"
        />
      </div>
      </div>

      <div>
        <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-[#25453c]">
          Phone / WhatsApp <span className="text-amber-700">*</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          value={form.phone_number}
          onChange={(e) => setForm((prev) => ({ ...prev, phone_number: e.target.value }))}
          placeholder="+94 77 123 4567"
          className="min-h-12 w-full rounded-xl border border-[#ceddd5] bg-[#fbfdfb] px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-[#9dbcae] focus:border-[#0f766e] focus:bg-white focus:ring-4 focus:ring-[#0f766e]/10"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="travelDate" className="mb-2 block text-sm font-semibold text-[#25453c]">
            Travel Date
          </label>
          <input
            id="travelDate"
            name="travelDate"
            type="date"
            value={form.travel_date}
            onChange={(e) => setForm((prev) => ({ ...prev, travel_date: e.target.value }))}
            className="min-h-12 w-full rounded-xl border border-[#ceddd5] bg-[#fbfdfb] px-4 py-3 text-slate-700 outline-none transition hover:border-[#9dbcae] focus:border-[#0f766e] focus:bg-white focus:ring-4 focus:ring-[#0f766e]/10"
          />
        </div>
        <div>
          <label htmlFor="headCount" className="mb-2 block text-sm font-semibold text-[#25453c]">
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
            className="min-h-12 w-full rounded-xl border border-[#ceddd5] bg-[#fbfdfb] px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-[#9dbcae] focus:border-[#0f766e] focus:bg-white focus:ring-4 focus:ring-[#0f766e]/10"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-semibold text-[#25453c]">
          Trip Details <span className="text-amber-700">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          value={form.trip_details}
          onChange={(e) => setForm((prev) => ({ ...prev, trip_details: e.target.value }))}
          placeholder="Share the places, experiences, or travel pace you have in mind..."
          className="w-full resize-y rounded-xl border border-[#ceddd5] bg-[#fbfdfb] px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-[#9dbcae] focus:border-[#0f766e] focus:bg-white focus:ring-4 focus:ring-[#0f766e]/10"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-[#064e3b] px-6 py-3 text-sm font-bold !text-white shadow-[0_10px_25px_rgba(0,53,39,0.18)] transition hover:-translate-y-0.5 hover:bg-[#003527] hover:shadow-[0_14px_30px_rgba(0,53,39,0.24)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f766e] disabled:translate-y-0 disabled:opacity-60 sm:w-auto"
      >
        {loading ? "Sending..." : "Send Inquiry"}
      </button>
      <div aria-live="polite">
        {message ? <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">{message}</p> : null}
        {error ? <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">{error}</p> : null}
      </div>
    </form>
  );
}
