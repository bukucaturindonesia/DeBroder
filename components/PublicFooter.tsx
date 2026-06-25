import Link from "next/link";
import type { ReactNode } from "react";
import { Logo } from "@/components/Logo";
import type { PublicContent } from "@/lib/types";
import {
  emailHref,
  facebookHref,
  instagramHref,
  whatsappLinkWithMessage
} from "@/lib/url";

const menuLinks = [
  { label: "Koleksi", href: "/koleksi" },
  { label: "Kaos Polos", href: "/kaos-polos" },
  { label: "Sablon DTF", href: "/sablon-dtf" },
  { label: "Jersey", href: "/jersey" },
  { label: "Store", href: "/store" },
  { label: "Cara Order", href: "/cara-order" }
];

const serviceLinks = [
  { label: "Sablon Kaos", href: "/sablon-dtf" },
  { label: "Sablon DTF", href: "/sablon-dtf" },
  { label: "Custom Jersey", href: "/jersey" },
  { label: "Maklon DTF", href: "/maklon-dtf" },
  { label: "Cetak Sublim", href: "/cetak-sublim" }
];

function FooterColumn({
  title,
  children
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
        {title}
      </h3>
      <div className="mt-4 grid gap-2.5 text-sm font-medium text-white/70">
        {children}
      </div>
    </div>
  );
}

export function PublicFooter({ content }: { content: PublicContent }) {
  const emailLink = emailHref(content.contact.email);
  const facebookLink = facebookHref(content.contact.facebook);
  const instagramLink = instagramHref(content.contact.instagram);
  const whatsappLink = whatsappLinkWithMessage(
    content.contact.whatsapp_link || content.contact.whatsapp_utama,
    "Halo DE BRODER, saya ingin bertanya tentang layanan DE BRODER."
  );

  return (
    <footer className="bg-brand-charcoal py-10 text-white">
      <div className="section-shell grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo
            variant="symbol-white"
            size="md"
            showText
            textTone="white"
          />
          <p className="mt-3 text-sm font-medium text-white/60">
            Kaos Polos Import & Sablon
          </p>
          <Link
            href="/admin/login"
            className="mt-5 inline-flex text-xs font-medium text-white/40 transition hover:text-white"
          >
            Admin
          </Link>
        </div>

        <FooterColumn title="Koleksi">
          {menuLinks.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-white">
              {item.label}
            </Link>
          ))}
        </FooterColumn>

        <FooterColumn title="Layanan">
          {serviceLinks.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-white">
              {item.label}
            </Link>
          ))}
        </FooterColumn>

        <FooterColumn title="Kontak">
          <a href={emailLink} className="hover:text-white">
            Email
          </a>
          <a
            href={facebookLink}
            className="hover:text-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
          <a
            href={instagramLink}
            className="hover:text-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          <a
            href={whatsappLink}
            className="hover:text-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
        </FooterColumn>
      </div>
      <div className="section-shell mt-8 border-t border-white/10 pt-5">
        <p className="text-sm font-medium text-white/60">
          {content.contact.copyright_text ||
            "\u00a9 2026 DE BRODER. All rights reserved."}
        </p>
      </div>
    </footer>
  );
}
