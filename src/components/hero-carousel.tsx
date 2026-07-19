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
  tourTitle: string;
  route: string[];
  highlights: string[];
  smartFlow?: string[];
};

const slides: Slide[] = [
  {
    image: "/images/cover/classic-escape-hero.webp",
    badge: "6-day private journey",
    title: "Sri Lanka’s Timeless Icons in One Classic Escape",
    description: "Ancient wonders, tea country, river life, and a relaxing beach finale—thoughtfully paced for first-time visitors.",
    tourTitle: "06 Days & 05 Nights Classic Escape",
    route: ["Airport", "Dambulla", "Sigiriya", "Kandy", "Nuwara Eliya", "Bentota"],
    highlights: [
      "Sigiriya & Dambulla caves",
      "Tea plantations & waterfalls",
      "Optional Kandy–Nuwara Eliya train ride",
      "Bentota river safari",
      "Beach relaxation",
    ],
  },
  {
    image: "/images/cover/splendor-tour-hero.webp",
    badge: "7-day private journey",
    title: "From Misty Highlands to the Wild South",
    description: "Walk Ella’s famous trails, search for leopards in Yala, and finish beside the Indian Ocean in Mirissa.",
    tourTitle: "07 Days Splendor Tour",
    route: ["Airport", "Sigiriya", "Kandy", "Ella", "Yala National Park", "Mirissa"],
    highlights: ["Nine Arch Bridge", "Little Adam’s Peak", "Yala leopard safari", "Seasonal whale watching"],
    smartFlow: ["Downhill scenic drive from Ella to Yala", "No backtracking"],
  },
  {
    image: "/images/cover/grand-splendor-hero.webp",
    badge: "8-day private journey",
    title: "Ancient Capitals, Scenic Rails, and Coastal Stories",
    description: "Travel from Sri Lanka’s sacred heritage sites through the green highlands to an unforgettable Galle Fort sunset.",
    tourTitle: "08 Days Grand Splendor Tour",
    route: ["Airport", "Anuradhapura", "Sigiriya", "Kandy", "Ella", "Galle"],
    highlights: ["Ancient ruins & temples", "Scenic train journey", "Dutch Fort sunset", "Beach & history combination"],
  },
  {
    image: "/images/cover/witness-beauty-hero.webp",
    badge: "9-day private journey",
    title: "Witness Every Side of Sri Lanka’s Beauty",
    description: "A complete island experience blending cool hill country, iconic viewpoints, thrilling wildlife, and tropical beaches.",
    tourTitle: "09 Days Witness the Beauty",
    route: ["Airport", "Sigiriya", "Kandy", "Nuwara Eliya", "Ella", "Yala National Park", "Mirissa"],
    highlights: ["Full hill-country experience", "Safari & beach combination", "Iconic photo stops throughout the route"],
  },
  {
    image: "/images/cover/nature-safari-hero.webp",
    badge: "12-day private journey",
    title: "Go Deeper into Sri Lanka’s Wild Heart",
    description: "A nature-first journey through three national parks, rich birdlife, remote landscapes, and the tranquil Tangalle coast.",
    tourTitle: "12 Days Nature & Safari Tour",
    route: ["Airport", "Wilpattu National Park", "Sigiriya", "Kandy", "Ella", "Yala National Park", "Udawalawe National Park", "Tangalle"],
    highlights: ["Multiple wildlife safaris", "Bird watching", "Deep nature immersion"],
  },
];

