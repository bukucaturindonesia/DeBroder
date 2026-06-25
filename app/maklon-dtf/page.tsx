import type { Metadata } from "next";
import { CategoryDetailPage } from "@/components/PublicPage";
import { getPublicContent } from "@/lib/public-data";
import { whatsappHref } from "@/lib/url";

export const metadata: Metadata = {
  title: "Maklon DTF | DE BRODER",
  description:
    "Layanan maklon DTF untuk kebutuhan produksi, reseller, brand apparel, dan pelaku usaha.",
  alternates: { canonical: "/maklon-dtf" },
  openGraph: {
    title: "Maklon DTF | DE BRODER",
    description:
      "Layanan maklon DTF untuk kebutuhan produksi, reseller, brand apparel, dan pelaku usaha yang ingin memproduksi desain secara praktis."
  }
};

export default async function MaklonDtfPage() {
  const content = await getPublicContent();

  return (
    <CategoryDetailPage
      content={content}
      label="Maklon DTF"
      title="Maklon DTF"
      description="Layanan maklon DTF untuk kebutuhan produksi, reseller, brand apparel, dan pelaku usaha yang ingin memproduksi desain secara lebih praktis."
      details={[
        "Maklon DTF cocok untuk reseller, brand clothing, dan produksi partai.",
        "Membantu pelaku usaha memproduksi desain dengan alur yang lebih praktis.",
        "Placeholder gambar hasil DTF bisa diganti dari dashboard."
      ]}
      visualLabel="Placeholder Hasil DTF"
      ctaText="Konsultasi Maklon DTF"
      ctaHref={whatsappHref(content.contact.whatsapp_apparel)}
      currentSlug="maklon-dtf"
    />
  );
}
