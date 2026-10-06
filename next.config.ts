import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep old WordPress URLs working after the migration.
  async redirects() {
    return [
      { source: "/portfolio/:slug+", destination: "/portfolio", permanent: true },
      { source: "/portfolio-category/:slug*", destination: "/portfolio", permanent: true },
      { source: "/services/:slug/:rest+", destination: "/services/:slug", permanent: true },
      // Service slugs from the previous version of the site.
      { source: "/services/graphic-design", destination: "/services/brand-design", permanent: true },
      { source: "/services/web-development", destination: "/services/web-design-development", permanent: true },
      { source: "/services/image-processing", destination: "/services", permanent: true },
      { source: "/services/digital-marketing", destination: "/services", permanent: true },
      { source: "/services/skill-development", destination: "/career", permanent: true },
      { source: "/wp-admin/:path*", destination: "/", permanent: false },
      { source: "/feed", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
