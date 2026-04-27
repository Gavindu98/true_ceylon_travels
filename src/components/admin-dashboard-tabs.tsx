"use client";

import { Tabs } from "antd";
import AdminMemoryManager from "@/components/admin-memory-manager";
import AdminContactsList from "@/components/admin-contacts-list";
import AdminFeedbackManager from "@/components/admin-feedback-manager";
import AdminTourContentManager from "@/components/admin-tour-content-manager";

export default function AdminDashboardTabs() {
  return (
    <Tabs
      defaultActiveKey="overview"
      items={[
        {
          key: "overview",
          label: "Overview",
          children: (
            <div className="rounded-xl bg-[var(--color-surface-container-low)] p-5">
              <p className="text-sm text-slate-700">
                Use the <span className="font-semibold">Memories</span> tab to manage memory cards and images.
              </p>
            </div>
          ),
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
