"use client";

import { Pause, Play } from "lucide-react";
import { useState } from "react";

/**
 * Colonne de mots qui défile en boucle (carte « le stock » de l'accueil).
 * Boucle CSS pure + bouton pause (WCAG 2.2.2). La liste est doublée pour
 * un raccord invisible à -50 %.
 */
export function MotsDefilants({ mots }: { mots: readonly string[] }) {
  const [pause, setPause] = useState(false);

  return (
    <div className="relative flex-1">
      <div
        className="pac-mots h-full overflow-hidden"
        data-pause={pause}
        aria-hidden="true"
      >
        <div className="pac-mots-piste">
          {[...mots, ...mots].map((mot, i) => (
            <span
              key={i}
              className="py-2.5 text-center text-[clamp(1.8rem,3.4vw,2.8rem)] font-semibold leading-none tracking-[-0.015em] text-foreground/85"
            >
              {mot}
            </span>
          ))}
        </div>
      </div>
      <p className="sr-only">{mots.join(", ")}.</p>
      <button
        type="button"
        onClick={() => setPause(!pause)}
        aria-label={pause ? "Reprendre le défilement" : "Mettre le défilement en pause"}
        className="absolute -bottom-2 right-0 grid size-9 cursor-pointer place-items-center rounded-full bg-white/80 text-foreground shadow-sm transition-colors hover:bg-white"
      >
        {pause ? (
          <Play className="size-3.5" aria-hidden="true" />
        ) : (
          <Pause className="size-3.5" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
