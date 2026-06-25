import { fallbackContent, fallbackInstagramBanner } from "@/lib/fallback-data";
import { createSupabaseServerClient } from "@/lib/supabase";
import type {
  AboutContent,
  ContactSettings,
  HeroBanner,
  InstagramBanner,
  OrderStep,
  PageHeroContent,
  Product,
  PublicContent,
  ServiceCategory,
  Store,
  Testimonial,
  TrustAboutContent
} from "@/lib/types";

async function readActive<T>(
  table: string,
  fallback: T[],
  order = "urutan"
): Promise<T[]> {
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return fallback;
  }

  const { data, error } = await supabase
    .from(table)
    .select("*")
    .eq("status_aktif", true)
    .order(order, { ascending: true });

  if (error || !data || data.length === 0) {
    return fallback;
  }

  return data as T[];
}

async function readSingle<T>(
  table: string,
  fallback: T,
  filterActive = true
): Promise<T> {
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return fallback;
  }

  let query = supabase.from(table).select("*").limit(1);

  if (filterActive) {
    query = query.eq("status_aktif", true);
  }

  const { data, error } = await query.maybeSingle();

  if (error || !data) {
    return fallback;
  }

  return data as T;
}

async function readOptionalActiveSingle<T>(
  table: string,
  fallback: T
): Promise<T | null> {
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return fallback;
  }

  const { data, error } = await supabase
    .from(table)
    .select("*")
    .eq("status_aktif", true)
    .limit(1)
    .maybeSingle();

  if (error) {
    return fallback;
  }

  return data ? (data as T) : null;
}

const blockedPublicPattern = /\b(express|ekspedisi|pengiriman|distribusi)\b/i;
const finalPageHeroKeys = [
  "koleksi",
  "kaos-polos",
  "sablon-dtf",
  "jersey",
  "store",
  "cara-order"
];

function displayBrand(value?: string | null) {
  return (value || "")
    .replace(/\bDEBRODER\b/g, "DE BRODER")
    .replace(/\bDebroder\b/g, "De Broder");
}

function hasBlockedPublicText(values: Array<string | null | undefined>) {
  return values.some((value) => blockedPublicPattern.test(value || ""));
}

function cleanHero(hero: HeroBanner) {
  return {
    ...hero,
    badge: displayBrand(hero.badge),
    headline: displayBrand(hero.headline),
    subheadline: displayBrand(hero.subheadline),
    title: displayBrand(hero.title),
    subtitle: displayBrand(hero.subtitle),
    cta_primary_text: displayBrand(hero.cta_primary_text),
    cta_secondary_text: displayBrand(hero.cta_secondary_text),
    cta_text: displayBrand(hero.cta_text)
  };
}

function cleanCategory(category: ServiceCategory) {
  return {
    ...category,
    nama_kategori: displayBrand(category.nama_kategori),
    deskripsi: displayBrand(category.deskripsi)
  };
}

function cleanProduct(product: Product) {
  return {
    ...product,
    nama: displayBrand(product.nama),
    kategori: displayBrand(product.kategori),
    deskripsi: displayBrand(product.deskripsi),
    short_detail: displayBrand(product.short_detail),
    description: displayBrand(product.description),
    badge: displayBrand(product.badge)
  };
}

function cleanStore(store: Store) {
  return {
    ...store,
    nama_store: displayBrand(store.nama_store),
    layanan_utama: displayBrand(store.layanan_utama),
    alamat: displayBrand(store.alamat)
  };
}

function cleanOrderStep(step: OrderStep) {
  return {
    ...step,
    title: displayBrand(step.title),
    description: displayBrand(step.description)
  };
}

function cleanTrustAbout(trustAbout: TrustAboutContent) {
  const hasBlockedTrust = hasBlockedPublicText([
    trustAbout.about_body,
    ...(trustAbout.trust_items || [])
  ]);

  if (hasBlockedTrust) {
    return fallbackContent.trustAbout;
  }

  return {
    ...trustAbout,
    about_body: displayBrand(trustAbout.about_body),
    trust_items: (trustAbout.trust_items || []).map(displayBrand)
  };
}

function cleanContact(contact: ContactSettings) {
  return {
    ...contact,
    copyright_text: displayBrand(contact.copyright_text)
  };
}

function cleanInstagramBanner(banner: InstagramBanner | null) {
  if (!banner) return banner;
  if (hasBlockedPublicText([banner.title])) return fallbackInstagramBanner;

  return {
    ...banner,
    title: displayBrand(banner.title)
  };
}

