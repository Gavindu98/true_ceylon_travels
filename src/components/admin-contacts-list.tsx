"use client";

import { useEffect, useState } from "react";
import type { ContactRecord } from "@/types/contact";

export default function AdminContactsList() {
  const [contacts, setContacts] = useState<ContactRecord[]>([]);

  useEffect(() => {
    const loadContacts = async () => {
      const res = await fetch("/api/contacts", { cache: "no-store" });
      if (!res.ok) return;
      const data: ContactRecord[] = await res.json();
      setContacts(data);
    };

    void loadContacts();
  }, []);

  if (!contacts.length) {
    return <p className="text-sm text-slate-600">No contacts yet.</p>;
  }

  return (
    <div className="space-y-4">
      {contacts.map((contact) => (
        <article key={contact.id} className="rounded-xl bg-[var(--color-surface-container-low)] p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-lg font-semibold">{contact.name || "Unknown Name"}</h3>
            <p className="text-xs text-slate-500">{contact.created_at ? new Date(contact.created_at).toLocaleString() : "-"}</p>
          </div>
          <p className="mt-2 text-sm text-slate-700">Email: {contact.email || "-"}</p>
          <p className="text-sm text-slate-700">Phone: {contact.phone_number || "-"}</p>
          <p className="text-sm text-slate-700">
            Travel Date: {contact.travel_date ? new Date(contact.travel_date).toLocaleDateString() : "-"}
          </p>
          <p className="text-sm text-slate-700">Traveler Count: {contact.head_count ?? "-"}</p>
          <p className="mt-2 text-sm text-slate-700">Trip Details: {contact.trip_details || "-"}</p>
        </article>
      ))}
    </div>
  );
}
