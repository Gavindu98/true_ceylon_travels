import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/page-hero";
import { honeymoonTrips } from "@/data/honeymoon-trips";
import { resolveHoneymoonHero } from "@/lib/tour-heroes";

type HoneymoonTripDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return honeymoonTrips.map((trip) => ({ slug: trip.slug }));
}

export async function generateMetadata({ params }: HoneymoonTripDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const trip = honeymoonTrips.find((item) => item.slug === slug);
  if (!trip) return { title: "Honeymoon Trip" };
  return {
    title: trip.title,
    description: trip.description,
  };
}

export default async function HoneymoonTripDetailPage({ params }: HoneymoonTripDetailPageProps) {
  const { slug } = await params;
  const trip = honeymoonTrips.find((item) => item.slug === slug);

  if (!trip) {
    notFound();
  }

  const heroImage = resolveHoneymoonHero(trip.slug, trip.coverImageUrl);

  return (
    <main className="min-h-screen bg-[var(--color-surface)] text-[var(--foreground)]">
      <PageHero imageSrc={heroImage} imageAlt={`${trip.title} honeymoon in Sri Lanka`}>
        <div>
          <p className="text-xs uppercase tracking-[0.08em] text-teal-100">Honeymoon Trip</p>
          <h1 className="mt-2 text-4xl font-bold text-white sm:text-5xl">{trip.title}</h1>
          <p className="mt-4 max-w-2xl text-teal-50">{trip.description}</p>
        </div>
      </PageHero>

      <section className="mx-auto max-w-4xl px-6 py-12 lg:px-8">
        <article className="space-y-6 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-[#d7e4e4] sm:p-10">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-[var(--color-surface-container-low)] p-4">
              <p className="text-xs uppercase tracking-[0.08em] text-slate-500">Duration</p>
              <p className="mt-1 text-sm font-semibold text-slate-800">{trip.duration}</p>
            </div>
            <div className="rounded-2xl bg-[var(--color-surface-container-low)] p-4">
              <p className="text-xs uppercase tracking-[0.08em] text-slate-500">Best For</p>
              <p className="mt-1 text-sm font-semibold text-slate-800">{trip.bestFor}</p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold">Sample Route Flow</h2>
            <p className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
              {trip.routeFlow}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold">Trip Highlights</h2>
            <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-slate-700">
              {trip.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold">Romantic Touches</h2>
            <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-slate-700">
              {trip.romanticTouches.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold">Sample Journey Shape</h2>
            <ol className="mt-4 list-decimal space-y-1 pl-5 text-sm text-slate-700">
              {trip.sampleItinerary.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-bold">What Is Included</h3>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
                {trip.inclusions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold">Ideal For</h3>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
                {trip.idealFor.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-5">
            <p className="text-sm text-slate-700">
              Share your travel dates, preferred pace, and stay style. We will tailor this honeymoon route with private
              transfers and comfortable timing for two.
            </p>
          </div>

          <div className="mt-2 flex flex-wrap gap-3">
            <Link href="/contact" className="inline-flex rounded-full bg-[#0f766e] px-5 py-2.5 text-sm font-semibold text-white">
              Plan This Honeymoon
            </Link>
            <Link
              href="/honeymoon-trips"
              className="inline-flex rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold"
            >
              Back to Honeymoon Trips
            </Link>
          </div>
        </article>
      </section>
    </main>
  );
}
