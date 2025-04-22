import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'images.unsplash.com', 
      'plus.unsplash.com', 
      'images.plus.unsplash.com',
      'ik.imagekit.io'
    ]
  },
};

export default nextConfig;
