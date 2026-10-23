import type { MetadataRoute } from "next";
import { VELORA_PROJECTS } from "@/data/projects";
import { VELORA_SERVICES } from "@/data/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://velora-website-official.vercel.app";
  const now = new Date();

  const staticRoutes = [
    "",
    "/karya",
    "/layanan",
    "/paket",
    "/proses",
    "/tentang",
    "/faq",
    "/mulai-proyek",
    "/privasi",
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const serviceRoutes = VELORA_SERVICES.map((service) => ({
    url: `${siteUrl}/layanan/${service.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const projectRoutes = VELORA_PROJECTS.map((project) => ({
    url: `${siteUrl}/karya/${project.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: project.tier === "client" ? 0.85 : 0.65,
  }));

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes];
}
