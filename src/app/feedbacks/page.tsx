import Image from "next/image";
import Link from "next/link";
import { createServiceRoleClient } from "@/lib/supabase/admin";
import type { FeedbackRecord } from "@/types/feedback";

export default async function FeedbacksPage() {
  let feedbacks: FeedbackRecord[] = [];

  try {
    const supabase = createServiceRoleClient();
    const { data, error } = await supabase.from("feedback").select("*").order("created_at", { ascending: false });
    if (!error && data) {
      feedbacks = data as FeedbackRecord[];
    }
  } catch {
    feedbacks = [];
  }

  return (
    <main className="min-h-screen bg-[var(--color-surface)] text-[var(--foreground)]">
      <section className="bg-gradient-to-r from-[#0f766e] to-[#115e59] text-white">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
          <h1 className="text-4xl font-bold sm:text-5xl">All Client Feedbacks</h1>
          <p className="mt-4 max-w-2xl text-teal-50">Reviews from travelers who explored Sri Lanka with True Ceylon Travels.</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10 lg:px-8">
        <div className="mb-6">
          <Link href="/" className="rounded-full border border-[#0f766e] px-4 py-2 text-sm font-semibold text-[#0f766e] transition hover:bg-teal-50">
            Back to Home
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {feedbacks.length === 0 ? (
            <p className="text-sm text-slate-600">No client feedback yet.</p>
          ) : (
            feedbacks.map((review) => (
              <blockquote
                key={review.id}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-white to-[#f8fafc] p-6 shadow-sm ring-1 ring-[#d7e4e4] transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#0f766e] via-[#34d399] to-[#eab308]" />
                <div className="flex items-center gap-3">
                  {review.profile_pic_url ? (
                    <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-[#0f766e]/20">
                      {review.profile_pic_url.startsWith("/") ? (
                        <Image src={review.profile_pic_url} alt={review.name || "Traveler"} fill className="object-cover" />
                      ) : (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={review.profile_pic_url} alt={review.name || "Traveler"} className="h-full w-full object-cover" loading="lazy" />
                      )}
                    </div>
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0f766e]/10 text-sm font-semibold text-[#0f766e] ring-2 ring-[#0f766e]/20">
                      {(review.name || "GT")
                        .split(" ")
                        .map((p) => p[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </div>
                  )}
                  <div className="flex min-h-12 flex-col justify-center gap-0">
                    <p className="font-semibold leading-[1.05] text-slate-900">{review.name || "Guest Traveler"}</p>
                    <p className="-mt-0.5 text-sm leading-[1.05] text-slate-500">{review.country || "Sri Lanka Tour"}</p>
                    {review.feedback_date ? <p className="-mt-0.5 text-xs leading-[1.05] text-slate-500">{review.feedback_date}</p> : null}
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-1 text-[#f59e0b]">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                </div>
                <p className="mt-3 text-slate-700">&quot;{review.description || "Great experience with True Ceylon Travels."}&quot;</p>
                {review.title ? (
                  <p className="mt-4 inline-flex rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.06em] text-amber-700 ring-1 ring-amber-200">
                    {review.title}
                  </p>
                ) : null}
              </blockquote>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
