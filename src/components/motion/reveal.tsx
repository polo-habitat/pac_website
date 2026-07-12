"use client";

import { CSSProperties, useRef } from "react";

import { cn } from "@/lib/utils";
import { useReveal } from "./use-reveal";

/**
 * Fondu + translation au scroll, en transitions CSS pures (voir
 * globals.css) : l'animation se termine à l'horloge même si rAF est
 * suspendu, et un filet CSS force la visibilité après 4 s.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  y = 28,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useReveal(ref);

  return (
    <div
      ref={ref}
      data-reveal
      className={cn(visible && "pac-vu", className)}
      style={
        {
          "--r-y": `${y}px`,
          transitionDelay: `${delay}s`,
          animationDelay: `${4 + delay}s`,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
