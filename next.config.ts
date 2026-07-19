import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Export statique servi à la RACINE du domaine piecesautocass.fr (plus de
  // basePath depuis la migration domaine du 19/07/2026) ; trailingSlash absent
  // => `route.html` émis, les anciennes URLs *.html restent valides.
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
