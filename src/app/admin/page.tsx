export default function AdminPage() {
  return (
    <main className="min-h-screen bg-[var(--color-surface)] px-6 py-12 text-[var(--foreground)] lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="rounded-2xl bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--color-secondary)]">Admin Panel</p>
          <h1 className="mt-2 text-4xl font-bold">True Ceylon Travels Admin</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Internal workspace for managing inquiries, tours, destinations, and website content.
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">New Inquiries</p>
            <p className="mt-2 text-3xl font-bold text-[var(--color-primary)]">24</p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Pending Follow-ups</p>
            <p className="mt-2 text-3xl font-bold text-[var(--color-primary)]">8</p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Active Tours</p>
            <p className="mt-2 text-3xl font-bold text-[var(--color-primary)]">17</p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Published Destinations</p>
            <p className="mt-2 text-3xl font-bold text-[var(--color-primary)]">31</p>
          </div>
        </section>
      </div>
    </main>
  );
}
