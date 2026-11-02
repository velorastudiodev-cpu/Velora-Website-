import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { getOfficialContacts } from "@/lib/contact";
import { FooterWaves } from "./FooterWaves";

const FOOTER_LINKS = [
  { href: "/karya", label: "Karya" },
  { href: "/layanan", label: "Layanan" },
  { href: "/paket", label: "Paket" },
  { href: "/proses", label: "Proses" },
  { href: "/tentang", label: "Studio" },
  { href: "/faq", label: "FAQ" },
  { href: "/privasi", label: "Privasi" },
] as const;

export function SiteFooter() {
  const contacts = getOfficialContacts();
  const currentYear = new Date().getFullYear();
  // Only link WhatsApp when an official number is configured; otherwise fall back to the brief form.
  const cta = contacts.whatsappHref
    ? { href: contacts.whatsappHref, label: "Chat di WhatsApp", external: true }
    : { href: "/mulai-proyek", label: "Mulai proyek", external: false };

  return (
    <footer className="relative overflow-hidden bg-[radial-gradient(120%_140%_at_80%_0%,#3a2a8a_0%,#1a1240_45%,#0d0a1f_100%)] text-white">
      <FooterWaves />
      <div aria-hidden="true" className="pointer-events-none absolute -top-32 left-1/3 h-72 w-[40rem] rounded-full bg-[#6d4dff]/25 blur-[100px]" />

      <div className="editorial-container relative">
        <div className="grid grid-cols-1 items-center gap-8 pt-16 pb-12 lg:grid-cols-[auto_auto_1fr_auto] md:gap-10 md:pt-20">
          <h2 className="font-hero text-[clamp(2.4rem,5.2vw,4.4rem)] leading-[0.95] font-extrabold tracking-[-0.045em]">
            <span className="block whitespace-nowrap">Punya ide?</span>
            <span className="velora-outline-text block whitespace-nowrap">Mari wujudkan.</span>
          </h2>
          <span aria-hidden="true" className="hidden h-16 w-px bg-white/20 lg:block" />
          <p className="max-w-[260px] text-[17px] leading-relaxed text-white/80">
            Diskusikan proyek Anda bersama Velora.
          </p>
          <Link
            href={cta.href}
            {...(cta.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="group relative inline-flex w-fit items-center gap-3 overflow-hidden rounded-full bg-white py-3.5 pr-4 pl-5 text-[15px] font-semibold text-[#1a1240] shadow-[0_20px_50px_-15px_rgba(140,110,255,0.7)] transition-transform duration-300 hover:-translate-y-0.5"
          >
            <span className="velora-sheen absolute inset-0" aria-hidden="true" />
            <MessageCircle className="relative h-5 w-5" />
            <span className="relative">{cta.label}</span>
            <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 py-7 text-[13px] text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {currentYear} Velora Studio · Indonesia
            {contacts.email && (
              <>
                {" · "}
                <a href={`mailto:${contacts.email}`} className="hover:text-white">
                  {contacts.email}
                </a>
              </>
            )}
          </p>
          <nav aria-label="Navigasi footer" className="flex flex-wrap gap-x-6 gap-y-2">
            {FOOTER_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-white">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
