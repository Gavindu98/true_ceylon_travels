"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Tabs } from "antd";
import type { TourContentRecord, TourPageCoverRecord, TourItemType } from "@/types/tour-content";

type FormState = {
  type: TourItemType;
  slug: string;
  title: string;
  short_description: string;
  location: string;
  duration: string;
  best_for: string;
  starting_price: string;
  route_flow: string;
  sample_duration: string;
  travel_style: string;
  cover_image_url: string;
  highlights: string;
  itinerary: string;
  inclusions: string;
  ideal_for: string;
  sample_destinations: string;
  featured_experiences: string;
  why_travelers_choose: string;
  package_includes: string;
  is_active: boolean;
  sort_order: string;
};

type CoverFormState = {
  page_key: "day-tours" | "tour-categories";
  title: string;
  subtitle: string;
  image_url: string;
};

const initialForm: FormState = {
  type: "day_tour",
  slug: "",
  title: "",
  short_description: "",
  location: "",
  duration: "",
  best_for: "",
  starting_price: "",
  route_flow: "",
  sample_duration: "",
  travel_style: "",
  cover_image_url: "",
  highlights: "",
  itinerary: "",
  inclusions: "",
  ideal_for: "",
  sample_destinations: "",
  featured_experiences: "",
  why_travelers_choose: "",
  package_includes: "",
  is_active: true,
  sort_order: "0",
};

const initialCoverForm: CoverFormState = {
  page_key: "day-tours",
  title: "",
  subtitle: "",
  image_url: "",
};

const toLines = (value: unknown) => {
  if (!Array.isArray(value)) return "";
  return value.filter((item): item is string => typeof item === "string").join("\n");
};

