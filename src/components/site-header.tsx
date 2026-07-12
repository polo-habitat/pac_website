"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, ChevronRight, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { NavVoiture } from "@/components/nav-voiture";
import { NAP, NAV } from "@/lib/site";
import { cn } from "@/lib/utils";

const LIENS_MENU = [{ href: "/", label: "Accueil" }, ...NAV];

const LIENS_SECONDAIRES = [
  { href: "/mentions-legales", label: "Mentions légales", externe: false },
  { href: NAP.mapsUrl, label: "Itinéraire", externe: true },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [ouvert, setOuvert] = useState(false);
  const [replie, setReplie] = useState(false);

  useEffect(() => {
    const surScroll = () => setReplie(window.scrollY > 72);
    surScroll();
    window.addEventListener("scroll", surScroll, { passive: true });
    return () => window.removeEventListener("scroll", surScroll);
  }, []);

  // En haut de l'accueil, l'en-tête flotte sur l'image sombre du hero :
  // logo et liens passent en blanc pour rester lisibles.
  const surHero = pathname === "/" && !replie;

  return (
    <header className="pac-nav-entree fixed inset-x-0 top-0 z-50">
      <div className="relative mx-auto flex h-20 max-w-[100rem] items-center px-4 sm:h-24 sm:px-7">
        {/* Burger : caché en haut de page sur desktop, présent sinon */}
        <Sheet open={ouvert} onOpenChange={setOuvert}>
          <SheetTrigger asChild>
            <button
              aria-label="Ouvrir le menu"
              className={cn(
                "pointer-events-auto grid size-11 cursor-pointer place-items-center rounded-[14px] bg-white shadow-[0_10px_30px_-10px_rgb(19_19_18/0.35)] transition-all duration-500 hover:scale-105",
                !replie &&
                  "md:pointer-events-none md:-translate-x-6 md:opacity-0",
              )}
            >
              <span className="flex flex-col items-center gap-1" aria-hidden="true">
                <span className="h-[2px] w-4 rounded-full bg-foreground" />
                <span className="h-[2px] w-2.5 rounded-full bg-foreground" />
              </span>
            </button>
          </SheetTrigger>

          <SheetContent
            side="left"
            showCloseButton={false}
            className="inset-y-3 left-3 h-auto w-[min(92vw,25rem)] rounded-[28px] border-0 bg-white p-0 shadow-2xl duration-500"
          >
            <SheetTitle className="sr-only">Menu P.A.C.</SheetTitle>
            <div className="flex h-full flex-col overflow-y-auto p-6 sm:p-7">
              <div className="flex items-center">
                <SheetClose asChild>
                  <button
                    aria-label="Fermer le menu"
                    className="grid size-11 cursor-pointer place-items-center rounded-[14px] border border-border/60 transition-colors hover:bg-secondary"
                  >
                    <X className="size-4" aria-hidden="true" />
                  </button>
                </SheetClose>
                <span className="font-wide mx-auto -translate-x-[22px] text-lg font-extrabold tracking-tight">
                  P.A.C.
                </span>
              </div>

              <nav aria-label="Navigation principale" className="mt-8">
                <ul className="flex flex-col">
                  {LIENS_MENU.map((item, i) => (
                    <li
                      key={item.href}
                      className="pac-menu-item"
                      style={{ animationDelay: `${0.06 + i * 0.05}s` }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOuvert(false)}
                        aria-current={pathname === item.href ? "page" : undefined}
                        className="group flex items-center justify-between gap-4 py-3.5"
                      >
                        <span
                          className={cn(
                            "text-[1.55rem] font-semibold leading-none tracking-[-0.01em] transition-colors",
                            pathname === item.href
                              ? "text-foreground"
                              : "text-foreground/85 group-hover:text-foreground",
                          )}
                        >
                          {item.label}
                        </span>
                        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-secondary transition-colors duration-300 group-hover:bg-accent">
                          <ChevronRight className="size-4" aria-hidden="true" />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <Separator className="my-6" />

              <ul className="grid grid-cols-2 gap-x-4 gap-y-3">
                {LIENS_SECONDAIRES.map((item, i) => (
                  <li
                    key={item.label}
                    className="pac-menu-item"
                    style={{ animationDelay: `${0.35 + i * 0.05}s` }}
                  >
                    {item.externe ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {item.label}
                        <ArrowUpRight className="size-3.5" aria-hidden="true" />
                        <span className="sr-only">(nouvelle fenêtre)</span>
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setOuvert(false)}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {item.label}
                        <ChevronRight className="size-3.5" aria-hidden="true" />
                      </Link>
                    )}
                  </li>
                ))}
              </ul>

              <div className="pac-menu-item mt-auto pt-8" style={{ animationDelay: "0.45s" }}>
                <p className="text-xs text-muted-foreground">
                  {NAP.rue} · {NAP.zone} · {NAP.codePostal} {NAP.ville}
                  <br />
                  Lun–ven 8h–12h · 14h–18h
                </p>
                <a
                  href={NAP.telephoneHref}
                  className="mt-4 flex h-12 items-center justify-center gap-2 rounded-full bg-accent text-base font-bold text-accent-foreground transition-transform hover:scale-[1.02]"
                >
                  <Phone className="size-4.5" aria-hidden="true" />
                  {NAP.telephone}
                </a>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Groupe central : liens autour du logo (desktop), logo seul (mobile) */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-7">
          <nav
            aria-label="Navigation d'en-tête (première moitié)"
            inert={replie || undefined}
            className={cn(
              "hidden transition-all duration-500 md:block",
              replie ? "-translate-y-2 opacity-0" : "pointer-events-auto",
              surHero && "text-white",
            )}
          >
            <ul className="flex items-center gap-7">
              {NAV.slice(0, 2).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className={cn(
                      "pac-eyebrow whitespace-nowrap transition-opacity hover:opacity-60",
                      pathname === item.href && "underline decoration-accent decoration-2 underline-offset-6",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Logo : wordmark en haut de page, pastille voiture une fois replié */}
          <Link
            href="/"
            aria-label="P.A.C. Pièces Auto Cass, accueil"
            className="pointer-events-auto relative grid place-items-center"
          >
            <span
              aria-hidden={replie}
              className={cn(
                "font-wide text-xl font-extrabold tracking-tight transition-all duration-500",
                replie && "scale-50 opacity-0",
                surHero && "text-white",
              )}
            >
              P.A.C.
            </span>
            <span
              aria-hidden={!replie}
              className={cn(
                "absolute grid h-12 w-14 place-items-center rounded-[16px] bg-white text-foreground shadow-[0_10px_30px_-10px_rgb(19_19_18/0.35)] transition-all duration-500",
                !replie && "scale-50 opacity-0",
              )}
            >
              <NavVoiture className="w-9" />
            </span>
          </Link>

          <nav
            aria-label="Navigation d'en-tête (seconde moitié)"
            inert={replie || undefined}
            className={cn(
              "hidden transition-all duration-500 md:block",
              replie ? "-translate-y-2 opacity-0" : "pointer-events-auto",
              surHero && "text-white",
            )}
          >
            <ul className="flex items-center gap-7">
              {NAV.slice(2).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className={cn(
                      "pac-eyebrow whitespace-nowrap transition-opacity hover:opacity-60",
                      pathname === item.href && "underline decoration-accent decoration-2 underline-offset-6",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Téléphone : pilule complète en haut, pastille ronde une fois replié */}
        <a
          href={NAP.telephoneHref}
          className={cn(
            "pointer-events-auto ml-auto flex h-11 items-center gap-2 rounded-full bg-accent font-bold text-accent-foreground shadow-[0_10px_30px_-10px_rgb(255_212_0/0.6)] transition-all duration-500 hover:scale-105",
            replie ? "w-11 justify-center px-0" : "px-5",
          )}
        >
          <Phone className="size-4.5 shrink-0" aria-hidden="true" />
          <span
            className={cn(
              "whitespace-nowrap text-sm transition-all duration-300",
              replie ? "sr-only" : "hidden sm:inline",
            )}
          >
            {NAP.telephone}
          </span>
          <span className={cn("sr-only", !replie && "sm:hidden")}>
            Appeler le comptoir
          </span>
        </a>
      </div>
    </header>
  );
}
