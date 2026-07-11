"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

/** Halo jaune qui suit le curseur et s'agrandit sur les éléments interactifs. */
export function CursorHalo() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 400, damping: 35, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 400, damping: 35, mass: 0.4 });
  const [actif, setActif] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const cible = e.target as Element | null;
      setActif(!!cible?.closest("a, button, [role=button], summary, input, textarea"));
    };
    const leave = () => setVisible(false);
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [x, y]);

  return (
    <motion.div
      className="pac-halo"
      aria-hidden="true"
      style={{ x: sx, y: sy }}
      animate={{
        scale: visible ? (actif ? 2.1 : 1) : 0,
        opacity: visible ? 1 : 0,
        backgroundColor: actif ? "rgba(255, 212, 0, 0.18)" : "rgba(255, 212, 0, 0)",
      }}
      transition={{ duration: 0.2 }}
    />
  );
}
