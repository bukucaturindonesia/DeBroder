"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";
import { createSupabaseClient, isSupabaseConfigured } from "@/lib/supabase";
import { formatRupiah } from "@/lib/url";

type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "boolean"
  | "list"
  | "select"
  | "image"
  | "video";
type FieldConfig = {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  nullable?: boolean;
  options?: string[];
  helper?: string;
};
type TableConfig = {
  key: string;
  label: string;
  navLabel: string;
  href: string;
  table: string;
  description: string;
  orderField?: string;
  fields: FieldConfig[];
};
type AdminValue = string | number | boolean | string[] | null | undefined;
type AdminRow = Record<string, AdminValue> & { id?: string };
type OverviewStats = {
  products: number;
  stores: number;
  heroes: number;
  banners: number;
  pageHeroes: number;
};

const objectPositionOptions = [
  "center center",
  "center top",
  "center bottom",
  "left center",
  "right center"
];

const tableConfigs: TableConfig[] = [
  {
    key: "overview",
    label: "Dashboard",
    navLabel: "Dashboard",
    href: "/admin/dashboard",
    table: "",
    description: "Ringkasan konten toko online DE BRODER.",
    fields: []
  },
  {
    key: "hero",
    label: "Hero Homepage",
    navLabel: "Hero Homepage",
    href: "/admin/hero",
    table: "hero_banners",
    description: "Atur banner utama, gambar, video, CTA, dan urutan slide.",
    orderField: "urutan",
    fields: [
      {
        name: "headline",
        label: "Judul highlight baris 1",
        type: "text",
        placeholder: "KAOS POLOS IMPORT",
        required: true
      },
      {
        name: "subheadline",
        label: "Subteks highlight baris 2",
        type: "textarea",
        placeholder: "Sablon DTF, Jersey, dan Custom Apparel",
        required: true
      },
      {
        name: "cta_primary_text",
        label: "Teks tombol CTA",
        type: "text",
        placeholder: "Beli Sekarang"
      },
      {
        name: "cta_primary_link",
        label: "Link CTA",
        type: "text",
        placeholder: "/koleksi"
      },
      {
        name: "image_url",
        label: "Gambar hero",
        type: "image",
        placeholder: "/images/debroder/hero/hero-home.jpg",
        helper: "Rekomendasi 1920x900 atau 16:7."
      },
      {
        name: "hero_video_url",
        label: "Video hero opsional",
        type: "video",
        placeholder: "https://..."
      },
      {
        name: "object_position",
        label: "Posisi gambar",
        type: "select",
        options: objectPositionOptions
      },
      { name: "urutan", label: "Urutan slide", type: "number" },
      { name: "status_aktif", label: "Aktif", type: "boolean" }
    ]
  },
  {
    key: "products",
    label: "Produk & Layanan",
    navLabel: "Produk & Layanan",
    href: "/admin/products",
    table: "products",
    description: "Kelola katalog produk, detail singkat, harga, dan gambar.",
    orderField: "urutan",
    fields: [
      {
        name: "nama",
        label: "Nama produk",
        type: "text",
        placeholder: "Kaos Polos Cotton Combed",
        required: true
      },
      {
        name: "short_detail",
        label: "Detail singkat",
        type: "textarea",
        placeholder: "Kaos polos import dan cotton combed"
      },
      {
        name: "deskripsi",
        label: "Deskripsi lengkap",
        type: "textarea",
        placeholder: "Detail produk atau layanan"
      },
      {
        name: "price",
        label: "Harga (angka)",
        type: "number",
        placeholder: "45000",
        nullable: true
      },
      {
        name: "kategori",
        label: "Kategori",
        type: "text",
        placeholder: "Kaos Polos"
      },
      {
        name: "image_url",
        label: "Gambar produk",
        type: "image",
        placeholder: "/images/debroder/products/kaos-polos.jpg",
        helper: "Rekomendasi 1200x1200 atau 4:5."
      },
      {
        name: "link_url",
        label: "Link tujuan",
        type: "text",
        placeholder: "/kaos-polos"
      },
      {
        name: "whatsapp_link",
        label: "Link WhatsApp",
        type: "text",
        placeholder: "https://wa.me/6285355333364"
      },
      { name: "urutan", label: "Urutan tampil", type: "number" },
      { name: "status_aktif", label: "Aktif", type: "boolean" }
    ]
  },
  {
    key: "categories",
    label: "Kategori Produk",
    navLabel: "Kategori Produk",
    href: "/admin/categories",
    table: "service_categories",
    description: "Atur kategori layanan dan halaman tujuannya.",
    orderField: "urutan",
    fields: [
      {
        name: "nama_kategori",
        label: "Nama kategori",
        type: "text",
        placeholder: "Kaos Polos",
        required: true
      },
      {
        name: "deskripsi",
        label: "Detail singkat",
        type: "textarea",
        placeholder: "Kaos polos import dan cotton combed"
      },
      {
        name: "gambar_url",
        label: "Gambar kategori",
        type: "image",
        placeholder: "/images/debroder/products/kaos-polos.jpg"
      },
      {
        name: "link_slug",
        label: "Link halaman",
        type: "text",
        placeholder: "kaos-polos"
      },
      { name: "urutan", label: "Urutan tampil", type: "number" },
      { name: "status_aktif", label: "Aktif", type: "boolean" }
    ]
  },
  {
    key: "banner",
    label: "Banner Instagram",
    navLabel: "Banner Instagram",
    href: "/admin/banner",
    table: "instagram_banners",
    description: "Atur banner besar yang mengarah ke Instagram.",
    fields: [
      {
        name: "title",
        label: "Judul internal",
        type: "text",
        placeholder: "Instagram DE BRODER",
        required: true
      },
      {
        name: "image_url",
        label: "Gambar banner",
        type: "image",
        placeholder: "/images/debroder/banners/instagram-banner.jpg",
        helper: "Rekomendasi 1920x900."
      },
      {
        name: "link_url",
        label: "Link Instagram",
        type: "text",
        placeholder: "https://instagram.com/de_broder"
      },
      { name: "status_aktif", label: "Aktif", type: "boolean" }
    ]
  },
  {
    key: "page-hero",
    label: "Page Hero",
    navLabel: "Page Hero",
    href: "/admin/page-hero",
    table: "page_heroes",
    description: "Hero pendek untuk halaman Koleksi, Kaos Polos, Sablon DTF, Jersey, Store, dan Cara Order.",
    orderField: "page_key",
    fields: [
      {
        name: "page_key",
        label: "Halaman",
        type: "select",
        options: [
          "koleksi",
          "kaos-polos",
          "sablon-dtf",
          "jersey",
          "store",
          "cara-order"
        ],
        required: true
      },
      {
        name: "label",
        label: "Label",
        type: "text",
        placeholder: "KOLEKSI",
        required: true
      },
      {
        name: "title",
        label: "Judul",
        type: "text",
        placeholder: "Layanan & Produk DE BRODER",
        required: true
      },
      {
        name: "subtitle",
        label: "Subtitle",
        type: "textarea",
        placeholder: "Temukan kebutuhan apparel dalam satu tempat."
      },
      {
        name: "image_url",
        label: "Gambar page hero",
        type: "image",
        placeholder: "/images/debroder/page-heroes/hero-koleksi.jpg",
        helper: "Rekomendasi 1600x500."
      },
      {
        name: "mobile_image_url",
        label: "Gambar mobile opsional",
        type: "image",
        placeholder: "/images/debroder/page-heroes/hero-koleksi.jpg",
        helper: "Kosongkan jika ingin memakai gambar desktop."
      },
      {
        name: "object_position",
        label: "Posisi gambar",
        type: "select",
        options: objectPositionOptions
      },
      {
        name: "mobile_object_position",
        label: "Posisi gambar mobile",
        type: "select",
        options: objectPositionOptions
      },
      { name: "status_aktif", label: "Aktif", type: "boolean" }
    ]
  },
  {
    key: "store",
    label: "Store / Cabang",
    navLabel: "Store / Cabang",
    href: "/admin/store",
    table: "stores",
    description: "Kelola store, alamat, WhatsApp, Maps, dan foto store.",
    orderField: "urutan",
    fields: [
      {
        name: "nama_store",
        label: "Nama store",
        type: "text",
        placeholder: "STORE PETTARANI",
        required: true
      },
      {
        name: "layanan_utama",
        label: "Layanan",
        type: "text",
        placeholder: "Sablon Kaos dan Jersey"
      },
      {
        name: "alamat",
        label: "Alamat",
        type: "textarea",
        placeholder: "Jl. AP Pettarani, Ruko New Zamrud Blok G No.7"
      },
      {
        name: "whatsapp",
        label: "Nomor WhatsApp",
        type: "text",
        placeholder: "0853-5533-3364"
      },
      {
        name: "whatsapp_link",
        label: "Link WhatsApp",
        type: "text",
        placeholder: "https://wa.me/6285355333364"
      },
      {
        name: "maps_link",
        label: "Link Google Maps",
        type: "text",
        placeholder: "https://www.google.com/maps/search/?api=1&query=..."
      },
      {
        name: "image_url",
        label: "Foto store",
        type: "image",
        placeholder: "/images/debroder/stores/store-pettarani.jpg",
        helper: "Rekomendasi 1200x800 atau 16:9."
      },
      { name: "urutan", label: "Urutan tampil", type: "number" },
      { name: "status_aktif", label: "Aktif", type: "boolean" }
    ]
  },
  {
    key: "order",
    label: "Cara Order",
    navLabel: "Cara Order",
    href: "/admin/order",
    table: "order_steps",
    description: "Atur langkah singkat cara order.",
    orderField: "urutan",
    fields: [
      {
        name: "title",
        label: "Judul langkah",
        type: "text",
        placeholder: "Pilih layanan",
        required: true
      },
      {
        name: "description",
        label: "Detail singkat",
        type: "textarea",
        placeholder: "Tentukan kebutuhan apparel, sablon, jersey, atau custom."
      },
      { name: "urutan", label: "Urutan tampil", type: "number" },
      { name: "status_aktif", label: "Aktif", type: "boolean" }
    ]
  },
  {
    key: "trust-about",
    label: "Trust & Tentang",
    navLabel: "Trust & Tentang",
    href: "/admin/trust-about",
    table: "trust_about_content",
    description: "Atur trust item dan paragraf Tentang Kami.",
    fields: [
      {
        name: "trust_items",
        label: "Trust item",
        type: "list",
        placeholder: "4 Store Aktif\nApparel & Custom\nSablon DTF",
        helper: "Gunakan teks singkat agar landing page tetap ringan."
      },
      {
        name: "about_body",
        label: "Paragraf Tentang Kami",
        type: "textarea",
        placeholder: "De Broder adalah perusahaan percetakan...",
        helper: "Gunakan teks singkat agar landing page tetap ringan."
      },
      { name: "status_aktif", label: "Aktif", type: "boolean" }
    ]
  },
  {
    key: "contact-footer",
    label: "Kontak & Footer",
    navLabel: "Kontak & Footer",
    href: "/admin/contact-footer",
    table: "contact_settings",
    description: "Atur kontak resmi dan teks footer.",
    fields: [
      {
        name: "email",
        label: "Email",
        type: "text",
        placeholder: "debroderapparel@gmail.com",
        required: true
      },
      {
        name: "whatsapp_utama",
        label: "WhatsApp utama",
        type: "text",
        placeholder: "0853-5533-3364"
      },
      {
        name: "whatsapp_link",
        label: "Link WhatsApp utama",
        type: "text",
        placeholder: "https://wa.me/6285355333364"
      },
      {
        name: "whatsapp_apparel",
        label: "WhatsApp Apparel",
        type: "text",
        placeholder: "0853-5533-3364"
      },
      {
        name: "whatsapp_express",
        label: "WhatsApp cadangan",
        type: "text",
        placeholder: "0853-5533-3364"
      },
      {
        name: "facebook",
        label: "Facebook",
        type: "text",
        placeholder: "https://www.facebook.com/debroderapparel/"
      },
      {
        name: "instagram",
        label: "Instagram",
        type: "text",
        placeholder: "https://instagram.com/de_broder"
      },
      {
        name: "copyright_text",
        label: "Copyright",
        type: "text",
        placeholder: "© 2026 DE BRODER. All rights reserved."
      },
      { name: "status_aktif", label: "Aktif", type: "boolean" }
    ]
  }
];

