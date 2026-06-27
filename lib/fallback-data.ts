import type {
  AboutContent,
  ContactSettings,
  HeroBanner,
  InstagramBanner,
  OrderStep,
  PageHeroContent,
  Product,
  PublicContent,
  Service,
  ServiceCategory,
  Store,
  Testimonial,
  TrustAboutContent
} from "@/lib/types";
import { contactLinks, storeContacts } from "@/lib/contact";
import { whatsappLinkWithMessage } from "@/lib/url";

export const fallbackImages = {
  hero: "/images/debroder/hero/hero-1.jpg",
  heroMobile: "/images/debroder/hero/hero-1-mobile.jpg",
  heroSecondary: "/images/debroder/hero/hero-2.jpg",
  heroSecondaryMobile: "/images/debroder/hero/hero-2-mobile.jpg",
  pageHero: "/images/debroder/fallback/fallback-page-hero.jpg",
  pageHeroMobile: "/images/debroder/fallback/fallback-page-hero-mobile.jpg",
  product: "/images/debroder/fallback/fallback-product.jpg",
  banner: "/images/debroder/fallback/fallback-banner.jpg",
  bannerMobile: "/images/debroder/fallback/fallback-banner-mobile.jpg",
  store: "/images/debroder/fallback/fallback-store.jpg",
  benefit: "/images/debroder/fallback/fallback-product.jpg"
} as const;

export const storeImageFallbacks: Record<string, string> = {
  "STORE PETTARANI": "/images/debroder/stores/store-pettarani.jpg",
  "STORE TELLO": "/images/debroder/stores/store-tello.jpg",
  "STORE LANDAK": "/images/debroder/stores/store-landak.jpg",
  "STORE PAREPARE": "/images/debroder/stores/store-parepare.jpg"
};

export const productImageFallbacks: Record<string, string> = {
  "Kaos Polos New State Apparel":
    "/images/debroder/products/produk-kaos-polos.jpg",
  "Kaos Polos Import": "/images/debroder/products/produk-kaos-polos.jpg",
  "Kaos Polos Cotton Combed":
    "/images/debroder/products/produk-kaos-polos.jpg",
  "Kaos Cotton Combed": "/images/debroder/products/produk-kaos-polos.jpg",
  "Distributor Kaos NSA":
    "/images/debroder/products/produk-kaos-polos.jpg",
  "Sablon DTF Custom": "/images/debroder/products/produk-sablon-dtf.jpg",
  "Custom Jersey": "/images/debroder/products/produk-jersey.jpg",
  "Maklon DTF": "/images/debroder/products/produk-maklon-dtf.jpg",
  "Cetak Sublim": "/images/debroder/products/produk-cetak-sublim.jpg"
};

export const pageHeroImageFallbacks: Record<string, string> = {
  koleksi: "/images/debroder/page-heroes/hero-1.jpg",
  "kaos-polos": "/images/debroder/page-heroes/hero-kaos-polos.jpg",
  "sablon-dtf": "/images/debroder/page-heroes/hero-sablon-dtf.jpg",
  "maklon-dtf": "/images/debroder/page-heroes/hero-maklon-dtf.jpg",
  jersey: "/images/debroder/page-heroes/hero-jersey.jpg",
  "cetak-sublim": "/images/debroder/page-heroes/hero-cetak-sublim.jpg",
  store: "/images/debroder/page-heroes/hero-store.jpg",
  "cara-order": "/images/debroder/page-heroes/hero-cara-order.jpg"
};