export default function AdminTourContentManager() {
  const [items, setItems] = useState<TourContentRecord[]>([]);
  const [covers, setCovers] = useState<TourPageCoverRecord[]>([]);
  const [form, setForm] = useState<FormState>(initialForm);
  const [coverForm, setCoverForm] = useState<CoverFormState>(initialCoverForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [coverLoading, setCoverLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("list");
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [selectedCoverFile, setSelectedCoverFile] = useState<File | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const coverInputRef = useRef<HTMLInputElement | null>(null);
  const isEditing = useMemo(() => editingId !== null, [editingId]);

  const loadItems = async () => {
    const res = await fetch("/api/tour-content/items", { cache: "no-store" });
    if (!res.ok) return;
    const data: TourContentRecord[] = await res.json();
    setItems(data);
  };

  const loadCovers = async () => {
    const res = await fetch("/api/tour-content/page-covers", { cache: "no-store" });
    if (!res.ok) return;
    const data: TourPageCoverRecord[] = await res.json();
    setCovers(data);
  };

  useEffect(() => {
    void loadItems();
    void loadCovers();
  }, []);

  const uploadFile = async (file: File) => {
    const fileFormData = new FormData();
    fileFormData.append("file", file);
    const uploadRes = await fetch("/api/tour-content/upload", { method: "POST", body: fileFormData });
    if (!uploadRes.ok) return null;
    const uploadData: { publicUrl: string } = await uploadRes.json();
    return uploadData.publicUrl;
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
    setSelectedImageFile(null);
    if (imageInputRef.current) imageInputRef.current.value = "";
  };

  const handleItemSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      let imageUrl = form.cover_image_url;
      if (selectedImageFile) {
        const uploaded = await uploadFile(selectedImageFile);
        if (uploaded) imageUrl = uploaded;
      }

      const payload = { ...form, cover_image_url: imageUrl };
      const res = await fetch(isEditing ? `/api/tour-content/items/${editingId}` : "/api/tour-content/items", {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) return;
      resetForm();
      await loadItems();
      setActiveTab("list");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: TourContentRecord) => {
    setEditingId(item.id);
    setForm({
      type: item.type,
      slug: item.slug,
      title: item.title,
      short_description: item.short_description ?? "",
      location: item.location ?? "",
      duration: item.duration ?? "",
      best_for: item.best_for ?? "",
      starting_price: item.starting_price ?? "",
      route_flow: item.route_flow ?? "",
      sample_duration: item.sample_duration ?? "",
      travel_style: item.travel_style ?? "",
      cover_image_url: item.cover_image_url ?? "",
      highlights: toLines(item.highlights),
      itinerary: toLines(item.itinerary),
      inclusions: toLines(item.inclusions),
      ideal_for: toLines(item.ideal_for),
      sample_destinations: toLines(item.sample_destinations),
      featured_experiences: toLines(item.featured_experiences),
      why_travelers_choose: toLines(item.why_travelers_choose),
      package_includes: toLines(item.package_includes),
      is_active: item.is_active ?? true,
      sort_order: String(item.sort_order ?? 0),
    });
    setSelectedImageFile(null);
    setActiveTab("add");
  };

  const handleDelete = async (id: number) => {
    const res = await fetch(`/api/tour-content/items/${id}`, { method: "DELETE" });
    if (!res.ok) return;
    await loadItems();
  };

  const handleCoverPick = (pageKey: "day-tours" | "tour-categories") => {
    const existing = covers.find((item) => item.page_key === pageKey);
    setCoverForm({
      page_key: pageKey,
      title: existing?.title ?? "",
      subtitle: existing?.subtitle ?? "",
      image_url: existing?.image_url ?? "",
    });
  };

  const handleCoverSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (coverLoading) return;
    setCoverLoading(true);
    try {
      let imageUrl = coverForm.image_url;
      if (selectedCoverFile) {
        const uploaded = await uploadFile(selectedCoverFile);
        if (uploaded) imageUrl = uploaded;
      }

      const res = await fetch("/api/tour-content/page-covers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...coverForm, image_url: imageUrl }),
      });
      if (!res.ok) return;

      setSelectedCoverFile(null);
      if (coverInputRef.current) coverInputRef.current.value = "";
      await loadCovers();
    } finally {
      setCoverLoading(false);
    }
  };

  const dayTourItems = items.filter((item) => item.type === "day_tour");
  const categoryItems = items.filter((item) => item.type === "tour_category");

  return (
    <section className="space-y-8">
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={[
          {
            key: "list",
            label: "List",
            children: (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold">Day Tour Items</h3>
                  <div className="mt-3 grid gap-3">
                    {dayTourItems.map((item) => (
                      <div key={item.id} className="rounded-xl border border-slate-200 bg-white p-4">
                        <p className="font-semibold">{item.title}</p>
                        <p className="text-xs text-slate-500">{item.slug}</p>
                        <p className="mt-1 text-sm text-slate-600">{item.short_description}</p>
                        <div className="mt-3 flex gap-2">
                          <button
                            type="button"
                            onClick={() => handleEdit(item)}
                            className="cursor-pointer rounded-full border border-slate-300 px-3 py-1 text-xs transition hover:bg-slate-50"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => void handleDelete(item.id)}
                            className="cursor-pointer rounded-full border border-rose-300 px-3 py-1 text-xs text-rose-700 transition hover:bg-rose-50"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Tour Category Items</h3>
                  <div className="mt-3 grid gap-3">
                    {categoryItems.map((item) => (
                      <div key={item.id} className="rounded-xl border border-slate-200 bg-white p-4">
                        <p className="font-semibold">{item.title}</p>
                        <p className="text-xs text-slate-500">{item.slug}</p>
                        <p className="mt-1 text-sm text-slate-600">{item.short_description}</p>
                        <div className="mt-3 flex gap-2">
                          <button
                            type="button"
                            onClick={() => handleEdit(item)}
                            className="cursor-pointer rounded-full border border-slate-300 px-3 py-1 text-xs transition hover:bg-slate-50"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => void handleDelete(item.id)}
                            className="cursor-pointer rounded-full border border-rose-300 px-3 py-1 text-xs text-rose-700 transition hover:bg-rose-50"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ),
          },
          {
            key: "add",
            label: isEditing ? "Edit Item" : "Add Item",
            children: (
              <form onSubmit={handleItemSubmit} className="space-y-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label htmlFor="type" className="mb-1 block text-sm font-medium">
                      Item Type
                    </label>
                    <select
                      id="type"
                      value={form.type}
                      onChange={(e) => setForm((prev) => ({ ...prev, type: e.target.value as TourItemType }))}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2"
                    >
                      <option value="day_tour">Day Tour</option>
                      <option value="tour_category">Tour Category</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="sort_order" className="mb-1 block text-sm font-medium">
                      Sort Order
                    </label>
                    <input
                      id="sort_order"
                      type="number"
                      value={form.sort_order}
                      onChange={(e) => setForm((prev) => ({ ...prev, sort_order: e.target.value }))}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2"
                    />
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <input
                    placeholder="Slug"
                    value={form.slug}
                    onChange={(e) => setForm((prev) => ({ ...prev, slug: e.target.value }))}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2"
                  />
                  <input
                    placeholder="Title"
                    value={form.title}
                    onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2"
                  />
                </div>

                <textarea
                  placeholder="Short description"
                  value={form.short_description}
                  onChange={(e) => setForm((prev) => ({ ...prev, short_description: e.target.value }))}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2"
                  rows={3}
                />

                {form.type === "day_tour" ? (
                  <div className="grid gap-5 md:grid-cols-2">
                    <input
                      placeholder="Location"
                      value={form.location}
                      onChange={(e) => setForm((prev) => ({ ...prev, location: e.target.value }))}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2"
                    />
                    <input
                      placeholder="Duration"
                      value={form.duration}
                      onChange={(e) => setForm((prev) => ({ ...prev, duration: e.target.value }))}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2"
                    />
                    <input
                      placeholder="Best For"
                      value={form.best_for}
                      onChange={(e) => setForm((prev) => ({ ...prev, best_for: e.target.value }))}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2"
                    />
                    <input
                      placeholder="Starting Price"
                      value={form.starting_price}
                      onChange={(e) => setForm((prev) => ({ ...prev, starting_price: e.target.value }))}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2"
                    />
                  </div>
                ) : (
                  <div className="grid gap-5 md:grid-cols-2">
                    <input
                      placeholder="Sample Duration"
                      value={form.sample_duration}
                      onChange={(e) => setForm((prev) => ({ ...prev, sample_duration: e.target.value }))}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2"
                    />
                    <input
                      placeholder="Travel Style"
                      value={form.travel_style}
                      onChange={(e) => setForm((prev) => ({ ...prev, travel_style: e.target.value }))}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2"
                    />
                    <input
                      placeholder="Route Flow"
                      value={form.route_flow}
                      onChange={(e) => setForm((prev) => ({ ...prev, route_flow: e.target.value }))}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 md:col-span-2"
                    />
                  </div>
                )}

                <div>
                  <label htmlFor="coverImage" className="mb-1 block text-sm font-medium">
                    Cover Image
                  </label>
                  <input
                    ref={imageInputRef}
                    id="coverImage"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setSelectedImageFile(e.target.files?.[0] ?? null)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2"
                  />
                  <p className="mt-1 text-xs text-slate-500">{form.cover_image_url || "Upload an image for this tour page."}</p>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <textarea
                    placeholder="Highlights (one per line)"
                    rows={5}
                    value={form.highlights}
                    onChange={(e) => setForm((prev) => ({ ...prev, highlights: e.target.value }))}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2"
                  />
                  <textarea
                    placeholder="Itinerary (one per line)"
                    rows={5}
                    value={form.itinerary}
                    onChange={(e) => setForm((prev) => ({ ...prev, itinerary: e.target.value }))}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2"
                  />
                  <textarea
                    placeholder="Inclusions (one per line)"
                    rows={5}
                    value={form.inclusions}
                    onChange={(e) => setForm((prev) => ({ ...prev, inclusions: e.target.value }))}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2"
                  />
                  <textarea
                    placeholder="Ideal For (one per line)"
                    rows={5}
                    value={form.ideal_for}
                    onChange={(e) => setForm((prev) => ({ ...prev, ideal_for: e.target.value }))}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2"
                  />
                </div>

                {form.type === "tour_category" ? (
                  <div className="grid gap-5 md:grid-cols-2">
                    <textarea
                      placeholder="Sample Destinations (one per line)"
                      rows={4}
                      value={form.sample_destinations}
                      onChange={(e) => setForm((prev) => ({ ...prev, sample_destinations: e.target.value }))}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2"
                    />
                    <textarea
                      placeholder="Featured Experiences (one per line)"
                      rows={4}
                      value={form.featured_experiences}
                      onChange={(e) => setForm((prev) => ({ ...prev, featured_experiences: e.target.value }))}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2"
                    />
                    <textarea
                      placeholder="Why Travelers Choose (one per line)"
                      rows={4}
                      value={form.why_travelers_choose}
                      onChange={(e) => setForm((prev) => ({ ...prev, why_travelers_choose: e.target.value }))}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2"
                    />
                    <textarea
                      placeholder="Package Includes (one per line)"
                      rows={4}
                      value={form.package_includes}
                      onChange={(e) => setForm((prev) => ({ ...prev, package_includes: e.target.value }))}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2"
                    />
                  </div>
                ) : null}

                <label className="inline-flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={form.is_active}
                    onChange={(e) => setForm((prev) => ({ ...prev, is_active: e.target.checked }))}
                  />
                  Active
                </label>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="cursor-pointer rounded-full bg-[var(--color-primary)] px-6 py-2 text-sm font-semibold !text-white transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? "Saving..." : isEditing ? "Update Item" : "Save Item"}
                  </button>
                  {isEditing ? (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="cursor-pointer rounded-full border border-slate-300 px-6 py-2 text-sm font-semibold transition hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                  ) : null}
                </div>
              </form>
            ),
          },
          {
            key: "covers",
            label: "Page Covers",
            children: (
              <form onSubmit={handleCoverSubmit} className="space-y-6">
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleCoverPick("day-tours")}
                    className="cursor-pointer rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold transition hover:bg-slate-50"
                  >
                    Load Day Tours Cover
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCoverPick("tour-categories")}
                    className="cursor-pointer rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold transition hover:bg-slate-50"
                  >
                    Load Tour Categories Cover
                  </button>
                </div>

                <div className="grid gap-4">
                  <select
                    value={coverForm.page_key}
                    onChange={(e) => setCoverForm((prev) => ({ ...prev, page_key: e.target.value as CoverFormState["page_key"] }))}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5"
                  >
                    <option value="day-tours">Day Tours Page</option>
                    <option value="tour-categories">Tour Categories Page</option>
                  </select>
                  <input
                    placeholder="Cover Title"
                    value={coverForm.title}
                    onChange={(e) => setCoverForm((prev) => ({ ...prev, title: e.target.value }))}
                    className="w-full rounded-lg border border-slate-300 mb-4 px-3 py-2.5"
                  />
                  <textarea
                    rows={3}
                    placeholder="Cover Subtitle"
                    value={coverForm.subtitle}
                    onChange={(e) => setCoverForm((prev) => ({ ...prev, subtitle: e.target.value }))}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5"
                  />
                  <div className="space-y-2">
                    <input
                      ref={coverInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => setSelectedCoverFile(e.target.files?.[0] ?? null)}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2.5"
                    />
                    <p className="text-xs text-slate-500">{coverForm.image_url || "Upload cover photo for selected page."}</p>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={coverLoading}
                  className="cursor-pointer rounded-full bg-[var(--color-primary)] px-6 py-2 text-sm font-semibold !text-white transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {coverLoading ? "Saving..." : "Save Page Cover"}
                </button>
              </form>
            ),
          },
        ]}
      />
    </section>
  );
}
