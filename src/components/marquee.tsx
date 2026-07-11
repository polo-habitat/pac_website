"use client";

import { Pause, Play } from "lucide-react";
import { useState } from "react";

const FAMILLES = [
  "Moteurs",
  "Boîtes de vitesses",
  "Alternateurs",
  "Démarreurs",
  "Optiques",
  "Carrosserie",
  "Pare-chocs",
  "Portières",
  "Rétroviseurs",
  "Jantes",
  "Turbos",
  "Radiateurs",
  "Sellerie",
  "Électronique",
];

/** Bandeau défilant jaune, avec bouton pause (WCAG 2.2.2). */
export function Marquee() {
  const [pause, setPause] = useState(false);

  return (
    <div
      className="pac-marquee relative overflow-hidden bg-accent text-accent-foreground"
      data-pause={pause}
    >
      <button
        type="button"
        aria-pressed={pause}
        aria-label={pause ? "Relancer le défilement" : "Mettre le défilement en pause"}
        onClick={() => setPause((p) => !p)}
        className="absolute left-3 top-1/2 z-10 grid size-11 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-accent-foreground/10 transition-colors duration-200 hover:bg-accent-foreground/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-foreground"
      >
        {pause ? <Play className="size-4" /> : <Pause className="size-4" />}
      </button>
      <div className="pac-marquee-piste" aria-hidden="true">
        {[0, 1].map((lot) => (
          <div key={lot} className="flex shrink-0 items-center">
            {FAMILLES.map((f) => (
              <span
                key={f}
                className="whitespace-nowrap px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.14em]"
              >
                {f}
                <span className="ml-6 inline-block size-1.5 rounded-full bg-accent-foreground/60 align-middle" />
              </span>
            ))}
          </div>
        ))}
      </div>
      <span className="sr-only">
        Familles de pièces : {FAMILLES.join(", ")}.
      </span>
    </div>
  );
}
