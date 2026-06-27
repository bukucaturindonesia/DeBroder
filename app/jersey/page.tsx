import type { Metadata } from "next";
import { CategoryDetailPage } from "@/components/PublicPage";
import { getPublicContent } from "@/lib/public-data";
import { whatsappHref } from "@/lib/url";

export const metadata: Metadata = {
  title: "Custom Jersey | DE BRODER",
  description:
    "Pembuatan jersey custom untuk tim olahraga, sekolah, kantor, komunitas, instansi, dan event.",
  alternates: { canonical: "/jersey" },
  openGraph: {
    title: "Custom Jersey | DE BRODER",
    description:
      "Pembuatan jersey custom untuk tim olahraga, sekolah, kantor, komunitas, instansi, perusahaan, dan event."
  }
};

export default async function JerseyPage() {
  const content = await getPublicContent();

  return (
    <CategoryDetailPage
      content={content}
      label="Jersey"
      title="Custom Jersey"
      description="Pembuatan jersey custom untuk tim olahraga, sekolah, kantor, komunitas, instansi, perusahaan, dan event."
      details={[
        "Custom jersey untuk tim olahraga, komunitas, sekolah, kantor, instansi, dan event.",
        "Desain bisa disesuaikan dengan identitas tim atau kebutuhan acara.",
        "Pilihan bahan, warna, dan detail produksi dapat dikonsultasikan sesuai kebutuhan."
      ]}
      visualLabel="Contoh Custom Jersey DE BRODER"
      ctaText="Pesan Jersey Custom"
      ctaHref={whatsappHref(content.contact.whatsapp_apparel)}
      currentSlug="jersey"
    />
  );
}
