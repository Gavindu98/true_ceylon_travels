import Image from "next/image";
import Link from "next/link";
import ContactInquiryForm from "@/components/contact-inquiry-form";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[var(--color-surface)] text-[var(--foreground)]">
      <section className="relative min-h-[440px] overflow-hidden bg-[#052f27] text-white">
        <Image
          src="/images/contact-sri-lanka-hero.webp"
          alt=""
          fill
          fetchPriority="high"
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#03251f]/95 via-[#063c31]/75 to-[#063c31]/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#032a23]/70 via-transparent to-black/20" />
        <div className="relative mx-auto flex min-h-[440px] max-w-6xl items-center px-6 pb-24 pt-16 lg:px-8">
          <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-amber-200/30 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-amber-100 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-300" aria-hidden="true" />
            Contact True Ceylon Travels
          </p>
          <h1 className="mt-5 max-w-2xl text-4xl font-bold leading-tight !text-white drop-shadow-sm sm:text-5xl lg:text-6xl">
            Your Sri Lanka journey starts here.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-white/85 sm:text-lg">
            Share your dates, travel style, and dream experiences. Our local team will create a private itinerary shaped around you.
          </p>
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/90">
            {["Fast personal response", "Flexible itineraries", "Local expert planning"].map((item) => (
              <p key={item} className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-300 text-xs font-bold text-[#003527]" aria-hidden="true">
                  ✓
                </span>
                {item}
              </p>
            ))}
          </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto grid max-w-6xl gap-8 px-6 pb-16 lg:-mt-14 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
        <div className="rounded-[1.75rem] bg-white p-6 shadow-[0_24px_70px_rgba(0,53,39,0.12)] ring-1 ring-[#dbe7df] sm:p-9">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0f766e]">Tell us about your trip</p>
          <h2 className="mt-2 text-3xl font-bold text-[#102d25]">Let’s design your journey</h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">
            The more you share, the better we can tailor your route, pace, and experiences. Fields marked required help us reply accurately.
          </p>

          <ContactInquiryForm />
        </div>

        <div className="space-y-5 lg:pt-24">
          <div className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-[#064e3b] to-[#003527] p-7 text-white shadow-[0_20px_50px_rgba(0,53,39,0.18)] sm:p-8">
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full border-[28px] border-white/5" aria-hidden="true" />
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-200">Prefer a quick chat?</p>
            <h3 className="mt-2 text-2xl font-bold !text-white">Talk to a local travel expert</h3>
            <p className="mt-3 max-w-sm text-sm leading-6 text-white/75">Call us directly or send a WhatsApp message. We’ll help you take the next step.</p>
            <div className="mt-6 flex flex-col gap-3">
              <a
                href="https://wa.me/94707366627"
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-amber-300 px-5 py-3 text-sm font-bold text-[#003527] transition hover:bg-amber-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Chat on WhatsApp
              </a>
              <a href="tel:+94707366627" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/35 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20">
                Call +94 707 366 627
              </a>
            </div>
          </div>

          <div className="rounded-[1.75rem] bg-[#f3eee2] p-7 ring-1 ring-[#e3dccd] sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#735c00]">Contact details</p>
            <h3 className="mt-2 text-xl font-bold text-[#102d25]">True Ceylon Travels</h3>
            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
              <div>
                <p className="font-semibold text-[#003527]">Office</p>
                <p>No 142/1, Bandaramawatha, Gonahena, Kadawatha, Sri Lanka</p>
              </div>
              <div>
                <p className="font-semibold text-[#003527]">Email</p>
                <a href="mailto:trueceylontravels@gmail.com" className="break-all transition hover:text-[#0f766e]">trueceylontravels@gmail.com</a>
              </div>
            </div>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full px-2 py-2 text-sm font-semibold text-[#0f766e] transition hover:text-[#003527]"
          >
            <span aria-hidden="true">←</span> Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}
