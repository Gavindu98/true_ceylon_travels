import Link from "next/link";
import { dayTours } from "@/data/nav-tour-data";

export default function DayToursPage() {
  return (
    <main className="min-h-screen bg-[var(--color-surface)] text-[var(--foreground)]">
      <section className="bg-gradient-to-r from-[#0f766e] to-[#115e59] text-white">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
          <h1 className="text-4xl font-bold sm:text-5xl">Day Tours</h1>
          <p className="mt-4 max-w-2xl text-teal-50">
            Choose from our most popular one-day experiences across Sri Lanka.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {dayTours.map((tour) => (
            <article key={tour.slug} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#d7e4e4]">
              <h2 className="text-xl font-semibold">{tour.title}</h2>
              <p className="mt-2 text-sm text-slate-600">{tour.description}</p>
              <Link
                href={`/day-tours/${tour.slug}`}
                className="mt-4 inline-flex rounded-full bg-[#0f766e] px-4 py-2 text-sm font-semibold text-white"
              >
                View Details
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
