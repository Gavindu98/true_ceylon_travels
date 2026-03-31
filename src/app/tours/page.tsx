import Link from "next/link";

const dayTours = [
  { name: "Sigiriya Day Discovery", details: "Rock Fortress, Dambulla Temple, local village lunch." },
  { name: "Kandy Heritage Day", details: "Temple of the Tooth, botanical gardens, cultural dance show." },
  { name: "Galle Coastal Day", details: "Galle Fort walk, beach break, sunset ramparts." },
];

const multiDayTours = [
  { name: "5 Days Culture & Nature", details: "Sigiriya, Kandy, Ella with tea country highlights." },
  { name: "7 Days Classic Sri Lanka", details: "Colombo, Sigiriya, Kandy, Ella, Yala, Mirissa." },
  { name: "10 Days Grand Island Tour", details: "Complete island loop covering culture, wildlife and beaches." },
];

export default function ToursPage() {
  return (
    <main className="min-h-screen bg-[var(--color-surface)] text-[var(--foreground)]">
      <section className="bg-gradient-to-r from-[#0f766e] to-[#115e59] text-white">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
          <h1 className="text-4xl font-bold sm:text-5xl">Tours</h1>
          <p className="mt-4 max-w-2xl text-teal-50">
            Browse our curated day tours and multi-day journeys across Sri Lanka.
          </p>
        </div>
      </section>

      <section id="day-tours" className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
        <h2 className="text-3xl font-bold">Day Tours</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {dayTours.map((tour) => (
            <article key={tour.name} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#d7e4e4]">
              <h3 className="text-xl font-semibold">{tour.name}</h3>
              <p className="mt-3 text-sm text-slate-600">{tour.details}</p>
              <Link href="/contact" className="mt-5 inline-flex rounded-full bg-[#0f766e] px-4 py-2 text-sm font-semibold text-white">
                Inquire Now
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section id="multi-day" className="mx-auto max-w-6xl px-6 pb-16 lg:px-8">
        <h2 className="text-3xl font-bold">Multi-day Tours</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {multiDayTours.map((tour) => (
            <article key={tour.name} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#d7e4e4]">
              <h3 className="text-xl font-semibold">{tour.name}</h3>
              <p className="mt-3 text-sm text-slate-600">{tour.details}</p>
              <Link href="/contact" className="mt-5 inline-flex rounded-full border border-[#0f766e] px-4 py-2 text-sm font-semibold text-[#0f766e]">
                Plan This Tour
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
