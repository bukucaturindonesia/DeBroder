import type { Metadata } from "next";
import { CategoryDetailPage } from "@/components/PublicPage";
import { getPublicContent } from "@/lib/public-data";
import { whatsappHref } from "@/lib/url";

export const metadata: Metadata = {
  title: "Sablon DTF | DE BRODER",
  description:
    "Layanan sablon DTF untuk kaos custom, brand clothing, event, komunitas, dan kebutuhan produksi.",
  alternates: { canonical: "/sablon-dtf" },
  openGraph: {
    title: "Sablon DTF | DE BRODER",
    description:
      "Layanan sablon DTF untuk kaos custom, produksi pakaian, brand clothing, event, komunitas, dan kebutuhan partai."
  }
};

export default async function SablonDtfPage() {
  const content = await getPublicContent();

  return (
    <CategoryDetailPage
      content={content}
      label="Sablon DTF"
      title="Sablon DTF"
      description="Layanan sablon DTF untuk kaos custom, produksi pakaian, brand clothing, event, komunitas, dan kebutuhan partai."
      details={[
        "Sablon DTF cocok untuk custom kaos, produksi kecil, dan produksi partai.",
        "Bisa digunakan untuk brand clothing, event, komunitas, instansi, dan perusahaan.",
        "Placeholder gambar proses sablon DTF dapat diganti dari dashboard."
      ]}
      visualLabel="Placeholder Proses Sablon DTF"
      ctaText="Konsultasi Sablon DTF"
      ctaHref={whatsappHref(content.contact.whatsapp_apparel)}
      currentSlug="sablon-dtf"
    />
  );
}
