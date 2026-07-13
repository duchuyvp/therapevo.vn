import type { NextConfig } from "next";

const config: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "therapevo.vn" },
    ],
  },
  eslint: {
    // No eslint config in the project yet; don't block CI builds on it.
    ignoreDuringBuilds: true,
  },
};

export default config;
