import Image from "next/image";

type LogoVariant =
  | "symbol-black"
  | "symbol-white"
  | "primary-black"
  | "primary-white"
  | "primary-dark-bg";

type LogoSize = "sm" | "md" | "lg";

const logoSrc: Record<LogoVariant, string> = {
  "symbol-black": "/debroder-icon.png",
  "symbol-white": "/brand/debroder/logo-symbol-white.svg",
  "primary-black": "/brand/debroder/logo-primary-black.svg",
  "primary-white": "/brand/debroder/logo-primary-white.svg",
  "primary-dark-bg": "/brand/debroder/logo-primary-dark-bg.png"
};

const symbolSize: Record<LogoSize, number> = {
  sm: 34,
  md: 40,
  lg: 52
};

const primarySize: Record<LogoSize, { width: number; height: number }> = {
  sm: { width: 128, height: 40 },
  md: { width: 168, height: 52 },
  lg: { width: 220, height: 68 }
};

export function Logo({
  variant,
  size = "md",
  className = "",
  showText = false,
  textTone = "black"
}: {
  variant: LogoVariant;
  size?: LogoSize;
  className?: string;
  showText?: boolean;
  textTone?: "white" | "black";
}) {
  const isSymbol = variant.startsWith("symbol");
  const dimensions = isSymbol
    ? {
        width: symbolSize[size],
        height: symbolSize[size]
      }
    : primarySize[size];
  const imageClass = isSymbol
    ? size === "md"
      ? "h-9 w-9 shrink-0 object-contain sm:h-10 sm:w-10"
      : "h-auto shrink-0 object-contain"
    : "h-auto shrink-0 object-contain";

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <Image
        src={logoSrc[variant]}
        alt="Logo DE BRODER"
        width={dimensions.width}
        height={dimensions.height}
        className={imageClass}
        priority
      />
      {showText ? (
        <span className="leading-none">
          <span
            className={`block text-sm font-bold tracking-[0.18em] sm:text-[15px] ${
              textTone === "white"
                ? "text-white"
                : "text-black"
            }`}
          >
            DE BRODER
          </span>
          <span
            className={`mt-1 hidden text-[11px] font-medium sm:block ${
              textTone === "white" ? "text-white/60" : "text-brand-charcoal/60"
            }`}
          >
            Kaos Polos Import & Sablon
          </span>
        </span>
      ) : null}
    </span>
  );
}
