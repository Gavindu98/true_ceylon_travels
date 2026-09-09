"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Tabs } from "antd";
import { TRAVEL_PACKAGE_SECTIONS, type TravelPackageRecord, type TravelPackageSection } from "@/types/travel-package";

type FormState = {
  section: TravelPackageSection;
  title: string;
  content: string;
  href: string;
  sort_order: string;
  image_url: string;
};

const initialForm: FormState = {
  section: "signature",
  title: "",
  content: "",
  href: "/contact",
  sort_order: "0",
  image_url: "",
};

function PackageImage({ src, alt }: { src: string; alt: string }) {
  if (src.startsWith("/")) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={alt} className="h-40 w-full object-cover" />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className="h-40 w-full object-cover" referrerPolicy="no-referrer" />
  );
}

export default function AdminTravelPackageManager() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [packages, setPackages] = useState<TravelPackageRecord[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [activeTab, setActiveTab] = useState("list");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const isEditing = useMemo(() => editingId !== null, [editingId]);

  const loadPackages = async () => {
    const res = await fetch("/api/travel-packages", {
      cache: "no-store",
      headers: { "Cache-Control": "no-cache" },
    });
    if (!res.ok) {
      const payload = await res.json().catch(() => null);
      setLoadError(typeof payload?.error === "string" ? payload.error : "Unable to load travel packages.");
      return;
    }
    const data: TravelPackageRecord[] = await res.json();
    setLoadError(null);
    setPackages(data);
  };

  useEffect(() => {
    void loadPackages();
  }, []);

  const handleFileChange = (file: File | null) => {
    setSelectedImageFile(file);
    setFormError(null);
    if (!file) {
      setPreviewUrl("");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setPreviewUrl(typeof reader.result === "string" ? reader.result : "");
    reader.readAsDataURL(file);
  };

  const resetForm = () => {
    setEditingId(null);
    setForm(initialForm);
    setSelectedImageFile(null);
    setPreviewUrl("");
    setFormError(null);
    if (imageInputRef.current) imageInputRef.current.value = "";
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const title = form.title.trim();
    const content = form.content.trim();
    if (!title) {
      setFormError("Title is required.");
      return;
    }
    if (!content) {
      setFormError("Content is required.");
      return;
    }
    if (!isEditing && !selectedImageFile) {
      setFormError("Image is required.");
      return;
    }
    if (isEditing && !selectedImageFile && !form.image_url) {
      setFormError("Image is required.");
      return;
    }

    setIsSubmitting(true);
    setFormError(null);
    let uploadedImageUrl = form.image_url;

    try {
      if (selectedImageFile) {
        const fileFormData = new FormData();
        fileFormData.append("file", selectedImageFile);
        const uploadRes = await fetch("/api/travel-packages/upload", { method: "POST", body: fileFormData });
        if (!uploadRes.ok) {
          const uploadError = await uploadRes.json().catch(() => null);
          setFormError(typeof uploadError?.error === "string" ? uploadError.error : "Image upload failed.");
          return;
        }
        const uploadData: { publicUrl: string } = await uploadRes.json();
        uploadedImageUrl = uploadData.publicUrl;
      }

      const payload = {
        section: form.section,
        title,
        content,
        href: form.href.trim() || "/contact",
        sort_order: Number(form.sort_order || 0),
        image_url: uploadedImageUrl,
      };

      const res = await fetch(isEditing ? `/api/travel-packages/${editingId}` : "/api/travel-packages", {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const saveError = await res.json().catch(() => null);
        setFormError(typeof saveError?.error === "string" ? saveError.error : "Unable to save package.");
        return;
      }

      resetForm();
      setActiveTab("list");
      await loadPackages();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (item: TravelPackageRecord) => {
    setEditingId(item.id);
    setForm({
      section: item.section,
      title: item.title,
      content: item.content,
      href: item.href || "/contact",
      sort_order: String(item.sort_order ?? 0),
      image_url: item.image_url,
    });
    setSelectedImageFile(null);
    setPreviewUrl("");
    setFormError(null);
    setActiveTab("add");
  };

  const handleDelete = async (packageId: number) => {
    const confirmed = window.confirm("Delete this package from the homepage?");
    if (!confirmed) return;
    const res = await fetch(`/api/travel-packages/${packageId}`, { method: "DELETE" });
    if (!res.ok) return;
    setPackages((prev) => prev.filter((item) => item.id !== packageId));
    await loadPackages();
  };

  const displayPreview = previewUrl || (isEditing ? form.image_url : "");
  const signatureItems = packages.filter((item) => item.section === "signature");
  const coastalItems = packages.filter((item) => item.section === "coastal");

  const renderList = (items: TravelPackageRecord[], emptyLabel: string) => {
    if (loadError) {
      return <p className="text-sm text-rose-600">{loadError}</p>;
    }
    if (!items.length) {
      return <p className="text-sm text-slate-600">{emptyLabel}</p>;
    }

    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <article key={item.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <PackageImage src={item.image_url} alt={item.title} />
            <div className="space-y-2 p-4">
              <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
              <p className="text-sm text-slate-600">{item.content}</p>
              <p className="text-xs text-slate-500">Link: {item.href}</p>
              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => handleEdit(item)}
                  className="rounded-full border border-[#0f766e] px-4 py-1.5 text-xs font-semibold text-[#0f766e] hover:bg-teal-50"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => void handleDelete(item.id)}
                  className="rounded-full border border-rose-400 px-4 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50"
                >
                  Delete
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    );
  };

  return (
    <section className="space-y-8">
      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-600">
          Manage homepage cards under Handpicked travel packages. Choose Signature packages or Coastal escapes for each item.
        </p>
        <Tabs
          className="mt-4"
          activeKey={activeTab}
          onChange={(key) => {
            setActiveTab(key);
            if (key === "list") void loadPackages();
          }}
          destroyOnHidden={false}
          items={[
            {
              key: "list",
              label: "List",
              children: (
                <div className="space-y-8">
                  <section>
                    <h2 className="mb-4 text-2xl font-bold">Signature packages</h2>
                    {renderList(signatureItems, "No signature packages yet.")}
                  </section>
                  <section>
                    <h2 className="mb-4 text-2xl font-bold">Coastal escapes</h2>
                    {renderList(coastalItems, "No coastal escapes yet.")}
                  </section>
                </div>
              ),
            },
            {
              key: "add",
              label: isEditing ? "Edit Package" : "Add Package",
              children: (
                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="package-section" className="mb-1 block text-sm font-medium text-slate-700">
                      Section <span className="text-rose-500">*</span>
                    </label>
                    <select
                      id="package-section"
                      value={form.section}
                      onChange={(e) => setForm((prev) => ({ ...prev, section: e.target.value as TravelPackageSection }))}
                      className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none ring-[var(--color-primary)] focus:ring-2"
                    >
                      {TRAVEL_PACKAGE_SECTIONS.map((section) => (
                        <option key={section.value} value={section.value}>
                          {section.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="package-title" className="mb-1 block text-sm font-medium text-slate-700">
                      Title <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="package-title"
                      type="text"
                      required
                      value={form.title}
                      onChange={(e) => {
                        setFormError(null);
                        setForm((prev) => ({ ...prev, title: e.target.value }));
                      }}
                      className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none ring-[var(--color-primary)] focus:ring-2"
                    />
                  </div>

                  <div>
                    <label htmlFor="package-content" className="mb-1 block text-sm font-medium text-slate-700">
                      Content <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      id="package-content"
                      required
                      rows={4}
                      value={form.content}
                      onChange={(e) => {
                        setFormError(null);
                        setForm((prev) => ({ ...prev, content: e.target.value }));
                      }}
                      className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none ring-[var(--color-primary)] focus:ring-2"
                    />
                  </div>

                  <div>
                    <label htmlFor="package-href" className="mb-1 block text-sm font-medium text-slate-700">
                      Card link
                    </label>
                    <input
                      id="package-href"
                      type="text"
                      value={form.href}
                      onChange={(e) => setForm((prev) => ({ ...prev, href: e.target.value }))}
                      placeholder="/tours"
                      className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none ring-[var(--color-primary)] focus:ring-2"
                    />
                    <p className="mt-1 text-xs text-slate-500">Internal path or full URL. Defaults to /contact.</p>
                  </div>

                  <div>
                    <label htmlFor="package-sort" className="mb-1 block text-sm font-medium text-slate-700">
                      Sort order
                    </label>
                    <input
                      id="package-sort"
                      type="number"
                      value={form.sort_order}
                      onChange={(e) => setForm((prev) => ({ ...prev, sort_order: e.target.value }))}
                      className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none ring-[var(--color-primary)] focus:ring-2"
                    />
                  </div>

                  <div>
                    <label htmlFor="package-image" className="mb-1 block text-sm font-medium text-slate-700">
                      Image <span className="text-rose-500">*</span>
                    </label>
                    <input
                      ref={imageInputRef}
                      id="package-image"
                      type="file"
                      accept="image/*"
                      required={!isEditing && !form.image_url}
                      onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
                      className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none ring-[var(--color-primary)] focus:ring-2"
                    />
                    <p className="mt-2 text-xs text-slate-500">
                      {selectedImageFile
                        ? `Selected: ${selectedImageFile.name}`
                        : form.image_url
                          ? "Current image is already uploaded. Choose a file to replace it."
                          : "Choose an image to upload."}
                    </p>
                    {displayPreview ? (
                      <div className="mt-3 overflow-hidden rounded-xl border border-slate-200">
                        <PackageImage src={displayPreview} alt="Package preview" />
                      </div>
                    ) : null}
                  </div>

                  {formError ? <p className="text-sm text-rose-600">{formError}</p> : null}

                  <div className="flex flex-wrap gap-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold !text-white disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSubmitting ? "Saving..." : isEditing ? "Update Package" : "Save Package"}
                    </button>
                    {isEditing ? (
                      <button
                        type="button"
                        onClick={resetForm}
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
