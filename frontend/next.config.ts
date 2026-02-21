import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  //  async rewrites() {
  //   const backendUrl =
  //     process.env.NODE_ENV === 'development'
  //       ? 'http://127.0.0.1:5000'
  //       : process.env.BACKEND_URL; // e.g., https://api.yourapp.com

  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: `${backendUrl}/:path*`,
  //     },
  //   ];
  // },
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.scdn.co",
      },
    ],
  },
};

export default nextConfig;
