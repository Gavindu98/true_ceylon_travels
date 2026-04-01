"use client";

import Image from "next/image";
import Link from "next/link";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useEffect, useState } from "react";

type Slide = {
  image: string;
  badge: string;
  title: string;
  description: string;
};

const slides: Slide[] = [
  {
    image: "/images/cover/ella_cover.png",
    badge: "Cultural Triangle",
    title: "Climb Sigiriya and Walk Through Ancient Kingdoms",
    description: "Discover royal history, sacred temples, and authentic village experiences guided by local experts.",
  },
  {
    image: "/images/cover/yala_cover.png",
    badge: "Wildlife Adventures",
    title: "Feel the Wild Spirit of Sri Lanka in Yala",
    description: "Enjoy sunrise safaris, leopard spotting, and nature-rich routes designed for unforgettable memories.",
  },
  {
    image: "/images/cover/mirissa_cover.png",
    badge: "Southern Beaches",
    title: "Chase Sunsets and Ocean Life in Mirissa",
    description: "Relax by tropical beaches, take whale-watching trips, and end your day with vibrant coastal vibes.",
  },
];

export default function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const goToNextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  const goToPreviousSlide = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      goToNextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const currentSlide = slides[activeIndex];

  return (
    <section className="relative h-dvh overflow-hidden bg-[#0a3a3a] text-white">
      <Image src={currentSlide.image} alt={currentSlide.title} fill priority className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-black/10" />
      <button
        type="button"
        aria-label="Previous slide"
        onClick={goToPreviousSlide}
        className="absolute left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/35 bg-black/45 text-white backdrop-blur transition hover:bg-black/65"
      >
        <LeftOutlined />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={goToNextSlide}
        className="absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/35 bg-black/45 text-white backdrop-blur transition hover:bg-black/65"
      >
        <RightOutlined />
      </button>

      <div className="relative mx-auto grid h-full max-w-6xl items-center gap-10 px-6 py-8 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="mb-4 inline-block rounded-full bg-white/85 px-4 py-1 text-sm font-semibold text-[#003527] shadow-md">
            {currentSlide.badge}
          </p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight !text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)] sm:text-5xl lg:text-6xl">
            {currentSlide.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base text-white/95 drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)] sm:text-lg">{currentSlide.description}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/contact">
              <Button type="primary" className="!h-11 !border-0 !bg-[#003527] !px-6 !uppercase !tracking-[0.05em] hover:!bg-[#064e3b]">
                Book Your Tour
              </Button>
            </Link>
            <a href="#destinations">
              <Button className="!h-11 !border-white/90 !bg-white/20 !px-6 !text-white hover:!border-white hover:!bg-white/35 hover:!text-white">
                Explore Destinations
              </Button>
            </a>
          </div>

          <div className="mt-8 flex items-center gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.title}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 rounded-full transition-all ${index === activeIndex ? "w-8 bg-amber-300" : "w-2.5 bg-white/60 hover:bg-white/90"}`}
              />
            ))}
          </div>
        </div>

        <div className="hidden rounded-3xl border border-white/60 bg-white/15 p-6 shadow-xl backdrop-blur-sm md:block">
          <p className="text-sm text-white/90">Featured Route</p>
          <h3 className="mt-2 text-2xl font-bold !text-amber-100">7 Days Classic Sri Lanka</h3>
          <p className="mt-3 text-sm text-white/90">Colombo - Sigiriya - Kandy - Ella - Yala - Mirissa with private driver guide.</p>
          <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
            <p className="rounded-xl bg-white/20 p-3 text-white">Culture</p>
            <p className="rounded-xl bg-white/20 p-3 text-white">Wildlife</p>
            <p className="rounded-xl bg-white/20 p-3 text-white">Beaches</p>
            <p className="rounded-xl bg-white/20 p-3 text-white">Tea Country</p>
          </div>
        </div>
      </div>
    </section>
  );
}
