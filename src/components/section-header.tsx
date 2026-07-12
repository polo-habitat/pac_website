import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";

/** Tête de section v6 : sur-titre + grand titre centrés, façon Zoox. */
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
    <div>
      <div className="text-center">
        <Reveal y={12}>
          <p className="pac-eyebrow text-muted-foreground">{kicker}</p>
        </Reveal>
        <h2
          id={id}
          className="mx-auto mt-5 max-w-[26ch] text-[clamp(1.9rem,4vw,3.2rem)] font-semibold leading-[1.12] tracking-[-0.015em]"
        >
          <SplitText text={titre} />
        </h2>
      </div>
      {children}
    </div>
  );
}
