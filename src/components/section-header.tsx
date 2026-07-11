import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";

/** Grille asymétrique kicker / statement (geste Kolibri). */
export function SectionHeader({
  kicker,
  titre,
  id,
  children,
}: {
  kicker: string;
  titre: string;
  id: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-[11rem_1fr] md:gap-10">
      <Reveal y={12}>
        <p className="pt-2 text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          {kicker}
        </p>
      </Reveal>
      <div>
        <h2
          id={id}
          className="max-w-[24ch] text-[clamp(2rem,4.6vw,3.6rem)] font-bold leading-[1.05] tracking-[-0.02em]"
        >
          <SplitText text={titre} />
        </h2>
        {children}
      </div>
    </div>
  );
}
