import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Phone } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { asset, NAP, NAV, SECTEUR } from "@/lib/site";

/**
 * Footer v6 : panneau blanc arrondi flottant sur fond noir, puis la
 * « fosse » sombre avec photo d'atelier et wordmark géant.
 */
export function SiteFooter() {
  return (
    <footer className="mt-28 bg-primary text-primary-foreground">
      <div className="px-3 pt-3">
        <div className="mx-auto max-w-[100rem] rounded-[28px] bg-background p-8 text-foreground sm:p-12">
          <div className="grid gap-10 md:grid-cols-[1fr_1fr_1.2fr]">
            <nav aria-label="Plan du site" className="text-sm">
              <p className="pac-eyebrow text-muted-foreground">Plan du site</p>
              <ul className="mt-5 space-y-3">
                {[{ href: "/", label: "Accueil" }, ...NAV, { href: "/mentions-legales", label: "Mentions légales" }].map(
                  (item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="group inline-flex items-center gap-1.5 text-base font-medium transition-opacity hover:opacity-60"
                      >
                        {item.label}
                        <ChevronRight
                          className="size-3.5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </nav>

            <div className="text-sm leading-relaxed">
              <p className="pac-eyebrow text-muted-foreground">Le comptoir</p>
              <address className="mt-5 not-italic leading-relaxed text-muted-foreground">
                <b className="text-foreground">{NAP.nom}</b>
                <br />
                {NAP.rue} · {NAP.zone}
                <br />
                {NAP.codePostal} {NAP.ville} · {NAP.departement}
                <br />
                Lun–ven 8h–12h · 14h–18h
                <br />
                Fax {NAP.fax}
              </address>
              <p className="mt-4 text-muted-foreground">{SECTEUR}</p>
            </div>

            <div className="md:justify-self-end">
              <p className="pac-eyebrow text-muted-foreground">Besoin d&apos;une pièce ?</p>
              <p className="mt-5 max-w-[26ch] text-xl font-semibold leading-snug tracking-[-0.01em]">
                Un appel suffit : stock, état et prix annoncés immédiatement.
              </p>
              <a
                href={NAP.telephoneHref}
                className="mt-6 inline-flex h-12 items-center gap-2.5 rounded-full bg-accent px-6 text-base font-bold text-accent-foreground transition-transform duration-300 hover:scale-[1.04]"
              >
                <Phone className="size-4.5" aria-hidden="true" />
                {NAP.telephone}
              </a>
            </div>
          </div>

          <Separator className="my-8" />
          <div className="flex flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:justify-between">
            <span>
              Casse automobile et pièces détachées neuves et d&apos;occasion depuis 1992 —
              la bonne pièce au bon prix.
            </span>
            <span>Photos d&apos;illustration : Unsplash</span>
          </div>
        </div>
      </div>

      {/* La fosse : photo sombre + wordmark géant, façon véhicule vu de dos */}
      <div className="relative overflow-hidden">
        <div className="relative mx-auto aspect-[16/7] max-w-[68rem] min-h-56">
          <Image
            src={asset("/img/hero-moteur-800.webp")}
            alt=""
            fill
            sizes="(max-width: 1088px) 100vw, 1088px"
            className="object-cover object-center opacity-80 [mask-image:linear-gradient(180deg,#000_55%,transparent_96%)]"
          />
        </div>
        <div className="mx-auto flex max-w-[100rem] flex-col gap-6 px-7 pb-10 sm:flex-row sm:items-end sm:justify-between">
          <p className="text-xs leading-relaxed text-primary-foreground/60">
            © 1992–2026 P.A.C. Pièces Auto Cass
            <br />
            SIREN 384 297 552 · RCS Toulon
          </p>
          <p
            className="font-wide text-[clamp(3rem,8vw,6.5rem)] font-extrabold leading-[0.8] tracking-tight text-primary-foreground/95"
            aria-hidden="true"
          >
            P.A.C.
          </p>
        </div>
      </div>
    </footer>
  );
}
