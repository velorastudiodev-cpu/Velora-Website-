import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getOfficialContacts } from "@/lib/contact";

const FOOTER_COLUMNS = [
  {
    heading: "Layanan",
    links: [
      { href: "/layanan/website-bisnis", label: "Website Bisnis" },
      { href: "/layanan/aplikasi-web", label: "Aplikasi Web & CMS" },
      { href: "/layanan/sistem-bisnis", label: "Sistem Bisnis" },
      { href: "/paket", label: "Arah Paket & Scope" },
    ],
  },
  {
    heading: "Studio & Karya",
    links: [
      { href: "/karya", label: "Galeri Karya" },
      { href: "/proses", label: "Proses Kerja" },
      { href: "/tentang", label: "Tentang Velora" },
      { href: "/faq", label: "Pertanyaan Umum (FAQ)" },
    ],
  },
  {
    heading: "Mulai & Kebijakan",
    links: [
      { href: "/mulai-proyek", label: "Kirim Brief Proyek" },
      { href: "/privasi", label: "Kebijakan Privasi" },
    ],
  },
] as const;

export function SiteFooter() {
  const contacts = getOfficialContacts();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#0d0c18] text-[#f7f6fb]">
      <div className="editorial-container py-16 md:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Brand Column */}
          <div className="space-y-5 lg:col-span-5">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/14 bg-[#141325]">
                <Image
                  src="/brand/velora-symbol-isolated.png"
                  alt=""
                  width={28}
                  height={28}
                  className="h-7 w-7 object-contain"
                />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display text-base font-bold tracking-[0.14em] text-white">
                  VELORA STUDIO
                </span>
                <span className="mt-1 font-mono text-[11px] tracking-[0.14em] text-[#b1adc7]">
                  DIGITAL SOLUTIONS &amp; SOFTWARE
                </span>
              </span>
            </Link>

            <p className="max-w-md text-sm leading-relaxed text-[#b1adc7]">
              Kami membantu pemilik usaha dan tim operasional menerjemahkan kebutuhan bisnis
              menjadi website yang terarah, dashboard CMS mandiri, dan sistem kerja digital
              yang siap dipakai sehari-hari.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href="/mulai-proyek"
                className="inline-flex items-center gap-2 rounded-lg bg-[#4638d2] px-4 py-2.5 text-xs font-semibold tracking-wide text-white transition-colors hover:bg-[#5344e6]"
              >
                <span>Mulai Diskusi Proyek</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>

              {contacts.email && (
                <a
                  href={`mailto:${contacts.email}`}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/14 px-3.5 py-2.5 text-xs font-medium text-[#f7f6fb] transition-colors hover:border-white/30"
                >
                  <span>{contacts.email}</span>
                </a>
              )}

              {contacts.whatsappHref && (
                <a
                  href={contacts.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/14 px-3.5 py-2.5 text-xs font-medium text-[#f7f6fb] transition-colors hover:border-white/30"
                >
                  <span>WhatsApp Resmi</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.heading} className="space-y-3.5">
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#7fa3ff]">
                  {col.heading}
                </p>
                <ul className="space-y-2.5 text-sm">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[#b1adc7] transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-7 text-xs text-[#8e8aa8] sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} Velora Studio. Dibangun dengan standar rekayasa yang jujur dan terukur.</p>
          <p className="font-mono tracking-wider">INDONESIA · FOUNDER-LED SOFTWARE STUDIO</p>
        </div>
      </div>
    </footer>
  );
}
