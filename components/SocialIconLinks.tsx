type SocialIconLinksProps = {
  emailLink: string;
  facebookLink: string;
  instagramLink: string;
  tone?: "dark" | "light";
  className?: string;
};

const iconPathClass = "h-5 w-5";

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={iconPathClass}>
      <path
        d="M4.75 6.75h14.5v10.5H4.75V6.75Z"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <path
        d="m5.25 7.25 6.75 5.4 6.75-5.4"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={iconPathClass}>
      <path
        d="M14.25 8.25H16V5.4a8.55 8.55 0 0 0-2.55-.15c-2.55 0-4.2 1.55-4.2 4.35v2.15H6.5v3.2h2.75V22h3.35v-7.15h2.8l.45-3.2H12.6V9.9c0-.95.25-1.65 1.65-1.65Z"
        fill="currentColor"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={iconPathClass}>
      <rect
        x="4.75"
        y="4.75"
        width="14.5"
        height="14.5"
        rx="4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle
        cx="12"
        cy="12"
        r="3.15"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="16.65" cy="7.35" r="1" fill="currentColor" />
    </svg>
  );
}

export function SocialIconLinks({
  emailLink,
  facebookLink,
  instagramLink,
  tone = "dark",
  className = ""
}: SocialIconLinksProps) {
  const colorClass =
    tone === "light"
      ? "border-white/20 bg-white/10 text-white hover:bg-white hover:text-brand-charcoal"
      : "border-brand-softGray bg-white text-brand-charcoal hover:border-brand-charcoal hover:bg-brand-charcoal hover:text-white";
  const baseClass = `grid h-11 w-11 place-items-center rounded-full border transition ${colorClass}`;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <a href={emailLink} aria-label="Email DE BRODER" className={baseClass}>
        <EmailIcon />
      </a>
      <a
        href={facebookLink}
        aria-label="Facebook DE BRODER"
        className={baseClass}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FacebookIcon />
      </a>
      <a
        href={instagramLink}
        aria-label="Instagram DE BRODER"
        className={baseClass}
        target="_blank"
        rel="noopener noreferrer"
      >
        <InstagramIcon />
      </a>
    </div>
  );
}
