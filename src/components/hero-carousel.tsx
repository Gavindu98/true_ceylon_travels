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
    image: "/images/hero-sigiriya.svg",
    badge: "Cultural Triangle",
    title: "Climb Sigiriya and Walk Through Ancient Kingdoms",
    description: "Discover royal history, sacred temples, and authentic village experiences guided by local experts.",
  },
  {
    image: "/images/hero-yala.svg",
    badge: "Wildlife Adventures",
    title: "Feel the Wild Spirit of Sri Lanka in Yala",
    description: "Enjoy sunrise safaris, leopard spotting, and nature-rich routes designed for unforgettable memories.",
  },
  {
    image: "/images/hero-mirissa.svg",
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
    <section className="relative h-[calc(100dvh-var(--header-height))] overflow-hidden bg-[#0a3a3a] text-white">
      <Image src={currentSlide.image} alt={currentSlide.title} fill priority className="object-cover opacity-65" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#072d2d]/95 via-[#0d5555]/80 to-transparent" />
      <button
        type="button"
        aria-label="Previous slide"
        onClick={goToPreviousSlide}
        className="absolute left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur transition hover:bg-black/50"
      >
        <LeftOutlined />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={goToNextSlide}
        className="absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur transition hover:bg-black/50"
      >
        <RightOutlined />
      </button>

      <div className="relative mx-auto grid h-full max-w-6xl items-center gap-10 px-6 py-8 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="mb-4 inline-block rounded-full bg-white/15 px-4 py-1 text-sm font-medium">{currentSlide.badge}</p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">{currentSlide.title}</h1>
          <p className="mt-6 max-w-2xl text-base text-cyan-100 sm:text-lg">{currentSlide.description}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/contact">
              <Button type="primary" className="!uppercase !tracking-[0.05em]">
                Book Your Tour
              </Button>
            </Link>
            <a href="#destinations">
              <Button ghost>Explore Destinations</Button>
            </a>
          </div>

          <div className="mt-8 flex items-center gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.title}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 rounded-full transition-all ${index === activeIndex ? "w-8 bg-amber-300" : "w-2.5 bg-white/50 hover:bg-white/80"}`}
              />
            ))}
          </div>
        </div>

        <div className="hidden rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur md:block">
          <p className="text-sm text-cyan-100">Featured Route</p>
          <h3 className="mt-2 text-2xl font-bold">7 Days Classic Sri Lanka</h3>
          <p className="mt-3 text-sm text-cyan-100">Colombo - Sigiriya - Kandy - Ella - Yala - Mirissa with private driver guide.</p>
          <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
            <p className="rounded-xl bg-white/15 p-3">Culture</p>
            <p className="rounded-xl bg-white/15 p-3">Wildlife</p>
            <p className="rounded-xl bg-white/15 p-3">Beaches</p>
            <p className="rounded-xl bg-white/15 p-3">Tea Country</p>
          </div>
        </div>
      </div>
    </section>
  );
}
