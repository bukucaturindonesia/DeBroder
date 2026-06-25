insert into public.products
  (nama, kategori, deskripsi, short_detail, badge, gambar_url, image_url, whatsapp_link, link_url, price, urutan, status_aktif)
values
  ('Kaos Polos Import', 'Kaos Polos', 'Kaos polos import untuk brand, event, dan kebutuhan harian', 'Kaos polos import untuk brand, event, dan kebutuhan harian', '', '/images/debroder/products/produk-kaos-polos.jpg', '/images/debroder/products/produk-kaos-polos.jpg', 'https://wa.me/6285355333364', '/kaos-polos', 45000, 1, true),
  ('Kaos Cotton Combed', 'Kaos Polos', 'Kaos cotton combed untuk custom dan kebutuhan brand', 'Kaos cotton combed untuk custom dan kebutuhan brand', '', '/images/debroder/products/produk-kaos-polos.jpg', '/images/debroder/products/produk-kaos-polos.jpg', 'https://wa.me/6285355333364', '/kaos-polos', 45000, 2, true),
  ('Sablon DTF Custom', 'Sablon DTF', 'Sablon DTF untuk logo, brand, dan komunitas', 'Sablon DTF untuk logo, brand, dan komunitas', '', '/images/debroder/products/produk-sablon-dtf.jpg', '/images/debroder/products/produk-sablon-dtf.jpg', 'https://wa.me/6285355333364', '/sablon-dtf', 15000, 3, true),
  ('Custom Jersey', 'Jersey', 'Jersey custom untuk tim dan komunitas', 'Jersey custom untuk tim dan komunitas', '', '/images/debroder/products/produk-jersey.jpg', '/images/debroder/products/produk-jersey.jpg', 'https://wa.me/6285355333364', '/jersey', 85000, 4, true),
  ('Maklon DTF', 'Maklon DTF', 'Produksi DTF untuk reseller dan brand apparel', 'Produksi DTF untuk reseller dan brand apparel', '', '/images/debroder/products/produk-maklon-dtf.jpg', '/images/debroder/products/produk-maklon-dtf.jpg', 'https://wa.me/6285355333364', '/maklon-dtf', 12000, 5, true),
  ('Cetak Sublim', 'Cetak Sublim', 'Cetak sublim untuk jersey dan apparel custom', 'Cetak sublim untuk jersey dan apparel custom', '', '/images/debroder/products/produk-cetak-sublim.jpg', '/images/debroder/products/produk-cetak-sublim.jpg', 'https://wa.me/6285355333364', '/cetak-sublim', 35000, 6, true),
  ('Distributor Kaos NSA', 'Kaos Polos', 'Pilihan kaos NSA untuk kebutuhan store dan produksi', 'Pilihan kaos NSA untuk kebutuhan store dan produksi', '', '/images/debroder/products/produk-kaos-polos.jpg', '/images/debroder/products/produk-kaos-polos.jpg', 'https://wa.me/6285355333364', '/kaos-polos', null, 7, true)
on conflict do nothing;

insert into public.service_categories
  (nama_kategori, deskripsi, gambar_url, link_slug, urutan, status_aktif)
values
  ('Kaos Polos', 'Kaos polos import dan cotton combed', '/images/debroder/products/produk-kaos-polos.jpg', 'kaos-polos', 1, true),
  ('Sablon DTF', 'Sablon kaos, logo, komunitas, dan brand', '/images/debroder/products/produk-sablon-dtf.jpg', 'sablon-dtf', 2, true),
  ('Custom Jersey', 'Jersey tim, komunitas, sekolah, dan instansi', '/images/debroder/products/produk-jersey.jpg', 'jersey', 3, true),
  ('Maklon DTF', 'Layanan produksi DTF untuk kebutuhan bisnis', '/images/debroder/products/produk-maklon-dtf.jpg', 'maklon-dtf', 4, true),
  ('Cetak Sublim', 'Cetak sublim untuk apparel dan jersey', '/images/debroder/products/produk-cetak-sublim.jpg', 'cetak-sublim', 5, true),
  ('Distributor Kaos NSA', 'Pilihan kaos NSA untuk kebutuhan store dan produksi', '/images/debroder/products/produk-kaos-polos.jpg', 'kaos-polos', 6, true),
  ('Kaos Cotton Combed', 'Kaos cotton combed untuk custom dan kebutuhan brand', '/images/debroder/products/produk-kaos-polos.jpg', 'kaos-polos', 7, true)
on conflict do nothing;

insert into public.stores
  (nama_store, layanan_utama, alamat, whatsapp, whatsapp_link, maps_link, image_url, urutan, status_aktif)
values
  ('STORE PETTARANI', 'Sablon Kaos dan Jersey', 'Jl. AP Pettarani, Ruko New Zamrud Blok G No.7', '0853-5533-3364', 'https://wa.me/6285355333364', 'https://www.google.com/maps/search/?api=1&query=Jl.%20AP%20Pettarani%2C%20Ruko%20New%20Zamrud%20Blok%20G%20No.7%20Makassar', '/images/debroder/stores/store-pettarani.jpg', 1, true),
  ('STORE TELLO', 'Cetak DTF dan Sablon Kaos', 'Jl. Urip Sumoharjo, Depan PLTU', '0812-4400-3505', 'https://wa.me/6281244003505', 'https://www.google.com/maps/search/?api=1&query=Jl.%20Urip%20Sumoharjo%20Depan%20PLTU%20Makassar', '/images/debroder/stores/store-tello.jpg', 2, true),
  ('STORE LANDAK', 'Cetak DTF dan Jersey', 'Jl. Andy Djemma LR 8B No.108', '0811-4470-1984', 'https://wa.me/6281144701984', 'https://www.google.com/maps/search/?api=1&query=Jl.%20Andy%20Djemma%20LR%208B%20No.108%20Makassar', '/images/debroder/stores/store-landak.jpg', 3, true),
  ('STORE PAREPARE', 'Cetak DTF, Sablon, dan Kaos Polos', 'Jl. Lorong 3 No.10, Sumpang Minangae, belakang Warkop Chilos, Parepare', '0821-5658-8066', 'https://wa.me/6282156588066', 'https://www.google.com/maps/search/?api=1&query=Jl.%20Lorong%203%20No.10%20Sumpang%20Minangae%20Belakang%20Warkop%20Chilos%20Parepare', '/images/debroder/stores/store-parepare.jpg', 4, true)
