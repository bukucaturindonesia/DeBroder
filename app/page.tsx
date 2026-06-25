/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { HeroSlider } from "@/components/HeroSlider";
import { PageMotion } from "@/components/PageMotion";
import { PublicFooter } from "@/components/PublicFooter";
import { ScrollButtons } from "@/components/ScrollButtons";
import { SiteHeader } from "@/components/SiteHeader";
import {
  aboutServiceList,
  fallbackImages,
  getProductImage,
  getStoreImage
} from "@/lib/fallback-data";
import { getPublicContent } from "@/lib/public-data";
import type { Product, Store } from "@/lib/types";
import { formatRupiah, whatsappLinkWithMessage } from "@/lib/url";

const benefitCards = [
  {
    title: "Bisa pesan sesuai kebutuhan",
    description: "Untuk brand, komunitas, event, sekolah, instansi, dan harian.",
    image: fallbackImages.benefit
  },
  {
    title: "Layanan apparel lengkap",
    description: "Kaos polos, sablon DTF, jersey, maklon, dan sublim.",
    image: fallbackImages.product
  },
  {
    title: "Tersedia beberapa store",
    description: "Pettarani, Tello, Landak, dan Parepare siap melayani.",
    image: fallbackImages.store
  }
];

function SectionHeading({
  title,
  description,
  action
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-3xl">
        <h2 className="text-3xl font-semibold tracking-tight text-brand-charcoal sm:text-4xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-3 text-base leading-7 text-brand-charcoal/70">
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
  priority = false,
  className,
  sizes = "(min-width: 1024px) 33vw, 100vw",
  objectPosition = "center center"
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className: string;
  sizes?: string;
  objectPosition?: string;
}) {
  if (src.startsWith("/")) {
    return (
      <Image
        src={src}
        alt={alt}
        width={1536}
        height={1024}
        priority={priority}
        className={className}
        sizes={sizes}
        style={{ objectPosition }}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      style={{ objectPosition }}
    />
  );
}

function productDetail(product: Product) {
  return product.short_detail || product.description || product.deskripsi;
}

function productPrice(product: Product) {
  return formatRupiah(
    product.price ?? product.harga ?? product.base_price ?? product.price_label
  );
}

function ProductCard({ product }: { product: Product }) {
  const price = productPrice(product);
  const whatsappHref = whatsappLinkWithMessage(
    product.whatsapp_link || "",
    `Halo DE BRODER, saya ingin bertanya tentang ${product.nama}.`
  );

  return (
    <article className="group bg-transparent">
      <Link href={product.link_url || "/koleksi"} className="block">
        <DynamicImage
          src={getProductImage(product)}
          alt={product.nama}
          className="aspect-[4/5] w-full object-cover"
        />
        <h3 className="mt-4 line-clamp-2 text-lg font-semibold text-brand-charcoal">
          {product.nama}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm leading-6 text-brand-charcoal/60">
          {productDetail(product)}
        </p>
        {price ? (
          <p className="mt-2 text-sm font-medium text-brand-charcoal">
            {price}
          </p>
        ) : null}
      </Link>
      <a
        href={whatsappHref}
        className="mt-4 inline-flex min-h-10 items-center justify-center rounded-full bg-brand-charcoal px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-black/80"
        target="_blank"
        rel="noopener noreferrer"
      >
        Pesan Sekarang
      </a>
    </article>
  );
}

function StoreCard({ store }: { store: Store }) {
  const whatsappHref = whatsappLinkWithMessage(
    store.whatsapp_link || store.whatsapp || "",
    `Halo DE BRODER, saya ingin bertanya tentang layanan di Store ${store.nama_store}.`
  );

  return (
    <article className="min-w-[78vw] snap-start bg-white p-3 sm:min-w-[360px] md:min-w-0">
      <DynamicImage
        src={getStoreImage(store)}
        alt={`Foto ${store.nama_store} DE BRODER`}
        className="aspect-[4/3] w-full object-cover"
      />
      <p className="mt-4 text-sm font-medium text-brand-charcoal/70">
        {store.layanan_utama}
      </p>
      <h3 className="mt-2 text-xl font-semibold text-brand-charcoal">
        {store.nama_store}
      </h3>
      <p className="mt-2 min-h-[72px] text-sm leading-6 text-brand-charcoal/60">
        {store.alamat}
      </p>
      <div className="mt-5 grid gap-3">
        <a
          href={whatsappHref}
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-brand-charcoal px-5 text-sm font-semibold text-white transition hover:bg-black/80"
          target="_blank"
          rel="noopener noreferrer"
        >
          Hubungi
        </a>
        <a
          href={store.maps_link}
          className="inline-flex min-h-11 items-center justify-center rounded-full border border-brand-softGray bg-white px-5 text-sm font-semibold text-brand-charcoal transition hover:border-brand-charcoal"
          target="_blank"
          rel="noopener noreferrer"
        >
          Lihat Lokasi
        </a>
      </div>
    </article>
  );
}

export default async function Home() {
  const content = await getPublicContent();
  const products = [...content.products]
    .filter((product) => product.status_aktif !== false)
    .sort((a, b) => a.urutan - b.urutan)
    .slice(0, 8);
  const stores = [...content.stores]
    .filter((store) => store.status_aktif !== false)
    .sort((a, b) => a.urutan - b.urutan)
    .slice(0, 4);
  const orderSteps = [...content.orderSteps]
    .filter((step) => step.status_aktif !== false)
    .sort((a, b) => a.urutan - b.urutan)
    .slice(0, 5);
  const trustItems = content.trustAbout.trust_items?.length
    ? content.trustAbout.trust_items
    : content.about.highlights;
  const generalWhatsapp = whatsappLinkWithMessage(
    content.contact.whatsapp_link || content.contact.whatsapp_utama,
    "Halo DE BRODER, saya ingin bertanya tentang layanan DE BRODER."
  );

  return (
    <main className="min-h-screen overflow-x-hidden bg-brand-offWhite text-brand-charcoal">
      <SiteHeader />
      <PageMotion />

      <HeroSlider heroes={content.heroes} />

      <section data-reveal className="bg-white py-10 sm:py-12">
        <div className="section-shell grid gap-5 md:grid-cols-3">
          {benefitCards.map((benefit, index) => (
            <article key={benefit.title} className="bg-white">
              <DynamicImage
                src={benefit.image}
                alt={benefit.title}
                priority={index === 0}
                className="aspect-[16/10] w-full object-cover"
              />
              <h2 className="mt-4 text-lg font-semibold text-brand-charcoal">
                {benefit.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-brand-charcoal/60">
                {benefit.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section data-reveal id="koleksi" className="bg-brand-offWhite py-14 sm:py-20">
        <div className="section-shell">
          <SectionHeading
            title="Layanan & Produk DE BRODER"
            action={
              <div className="flex items-center gap-3">
                <Link
                  href="/koleksi"
                  className="inline-flex min-h-10 items-center rounded-full border border-brand-softGray bg-white px-5 text-sm font-semibold text-brand-charcoal transition hover:border-brand-charcoal"
                >
                  Lihat Semua
                </Link>
                <ScrollButtons containerId="landing-catalog-carousel" />
              </div>
            }
          />

          <div
            id="landing-catalog-carousel"
            className="no-scrollbar mt-8 flex snap-x gap-5 overflow-x-auto pb-4"
          >
            {products.map((product) => (
              <div
                key={product.nama}
                className="min-w-[78vw] snap-start sm:min-w-[330px] lg:min-w-[350px]"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {content.instagramBanner ? (
        <section data-reveal className="w-full bg-white py-8 sm:py-12">
          <a
            href={content.instagramBanner.link_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block w-full overflow-hidden bg-brand-offWhite"
            aria-label="Buka Instagram DE BRODER"
          >
            <div className="relative aspect-[16/8] w-full sm:aspect-[16/6] lg:aspect-[16/5]">
              <DynamicImage
                src={content.instagramBanner.image_url || fallbackImages.banner}
                alt={content.instagramBanner.title || "Banner Instagram DE BRODER"}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.01]"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/10 to-transparent" />
              <div className="absolute bottom-5 left-4 right-4 max-w-md text-white sm:bottom-8 sm:left-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/75">
                  Instagram
                </p>
                <h2 className="mt-2 text-2xl font-semibold sm:text-4xl">
                  Ikuti update DE BRODER
                </h2>
              </div>
            </div>
          </a>
        </section>
      ) : null}

      <section data-reveal id="store" className="bg-brand-offWhite py-14 sm:py-20">
        <div className="section-shell">
          <SectionHeading
            title="Store DE BRODER"
            description="Temukan store De Broder terdekat untuk kebutuhan kaos polos, sablon DTF, jersey, dan layanan apparel lainnya."
            action={
              <Link
                href="/store"
                className="text-sm font-semibold text-brand-charcoal underline-offset-4 hover:underline"
              >
                lihat semua -&gt;
              </Link>
            }
          />

          <div className="-mx-4 mt-8 flex snap-x gap-4 overflow-x-auto px-4 pb-4 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 xl:grid-cols-4">
            {stores.map((store) => (
              <StoreCard key={store.nama_store} store={store} />
            ))}
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <h3 className="text-2xl font-semibold text-brand-charcoal">
                Cara Order
              </h3>
              <p className="mt-3 text-sm leading-6 text-brand-charcoal/70">
                Pesan kebutuhan apparel Anda dengan proses yang ringkas,
                jelas, dan siap dibantu lewat WhatsApp.
              </p>
              <a
                href={generalWhatsapp}
                className="mt-5 inline-flex min-h-11 items-center rounded-full bg-brand-charcoal px-6 text-sm font-semibold text-white transition hover:bg-black/80"
                target="_blank"
                rel="noopener noreferrer"
              >
                Mulai Order
              </a>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {orderSteps.map((step, index) => (
                <article key={step.title} className="bg-white p-4">
                  <span className="text-xs font-semibold text-brand-charcoal/50">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h4 className="mt-4 text-base font-semibold leading-6 text-brand-charcoal">
                    {step.title}
                  </h4>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section data-reveal className="bg-brand-charcoal py-12 text-white sm:py-14">
        <div className="section-shell grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Dipercaya untuk kebutuhan apparel dan custom
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/70">
              De Broder melayani kebutuhan personal, komunitas, brand, event,
              sekolah, instansi, hingga perusahaan melalui beberapa store.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {trustItems.map((highlight) => (
              <div
                key={highlight}
                className="border border-white/15 bg-white/10 px-4 py-3 text-sm font-medium text-white"
              >
                {highlight}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section data-reveal id="tentang" className="bg-white py-14 sm:py-16">
        <div className="section-shell max-w-3xl">
          <h2 className="text-3xl font-semibold tracking-tight text-brand-charcoal sm:text-4xl">
            Tentang Kami
          </h2>
          <div className="mt-5 grid gap-4 text-base leading-7 text-brand-charcoal/70">
            <p>
              De Broder adalah perusahaan percetakan yang berdiri sejak tahun
              2016. Kami fokus mengerjakan:
            </p>
            <ul className="list-disc space-y-2 pl-5">
              {aboutServiceList.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
            <p>
              Kami telah dipercaya oleh berbagai perusahaan, instansi, dan
              event besar di Indonesia Timur, khususnya di kota Makassar.
            </p>
          </div>
        </div>
      </section>

      <PublicFooter content={content} />
    </main>
  );
}
