import Image from "next/image";

import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import { PhonePill } from "@/components/phone-pill";
import { asset } from "@/lib/site";

/** Panneau jaune de fin de page : accroche + appel + visuel. */
export function CtaPanel({
  titre,
  texte,
  image,
  alt,
  ratio = "3/2",
}: {
  titre: string;
  texte: string;
  image: string;
  alt: string;
  ratio?: string;
}) {
  return (
    <section aria-label={titre} className="mx-auto max-w-6xl px-5">
      <Reveal>
        <Card className="overflow-hidden rounded-[28px] border-0 bg-accent p-0 text-accent-foreground shadow-none">
          <div className="grid items-center gap-8 p-8 sm:p-12 md:grid-cols-[1.2fr_1fr]">
            <div>
              <h2 className="max-w-[22ch] text-[clamp(1.6rem,3.4vw,2.5rem)] font-bold leading-[1.08] tracking-[-0.015em]">
                {titre}
              </h2>
              <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-accent-foreground/80">
                {texte}
              </p>
              <div className="mt-7">
                <PhonePill />
              </div>
            </div>
            <div
              className="group relative overflow-hidden rounded-[20px]"
              style={{ aspectRatio: ratio }}
            >
              <Image
                src={asset(image)}
                alt={alt}
                fill
                sizes="(max-width: 768px) 92vw, 40vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
              />
            </div>
          </div>
        </Card>
      </Reveal>
    </section>
  );
}
