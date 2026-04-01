"use client";

import { useEffect, useMemo, useState } from "react";
import { DatePicker, Tabs } from "antd";
import dayjs from "dayjs";
import type { FeedbackRecord } from "@/types/feedback";

type FormState = {
  title: string;
  feedback_date: string;
  description: string;
  country: string;
  name: string;
  profile_pic_url: string;
};

const initialForm: FormState = {
  title: "",
  feedback_date: "",
  description: "",
  country: "",
  name: "",
  profile_pic_url: "",
};

export default function AdminFeedbackManager() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [feedbacks, setFeedbacks] = useState<FeedbackRecord[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [activeTab, setActiveTab] = useState("list");
  const isEditing = useMemo(() => editingId !== null, [editingId]);

  const loadFeedbacks = async () => {
    const res = await fetch("/api/feedback", { cache: "no-store" });
    if (!res.ok) return;
    const data: FeedbackRecord[] = await res.json();
    setFeedbacks(data);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadFeedbacks();
  }, []);

  const handleFileChange = (file: File | null) => {
    setSelectedImageFile(file);
    if (!file) {
      setPreviewUrl("");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setPreviewUrl(typeof reader.result === "string" ? reader.result : "");
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let uploadedImageUrl = form.profile_pic_url;

    if (selectedImageFile) {
      const fd = new FormData();
      fd.append("file", selectedImageFile);
      const uploadRes = await fetch("/api/feedback/upload", { method: "POST", body: fd });
      if (!uploadRes.ok) return;
      const uploadData: { publicUrl: string } = await uploadRes.json();
      uploadedImageUrl = uploadData.publicUrl;
    }

    const payload = { ...form, profile_pic_url: uploadedImageUrl };
    const res = await fetch(isEditing ? `/api/feedback/${editingId}` : "/api/feedback", {
      method: isEditing ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) return;
    setForm(initialForm);
    setEditingId(null);
    setSelectedImageFile(null);
    setPreviewUrl("");
    await loadFeedbacks();
  };

  const handleEdit = (item: FeedbackRecord) => {
    setEditingId(item.id);
    setForm({
      title: item.title || "",
      feedback_date: item.feedback_date || "",
      description: item.description || "",
      country: item.country || "",
      name: item.name || "",
      profile_pic_url: item.profile_pic_url || "",
    });
    setSelectedImageFile(null);
    setPreviewUrl("");
    setActiveTab("add");
  };

  const handleDelete = async (id: number) => {
    const res = await fetch(`/api/feedback/${id}`, { method: "DELETE" });
    if (!res.ok) return;
    await loadFeedbacks();
  };

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm">
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={[
          {
            key: "list",
            label: "List",
            children: (
              <div className="space-y-4">
                {feedbacks.length === 0 ? (
                  <p className="text-sm text-slate-600">No feedback records yet.</p>
                ) : (
                  feedbacks.map((item) => (
                    <article key={item.id} className="rounded-xl bg-[var(--color-surface-container-low)] p-5">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="text-lg font-semibold">{item.title || "Untitled feedback"}</h3>
                        <p className="text-xs text-slate-500">{item.feedback_date || "-"}</p>
                      </div>
                      {item.profile_pic_url ? (
                        <div className="mt-3 h-14 w-14 overflow-hidden rounded-full border border-slate-200">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={item.profile_pic_url} alt={item.name || "Client"} className="h-full w-full object-cover" />
                        </div>
                      ) : null}
                      <p className="mt-1 text-sm text-slate-700">{item.description || "-"}</p>
                      <p className="mt-1 text-sm text-slate-700">
                        {item.name || "Unknown"} ({item.country || "-"})
                      </p>
                      <div className="mt-3 flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(item)}
                          className="rounded-full border border-[#0f766e] px-4 py-1.5 text-xs font-semibold text-[#0f766e] hover:bg-teal-50"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id)}
                          className="rounded-full border border-rose-400 px-4 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50"
                        >
                          Delete
                        </button>
                      </div>
                    </article>
                  ))
                )}
              </div>
            ),
          },
          {
            key: "add",
            label: "Add New Feedback",
            children: (
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">Title</label>
                    <input
                      type="text"
                      value={form.title}
                      onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                      className="w-full rounded-lg border border-slate-300 px-4 py-2.5"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">Feedback Date</label>
                    <DatePicker
                      value={form.feedback_date ? dayjs(form.feedback_date) : null}
                      onChange={(value) => setForm((prev) => ({ ...prev, feedback_date: value ? value.format("YYYY-MM-DD") : "" }))}
                      className="!w-full"
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">Name</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                      className="w-full rounded-lg border border-slate-300 px-4 py-2.5"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">Country</label>
                    <input
                      type="text"
                      value={form.country}
                      onChange={(e) => setForm((prev) => ({ ...prev, country: e.target.value }))}
                      className="w-full rounded-lg border border-slate-300 px-4 py-2.5"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Description</label>
                  <textarea
                    rows={4}
                    value={form.description}
                    onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Client Profile Picture</label>
                  <input type="file" accept="image/*" onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)} className="w-full rounded-lg border border-slate-300 px-4 py-2.5" />
                  {previewUrl ? (
                    <div className="mt-3 overflow-hidden rounded-xl border border-slate-200">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={previewUrl} alt="Feedback preview" className="h-44 w-full object-cover" />
                    </div>
                  ) : null}
                </div>

                <div className="flex gap-3">
                  <button type="submit" className="rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold !text-white">
                    {isEditing ? "Update Feedback" : "Save Feedback"}
                  </button>
                  {isEditing ? (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingId(null);
                        setForm(initialForm);
                        setSelectedImageFile(null);
                        setPreviewUrl("");
                      }}
                      className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700"
                    >
                      Cancel Edit
                    </button>
                  ) : null}
                </div>
              </form>
            ),
          },
        ]}
      />
    </section>
  );
}
