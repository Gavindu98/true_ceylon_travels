import Link from "next/link";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-[var(--color-surface)] px-6 py-12 text-[var(--foreground)] lg:px-8">
      <div className="mx-auto flex max-w-3xl flex-col items-center rounded-2xl bg-white p-10 text-center shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--color-secondary)]">Admin Access</p>
        <h1 className="mt-2 text-4xl font-bold">True Ceylon Travels</h1>
        <p className="mt-3 max-w-xl text-slate-600">Continue as admin.</p>

        <div className="mt-8 flex w-full flex-col gap-4 sm:flex-row">
          <Link
            href="/admin/signin"
            className="inline-flex items-center justify-center rounded-xl bg-[var(--color-primary)] px-5 py-2.5 text-sm font-semibold !text-white transition hover:bg-[#064e3b]"
          >
            Sign In
          </Link>

          {/*
          TODO: Add sign up form
          */}
          {/*
          <Link
            href="/admin/signup"
            className="flex-1 rounded-2xl border border-[var(--color-primary)] bg-[var(--color-primary-container)] px-8 py-5 text-lg font-semibold !text-white transition hover:opacity-95"
          >
            Sign Up
          </Link>
          */}
        </div>
      </div>
    </main>
  );
}
