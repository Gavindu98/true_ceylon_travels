import Image from "next/image";
import type { ReactNode } from "react";

type PageHeroProps = {
  imageSrc: string;
  imageAlt?: string;
  children: ReactNode;
  className?: string;
  minHeightClassName?: string;
  priority?: boolean;
};

export default function PageHero({
  imageSrc,
  imageAlt = "",
  children,
  className = "",
  minHeightClassName = "min-h-[280px] sm:min-h-[320px]",
  priority = true,
}: PageHeroProps) {
  const isRemote = /^https?:\/\//i.test(imageSrc);

  return (
    <section className={`relative overflow-hidden bg-[#052f27] text-white ${minHeightClassName} ${className}`.trim()}>
      {isRemote ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imageSrc} alt={imageAlt} className="absolute inset-0 h-full w-full object-cover object-center" />
      ) : (
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority={priority}
          sizes="100vw"
          className="object-cover object-center"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-[#03251f]/92 via-[#063c31]/72 to-[#063c31]/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#032a23]/75 via-transparent to-black/25" />
      <div className="relative mx-auto flex min-h-[inherit] max-w-6xl items-center px-6 py-16 lg:px-8">{children}</div>
    </section>
  );
}
