import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.product.which.co.uk",
        pathname: "/**",
       
      },
      {
        hostname :"e7.pngegg.com" 
      },
      {
        hostname:"randomuser.me"
      },
      {hostname:"upload.wikimedia.org"}
    ],
  },
};

export default nextConfig;
