import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { destinations } from "@/data/destinations";

type Params = { params: Promise<{ slug: string }> };

export default async function DestinationDetailPage({ params }: Params) {
  const { slug } = await params;
  const destination = destinations.find((item) => item.slug === slug);

  if (!destination) {
    notFound();
  }

  const relatedPackages = destination.featuredIn ?? [];

  return (
    <main className="min-h-screen bg-[var(--color-surface)] text-[var(--foreground)]">
      <section className="relative h-[46vh] min-h-[320px] overflow-hidden">
        <Image src={destination.image} alt={destination.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />
        <div className="relative mx-auto flex h-full max-w-6xl items-end px-6 pb-8 lg:px-8">
          <div>
            <p className="inline-block rounded-full bg-white/20 px-4 py-1 text-sm font-semibold text-white">{destination.location}</p>
            <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl">{destination.title}</h1>
            <p className="mt-2 text-sm text-white/90">
              Rating {destination.rating} / 5 • {destination.reviews} reviews
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-6 py-10 lg:grid-cols-3 lg:px-8">
        <div className="space-y-4 lg:col-span-2">
          <h2 className="text-3xl font-bold">About This Destination</h2>
          <p className="text-slate-700">{destination.description}</p>
          <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-[#d7e4e4]">
            <h3 className="text-lg font-semibold">Route Snapshot</h3>
            <p className="mt-2 text-sm text-slate-700">{destination.routeSnapshot}</p>
          </div>
          <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-[#d7e4e4]">
            <h3 className="text-lg font-semibold">Highlights</h3>
            <p className="mt-2 text-sm text-slate-700">{destination.highlights}</p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
              {destination.keyExperiences.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-[#d7e4e4]">
            <h3 className="text-lg font-semibold">Related Multi-day Packages</h3>
            {relatedPackages.length ? (
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
                {relatedPackages.map((pkg) => (
                  <li key={pkg}>{pkg}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-slate-700">This destination is available in custom route planning.</p>
            )}
          </div>
          {!!destination.hotelSuggestions?.length && (
            <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-[#d7e4e4]">
              <h3 className="text-lg font-semibold">Hotel Suggestions</h3>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
                {destination.hotelSuggestions.map((hotel) => (
                  <li key={hotel}>{hotel}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <aside className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#d7e4e4]">
          <h3 className="text-xl font-bold">Quick Details</h3>
          <div className="mt-4 space-y-2 text-sm">
            <p>Area: {destination.area}</p>
            <p>Duration: {destination.duration}</p>
            <p>Best For: {destination.bestFor}</p>
            <p>Reviews: {destination.reviews}</p>
            <p className="pt-2 text-xs text-slate-600">Hotels and safari jeep tickets are paid by guests for flexibility and choice.</p>
          </div>
          <div className="mt-6 flex flex-col gap-3">
            <Link href="/contact" className="rounded-full bg-[#0f766e] px-5 py-2.5 text-center text-sm font-semibold text-white hover:bg-[#115e59]">
              Inquire This Tour
            </Link>
            <Link href="/contact" className="rounded-full bg-[#115e59] px-5 py-2.5 text-center text-sm font-semibold text-white hover:bg-[#0f766e]">
              WhatsApp: +94 707 366 627
            </Link>
            <Link href="/destinations" className="rounded-full border border-[#0f766e] px-5 py-2.5 text-center text-sm font-semibold text-[#0f766e] hover:bg-teal-50">
              Back to Destinations
            </Link>
          </div>
        </aside>
      </section>
    </main>
  );
}
