"use client";

import { useRef } from "react";

import { cn } from "@/lib/utils";
import { useReveal } from "./use-reveal";

/**
 * Révélation mot à mot en transitions CSS pures (voir globals.css).
 * `accentFrom` : à partir de cet index (base 0), les mots sont peints
 * en jaune sur pilule.
 */
export function SplitText({
  text,
  className,
  delay = 0,
  accentFrom,
}: {
  text: string;
  className?: string;
  delay?: number;
  accentFrom?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const visible = useReveal(ref);
  const mots = text.split(" ");

  return (
    <span
      ref={ref}
      data-split
      className={cn(visible && "pac-vu", className)}
      aria-label={text}
      role="text"
    >
      {mots.map((mot, i) => (
        <span key={i} aria-hidden="true">
          <span className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom">
            <span
              data-mot
              className={cn(
                "inline-block",
                accentFrom !== undefined &&
                  i >= accentFrom &&
                  "rounded-[0.18em] bg-accent px-[0.12em] text-accent-foreground",
              )}
              style={{
                transitionDelay: `${delay + i * 0.07}s`,
                animationDelay: `${4 + delay + i * 0.07}s`,
              }}
            >
              {mot}
            </span>
          </span>
          {i < mots.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}
