import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Export statique servi par GitHub Pages sous /pac_website/ ;
  // trailingSlash absent => `route.html` émis, les anciennes URLs *.html restent valides.
  output: "export",
  basePath: "/pac_website",
  images: { unoptimized: true },
};

export default nextConfig;
