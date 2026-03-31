import Link from "next/link";
import HeroCarousel from "@/components/hero-carousel";

export default function Home() {
  const destinations = [
    { name: "Sigiriya Rock Fortress", area: "Cultural Triangle", rating: "4.9", tone: "from-amber-400 to-orange-500" },
    { name: "Yala Safari Adventure", area: "Southern Wild Coast", rating: "4.8", tone: "from-emerald-500 to-lime-500" },
    { name: "Ella Scenic Highlands", area: "Hill Country", rating: "5.0", tone: "from-teal-500 to-cyan-500" },
    { name: "Mirissa Whale Coast", area: "South Coast", rating: "4.9", tone: "from-sky-500 to-blue-500" },
    { name: "Kandy Heritage Walk", area: "Central Province", rating: "4.7", tone: "from-violet-500 to-purple-500" },
    { name: "Galle Fort & Beaches", area: "Southwest Coast", rating: "4.8", tone: "from-fuchsia-500 to-rose-500" },
  ];

  const stats = [
    { label: "Happy Travelers", value: "1,000+" },
    { label: "Tours Completed", value: "1,200+" },
    { label: "Destinations", value: "150+" },
    { label: "Average Rating", value: "4.9 / 5" },
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

      <section className="mx-auto max-w-6xl px-6 py-14 lg:px-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-[#d7e4e4]">
              <p className="text-2xl font-bold text-[#0f766e]">{item.value}</p>
              <p className="mt-1 text-sm text-slate-600">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="destinations" className="mx-auto max-w-6xl px-6 py-10 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
          <h2 className="text-3xl font-bold text-slate-900">Popular Destinations</h2>
          <p className="mt-2 text-slate-600">
            Carefully curated tours inspired by Sri Lanka&apos;s most loved places.
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
          {destinations.map((tour) => (
            <article key={tour.name} className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-[#d7e4e4]">
              <div className={`h-24 w-full bg-gradient-to-r ${tour.tone}`} />
              <div className="p-6">
                <p className="text-sm font-medium text-teal-700">{tour.area}</p>
                <h3 className="mt-2 text-xl font-semibold">{tour.name}</h3>
                <p className="mt-3 text-sm text-slate-600">Small groups, private options, and flexible pickup times available.</p>
                <p className="mt-5 text-sm font-semibold text-amber-600">Rating: {tour.rating} / 5</p>
              </div>
            </article>
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