export const pageHeroMobileImageFallbacks: Record<string, string> = {
  koleksi: "/images/debroder/page-heroes/hero-1-mobile.jpg",
  "kaos-polos": "/images/debroder/page-heroes/hero-kaos-polos-mobile.jpg",
  "sablon-dtf": "/images/debroder/page-heroes/hero-sablon-dtf-mobile.jpg",
  "maklon-dtf": "/images/debroder/page-heroes/hero-maklon-dtf-mobile.jpg",
  jersey: "/images/debroder/page-heroes/hero-jersey-mobile.jpg",
  "cetak-sublim": "/images/debroder/page-heroes/hero-cetak-sublim-mobile.jpg",
  store: "/images/debroder/page-heroes/hero-store-mobile.jpg",
  "cara-order": "/images/debroder/page-heroes/hero-cara-order-mobile.jpg"
};

export function getStoreImage(store: Pick<Store, "nama_store" | "image_url">) {
  return (
    store.image_url ||
    storeImageFallbacks[store.nama_store] ||
    fallbackImages.store
  );
}

export function getProductImage(
  product: Pick<Product, "nama" | "image_url" | "gambar_url">
) {
  return (
    product.image_url ||
    product.gambar_url ||
    productImageFallbacks[product.nama] ||
    fallbackImages.product
  );
}

export function getPageHeroImage(
  pageHero: Pick<PageHeroContent, "page_key" | "image_url"> | null | undefined
) {
  return (
    pageHero?.image_url ||
    (pageHero?.page_key ? pageHeroImageFallbacks[pageHero.page_key] : "") ||
    fallbackImages.pageHero
  );
}

export const fallbackHeroes: HeroBanner[] = [
  {
    badge: "KAOS POLOS NEW STATE APPAREL",
    headline: "KAOS POLOS NEW STATE APPAREL",
    subheadline: "Sablon DTF, Jersey, dan Custom Apparel",
    title: "KAOS POLOS NEW STATE APPAREL",
    subtitle: "Sablon DTF, Jersey, dan Custom Apparel",
    cta_primary_text: "Beli Sekarang",
    cta_primary_link: "/koleksi",
    cta_secondary_text: "",
    cta_secondary_link: "",
    cta_text: "Beli Sekarang",
    cta_link: "/koleksi",
    image_url: fallbackImages.hero,
    mobile_image_url: fallbackImages.heroMobile,
    object_position: "center center",
    mobile_object_position: "center center",
    urutan: 1,
    status_aktif: true
  },
  {
    badge: "SABLON DTF",
    headline: "SABLON DTF",
    subheadline: "Custom Jersey, Maklon DTF, dan Cetak Sublim",
    title: "SABLON DTF",
    subtitle: "Custom Jersey, Maklon DTF, dan Cetak Sublim",
    cta_primary_text: "Konsultasi",
    cta_primary_link: "/sablon-dtf",
    cta_secondary_text: "",
    cta_secondary_link: "",
    cta_text: "Konsultasi",
    cta_link: "/sablon-dtf",
    image_url: fallbackImages.heroSecondary,
    mobile_image_url: fallbackImages.heroSecondaryMobile,
    object_position: "center center",
    mobile_object_position: "center center",
    urutan: 2,
    status_aktif: true
  }
];

export const fallbackHero: HeroBanner = fallbackHeroes[0];

export const fallbackAbout: AboutContent = {
  label: "TENTANG KAMI",
  title: "Tentang Kami",
  body: "De Broder adalah perusahaan percetakan yang berdiri sejak tahun 2016. Kami fokus mengerjakan:\n\nSablon Kaos\nCustom Jersey\nMaklon DTF\nCetak Sublim\nDistributor Kaos NSA\nKaos Cotton Combed\n\nKami telah dipercaya oleh berbagai perusahaan, instansi, dan event besar di Indonesia Timur, khususnya di kota Makassar.",
  highlights: [
    "Sablon Kaos",
    "Custom Jersey",
    "Maklon DTF",
    "Cetak Sublim",
    "Distributor Kaos NSA",
    "Kaos Cotton Combed"
  ],
  status_aktif: true
};

export const aboutServiceList = [
  "Sablon Kaos",
  "Custom Jersey",
  "Maklon DTF",
  "Cetak Sublim",
  "Distributor Kaos NSA",
  "Kaos Cotton Combed"
];

