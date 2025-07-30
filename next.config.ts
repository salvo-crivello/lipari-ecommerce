import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: "/fir-auth-1c3bc.appspot.com/**",
      },
      {
        protocol: "https",
        hostname: "dummyjson.com",
        pathname: "/**",
      },
    ],

    minimumCacheTTL: 60,
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
  },

  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: "https://dummyjson.com/auth/:path*",
      },
      {
        source: "/api/dummy/:path*",
        destination: "https://dummyjson.com/:path*",
      },
    ];
  },
};

export default nextConfig;
