import Link from "next/link";

const customOptions = [
  {
    id: "private",
    title: "Private Custom Tours",
    text: "Personalized itineraries for couples, families, and solo travelers with a dedicated driver-guide.",
  },
  {
    id: "group",
    title: "Group Custom Tours",
    text: "Flexible travel plans for friends, teams, or special interest groups with coordinated logistics.",
  },
];

export default function CustomToursPage() {
  return (
    <main className="min-h-screen bg-[var(--color-surface)] text-[var(--foreground)]">
      <section className="bg-gradient-to-r from-[#0f766e] to-[#115e59] text-white">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
          <h1 className="text-4xl font-bold sm:text-5xl">Custom Tours</h1>
          <p className="mt-4 max-w-2xl text-teal-50">
            Build your trip your way. Choose your pace, interests, stay category, and transport style.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          {customOptions.map((item) => (
            <article key={item.id} id={item.id} className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-[#d7e4e4]">
              <h2 className="text-2xl font-bold">{item.title}</h2>
              <p className="mt-3 text-slate-600">{item.text}</p>
              <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-slate-600">
                <li>Flexible travel dates and pickup points</li>
                <li>Destination mix based on your interests</li>
                <li>Hotel category based on your budget</li>
              </ul>
              <Link href="/contact" className="mt-6 inline-flex rounded-full bg-[#0f766e] px-5 py-2.5 text-sm font-semibold text-white">
                Request Custom Plan
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