export default function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const goToNextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  const goToPreviousSlide = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 6500);

    return () => clearInterval(timer);
  }, [isPaused]);

  const currentSlide = slides[activeIndex];

  return (
    <section
      className="relative min-h-dvh overflow-hidden bg-[#0a3a3a] text-white"
      aria-roledescription="carousel"
      aria-label="Featured Sri Lanka tour packages"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
      onTouchStart={(event) => setTouchStart(event.touches[0].clientX)}
      onTouchEnd={(event) => {
        if (touchStart === null) return;
        const distance = touchStart - event.changedTouches[0].clientX;
        if (Math.abs(distance) > 50) {
          if (distance > 0) {
            goToNextSlide();
          } else {
            goToPreviousSlide();
          }
        }
        setTouchStart(null);
      }}
    >
      <Image
        key={currentSlide.image}
        src={currentSlide.image}
        alt=""
        fill
        fetchPriority={activeIndex === 0 ? "high" : "auto"}
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20" />
      <button
        type="button"
        aria-label="Previous slide"
        onClick={goToPreviousSlide}
        className="absolute left-3 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/35 bg-black/45 text-white backdrop-blur transition hover:bg-black/65 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 sm:flex lg:left-5"
      >
        <LeftOutlined />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={goToNextSlide}
        className="absolute right-3 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/35 bg-black/45 text-white backdrop-blur transition hover:bg-black/65 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 sm:flex lg:right-5"
      >
        <RightOutlined />
      </button>

      <div className="relative mx-auto grid min-h-dvh max-w-7xl items-center gap-7 px-5 pb-10 pt-28 sm:px-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(420px,1.05fr)] lg:gap-12 lg:px-20 lg:py-28 xl:px-16">
        <div className="pt-4 lg:pt-0">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/90 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#003527] shadow-md">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" aria-hidden="true" />
            {currentSlide.badge}
          </p>
          <h1 className="max-w-3xl text-4xl font-bold leading-[1.08] !text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] sm:text-5xl lg:text-6xl">
            {currentSlide.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)] sm:text-lg">{currentSlide.description}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/contact">
              <Button type="primary" className="!h-11 !border-0 !bg-amber-400 !px-6 !font-bold !text-[#003527] hover:!bg-amber-300">
                Plan This Tour
              </Button>
            </Link>
            <a href="#destinations">
              <Button className="!h-11 !border-white/90 !bg-white/20 !px-6 !text-white hover:!border-white hover:!bg-white/35 hover:!text-white">
                Explore Destinations
              </Button>
            </a>
          </div>
        </div>

        <article
          className="rounded-[1.75rem] border border-white/35 bg-[#071f1a]/70 p-5 shadow-2xl shadow-black/25 backdrop-blur-md sm:p-6"
          aria-live="polite"
        >
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-300">Featured route</p>
            <p className="text-xs tabular-nums text-white/65">
              {String(activeIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
            </p>
          </div>
          <h2 className="mt-2 text-2xl font-bold !text-white sm:text-[1.7rem]">{currentSlide.tourTitle}</h2>

          <div className="mt-5">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/55">Route</p>
            <div className="mt-2 flex flex-wrap items-center gap-x-1.5 gap-y-2 text-sm leading-6 text-white/90">
              {currentSlide.route.map((stop, index) => (
                <span key={stop} className="inline-flex items-center gap-1.5">
                  <span>{stop}</span>
                  {index < currentSlide.route.length - 1 && <span className="text-amber-300/80" aria-hidden="true">→</span>}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-5 border-t border-white/15 pt-4">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/55">Highlights</p>
            <ul className="mt-3 grid gap-x-5 gap-y-2 text-sm text-white/90 sm:grid-cols-2">
              {currentSlide.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300" aria-hidden="true" />
                  <span className="leading-5">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {currentSlide.smartFlow && (
            <div className="mt-5 rounded-2xl border border-emerald-200/20 bg-emerald-100/10 px-4 py-3">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-200">Smart flow</p>
              <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-white/85">
                {currentSlide.smartFlow.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="text-emerald-300" aria-hidden="true">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </article>

        <div className="flex items-center justify-center gap-2 lg:col-span-2 lg:absolute lg:bottom-8 lg:left-1/2 lg:-translate-x-1/2">
          {slides.map((slide, index) => (
            <button
              key={slide.tourTitle}
              type="button"
              aria-label={`Show ${slide.tourTitle}`}
              aria-current={index === activeIndex ? "true" : undefined}
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 rounded-full transition-all focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300 ${
                index === activeIndex ? "w-9 bg-amber-300" : "w-2.5 bg-white/55 hover:bg-white/90"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
