import Link from "next/link";
import AdminSigninForm from "@/components/admin-signin-form";

export default function AdminSigninPage() {
  return (
    <main className="min-h-screen bg-[var(--color-surface)] px-6 py-12 text-[var(--foreground)] lg:px-8">
      <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold">Admin Sign In</h1>
        <p className="mt-2 text-sm text-slate-600">Sign in using your registered email and password.</p>
        <div className="mt-6">
          <AdminSigninForm />
        </div>
        <Link href="/admin" className="mt-6 inline-block text-sm font-semibold text-[var(--color-primary)] hover:underline">
          Back to Admin
        </Link>
      </div>
    </main>
  );
}
