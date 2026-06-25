/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { HeroBanner } from "@/lib/types";

function HeroImage({
  src,
  alt,
  priority,
  objectPosition,
  className = "h-full w-full object-cover"
}: {
  src: string;
  alt: string;
  priority?: boolean;
  objectPosition?: string;
  className?: string;
}) {
  if (src.startsWith("/")) {
    return (
      <Image
        src={src}
        alt={alt}
        width={1536}
        height={1024}
        priority={priority}
        className={className}
        style={{ objectPosition }}
        sizes="100vw"
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      style={{ objectPosition }}
    />
  );
}

export function HeroSlider({ heroes }: { heroes: HeroBanner[] }) {
  const slides = useMemo(
    () => heroes.filter((hero) => hero.status_aktif !== false),
    [heroes]
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHoverPaused, setIsHoverPaused] = useState(false);
  const [isManualPaused, setIsManualPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const manualPauseTimer = useRef<number | null>(null);
  const total = slides.length;
  const activeSlide = slides[activeIndex] || slides[0];
  const isPaused = isHoverPaused || isManualPaused || prefersReducedMotion;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () =>
      setPrefersReducedMotion(mediaQuery.matches);

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);

    return () => {
      mediaQuery.removeEventListener("change", updateMotionPreference);
    };
  }, []);

  useEffect(() => {
    if (total <= 1 || isPaused) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % total);
    }, 4500);

    return () => window.clearInterval(timer);
  }, [isPaused, total]);

  useEffect(() => {
    return () => {
      if (manualPauseTimer.current) {
        window.clearTimeout(manualPauseTimer.current);
      }
    };
  }, []);

  useEffect(() => {
    if (activeIndex >= total) {
      setActiveIndex(0);
    }
  }, [activeIndex, total]);

  if (!activeSlide) return null;

  function pauseAfterInteraction() {
    if (manualPauseTimer.current) {
      window.clearTimeout(manualPauseTimer.current);
    }

    setIsManualPaused(true);
    manualPauseTimer.current = window.setTimeout(() => {
      setIsManualPaused(false);
    }, 4800);
  }

  function goTo(index: number) {
    setActiveIndex(index);
    pauseAfterInteraction();
  }

  function goNext() {
    setActiveIndex((current) => (current + 1) % total);
    pauseAfterInteraction();
  }

  function goPrev() {
    setActiveIndex((current) => (current - 1 + total) % total);
    pauseAfterInteraction();
  }

  function handleTouchEnd(x: number) {
    if (touchStart === null || total <= 1) return;

    const delta = touchStart - x;
    if (Math.abs(delta) > 44) {
      if (delta > 0) goNext();
      else goPrev();
    }
    setTouchStart(null);
  }

  function renderSlideCopy(slide: HeroBanner, mobile = false) {
    const headline = slide.headline || slide.title || "KAOS POLOS IMPORT";
    const subtitle =
      slide.subheadline ||
      slide.subtitle ||
      "Sablon DTF, Jersey, dan Custom Apparel";
    const ctaHref = slide.cta_link || slide.cta_primary_link || "/koleksi";
    const ctaText = slide.cta_text || slide.cta_primary_text || "Beli Sekarang";

    return (
      <div className={mobile ? "space-y-3" : "space-y-2"}>
        <h1
          className={
            mobile
              ? "text-2xl font-semibold leading-tight tracking-tight text-brand-charcoal"
              : "w-fit bg-white px-4 py-2 text-3xl font-bold leading-tight text-brand-charcoal"
          }
        >
          {headline}
        </h1>
        <p
          className={
            mobile
              ? "max-w-xl text-sm font-medium leading-6 text-brand-charcoal/70"
              : "w-fit max-w-xl bg-white px-4 py-2 text-base font-medium leading-6 text-brand-charcoal/75"
          }
        >
          {subtitle}
        </p>
        <a
          href={ctaHref}
          className="inline-flex min-h-11 items-center rounded-full bg-brand-charcoal px-5 py-3 text-sm font-semibold text-white transition hover:bg-black/80"
        >
          {ctaText} <span aria-hidden="true">-&gt;</span>
        </a>
      </div>
    );
  }

  return (
    <section id="beranda" className="w-full bg-white">
      <div
        className="relative mx-auto w-full bg-brand-offWhite"
        onMouseEnter={() => setIsHoverPaused(true)}
        onMouseLeave={() => setIsHoverPaused(false)}
        onTouchStart={(event) => setTouchStart(event.touches[0].clientX)}
        onTouchEnd={(event) => handleTouchEnd(event.changedTouches[0].clientX)}
      >
        <div className="overflow-hidden">
          <div
            className={`flex ${
              prefersReducedMotion
                ? ""
                : "transition-transform duration-[750ms] ease-in-out"
            }`}
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {slides.map((slide, index) => {
            const videoUrl = slide.hero_video_url || slide.video_url;
            const objectPosition =
              slide.mobile_object_position ||
              slide.object_position ||
              "center center";

            return (
              <article
                key={`${slide.headline}-${index}`}
                className="min-w-full bg-brand-offWhite"
                aria-hidden={index !== activeIndex}
              >
                <div className="relative aspect-[4/3] w-full sm:aspect-[16/7] lg:aspect-[16/6]">
                  {videoUrl ? (
                    <video
                      src={videoUrl}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="h-full w-full object-cover"
                      style={{ objectPosition }}
                    />
                  ) : (
                    <HeroImage
                      src={
                        slide.image_url ||
                        "/images/debroder/fallback/fallback-hero.jpg"
                      }
                      alt={slide.headline || slide.title || "Hero DE BRODER"}
                      priority={index === 0}
                      objectPosition={objectPosition}
                    />
                  )}
                  <div className="absolute inset-0 hidden bg-gradient-to-t from-black/25 via-black/5 to-transparent sm:block" />
                  <div className="absolute bottom-8 left-8 z-10 hidden max-w-[calc(100%-64px)] sm:block">
                    {renderSlideCopy(slide)}
                  </div>
                </div>
                <div className="px-4 py-5 sm:hidden">
                  {renderSlideCopy(slide, true)}
                </div>
              </article>
            );
            })}
          </div>
        </div>

          {total > 1 ? (
            <>
              <button
                type="button"
                className="absolute left-4 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-brand-charcoal transition hover:bg-white sm:left-6 sm:flex"
                aria-label="Banner sebelumnya"
                onClick={goPrev}
              >
                {"<"}
              </button>
              <button
                type="button"
                className="absolute right-4 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-brand-charcoal transition hover:bg-white sm:right-6 sm:flex"
                aria-label="Banner berikutnya"
                onClick={goNext}
              >
                {">"}
              </button>
              <div
                className="mx-auto my-4 flex w-fit gap-2 rounded-full bg-white px-3 py-2 sm:absolute sm:bottom-6 sm:right-6 sm:z-20 sm:my-0 sm:bg-white/90 sm:backdrop-blur"
                aria-label="Slider indicator"
              >
                {slides.map((slide, index) => (
                  <button
                    key={`${slide.headline}-${index}`}
                    type="button"
                    className={`h-2 rounded-full transition ${
                      index === activeIndex
                        ? "w-6 bg-brand-charcoal"
                        : "w-2 bg-brand-softGray hover:bg-brand-charcoal/50"
                    }`}
                    aria-label={`Tampilkan banner ${index + 1}`}
                    aria-current={index === activeIndex}
                    onClick={() => goTo(index)}
                  />
                ))}
              </div>
            </>
          ) : null}
        </div>
    </section>
  );
}
