import Image from "next/image";
import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[var(--color-surface)] text-[var(--foreground)]">
      <section className="relative overflow-hidden bg-[#0a3a3a] text-white">
        <Image src="/images/hero-lanka.svg" alt="Sri Lanka landscape" fill className="object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#072d2d]/95 via-[#0d5555]/80 to-transparent" />
        <div className="relative mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
          <p className="inline-block rounded-full bg-white/15 px-4 py-1 text-sm font-medium">
            Contact True Ceylon Travels
          </p>
          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">Plan Your Dream Sri Lanka Trip</h1>
          <p className="mt-4 max-w-2xl text-cyan-100">
            Tell us your dates, group size, and travel style. We will craft a custom itinerary and respond quickly.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-6 py-12 lg:grid-cols-2 lg:px-8">
        <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-[#d7e4e4]">
          <h2 className="text-2xl font-bold">Send Us Your Details</h2>
          <p className="mt-2 text-sm text-slate-600">
            This is a starter form layout. You can connect it to email, WhatsApp API, or a backend next.
          </p>

          <form className="mt-6 space-y-4">
            <div>
              <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-700">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none ring-[#0f766e] focus:ring-2"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none ring-[#0f766e] focus:ring-2"
              />
            </div>

            <div>
              <label htmlFor="phone" className="mb-1 block text-sm font-medium text-slate-700">
                Phone / WhatsApp
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+94..."
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none ring-[#0f766e] focus:ring-2"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="travelDate" className="mb-1 block text-sm font-medium text-slate-700">
                  Travel Date
                </label>
                <input
                  id="travelDate"
                  name="travelDate"
                  type="date"
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none ring-[#0f766e] focus:ring-2"
                />
              </div>
              <div>
                <label htmlFor="groupSize" className="mb-1 block text-sm font-medium text-slate-700">
                  Group Size
                </label>
                <select
                  id="groupSize"
                  name="groupSize"
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none ring-[#0f766e] focus:ring-2"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option>1-2 people</option>
                  <option>3-5 people</option>
                  <option>6-10 people</option>
                  <option>10+ people</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="mb-1 block text-sm font-medium text-slate-700">
                Trip Details
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Tell us what you want to explore..."
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none ring-[#0f766e] focus:ring-2"
              />
            </div>

            <button type="button" className="rounded-full bg-[#0f766e] px-6 py-3 text-sm font-semibold text-white hover:bg-[#115e59]">
              Send Inquiry
            </button>
          </form>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-[#d7e4e4]">
            <h3 className="text-xl font-bold">Quick Contact</h3>
            <p className="mt-4 text-slate-600">Prefer direct communication? Reach us via phone or WhatsApp.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href="tel:+94763809067" className="rounded-full bg-[#0f766e] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#115e59]">
                Call +94 76 380 9067
              </a>
              <a
                href="https://wa.me/94763809067"
                className="rounded-full border border-[#0f766e] px-5 py-2.5 text-sm font-semibold text-[#0f766e] hover:bg-teal-50"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-[#d7e4e4]">
            <h3 className="text-xl font-bold">Office Address</h3>
            <p className="mt-3 text-slate-600">169/11 Nandasara Mawatha, Hokandara, Colombo, Sri Lanka</p>
            <p className="mt-1 text-slate-600">Email: info@trueceylontravels.com</p>
          </div>

          <Link
            href="/"
            className="inline-flex rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}
