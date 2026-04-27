import Image from "next/image";
import Link from "next/link";

type CampaignItem = {
  image: string;
  title: string;
  subtitle: string;
};

const campaignItems: CampaignItem[] = [
  {
    image: "/images/campaign/experience-luxury.png",
    title: "Experience The Luxury Way to Travel",
    subtitle: "Private car journeys with curated Sri Lanka moments.",
  },
  {
    image: "/images/campaign/ten-day-journey.png",
    title: "10-Day Sri Lanka Journey",
    subtitle: "A complete island route for couples, families, and first-time visitors.",
  },
  {
    image: "/images/campaign/private-luxury-transport.png",
    title: "Private Luxury Transport",
    subtitle: "Chauffeur-driven sedans, SUVs, and vans for comfort-first travel.",
  },
  {
    image: "/images/campaign/arugam-bay.png",
    title: "Arugam Bay",
    subtitle: "Surf, lagoon safaris, and laid-back coastal escapes.",
  },
  {
    image: "/images/campaign/mirissa.png",
    title: "Mirissa",
    subtitle: "Whale watching, snorkeling, and southern beach sunsets.",
  },
  {
    image: "/images/campaign/galle-fort.png",
    title: "Galle Fort",
    subtitle: "Colonial charm, ocean views, and timeless streets.",
  },
  {
    image: "/images/campaign/sri-lanka-grid.png",
    title: "Sri Lanka Highlights",
    subtitle: "Galle Fort, Sigiriya, Ella, and Mirissa in one visual route.",
  },
];

export default function FeaturedCampaigns() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-10 lg:px-8">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-secondary)]">Visual Highlights</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">Featured Campaigns</h2>
          <p className="mt-2 max-w-2xl text-slate-600">A quick look at destination themes and travel styles from your new campaign creatives.</p>
        </div>
        <Link
          href="/contact"
          className="rounded-full border border-[#0f766e] px-5 py-2 text-sm font-semibold text-[#0f766e] transition hover:bg-teal-50"
        >
          Plan This Journey
        </Link>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {campaignItems.map((item) => (
          <article key={item.image} className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-[#d7e4e4]">
            <div className="relative h-64 w-full">
              <Image src={item.image} alt={item.title} fill className="object-cover" />
            </div>
            <div className="p-5">
              <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{item.subtitle}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
