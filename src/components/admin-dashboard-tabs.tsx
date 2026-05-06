"use client";

import { useEffect, useMemo, useState } from "react";
import { Tabs } from "antd";
import AdminMemoryManager from "@/components/admin-memory-manager";
import AdminContactsList from "@/components/admin-contacts-list";
import AdminFeedbackManager from "@/components/admin-feedback-manager";
import AdminTourContentManager from "@/components/admin-tour-content-manager";
import type { ContactRecord } from "@/types/contact";
import type { FeedbackRecord } from "@/types/feedback";
import type { MemoryRecord } from "@/types/memory";
import type { TourContentRecord } from "@/types/tour-content";

type OverviewState = {
  memories: MemoryRecord[];
  contacts: ContactRecord[];
  feedbacks: FeedbackRecord[];
  tourItems: TourContentRecord[];
};

function AdminOverviewStats() {
  const [state, setState] = useState<OverviewState>({
    memories: [],
    contacts: [],
    feedbacks: [],
    tourItems: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadOverview = async () => {
      setLoading(true);
      setError(null);
      try {
        const [memoriesRes, contactsRes, feedbackRes, tourItemsRes] = await Promise.all([
          fetch("/api/memories", { cache: "no-store" }),
          fetch("/api/contacts", { cache: "no-store" }),
          fetch("/api/feedback", { cache: "no-store" }),
          fetch("/api/tour-content/items", { cache: "no-store" }),
        ]);

        if (!memoriesRes.ok || !contactsRes.ok || !feedbackRes.ok || !tourItemsRes.ok) {
          throw new Error("Failed to load one or more overview data sources.");
        }

        const [memories, contacts, feedbacks, tourItems] = await Promise.all([
          memoriesRes.json() as Promise<MemoryRecord[]>,
          contactsRes.json() as Promise<ContactRecord[]>,
          feedbackRes.json() as Promise<FeedbackRecord[]>,
          tourItemsRes.json() as Promise<TourContentRecord[]>,
        ]);

        setState({ memories, contacts, feedbacks, tourItems });
      } catch {
        setError("Unable to load dashboard stats right now. Please refresh.");
      } finally {
        setLoading(false);
      }
    };

    void loadOverview();
  }, []);

  const metrics = useMemo(() => {
    const dayTours = state.tourItems.filter((item) => item.type === "day_tour").length;
    const tourCategories = state.tourItems.filter((item) => item.type === "tour_category").length;

    return [
      { key: "memories", label: "Memories", value: state.memories.length, tone: "text-teal-700" },
      { key: "contacts", label: "Contact Inquiries", value: state.contacts.length, tone: "text-amber-700" },
      { key: "feedbacks", label: "Feedback Entries", value: state.feedbacks.length, tone: "text-blue-700" },
      { key: "dayTours", label: "Day Tours", value: dayTours, tone: "text-violet-700" },
      { key: "categories", label: "Tour Categories", value: tourCategories, tone: "text-rose-700" },
      { key: "allTourItems", label: "All Tour Items", value: state.tourItems.length, tone: "text-slate-700" },
    ];
  }, [state]);

  const latestContact = state.contacts[0];
  const latestMemory = state.memories[0];
  const latestFeedback = state.feedbacks[0];

  if (loading) {
    return (
      <div className="rounded-xl bg-[var(--color-surface-container-low)] p-5">
        <p className="text-sm text-slate-700">Loading overview stats...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-rose-200 bg-rose-50 p-5">
        <p className="text-sm text-rose-700">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {metrics.map((metric) => (
          <article key={metric.key} className="rounded-xl border border-slate-200 bg-[var(--color-surface-container-low)] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">{metric.label}</p>
            <p className={`mt-2 text-3xl font-bold ${metric.tone}`}>{metric.value}</p>
          </article>
        ))}
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <h3 className="text-base font-semibold text-slate-900">Recent Activity</h3>
        <div className="mt-3 space-y-2 text-sm text-slate-700">
          <p>
            Latest contact: {latestContact?.name || "N/A"}
            {latestContact?.created_at ? ` - ${new Date(latestContact.created_at).toLocaleString()}` : ""}
          </p>
          <p>
            Latest memory: {latestMemory?.title || "N/A"}
            {latestMemory?.created_at ? ` - ${new Date(latestMemory.created_at).toLocaleString()}` : ""}
          </p>
          <p>
            Latest feedback: {latestFeedback?.title || "N/A"}
            {latestFeedback?.created_at ? ` - ${new Date(latestFeedback.created_at).toLocaleString()}` : ""}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboardTabs() {
  return (
    <Tabs
      defaultActiveKey="overview"
      items={[
        {
          key: "overview",
          label: "Overview",
          children: <AdminOverviewStats />,
        },
        {
          key: "memories",
          label: "Memories",
          children: <AdminMemoryManager />,
        },
        {
          key: "tour-content",
          label: "Tour Content",
          children: <AdminTourContentManager />,
        },
        {
          key: "contacts",
          label: "Contacts",
          children: <AdminContactsList />,
        },
        {
          key: "feedback",
          label: "Feedback",
          children: <AdminFeedbackManager />,
        },
      ]}
    />
  );
}
