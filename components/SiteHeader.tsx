"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";
import { Logo } from "@/components/Logo";
import { contactLinks } from "@/lib/contact";
import { whatsappLinkWithMessage } from "@/lib/url";

const navItems = [
  { label: "Koleksi", href: "/koleksi", hasDropdown: true },
  { label: "Kaos Polos", href: "/kaos-polos" },
  { label: "Sablon DTF", href: "/sablon-dtf" },
  { label: "Jersey", href: "/jersey" },
  { label: "Store", href: "/store" },
  { label: "Cara Order", href: "/cara-order" }
];

const topbarItems = ["Layanan Pelanggan", "Lacak Pesanan", "Temukan Toko", "ID"];

const collectionGroups = [
  {
    title: "Koleksi",
    items: [
      "Belanja Semua",
      "Best Seller",
      "Kids",
      "New",
      "Populer",
      "Turun Harga"
    ]
  },
  {
    title: "Belanja Berdasarkan Warna",
    items: ["Butter", "Gold", "White", "Black", "Lilac", "Red", "Black-Forest Camo"]
  }
];

const searchItems = [
  {
    title: "Kaos Polos",
    href: "/kaos-polos",
    description: "Kaos polos, cotton combed, dan kebutuhan partai.",
    keywords: ["kaos", "baju", "kaos polos", "cotton combed"]
  },
  {
    title: "Sablon DTF",
    href: "/sablon-dtf",
    description: "Sablon DTF custom untuk brand, event, dan komunitas.",
    keywords: ["sablon", "dtf", "custom"]
  },
  {
    title: "Jersey",
    href: "/jersey",
    description: "Custom jersey untuk tim, komunitas, dan instansi.",
    keywords: ["jersey", "jersey bola", "team"]
  },
  {
    title: "Maklon DTF",
    href: "/maklon-dtf",
    description: "Maklon DTF untuk reseller dan brand apparel.",
    keywords: ["maklon", "dtf", "produksi"]
  },
  {
    title: "Cetak Sublim",
    href: "/cetak-sublim",
    description: "Cetak sublim untuk jersey dan apparel custom.",
    keywords: ["sublim", "cetak sublim"]
  },
  {
    title: "Store Pettarani",
    href: "/store",
    description: "Sablon kaos dan jersey.",
    keywords: ["lokasi", "alamat", "pettarani", "store"]
  },
  {
    title: "Store Tello",
    href: "/store",
    description: "Cetak DTF dan sablon kaos.",
    keywords: ["lokasi", "alamat", "tello", "store"]
  },
  {
    title: "Store Landak",
    href: "/store",
    description: "Cetak DTF dan jersey.",
    keywords: ["lokasi", "alamat", "landak", "store"]
  },
  {
    title: "Store Parepare",
    href: "/store",
    description: "Cetak DTF, sablon, dan kaos polos.",
    keywords: ["lokasi", "alamat", "parepare", "store"]
  },
  {
    title: "Cara Order",
    href: "/cara-order",
    description: "Alur pemesanan DE BRODER.",
    keywords: ["cara order", "order", "pesan"]
  }
];

const whatsappUrl = whatsappLinkWithMessage(
  contactLinks.whatsapp,
  "Halo DE BRODER, saya ingin bertanya tentang layanan DE BRODER."
);

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <circle
        cx="11"
        cy="11"
        r="6.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="m16 16 4 4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        d="M5.5 18.5 6.8 15A7.5 7.5 0 1 1 9 17.2l-3.5 1.3Z"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function DesktopSearchButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      className="hidden h-10 w-[190px] items-center gap-3 rounded-full bg-brand-offWhite px-4 text-left text-sm font-medium text-brand-charcoal/60 ring-1 ring-transparent transition hover:text-brand-charcoal focus:outline-none focus:ring-2 focus:ring-brand-charcoal lg:flex 2xl:w-[235px]"
      aria-label="Cari produk"
      onClick={onClick}
    >
      <SearchIcon />
      <span>Cari produk</span>
    </button>
  );
}

