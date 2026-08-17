import type { Metadata } from "next";
import Link from "next/link";
import { Noto_Serif, Plus_Jakarta_Sans } from "next/font/google";
import {
  FacebookFilled,
  InstagramFilled,
  MailOutlined,
  PhoneOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import BrandLogo from "@/components/brand-logo";
import GoogleAnalyticsProvider from "@/components/google-analytics";
import SiteHeader from "@/components/site-header";
import UiProvider from "@/components/ui-provider";
import WhatsAppQuoteButton from "@/components/whatsapp-quote-button";
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
  metadataBase: new URL("https://trueceylontravels.com"),
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
      { url: "/favicon.ico", sizes: "48x48" },
    ],
    apple: "/apple-icon.png",
  },
  title: {
    default: "True Ceylon Travels | Private Tours & Airport Transfers in Sri Lanka",
    template: "%s | True Ceylon Travels",
  },
  description:
    "Luxury airport transfers and private tours in Sri Lanka with comfort-first service, flexible routes, and trusted local expertise.",
  keywords: [
    "Sri Lanka tours",
    "Sri Lanka private tours",
    "Sri Lanka airport transfer",
    "Colombo airport pickup",
    "Sri Lanka chauffeur service",
    "True Ceylon Travels",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://trueceylontravels.com",
    title: "True Ceylon Travels | Private Tours & Airport Transfers in Sri Lanka",
    description:
      "Luxury airport transfers and private tours in Sri Lanka with comfort-first service, flexible routes, and trusted local expertise.",
    siteName: "True Ceylon Travels",
    images: [
      {
        url: "/images/campaign/sri-lanka-grid.png",
        width: 1200,
        height: 630,
        alt: "True Ceylon Travels - Private tours and airport transfers in Sri Lanka",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "True Ceylon Travels | Private Tours & Airport Transfers in Sri Lanka",
    description:
      "Luxury airport transfers and private tours in Sri Lanka with comfort-first service, flexible routes, and trusted local expertise.",
    images: ["/images/campaign/sri-lanka-grid.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "travel",
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
      <body className="min-h-screen flex flex-col bg-[var(--color-surface)] text-[var(--foreground)]">
        <GoogleAnalyticsProvider />
        <UiProvider>
          <SiteHeader />
          <div className="flex-1 flex flex-col pt-[var(--header-height)]">{children}</div>
          <WhatsAppQuoteButton />
          <footer className="border-t border-slate-800/80 bg-gradient-to-br from-slate-950 via-slate-900 to-[#0a3f36] text-slate-200">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 lg:grid-cols-4 lg:px-8">
            <div>
              <BrandLogo variant="light" />
              <p className="mt-3 text-sm text-slate-300">
                Luxury airport transfers and private tours in Sri Lanka with comfort-first service, flexible routes, and trusted local expertise.
              </p>
              <p className="mt-4 text-xs uppercase tracking-[0.1em] text-amber-200">Travel with comfort, not speed.</p>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wide text-amber-200">Quick Links</h4>
              <div className="mt-3 space-y-2 text-sm">
                <p><Link href="/" className="transition duration-200 hover:text-white">Home</Link></p>
                <p><Link href="/tours" className="transition duration-200 hover:text-white">Tours</Link></p>
                <p><Link href="/destinations" className="transition duration-200 hover:text-white">Destinations</Link></p>
                <p><Link href="/contact" className="transition duration-200 hover:text-white">Contact</Link></p>
              </div>
              <h4 className="mt-6 text-sm font-semibold uppercase tracking-wide text-amber-200">Popular Services</h4>
              <div className="mt-3 space-y-2 text-sm text-slate-300">
                <p>Airport Transfers</p>
                <p>Custom Private Tours</p>
                <p>Safari & Hill Country Routes</p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wide text-amber-200">Contact</h4>
              <div className="mt-3 space-y-2 text-sm">
                <p>
                  <a href="tel:+94707366627" className="inline-flex items-center gap-2 transition duration-200 hover:text-white">
                    <PhoneOutlined /> +94 707 366 627
                  </a>
                </p>
                <p>
                  <a href="mailto:info@trueceylontravels.com" className="inline-flex items-center gap-2 transition duration-200 hover:text-white">
                    <MailOutlined /> info@trueceylontravels.com
                  </a>
                </p>
                <p>
                  <a href="https://wa.me/94707366627" className="inline-flex items-center gap-2 transition duration-200 hover:text-white">
                    <WhatsAppOutlined /> WhatsApp Chat
                  </a>
                </p>
              </div>
              <p className="mt-4 text-sm text-slate-300">
                No 142/1 Bandaramawatha Gonahena Kadawatha Sri Lanka
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wide text-amber-200">Follow Us</h4>
              <div className="mt-3 flex items-center gap-3">
                <a href="https://www.facebook.com/Trueceylontravels26?sfnsn=wa&mibextid=RUbZ1f" target="_blank" rel="noopener noreferrer" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20 hover:text-white">
                  <FacebookFilled />
                </a>
                <a href="https://www.instagram.com/trueceylontravels?utm_source=qr&igsh=dXo0OGh3ZTE5ejF1" target="_blank" rel="noopener noreferrer" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20 hover:text-white">
                  <InstagramFilled />
                </a>
              </div>
              <p className="mt-5 text-sm text-slate-300">
                Need a tailored itinerary?
                <br />
                Message your travel dates and style, and we&apos;ll craft your perfect Sri Lanka route.
              </p>
            </div>
          </div>

          <div className="border-t border-slate-800">
            <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-4 pb-24 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:pb-4 lg:px-8">
              <p>© 2026 True Ceylon Travels. All rights reserved.</p>
              <p>
                Developed by{" "}
                <a href="https://www.codeloom.digital" target="_blank" rel="noopener noreferrer" className="font-bold text-white hover:text-amber-200">
                  CODELOOM
                </a>
              </p>
            </div>
          </div>
          </footer>
        </UiProvider>
      </body>
    </html>
  );
}
