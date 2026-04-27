import Link from "next/link";
import { getTourContentData } from "@/lib/tour-content";

export default async function TourCategoriesPage() {
  const { tourStyles, covers } = await getTourContentData();
  const cover = covers.find((item) => item.page_key === "tour-categories");

  return (
    <main className="min-h-screen bg-[var(--color-surface)] text-[var(--foreground)]">
      <section
        className="relative overflow-hidden bg-gradient-to-r from-[#0f766e] to-[#115e59] text-white"
        style={cover?.image_url ? { backgroundImage: `linear-gradient(rgba(8,47,43,0.62), rgba(8,47,43,0.62)), url(${cover.image_url})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
      >
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
          <h1 className="text-4xl font-bold sm:text-5xl">{cover?.title || "Tour Categories"}</h1>
          <p className="mt-4 max-w-2xl text-teal-50">
            {cover?.subtitle || "Explore our travel styles and pick the experience that matches your trip goals."}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {tourStyles.map((item) => (
            <article key={item.slug} className="overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#d7e4e4]">
              {item.coverImageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.coverImageUrl} alt={item.title} className="mb-4 h-40 w-full rounded-xl object-cover" />
              ) : null}
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p className="mt-2 text-sm text-slate-600">{item.description}</p>
              <Link
                href={`/tours/categories/${item.slug}`}
                className="mt-4 inline-flex rounded-full bg-[#0f766e] px-4 py-2 text-sm font-semibold text-white"
              >
                View Category
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