export const fallbackCategories: ServiceCategory[] = [
  {
    nama_kategori: "Kaos Polos",
    deskripsi: "Kaos polos premium untuk brand, komunitas, dan kebutuhan harian",
    gambar_url: "/images/debroder/products/produk-kaos-polos.jpg",
    link_slug: "kaos-polos",
    urutan: 1,
    status_aktif: true
  },
  {
    nama_kategori: "Polo Shirt",
    deskripsi: "Polo rapi untuk bisnis, seragam, dan komunitas",
    gambar_url: "/images/debroder/products/produk-kaos-polos.jpg",
    link_slug: "koleksi",
    urutan: 2,
    status_aktif: true
  },
  {
    nama_kategori: "Jacket",
    deskripsi: "Jacket custom untuk tim, organisasi, dan brand",
    gambar_url: "/images/debroder/products/produk-kaos-polos.jpg",
    link_slug: "koleksi",
    urutan: 3,
    status_aktif: true
  },
  {
    nama_kategori: "Hoodie",
    deskripsi: "Hoodie nyaman untuk merchandise dan koleksi brand",
    gambar_url: "/images/debroder/products/produk-kaos-polos.jpg",
    link_slug: "koleksi",
    urutan: 4,
    status_aktif: true
  },
  {
    nama_kategori: "Kaos Cotton Combed",
    deskripsi: "Cotton combed lembut untuk custom dan kebutuhan brand",
    gambar_url: "/images/debroder/products/produk-kaos-polos.jpg",
    link_slug: "kaos-polos",
    urutan: 5,
    status_aktif: true
  },
  {
    nama_kategori: "Jersey",
    deskripsi: "Jersey custom untuk tim, sekolah, komunitas, dan instansi",
    gambar_url: "/images/debroder/products/produk-jersey.jpg",
    link_slug: "jersey",
    urutan: 6,
    status_aktif: true
  }
];

export const fallbackServices: Service[] = [
  {
    nama: "Sablon DTF",
    slug: "sablon-dtf",
    deskripsi: "Hasil tajam dan fleksibel untuk kaos, brand, serta komunitas.",
    image_url: "/images/debroder/products/produk-sablon-dtf.jpg",
    harga_mulai: 5000,
    urutan: 1,
    status_aktif: true
  },
  {
    nama: "Custom Jersey",
    slug: "jersey",
    deskripsi: "Jersey custom untuk tim olahraga, sekolah, dan instansi.",
    image_url: "/images/debroder/products/produk-jersey.jpg",
    harga_mulai: 75000,
    urutan: 2,
    status_aktif: true
  },
  {
    nama: "Maklon DTF",
    slug: "maklon-dtf",
    deskripsi: "Partner produksi DTF untuk reseller dan brand apparel.",
    image_url: "/images/debroder/products/produk-maklon-dtf.jpg",
    harga_mulai: 25000,
    urutan: 3,
    status_aktif: true
  },
  {
    nama: "Cetak Sublim",
    slug: "cetak-sublim",
    deskripsi: "Cetak warna menyeluruh untuk jersey dan apparel custom.",
    image_url: "/images/debroder/products/produk-cetak-sublim.jpg",
    harga_mulai: 35000,
    urutan: 4,
    status_aktif: true
  },
  {
    nama: "Kaos NSA",
    slug: "kaos-polos",
    deskripsi: "Kaos New State Apparel siap pakai atau siap custom.",
    image_url: "/images/debroder/products/produk-kaos-polos.jpg",
    harga_mulai: 45000,
    urutan: 5,
    status_aktif: true
  },
  {
    nama: "Cotton Combed",
    slug: "kaos-polos",
    deskripsi: "Kaos cotton combed nyaman untuk brand dan kebutuhan harian.",
    image_url: "/images/debroder/products/produk-kaos-polos.jpg",
    harga_mulai: 45000,
    urutan: 6,
    status_aktif: true
  }
];

