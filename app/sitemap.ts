import type { MetadataRoute } from "next";

const routes = ["", "/koleksi", "/kaos-polos", "/sablon-dtf", "/maklon-dtf", "/jersey", "/cetak-sublim", "/store", "/cara-order"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((route) => ({
    url: `https://debroder.com${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/koleksi" ? 0.9 : 0.8
  }));
}
