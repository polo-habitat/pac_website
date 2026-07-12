"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Phone, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { NAP, NAV } from "@/lib/site";
import { cn } from "@/lib/utils";

const LIENS_MENU = [{ href: "/", label: "Accueil" }, ...NAV];

/**
 * En-tête « Métal & Gas » :
 *  - en haut de page : menu vertical (logo + liens, soulignement animé) ;
 *  - au défilement : ce menu se transforme (fondu + glissé) en HAMBURGER
 *    dont la couleur s'adapte au fond via `mix-blend-mode: difference`
 *    (toujours visible, sur clair, sombre ou image) ;
 *  - le hamburger ouvre un menu plein écran animé (liens en cascade).
 * Le CTA téléphone reste à droite, toujours accessible.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const accueil = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [ouvert, setOuvert] = useState(false);
  // Barres du hamburger blanches (sur fond sombre) ou noires (sur fond clair).
  const [barresBlanches, setBarresBlanches] = useState(false);
  const hamRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Le défilement inertiel (Lenis) n'émet pas d'événement `scroll` natif
    // fiable : on lit la position à chaque frame (rAF) et on ne met à jour
    // l'état que lorsqu'une valeur change. Robuste quel que soit le moteur.
    const seuil = () => (accueil ? window.innerHeight * 0.72 : 120);
    let raf = 0;
    let dernierScrolled: boolean | null = null;
    let dernierBlanches: boolean | null = null;
    const tick = () => {
      const sc = window.scrollY > seuil();
      if (sc !== dernierScrolled) {
        dernierScrolled = sc;
        setScrolled(sc);
      }
      if (sc) {
        // Couleur adaptative : blanc quand une section `data-nav="dark"` est
        // derrière le hamburger, noir sinon.
        const btn = hamRef.current;
        if (btn) {
          const r = btn.getBoundingClientRect();
          const cy = r.top + r.height / 2;
          let sombre = false;
          document.querySelectorAll<HTMLElement>('[data-nav="dark"]').forEach((z) => {
            const zr = z.getBoundingClientRect();
            if (zr.top <= cy && zr.bottom >= cy) sombre = true;
          });
          if (sombre !== dernierBlanches) {
            dernierBlanches = sombre;
            setBarresBlanches(sombre);
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [accueil]);

  // Menu ouvert : verrou du défilement + fermeture à la touche Échap.
  useEffect(() => {
    if (!ouvert) return;
    const surTouche = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOuvert(false);
    };
    document.addEventListener("keydown", surTouche);
    const prec = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", surTouche);
      document.body.style.overflow = prec;
    };
  }, [ouvert]);

  // Couleur du menu haut (avant défilement) : blanc sur le hero sombre de
  // l'accueil, sombre sur les pages claires.
  const clair = accueil;

  return (
    <>
      <header className="pac-nav-entree pointer-events-none fixed inset-x-0 top-0 z-50">
        <div className="mx-auto flex max-w-[100rem] items-start justify-between px-5 py-5 sm:px-8 sm:py-7">
          {/* Zone gauche : menu vertical OU hamburger, superposés */}
          <div className="relative">
            {/* Menu vertical (haut de page) */}
            <div
              className={cn(
                "flex flex-col gap-4 transition-all duration-500",
                scrolled ? "-translate-y-2 opacity-0" : "pointer-events-auto opacity-100",
              )}
              inert={scrolled || undefined}
            >
              <Link
                href="/"
                aria-label="P.A.C. Pièces Auto Cass, accueil"
                className={cn(
                  "font-wide text-xl font-extrabold tracking-tight transition-colors",
                  clair ? "text-white" : "text-foreground",
                )}
              >
                P.A.C.
              </Link>
              <nav aria-label="Navigation principale">
                <ul className="flex flex-col gap-2">
                  {NAV.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={pathname === item.href ? "page" : undefined}
                        className={cn(
                          "pac-navlink",
                          clair ? "text-white/90 hover:text-white" : "text-foreground/80 hover:text-foreground",
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Hamburger (au défilement) — couleur adaptative via mix-blend */}
            <button
              ref={hamRef}
              type="button"
              aria-label="Ouvrir le menu"
              aria-expanded={ouvert}
              onClick={() => setOuvert(true)}
              className={cn(
                "absolute left-0 top-0 grid h-11 w-11 cursor-pointer place-items-center transition-all duration-500",
                scrolled ? "scale-100 opacity-100" : "pointer-events-none scale-90 opacity-0",
              )}
            >
              <span className="relative block h-[15px] w-7" aria-hidden="true">
                {[0, 6.5, 13].map((top, i) => (
                  <span
                    key={top}
                    className={cn(
                      "absolute left-0 h-[2px] rounded-full transition-colors duration-300",
                      i === 2 ? "w-3/4" : "w-full",
                      barresBlanches ? "bg-white" : "bg-foreground",
                    )}
                    style={{ top: `${top}px` }}
                  />
                ))}
              </span>
            </button>
          </div>

          {/* CTA téléphone : toujours visible */}
          <a
            href={NAP.telephoneHref}
            className="pointer-events-auto flex h-11 items-center gap-2 rounded-full bg-accent px-5 font-bold text-accent-foreground shadow-[0_10px_30px_-10px_rgb(255_212_0/0.6)] transition-transform duration-300 hover:scale-105"
          >
            <Phone className="size-4.5 shrink-0" aria-hidden="true" />
            <span className="hidden text-sm sm:inline">{NAP.telephone}</span>
            <span className="sr-only">Appeler le comptoir</span>
          </a>
        </div>
      </header>

      {/* Menu plein écran (ouvert par le hamburger) */}
      <div
        className={cn(
          "fixed inset-0 z-[60] transition-[opacity,visibility] duration-500",
          ouvert ? "visible opacity-100" : "invisible opacity-0",
        )}
        aria-hidden={!ouvert}
      >
        <button
          type="button"
          aria-label="Fermer le menu"
          tabIndex={ouvert ? 0 : -1}
          onClick={() => setOuvert(false)}
          className="absolute inset-0 h-full w-full cursor-default bg-primary"
        />
        <div className="pointer-events-none relative mx-auto flex h-full max-w-[100rem] flex-col px-5 py-5 sm:px-8 sm:py-7">
          <div className="pointer-events-auto flex items-center justify-between">
            <span className="font-wide text-xl font-extrabold tracking-tight text-primary-foreground">
              P.A.C.
            </span>
            <button
              type="button"
              aria-label="Fermer le menu"
              tabIndex={ouvert ? 0 : -1}
              onClick={() => setOuvert(false)}
              className="grid size-11 cursor-pointer place-items-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/10"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Menu principal" className="flex flex-1 flex-col justify-center">
            <ul className="flex flex-col gap-1 sm:gap-2">
              {LIENS_MENU.map((item, i) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOuvert(false)}
                    tabIndex={ouvert ? 0 : -1}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className={cn("pac-menu-lien group pointer-events-auto inline-flex items-center gap-4", ouvert && "in")}
                    style={{ transitionDelay: ouvert ? `${0.12 + i * 0.06}s` : "0s" }}
                  >
                    <span className="text-[clamp(2.1rem,7vw,4.2rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-primary-foreground/90 transition-colors duration-300 group-hover:text-accent">
                      {item.label}
                    </span>
                    <ArrowUpRight
                      className="size-6 shrink-0 -translate-x-2 text-accent opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:size-8"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="pointer-events-auto flex flex-wrap items-center gap-x-8 gap-y-2 text-sm text-primary-foreground/60">
            <a href={NAP.telephoneHref} className="font-semibold text-primary-foreground hover:text-accent">
              {NAP.telephone}
            </a>
            <span>
              {NAP.rue} · {NAP.zone} · {NAP.codePostal} {NAP.ville}
            </span>
            <span>Lun–ven 8h–12h · 14h–18h</span>
          </div>
        </div>
      </div>
    </>
  );
}
