import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  // Allow HMR / client bundles when opening the dev site via 127.0.0.1 (see .env.local.example).
  allowedDevOrigins: ["127.0.0.1"],
  outputFileTracingRoot: path.join(__dirname, "..", "..", "..", ".."),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.pinimg.com", // 👈 Added Pinterest Domain
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
