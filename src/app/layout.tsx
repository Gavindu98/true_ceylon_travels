import type { Metadata } from "next";
import Link from "next/link";
import { Noto_Serif, Plus_Jakarta_Sans } from "next/font/google";
import SiteHeader from "@/components/site-header";
import UiProvider from "@/components/ui-provider";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "True Ceylon Travels",
  description: "Discover Sri Lanka with curated tours and trusted local guides.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${notoSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--color-surface)] text-[var(--foreground)]">
        <UiProvider>
          <SiteHeader />
          {children}
          <footer className="mt-auto border-t border-slate-200 bg-slate-900 text-slate-200">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 lg:grid-cols-4 lg:px-8">
            <div>
              <h3 className="text-lg font-bold text-white">True Ceylon Travels</h3>
              <p className="mt-3 text-sm text-slate-300">
                Discover Sri Lanka with trusted local experts, curated routes, and personalized tour plans.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wide text-white">Quick Links</h4>
              <div className="mt-3 space-y-2 text-sm">
                <p>
                  <Link href="/" className="hover:text-white">
                    Home
                  </Link>
                </p>
                <p>
                  <Link href="/destinations" className="hover:text-white">
                    Destinations
                  </Link>
                </p>
                <p>
                  <Link href="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wide text-white">Contact</h4>
              <div className="mt-3 space-y-2 text-sm">
                <p>
                  <a href="tel:+94776025212" className="hover:text-white">
                    +94 77 602 5212
                  </a>
                </p>
                <p>
                  <a href="mailto:info@trueceylontravels.com" className="hover:text-white">
                    info@trueceylontravels.com
                  </a>
                </p>
                <p>
                  <a href="https://wa.me/94776025212" className="hover:text-white">
                    WhatsApp Chat
                  </a>
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wide text-white">Office</h4>
              <p className="mt-3 text-sm text-slate-300">
                169/11 Nandasara Mawatha
                <br />
                Hokandara, Colombo
                <br />
                Sri Lanka
              </p>
            </div>
          </div>

          <div className="border-t border-slate-800">
            <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-4 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between lg:px-8">
              <p>© {new Date().getFullYear()} True Ceylon Travels. All rights reserved.</p>
              <p>Licensed Sri Lanka Tour Operator</p>
            </div>
          </div>
          </footer>
        </UiProvider>
      </body>
    </html>
  );
}
