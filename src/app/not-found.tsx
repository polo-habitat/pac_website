import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PhonePill } from "@/components/phone-pill";

export default function NotFound() {
  return (
    <section className="relative mx-auto flex max-w-6xl flex-col items-start overflow-hidden px-5 py-24">
      <p className="font-wide text-[clamp(5rem,18vw,12rem)] font-extrabold leading-none tracking-tight">
        404
      </p>
      <h1 className="mt-4 max-w-[22ch] text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight tracking-[-0.02em]">
        Cette pièce n&apos;est pas au catalogue.
      </h1>
      <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-muted-foreground">
        La page demandée n&apos;existe pas ou a changé d&apos;adresse. Le comptoir, lui, est
        toujours au même endroit depuis 1992.
      </p>
      <div className="mt-9 flex flex-wrap gap-4">
        <Button asChild className="h-12 rounded-full bg-primary px-6 text-base font-bold text-primary-foreground hover:bg-primary/85">
          <Link href="/">
            Retour à l&apos;accueil
            <ArrowRight className="size-4.5" aria-hidden="true" />
          </Link>
        </Button>
        <PhonePill tone="jaune" />
      </div>
    </section>
  );
}