export const fallbackProducts: Product[] = [
  {
    nama: "Kaos Polos New State Apparel",
    kategori: "Kaos Polos",
    badge: "",
    deskripsi:
      "Kaos polos New State Apparel untuk brand, event, dan kebutuhan harian",
    short_detail:
      "Kaos polos New State Apparel untuk brand, event, dan kebutuhan harian",
    gambar_url: "/images/debroder/products/produk-kaos-polos.jpg",
    image_url: "/images/debroder/products/produk-kaos-polos.jpg",
    whatsapp_link: contactLinks.whatsapp,
    link_url: "/kaos-polos",
    price: 45000,
    urutan: 1,
    status_aktif: true
  },
  {
    nama: "Kaos Cotton Combed",
    kategori: "Kaos Polos",
    badge: "",
    deskripsi: "Kaos cotton combed untuk custom dan kebutuhan brand",
    short_detail: "Kaos cotton combed untuk custom dan kebutuhan brand",
    gambar_url: "/images/debroder/products/produk-kaos-polos.jpg",
    image_url: "/images/debroder/products/produk-kaos-polos.jpg",
    whatsapp_link: contactLinks.whatsapp,
    link_url: "/kaos-polos",
    price: 45000,
    urutan: 2,
    status_aktif: true
  },
  {
    nama: "Sablon DTF Custom",
    kategori: "Sablon DTF",
    badge: "",
    deskripsi: "Sablon DTF untuk logo, brand, dan komunitas",
    short_detail: "Sablon DTF untuk logo, brand, dan komunitas",
    gambar_url: "/images/debroder/products/produk-sablon-dtf.jpg",
    image_url: "/images/debroder/products/produk-sablon-dtf.jpg",
    whatsapp_link: contactLinks.whatsapp,
    link_url: "/sablon-dtf",
    price: 5000,
    urutan: 3,
    status_aktif: true
  },
  {
    nama: "Custom Jersey",
    kategori: "Jersey",
    badge: "",
    deskripsi: "Jersey custom untuk tim dan komunitas",
    short_detail: "Jersey custom untuk tim dan komunitas",
    gambar_url: "/images/debroder/products/produk-jersey.jpg",
    image_url: "/images/debroder/products/produk-jersey.jpg",
    whatsapp_link: contactLinks.whatsapp,
    link_url: "/jersey",
    price: 75000,
    urutan: 4,
    status_aktif: true
  },
  {
    nama: "Maklon DTF",
    kategori: "Maklon DTF",
    badge: "",
    deskripsi: "Produksi DTF untuk reseller dan brand apparel",
    short_detail: "Produksi DTF untuk reseller dan brand apparel",
    gambar_url: "/images/debroder/products/produk-maklon-dtf.jpg",
    image_url: "/images/debroder/products/produk-maklon-dtf.jpg",
    whatsapp_link: contactLinks.whatsapp,
    link_url: "/maklon-dtf",
    price: 25000,
    urutan: 5,
    status_aktif: true
  },
  {
    nama: "Cetak Sublim",
    kategori: "Cetak Sublim",
    badge: "",
    deskripsi: "Cetak sublim untuk jersey dan apparel custom",
    short_detail: "Cetak sublim untuk jersey dan apparel custom",
    gambar_url: "/images/debroder/products/produk-cetak-sublim.jpg",
    image_url: "/images/debroder/products/produk-cetak-sublim.jpg",
    whatsapp_link: contactLinks.whatsapp,
    link_url: "/cetak-sublim",
    price: 35000,
    urutan: 6,
    status_aktif: true
  },
  {
    nama: "Distributor Kaos NSA",
    kategori: "Kaos Polos",
    badge: "",
    deskripsi: "Pilihan kaos NSA untuk kebutuhan store dan produksi",
    short_detail: "Pilihan kaos NSA untuk kebutuhan store dan produksi",
    gambar_url: "/images/debroder/products/produk-kaos-polos.jpg",
    image_url: "/images/debroder/products/produk-kaos-polos.jpg",
    whatsapp_link: contactLinks.whatsapp,
    link_url: "/kaos-polos",
    urutan: 7,
    status_aktif: true
  }
];

