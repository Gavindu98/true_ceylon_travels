import Link from "next/link";
import AdminMemoryManager from "@/components/admin-memory-manager";

export default function AdminMemoryPage() {
  return (
    <main className="min-h-screen bg-[var(--color-surface)] px-6 py-12 text-[var(--foreground)] lg:px-8">
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Add Memory</h1>
          <Link href="/admin" className="text-sm font-semibold text-[var(--color-primary)] hover:underline">
            Back to Admin
          </Link>
        </div>

        <AdminMemoryManager />
      </div>
    </main>
  );
}
