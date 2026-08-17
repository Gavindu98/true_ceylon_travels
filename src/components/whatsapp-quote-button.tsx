import { WhatsAppOutlined } from "@ant-design/icons";

const WHATSAPP_URL =
  "https://wa.me/94707366627?text=" +
  encodeURIComponent("Hi True Ceylon Travels, I would like a free quote for a private Sri Lanka tour.");

export default function WhatsAppQuoteButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Get a free quote on WhatsApp"
      className="fixed bottom-5 right-5 z-[1100] inline-flex items-center gap-2.5 rounded-full bg-[#25D366] py-2.5 pl-2.5 pr-5 text-white shadow-[0_12px_30px_rgba(37,211,102,0.4)] transition hover:scale-[1.03] hover:bg-[#20bd5a] sm:bottom-6 sm:right-6"
    >
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-xl">
        <WhatsAppOutlined />
      </span>
      <span className="text-sm font-bold tracking-wide">Free quotes</span>
    </a>
  );
}
