export type Product = {
  id?: string;
  nama: string;
  kategori: string;
  deskripsi: string;
  short_detail?: string;
  description?: string;
  badge: string;
  gambar_url: string;
  image_url?: string;
  whatsapp_link: string;
  link_url?: string;
  price?: number | string | null;
  harga?: number | string | null;
  base_price?: number | string | null;
  price_label?: string | null;
  urutan: number;
  status_aktif: boolean;
  created_at?: string;
  updated_at?: string;
};

export type ServiceCategory = {
  id?: string;
  nama_kategori: string;
  deskripsi: string;
  gambar_url: string;
  link_slug: string;
  urutan: number;
  status_aktif: boolean;
  created_at?: string;
  updated_at?: string;
};

export type Store = {
  id?: string;
  nama_store: string;
  layanan_utama: string;
  alamat: string;
  whatsapp: string;
  whatsapp_link: string;
  maps_link: string;
  image_url?: string;
  urutan: number;
  status_aktif: boolean;
  created_at?: string;
  updated_at?: string;
};

export type HeroBanner = {
  id?: string;
  badge?: string;
  headline: string;
  subheadline: string;
  title?: string;
  subtitle?: string;
  cta_primary_text: string;
  cta_primary_link: string;
  cta_secondary_text: string;
  cta_secondary_link: string;
  cta_text?: string;
  cta_link?: string;
  image_url: string;
  mobile_image_url?: string;
  hero_video_url?: string;
  video_url?: string;
  object_position?: string;
  mobile_object_position?: string;
  urutan?: number;
  status_aktif: boolean;
  created_at?: string;
  updated_at?: string;
};

export type AboutContent = {
  id?: string;
  label: string;
  title: string;
  body: string;
  highlights: string[];
  status_aktif: boolean;
  updated_at?: string;
};

export type Testimonial = {
  id?: string;
  nama: string;
  sumber: string;
  isi_testimoni: string;
  urutan?: number;
  status_aktif: boolean;
  created_at?: string;
  updated_at?: string;
};

export type ContactSettings = {
  id?: string;
  email: string;
  whatsapp_utama: string;
  whatsapp_link?: string;
  whatsapp_apparel: string;
  whatsapp_express: string;
  facebook?: string;
  instagram: string;
  copyright_text?: string;
  status_aktif?: boolean;
  updated_at?: string;
};

export type InstagramBanner = {
  id?: string;
  title: string;
  image_url: string;
  link_url: string;
  status_aktif: boolean;
  created_at?: string;
  updated_at?: string;
};

export type PageHeroContent = {
  id?: string;
  page_key: string;
  label: string;
  title: string;
  subtitle: string;
  image_url: string;
  mobile_image_url?: string;
  object_position: string;
  mobile_object_position?: string;
  status_aktif: boolean;
  created_at?: string;
  updated_at?: string;
};

export type OrderStep = {
  id?: string;
  title: string;
  description?: string;
  urutan: number;
  status_aktif: boolean;
  created_at?: string;
  updated_at?: string;
};

export type TrustAboutContent = {
  id?: string;
  trust_items: string[];
  about_body: string;
  status_aktif: boolean;
  created_at?: string;
  updated_at?: string;
};

export type PublicContent = {
  hero: HeroBanner;
  heroes: HeroBanner[];
  about: AboutContent;
  instagramBanner: InstagramBanner | null;
  pageHeroes: PageHeroContent[];
  categories: ServiceCategory[];
  products: Product[];
  stores: Store[];
  orderSteps: OrderStep[];
  trustAbout: TrustAboutContent;
  testimonials: Testimonial[];
  contact: ContactSettings;
};
