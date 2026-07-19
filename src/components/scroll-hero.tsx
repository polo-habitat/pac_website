"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { asset } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Hero « scroll-driven » façon page produit Apple.
 *
 * Le hero reste FIXÉ (sticky) pendant qu'on parcourt une zone de scroll
 * dédiée ; la progression du scroll pilote soit la lecture d'une vidéo
 * (scrubbing), soit — tant qu'aucune vidéo n'est déposée — un lent zoom
 * « Ken Burns » sur l'image poster existante. Le titre/slogan vit en HTML
 * par-dessus et se dissipe à mesure qu'on avance.
 *
 * Substitut sans crédit : sans `videoMp4`/`videoWebm`, le mécanisme
 * fonctionne à l'identique sur l'image `poster`. Déposer plus tard
 * `hero.mp4`/`hero.webm` (+ passer les props) bascule sur la vraie vidéo.
 *
 * Détection du scroll = boucle rAF lisant `window.scrollY` (Lenis n'émet pas
 * d'événement `scroll` natif fiable — cf. site-header).
 *
 * Choix client : l'animation joue POUR TOUS, sans gate `prefers-reduced-motion`
 * ni bouton opt-in (cohérent avec le reste du site — le poste client force le
 * mouvement réduit et doit malgré tout voir l'effet).
 */
export function ScrollHero({
  eyebrow,
  title,
  intro,
  actions,
  poster,
  posterAlt,
  videoWebm,
  videoMp4,
  tone = "atelier",
  scrollLength = "260vh",
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  intro?: React.ReactNode;
  actions?: React.ReactNode;
  poster: string;
  posterAlt: string;
  videoWebm?: string;
  videoMp4?: string;
  tone?: "atelier" | "showroom";
  scrollLength?: string;
}) {
  const wrapRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  const hasVideo = Boolean(videoMp4 || videoWebm);

  useEffect(() => {
    let raf = 0;
    const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
    // Interpolation douce (ease) pour la dissipation du titre.
    const smooth = (a: number, b: number, p: number) =>
      clamp((p - a) / (b - a));

    const tick = () => {
      const wrap = wrapRef.current;
      if (wrap) {
        const rect = wrap.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        const progress = total > 0 ? clamp(-rect.top / total) : 0;

        // 1) Média : vidéo (scrubbing) ou poster (Ken Burns). Toujours actif.
        const video = videoRef.current;
        if (hasVideo && video) {
          if (video.duration) video.currentTime = progress * video.duration;
        } else if (mediaRef.current) {
          const scale = 1.14 - progress * 0.14;
          const shift = progress * 3;
          mediaRef.current.style.transform = `scale(${scale.toFixed(4)}) translateY(${shift.toFixed(2)}%)`;
        }

        // 2) Titre : reste net puis se dissipe en montant.
        if (titleRef.current) {
          const fade = 1 - smooth(0.28, 0.72, progress);
          titleRef.current.style.opacity = fade.toFixed(3);
          titleRef.current.style.transform = `translateY(${(-progress * 46).toFixed(1)}px)`;
        }

        // 3) Indice de scroll : disparaît dès qu'on amorce.
        if (hintRef.current) {
          hintRef.current.style.opacity = (1 - smooth(0.02, 0.16, progress)).toFixed(3);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [hasVideo]);

  const showroom = tone === "showroom";

  return (
    <section
      ref={wrapRef}
      aria-label="Présentation"
      data-nav="dark"
      style={{ height: scrollLength }}
      className="relative"
    >
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden">
        {/* Couche média : vidéo si fournie, sinon poster */}
        <div ref={mediaRef} className="absolute inset-0 will-change-transform">
          {hasVideo ? (
            <video
              ref={videoRef}
              muted
              playsInline
              preload="auto"
              poster={asset(poster)}
              className="h-full w-full object-cover"
            >
              {videoWebm ? <source src={asset(videoWebm)} type="video/webm" /> : null}
              {videoMp4 ? <source src={asset(videoMp4)} type="video/mp4" /> : null}
            </video>
          ) : (
            <Image
              src={asset(poster)}
              alt={posterAlt}
              fill
              sizes="100vw"
              priority
              className="object-cover"
            />
          )}
        </div>

        {/* Voile pour la lisibilité du texte blanc + du menu */}
        <div
          className={cn(
            "absolute inset-0",
            showroom
              ? "bg-gradient-to-b from-black/80 via-black/45 to-black/85"
              : "bg-gradient-to-b from-black/65 via-black/35 to-black/75",
          )}
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black/55 to-transparent"
          aria-hidden="true"
        />

        {/* Titre / slogan HTML par-dessus */}
        <div
          ref={titleRef}
          className="relative mx-auto w-full max-w-6xl px-5 pb-16 pt-28 text-center text-white will-change-transform"
        >
          {eyebrow ? (
            <p
              className={cn(
                "text-white/75",
                showroom ? "pac-kicker" : "pac-eyebrow",
              )}
            >
              {eyebrow}
            </p>
          ) : null}
          <div className="mt-6">{title}</div>
          {intro ? (
            <div className="mx-auto mt-7 max-w-[54ch] text-lg leading-relaxed text-white/80">
              {intro}
            </div>
          ) : null}
          {actions ? (
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              {actions}
            </div>
          ) : null}
        </div>

        {/* Indice de défilement */}
        <div
          ref={hintRef}
          aria-hidden="true"
          className="pointer-events-none absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-white/70"
        >
          <span className="text-[0.6rem] font-semibold uppercase tracking-[0.22em]">
            Défiler
          </span>
          <span className="pac-hint-line block h-9 w-px bg-white/45" />
        </div>
      </div>
    </section>
  );
}
