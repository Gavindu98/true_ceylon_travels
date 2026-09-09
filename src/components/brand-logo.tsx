import Image from "next/image";
import Link from "next/link";

type BrandLogoProps = {
  variant?: "dark" | "light";
  href?: string | null;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeClass: Record<NonNullable<BrandLogoProps["size"]>, string> = {
  sm: "h-11 w-auto sm:h-12",
  md: "h-12 w-auto sm:h-14",
  lg: "h-16 w-auto sm:h-20",
};

export default function BrandLogo({
  variant = "dark",
  href = "/",
  size = "md",
  className = "",
}: BrandLogoProps) {
  const logo = (
    <span className={`inline-flex items-center ${className}`.trim()}>
      <Image
        src="/images/brand-logo.png"
        alt="True Ceylon Travels"
        width={561}
        height={471}
        priority={size !== "lg"}
        className={`object-contain ${sizeClass[size]} ${variant === "light" ? "brightness-110" : ""}`}
      />
    </span>
  );

  if (!href) return logo;

  return (
    <Link href={href} className="shrink-0" aria-label="True Ceylon Travels home">
      {logo}
    </Link>
  );
}
