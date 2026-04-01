import Image from "next/image";
import Link from "next/link";
import HeroCarousel from "@/components/hero-carousel";
import HomeMemories from "@/components/home-memories";
import { destinations } from "@/data/destinations";

export default function Home() {
  const homeDestinations = destinations.slice(0, 6);

  const stats = [
    { label: "Happy Travelers", value: "1,000+", icon: "😊", note: "Trusted by global guests" },
    { label: "Tours Completed", value: "1,200+", icon: "🧭", note: "Curated island-wide journeys" },
    { label: "Destinations", value: "150+", icon: "📍", note: "From coastlines to hill country" },
    { label: "Average Rating", value: "4.9 / 5", icon: "⭐", note: "Consistent five-star service" },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      country: "United States",
      text: "Our guide was incredibly knowledgeable, and every stop felt authentic. The entire trip ran smoothly from pickup to drop-off.",
    },
    {
      name: "David Chen",
      country: "Singapore",
      text: "We asked for a customized route and got exactly what we wanted. Great communication and excellent value for money.",
    },
    {
      name: "Emma Wilson",
      country: "Australia",
      text: "A perfect mix of culture, nature, and beach time. We discovered hidden places we never would have found ourselves.",
    },
  ];

  const faqs = [
    {
      q: "How can I book a tour?",
      a: "Send us your dates and preferences via WhatsApp or contact form. We confirm your itinerary and share booking details quickly.",
    },
    {
      q: "Do you offer custom itineraries?",
      a: "Yes. We design private trips based on your travel style, group size, pace, and budget.",
    },
    {
      q: "What is included in pricing?",
      a: "Most packages include transport, guide support, and key activity fees. Exact inclusions are listed on each itinerary.",
    },
    {
      q: "Are tours family friendly?",
      a: "Absolutely. We can recommend family-oriented routes with child-friendly timings and activities.",
    },
  ];

  return (
    <main className="min-h-screen bg-[var(--color-surface)] text-[var(--foreground)]">
      <HeroCarousel />

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
        <div className="rounded-3xl bg-gradient-to-r from-[#0f766e] to-[#115e59] p-8 text-white sm:p-10">
          <h2 className="text-3xl font-bold">Why Travel with True Ceylon Travels?</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <p className="rounded-xl bg-white/10 p-4">Licensed and experienced local guides.</p>
            <p className="rounded-xl bg-white/10 p-4">Transparent pricing and no hidden fees.</p>
            <p className="rounded-xl bg-white/10 p-4">Flexible private and group tour plans.</p>
            <p className="rounded-xl bg-white/10 p-4">Fast support before and during your trip.</p>
            <p className="rounded-xl bg-white/10 p-4">Culture-rich itineraries with hidden gems.</p>
            <p className="rounded-xl bg-white/10 p-4">Family-friendly and couple-friendly experiences.</p>
          </div>
        </div>
      </section>

      <HomeMemories />

      <section className="mx-auto max-w-6xl px-6 py-10 lg:px-8">
        <h2 className="text-3xl font-bold">What Travelers Say</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {testimonials.map((review) => (
            <blockquote key={review.name} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#d7e4e4]">
              <p className="text-slate-700">&quot;{review.text}&quot;</p>
              <footer className="mt-4">
                <p className="font-semibold text-slate-900">{review.name}</p>
                <p className="text-sm text-slate-500">{review.country}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10 lg:px-8">
        <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
        <div className="mt-6 space-y-4">
          {faqs.map((item) => (
            <details key={item.q} className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-[#d7e4e4]">
              <summary className="cursor-pointer font-semibold text-slate-900">{item.q}</summary>
              <p className="mt-3 text-slate-600">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-[#4c2300] to-[#735c00] p-8 text-white sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-amber-100">Share Your Experience</p>
          <h2 className="mt-2 text-3xl font-bold">Write a review, make someone&apos;s trip</h2>
          <p className="mt-3 max-w-3xl text-amber-50">
            Stories like yours help future travelers plan with confidence. Tell others about your True Ceylon Travels experience and help
            them choose the perfect journey.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold">
            <Link
              href="/contact"
              className="rounded-full bg-white px-5 py-2.5 text-[#4c2300] transition hover:bg-amber-100"
            >
              Write a Review
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-white/70 px-5 py-2.5 text-white transition hover:bg-white/10"
            >
              Contact Our Team
            </Link>
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
