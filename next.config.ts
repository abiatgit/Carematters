import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'prisma'],
  },
  images: {
    remotePatterns: [
      { protocol: "https",
        hostname: "media.product.which.co.uk",
        pathname: "/**",
      },
      {hostname:"img.freepik.com"},
      {hostname: "e7.pngegg.com"},
      {
        hostname: "randomuser.me",
      },
      { hostname: "github.com" },
      {hostname: "encrypted-tbn1.gstatic.com"},
      { hostname: "upload.wikimedia.org" },
    ],
  },
};


export default nextConfig;