const routeToKey = tableConfigs.reduce<Record<string, string>>((acc, config) => {
  acc[config.href] = config.key;
  return acc;
}, {});

function emptyForm(fields: FieldConfig[]) {
  return fields.reduce<AdminRow>((acc, field) => {
    if (field.type === "boolean") acc[field.name] = true;
    else if (field.type === "number") acc[field.name] = field.nullable ? null : 0;
    else if (field.type === "list") acc[field.name] = [];
    else if (field.type === "select") acc[field.name] = field.options?.[0] || "";
    else acc[field.name] = "";
    return acc;
  }, {});
}

function valueToText(value: AdminValue) {
  if (Array.isArray(value)) return value.join("\n");
  if (typeof value === "boolean") return value ? "Aktif" : "Nonaktif";
  return value?.toString() || "";
}

function fieldValue(value: AdminValue) {
  if (Array.isArray(value)) return value.join("\n");
  if (typeof value === "boolean") return value;
  return value?.toString() || "";
}

function friendlyError(message?: string) {
  if (!message) return "Aksi belum berhasil. Coba lagi sebentar.";
  if (message.toLowerCase().includes("storage")) {
    return "Upload belum berhasil. Anda tetap bisa memakai input URL manual.";
  }
  if (message.toLowerCase().includes("does not exist")) {
    return "Tabel belum tersedia. Jalankan schema Supabase terbaru terlebih dahulu.";
  }
  return "Aksi belum berhasil. Periksa data lalu coba lagi.";
}

