import type { NextConfig } from "next";

const apiUrl = process.env.API_URL;

const nextConfig: NextConfig = {
  // Images uploaded in the dashboard are stored by the API; serve them from this site's own domain.
  async rewrites() {
    return apiUrl ? [{ source: "/uploads/:name", destination: `${apiUrl}/uploads/:name` }] : [];
  },
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
