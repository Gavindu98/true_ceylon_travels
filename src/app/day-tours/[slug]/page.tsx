import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/page-hero";
import { resolveDayTourHero } from "@/lib/tour-heroes";
import { getTourContentData } from "@/lib/tour-content";

type DayTourDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function DayTourDetailPage({ params }: DayTourDetailPageProps) {
  const { slug } = await params;
  const { dayTours } = await getTourContentData();
  const tour = dayTours.find((item) => item.slug === slug);

  if (!tour) {
    notFound();
  }

  const heroImage = resolveDayTourHero(tour.slug, tour.coverImageUrl);

  return (
    <main className="min-h-screen bg-[var(--color-surface)] text-[var(--foreground)]">
      <PageHero imageSrc={heroImage} imageAlt={`${tour.title} in Sri Lanka`}>
        <div>
          <p className="text-xs uppercase tracking-[0.08em] text-teal-100">Day Tour</p>
          <h1 className="mt-2 text-4xl font-bold text-white sm:text-5xl">{tour.title}</h1>
          <p className="mt-4 max-w-2xl text-teal-50">{tour.description}</p>
        </div>
      </PageHero>

      <section className="mx-auto max-w-4xl px-6 py-12 lg:px-8">
        <article className="space-y-6 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-[#d7e4e4] sm:p-10">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-[var(--color-surface-container-low)] p-4">
              <p className="text-xs uppercase tracking-[0.08em] text-slate-500">Location</p>
              <p className="mt-1 text-sm font-semibold text-slate-800">{tour.location}</p>
            </div>
            <div className="rounded-2xl bg-[var(--color-surface-container-low)] p-4">
              <p className="text-xs uppercase tracking-[0.08em] text-slate-500">Duration</p>
              <p className="mt-1 text-sm font-semibold text-slate-800">{tour.duration}</p>
            </div>
            <div className="rounded-2xl bg-[var(--color-surface-container-low)] p-4">
              <p className="text-xs uppercase tracking-[0.08em] text-slate-500">Best For</p>
              <p className="mt-1 text-sm font-semibold text-slate-800">{tour.bestFor}</p>
            </div>
            <div className="rounded-2xl bg-[var(--color-surface-container-low)] p-4">
              <p className="text-xs uppercase tracking-[0.08em] text-slate-500">Starting Price</p>
              <p className="mt-1 text-sm font-semibold text-emerald-700">{tour.startingPrice}</p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold">Tour Highlights</h2>
            <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-slate-700">
              {tour.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold">Sample Day Plan</h2>
            <ol className="mt-4 list-decimal space-y-1 pl-5 text-sm text-slate-700">
              {tour.itinerary.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-bold">What Is Included</h3>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
                {tour.inclusions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold">Ideal For</h3>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
                {tour.idealFor.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-5">
            <p className="text-sm text-slate-700">
              Need custom pickup time, child seats, or extra sightseeing stops? Share your travel date and we will tailor this
              day tour for your group.
            </p>
          </div>

          <div className="mt-2 flex flex-wrap gap-3">
            <Link href="/contact" className="inline-flex rounded-full bg-[#0f766e] px-5 py-2.5 text-sm font-semibold text-white">
              Book This Day Tour
            </Link>
            <Link href="/day-tours" className="inline-flex rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold">
              Back to Day Tours
            </Link>
          </div>
        </article>
      </section>
    </main>
  );
}
