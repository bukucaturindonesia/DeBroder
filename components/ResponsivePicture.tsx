import type { CSSProperties } from "react";

type ResponsivePictureProps = {
  desktopSrc: string;
  mobileSrc?: string;
  alt: string;
  className: string;
  priority?: boolean;
  desktopObjectPosition?: string;
  mobileObjectPosition?: string;
};

export function ResponsivePicture({
  desktopSrc,
  mobileSrc,
  alt,
  className,
  priority = false,
  desktopObjectPosition = "center center",
  mobileObjectPosition
}: ResponsivePictureProps) {
  const mobileSource = mobileSrc || desktopSrc;
  const imageStyle = {
    "--desktop-object-position": desktopObjectPosition,
    "--mobile-object-position": mobileObjectPosition || desktopObjectPosition
  } as CSSProperties;

  return (
    <picture className="block h-full w-full">
      <source media="(max-width: 767px)" srcSet={mobileSource} />
      <img
        src={desktopSrc}
        alt={alt}
        className={`responsive-picture-img ${className}`}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding={priority ? "sync" : "async"}
        style={imageStyle}
      />
    </picture>
  );
}
