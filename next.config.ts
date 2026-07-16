import type { NextConfig } from "next";

const config: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "therapevo.vn" },
    ],
  },
};

export default config;
