import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Velora Studio — Digital Solutions & Software Development",
    short_name: "Velora Studio",
    description:
      "Studio rekayasa perangkat lunak untuk website bisnis, Custom CMS mandiri, dan sistem kerja digital.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#0d0c18",
    theme_color: "#0d0c18",
    lang: "id",
    icons: [
      {
        src: "/pwa/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/pwa/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
