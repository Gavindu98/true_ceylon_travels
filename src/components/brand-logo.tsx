import { useId } from "react";

type BrandLogoProps = {
  variant?: "dark" | "light";
};

export default function BrandLogo({ variant = "dark" }: BrandLogoProps) {
  const uid = useId().replace(/:/g, "");
  const skyId = `${uid}-sky`;
  const waterId = `${uid}-water`;
  const isLight = variant === "light";

  return (
    <span className="flex items-center gap-2.5">
      <svg viewBox="0 0 64 64" className="h-10 w-10 shrink-0" aria-hidden="true">
        <defs>
          <linearGradient id={skyId} x1="18" y1="4" x2="46" y2="42" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fde68a" />
            <stop offset="45%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0f766e" />
          </linearGradient>
          <linearGradient id={waterId} x1="8" y1="42" x2="56" y2="62" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#155e75" />
            <stop offset="100%" stopColor="#0f766e" />
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="31" fill={`url(#${skyId})`} stroke={isLight ? "#fbbf24" : "#003527"} strokeWidth="1.6" />
        <circle cx="42" cy="18" r="7.5" fill="#f59e0b" />
        <path d="M6 44c6-6 14-8 26-8s20 2 26 8v14H6V44Z" fill={`url(#${waterId})`} />
        <path d="M18 46c4-8 10-14 14-16 4 2 10 8 14 16H18Z" fill="#14532d" />
        <path d="M29 36h6v8h-6z" fill="#f8fafc" />
        <path d="M32 22l8 14H24l8-14Z" fill="#f8fafc" />
        <circle cx="32" cy="20" r="2.2" fill="#f8fafc" />
        <path d="M20 34c4-1 7 2 8 6-4 0-7-1-8-6Z" fill="#166534" />
        <path d="M19 28c1 4 4 6 4 6s-1-4 0-7c-2 0-4 1-4 1Z" fill="#15803d" />
        <rect x="46.5" y="16" width="1.4" height="12" fill="#1f2937" />
        <rect x="47.8" y="16.4" width="7" height="4.6" fill="#ffb703" />
        <rect x="47.8" y="16.4" width="2.2" height="4.6" fill="#e11d48" />
        <rect x="52.6" y="16.4" width="2.2" height="4.6" fill="#15803d" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className={`font-serif text-[15px] font-bold tracking-[0.06em] ${isLight ? "text-white" : "text-[#003527]"}`}>
          TRUE CEYLON
        </span>
        <span className={`mt-1 text-[10px] font-semibold tracking-[0.32em] ${isLight ? "text-amber-300" : "text-[#c45c12]"}`}>
          TRAVELS
        </span>
      </span>
    </span>
  );
}
