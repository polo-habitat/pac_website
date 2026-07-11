"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";

/** Engrenage jaune géant, rotation pilotée par le scroll de la page. */
export function Gear({ className }: { className?: string }) {
  const { scrollY } = useScroll();
  const brute = useTransform(scrollY, [0, 3000], [0, 240]);
  const rotate = useSpring(brute, { stiffness: 60, damping: 20 });

  return (
    <motion.svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      fill="currentColor"
      className={className}
      style={{ rotate }}
    >
      <g>
        {Array.from({ length: 12 }, (_, i) => (
          <rect
            key={i}
            x="46"
            y="0"
            width="8"
            height="18"
            rx="2"
            transform={`rotate(${i * 30} 50 50)`}
          />
        ))}
        <path
          fillRule="evenodd"
          d="M50 15a35 35 0 1 1 0 70 35 35 0 0 1 0-70Zm0 21a14 14 0 1 0 0 28 14 14 0 0 0 0-28Z"
        />
      </g>
    </motion.svg>
  );
}
