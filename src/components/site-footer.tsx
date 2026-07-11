import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import { NAP, NAV, SECTEUR } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <p className="font-wide text-[clamp(3rem,10vw,8rem)] font-extrabold leading-[0.85] tracking-tight text-primary-foreground/95" aria-hidden="true">
          P.A.C.
        </p>
        <div className="mt-10 grid gap-10 md:grid-cols-3">
          <div className="space-y-3 text-sm leading-relaxed text-primary-foreground/80">
            <p className="text-base font-bold text-primary-foreground">
              P.A.C. Pièces Auto Cass
            </p>
            <p>
              Casse automobile et pièces détachées neuves et d&apos;occasion depuis
              1992. La bonne pièce au bon prix.
            </p>
            <p>
              {NAP.rue} · {NAP.zone} · {NAP.codePostal} {NAP.ville}
              <br />
              Tél.{" "}
              <a href={NAP.telephoneHref} className="font-semibold text-accent hover:underline">
                {NAP.telephone}
              </a>{" "}
              · Fax {NAP.fax}
            </p>
          </div>
          <nav aria-label="Plan du site" className="text-sm">
            <p className="mb-3 text-base font-bold">Le site</p>
            <ul className="space-y-2 text-primary-foreground/80">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-accent">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/mentions-legales" className="transition-colors hover:text-accent">
                  Mentions légales
                </Link>
              </li>
            </ul>
          </nav>
          <div className="text-sm leading-relaxed text-primary-foreground/80">
            <p className="mb-3 text-base font-bold text-primary-foreground">
              Secteur desservi
            </p>
            <p>{SECTEUR}</p>
          </div>
        </div>
        <Separator className="my-8 bg-primary-foreground/15" />
        <div className="flex flex-col gap-2 text-xs text-primary-foreground/60 sm:flex-row sm:justify-between">
          <span>© 1992–2026 P.A.C. Pièces Auto Cass · SIREN 384 297 552</span>
          <span>Photos d&apos;illustration : Unsplash</span>
        </div>
      </div>
    </footer>
  );
}
