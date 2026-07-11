import { Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { NAP } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Grande pilule d'appel : noire par défaut, jaune sur fond sombre/jaune. */
export function PhonePill({
  label,
  tone = "noire",
  className,
}: {
  label?: string;
  tone?: "noire" | "jaune" | "blanche";
  className?: string;
}) {
  return (
    <Magnetic>
      <Button
        asChild
        className={cn(
          "h-12 rounded-full px-6 text-base font-bold shadow-none transition-transform duration-200 hover:scale-[1.03]",
          tone === "noire" && "bg-primary text-primary-foreground hover:bg-primary/85",
          tone === "jaune" && "bg-accent text-accent-foreground hover:bg-accent/85",
          tone === "blanche" && "bg-background text-foreground hover:bg-background/90",
          className,
        )}
      >
        <a href={NAP.telephoneHref}>
          <Phone className="size-4.5" aria-hidden="true" />
          {label ?? NAP.telephone}
        </a>
      </Button>
    </Magnetic>
  );
}
