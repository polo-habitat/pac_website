import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Gear } from "@/components/motion/gear";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";

export function PageBanner({
  fil,
  titre,
  chapo,
  action,
}: {
  fil: string;
  titre: string;
  chapo?: string;
  action?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden">
      <Gear className="pointer-events-none absolute -right-24 -top-16 size-72 text-accent opacity-90 sm:-right-16 sm:size-96" />
      <div className="mx-auto max-w-6xl px-5 pb-12 pt-14 sm:pb-16 sm:pt-20">
        <Reveal y={16}>
          <Breadcrumb>
            <BreadcrumbList>
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
        <h1 className="mt-6 max-w-[18ch] text-[clamp(2.4rem,6vw,4.6rem)] font-bold leading-[1.02] tracking-[-0.02em]">
          <SplitText text={titre} />
        </h1>
        {chapo ? (
          <Reveal delay={0.25}>
            <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-muted-foreground">
              {chapo}
            </p>
          </Reveal>
        ) : null}
        {action ? (
          <Reveal delay={0.35}>
            <div className="mt-8">{action}</div>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