export const fallbackStores: Store[] = storeContacts.map((store, index) => ({
  nama_store: store.name,
  layanan_utama: store.service,
  alamat: store.address,
  whatsapp: store.whatsapp,
  whatsapp_link: whatsappLinkWithMessage(
    store.whatsappLink,
    `Halo DE BRODER, saya ingin bertanya tentang layanan di Store ${store.name}.`
  ),
  maps_link: store.mapsLink,
  image_url: storeImageFallbacks[store.name],
  urutan: index + 1,
  status_aktif: true
}));

export const fallbackInstagramBanner: InstagramBanner = {
  title: "Instagram DE BRODER",
  image_url: fallbackImages.banner,
  mobile_image_url: fallbackImages.bannerMobile,
  link_url: contactLinks.instagram,
  object_position: "center center",
  mobile_object_position: "center center",
  status_aktif: true
};

export const fallbackPageHeroes: PageHeroContent[] = [
  {
    page_key: "koleksi",
    label: "KOLEKSI",
    title: "Layanan & Produk DE BRODER",
    subtitle:
      "Temukan kebutuhan apparel, sablon, jersey, dan layanan custom dalam satu tempat.",
    image_url: pageHeroImageFallbacks.koleksi,
    mobile_image_url: pageHeroMobileImageFallbacks.koleksi,
    object_position: "center center",
    mobile_object_position: "center center",
    status_aktif: true
  },
  {
    page_key: "kaos-polos",
    label: "KAOS POLOS",
    title: "Kaos Polos New State Apparel & Cotton Combed",
    subtitle:
      "Pilihan kaos polos untuk brand, komunitas, event, dan kebutuhan harian.",
    image_url: pageHeroImageFallbacks["kaos-polos"],
    mobile_image_url: pageHeroMobileImageFallbacks["kaos-polos"],
    object_position: "center center",
    mobile_object_position: "center center",
    status_aktif: true
  },
  {
    page_key: "sablon-dtf",
    label: "SABLON DTF",
    title: "Sablon DTF untuk Apparel Custom",
    subtitle:
      "Hasil sablon rapi untuk logo, desain brand, komunitas, dan produksi apparel.",
    image_url: pageHeroImageFallbacks["sablon-dtf"],
    mobile_image_url: pageHeroMobileImageFallbacks["sablon-dtf"],
    object_position: "center center",
    mobile_object_position: "center center",
    status_aktif: true
  },
  {
    page_key: "maklon-dtf",
    label: "MAKLON DTF",
    title: "Maklon DTF untuk Kebutuhan Produksi",
    subtitle:
      "Layanan produksi DTF untuk reseller, brand apparel, dan kebutuhan bisnis.",
    image_url: pageHeroImageFallbacks["maklon-dtf"],
    mobile_image_url: pageHeroMobileImageFallbacks["maklon-dtf"],
    object_position: "center center",
    mobile_object_position: "center center",
    status_aktif: true
  },
  {
    page_key: "jersey",
    label: "CUSTOM JERSEY",
    title: "Jersey Custom untuk Tim dan Komunitas",
    subtitle:
      "Produksi jersey untuk tim olahraga, sekolah, instansi, dan event.",
    image_url: pageHeroImageFallbacks.jersey,
    mobile_image_url: pageHeroMobileImageFallbacks.jersey,
    object_position: "center center",
    mobile_object_position: "center center",
    status_aktif: true
  },
  {
    page_key: "cetak-sublim",
    label: "CETAK SUBLIM",
    title: "Cetak Sublim untuk Apparel Custom",
    subtitle:
      "Cetak sublim untuk jersey dan apparel custom dengan hasil rapi.",
    image_url: pageHeroImageFallbacks["cetak-sublim"],
    mobile_image_url: pageHeroMobileImageFallbacks["cetak-sublim"],
    object_position: "center center",
    mobile_object_position: "center center",
    status_aktif: true
  },
  {
    page_key: "store",
    label: "STORE",
    title: "Temukan Store DE BRODER Terdekat",
    subtitle: "Pettarani, Tello, Landak, dan Parepare.",
    image_url: pageHeroImageFallbacks.store,
    mobile_image_url: pageHeroMobileImageFallbacks.store,
    object_position: "center center",
    mobile_object_position: "center center",
    status_aktif: true
  },
  {
    page_key: "cara-order",
    label: "CARA ORDER",
    title: "Cara Order di DE BRODER",
    subtitle: "Alur singkat untuk konsultasi dan memesan kebutuhan apparel.",
    image_url: pageHeroImageFallbacks["cara-order"],
    mobile_image_url: pageHeroMobileImageFallbacks["cara-order"],
    object_position: "center center",
    mobile_object_position: "center center",
    status_aktif: true
  }
];

