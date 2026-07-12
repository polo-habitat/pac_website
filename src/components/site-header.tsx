"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Magnetic } from "@/components/motion/magnetic";
import { NAP, NAV } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [ouvert, setOuvert] = useState(false);

  return (
    <header className="sticky top-3 z-50 px-3">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-2 rounded-full border border-white/80 bg-white/60 pl-2 pr-2 shadow-[0_12px_40px_-12px_rgb(43_43_40/0.22)] backdrop-blur-xl backdrop-saturate-150">
        <Magnetic strength={0.2}>
          <Link
            href="/"
            aria-label="P.A.C. Pièces Auto Cass, accueil"
            className="font-wide inline-flex h-10 items-center rounded-full bg-primary px-4 text-base font-extrabold tracking-tight text-primary-foreground transition-transform duration-200 hover:scale-[1.04]"
          >
            P.A.C.
          </Link>
        </Magnetic>

        <nav aria-label="Navigation principale" className="mx-auto hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV.map((item) => {
              const actif = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={actif ? "page" : undefined}
                    className={cn(
                      "inline-flex h-10 items-center rounded-full px-4 text-sm font-medium transition-colors duration-200",
                      actif
                        ? "bg-accent text-accent-foreground"
                        : "text-foreground/80 hover:bg-accent/35 hover:text-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <Magnetic strength={0.2} className="ml-auto md:ml-0">
          <Button
            asChild
            className="h-10 rounded-full bg-accent px-4 text-sm font-bold text-accent-foreground hover:bg-accent/85"
          >
            <a href={NAP.telephoneHref}>
              <Phone className="size-4" aria-hidden="true" />
              <span className="hidden sm:inline">{NAP.telephone}</span>
              <span className="sm:hidden">Appeler</span>
            </a>
          </Button>
        </Magnetic>

        <Sheet open={ouvert} onOpenChange={setOuvert}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon-lg"
              className="rounded-full md:hidden"
              aria-label="Ouvrir le menu"
            >
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetHeader>
              <SheetTitle className="font-wide text-lg font-extrabold">P.A.C.</SheetTitle>
            </SheetHeader>
            <nav aria-label="Navigation mobile" className="px-4">
              <ul className="flex flex-col gap-1">
                <li>
                  <Link
                    href="/"
                    onClick={() => setOuvert(false)}
                    className={cn(
                      "flex h-12 items-center rounded-full px-4 text-base font-medium transition-colors",
                      pathname === "/"
                        ? "bg-accent text-accent-foreground"
                        : "hover:bg-muted",
                    )}
                  >
                    Accueil
                  </Link>
                </li>
                {NAV.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOuvert(false)}
                      aria-current={pathname === item.href ? "page" : undefined}
                      className={cn(
                        "flex h-12 items-center rounded-full px-4 text-base font-medium transition-colors",
                        pathname === item.href
                          ? "bg-accent text-accent-foreground"
                          : "hover:bg-muted",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li className="mt-3">
                  <a
                    href={NAP.telephoneHref}
                    className="flex h-12 items-center justify-center gap-2 rounded-full bg-accent px-4 text-base font-bold text-accent-foreground"
                  >
                    <Phone className="size-4" aria-hidden="true" />
                    {NAP.telephone}
                  </a>
                </li>
              </ul>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
