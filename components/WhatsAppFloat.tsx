"use client";

import { useEffect, useState } from "react";

export function WhatsAppFloat({ href }: { href: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => setVisible(window.scrollY > Math.min(640, window.innerHeight * 0.72));
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat WhatsApp DEBRODER"
      className={`fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-[70] inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#063d24] px-4 text-sm font-semibold text-white transition duration-300 hover:bg-[#0f5a36] sm:bottom-6 sm:right-6 ${visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"}`}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M5.5 18.5 6.8 15A7.5 7.5 0 1 1 9 17.2l-3.5 1.3Z" strokeLinejoin="round" />
      </svg>
      <span className="hidden sm:inline">Chat WhatsApp</span>
    </a>
  );
}