export const fallbackOrderSteps: OrderStep[] = [
  {
    title: "Pilih layanan",
    description: "Tentukan kebutuhan apparel, sablon, jersey, atau custom.",
    urutan: 1,
    status_aktif: true
  },
  {
    title: "Konsultasi kebutuhan",
    description: "Diskusikan bahan, desain, jumlah, ukuran, dan estimasi.",
    urutan: 2,
    status_aktif: true
  },
  {
    title: "Kirim desain/detail",
    description: "Kirim file, logo, referensi, atau detail pesanan.",
    urutan: 3,
    status_aktif: true
  },
  {
    title: "Proses produksi",
    description: "Pesanan diproses sesuai detail yang disepakati.",
    urutan: 4,
    status_aktif: true
  },
  {
    title: "Ambil di store",
    description: "Ambil pesanan di store DE BRODER pilihan Anda.",
    urutan: 5,
    status_aktif: true
  }
];

export const fallbackTrustAbout: TrustAboutContent = {
  trust_items: [
    "Berdiri sejak 2016",
    "Store Makassar & Parepare",
    "Sablon DTF",
    "Custom Jersey",
    "Maklon DTF"
  ],
  about_body: fallbackAbout.body,
  status_aktif: true
};

export const fallbackTestimonials: Testimonial[] = [
  {
    nama: "Komunitas Olahraga Makassar",
    sumber: "Custom jersey",
    isi_testimoni:
      "Pesanan jersey rapi, komunikasinya jelas, dan hasilnya sesuai kebutuhan tim.",
    urutan: 1,
    status_aktif: true
  }
];

export const fallbackContact: ContactSettings = {
  email: "debroderapparel@gmail.com",
  whatsapp_utama: "0853-5533-3364",
  whatsapp_link: contactLinks.whatsapp,
  whatsapp_apparel: "0853-5533-3364",
  whatsapp_express: "0853-5533-3364",
  facebook: contactLinks.facebook,
  instagram: contactLinks.instagram,
  copyright_text: "\u00a9 2026 DE BRODER. All rights reserved.",
  status_aktif: true
};

export const fallbackContent: PublicContent = {
  hero: fallbackHero,
  heroes: fallbackHeroes,
  about: fallbackAbout,
  instagramBanner: fallbackInstagramBanner,
  pageHeroes: fallbackPageHeroes,
  categories: fallbackCategories,
  services: fallbackServices,
  products: fallbackProducts,
  stores: fallbackStores,
  orderSteps: fallbackOrderSteps,
  trustAbout: fallbackTrustAbout,
  testimonials: fallbackTestimonials,
  contact: fallbackContact
};
