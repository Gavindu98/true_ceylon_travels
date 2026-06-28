import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import HeroCarousel from "@/components/hero-carousel";
import FeaturedCampaigns from "@/components/featured-campaigns";
import HomeMemories from "@/components/home-memories";
import HomeAdvertisements from "@/components/home-advertisements";
import { destinations } from "@/data/destinations";
import { createServiceRoleClient } from "@/lib/supabase/admin";
import type { FeedbackRecord } from "@/types/feedback";

export const metadata: Metadata = {
  title: "Private Tours and Airport Transfers in Sri Lanka",
  description:
    "Plan private Sri Lanka tours with True Ceylon Travels. Book airport transfers, custom itineraries, safaris, beaches, and hill country experiences.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Private Tours and Airport Transfers in Sri Lanka",
    description:
      "Plan private Sri Lanka tours with True Ceylon Travels. Book airport transfers, custom itineraries, safaris, beaches, and hill country experiences.",
    url: "https://trueceylontravels.com/",
    images: [
      {
        url: "/images/campaign/sri-lanka-grid.png",
        width: 1200,
        height: 630,
        alt: "Private Sri Lanka tours by True Ceylon Travels",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Private Tours and Airport Transfers in Sri Lanka",
    description:
      "Plan private Sri Lanka tours with True Ceylon Travels. Book airport transfers, custom itineraries, safaris, beaches, and hill country experiences.",
    images: ["/images/campaign/sri-lanka-grid.png"],
  },
};

export default async function Home() {
  const homeDestinations = destinations.slice(0, 6);

  const stats = [
    { label: "Happy Travelers", value: "1,000+", icon: "😊", note: "Trusted by global guests" },
    { label: "Tours Completed", value: "1,200+", icon: "🧭", note: "Curated island-wide journeys" },
    { label: "Destinations", value: "150+", icon: "📍", note: "From coastlines to hill country" },
    { label: "Average Rating", value: "4.9 / 5", icon: "⭐", note: "Consistent five-star service" },
  ];

  let testimonials: FeedbackRecord[] = [];
  try {
    const supabase = createServiceRoleClient();
    const { data, error } = await supabase.from("feedback").select("*").order("created_at", { ascending: false }).limit(6);
    if (!error && data) {
      testimonials = data as FeedbackRecord[];
    }
  } catch {
    testimonials = [];
  }

  const faqs = [
    {
      q: "Do you offer customized tour packages?",
      a: "Yes. We specialize in fully personalized travel experiences. Every itinerary is designed based on your budget, travel style, and interests.",
    },
    {
      q: "Can you plan a trip within my budget?",
      a: "Absolutely. We create flexible travel plans ranging from comfortable to luxury experiences, ensuring you get the best value without compromising quality.",
    },
    {
      q: "What is included in your tour packages?",
      a: "Our packages typically include:\n\nPrivate air-conditioned vehicle\nProfessional chauffeur guide\nAccommodation options (on request)\nActivity planning and recommendations\n\nEverything can be adjusted to your needs.",
    },
    {
      q: "Do you provide airport pickup and drop-off?",
      a: "Yes, we offer reliable airport transfers with a warm welcome and smooth drop-off at the end of your journey.",
    },
    {
      q: "Can we choose our own hotels?",
      a: "Of course. You can:\n\nBook your own hotels, or\nLet us arrange handpicked 3★, 4★, or 5★ stays\n\nWe adapt to your preference.",
    },
    {
      q: "Is the driver also a guide?",
      a: "Yes. Our chauffeurs are experienced, English-speaking driver-guides who provide local insights and ensure a safe, comfortable journey.",
    },
    {
      q: "Do you arrange activities like safari or whale watching?",
      a: "Yes, we organize:\n\nWildlife safaris\nWhale watching tours\nCultural experiences\nScenic train rides\n\nAll activities can be added to your customized plan.",
    },
    {
      q: "How do I book a tour with you?",
      a: "Booking is simple:\n\nContact us via WhatsApp\nShare your travel dates and preferences\nReceive a customized itinerary\nConfirm your trip",
    },
    {
      q: "Is Sri Lanka safe for tourists?",
      a: "Yes, Sri Lanka is a safe and welcoming destination. We ensure your journey is smooth, secure, and well-organized throughout.",
    },
    {
      q: "Why choose True Ceylon Travels?",
      a: "Because we offer:\n\nPersonalized travel planning\nTransparent and flexible pricing\nProfessional service\nLocal expertise\nMemorable travel experiences\n\nWe don't sell fixed packages—we create journeys designed just for you.",
    },
    {
      q: "How fast will I receive my itinerary?",
      a: "Most inquiries receive a custom travel plan within a few hours, depending on your requirements.",
    },
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a.replaceAll("\n", " "),
      },
    })),
  };

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "True Ceylon Travels",
    url: "https://trueceylontravels.com",
    image: "https://trueceylontravels.com/images/campaign/sri-lanka-grid.png",
    telephone: "+94 707 366 627",
    email: "info@trueceylontravels.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "No 142/1 Bandaramawatha Gonahena",
      addressLocality: "Kadawatha",
      addressCountry: "LK",
    },
    sameAs: [
      "https://www.facebook.com/Trueceylontravels26?sfnsn=wa&mibextid=RUbZ1f",
      "https://www.instagram.com/trueceylontravels?utm_source=qr&igsh=dXo0OGh3ZTE5ejF1",
    ],
  };

  return (
    <main className="min-h-screen bg-[var(--color-surface)] mt-[-7px] text-[var(--foreground)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <HeroCarousel />
      <FeaturedCampaigns />

      <section id="destinations" className="mx-auto max-w-6xl px-6 py-10 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
          <h2 className="text-3xl font-bold text-slate-900">Popular Destinations</h2>
          <p className="mt-2 text-slate-600">
            Signature package destinations from our complete Sri Lanka tour lineup.
          </p>
          </div>
          <Link
            href="/destinations"
            className="rounded-full border border-[#0f766e] px-5 py-2 text-sm font-semibold text-[#0f766e] transition hover:bg-teal-50"
          >
            View All Destinations
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {homeDestinations.map((tour) => (
            <article
              key={tour.title}
              className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-[#d7e4e4]"
            >
              <div className="relative h-44 w-full">
                <Image src={tour.image} alt={tour.title} fill className="object-cover" />
              </div>
              <div className="space-y-3 p-6">
                <p className="text-sm font-medium text-teal-700">{tour.area}</p>
                <h3 className="text-xl font-bold text-slate-900">{tour.title}</h3>
                <p className="text-sm text-slate-600">{tour.routeSnapshot}</p>
                <p className="text-sm text-slate-600">{tour.highlights}</p>
                <div className="flex flex-wrap gap-2">
                  {(tour.featuredIn ?? []).slice(0, 2).map((pkg) => (
                    <span key={pkg} className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
                      {pkg}
                    </span>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p className="rounded-lg bg-slate-100 px-3 py-2">Duration: {tour.duration}</p>
                  <p className="rounded-lg bg-slate-100 px-3 py-2">Rating: {tour.rating}</p>
                </div>
                <p className="text-sm font-semibold text-amber-600">Best for: {tour.bestFor}</p>
                <p className="text-xs text-slate-500">Flexible private transport, comfort-first pacing, no forced shopping.</p>
                <Link
                  href={`/destinations/${tour.slug}`}
                  className="inline-flex rounded-full bg-[#0f766e] px-4 py-2 text-sm font-semibold text-white hover:bg-[#115e59]"
                >
                  More Details
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14 lg:px-8">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-secondary)]">Why Travelers Choose Us</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">Trusted Performance at Every Step</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.label}
              className="group rounded-2xl bg-white p-5 shadow-sm ring-1 ring-[#d7e4e4] transition duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-semibold text-slate-700">{item.label}</p>
                <span className="rounded-full bg-[var(--color-surface-container-low)] px-2.5 py-1 text-sm">{item.icon}</span>
              </div>
              <p className="mt-3 text-3xl font-bold text-[#0f766e]">{item.value}</p>
              <p className="mt-2 text-sm text-slate-600">{item.note}</p>
              <div className="mt-3 h-1 w-12 rounded-full bg-[#0f766e]/20 transition-all duration-300 group-hover:w-20 group-hover:bg-[#0f766e]/40" />
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#063a33] via-[#0b4f45] to-[#4c2300] p-8 text-white shadow-xl ring-1 ring-white/15 sm:p-10">
          <div className="pointer-events-none absolute -left-12 -top-12 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 right-0 h-64 w-64 rounded-full bg-amber-300/20 blur-3xl" />

          <div className="relative flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-amber-200">True Ceylon Promise</p>
              <h2 className="mt-2 text-3xl font-bold !text-amber-100 sm:text-4xl">Why Travel with True Ceylon Travels?</h2>
              <p className="mt-3 max-w-2xl text-sm text-white/85 sm:text-base">
                Premium comfort, trusted local expertise, and thoughtfully paced routes designed for unforgettable Sri Lanka journeys.
              </p>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/10 px-5 py-4 text-right backdrop-blur-sm">
              <p className="text-xs uppercase tracking-[0.1em] text-amber-200">Client Satisfaction</p>
              <p className="mt-1 text-2xl font-bold !text-amber-100">4.9 / 5</p>
            </div>
          </div>

          <div className="relative mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <article className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-sm font-semibold !text-amber-100">✅ Licensed Experts</p>
              <p className="mt-1 text-sm text-white/90">Licensed and experienced local guides.</p>
            </article>
            <article className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-sm font-semibold !text-amber-100">💰 Clear Pricing</p>
              <p className="mt-1 text-sm text-white/90">Transparent pricing and no hidden fees.</p>
            </article>
            <article className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-sm font-semibold !text-amber-100">🧭 Flexible Plans</p>
              <p className="mt-1 text-sm text-white/90">Flexible private and group tour plans.</p>
            </article>
            <article className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-sm font-semibold !text-amber-100">⚡ Fast Support</p>
              <p className="mt-1 text-sm text-white/90">Fast support before and during your trip.</p>
            </article>
            <article className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-sm font-semibold !text-amber-100">🏛️ Local Culture</p>
              <p className="mt-1 text-sm text-white/90">Culture-rich itineraries with hidden gems.</p>
            </article>
            <article className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-sm font-semibold !text-amber-100">👨‍👩‍👧‍👦 All Traveler Types</p>
              <p className="mt-1 text-sm text-white/90">Family-friendly and couple-friendly experiences.</p>
            </article>
          </div>

          <div className="relative mt-6 grid gap-3 text-center text-xs sm:grid-cols-3 sm:text-sm">
            <p className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-white/95">1000+ happy travelers</p>
            <p className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-white/95">Comfort-first travel pace</p>
            <p className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-white/95">Island-wide curated routes</p>
          </div>
        </div>
      </section>

      <HomeMemories />

      <HomeAdvertisements />

      <section className="mx-auto max-w-6xl px-6 py-10 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-secondary)]">Client Feedback</p>
            <h2 className="mt-2 text-3xl font-bold">What Travelers Say</h2>
          </div>
          <Link
            href="/feedbacks"
            className="rounded-full border border-[#0f766e] px-4 py-2 text-xs font-semibold text-[#0f766e] transition hover:bg-teal-50 sm:text-sm"
          >
            View More Feedbacks
          </Link>
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {testimonials.length === 0 ? (
            <p className="text-sm text-slate-600">No client feedback yet.</p>
          ) : (
            testimonials.map((review) => (
              <blockquote
                key={review.id}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-white to-[#f8fafc] p-6 shadow-sm ring-1 ring-[#d7e4e4] transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#0f766e] via-[#34d399] to-[#eab308]" />
                <div className="flex items-center gap-3">
                  {review.profile_pic_url ? (
                    <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-[#0f766e]/20">
                      {review.profile_pic_url.startsWith("/") ? (
                        <Image src={review.profile_pic_url} alt={review.name || "Traveler"} fill className="object-cover" />
                      ) : (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={review.profile_pic_url} alt={review.name || "Traveler"} className="h-full w-full object-cover" loading="lazy" />
                      )}
                    </div>
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0f766e]/10 text-sm font-semibold text-[#0f766e] ring-2 ring-[#0f766e]/20">
                      {(review.name || "GT")
                        .split(" ")
                        .map((p) => p[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </div>
                  )}
                  <div className="flex max-h-12 flex-col justify-center gap-0">
                    <p className="font-semibold text-slate-900 mb-[-10px]" style={{ marginBottom: "-5px" }}>{review.name || "Guest Traveler"}</p>
                    <p className="text-sm text-slate-500 mb-[-10px]" style={{ marginBottom: "1px" }}>{review.country || "Sri Lanka Tour"}</p>
                    {review.feedback_date ? <p className="text-xs text-slate-500">{review.feedback_date}</p> : null}
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-1 text-[#f59e0b]">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                </div>
                <p className="mt-3 text-slate-700">&quot;{review.description || "Great experience with True Ceylon Travels."}&quot;</p>
                {review.title ? (
                  <p className="mt-4 inline-flex rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.06em] text-amber-700 ring-1 ring-amber-200">
                    {review.title}
                  </p>
                ) : null}
              </blockquote>
            ))
          )}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10 lg:px-8">
        <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
        <div className="mt-6 space-y-4">
          {faqs.map((item) => (
            <details key={item.q} className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-[#d7e4e4]">
              <summary className="cursor-pointer font-semibold text-slate-900">{item.q}</summary>
              <p className="mt-3 whitespace-pre-line text-slate-600">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#3f1b00] via-[#6b4a00] to-[#0f5f52] p-8 text-white shadow-xl ring-1 ring-white/15 sm:p-10">
          <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-16 -right-10 h-52 w-52 rounded-full bg-[#34e0a1]/20 blur-3xl" />

          <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-amber-200">Share Your Experience</p>
              <h2 className="mt-2 text-3xl font-bold leading-tight !text-amber-100 sm:text-4xl">Write a review, make someone&apos;s trip</h2>
              <p className="mt-3 max-w-xl text-sm text-amber-50 sm:text-base">
                Stories like yours are what help travelers plan better trips. Share your experience and guide future visitors with confidence.
              </p>

              <div className="mt-6 grid gap-3 text-sm text-white/90 sm:grid-cols-2">
                <p className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-sm">Trusted social proof for new travelers</p>
                <p className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-sm">Supports our local travel community</p>
              </div>

              <div className="mt-7 flex flex-wrap gap-3 text-sm font-semibold">
                <Link
                  href="https://www.tripadvisor.com/Profile/Dream66288453201"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-[#34e0a1] px-6 py-3 text-[#03352e] transition hover:brightness-95"
                >
                  Write a Review
                </Link>
                <Link
                  href="/contact"
                  className="rounded-full border border-white/70 px-6 py-3 text-white transition hover:bg-white/10"
                >
                  Contact Our Team
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm sm:p-6">
              <div className="relative mx-auto h-44 w-full max-w-md">
                <Image src="/images/tripadvisor-srilanka-tours.webp" alt="Tripadvisor True Ceylon Travels" fill className="object-contain" />
              </div>
              <p className="mt-4 text-center text-sm text-white/90">Your feedback helps travelers make better choices.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16 pt-10 lg:px-8">
        <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-[#d7e4e4] sm:p-10">
          <h2 className="text-3xl font-bold text-slate-900">Plan Your Dream Sri Lanka Trip</h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            Share your travel dates, group size, and interests. Our team will craft the right itinerary for you.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm font-semibold">
            <Link href="/contact" className="rounded-full bg-teal-800 px-5 py-3 text-white hover:bg-teal-700">
              Contact Us
            </Link>
            <Link href="/contact" className="rounded-full border border-teal-800 px-5 py-3 text-teal-800 hover:bg-teal-50">
              Book Now
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
