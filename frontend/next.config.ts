import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {}, // Remove 'appDir'
};

export default nextConfig;
