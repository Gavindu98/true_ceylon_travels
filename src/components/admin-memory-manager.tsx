"use client";

import { useEffect, useMemo, useState } from "react";
import { Tabs } from "antd";
import MemoryCards from "@/components/memory-cards";
import type { MemoryRecord } from "@/types/memory";

type FormState = {
  place: string;
  date: string;
  traveler_count: string;
  title: string;
  description: string;
  url: string;
};

const initialForm: FormState = {
  place: "",
  date: "",
  traveler_count: "",
  title: "",
  description: "",
  url: "",
};

export default function AdminMemoryManager() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [memories, setMemories] = useState<MemoryRecord[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [activeTab, setActiveTab] = useState("list");
  const isEditing = useMemo(() => editingId !== null, [editingId]);

  const loadMemories = async () => {
    const res = await fetch("/api/memories", { cache: "no-store" });
    if (!res.ok) return;
    const data: MemoryRecord[] = await res.json();
    setMemories(data);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadMemories();
  }, []);

  const handleFileChange = (file: File | null) => {
    setSelectedImageFile(file);
    if (!file) {
      setPreviewUrl("");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(typeof reader.result === "string" ? reader.result : "");
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let uploadedImageUrl = form.url;

    if (selectedImageFile) {
      const fileFormData = new FormData();
      fileFormData.append("file", selectedImageFile);

      const uploadRes = await fetch("/api/memories/upload", {
        method: "POST",
        body: fileFormData,
      });

      if (!uploadRes.ok) return;
      const uploadData: { publicUrl: string } = await uploadRes.json();
      uploadedImageUrl = uploadData.publicUrl;
    }

    const payload = { ...form, url: uploadedImageUrl };

    const res = await fetch(isEditing ? `/api/memories/${editingId}` : "/api/memories", {
      method: isEditing ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) return;

    setForm(initialForm);
    setEditingId(null);
    setSelectedImageFile(null);
    await loadMemories();
  };

  const handleEdit = (memory: MemoryRecord) => {
    setEditingId(memory.id);
    setForm({
      place: memory.place || "",
      date: memory.date ? memory.date.slice(0, 10) : "",
      traveler_count: memory.traveler_count || "",
      title: memory.title || "",
      description: memory.description || "",
      url: memory.url || "",
    });
    setSelectedImageFile(null);
    setActiveTab("add");
  };

  const handleDelete = async (memoryId: number) => {
    const res = await fetch(`/api/memories/${memoryId}`, { method: "DELETE" });
    if (!res.ok) return;
    await loadMemories();
  };

  return (
    <section className="space-y-8">
      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={[
            {
              key: "list",
              label: "List",
              children: (
                <section>
                  <h2 className="mb-4 text-2xl font-bold">Saved Memories</h2>
                  <MemoryCards memories={memories} onEdit={handleEdit} onDelete={handleDelete} />
                </section>
              ),
            },
            {
              key: "add",
              label: "Add New Memory",
              children: (
                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="place" className="mb-1 block text-sm font-medium text-slate-700">
                      Place
                    </label>
                    <input
                      id="place"
                      name="place"
                      type="text"
                      value={form.place}
                      onChange={(e) => setForm((prev) => ({ ...prev, place: e.target.value }))}
                      className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none ring-[var(--color-primary)] focus:ring-2"
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="date" className="mb-1 block text-sm font-medium text-slate-700">
                        Date
                      </label>
                      <input
                        id="date"
                        name="date"
                        type="date"
                        value={form.date}
                        onChange={(e) => setForm((prev) => ({ ...prev, date: e.target.value }))}
                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none ring-[var(--color-primary)] focus:ring-2"
                      />
                    </div>
                    <div>
                      <label htmlFor="travelerCount" className="mb-1 block text-sm font-medium text-slate-700">
                        Traveler Count
                      </label>
                      <input
                        id="travelerCount"
                        name="travelerCount"
                        type="text"
                        value={form.traveler_count}
                        onChange={(e) => setForm((prev) => ({ ...prev, traveler_count: e.target.value }))}
                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none ring-[var(--color-primary)] focus:ring-2"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="title" className="mb-1 block text-sm font-medium text-slate-700">
                      Title
                    </label>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      value={form.title}
                      onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                      className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none ring-[var(--color-primary)] focus:ring-2"
                    />
                  </div>

                  <div>
                    <label htmlFor="description" className="mb-1 block text-sm font-medium text-slate-700">
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={4}
                      value={form.description}
                      onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                      className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none ring-[var(--color-primary)] focus:ring-2"
                    />
                  </div>

                  <div>
                    <label htmlFor="image" className="mb-1 block text-sm font-medium text-slate-700">
                      Memory Image
                    </label>
                    <input
                      id="image"
                      name="image"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
                      className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none ring-[var(--color-primary)] focus:ring-2"
                    />
                    <p className="mt-2 text-xs text-slate-500">
                      {selectedImageFile
                        ? `Selected: ${selectedImageFile.name}`
                        : form.url
                          ? "Current image is already uploaded. Choose a file to replace it."
                          : "Choose an image to upload to Supabase Storage bucket: tour_memories."}
                    </p>
                    {previewUrl ? (
                      <div className="mt-3 overflow-hidden rounded-xl border border-slate-200">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={previewUrl} alt="Selected memory preview" className="h-44 w-full object-cover" />
                      </div>
                    ) : null}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button type="submit" className="rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white">
                      {isEditing ? "Update Memory" : "Save Memory"}
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
    </section>
  );
}