on conflict do nothing;

insert into public.hero_banners
  (badge, headline, subheadline, title, subtitle, cta_primary_text, cta_primary_link, cta_secondary_text, cta_secondary_link, cta_text, cta_link, image_url, object_position, urutan, status_aktif)
values
  ('KAOS POLOS IMPORT', 'KAOS POLOS IMPORT', 'Sablon DTF, Jersey, dan Custom Apparel', 'KAOS POLOS IMPORT', 'Sablon DTF, Jersey, dan Custom Apparel', 'Beli Sekarang', '/koleksi', '', '', 'Beli Sekarang', '/koleksi', '/images/debroder/hero/hero-1.jpg', 'center center', 1, true),
  ('SABLON DTF', 'SABLON DTF', 'Custom Jersey, Maklon DTF, dan Cetak Sublim', 'SABLON DTF', 'Custom Jersey, Maklon DTF, dan Cetak Sublim', 'Konsultasi', '/sablon-dtf', '', '', 'Konsultasi', '/sablon-dtf', '/images/debroder/hero/hero-2.jpg', 'center center', 2, true)
on conflict do nothing;

insert into public.instagram_banners
  (title, image_url, link_url, status_aktif)
values
  ('Instagram DE BRODER', '/images/debroder/banners/banner-instagram.jpg', 'https://instagram.com/de_broder', true)
on conflict do nothing;

insert into public.page_heroes
  (page_key, label, title, subtitle, image_url, mobile_image_url, object_position, mobile_object_position, status_aktif)
values
  ('koleksi', 'KOLEKSI', 'Layanan & Produk DE BRODER', 'Temukan kebutuhan apparel, sablon, jersey, dan layanan custom dalam satu tempat.', '/images/debroder/page-heroes/hero-koleksi.jpg', null, 'center center', 'center center', true),
  ('kaos-polos', 'KAOS POLOS', 'Kaos Polos Import & Cotton Combed', 'Pilihan kaos polos untuk brand, komunitas, event, dan kebutuhan harian.', '/images/debroder/page-heroes/hero-kaos-polos.jpg', null, 'center center', 'center center', true),
  ('sablon-dtf', 'SABLON DTF', 'Sablon DTF untuk Apparel Custom', 'Hasil sablon rapi untuk logo, desain brand, komunitas, dan produksi apparel.', '/images/debroder/page-heroes/hero-sablon-dtf.jpg', null, 'center center', 'center center', true),
  ('jersey', 'CUSTOM JERSEY', 'Jersey Custom untuk Tim dan Komunitas', 'Produksi jersey untuk tim olahraga, sekolah, instansi, dan event.', '/images/debroder/page-heroes/hero-jersey.jpg', null, 'center center', 'center center', true),
  ('store', 'STORE', 'Temukan Store DE BRODER Terdekat', 'Pettarani, Tello, Landak, dan Parepare.', '/images/debroder/page-heroes/hero-store.jpg', null, 'center center', 'center center', true),
  ('cara-order', 'CARA ORDER', 'Cara Order di DE BRODER', 'Alur singkat untuk konsultasi dan memesan kebutuhan apparel.', '/images/debroder/page-heroes/hero-cara-order.jpg', null, 'center center', 'center center', true)
on conflict (page_key) do nothing;

insert into public.order_steps
  (title, description, urutan, status_aktif)
values
  ('Pilih layanan', 'Tentukan kebutuhan apparel, sablon, jersey, atau custom.', 1, true),
  ('Konsultasi kebutuhan', 'Diskusikan bahan, desain, jumlah, ukuran, dan estimasi.', 2, true),
  ('Kirim desain/detail', 'Kirim file, logo, referensi, atau detail pesanan.', 3, true),
  ('Proses produksi', 'Pesanan diproses sesuai detail yang disepakati.', 4, true),
  ('Ambil di store', 'Ambil pesanan di store DE BRODER pilihan Anda.', 5, true)
on conflict do nothing;

insert into public.trust_about_content
  (trust_items, about_body, status_aktif)
values
  (array['Berdiri sejak 2016', 'Store Makassar & Parepare', 'Sablon DTF', 'Custom Jersey', 'Maklon DTF'], 'De Broder adalah perusahaan percetakan yang berdiri sejak tahun 2016. Kami fokus mengerjakan:

Sablon Kaos
Custom Jersey
Maklon DTF
Cetak Sublim
Distributor Kaos NSA
Kaos Cotton Combed

Kami telah dipercaya oleh berbagai perusahaan, instansi, dan event besar di Indonesia Timur, khususnya di kota Makassar.', true)
on conflict do nothing;

insert into public.contact_settings
  (email, whatsapp_utama, whatsapp_link, whatsapp_apparel, whatsapp_express, facebook, instagram, copyright_text, status_aktif)
values
  ('debroderapparel@gmail.com', '0853-5533-3364', 'https://wa.me/6285355333364', '0853-5533-3364', '0853-5533-3364', 'https://www.facebook.com/debroderapparel/', 'https://instagram.com/de_broder', '© 2026 DE BRODER. All rights reserved.', true)
on conflict do nothing;
