import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Export statique. basePath REMIS TEMPORAIREMENT (21/07/2026) le temps que le
  // domaine piecesautocass.fr soit débloqué chez OVH : le site est servi en
  // attendant sur https://polo-habitat.github.io/pac_website/. À RETIRER (avec
  // BASE_PATH dans site.ts + public/CNAME + cname Pages) au retour du domaine.
  output: "export",
  basePath: "/pac_website",
  images: { unoptimized: true },
};

export default nextConfig;
