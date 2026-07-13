"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Défilement inertiel (esprit Zoox). Décoratif uniquement : si rAF est
 * suspendu (renderer gelé du poste client), le scroll natif reprend la
 * main — aucun contenu ne dépend de ce composant. Actif sur tous les
 * appareils, y compris tactiles (choix client : animations forcées partout).
 */
export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    let rafId = 0;
    const boucle = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(boucle);
    };
    rafId = requestAnimationFrame(boucle);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
