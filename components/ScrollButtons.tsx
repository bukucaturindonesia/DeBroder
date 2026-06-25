"use client";

export function ScrollButtons({ containerId }: { containerId: string }) {
  function scrollByCard(direction: "prev" | "next") {
    const container = document.getElementById(containerId);
    if (!container) return;

    const amount = Math.max(280, Math.round(container.clientWidth * 0.82));
    container.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth"
    });
  }

  const buttonClass =
    "grid h-10 w-10 place-items-center rounded-full border border-brand-softGray bg-white text-brand-charcoal transition hover:border-brand-charcoal hover:bg-brand-charcoal hover:text-white";

  return (
    <div className="flex items-center gap-2" aria-label="Kontrol katalog">
      <button
        type="button"
        className={buttonClass}
        aria-label="Geser katalog sebelumnya"
        onClick={() => scrollByCard("prev")}
      >
        {"<"}
      </button>
      <button
        type="button"
        className={buttonClass}
        aria-label="Geser katalog berikutnya"
        onClick={() => scrollByCard("next")}
      >
        {">"}
      </button>
    </div>
  );
}
