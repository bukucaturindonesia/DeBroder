create extension if not exists "pgcrypto";

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  role text not null default 'viewer' check (role in ('viewer', 'superadmin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.is_superadmin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'superadmin'
  );
$$;

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  nama text not null,
  kategori text not null,
  deskripsi text not null,
  short_detail text,
  badge text not null default '',
  gambar_url text not null default '/images/debroder-hero.png',
  image_url text,
  whatsapp_link text not null default '',
  link_url text,
  price numeric,
  harga numeric,
  base_price numeric,
  price_label text,
  urutan integer not null default 0,
  status_aktif boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.service_categories (
  id uuid primary key default gen_random_uuid(),
  nama_kategori text not null,
  deskripsi text not null,
  gambar_url text not null default '/images/debroder-hero.png',
  link_slug text not null default 'koleksi',
  urutan integer not null default 0,
  status_aktif boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.stores (
  id uuid primary key default gen_random_uuid(),
  nama_store text not null,
  layanan_utama text not null,
  alamat text not null,
  whatsapp text not null,
  whatsapp_link text not null,
  maps_link text not null,
  image_url text,
  urutan integer not null default 0,
  status_aktif boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.hero_banners (
  id uuid primary key default gen_random_uuid(),
  badge text not null default 'KAOS POLOS IMPORT & SABLON',
  headline text not null,
  subheadline text not null,
  cta_primary_text text not null,
  cta_primary_link text not null,
  cta_secondary_text text not null,
  cta_secondary_link text not null,
  image_url text not null default '/images/debroder-hero.png',
  hero_video_url text,
  video_url text,
  object_position text not null default 'center center',
  urutan integer not null default 0,
  status_aktif boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.about_content (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  title text not null,
  body text not null,
  highlights text[] not null default '{}',
  status_aktif boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  nama text not null,
  sumber text not null,
  isi_testimoni text not null,
  urutan integer not null default 0,
  status_aktif boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.contact_settings (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  whatsapp_utama text not null,
  whatsapp_link text not null default 'https://wa.me/6285355333364',
  whatsapp_apparel text not null,
  whatsapp_express text not null,
  facebook text not null default 'https://www.facebook.com/debroderapparel/',
  instagram text not null,
  copyright_text text not null default '© 2026 DEBRODER. All rights reserved.',
  status_aktif boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.instagram_banners (
  id uuid primary key default gen_random_uuid(),
  title text not null default 'Instagram DEBRODER',
  image_url text not null default '/images/debroder/banners/instagram-banner.jpg',
  link_url text not null default 'https://instagram.com/de_broder',
  status_aktif boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.page_heroes (
  id uuid primary key default gen_random_uuid(),
  page_key text not null unique,
  label text not null,
  title text not null,
  subtitle text not null,
  image_url text not null default '/images/debroder/hero/page-hero.jpg',
  mobile_image_url text,
  object_position text not null default 'center center',
  mobile_object_position text not null default 'center center',
  status_aktif boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.order_steps (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  urutan integer not null default 0,
  status_aktif boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.trust_about_content (
  id uuid primary key default gen_random_uuid(),
  trust_items text[] not null default '{}',
  about_body text not null default '',
  status_aktif boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table if exists public.hero_banners
  add column if not exists badge text not null default 'KAOS POLOS IMPORT & SABLON',
  add column if not exists title text,
  add column if not exists subtitle text,
  add column if not exists cta_text text,
  add column if not exists cta_link text,
  add column if not exists hero_video_url text,
  add column if not exists video_url text,
  add column if not exists object_position text not null default 'center center',
  add column if not exists urutan integer not null default 0;

alter table if exists public.products
  add column if not exists short_detail text,
  add column if not exists image_url text,
  add column if not exists link_url text,
  add column if not exists price numeric,
  add column if not exists harga numeric,
  add column if not exists base_price numeric,
  add column if not exists price_label text;

alter table if exists public.stores
  add column if not exists image_url text;

alter table if exists public.page_heroes
  add column if not exists mobile_image_url text,
  add column if not exists mobile_object_position text not null default 'center center';

alter table if exists public.contact_settings
  add column if not exists whatsapp_link text not null default 'https://wa.me/6285355333364',
  add column if not exists facebook text not null default 'https://www.facebook.com/debroderapparel/',
  add column if not exists copyright_text text not null default '© 2026 DEBRODER. All rights reserved.';

alter table if exists public.testimonials
  add column if not exists urutan integer not null default 0;

alter table if exists public.products alter column urutan set default 0;
alter table if exists public.service_categories alter column urutan set default 0;
alter table if exists public.stores alter column urutan set default 0;
alter table if exists public.hero_banners alter column urutan set default 0;
alter table if exists public.testimonials alter column urutan set default 0;

drop trigger if exists set_products_updated_at on public.products;
create trigger set_products_updated_at
before update on public.products
for each row execute function public.set_updated_at();

drop trigger if exists set_service_categories_updated_at on public.service_categories;
create trigger set_service_categories_updated_at
before update on public.service_categories
for each row execute function public.set_updated_at();

drop trigger if exists set_stores_updated_at on public.stores;
create trigger set_stores_updated_at
before update on public.stores
for each row execute function public.set_updated_at();

drop trigger if exists set_hero_banners_updated_at on public.hero_banners;
create trigger set_hero_banners_updated_at
before update on public.hero_banners
for each row execute function public.set_updated_at();

drop trigger if exists set_about_content_updated_at on public.about_content;
create trigger set_about_content_updated_at
before update on public.about_content
for each row execute function public.set_updated_at();

drop trigger if exists set_testimonials_updated_at on public.testimonials;
create trigger set_testimonials_updated_at
before update on public.testimonials
for each row execute function public.set_updated_at();

drop trigger if exists set_contact_settings_updated_at on public.contact_settings;
create trigger set_contact_settings_updated_at
before update on public.contact_settings
for each row execute function public.set_updated_at();

drop trigger if exists set_instagram_banners_updated_at on public.instagram_banners;
create trigger set_instagram_banners_updated_at
before update on public.instagram_banners
for each row execute function public.set_updated_at();

drop trigger if exists set_page_heroes_updated_at on public.page_heroes;
create trigger set_page_heroes_updated_at
before update on public.page_heroes
for each row execute function public.set_updated_at();

drop trigger if exists set_order_steps_updated_at on public.order_steps;
create trigger set_order_steps_updated_at
before update on public.order_steps
for each row execute function public.set_updated_at();

drop trigger if exists set_trust_about_content_updated_at on public.trust_about_content;
create trigger set_trust_about_content_updated_at
before update on public.trust_about_content
for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.service_categories enable row level security;
alter table public.stores enable row level security;
alter table public.hero_banners enable row level security;
alter table public.about_content enable row level security;
alter table public.testimonials enable row level security;
alter table public.contact_settings enable row level security;
alter table public.instagram_banners enable row level security;
alter table public.page_heroes enable row level security;
alter table public.order_steps enable row level security;
alter table public.trust_about_content enable row level security;

drop policy if exists "Users can read own profile" on public.profiles;
create policy "Users can read own profile"
on public.profiles for select
using (id = auth.uid() or public.is_superadmin());

drop policy if exists "Superadmin can manage profiles" on public.profiles;
create policy "Superadmin can manage profiles"
on public.profiles for all
using (public.is_superadmin())
with check (public.is_superadmin());

drop policy if exists "Public can read active products" on public.products;
create policy "Public can read active products"
on public.products for select
using (status_aktif = true);

drop policy if exists "Superadmin can manage products" on public.products;
create policy "Superadmin can manage products"
on public.products for all
using (public.is_superadmin())
with check (public.is_superadmin());

drop policy if exists "Public can read active service categories" on public.service_categories;
create policy "Public can read active service categories"
on public.service_categories for select
using (status_aktif = true);

drop policy if exists "Superadmin can manage service categories" on public.service_categories;
create policy "Superadmin can manage service categories"
on public.service_categories for all
using (public.is_superadmin())
with check (public.is_superadmin());

drop policy if exists "Public can read active stores" on public.stores;
create policy "Public can read active stores"
on public.stores for select
using (status_aktif = true);

drop policy if exists "Superadmin can manage stores" on public.stores;
create policy "Superadmin can manage stores"
on public.stores for all
using (public.is_superadmin())
with check (public.is_superadmin());

drop policy if exists "Public can read active hero banners" on public.hero_banners;
create policy "Public can read active hero banners"
on public.hero_banners for select
using (status_aktif = true);

drop policy if exists "Superadmin can manage hero banners" on public.hero_banners;
create policy "Superadmin can manage hero banners"
on public.hero_banners for all
using (public.is_superadmin())
with check (public.is_superadmin());

drop policy if exists "Public can read active about content" on public.about_content;
create policy "Public can read active about content"
on public.about_content for select
using (status_aktif = true);

drop policy if exists "Superadmin can manage about content" on public.about_content;
create policy "Superadmin can manage about content"
on public.about_content for all
using (public.is_superadmin())
with check (public.is_superadmin());

drop policy if exists "Public can read active testimonials" on public.testimonials;
create policy "Public can read active testimonials"
on public.testimonials for select
using (status_aktif = true);

drop policy if exists "Superadmin can manage testimonials" on public.testimonials;
create policy "Superadmin can manage testimonials"
on public.testimonials for all
using (public.is_superadmin())
with check (public.is_superadmin());

drop policy if exists "Public can read active contact settings" on public.contact_settings;
create policy "Public can read active contact settings"
on public.contact_settings for select
using (status_aktif = true);

drop policy if exists "Superadmin can manage contact settings" on public.contact_settings;
create policy "Superadmin can manage contact settings"
on public.contact_settings for all
using (public.is_superadmin())
with check (public.is_superadmin());

drop policy if exists "Public can read active instagram banners" on public.instagram_banners;
create policy "Public can read active instagram banners"
on public.instagram_banners for select
using (status_aktif = true);

drop policy if exists "Superadmin can manage instagram banners" on public.instagram_banners;
create policy "Superadmin can manage instagram banners"
on public.instagram_banners for all
using (public.is_superadmin())
with check (public.is_superadmin());

drop policy if exists "Public can read active page heroes" on public.page_heroes;
create policy "Public can read active page heroes"
on public.page_heroes for select
using (status_aktif = true);

drop policy if exists "Superadmin can manage page heroes" on public.page_heroes;
create policy "Superadmin can manage page heroes"
on public.page_heroes for all
using (public.is_superadmin())
with check (public.is_superadmin());

drop policy if exists "Public can read active order steps" on public.order_steps;
create policy "Public can read active order steps"
on public.order_steps for select
using (status_aktif = true);

drop policy if exists "Superadmin can manage order steps" on public.order_steps;
create policy "Superadmin can manage order steps"
on public.order_steps for all
using (public.is_superadmin())
with check (public.is_superadmin());

drop policy if exists "Public can read active trust about content" on public.trust_about_content;
create policy "Public can read active trust about content"
on public.trust_about_content for select
using (status_aktif = true);

drop policy if exists "Superadmin can manage trust about content" on public.trust_about_content;
create policy "Superadmin can manage trust about content"
on public.trust_about_content for all
using (public.is_superadmin())
with check (public.is_superadmin());