function looksLikeUrlOrPath(value: string) {
  return (
    !value ||
    value.startsWith("/") ||
    value.startsWith("http://") ||
    value.startsWith("https://")
  );
}

function previewUrl(row: AdminRow) {
  return (
    valueToText(row.image_url) ||
    valueToText(row.gambar_url) ||
    valueToText(row.hero_video_url)
  );
}

export function AdminDashboard() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeKey, setActiveKey] = useState(
    routeToKey[pathname] || "overview"
  );
  const [rows, setRows] = useState<AdminRow[]>([]);
  const [form, setForm] = useState<AdminRow>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [status, setStatus] = useState("Memeriksa akses...");
  const [isAllowed, setIsAllowed] = useState(false);
  const [isDenied, setIsDenied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const [stats, setStats] = useState<OverviewStats>({
    products: 0,
    stores: 0,
    heroes: 0,
    banners: 0,
    pageHeroes: 0
  });
  const [storageReady, setStorageReady] = useState(false);
  const configured = isSupabaseConfigured();

  const activeConfig = useMemo(
    () =>
      tableConfigs.find((config) => config.key === activeKey) ||
      tableConfigs[0],
    [activeKey]
  );

  useEffect(() => {
    const key = routeToKey[pathname] || "overview";
    setActiveKey(key);
  }, [pathname]);

  useEffect(() => {
    async function checkAccess() {
      if (!configured) {
        setStatus("Supabase belum dikonfigurasi.");
        setIsDenied(true);
        return;
      }

      const supabase = createSupabaseClient();
      if (!supabase) return;

      const { data } = await supabase.auth.getSession();
      if (!data.session?.user) {
        router.replace("/admin/login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.session.user.id)
        .maybeSingle();

      if (profile?.role !== "superadmin") {
        setStatus("Akses ditolak. Akun ini bukan superadmin.");
        setIsDenied(true);
        return;
      }

      setIsAllowed(true);
      setStatus("");
    }

    checkAccess();
  }, [configured, router]);

  async function countActive(table: string) {
    const supabase = createSupabaseClient();
    if (!supabase) return 0;

    const { count, error } = await supabase
      .from(table)
      .select("id", { count: "exact", head: true })
      .eq("status_aktif", true);

    if (error) return 0;
    return count || 0;
  }

  async function checkStorageReady() {
    const supabase = createSupabaseClient();
    if (!supabase) return false;

    const { error } = await supabase.storage
      .from("public-assets")
      .list("", { limit: 1 });

    return !error;
  }

  async function loadOverview() {
    const [products, stores, heroes, banners, pageHeroes, uploadReady] =
      await Promise.all([
        countActive("products"),
        countActive("stores"),
        countActive("hero_banners"),
        countActive("instagram_banners"),
        countActive("page_heroes"),
        checkStorageReady()
      ]);

    setStats({ products, stores, heroes, banners, pageHeroes });
    setStorageReady(uploadReady);
  }

  async function loadRows(config = activeConfig) {
    const supabase = createSupabaseClient();
    if (!supabase || !config.table) return;

    setIsLoading(true);
    let query = supabase.from(config.table).select("*");
    if (config.orderField) {
      query = query.order(config.orderField, { ascending: true });
    }
    const { data, error } = await query;
    setIsLoading(false);

    if (error) {
      setStatus(friendlyError(error.message));
      return;
    }

    setRows((data || []) as AdminRow[]);
  }

  useEffect(() => {
    setRows([]);
    setEditingId(null);
    setForm(emptyForm(activeConfig.fields));
    setStatus("");
    if (isAllowed && activeConfig.table) {
      loadRows(activeConfig);
    }
    if (isAllowed && activeKey === "overview") {
      loadOverview();
    }
    // loadRows and loadOverview intentionally use local state setters.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeConfig, activeKey, isAllowed]);

  function navigateTo(config: TableConfig) {
    setActiveKey(config.key);
    router.push(config.href);
  }

  function updateField(field: FieldConfig, value: string | boolean) {
    setForm((current) => {
      if (field.type === "boolean") {
        return { ...current, [field.name]: Boolean(value) };
      }
      if (field.type === "number") {
        if (typeof value !== "string" || value.trim() === "") {
          return { ...current, [field.name]: field.nullable ? null : 0 };
        }
        return { ...current, [field.name]: value };
      }
      if (field.type === "list" && typeof value === "string") {
        return {
          ...current,
          [field.name]: value
            .split("\n")
            .map((item) => item.trim())
            .filter(Boolean)
        };
      }
      return { ...current, [field.name]: value };
    });
  }

  function validatePayload(payload: AdminRow) {
    for (const field of activeConfig.fields) {
      const rawValue = payload[field.name];
      const textValue = valueToText(rawValue).trim();

      if (field.required && !textValue) {
        return `${field.label} wajib diisi.`;
      }

      if (field.type === "number") {
        if (!textValue && field.nullable) {
          payload[field.name] = null;
          continue;
        }

        const numberValue =
          typeof rawValue === "number" ? rawValue : Number(textValue);

        if (Number.isNaN(numberValue)) {
          return `${field.label} wajib berupa angka.`;
        }

        if (numberValue < 0) {
          return `${field.label} minimal 0.`;
        }

        payload[field.name] = numberValue;
      }

      if (
        ["image_url", "gambar_url", "hero_video_url", "video_url", "link_url", "maps_link"].includes(
          field.name
        ) &&
        textValue &&
        !looksLikeUrlOrPath(textValue)
      ) {
        return `${field.label} harus berupa link lengkap atau path lokal.`;
      }

      if (
        ["instagram", "facebook"].includes(field.name) &&
        textValue &&
        !textValue.startsWith("http")
      ) {
        return `${field.label} harus diawali http atau https.`;
      }
    }

    return null;
  }

  function preparePayload() {
    const payload: AdminRow = { ...form };
    const error = validatePayload(payload);

    if (error) {
      return { error, payload: null };
    }

    if (activeKey === "products") {
      payload.deskripsi =
        valueToText(payload.deskripsi) || valueToText(payload.short_detail);
      payload.gambar_url =
        valueToText(payload.image_url) ||
        valueToText(payload.gambar_url) ||
        "/images/debroder/fallback/fallback-product.jpg";
      payload.whatsapp_link =
        valueToText(payload.whatsapp_link) || "https://wa.me/6285355333364";
      payload.kategori = valueToText(payload.kategori) || "Produk";
    }

    if (activeKey === "hero") {
      payload.title = valueToText(payload.headline);
      payload.subtitle = valueToText(payload.subheadline);
      payload.cta_text = valueToText(payload.cta_primary_text);
      payload.cta_link = valueToText(payload.cta_primary_link);
      payload.cta_secondary_text = valueToText(payload.cta_secondary_text);
      payload.cta_secondary_link = valueToText(payload.cta_secondary_link);
    }

    if (activeKey === "store") {
      payload.whatsapp = valueToText(payload.whatsapp) || "0853-5533-3364";
      payload.whatsapp_link =
        valueToText(payload.whatsapp_link) || "https://wa.me/6285355333364";
      payload.maps_link = valueToText(payload.maps_link) || "https://www.google.com/maps";
    }

    return { error: null, payload };
  }

  function startEdit(row: AdminRow) {
    const normalized = { ...row };

    if (activeKey === "products" && !normalized.image_url) {
      normalized.image_url = normalized.gambar_url;
    }

    setEditingId(row.id || null);
    setForm(normalized);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm(activeConfig.fields));
  }

  async function uploadAsset(field: FieldConfig, file?: File) {
    if (!file) return;

    const supabase = createSupabaseClient();
    if (!supabase) {
      setStatus("Upload belum tersedia. Isi URL manual terlebih dahulu.");
      return;
    }

    setUploadingField(field.name);
    const safeName = file.name
      .toLowerCase()
      .replace(/[^a-z0-9.]+/g, "-")
      .replace(/^-|-$/g, "");
    const path = `${activeKey}/${Date.now()}-${safeName}`;
    const { error } = await supabase.storage
      .from("public-assets")
      .upload(path, file, {
        cacheControl: "3600",
        upsert: true,
        contentType: file.type
      });

    if (error) {
      setUploadingField(null);
      setStatus("Upload belum berhasil. Input URL manual tetap bisa dipakai.");
      return;
    }

    const { data } = supabase.storage.from("public-assets").getPublicUrl(path);
    updateField(field, data.publicUrl);
    setUploadingField(null);
    setStatus("Upload berhasil. Jangan lupa Simpan Perubahan.");
  }

  async function saveRow(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const supabase = createSupabaseClient();
    if (!supabase || !activeConfig.table) return;

    const prepared = preparePayload();
    if (prepared.error || !prepared.payload) {
      setStatus(prepared.error || "Data belum valid.");
      return;
    }

    setIsLoading(true);
    const payload = {
      ...prepared.payload,
      updated_at: new Date().toISOString()
    };
    const result = editingId
      ? await supabase
          .from(activeConfig.table)
          .update(payload)
          .eq("id", editingId)
      : await supabase.from(activeConfig.table).insert(payload);
    setIsLoading(false);

    if (result.error) {
      setStatus(friendlyError(result.error.message));
      return;
    }

    setStatus(editingId ? "Perubahan tersimpan." : "Data baru tersimpan.");
    resetForm();
    loadRows();
    loadOverview();
  }

  async function deleteRow(row: AdminRow) {
    if (!row.id || !activeConfig.table) return;
    if (!window.confirm("Hapus data ini?")) return;

    const supabase = createSupabaseClient();
    if (!supabase) return;

    const { error } = await supabase
      .from(activeConfig.table)
      .delete()
      .eq("id", row.id);

    if (error) {
      setStatus(friendlyError(error.message));
      return;
    }

    setStatus("Data dihapus.");
    loadRows();
    loadOverview();
  }

  async function logout() {
    const supabase = createSupabaseClient();
    await supabase?.auth.signOut();
    router.replace("/admin/login");
  }

  function renderField(field: FieldConfig) {
    const value = fieldValue(form[field.name]);
    const commonClass =
      "mt-2 w-full rounded-lg border border-brand-softGray px-4 py-3 text-sm font-medium outline-none transition focus:border-brand-charcoal";

    if (field.type === "textarea" || field.type === "list") {
      return (
        <textarea
          value={valueToText(form[field.name])}
          onChange={(event) => updateField(field, event.target.value)}
          rows={field.type === "list" ? 5 : 4}
          placeholder={field.placeholder}
          className={commonClass}
        />
      );
    }

    if (field.type === "boolean") {
      return (
        <span className="mt-2 flex items-center gap-3 rounded-lg border border-brand-softGray px-4 py-3">
          <input
            type="checkbox"
            checked={Boolean(form[field.name])}
            onChange={(event) => updateField(field, event.target.checked)}
          />
          Aktif
        </span>
      );
    }

    if (field.type === "select") {
      return (
        <select
          value={valueToText(form[field.name])}
          onChange={(event) => updateField(field, event.target.value)}
          className={commonClass}
        >
          {field.options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    }

    if (field.type === "image" || field.type === "video") {
      const url = valueToText(form[field.name]);

      return (
        <div className="mt-2 grid gap-3">
          <input
            type="text"
            value={url}
            onChange={(event) => updateField(field, event.target.value)}
            placeholder={field.placeholder}
            className={commonClass}
          />
          <div className="flex flex-wrap items-center gap-2">
            <label className="inline-flex min-h-10 cursor-pointer items-center rounded-full border border-brand-softGray px-4 text-xs font-semibold text-brand-charcoal transition hover:border-brand-charcoal">
              {uploadingField === field.name ? "Mengupload..." : "Upload"}
              <input
                type="file"
                accept={field.type === "video" ? "video/*" : "image/*"}
                className="sr-only"
                onChange={(event) => uploadAsset(field, event.target.files?.[0])}
              />
            </label>
            <button
              type="button"
              className="inline-flex min-h-10 items-center rounded-full border border-brand-softGray px-4 text-xs font-semibold text-brand-charcoal transition hover:border-brand-charcoal"
              onClick={() => updateField(field, "")}
            >
              Hapus
            </button>
          </div>
          <p className="text-xs font-medium leading-5 text-brand-charcoal/60">
            Jika upload langsung belum tersedia, masukkan gambar melalui folder
            public/images di GitHub atau gunakan URL gambar manual.
          </p>
          {url ? (
            field.type === "video" ? (
              <video
                src={url}
                className="aspect-video w-full bg-brand-offWhite object-cover"
                muted
                playsInline
                controls
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={url}
                alt={`Preview ${field.label}`}
                className="aspect-video w-full bg-brand-offWhite object-cover"
              />
            )
          ) : null}
        </div>
      );
    }

    return (
      <input
        type={field.type === "number" ? "number" : "text"}
        min={field.type === "number" ? 0 : undefined}
        step={field.type === "number" ? 1 : undefined}
        value={valueToText(form[field.name])}
        onChange={(event) => updateField(field, event.target.value)}
        placeholder={field.placeholder}
        className={commonClass}
      />
    );
  }

  if (!isAllowed) {
    return (
      <main className="min-h-screen bg-brand-offWhite p-6 text-brand-charcoal">
        <div className="mx-auto mt-20 max-w-lg rounded-xl border border-brand-softGray bg-white p-8 text-center shadow-soft">
          <h1 className="text-3xl font-semibold">
            {isDenied ? "Akses Ditolak" : "Memuat Dashboard"}
          </h1>
          <p className="mt-4 text-sm font-medium text-brand-charcoal/70">
            {status}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-brand-offWhite text-brand-charcoal">
      <div className="grid lg:grid-cols-[280px_1fr]">
        <aside className="hidden min-h-screen border-r border-brand-softGray bg-white p-5 lg:block">
          <Logo variant="symbol-black" size="md" showText />
          <nav className="mt-8 grid gap-2">
            {tableConfigs.map((config) => (
              <button
                key={config.key}
                type="button"
                onClick={() => navigateTo(config)}
                className={`rounded-lg px-4 py-3 text-left text-sm font-semibold transition ${
                  activeKey === config.key
                    ? "bg-brand-charcoal text-white"
                    : "hover:bg-brand-offWhite"
                }`}
              >
                {config.navLabel}
              </button>
            ))}
            <button
              type="button"
              onClick={logout}
              className="rounded-lg px-4 py-3 text-left text-sm font-semibold text-red-700 hover:bg-red-50"
            >
              Logout
            </button>
          </nav>
        </aside>

        <section className="p-4 sm:p-6 lg:p-8">
          <header className="border border-brand-softGray bg-white p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-charcoal/50">
                  Super Admin
                </p>
                <h1 className="mt-2 text-3xl font-semibold">
                  {activeConfig.label}
                </h1>
                <p className="mt-2 text-sm leading-6 text-brand-charcoal/70">
                  {activeConfig.description}
                </p>
              </div>
              <button
                type="button"
                onClick={logout}
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-brand-softGray px-5 py-3 text-sm font-semibold text-brand-charcoal transition hover:border-brand-charcoal"
              >
                Logout
              </button>
            </div>
            <select
              value={activeKey}
              onChange={(event) => {
                const next = tableConfigs.find(
                  (config) => config.key === event.target.value
                );
                if (next) navigateTo(next);
              }}
              className="mt-5 w-full rounded-lg border border-brand-softGray px-4 py-3 text-sm font-semibold lg:hidden"
            >
              {tableConfigs.map((config) => (
                <option key={config.key} value={config.key}>
                  {config.navLabel}
                </option>
              ))}
            </select>
          </header>

          {status ? (
            <p className="mt-5 border border-brand-softGray bg-white p-4 text-sm font-semibold text-brand-charcoal">
              {status}
            </p>
          ) : null}

          {activeKey === "overview" ? (
            <div className="mt-6 grid gap-6">
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                {[
                  [
                    "Supabase",
                    configured ? "Supabase Connected" : "Supabase Not Connected",
                    configured
                  ],
                  ["Auth", isAllowed ? "Auth Active" : "Auth Not Ready", isAllowed],
                  [
                    "Hero",
                    stats.heroes > 0 ? "Hero Data Found" : "Hero Data Empty",
                    stats.heroes > 0
                  ],
                  [
                    "Product",
                    stats.products > 0
                      ? "Product Data Found"
                      : "Product Data Empty",
                    stats.products > 0
                  ],
                  [
                    "Store",
                    stats.stores > 0 ? "Store Data Found" : "Store Data Empty",
                    stats.stores > 0
                  ],
                  [
                    "Page Hero",
                    stats.pageHeroes > 0
                      ? "Page Hero Data Found"
                      : "Page Hero Data Empty",
                    stats.pageHeroes > 0
                  ],
                  [
                    "Storage",
                    storageReady
                      ? "Storage Upload Ready"
                      : "Storage Upload Not Ready",
                    storageReady
                  ]
                ].map(([label, value, ready]) => (
                  <article key={label.toString()} className="bg-white p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-charcoal/45">
                      {label}
                    </p>
                    <p
                      className={`mt-2 text-sm font-semibold ${
                        ready ? "text-brand-charcoal" : "text-brand-charcoal/55"
                      }`}
                    >
                      {value}
                    </p>
                  </article>
                ))}
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {[
                  ["Total produk aktif", stats.products],
                  ["Total store aktif", stats.stores],
                  ["Hero aktif", stats.heroes],
                  ["Banner aktif", stats.banners]
                ].map(([label, value]) => (
                  <article key={label} className="bg-white p-5">
                    <p className="text-sm font-medium text-brand-charcoal/60">
                      {label}
                    </p>
                    <p className="mt-3 text-4xl font-semibold">{value}</p>
                  </article>
                ))}
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                {tableConfigs
                  .filter((config) =>
                    ["hero", "products", "banner", "store", "page-hero"].includes(
                      config.key
                    )
                  )
                  .map((config) => (
                    <button
                      key={config.key}
                      type="button"
                      onClick={() => navigateTo(config)}
                      className="bg-white p-5 text-left transition hover:bg-brand-charcoal hover:text-white"
                    >
                      <p className="text-lg font-semibold">{config.label}</p>
                      <p className="mt-2 text-sm leading-6 opacity-70">
                        Edit cepat
                      </p>
                    </button>
                  ))}
              </div>
            </div>
          ) : (
            <div className="mt-6 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
              <form
                onSubmit={saveRow}
                className="border border-brand-softGray bg-white p-5"
              >
                <h2 className="text-2xl font-semibold">
                  {editingId ? "Edit Data" : "Tambah Baru"}
                </h2>
                <div className="mt-5 grid gap-4">
                  {activeConfig.fields.map((field) => (
                    <label key={field.name} className="text-sm font-semibold">
                      {field.label}
                      {renderField(field)}
                      {field.helper ? (
                        <span className="mt-1 block text-xs font-medium text-brand-charcoal/60">
                          {field.helper}
                        </span>
                      ) : null}
                    </label>
                  ))}
                </div>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex min-h-11 items-center justify-center rounded-full bg-brand-charcoal px-6 py-3 text-sm font-semibold text-white disabled:opacity-50"
                  >
                    {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="inline-flex min-h-11 items-center justify-center rounded-full border border-brand-softGray px-6 py-3 text-sm font-semibold text-brand-charcoal transition hover:border-brand-charcoal"
                  >
                    Reset
                  </button>
                </div>
              </form>

              <div className="border border-brand-softGray bg-white p-5">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-2xl font-semibold">Data</h2>
                  <button
                    type="button"
                    onClick={() => loadRows()}
                    className="rounded-full border border-brand-softGray px-4 py-2 text-sm font-semibold text-brand-charcoal transition hover:border-brand-charcoal"
                  >
                    Refresh
                  </button>
                </div>
                <div className="mt-5 grid gap-4">
                  {rows.map((row) => {
                    const image = previewUrl(row);
                    const price = formatRupiah(
                      (row.price || row.harga || row.base_price || row.price_label) as
                        | string
                        | number
                        | null
                        | undefined
                    );

                    return (
                      <article
                        key={row.id || JSON.stringify(row)}
                        className="border border-brand-softGray bg-brand-offWhite p-4"
                      >
                        <div className="grid gap-4 sm:grid-cols-[96px_1fr]">
                          {image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={image}
                              alt="Preview data"
                              className="aspect-square w-full object-cover"
                            />
                          ) : (
                            <div className="aspect-square bg-white" />
                          )}
                          <div className="grid gap-1 text-sm">
                            {activeConfig.fields.slice(0, 5).map((field) => (
                              <p key={field.name}>
                                <span className="font-semibold">
                                  {field.label}:{" "}
                                </span>
                                <span className="text-brand-charcoal/70">
                                  {valueToText(row[field.name]).slice(0, 120)}
                                </span>
                              </p>
                            ))}
                            {price ? (
                              <p className="font-medium text-brand-charcoal">
                                {price}
                              </p>
                            ) : null}
                          </div>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => startEdit(row)}
                            className="rounded-full bg-brand-charcoal px-4 py-2 text-xs font-semibold text-white"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteRow(row)}
                            className="rounded-full bg-red-700 px-4 py-2 text-xs font-semibold text-white"
                          >
                            Hapus
                          </button>
                        </div>
                      </article>
                    );
                  })}
                  {!rows.length ? (
                    <p className="bg-brand-offWhite p-4 text-sm font-medium text-brand-charcoal/70">
                      Belum ada data atau tabel belum tersedia.
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
