import Image from "next/image";

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
    <section aria-label={titre} className="mx-auto max-w-[100rem] px-3 sm:px-4">
      <Reveal>
        <div className="pac-ombre overflow-hidden rounded-[32px] bg-accent text-accent-foreground">
          <div className="grid items-center gap-8 p-8 sm:p-14 md:grid-cols-[1.2fr_1fr]">
            <div>
              <h2 className="max-w-[22ch] text-[clamp(1.6rem,3.4vw,2.5rem)] font-semibold leading-[1.12] tracking-[-0.015em]">
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
              className="relative overflow-hidden rounded-[24px]"
              style={{ aspectRatio: ratio }}
            >
              <Image
                src={asset(image)}
                alt={alt}
                fill
                sizes="(max-width: 768px) 92vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
