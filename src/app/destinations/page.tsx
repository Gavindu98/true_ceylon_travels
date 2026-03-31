import Link from "next/link";

const destinationCards = [
  {
    name: "Sigiriya Rock Fortress",
    area: "Cultural Triangle",
    duration: "Full Day",
    highlights: "Ancient fortress, village experience, and panoramic sunset views.",
    bestFor: "History Lovers",
    rating: "4.9",
    tone: "from-amber-400 to-orange-500",
  },
  {
    name: "Yala National Park Safari",
    area: "Southern Province",
    duration: "Full Day",
    highlights: "Leopard tracking, birdwatching, and expert naturalist-guided safari.",
    bestFor: "Wildlife Travelers",
    rating: "4.8",
    tone: "from-emerald-500 to-lime-500",
  },
  {
    name: "Ella Scenic Highlands",
    area: "Uva Province",
    duration: "2 Days",
    highlights: "Nine Arch Bridge, tea estates, and Little Adam's Peak hikes.",
    bestFor: "Nature & Couples",
    rating: "5.0",
    tone: "from-teal-500 to-cyan-500",
  },
  {
    name: "Mirissa Beach Escape",
    area: "South Coast",
    duration: "2 Days",
    highlights: "Golden beaches, whale watching, and seafood nights.",
    bestFor: "Beach Holidays",
    rating: "4.9",
    tone: "from-sky-500 to-blue-500",
  },
  {
    name: "Kandy Heritage Route",
    area: "Central Province",
    duration: "Full Day",
    highlights: "Temple of the Tooth, cultural dance, and botanical gardens.",
    bestFor: "Families",
    rating: "4.7",
    tone: "from-violet-500 to-purple-500",
  },
  {
    name: "Galle Fort & Coastal Walk",
    area: "Southwest Coast",
    duration: "Half Day",
    highlights: "Dutch fort streets, boutique cafes, and sunset rampart views.",
    bestFor: "Relaxed Explorers",
    rating: "4.8",
    tone: "from-fuchsia-500 to-rose-500",
  },
  {
    name: "Nuwara Eliya Tea Country",
    area: "Central Highlands",
    duration: "Full Day",
    highlights: "Tea factory tours, waterfalls, and cool mountain climate.",
    bestFor: "Scenic Routes",
    rating: "4.8",
    tone: "from-lime-500 to-green-500",
  },
  {
    name: "Anuradhapura Sacred City",
    area: "North Central Province",
    duration: "Full Day",
    highlights: "Ancient stupas, sacred bodhi tree, and archeological treasures.",
    bestFor: "Cultural Deep Dive",
    rating: "4.9",
    tone: "from-yellow-500 to-amber-600",
  },
];

export default function DestinationsPage() {
  return (
    <main className="min-h-screen bg-[var(--color-surface)] text-[var(--foreground)]">
      <section className="bg-gradient-to-r from-[#0f766e] to-[#115e59] text-white">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
          <p className="inline-block rounded-full bg-white/15 px-4 py-1 text-sm font-medium">Explore Sri Lanka</p>
          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">All Destinations</h1>
          <p className="mt-4 max-w-2xl text-teal-50">
            Browse our most popular routes and choose the experience that matches your travel style.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {destinationCards.map((item) => (
            <article key={item.name} className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-[#d7e4e4]">
              <div className={`h-28 w-full bg-gradient-to-r ${item.tone}`} />
              <div className="space-y-3 p-6">
                <p className="text-sm font-medium text-teal-700">{item.area}</p>
                <h2 className="text-xl font-bold text-slate-900">{item.name}</h2>
                <p className="text-sm text-slate-600">{item.highlights}</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p className="rounded-lg bg-slate-100 px-3 py-2">Duration: {item.duration}</p>
                  <p className="rounded-lg bg-slate-100 px-3 py-2">Rating: {item.rating}</p>
                </div>
                <p className="text-sm font-semibold text-amber-600">Best for: {item.bestFor}</p>
                <Link
                  href="/contact"
                  className="inline-flex rounded-full bg-[#0f766e] px-4 py-2 text-sm font-semibold text-white hover:bg-[#115e59]"
                >
                  Inquire This Tour
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
