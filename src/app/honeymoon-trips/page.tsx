import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/page-hero";
import { honeymoonTrips } from "@/data/honeymoon-trips";
import { DEFAULT_HONEYMOON_HERO, resolveHoneymoonHero } from "@/lib/tour-heroes";

export const metadata: Metadata = {
  title: "Honeymoon Trips",
  description:
    "Private honeymoon trips across Sri Lanka — coastal romance, hill country escapes, classic island routes, and tailor-made leisure for couples.",
};

export default function HoneymoonTripsPage() {
  return (
    <main className="min-h-screen bg-[var(--color-surface)] text-[var(--foreground)]">
      <PageHero imageSrc={DEFAULT_HONEYMOON_HERO} imageAlt="Romantic Sri Lanka beach honeymoon landscape">
        <div>
          <p className="text-xs uppercase tracking-[0.12em] text-teal-100">For Couples</p>
          <h1 className="mt-2 text-4xl font-bold text-white sm:text-5xl">Honeymoon Trips</h1>
          <p className="mt-4 max-w-2xl text-teal-50">
            Private romantic journeys shaped for comfort, privacy, and unhurried time together across Sri Lanka.
          </p>
        </div>
      </PageHero>

      <section className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {honeymoonTrips.map((trip) => {
            const image = resolveHoneymoonHero(trip.slug, trip.coverImageUrl);
            return (
              <article key={trip.slug} className="overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#d7e4e4]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image} alt={trip.title} className="mb-4 h-40 w-full rounded-xl object-cover" />
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#0f766e]">{trip.duration}</p>
                <h2 className="mt-2 text-xl font-semibold">{trip.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{trip.description}</p>
                <Link
                  href={`/honeymoon-trips/${trip.slug}`}
                  className="mt-4 inline-flex rounded-full bg-[#0f766e] px-4 py-2 text-sm font-semibold text-white"
                >
                  View Details
                </Link>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
