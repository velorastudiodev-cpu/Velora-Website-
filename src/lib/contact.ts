/**
 * Honest Contact Configuration
 * Strictly enforces ZERO dummy phone numbers or fabricated channels (PRD Section 5 & 9).
 * Public contact links render only when official environment variables are explicitly configured.
 */

export type OfficialContactChannels = {
  email: string | null;
  whatsappNumber: string | null;
  whatsappHref: string | null;
  siteUrl: string;
};

export function getOfficialContacts(prefillText?: string): OfficialContactChannels {
  const rawEmail = process.env.NEXT_PUBLIC_VELORA_EMAIL?.trim() || "";
  const rawWa = process.env.NEXT_PUBLIC_VELORA_WHATSAPP?.replace(/[^\d]/g, "") || "";
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://velora-website-official.vercel.app";

  // Reject known placeholder/dummy numbers automatically
  const isDummyWa = !rawWa || rawWa === "6281234567890" || rawWa.length < 9;
  const whatsappNumber = isDummyWa ? null : rawWa;

  const message =
    prefillText ||
    "Halo Velora Studio, saya ingin mendiskusikan kebutuhan website / sistem untuk bisnis saya.";

  const whatsappHref = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    : null;

  return {
    email: rawEmail.includes("@") ? rawEmail : null,
    whatsappNumber,
    whatsappHref,
    siteUrl,
  };
}
