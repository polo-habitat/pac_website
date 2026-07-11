"use client";

import { animate } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useReveal } from "./use-reveal";

export function Counter({
  value,
  suffix = "",
  className,
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const visible = useReveal(ref);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });
    // Filet : si rAF est suspendu (fenêtre occultée), on force la valeur finale.
    const secours = setTimeout(() => setN(value), 2200);
    return () => {
      controls.stop();
      clearTimeout(secours);
    };
  }, [visible, value]);

  return (
    <span ref={ref} className={className}>
      {visible ? n : value}
      {suffix}
    </span>
  );
}
