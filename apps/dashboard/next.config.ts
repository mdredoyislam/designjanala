import type { NextConfig } from "next";

const apiUrl = process.env.API_URL ?? "http://localhost:4000";

const nextConfig: NextConfig = {
  experimental: {
    // Image uploads (up to 5 MB) and large content sections go through server actions.
    serverActions: { bodySizeLimit: "6mb" },
  },
  // Preview images uploaded to the API at the same paths the website uses.
  async rewrites() {
    return [{ source: "/uploads/:name", destination: `${apiUrl}/uploads/:name` }];
  },
};

export default nextConfig;
