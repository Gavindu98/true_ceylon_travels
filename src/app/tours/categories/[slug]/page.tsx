import Link from "next/link";
import { notFound } from "next/navigation";
import { getTourContentData } from "@/lib/tour-content";

type TourCategoryDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function TourCategoryDetailPage({ params }: TourCategoryDetailPageProps) {
  const { slug } = await params;
  const { tourStyles } = await getTourContentData();
  const tourCategory = tourStyles.find((item) => item.slug === slug);

  if (!tourCategory) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[var(--color-surface)] text-[var(--foreground)]">
      <section
        className="bg-gradient-to-r from-[#0f766e] to-[#115e59] text-white"
        style={
          tourCategory.coverImageUrl
            ? {
                backgroundImage: `linear-gradient(rgba(8,47,43,0.62), rgba(8,47,43,0.62)), url(${tourCategory.coverImageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : undefined
        }
      >
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
          <p className="text-xs uppercase tracking-[0.08em] text-teal-100">Tour Category</p>
          <h1 className="mt-2 text-4xl font-bold sm:text-5xl">{tourCategory.title}</h1>
          <p className="mt-4 max-w-2xl text-teal-50">{tourCategory.description}</p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-12 lg:px-8">
        <article className="space-y-6 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-[#d7e4e4] sm:p-10">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-[var(--color-surface-container-low)] p-4">
              <p className="text-xs uppercase tracking-[0.08em] text-slate-500">Sample Duration</p>
              <p className="mt-1 text-sm font-semibold text-slate-800">{tourCategory.sampleDuration}</p>
            </div>
            <div className="rounded-2xl bg-[var(--color-surface-container-low)] p-4">
              <p className="text-xs uppercase tracking-[0.08em] text-slate-500">Travel Style</p>
              <p className="mt-1 text-sm font-semibold text-slate-800">{tourCategory.travelStyle}</p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold">Sample Route Flow</h2>
            <p className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
              {tourCategory.routeFlow}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-bold">Popular Destinations</h3>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
                {tourCategory.sampleDestinations.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold">Featured Experiences</h3>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
                {tourCategory.featuredExperiences.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-bold">Why Travelers Choose This</h3>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
                {tourCategory.whyTravelersChoose.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold">Typical Package Includes</h3>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
                {tourCategory.packageIncludes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-5">
            <p className="text-sm text-slate-700">
              Tell us your travel date, group size, and preferred pace. We will convert this category into a complete route
              plan with custom stops.
            </p>
          </div>

          <div className="mt-2 flex flex-wrap gap-3">
            <Link href="/contact" className="inline-flex rounded-full bg-[#0f766e] px-5 py-2.5 text-sm font-semibold text-white">
              Plan This Tour
            </Link>
            <Link href="/tours/categories" className="inline-flex rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold">
              Back to Categories
            </Link>
          </div>
        </article>
      </section>
    </main>
  );
}
