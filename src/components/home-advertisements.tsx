import AdvertisementCards from "@/components/advertisement-cards";
import type { AdvertisementRecord } from "@/types/advertisement";
import { createServiceRoleClient } from "@/lib/supabase/admin";

export const revalidate = 120;

export default async function HomeAdvertisements() {
  let advertisements: AdvertisementRecord[] = [];

  try {
    const supabase = createServiceRoleClient();
    const { data, error } = await supabase
      .from("advertisements")
      .select("*")
      .order("id", { ascending: false })
      .limit(12);

    if (!error && data) {
      advertisements = data as AdvertisementRecord[];
    }
  } catch {
    advertisements = [];
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-10 lg:px-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900">Advertisements</h2>
        <p className="mt-2 text-slate-600">Featured promotions and special offers from True Ceylon Travels.</p>
      </div>
      <AdvertisementCards advertisements={advertisements} />
    </section>
  );
}
