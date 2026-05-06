import Link from "next/link";
import { Suspense } from "react";
import AdminMemoryManager from "@/components/admin-memory-manager";
import AdminDashboardTabs from "@/components/admin-dashboard-tabs";

export default function AdminMemoryPage() {
  return (
    <main className="min-h-screen bg-[var(--color-surface)] px-6 py-12 text-[var(--foreground)] lg:px-8">
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Add Memory</h1>
          <Link href="/admin/dashboard" className="text-sm font-semibold text-[var(--color-primary)] hover:underline">
            Back to Dashboard
          </Link>
        </div>

        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <Suspense fallback={<p className="text-sm text-slate-600">Loading dashboard tabs...</p>}>
            <AdminDashboardTabs />
          </Suspense>
        </section>

        <AdminMemoryManager />
      </div>
    </main>
  );
}
