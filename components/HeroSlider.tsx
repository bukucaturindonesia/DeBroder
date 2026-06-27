"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ResponsivePicture } from "@/components/ResponsivePicture";
import type { HeroBanner } from "@/lib/types";

export function HeroSlider({ heroes }: { heroes: HeroBanner[] }) {
  const slides = useMemo(() => heroes.filter((hero) => hero.status_aktif !== false), [heroes]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const resumeTimer = useRef<number | null>(null);
  const total = slides.length;

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (total <= 1 || paused || reducedMotion) return;
    const timer = window.setInterval(() => setActiveIndex((current) => (current + 1) % total), 5000);
    return () => window.clearInterval(timer);
  }, [paused, reducedMotion, total]);

  useEffect(() => () => {
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
  }, []);

  if (!slides.length) return null;

  function pauseAfterAction() {
    setPaused(true);
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => setPaused(false), 5200);
  }

  function goTo(index: number) {
    setActiveIndex(index);
    pauseAfterAction();
  }

  function goNext() {
    setActiveIndex((current) => (current + 1) % total);
    pauseAfterAction();
  }

  function goPrev() {
    setActiveIndex((current) => (current - 1 + total) % total);
    pauseAfterAction();
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

  return (
    <section id="beranda" className="w-full bg-white" aria-roledescription="carousel" aria-label="Promo utama DE BRODER">
      <div
        className="relative w-full overflow-hidden bg-brand-charcoal"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={(event) => setTouchStart(event.touches[0].clientX)}
        onTouchEnd={(event) => handleTouchEnd(event.changedTouches[0].clientX)}
      >
        <div
          className={`flex ${reducedMotion ? "" : "transition-transform duration-700 ease-out"}`}
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {slides.map((slide, index) => {
            const headline = slide.headline || slide.title || "Apparel untuk setiap kebutuhan";
            const subtitle = slide.subheadline || slide.subtitle || "Sablon DTF, jersey, dan custom apparel.";
            const ctaHref = slide.cta_link || slide.cta_primary_link || "/koleksi";
            const ctaText = slide.cta_text || slide.cta_primary_text || "Beli Sekarang";
            const desktopVideo = slide.desktop_video_url || slide.hero_video_url || slide.video_url;
            const mobileVideo = slide.mobile_video_url || desktopVideo;
            const desktopPosition = slide.object_position || "center center";
            const mobilePosition = slide.mobile_object_position || desktopPosition;

            return (
              <article key={`${headline}-${index}`} className="relative min-w-full" aria-hidden={index !== activeIndex}>
                <div className="relative aspect-[4/5] w-full sm:aspect-[16/7] lg:aspect-[16/6]">
                  {desktopVideo ? (
                    <video autoPlay muted loop playsInline preload={index === 0 ? "metadata" : "none"} className="h-full w-full object-cover" style={{ objectPosition: desktopPosition }}>
                      {mobileVideo ? <source src={mobileVideo} media="(max-width: 767px)" /> : null}
                      <source src={desktopVideo} />
                    </video>
                  ) : (
                    <ResponsivePicture
                      desktopSrc={slide.image_url || "/images/debroder/fallback/fallback-hero.jpg"}
                      mobileSrc={slide.mobile_image_url || "/images/debroder/fallback/fallback-hero-mobile.jpg"}
                      alt={headline}
                      priority={index === 0}
                      className="h-full w-full object-cover"
                      desktopObjectPosition={desktopPosition}
                      mobileObjectPosition={mobilePosition}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/5" />
                  <div className="absolute bottom-7 left-4 right-4 z-10 sm:bottom-10 sm:left-8 sm:right-8 lg:bottom-12 lg:left-[max(2rem,calc((100vw-1160px)/2))]">
                    <h1 className="max-w-3xl text-3xl font-semibold leading-[1.05] tracking-[-0.035em] text-white drop-shadow-sm sm:text-5xl lg:text-6xl">{headline}</h1>
                    <p className="mt-3 max-w-xl text-sm font-medium leading-6 text-white/85 sm:text-base">{subtitle}</p>
                    <a href={ctaHref} className="mt-5 inline-flex min-h-11 items-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-brand-charcoal transition hover:bg-white/85">
                      {ctaText}<span className="ml-2" aria-hidden="true">→</span>
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {total > 1 ? (
          <>
            <button type="button" onClick={goPrev} aria-label="Banner sebelumnya" className="absolute left-4 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-brand-charcoal transition hover:bg-white sm:grid">←</button>
            <button type="button" onClick={goNext} aria-label="Banner berikutnya" className="absolute right-4 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-brand-charcoal transition hover:bg-white sm:grid">→</button>
            <div className="absolute bottom-4 right-4 z-20 flex gap-2 rounded-full bg-black/20 px-3 py-2 backdrop-blur sm:bottom-6 sm:right-6" aria-label="Pilih banner">
              {slides.map((slide, index) => (
                <button key={`${slide.headline}-${index}`} type="button" onClick={() => goTo(index)} aria-label={`Tampilkan banner ${index + 1}`} aria-current={index === activeIndex} className={`h-2 rounded-full transition ${index === activeIndex ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white"}`} />
              ))}
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}
