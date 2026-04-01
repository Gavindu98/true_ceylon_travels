import Link from "next/link";
import { destinations } from "@/data/destinations";

export default function DestinationsPage() {
  return (
    <main className="min-h-screen bg-[var(--color-surface)] text-[var(--foreground)]">
      <section className="bg-gradient-to-r from-[#0f766e] to-[#115e59] text-white">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
          <p className="inline-block rounded-full bg-white/15 px-4 py-1 text-sm font-medium">Explore Sri Lanka</p>
          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">All Destinations</h1>
          <p className="mt-4 max-w-2xl text-teal-50">
            Signature destinations from our 04, 06, 07, 08, 09, 12, and 15-day tour packages.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {destinations.map((item) => (
            <article key={item.title} className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-[#d7e4e4]">
              <div className="h-28 w-full bg-gradient-to-r from-[#0f766e] via-[#115e59] to-[#4c2300]" />
              <div className="space-y-3 p-6">
                <p className="text-sm font-medium text-teal-700">{item.area}</p>
                <h2 className="text-xl font-bold text-slate-900">{item.title}</h2>
                <p className="text-sm text-slate-600">{item.routeSnapshot}</p>
                <p className="text-sm text-slate-600">{item.highlights}</p>
                <div className="flex flex-wrap gap-2">
                  {(item.featuredIn ?? []).slice(0, 2).map((pkg) => (
                    <span key={pkg} className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
                      {pkg}
                    </span>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p className="rounded-lg bg-slate-100 px-3 py-2">Duration: {item.duration}</p>
                  <p className="rounded-lg bg-slate-100 px-3 py-2">Rating: {item.rating}</p>
                </div>
                <p className="text-sm font-semibold text-amber-600">Best for: {item.bestFor}</p>
                <p className="text-xs text-slate-500">Flexible private transport, comfort-first pacing, no forced shopping.</p>
                <Link
                  href={`/destinations/${item.slug}`}
                  className="inline-flex rounded-full bg-[#0f766e] px-4 py-2 text-sm font-semibold text-white hover:bg-[#115e59]"
                >
                  More Details
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
