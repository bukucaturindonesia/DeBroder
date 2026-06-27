/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { HeroSlider } from "@/components/HeroSlider";
import { PageMotion } from "@/components/PageMotion";
import { PublicFooter } from "@/components/PublicFooter";
import { ScrollButtons } from "@/components/ScrollButtons";
import { SiteHeader } from "@/components/SiteHeader";
import { getStoreImage } from "@/lib/fallback-data";
import { getPublicContent } from "@/lib/public-data";
import type { Service, ServiceCategory, Store } from "@/lib/types";
import { formatRupiah, whatsappLinkWithMessage } from "@/lib/url";

const benefits = [
  { icon: "clock", title: "Produksi Cepat", detail: "Alur kerja terukur" },
  { icon: "spark", title: "Kualitas Premium", detail: "Material terpilih" },
  { icon: "one", title: "Tanpa Minimum", detail: "Mulai dari satu pcs" },
  { icon: "truck", title: "Kirim Indonesia", detail: "Aman ke seluruh kota" }
];

function SectionHeading({
  eyebrow,
  title,
  description,
  action
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-green">
            {eyebrow}
          </p>
        ) : null}
        <h2 className={`${eyebrow ? "mt-3" : ""} text-3xl font-semibold tracking-[-0.025em] text-brand-charcoal sm:text-4xl`}>
          {title}
        </h2>
        {description ? (
          <p className="mt-3 text-sm leading-6 text-brand-charcoal/65 sm:text-base sm:leading-7">
            {description}
          </p>
        ) : null}
      </div>
      {action}
    </div>
  );
}

function DynamicImage({
  src,
  alt,
  className,
  sizes = "(min-width: 1024px) 33vw, 62vw"
}: {
  src: string;
  alt: string;
  className: string;
  sizes?: string;
}) {
  return src.startsWith("/") ? (
    <Image
      src={src}
      alt={alt}
      width={1200}
      height={1200}
      className={className}
      sizes={sizes}
    />
  ) : (
    <img src={src} alt={alt} className={className} loading="lazy" />
  );
}

function BenefitIcon({ name }: { name: string }) {
  const paths: Record<string, ReactNode> = {
    clock: <><circle cx="12" cy="12" r="8" /><path d="M12 7v5l3 2" /></>,
    spark: <><path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3Z" /><path d="m19 16 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z" /></>,
    one: <><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M10 9h2v6M10 15h5" /></>,
    truck: <><path d="M3 6h11v10H3zM14 10h4l3 3v3h-7z" /><circle cx="7" cy="18" r="1.5" /><circle cx="18" cy="18" r="1.5" /></>
  };

  return (
    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-green/10 text-brand-green">
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {paths[name]}
      </svg>
    </span>
  );
}

function CategoryCard({ category }: { category: ServiceCategory }) {
  const href = `/${category.link_slug.replace(/^\/+/, "") || "koleksi"}`;

  return (
    <Link href={href} className="group block min-w-[61vw] snap-start sm:min-w-[280px] lg:min-w-0">
      <article>
        <div className="overflow-hidden bg-white p-4 sm:p-6">
          <DynamicImage
            src={category.gambar_url}
            alt={category.nama_kategori}
            className="aspect-[4/5] w-full object-contain transition duration-500 group-hover:scale-[1.02]"
          />
        </div>
        <h3 className="mt-3 text-base font-semibold text-brand-charcoal sm:text-lg">
          {category.nama_kategori}
        </h3>
      </article>
    </Link>
  );
}

function ServiceCard({ service }: { service: Service }) {
  const price = formatRupiah(service.harga_mulai);

  return (
    <Link href={`/${service.slug.replace(/^\/+/, "") || "koleksi"}`} className="group min-w-[61vw] snap-start sm:min-w-[310px] lg:min-w-0">
      <article>
        <div className="overflow-hidden bg-[#efefe9]">
          <DynamicImage
            src={service.image_url}
            alt={service.nama}
            className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-[1.02]"
          />
        </div>
        <h3 className="mt-4 text-lg font-semibold text-brand-charcoal">{service.nama}</h3>
        <p className="mt-1 line-clamp-2 text-sm leading-6 text-brand-charcoal/60">{service.deskripsi}</p>
        {price ? <p className="mt-2 text-sm font-semibold text-brand-green">Mulai {price}</p> : null}
      </article>
    </Link>
  );
}

function StoreCard({ store }: { store: Store }) {
  const whatsappHref = whatsappLinkWithMessage(
    store.whatsapp_link || store.whatsapp,
    `Halo DE BRODER, saya ingin bertanya tentang Store ${store.nama_store}.`
  );

  return (
    <article className="min-w-[78vw] snap-start bg-white p-3 sm:min-w-[350px] lg:min-w-0">
      <DynamicImage
        src={getStoreImage(store)}
        alt={`Foto ${store.nama_store} DE BRODER`}
        className="aspect-[4/3] w-full object-cover"
        sizes="(min-width: 1024px) 25vw, 78vw"
      />
      <div className="p-2 pt-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-green">{store.layanan_utama}</p>
        <h3 className="mt-2 text-xl font-semibold text-brand-charcoal">{store.nama_store}</h3>
        <p className="mt-2 text-sm leading-6 text-brand-charcoal/60">{store.alamat}</p>
        {store.jam_operasional ? <p className="mt-2 text-sm font-medium text-brand-charcoal/70">{store.jam_operasional}</p> : null}
        <div className="mt-5 grid grid-cols-2 gap-2">
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center rounded-full bg-brand-green px-4 text-sm font-semibold text-white transition hover:bg-brand-greenDark">WhatsApp</a>
          <a href={store.maps_link} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center rounded-full border border-brand-softGray px-4 text-sm font-semibold transition hover:border-brand-green hover:text-brand-green">Petunjuk Arah</a>
        </div>
      </div>
    </article>
  );
}

