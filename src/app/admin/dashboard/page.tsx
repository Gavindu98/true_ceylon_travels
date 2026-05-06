import Link from "next/link";
import { Suspense } from "react";
import AdminDashboardTabs from "@/components/admin-dashboard-tabs";

export default function AdminDashboardPage() {
  return (
    <main className="min-h-screen bg-[var(--color-surface)] px-6 py-12 text-[var(--foreground)] lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <section className="rounded-2xl bg-white p-8 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--color-secondary)]">Admin Dashboard</p>
              <h1 className="mt-2 text-4xl font-bold">Welcome Back</h1>
              <p className="mt-3 text-slate-600">Manage your website content from here.</p>
            </div>
            <Link href="/admin" className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
              Back
            </Link>
          </div>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <Suspense fallback={<p className="text-sm text-slate-600">Loading dashboard tabs...</p>}>
            <AdminDashboardTabs />
          </Suspense>
        </section>
      </div>
    </main>
  );
}
