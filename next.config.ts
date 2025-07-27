import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://storage.googleapis.com/fir-auth-1c3bc.appspot.com/**"),
      new URL("https://dummyjson.com/**"),
    ],
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