export default async function Home() {
  const content = await getPublicContent();
  const categories = content.categories.filter((item) => item.status_aktif !== false).sort((a, b) => a.urutan - b.urutan).slice(0, 6);
  const services = content.services.filter((item) => item.status_aktif !== false).sort((a, b) => a.urutan - b.urutan).slice(0, 6);
  const stores = content.stores.filter((item) => item.status_aktif !== false).sort((a, b) => a.urutan - b.urutan).slice(0, 4);
  const whatsappHref = whatsappLinkWithMessage(
    content.contact.whatsapp_link || content.contact.whatsapp_utama,
    "Halo DE BRODER, saya ingin konsultasi kebutuhan apparel."
  );
  const aboutBody = content.trustAbout.about_body || content.about.body;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://debroder.com/#organization",
        name: "DE BRODER",
        url: "https://debroder.com",
        logo: "https://debroder.com/brand/debroder/logo-primary-black.png",
        email: content.contact.email,
        sameAs: [content.contact.instagram, content.contact.facebook].filter(Boolean)
      },
      ...stores.map((store) => ({
        "@type": "LocalBusiness",
        name: `DE BRODER ${store.nama_store}`,
        image: getStoreImage(store),
        address: store.alamat,
        telephone: store.whatsapp,
        url: "https://debroder.com/store"
      }))
    ]
  };

  return (
    <main className="min-h-screen bg-brand-offWhite text-brand-charcoal">
      <SiteHeader />
      <PageMotion />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />

      <HeroSlider heroes={content.heroes} />

      <section data-reveal aria-label="Keunggulan DE BRODER" className="border-b border-brand-softGray bg-white py-5 sm:py-6">
        <div className="section-shell grid grid-cols-2 gap-x-4 gap-y-5 lg:grid-cols-4 lg:gap-8">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="flex items-center gap-3">
              <BenefitIcon name={benefit.icon} />
              <div>
                <h2 className="text-sm font-semibold text-brand-charcoal">{benefit.title}</h2>
                <p className="mt-0.5 text-xs text-brand-charcoal/55">{benefit.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section data-reveal id="kategori" className="bg-brand-offWhite py-12 sm:py-18 lg:py-20">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Koleksi"
            title="Pakaian Polos berdasarkan Kategori"
            description="Pilih dasar apparel yang paling sesuai, lalu custom bersama tim DE BRODER."
            action={<ScrollButtons containerId="category-carousel" />}
          />
          <div id="category-carousel" className="no-scrollbar mt-7 flex snap-x gap-4 overflow-x-auto pb-3 lg:grid lg:grid-cols-6 lg:overflow-visible lg:pb-0">
            {categories.length ? categories.map((category) => <CategoryCard key={category.nama_kategori} category={category} />) : <p className="text-sm text-brand-charcoal/60">Belum ada kategori aktif.</p>}
          </div>
        </div>
      </section>

      <section data-reveal id="layanan" className="bg-white py-12 sm:py-18 lg:py-20">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Produksi"
            title="Layanan & Produk DE BRODER"
            description="Dari satu pesanan hingga kebutuhan produksi, semua dikerjakan dengan standar yang konsisten."
            action={<ScrollButtons containerId="service-carousel" />}
          />
          <div id="service-carousel" className="no-scrollbar mt-7 flex snap-x gap-4 overflow-x-auto pb-3 lg:grid lg:grid-cols-3 lg:gap-x-5 lg:gap-y-10 lg:overflow-visible lg:pb-0">
            {services.length ? services.map((service) => <ServiceCard key={service.nama} service={service} />) : <p className="text-sm text-brand-charcoal/60">Belum ada layanan aktif.</p>}
          </div>
        </div>
      </section>

      <section data-reveal id="store" className="bg-brand-offWhite py-12 sm:py-18 lg:py-20">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Datang & konsultasi"
            title="Store DE BRODER"
            description="Empat store aktif di Makassar dan Parepare siap membantu memilih bahan, teknik, dan estimasi produksi."
            action={<Link href="/store" className="text-sm font-semibold text-brand-green underline-offset-4 hover:underline">Lihat semua store →</Link>}
          />
          <div className="no-scrollbar -mx-4 mt-7 flex snap-x gap-4 overflow-x-auto px-4 pb-3 lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0 lg:pb-0">
            {stores.map((store) => <StoreCard key={store.nama_store} store={store} />)}
          </div>
        </div>
      </section>

      <section data-reveal id="tentang" className="bg-white py-12 sm:py-18 lg:py-20">
        <div className="section-shell grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-green">Sejak 2016</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.025em] sm:text-4xl">Tentang Kami</h2>
            <div className="mt-6 grid grid-cols-3 gap-3 border-t border-brand-softGray pt-5">
              {[['2016', 'Berdiri'], ['4', 'Store Aktif'], ['6+', 'Layanan']].map(([value, label]) => (
                <div key={label}><p className="text-2xl font-semibold text-brand-green">{value}</p><p className="mt-1 text-xs text-brand-charcoal/55">{label}</p></div>
              ))}
            </div>
          </div>
          <div className="whitespace-pre-line text-base leading-8 text-brand-charcoal/70">{aboutBody}</div>
        </div>
      </section>

      <PublicFooter content={content} />
      <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="fixed bottom-4 left-4 right-4 z-[70] inline-flex min-h-12 items-center justify-center rounded-full bg-brand-green px-6 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-greenDark sm:hidden">Chat WhatsApp</a>
    </main>
  );
}
