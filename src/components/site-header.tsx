"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";
import { useEffect, useState } from "react";

import { NAP, NAV } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * En-tête « Métal & Gas » : menu vertical en haut à gauche (liens en
 * capitales espacées, soulignement animé au survol), CTA téléphone en
 * haut à droite. Le menu est blanc au-dessus du hero sombre de l'accueil,
 * sombre sur les pages claires, et s'efface au défilement — le CTA tél,
 * lui, reste toujours accessible. Plus d'icône voiture ni de condensation.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const accueil = pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Sur l'accueil, le menu reste tant qu'on est sur le hero (plein écran) ;
    // ailleurs il s'efface dès qu'on quitte le haut de page.
    const seuil = () => (accueil ? window.innerHeight * 0.72 : 120);
    const surScroll = () => setScrolled(window.scrollY > seuil());
    surScroll();
    window.addEventListener("scroll", surScroll, { passive: true });
    window.addEventListener("resize", surScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", surScroll);
      window.removeEventListener("resize", surScroll);
    };
  }, [accueil]);

  // Couleur des liens : blanc sur le hero sombre de l'accueil, sombre ailleurs.
  const clair = accueil;

  return (
    <header className="pac-nav-entree pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-[100rem] items-start justify-between px-5 py-5 sm:px-8 sm:py-7">
        {/* Bloc gauche : logo + menu vertical, s'efface au défilement */}
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
              {NAV.map((item) => {
                const actif = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={actif ? "page" : undefined}
                      className={cn(
                        "pac-navlink",
                        clair ? "text-white/90 hover:text-white" : "text-foreground/80 hover:text-foreground",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* CTA téléphone : toujours visible et accessible */}
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
  );
}
