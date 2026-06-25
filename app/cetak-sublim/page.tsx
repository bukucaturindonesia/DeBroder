import type { Metadata } from "next";
import { CategoryDetailPage } from "@/components/PublicPage";
import { getPublicContent } from "@/lib/public-data";
import { whatsappHref } from "@/lib/url";

export const metadata: Metadata = {
  title: "Cetak Sublim | DE BRODER",
  description:
    "Layanan cetak sublim untuk jersey, apparel custom, dan kebutuhan produksi kreatif.",
  alternates: { canonical: "/cetak-sublim" },
  openGraph: {
    title: "Cetak Sublim | DE BRODER",
    description:
      "Layanan cetak sublim untuk jersey, apparel custom, dan kebutuhan produksi kreatif dengan hasil warna yang tajam dan fleksibel."
  }
};

export default async function CetakSublimPage() {
  const content = await getPublicContent();

  return (
    <CategoryDetailPage
      content={content}
      label="Cetak Sublim"
      title="Cetak Sublim"
      description="Layanan cetak sublim untuk jersey, apparel custom, dan kebutuhan produksi kreatif dengan hasil warna yang tajam dan fleksibel."
      details={[
        "Cetak sublim cocok untuk jersey, apparel event, dan produk custom.",
        "Mendukung kebutuhan produksi kreatif dengan visual yang lebih fleksibel.",
        "Placeholder gambar hasil sublim bisa diganti dari dashboard."
      ]}
      visualLabel="Placeholder Hasil Sublim"
      ctaText="Konsultasi Cetak Sublim"
      ctaHref={whatsappHref(content.contact.whatsapp_apparel)}
      currentSlug="cetak-sublim"
    />
  );
}
