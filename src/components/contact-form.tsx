"use client";

import { ArrowRight, Check, Loader2 } from "lucide-react";
import { useState } from "react";

import { WEB3FORMS_ACCESS_KEY } from "@/lib/site";
import { cn } from "@/lib/utils";

type Etat = "repos" | "envoi" | "ok" | "erreur";

const SUJETS = [
  "Recherche d'une pièce",
  "Enlèvement d'épave",
  "Rachat de véhicule",
  "Autre demande",
] as const;

/**
 * Formulaire de contact pour ceux qui préfèrent écrire plutôt qu'appeler.
 * Envoi via Web3Forms (service gratuit, sans backend) : la clé publique
 * est dans `WEB3FORMS_ACCESS_KEY` (src/lib/site.ts). Filet : si la clé
 * n'est pas encore configurée, on renvoie vers le téléphone.
 */
export function ContactForm() {
  const [etat, setEtat] = useState<Etat>("repos");
  const [erreur, setErreur] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    if (!WEB3FORMS_ACCESS_KEY) {
      setEtat("erreur");
      setErreur("Le formulaire n'est pas encore activé. Appelez le 04 94 08 15 33.");
      return;
    }

    setEtat("envoi");
    setErreur("");
    data.append("access_key", WEB3FORMS_ACCESS_KEY);
    data.append("from_name", "Site P.A.C.");
    data.append("subject", `Site P.A.C. — ${data.get("sujet") || "message"}`);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        setEtat("ok");
        form.reset();
      } else {
        setEtat("erreur");
        setErreur("L'envoi a échoué. Réessayez, ou appelez le 04 94 08 15 33.");
      }
    } catch {
      setEtat("erreur");
      setErreur("Connexion impossible. Réessayez, ou appelez le 04 94 08 15 33.");
    }
  }

  if (etat === "ok") {
    return (
      <div className="flex flex-col items-start gap-4 rounded-[24px] bg-white p-7 sm:p-9">
        <span className="grid size-12 place-items-center rounded-full bg-accent text-accent-foreground">
          <Check className="size-6" aria-hidden="true" />
        </span>
        <h3 className="text-xl font-bold tracking-[-0.01em]">Message envoyé.</h3>
        <p className="max-w-[42ch] leading-relaxed text-muted-foreground">
          Merci, votre message est bien parti. Le comptoir vous répond dès que possible.
          Pour une demande urgente, le téléphone reste le plus rapide : 04 94 08 15 33.
        </p>
        <button
          type="button"
          onClick={() => setEtat("repos")}
          className="pac-eyebrow mt-1 inline-flex items-center gap-2 text-foreground underline decoration-accent decoration-2 underline-offset-4"
        >
          Écrire un autre message
        </button>
      </div>
    );
  }

  const champ =
    "w-full rounded-xl border border-border bg-white px-4 py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-foreground focus:ring-2 focus:ring-accent";
  const label = "mb-1.5 block text-sm font-semibold text-foreground";

  return (
    <form onSubmit={onSubmit} className="rounded-[24px] bg-white p-6 sm:p-8" noValidate>
      {/* Anti-spam (honeypot) : masqué aux humains */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-nom" className={label}>
            Nom <span className="text-muted-foreground">*</span>
          </label>
          <input id="cf-nom" name="nom" type="text" required autoComplete="name" className={champ} suppressHydrationWarning />
        </div>
        <div>
          <label htmlFor="cf-tel" className={label}>
            Téléphone
          </label>
          <input id="cf-tel" name="telephone" type="tel" autoComplete="tel" className={champ} suppressHydrationWarning />
        </div>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-email" className={label}>
            E-mail <span className="text-muted-foreground">*</span>
          </label>
          <input id="cf-email" name="email" type="email" required autoComplete="email" className={champ} suppressHydrationWarning />
        </div>
        <div>
          <label htmlFor="cf-sujet" className={label}>
            Objet
          </label>
          <select id="cf-sujet" name="sujet" defaultValue={SUJETS[0]} className={cn(champ, "appearance-none")}>
            {SUJETS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="cf-message" className={label}>
          Votre message <span className="text-muted-foreground">*</span>
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={5}
          placeholder="La marque, le modèle et l'année du véhicule, la pièce recherchée…"
          className={cn(champ, "resize-y")}
        />
        <p className="mt-2 text-xs text-muted-foreground">
          Indiquez le véhicule (marque, modèle, année) et la référence si vous l&apos;avez : la réponse sera plus rapide.
        </p>
      </div>

      {etat === "erreur" ? (
        <p role="alert" className="mt-4 rounded-xl bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive">
          {erreur}
        </p>
      ) : null}

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={etat === "envoi"}
          className="group inline-flex h-12 cursor-pointer items-center gap-2.5 rounded-full bg-accent px-6 pac-eyebrow text-accent-foreground transition-transform duration-300 hover:scale-[1.03] disabled:cursor-wait disabled:opacity-70"
        >
          {etat === "envoi" ? (
            <>
              Envoi…
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            </>
          ) : (
            <>
              Envoyer le message
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
            </>
          )}
        </button>
        <p className="text-xs text-muted-foreground">
          Ou par téléphone au{" "}
          <a href="tel:+33494081533" className="font-semibold text-foreground underline decoration-accent decoration-2 underline-offset-4">
            04 94 08 15 33
          </a>
          .
        </p>
      </div>
    </form>
  );
}
