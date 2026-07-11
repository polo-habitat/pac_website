"use client";

import { motion } from "motion/react";
import { useRef } from "react";
import { useReveal } from "./use-reveal";

/** Révélation mot à mot. `accent` : mots (index, base 0) à peindre en jaune sur pilule noire. */
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
    <span ref={ref} className={className} aria-label={text} role="text">
      {mots.map((mot, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom" aria-hidden="true">
          <motion.span
            className={
              "inline-block " +
              (accentFrom !== undefined && i >= accentFrom
                ? "rounded-[0.18em] bg-accent px-[0.12em] text-accent-foreground"
                : "")
            }
            initial={{ y: "110%" }}
            animate={visible ? { y: 0 } : undefined}
            transition={{
              duration: 0.7,
              delay: delay + i * 0.07,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {mot}
          </motion.span>
          {i < mots.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}
