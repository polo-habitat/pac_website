"use client";

import { RefObject, useEffect, useState } from "react";

/**
 * Visibilité d'un élément : IntersectionObserver + filet de sécurité
 * scroll/visibilitychange (le renderer de ce poste client est souvent gelé,
 * l'IO peut rester suspendu — même stratégie que l'ancien balayer()).
 */
export function useReveal(ref: RefObject<HTMLElement | null>) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;

    const check = () => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.92 && r.bottom > 0) setVisible(true);
    };

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setVisible(true)),
      { threshold: 0.15 },
    );
    io.observe(el);
    check();
    window.addEventListener("scroll", check, { passive: true });
    document.addEventListener("visibilitychange", check);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", check);
      document.removeEventListener("visibilitychange", check);
    };
  }, [ref, visible]);

  return visible;
}
