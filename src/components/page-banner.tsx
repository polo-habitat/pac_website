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

/** Bannière de sous-page v6 : plaque sable centrée sous le header fixe. */
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
    <section className="bg-sable">
      <div className="mx-auto flex max-w-4xl flex-col items-center px-5 pb-16 pt-36 text-center sm:pb-24 sm:pt-44">
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
            <p className="mx-auto mt-7 max-w-[58ch] text-lg leading-relaxed text-muted-foreground">
              {chapo}
            </p>
          </Reveal>
        ) : null}
        {action ? (
          <Reveal delay={0.4}>
            <div className="mt-9">{action}</div>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
