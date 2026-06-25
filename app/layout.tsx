import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://debroder.com"),
  title: "DE BRODER \u2014 Kaos Polos Import & Sablon DTF",
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: "/"
  },
  description:
    "DE BRODER menyediakan kaos polos import, sablon DTF, custom jersey, maklon DTF, cetak sublim, Distributor Kaos NSA, dan Kaos Cotton Combed melalui store di Makassar dan Parepare.",
  keywords: [
    "DE BRODER",
    "De Broder",
    "kaos polos",
    "sablon DTF",
    "sablon kaos",
    "custom jersey",
    "maklon DTF",
    "cetak sublim",
    "kaos NSA",
    "cotton combed",
    "Makassar",
    "Parepare",
    "apparel",
    "jersey"
  ],
  openGraph: {
    title: "DE BRODER \u2014 Kaos Polos Import & Sablon DTF",
    description:
      "DE BRODER menyediakan kaos polos import, sablon DTF, custom jersey, maklon DTF, cetak sublim, Distributor Kaos NSA, dan Kaos Cotton Combed melalui store di Makassar dan Parepare.",
    siteName: "DE BRODER",
    images: [
      {
        url: "/images/debroder/hero/hero-home.jpg",
        width: 1536,
        height: 1024,
        alt: "Kaos polos import dan sablon DTF DE BRODER"
      }
    ],
    locale: "id_ID",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "DE BRODER \u2014 Kaos Polos Import & Sablon DTF",
    description:
      "DE BRODER menyediakan kaos polos import, sablon DTF, custom jersey, maklon DTF, cetak sublim, Distributor Kaos NSA, dan Kaos Cotton Combed melalui store di Makassar dan Parepare.",
    images: ["/images/debroder/hero/hero-home.jpg"]
  },
  icons: {
    icon: [
      { url: "/brand/debroder/favicon.ico" },
      {
        url: "/brand/debroder/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png"
      },
      {
        url: "/brand/debroder/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png"
      },
      {
        url: "/brand/debroder/favicon-48x48.png",
        sizes: "48x48",
        type: "image/png"
      }
    ],
    apple: [
      {
        url: "/brand/debroder/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png"
      }
    ]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
