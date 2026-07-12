import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Pilule d'action v6 : libellé en petites capitales espacées + chevron.
 * `tone` : jaune (défaut), noire, blanche.
 */
export function CtaPill({
  href,
  children,
  tone = "jaune",
  external = false,
  className,
}: {
  href: string;
  children: React.ReactNode;
  tone?: "jaune" | "noire" | "blanche";
  external?: boolean;
  className?: string;
}) {
  const classes = cn(
    "group inline-flex h-12 cursor-pointer items-center gap-2.5 rounded-full px-6 pac-eyebrow transition-transform duration-300 hover:scale-[1.04]",
    tone === "jaune" && "bg-accent text-accent-foreground",
    tone === "noire" && "bg-primary text-primary-foreground",
    tone === "blanche" && "bg-white text-foreground shadow-[0_10px_30px_-12px_rgb(19_19_18/0.3)]",
    className,
  );
  const fleche = (
    <ChevronRight
      className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
      aria-hidden="true"
    />
  );

  if (external || href.startsWith("http") || href.startsWith("tel:")) {
    return (
      <a
        href={href}
        className={classes}
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children}
        {href.startsWith("http") ? (
          <span className="sr-only"> (nouvelle fenêtre)</span>
        ) : null}
        {fleche}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
      {fleche}
    </Link>
  );
}
