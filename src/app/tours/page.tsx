import Link from "next/link";

const signatureTours = [
  {
    name: "04 Days Miniature Tour",
    route: "Airport -> Sigiriya -> Kandy -> Colombo",
    highlights: ["Climb Sigiriya Rock Fortress", "Village safari experience", "Temple of the Tooth", "Cultural dance show", "Colombo city tour"],
    noteTitle: "Why choose this tour?",
    why: ["Straight highway + short scenic drives", "No exhausting travel", "Ideal for first-time visitors"],
  },
  {
    name: "06 Days & 05 Nights Classic Escape",
    route: "Airport -> Dambulla -> Sigiriya -> Kandy -> Nuwara Eliya -> Bentota",
    highlights: ["Sigiriya & Dambulla cave temples", "Tea plantations & waterfalls", "Scenic train ride (optional: Kandy -> Nuwara Eliya)", "River safari in Bentota", "Beach relaxation"],
    noteTitle: "Road Advantage",
    why: ["Smooth hill country journey", "Balanced mix of nature, culture & beach"],
  },
  {
    name: "07 Days Splendor Tour",
    route: "Airport -> Sigiriya -> Kandy -> Ella -> Yala National Park -> Mirissa",
    highlights: ["Nine Arch Bridge", "Little Adam's Peak", "Yala safari (leopards)", "Whale watching (seasonal)"],
    noteTitle: "Smart Flow",
    why: ["Downhill scenic drive (Ella -> Yala)", "No backtracking"],
  },
  {
    name: "08 Days Grand Splendor Tour",
    route: "Airport -> Anuradhapura -> Sigiriya -> Kandy -> Ella -> Galle",
    highlights: ["Ancient ruins & temples", "Scenic train journey", "Dutch Fort sunset", "Beach + history combination"],
    noteTitle: "Route Strength",
    why: ["Culture and coast in one smooth journey"],
  },
  {
    name: "09 Days - Witness the Beauty",
    route: "Airport -> Sigiriya -> Kandy -> Nuwara Eliya -> Ella -> Yala -> Mirissa",
    highlights: ["Full hill country experience", "Safari + beach combo", "Instagram-worthy locations"],
    noteTitle: "Travel Style",
    why: ["Beautiful pace for scenic-content travelers"],
  },
  {
    name: "12 Days Nature & Safari Tour",
    route: "Airport -> Wilpattu -> Sigiriya -> Kandy -> Ella -> Yala -> Udawalawe -> Tangalle",
    highlights: ["Multiple wildlife safaris", "Bird watching", "Deep nature experience"],
    noteTitle: "Best For",
    why: ["Wildlife-focused long routes"],
  },
  {
    name: "15 Days Supreme Sri Lanka Tour",
    route: "Airport -> Negombo -> Anuradhapura -> Sigiriya -> Kandy -> Nuwara Eliya -> Ella -> Yala -> Galle -> Bentota -> Colombo -> Airport",
    highlights: ["Complete island experience", "Culture + nature + wildlife + beaches", "Best for premium long stays"],
    noteTitle: "Route (Full Island Loop)",
    why: ["Grand loop with broad destination coverage"],
  },
];

const transferTours = [
  { name: "Airport -> Negombo", price: "LKR 10,000", details: "Private A/C car, professional chauffeur, meet & greet." },
  { name: "Airport -> Colombo", price: "LKR 12,000", details: "Comfortable private transfer with safe reliable service." },
  { name: "Airport -> Kadawatha / Wattala / Ja-Ela", price: "LKR 11,000", details: "Fast and reliable private transfer." },
];

