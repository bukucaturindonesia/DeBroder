import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DE BRODER",
    short_name: "DE BRODER",
    description: "Kaos Polos Import & Sablon",
    start_url: "/",
    display: "standalone",
    background_color: "#F7F7F2",
    theme_color: "#111111",
    icons: [
      {
        src: "/brand/debroder/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/brand/debroder/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ]
  };
}
