import Image from "next/image";
import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { asset } from "@/lib/site";

/**
 * Bannière de sous-page v6.
 * - Sans `image` : plaque sable centrée sous le header fixe (comportement d'origine).
 * - Avec `image` : hero photo plein cadre identique à l'accueil (voile sombre,
 *   texte blanc, `data-nav="dark"` pour le hamburger clair).
 */
export function PageBanner({
  fil,
  titre,
  chapo,
  action,
  image,
  imageAlt,
}: {
  fil: string;
  titre: string;
  chapo?: string;
  action?: React.ReactNode;
  image?: string;
  imageAlt?: string;
}) {
  const contenu = (
    <>
      <Reveal y={12}>
        <Breadcrumb>
          <BreadcrumbList className="justify-center">
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Accueil</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{fil}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Reveal>
      <h1 className="mt-7 max-w-[20ch] text-[clamp(2.2rem,5.4vw,4.2rem)] font-semibold leading-[1.08] tracking-[-0.02em]">
        <SplitText text={titre} />
      </h1>
      {chapo ? (
        <Reveal delay={0.3}>
          <p className="mx-auto mt-7 max-w-[58ch] text-lg leading-relaxed">{chapo}</p>
        </Reveal>
      ) : null}
      {action ? (
        <Reveal delay={0.4}>
          <div className="mt-9">{action}</div>
        </Reveal>
      ) : null}
    </>
  );

  if (image) {
    return (
      <section
        aria-label={fil}
        data-nav="dark"
        className="relative flex min-h-[60svh] items-center overflow-hidden sm:min-h-[68svh]"
      >
        <div className="pac-zoom absolute inset-0">
          <Image
            src={asset(image)}
            alt={imageAlt ?? ""}
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
        </div>
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/75"
          aria-hidden="true"
        />
        {/* Renfort d'en-tête : lisibilité du menu blanc en haut de cadre. */}
        <div
          className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/55 to-transparent"
          aria-hidden="true"
        />
        <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center px-5 pb-16 pt-36 text-center text-white [&_a:hover]:text-white [&_a]:text-white/75 [&_p]:text-white/80 [&_[aria-current]]:text-white">
          {contenu}
        </div>
      </section>
    );
  }

  return (
    <section className="bg-sable">
      <div className="mx-auto flex max-w-4xl flex-col items-center px-5 pb-16 pt-36 text-center [&_p]:text-muted-foreground sm:pb-24 sm:pt-44">
        {contenu}
      </div>
    </section>
  );
}
