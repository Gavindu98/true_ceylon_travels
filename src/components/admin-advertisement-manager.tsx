"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Tabs } from "antd";
import AdvertisementCards from "@/components/advertisement-cards";
import type { AdvertisementRecord } from "@/types/advertisement";

type FormState = {
  title: string;
  image_url: string;
};

const initialForm: FormState = {
  title: "",
  image_url: "",
};

export default function AdminAdvertisementManager() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [advertisements, setAdvertisements] = useState<AdvertisementRecord[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [activeTab, setActiveTab] = useState("list");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const isEditing = useMemo(() => editingId !== null, [editingId]);

  const loadAdvertisements = async () => {
    const res = await fetch("/api/advertisements", { cache: "no-store" });
    if (!res.ok) return;
    const data: AdvertisementRecord[] = await res.json();
    setAdvertisements(data);
  };

  useEffect(() => {
    void loadAdvertisements();
  }, []);

  const handleFileChange = (file: File | null) => {
    setSelectedImageFile(file);
    setFormError(null);
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
    if (isSubmitting) return;

    const title = form.title.trim();
    if (!title) {
      setFormError("Title is required.");
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

        const uploadRes = await fetch("/api/advertisements/upload", {
          method: "POST",
          body: fileFormData,
        });

        if (!uploadRes.ok) {
          const uploadError = await uploadRes.json().catch(() => null);
          setFormError(typeof uploadError?.error === "string" ? uploadError.error : "Image upload failed.");
          return;
        }

        const uploadData: { publicUrl: string } = await uploadRes.json();
        uploadedImageUrl = uploadData.publicUrl;
      }

      const payload = { title, image_url: uploadedImageUrl };

      const res = await fetch(isEditing ? `/api/advertisements/${editingId}` : "/api/advertisements", {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const saveError = await res.json().catch(() => null);
        setFormError(typeof saveError?.error === "string" ? saveError.error : "Unable to save advertisement.");
        return;
      }

      setForm(initialForm);
      setEditingId(null);
      setSelectedImageFile(null);
      setPreviewUrl("");
      if (imageInputRef.current) {
        imageInputRef.current.value = "";
      }
      setActiveTab("list");
      await loadAdvertisements();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (advertisement: AdvertisementRecord) => {
    setEditingId(advertisement.id);
    setForm({
      title: advertisement.title,
      image_url: advertisement.image_url,
    });
    setSelectedImageFile(null);
    setPreviewUrl("");
    setFormError(null);
    setActiveTab("add");
  };

  const handleDelete = async (advertisementId: number) => {
    const res = await fetch(`/api/advertisements/${advertisementId}`, { method: "DELETE" });
    if (!res.ok) return;
    await loadAdvertisements();
  };

  const displayPreview = previewUrl || (isEditing ? form.image_url : "");

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
                  <h2 className="mb-4 text-2xl font-bold">Saved Advertisements</h2>
                  <AdvertisementCards
                    advertisements={advertisements}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                </section>
              ),
            },
            {
              key: "add",
              label: isEditing ? "Edit Advertisement" : "Add New Advertisement",
              children: (
                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="advertisement-title" className="mb-1 block text-sm font-medium text-slate-700">
                      Title <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="advertisement-title"
                      name="title"
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
                    <label htmlFor="advertisement-image" className="mb-1 block text-sm font-medium text-slate-700">
                      Advertisement Image <span className="text-rose-500">*</span>
                    </label>
                    <input
                      ref={imageInputRef}
                      id="advertisement-image"
                      name="image"
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
                          : "Choose an image to upload to Storage."}
                    </p>
                    {displayPreview ? (
                      <div className="mt-3 overflow-hidden rounded-xl border border-slate-200">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={displayPreview} alt="Advertisement preview" className="h-44 w-full object-cover" />
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
                      {isSubmitting ? "Saving..." : isEditing ? "Update Advertisement" : "Save Advertisement"}
                    </button>
                    {isEditing ? (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingId(null);
                          setForm(initialForm);
                          setSelectedImageFile(null);
                          setPreviewUrl("");
                          setFormError(null);
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
