"use client";

import { CloseOutlined } from "@ant-design/icons";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import type { AdvertisementRecord } from "@/types/advertisement";

type Props = {
  advertisements: AdvertisementRecord[];
  onEdit?: (advertisement: AdvertisementRecord) => void;
  onDelete?: (advertisementId: number) => void;
  enablePreview?: boolean;
};

function isLocalImage(src: string) {
  return src.startsWith("/");
}

function AdvertisementImage({
  src,
  alt,
  className,
  fill,
}: {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
}) {
  const imageSrc = src || "/images/hero-lanka.svg";

  if (fill) {
    if (isLocalImage(imageSrc)) {
      return <Image src={imageSrc} alt={alt} fill className={className} />;
    }

    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={imageSrc}
        alt={alt}
        className={`absolute inset-0 h-full w-full ${className ?? ""}`}
        loading="lazy"
        referrerPolicy="no-referrer"
      />
    );
  }

  if (isLocalImage(imageSrc)) {
    return (
      <Image
        src={imageSrc}
        alt={alt}
        width={1600}
        height={1200}
        className={className}
        unoptimized
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      loading="lazy"
      referrerPolicy="no-referrer"
    />
  );
}

function readHeaderHeight() {
  const value = getComputedStyle(document.documentElement).getPropertyValue("--header-height");
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 72;
}

function getMaxImageHeight() {
  const verticalPadding = 32;
  const captionReserve = 96;
  const wrapPadding = 36;
  return window.innerHeight - readHeaderHeight() - verticalPadding - captionReserve - wrapPadding;
}

function AdvertisementPreviewModal({
  advertisement,
  onClose,
}: {
  advertisement: AdvertisementRecord;
  onClose: () => void;
}) {
  const imageSrc = advertisement.image_url || "/images/hero-lanka.svg";
  const [displaySize, setDisplaySize] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    setDisplaySize(null);
  }, [imageSrc]);

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget;
    const { naturalWidth, naturalHeight } = img;

    if (!naturalWidth || !naturalHeight) return;

    const maxWidth = Math.min(window.innerWidth * 0.94, 960);
    const maxHeight = Math.max(getMaxImageHeight(), 200);
    const scale = Math.min(maxWidth / naturalWidth, maxHeight / naturalHeight, 1);

    setDisplaySize({
      width: Math.round(naturalWidth * scale),
      height: Math.round(naturalHeight * scale),
    });
  };

  return (
    <div
      className="fixed inset-x-0 bottom-0 top-[var(--header-height)] z-[100] flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={advertisement.title}
    >
      <button
        type="button"
        aria-label="Close advertisement preview"
        onClick={onClose}
        className="absolute inset-0 bg-[#001a14]/75 backdrop-blur-md"
      />

      <div className="advertisement-modal-panel relative z-10 w-fit max-w-[94vw]">
        <figure className="advertisement-modal-figure relative inline-flex w-fit max-w-[94vw] max-h-[calc(100dvh-var(--header-height)-2rem)] flex-col overflow-hidden rounded-3xl">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-3 top-3 z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/90 bg-white/95 text-[#003527] shadow-[0_6px_20px_rgba(0,0,0,0.22)] transition hover:bg-white hover:shadow-[0_8px_24px_rgba(0,0,0,0.28)]"
          >
            <CloseOutlined className="text-[15px]" />
          </button>

          <div className="advertisement-modal-image-wrap w-fit px-3 pb-3 pt-4 sm:px-4 sm:pb-4 sm:pt-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageSrc}
              alt={advertisement.title}
              onLoad={handleImageLoad}
              style={
                displaySize
                  ? { width: displaySize.width, height: displaySize.height }
                  : {
                      maxWidth: "min(94vw, 960px)",
                      maxHeight: "calc(100dvh - var(--header-height) - 2rem - 8rem)",
                    }
              }
              className="block object-contain drop-shadow-[0_12px_32px_rgba(0,0,0,0.35)]"
              referrerPolicy="no-referrer"
            />
          </div>
          <figcaption className="advertisement-modal-caption w-full shrink-0 border-t border-white/40 px-5 py-4 text-center sm:px-6 sm:py-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0f766e]">Featured Offer</p>
            <h3 className="mt-2 font-serif text-xl font-bold text-slate-900 sm:text-2xl">{advertisement.title}</h3>
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

export default function AdvertisementCards({
  advertisements,
  onEdit,
  onDelete,
  enablePreview = true,
}: Props) {
  const [selected, setSelected] = useState<AdvertisementRecord | null>(null);

  const closePreview = useCallback(() => setSelected(null), []);

  useEffect(() => {
    if (!selected) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePreview();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selected, closePreview]);

  if (!advertisements.length) {
    return <p className="text-sm text-slate-600">No advertisements yet.</p>;
  }

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {advertisements.map((advertisement) => (
          <article
            key={advertisement.id}
            className="group relative overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-[#d7e4e4]"
          >
            {enablePreview ? (
              <button
                type="button"
                onClick={() => setSelected(advertisement)}
                className="relative block h-64 w-full cursor-zoom-in text-left"
                aria-label={`View advertisement: ${advertisement.title}`}
              >
                <AdvertisementImage
                  src={advertisement.image_url}
                  alt={advertisement.title}
                  fill
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 translate-y-6 p-5 !text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <h3 className="text-lg font-semibold !text-white">{advertisement.title}</h3>
                </div>
              </button>
            ) : (
              <div className="relative h-64 w-full">
                <AdvertisementImage
                  src={advertisement.image_url}
                  alt={advertisement.title}
                  fill
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 translate-y-6 p-5 !text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <h3 className="text-lg font-semibold !text-white">{advertisement.title}</h3>
                </div>
              </div>
            )}
            {(onEdit || onDelete) && (
              <div className="flex gap-2 p-4">
                {onEdit ? (
                  <button
                    type="button"
                    onClick={() => onEdit(advertisement)}
                    className="rounded-full border border-[#0f766e] px-4 py-1.5 text-xs font-semibold text-[#0f766e] hover:bg-teal-50"
                  >
                    Edit
                  </button>
                ) : null}
                {onDelete ? (
                  <button
                    type="button"
                    onClick={() => onDelete(advertisement.id)}
                    className="rounded-full border border-rose-400 px-4 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50"
                  >
                    Delete
                  </button>
                ) : null}
              </div>
            )}
          </article>
        ))}
      </div>

      {selected ? <AdvertisementPreviewModal advertisement={selected} onClose={closePreview} /> : null}
    </>
  );
}
