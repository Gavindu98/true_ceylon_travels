import Image from "next/image";
import Link from "next/link";

type CampaignItem = {
  image: string;
  title: string;
  subtitle: string;
  href: string;
};

const packageItems: CampaignItem[] = [
  {
    image: "/images/campaign/ten-day-journey.png",
    title: "10-Day Sri Lanka Journey",
    subtitle: "A complete island route for couples, families, and first-time visitors.",
    href: "/tours",
  },
  {
    image: "/images/campaign/experience-luxury.png",
    title: "Experience The Luxury Way to Travel",
    subtitle: "Private car journeys with curated Sri Lanka moments.",
    href: "/tours",
  },
  {
    image: "/images/campaign/private-luxury-transport.png",
    title: "Private Luxury Transport",
    subtitle: "Chauffeur-driven sedans, SUVs, and vans for comfort-first travel.",
    href: "/contact",
  },
];

const destinationItems: CampaignItem[] = [
  {
    image: "/images/campaign/arugam-bay.png",
    title: "Arugam Bay",
    subtitle: "Surf, lagoon safaris, and laid-back coastal escapes.",
    href: "/contact",
  },
  {
    image: "/images/campaign/mirissa.png",
    title: "Mirissa",
    subtitle: "Whale watching, snorkeling, and southern beach sunsets.",
    href: "/destinations/mirissa-whale-coast",
  },
  {
    image: "/images/campaign/galle-fort.png",
    title: "Galle Fort",
    subtitle: "Colonial charm, ocean views, and timeless streets.",
    href: "/destinations/galle-fort-beaches",
  },
];

export default function FeaturedCampaigns() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-10 lg:px-8">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-secondary)]">Curated journeys</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">Handpicked travel packages</h2>
          <p className="mt-2 max-w-2xl text-slate-600">
            Signature journeys and destination stays arranged by travel style—ready to tailor around your dates.
          </p>
        </div>
        <Link
          href="/tours"
          className="rounded-full border border-[#0f766e] px-5 py-2 text-sm font-semibold text-[#0f766e] transition hover:bg-teal-50"
        >
          View All Packages
        </Link>
      </div>

      <div className="space-y-8">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Signature packages</p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {packageItems.map((item) => (
              <CampaignCard key={item.title} item={item} />
            ))}
          </div>
        </div>

        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Coastal escapes</p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {destinationItems.map((item) => (
              <CampaignCard key={item.title} item={item} />
            ))}
          </div>
        </div>

        <article className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-[#d7e4e4] lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="relative min-h-72 bg-[#0b1f1c]">
            <Image
              src="/images/campaign/sri-lanka-grid.png"
              alt="Galle Fort, Sigiriya, Ella, and Mirissa campaign highlights"
              fill
              className="object-contain"
            />
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-secondary)]">Island highlights</p>
            <h3 className="mt-2 text-2xl font-bold text-slate-900">Sri Lanka Highlights</h3>
            <p className="mt-3 max-w-md text-sm leading-6 text-slate-600">
              Galle Fort, Sigiriya, Ella, and Mirissa in one visual route—culture, highlands, and coast without the rush.
            </p>
            <Link
              href="/destinations"
              className="mt-6 inline-flex w-fit rounded-full bg-[#0f766e] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#115e59]"
            >
              Explore Destinations
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}

function CampaignCard({ item }: { item: CampaignItem }) {
  return (
    <article className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-[#d7e4e4] transition hover:-translate-y-0.5 hover:shadow-md">
      <Link href={item.href} className="block">
        <div className="relative aspect-square w-full bg-[#0b1f1c]">
          <Image src={item.image} alt={item.title} fill className="object-cover" />
        </div>
        <div className="p-5">
          <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
          <p className="mt-2 text-sm text-slate-600">{item.subtitle}</p>
        </div>
      </Link>
    </article>
  );
}
