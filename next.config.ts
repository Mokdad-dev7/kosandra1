import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // If deploying to a subdirectory (e.g., username.github.io/repo-name)
  // Uncomment and set the basePath:
  // basePath: '/repo-name',
  // trailingSlash: true,
};

export default nextConfig;
