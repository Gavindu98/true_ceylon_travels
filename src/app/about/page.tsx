import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/page-hero";

export const metadata: Metadata = {
  title: "About Us | True Ceylon Travels",
  description:
    "Learn about True Ceylon Travels — private, comfort-first tours and airport transfers across Sri Lanka with licensed chauffeur-guides and transparent pricing.",
};

const values = [
  {
    title: "Comfort, not speed",
    text: "Routes are paced for rest stops, photo moments, and real enjoyment—not rushed checklists.",
  },
  {
    title: "Private & personal",
    text: "Every journey is built around your dates, interests, and travel style for couples, families, and friends.",
  },
  {
    title: "Local expertise",
    text: "Licensed chauffeur-guides share culture, hidden gems, and practical tips so the island feels welcoming.",
  },
  {
    title: "Clear pricing",
    text: "Transparent quotes with no forced shopping stops—so you can travel with confidence from day one.",
  },
];

const services = [
  {
    title: "Day Tours",
    text: "One-day experiences across Colombo, Kandy, Galle, Sigiriya, safaris, and the south coast.",
    href: "/day-tours",
  },
  {
    title: "Multi-Day Tours",
    text: "Signature packages from short escapes to full island loops, designed for smooth routing.",
    href: "/tours",
  },
  {
    title: "Custom Itineraries",
    text: "Fully tailored private plans shaped around your pace, budget, and dream destinations.",
    href: "/custom-tours",
  },
  {
    title: "Airport Transfers",
    text: "Reliable private transfers with meet & greet for a calm start and finish to your trip.",
    href: "/contact",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[var(--color-surface)] text-[var(--foreground)]">
      <PageHero imageSrc="/images/cover/kandy-lake-hero.jpg" imageAlt="Scenic Sri Lanka landscape near Kandy Lake">
        <div>
          <p className="text-xs uppercase tracking-[0.12em] text-teal-100">About True Ceylon Travels</p>
          <h1 className="mt-2 text-4xl font-bold text-white sm:text-5xl">Travel Sri Lanka with comfort, not speed.</h1>
          <p className="mt-4 max-w-2xl text-teal-50">
            We design private journeys across the island—airport transfers, day tours, and tailor-made routes—so every traveler feels looked after from arrival to departure.
          </p>
        </div>
      </PageHero>

      <section className="mx-auto max-w-6xl px-6 py-14 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-secondary)]">Our Story</p>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">A local team for private Sri Lanka travel</h2>
            <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              True Ceylon Travels is a Sri Lanka–based private tour company focused on comfort-first travel. We help couples,
              families, and first-time visitors explore ancient cities, tea country, wildlife parks, and quiet beaches without
              the stress of rigid group schedules.
            </p>
            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              With licensed chauffeur-guides, a well-maintained private fleet, and transparent pricing, we look after the
              logistics so you can enjoy the island at a human pace. Tell us your dates and travel style—we’ll shape a route
              that feels personal from the first pickup.
            </p>
          </div>

          <aside className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-[#d7e4e4] sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#0f766e]">At a glance</p>
            <ul className="mt-5 space-y-4 text-sm text-slate-700">
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#0f766e]" aria-hidden="true" />
                Private chauffeur-driven tours island-wide
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#0f766e]" aria-hidden="true" />
                Flexible day tours and multi-day packages
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#0f766e]" aria-hidden="true" />
                Airport transfers with meet &amp; greet
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#0f766e]" aria-hidden="true" />
                Based in Kadawatha, serving travelers across Sri Lanka
              </li>
            </ul>
            <p className="mt-6 text-xs uppercase tracking-[0.1em] text-amber-700">Travel with comfort, not speed.</p>
          </aside>
        </div>
      </section>

      <section className="border-y border-[#e4ebe6] bg-[var(--color-surface-container-low)]">
        <div className="mx-auto max-w-6xl px-6 py-14 lg:px-8 lg:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-secondary)]">How We Work</p>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">What guides every journey</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            The same principles you’ll find across our tours and transfers—clear communication, flexible pacing, and trusted local care.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {values.map((item) => (
              <article key={item.title} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#d7e4e4]">
                <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14 lg:px-8 lg:py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-secondary)]">What We Offer</p>
        <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Ways to explore with us</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {services.map((item) => (
            <article key={item.title} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#d7e4e4]">
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
              <Link href={item.href} className="mt-4 inline-flex text-sm font-semibold text-[#0f766e] hover:text-[#115e59]">
                Learn more →
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-[#064e3b] to-[#0f766e] p-8 text-white sm:p-10">
          <h2 className="text-3xl font-bold text-white">Ready to plan your Sri Lanka trip?</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-teal-50 sm:text-base">
            Share your travel dates, group size, and preferred style. We’ll reply with a private itinerary shaped around you.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#064e3b] transition hover:bg-teal-50"
            >
              Contact Us
            </Link>
            <a
              href="https://wa.me/94707366627"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full border border-white/40 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              WhatsApp +94 707 366 627
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
