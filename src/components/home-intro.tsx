import {
  CarOutlined,
  CheckCircleOutlined,
  SafetyCertificateOutlined,
  TagsOutlined,
  TeamOutlined,
} from "@ant-design/icons";

const highlights = [
  {
    icon: SafetyCertificateOutlined,
    title: "Customer Satisfaction",
    description: "24x7 pre and post tour support",
  },
  {
    icon: TagsOutlined,
    title: "Best Deals Guaranteed",
    description: "Wide range of tours at clear prices",
  },
  {
    icon: TeamOutlined,
    title: "Experienced Chauffeurs",
    description: "Licensed, reliable driver-guides",
  },
  {
    icon: CheckCircleOutlined,
    title: "Instant Confirmation",
    description: "Fast replies on booked services",
  },
  {
    icon: CarOutlined,
    title: "Own Fleet",
    description: "Well-maintained cars for comfort",
  },
];

export default function HomeIntro() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-surface)] px-6 py-16 lg:px-8 lg:py-20">
      <p
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-6 w-full -translate-x-1/2 text-center font-serif text-[18vw] font-bold leading-none text-[#003527]/[0.06] sm:top-2 sm:text-[9rem] lg:text-[11rem]"
      >
        WELCOME
      </p>

      <div className="relative mx-auto max-w-4xl text-center">
        <h2 className="font-serif text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.6rem]">
          True Ceylon Travels
        </h2>
        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#0f766e] sm:text-sm">
          Private tours and airport transfers across Sri Lanka
        </p>
        <p className="mx-auto mt-6 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
          Welcome to Sri Lanka. True Ceylon Travels makes the island easy to explore with private, comfort-first journeys
          planned around your dates and pace. From ancient cities and tea country to wildlife and quiet beaches, we
          shape each route for couples, families, and first-time visitors. With licensed chauffeur-guides, transparent
          pricing, and a well-maintained private fleet, we look after the details so you can travel with comfort—not
          speed—and leave with a journey that feels personal from arrival to departure.
        </p>
      </div>

      <div className="relative mx-auto mt-12 grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
        {highlights.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.title} className="text-center">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#d7e4e4] bg-white text-2xl text-[#0f766e] shadow-sm">
                <Icon />
              </span>
              <h3 className="mt-4 text-base font-bold text-slate-900">{item.title}</h3>
              <p className="mt-1 text-sm leading-6 text-slate-600">{item.description}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
