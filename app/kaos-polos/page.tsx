import type { Metadata } from "next";
import { CategoryDetailPage } from "@/components/PublicPage";
import { getPublicContent } from "@/lib/public-data";
import { whatsappHref } from "@/lib/url";

export const metadata: Metadata = {
  title: "Kaos Polos & Cotton Combed | DE BRODER",
  description:
    "DE BRODER menyediakan kaos polos, kaos NSA, dan cotton combed untuk sablon, brand clothing, komunitas, event, dan pembelian partai.",
  alternates: { canonical: "/kaos-polos" },
  openGraph: {
    title: "Kaos Polos & Cotton Combed | DE BRODER",
    description:
      "Kaos polos, kaos NSA, dan cotton combed untuk sablon, brand clothing, komunitas, event, dan pembelian partai."
  }
};

export default async function KaosPolosPage() {
  const content = await getPublicContent();

  return (
    <CategoryDetailPage
      content={content}
      label="Kaos Polos"
      title="Kaos Polos & Cotton Combed"
      description="Penyediaan kaos polos, kaos NSA, dan kaos cotton combed untuk sablon, brand clothing, komunitas, event, instansi, dan pembelian partai."
      details={[
        "Pilihan kaos polos untuk kebutuhan sablon, produksi brand clothing, komunitas, event, dan pembelian partai.",
        "Cocok untuk brand clothing, komunitas, event, instansi, dan perusahaan.",
        "Katalog kaos bisa diperbarui melalui dashboard Super Admin."
      ]}
      visualLabel="Placeholder Katalog Kaos"
      ctaText="Pesan Kaos Polos"
      ctaHref={whatsappHref(content.contact.whatsapp_apparel)}
      currentSlug="kaos-polos"
    />
  );
}
