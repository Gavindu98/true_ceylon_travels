"use client";

import { useEffect, useMemo, useState } from "react";
import { Tabs } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import AdminMemoryManager from "@/components/admin-memory-manager";
import AdminAdvertisementManager from "@/components/admin-advertisement-manager";
import AdminContactsList from "@/components/admin-contacts-list";
import AdminFeedbackManager from "@/components/admin-feedback-manager";
import AdminTourContentManager from "@/components/admin-tour-content-manager";
import AdminTravelPackageManager from "@/components/admin-travel-package-manager";
import type { AdvertisementRecord } from "@/types/advertisement";
import type { ContactRecord } from "@/types/contact";
import type { FeedbackRecord } from "@/types/feedback";
import type { MemoryRecord } from "@/types/memory";

type OverviewState = {
  memories: MemoryRecord[];
  advertisements: AdvertisementRecord[];
  contacts: ContactRecord[];
  feedbacks: FeedbackRecord[];
};

function AdminOverviewStats() {
  const [state, setState] = useState<OverviewState>({
    memories: [],
    advertisements: [],
    contacts: [],
    feedbacks: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadOverview = async () => {
      setLoading(true);
      setError(null);
      try {
        const [memoriesRes, advertisementsRes, contactsRes, feedbackRes] = await Promise.allSettled([
          fetch("/api/memories", { cache: "no-store" }),
          fetch("/api/advertisements", { cache: "no-store" }),
          fetch("/api/contacts", { cache: "no-store" }),
          fetch("/api/feedback", { cache: "no-store" }),
        ]);

        const memories =
          memoriesRes.status === "fulfilled" && memoriesRes.value.ok
            ? ((await memoriesRes.value.json()) as MemoryRecord[])
            : [];

        const advertisements =
          advertisementsRes.status === "fulfilled" && advertisementsRes.value.ok
            ? ((await advertisementsRes.value.json()) as AdvertisementRecord[])
            : [];

        const contacts =
          contactsRes.status === "fulfilled" && contactsRes.value.ok
            ? ((await contactsRes.value.json()) as ContactRecord[])
            : [];

        const feedbacks =
          feedbackRes.status === "fulfilled" && feedbackRes.value.ok
            ? ((await feedbackRes.value.json()) as FeedbackRecord[])
            : [];

        setState({ memories, advertisements, contacts, feedbacks });
      } catch {
        setError("Unable to load dashboard stats right now. Please refresh.");
      } finally {
        setLoading(false);
      }
    };

    void loadOverview();
  }, []);

  const metrics = useMemo(() => {
    return [
      { key: "memories", label: "Memories", value: state.memories.length, tone: "text-teal-700" },
      { key: "advertisements", label: "Advertisements", value: state.advertisements.length, tone: "text-emerald-700" },
      { key: "contacts", label: "Contact Inquiries", value: state.contacts.length, tone: "text-amber-700" },
      { key: "feedbacks", label: "Feedback Entries", value: state.feedbacks.length, tone: "text-blue-700" },
    ];
  }, [state]);

  const latestContact = state.contacts[0];
  const latestMemory = state.memories[0];
  const latestAdvertisement = state.advertisements[0];
  const latestFeedback = state.feedbacks[0];
  const latestContactText = [latestContact?.name, latestContact?.created_at ? new Date(latestContact.created_at).toLocaleString() : ""]
    .filter(Boolean)
    .join(" - ");
  const latestMemoryText = [latestMemory?.title, latestMemory?.created_at ? new Date(latestMemory.created_at).toLocaleString() : ""]
    .filter(Boolean)
    .join(" - ");
  const latestAdvertisementText = [
    latestAdvertisement?.title,
    latestAdvertisement?.created_at ? new Date(latestAdvertisement.created_at).toLocaleString() : "",
  ]
    .filter(Boolean)
    .join(" - ");
  const latestFeedbackText = [latestFeedback?.title, latestFeedback?.created_at ? new Date(latestFeedback.created_at).toLocaleString() : ""]
    .filter(Boolean)
    .join(" - ");

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
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
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
          <p>Latest contact: {latestContactText || "-"}</p>
          <p>Latest memory: {latestMemoryText || "-"}</p>
          <p>Latest advertisement: {latestAdvertisementText || "-"}</p>
          <p>Latest feedback: {latestFeedbackText || "-"}</p>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboardTabs() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tabFromUrl = searchParams.get("tab");

  const tabItems = [
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
      key: "advertisements",
      label: "Advertisements",
      children: <AdminAdvertisementManager />,
    },
    {
      key: "tour-content",
      label: "Tour Content",
      children: <AdminTourContentManager />,
    },
    {
      key: "travel-packages",
      label: "Travel Packages",
      children: <AdminTravelPackageManager />,
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
  ] as const;

  type TabKey = (typeof tabItems)[number]["key"];
  const isTabKey = (value: string | null): value is TabKey => value !== null && tabItems.some((item) => item.key === value);
  const activeKey: TabKey = isTabKey(tabFromUrl) ? tabFromUrl : "overview";

  const handleTabChange = (key: string) => {
    if (!isTabKey(key)) return;
    const params = new URLSearchParams(searchParams.toString());
    if (key === "overview") {
      params.delete("tab");
    } else {
      params.set("tab", key);
    }
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  };

  return (
    <Tabs
      activeKey={activeKey}
      onChange={handleTabChange}
      items={[...tabItems]}
    />
  );
}
