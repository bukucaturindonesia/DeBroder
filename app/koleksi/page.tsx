import type { Metadata } from "next";
import {
  PageHero,
  ProductGrid,
  PublicShell,
  ServiceCard
} from "@/components/PublicPage";
import { getPublicContent } from "@/lib/public-data";

export const metadata: Metadata = {
  title: "Koleksi & Layanan DE BRODER",
  description:
    "Temukan layanan apparel, percetakan, custom jersey, sablon DTF, kaos polos, maklon DTF, dan cetak sublim dari DE BRODER.",
  alternates: { canonical: "/koleksi" },
  openGraph: {
    title: "Koleksi & Layanan DE BRODER",
    description:
      "Layanan apparel, percetakan, custom jersey, sablon DTF, kaos polos, maklon DTF, dan cetak sublim dari DE BRODER."
  }
};

export default async function KoleksiPage() {
  const content = await getPublicContent();
  const pageHero = content.pageHeroes.find((hero) => hero.page_key === "koleksi");
  const categories = content.categories.filter(
    (category) => category.status_aktif !== false
  );

  return (
    <PublicShell content={content}>
      <PageHero
        label={pageHero?.label || "KOLEKSI"}
        title={pageHero?.title || "Layanan & Produk DE BRODER"}
        description={
          pageHero?.subtitle ||
          "Temukan kebutuhan apparel, sablon, jersey, dan layanan custom dalam satu tempat."
        }
        imageUrl={pageHero?.image_url}
        mobileImageUrl={pageHero?.mobile_image_url}
        objectPosition={pageHero?.object_position}
        mobileObjectPosition={pageHero?.mobile_object_position}
        breadcrumbs={[
          { label: "Beranda", href: "/" },
          { label: "Koleksi" }
        ]}
      />
      <section className="bg-brand-offWhite py-14 sm:py-20">
        <div className="section-shell grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <ServiceCard key={category.nama_kategori} service={category} />
          ))}
        </div>
      </section>
      <section className="bg-white py-14 sm:py-20">
        <div className="section-shell">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Produk & Layanan Populer
          </h2>
          <div className="mt-10">
            <ProductGrid products={content.products} />
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