function SearchModal({
  isOpen,
  onClose
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return searchItems.slice(0, 6);

    return searchItems.filter((item) => {
      const haystack = [item.title, item.description, ...item.keywords]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    });
  }, [query]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 40);

    function handleKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) setQuery("");
  }, [isOpen]);

  if (!isOpen) return null;

  function openResult(href: string) {
    onClose();
    router.push(href);
  }

  function handleInputKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" && results[0]) {
      event.preventDefault();
      openResult(results[0].href);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[80] bg-brand-charcoal/50 px-4 py-5 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Pencarian DE BRODER"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="mx-auto mt-16 max-w-2xl overflow-hidden rounded-xl border border-brand-softGray bg-white shadow-soft">
        <div className="flex items-center gap-3 border-b border-brand-softGray p-4">
          <SearchIcon />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={handleInputKeyDown}
            aria-label="Cari layanan, produk, atau store"
            placeholder="Cari produk"
            className="min-h-11 flex-1 bg-transparent text-base outline-none placeholder:text-brand-charcoal/40"
          />
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-brand-softGray text-brand-charcoal transition hover:border-brand-charcoal hover:bg-brand-charcoal hover:text-white"
            aria-label="Tutup pencarian"
            onClick={onClose}
          >
            x
          </button>
        </div>
        <div className="max-h-[55vh] overflow-y-auto p-3">
          {results.length ? (
            <div className="grid gap-2">
              {results.map((item) => (
                <button
                  key={`${item.title}-${item.href}`}
                  type="button"
                  className="rounded-lg p-4 text-left transition hover:bg-brand-offWhite"
                  onClick={() => openResult(item.href)}
                >
                  <span className="text-base font-semibold text-brand-charcoal">
                    {item.title}
                  </span>
                  <span className="mt-1 block text-sm leading-6 text-brand-charcoal/60">
                    {item.description}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <p className="rounded-lg bg-brand-offWhite p-4 text-sm text-brand-charcoal/70">
              Tidak ada hasil. Coba kata kunci lain seperti kaos, sablon,
              jersey, store, atau cara order.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function CollectionDropdown({
  onNavigate
}: {
  onNavigate?: () => void;
}) {
  return (
    <div className="grid gap-6 p-5 md:grid-cols-2">
      {collectionGroups.map((group) => (
        <div key={group.title}>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-charcoal/50">
            {group.title}
          </p>
          <div className="mt-3 grid gap-1">
            {group.items.map((item) => (
              <Link
                key={item}
                href="/koleksi"
                className="rounded-md px-2 py-2 text-sm font-medium text-brand-charcoal/75 transition hover:bg-brand-offWhite hover:text-brand-charcoal"
                onClick={onNavigate}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCollectionOpen, setIsCollectionOpen] = useState(false);
  const [isMobileCollectionOpen, setIsMobileCollectionOpen] = useState(false);
  const [showTopbar, setShowTopbar] = useState(true);
  const collectionRef = useRef<HTMLDivElement>(null);

  function isActive(href: string) {
    return pathname === href;
  }

  useEffect(() => {
    function handleScroll() {
      setShowTopbar(window.scrollY < 12);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isCollectionOpen) return;

    function handlePointer(event: MouseEvent) {
      if (
        collectionRef.current &&
        !collectionRef.current.contains(event.target as Node)
      ) {
        setIsCollectionOpen(false);
      }
    }

    function handleKey(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") setIsCollectionOpen(false);
    }

    document.addEventListener("mousedown", handlePointer);
    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("mousedown", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, [isCollectionOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-brand-softGray bg-white/95 text-brand-charcoal backdrop-blur-xl">
      <div
        className={`overflow-hidden border-b border-brand-softGray bg-brand-offWhite text-xs font-medium text-brand-charcoal/60 transition-all duration-300 ${
          showTopbar
            ? "max-h-10 translate-y-0 opacity-100"
            : "max-h-0 -translate-y-full opacity-0"
        }`}
      >
        <div className="section-shell flex h-8 items-center justify-end gap-4 whitespace-nowrap">
          {topbarItems.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>

      <nav
        className="section-shell flex min-h-[62px] items-center justify-between gap-3 md:min-h-[68px]"
        aria-label="Navigasi utama"
      >
        <Link href="/" className="group flex items-center gap-3">
          <Logo
            variant="symbol-black"
            size="md"
            showText
            className="transition group-hover:scale-[1.01]"
          />
        </Link>

        <div className="hidden items-center gap-1 xl:flex">
          {navItems.map((item) =>
            item.hasDropdown ? (
              <div
                key={item.href}
                className="relative"
                ref={collectionRef}
                onMouseEnter={() => setIsCollectionOpen(true)}
              >
                <button
                  type="button"
                  className={`whitespace-nowrap rounded-full px-3 py-2 text-[13px] font-semibold transition hover:bg-brand-offWhite 2xl:text-sm ${
                    isActive(item.href)
                      ? "bg-brand-charcoal text-white"
                      : "text-brand-charcoal/75"
                  }`}
                  aria-expanded={isCollectionOpen}
                  onClick={() => setIsCollectionOpen((current) => !current)}
                >
                  {item.label}
                </button>
                {isCollectionOpen ? (
                  <div
                    className="absolute left-0 top-full z-[60] mt-3 w-[520px] overflow-hidden border border-brand-softGray bg-white shadow-soft"
                    onMouseLeave={() => setIsCollectionOpen(false)}
                  >
                    <CollectionDropdown
                      onNavigate={() => setIsCollectionOpen(false)}
                    />
                  </div>
                ) : null}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap rounded-full px-3 py-2 text-[13px] font-semibold transition hover:bg-brand-offWhite 2xl:text-sm ${
                  isActive(item.href)
                    ? "bg-brand-charcoal text-white"
                    : "text-brand-charcoal/75"
                }`}
              >
                {item.label}
              </Link>
            )
          )}
        </div>

        <div className="flex items-center gap-2">
          <DesktopSearchButton onClick={() => setIsSearchOpen(true)} />
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-brand-softGray bg-white text-brand-charcoal transition hover:border-brand-charcoal hover:bg-brand-charcoal hover:text-white lg:hidden"
            aria-label="Cari"
            onClick={() => setIsSearchOpen(true)}
          >
            <SearchIcon />
          </button>
          <a
            href={whatsappUrl}
            className="grid h-10 w-10 place-items-center rounded-full border border-brand-softGray bg-white text-brand-charcoal transition hover:border-brand-charcoal hover:bg-brand-charcoal hover:text-white"
            aria-label="Hubungi WhatsApp DE BRODER"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ChatIcon />
          </a>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-softGray bg-white text-brand-charcoal transition hover:border-brand-charcoal hover:bg-brand-charcoal hover:text-white xl:hidden"
            aria-label={isOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((current) => !current)}
          >
            <span className="sr-only">
              {isOpen ? "Tutup menu" : "Buka menu"}
            </span>
            <span className="relative h-4 w-5">
              <span
                className={`absolute left-0 h-0.5 w-5 rounded-full bg-current transition ${
                  isOpen ? "top-2 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-2 h-0.5 w-5 rounded-full bg-current transition ${
                  isOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 h-0.5 w-5 rounded-full bg-current transition ${
                  isOpen ? "top-2 -rotate-45" : "top-4"
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      <div
        className={`border-t border-brand-softGray bg-white xl:hidden ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="section-shell grid max-h-[calc(100vh-88px)] gap-2 overflow-y-auto py-5">
          <button
            type="button"
            className="flex items-center justify-between rounded-lg px-4 py-3 text-left text-base font-semibold text-brand-charcoal transition hover:bg-brand-offWhite"
            onClick={() =>
              setIsMobileCollectionOpen((current) => !current)
            }
          >
            <span>Koleksi</span>
            <span>{isMobileCollectionOpen ? "-" : "+"}</span>
          </button>
          {isMobileCollectionOpen ? (
            <div className="rounded-lg bg-brand-offWhite">
              <CollectionDropdown
                onNavigate={() => {
                  setIsOpen(false);
                  setIsMobileCollectionOpen(false);
                }}
              />
            </div>
          ) : null}
          {navItems
            .filter((item) => !item.hasDropdown)
            .map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-4 py-3 text-base font-semibold transition hover:bg-brand-offWhite ${
                  isActive(item.href)
                    ? "bg-brand-charcoal text-white"
                    : "text-brand-charcoal"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          <a
            href={whatsappUrl}
            className="rounded-lg px-4 py-3 text-base font-semibold text-brand-charcoal transition hover:bg-brand-offWhite"
            onClick={() => setIsOpen(false)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Hubungi Kami
          </a>
        </div>
      </div>
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </header>
  );
}