export default function ToursPage() {
  return (
    <main className="min-h-screen bg-[var(--color-surface)] text-[var(--foreground)]">
      <section className="bg-gradient-to-r from-[#0f766e] to-[#115e59] text-white">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
          <h1 className="text-4xl font-bold sm:text-5xl">Tours</h1>
          <p className="mt-4 max-w-2xl text-teal-50">
            True Ceylon Travels signature tour packages designed for comfort, smooth routing, and flexible travel pace.
          </p>
        </div>
      </section>

      <section id="multi-day" className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
        <h2 className="text-3xl font-bold">Signature Tour Packages</h2>
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {signatureTours.map((tour) => (
            <article key={tour.name} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#d7e4e4]">
              <h3 className="text-2xl font-bold">{tour.name}</h3>
              <p className="mt-2 text-sm font-medium text-slate-700">{tour.route}</p>
              <div className="mt-4">
                <p className="text-sm font-semibold text-[var(--color-secondary)]">Highlights</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
                  {tour.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-4">
                <p className="text-sm font-semibold text-[var(--color-secondary)]">{tour.noteTitle}</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
                  {tour.why.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <Link href="/contact" className="mt-5 inline-flex rounded-full bg-[#0f766e] px-4 py-2 text-sm font-semibold text-white">
                Plan This Tour
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section id="day-tours" className="mx-auto max-w-6xl px-6 py-4 lg:px-8">
        <h2 className="text-3xl font-bold">Airport Transfer Packages</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {transferTours.map((tour) => (
            <article key={tour.name} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#d7e4e4]">
              <h3 className="text-xl font-semibold">{tour.name}</h3>
              <p className="mt-2 text-sm font-semibold text-[var(--color-secondary)]">{tour.price}</p>
              <p className="mt-3 text-sm text-slate-600">{tour.details}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16 pt-10 lg:px-8">
        <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-[#d7e4e4] sm:p-10">
          <h2 className="text-2xl font-bold">What All Packages Include</h2>
          <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-slate-700">
            <li>Private car with professional driver.</li>
            <li>Fuel, parking, and local guidance.</li>
            <li>Flexible stops (coffee, photos, rest).</li>
            <li>No forced shopping.</li>
            <li>Designed for comfort, not speed.</li>
          </ul>
          <p className="mt-4 text-sm font-semibold text-slate-700">Note:</p>
          <p className="mt-1 text-sm text-slate-700">Hotels and safari jeep tickets are paid by the guest (for flexibility and choice).</p>
          <p className="mt-6 text-sm text-slate-700">
            Want a relaxed Sri Lanka trip with no rushing? Message us your travel dates & style and we&apos;ll tailor it just for you.
          </p>
          <Link href="/contact" className="mt-4 inline-flex rounded-full bg-[#0f766e] px-5 py-2.5 text-sm font-semibold text-white">
            WhatsApp +94 707 366 627
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16 lg:px-8">
        <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-[#d7e4e4] sm:p-10">
          <h2 className="text-2xl font-bold">Hotel Suggestions</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <article className="rounded-xl bg-[var(--color-surface-container-low)] p-4">
              <h3 className="font-semibold">Sigiriya / Cultural Triangle</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                <li>Hotel Sigiriya (mid-range, high reviews)</li>
                <li>Roo Mansala Boutique Villa (luxury)</li>
                <li>Sigiriya Kings Resort</li>
                <li>Lion See Hotel (budget-friendly)</li>
                <li>EKHO Sigiriya</li>
                <li>Sigiriya Jungles Resort & Spa</li>
                <li>Wild Grass Nature Resort (premium nature stay)</li>
              </ul>
            </article>
            <article className="rounded-xl bg-[var(--color-surface-container-low)] p-4">
              <h3 className="font-semibold">Kandy (Hill Country)</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                <li>Radisson Hotel Kandy</li>
                <li>Kings Pavilion Kandy (luxury)</li>
                <li>The Radh Hotel</li>
                <li>Coffee Bungalow Kandy</li>
                <li>Castle Hill Bungalow</li>
                <li>Boutique options available</li>
              </ul>
            </article>
            <article className="rounded-xl bg-[var(--color-surface-container-low)] p-4">
              <h3 className="font-semibold">Nuwara Eliya / Ella (Tea Country)</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                <li>Cool climate with scenic views</li>
                <li>Ideal for romantic and nature stays</li>
              </ul>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
