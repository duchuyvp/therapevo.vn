import type { NextConfig } from "next";

const config: NextConfig = {
  images: {
    // Admin-controlled content, one-site dev deployment — allow any https image host
    // so cover images pasted into the compose form always work.
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default config;