function publicHeroes(heroes: HeroBanner[]) {
  const filtered = heroes.filter(
    (hero) =>
      !hasBlockedPublicText([
        hero.badge,
        hero.headline,
        hero.subheadline,
        hero.title,
        hero.subtitle,
        hero.cta_primary_text,
        hero.cta_secondary_text,
        hero.cta_text
      ])
  );

  return (filtered.length ? filtered : fallbackContent.heroes).map(cleanHero);
}

function publicCategories(categories: ServiceCategory[]) {
  const filtered = categories.filter(
    (category) =>
      !hasBlockedPublicText([
        category.nama_kategori,
        category.deskripsi,
        category.link_slug
      ])
  );

  return (filtered.length ? filtered : fallbackContent.categories).map(
    cleanCategory
  );
}

function publicProducts(products: Product[]) {
  const filtered = products.filter(
    (product) =>
      !hasBlockedPublicText([
        product.nama,
        product.kategori,
        product.deskripsi,
        product.short_detail,
        product.description,
        product.badge,
        product.link_url
      ])
  );

  return (filtered.length ? filtered : fallbackContent.products).map(
    cleanProduct
  );
}

function publicOrderSteps(orderSteps: OrderStep[]) {
  const filtered = orderSteps.filter(
    (step) => !hasBlockedPublicText([step.title, step.description])
  );

  return (filtered.length ? filtered : fallbackContent.orderSteps).map(
    cleanOrderStep
  );
}

function publicPageHeroes(pageHeroes: PageHeroContent[]) {
  const safeByKey = new Map(
    pageHeroes
      .filter(
        (hero) =>
          finalPageHeroKeys.includes(hero.page_key) &&
          !hasBlockedPublicText([
            hero.page_key,
            hero.label,
            hero.title,
            hero.subtitle
          ])
      )
      .map((hero) => [hero.page_key, hero])
  );

  return fallbackContent.pageHeroes.map((fallbackHero) => {
    const hero = safeByKey.get(fallbackHero.page_key);
    const merged = hero
      ? {
          ...fallbackHero,
          ...hero,
          image_url: hero.image_url || fallbackHero.image_url,
          mobile_image_url:
            hero.mobile_image_url || fallbackHero.mobile_image_url,
          object_position:
            hero.object_position || fallbackHero.object_position,
          mobile_object_position:
            hero.mobile_object_position || fallbackHero.mobile_object_position
        }
      : fallbackHero;

    return {
      ...merged,
      label: displayBrand(merged.label),
      title: displayBrand(merged.title),
      subtitle: displayBrand(merged.subtitle)
    };
  });
}

export async function getPublicContent(): Promise<PublicContent> {
  const [
    heroes,
    about,
    instagramBanner,
    pageHeroes,
    categories,
    products,
    stores,
    orderSteps,
    trustAbout,
    testimonials,
    contact
  ] = await Promise.all([
    readActive<HeroBanner>("hero_banners", fallbackContent.heroes),
    readSingle<AboutContent>("about_content", fallbackContent.about),
    readOptionalActiveSingle<InstagramBanner>(
      "instagram_banners",
      fallbackInstagramBanner
    ),
    readActive<PageHeroContent>(
      "page_heroes",
      fallbackContent.pageHeroes,
      "page_key"
    ),
    readActive<ServiceCategory>(
      "service_categories",
      fallbackContent.categories
    ),
    readActive<Product>("products", fallbackContent.products),
    readActive<Store>("stores", fallbackContent.stores),
    readActive<OrderStep>("order_steps", fallbackContent.orderSteps),
    readSingle<TrustAboutContent>(
      "trust_about_content",
      fallbackContent.trustAbout
    ),
    readActive<Testimonial>("testimonials", fallbackContent.testimonials),
    readSingle<ContactSettings>(
      "contact_settings",
      fallbackContent.contact,
      true
    )
  ]);

  const cleanHeroes = publicHeroes(heroes);

  return {
    hero: cleanHeroes[0] || fallbackContent.hero,
    heroes: cleanHeroes,
    about: fallbackContent.about,
    instagramBanner: cleanInstagramBanner(instagramBanner),
    pageHeroes: publicPageHeroes(pageHeroes),
    categories: publicCategories(categories),
    products: publicProducts(products),
    stores: stores.map(cleanStore),
    orderSteps: publicOrderSteps(orderSteps),
    trustAbout: cleanTrustAbout(trustAbout),
    testimonials,
    contact: cleanContact({
      ...fallbackContent.contact,
      ...contact
    })
  };
}
