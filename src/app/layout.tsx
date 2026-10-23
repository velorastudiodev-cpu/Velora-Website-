import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "@fontsource-variable/space-grotesk";
import "@fontsource-variable/plus-jakarta-sans";
import "@fontsource-variable/jetbrains-mono";
import { PwaInstallBanner } from "@/components/layout/PwaInstallBanner";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { MotionProvider } from "@/components/motion/MotionProvider";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://velora-website-official.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Velora Studio — Digital Solutions & Software Development",
    template: "%s — Velora Studio",
  },
  description:
    "Velora Studio membantu bisnis di Indonesia membangun website profesional, dashboard Custom CMS mandiri, aplikasi web, dan sistem operasional yang terukur.",
  applicationName: "Velora Studio",
  icons: {
    icon: [
      { url: "/pwa/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/pwa/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/pwa/icon-192.png", sizes: "192x192", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteUrl,
    siteName: "Velora Studio",
    title: "Velora Studio — Digital Solutions & Software Development",
    description:
      "Menerjemahkan kebutuhan komersial dan operasional bisnis menjadi website, CMS mandiri, dan aplikasi web yang siap berkembang.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0d0c18",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <body className="flex min-h-screen flex-col antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-[#4638d2] focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
        >
          Lewati ke konten utama
        </a>
        <MotionProvider>
          <SiteHeader />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <SiteFooter />
          <PwaInstallBanner />
        </MotionProvider>
      </body>
    </html>
  );
}
