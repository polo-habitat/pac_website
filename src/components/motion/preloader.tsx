"use client";

import { useEffect } from "react";

/**
 * Rideau noir/jaune joué 1×/session (sessionStorage `pac_vu`).
 * L'animation est en CSS pur (globals.css) : elle se termine même si
 * rAF/IntersectionObserver sont suspendus. Un script inline dans <head>
 * pose html[data-pac-vu] avant peinture pour les visites suivantes.
 */
export function Preloader() {
  useEffect(() => {
    try {
      sessionStorage.setItem("pac_vu", "1");
    } catch {
      /* stockage indisponible : le rideau rejouera, sans conséquence */
    }
  }, []);

  return (
    <div className="pac-preloader" aria-hidden="true">
      <span className="pac-preloader-logo">P.A.C.</span>
    </div>
  );
}
