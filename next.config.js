/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Allow images served from your Backblaze B2 bucket (and its Cloudflare CDN, if used).
    // Both the live site and the staging site read from the SAME bucket, so this list
    // is identical in both environments — that's what lets them share one image folder.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.backblazeb2.com",
      },
      {
        protocol: "https",
        hostname: "**.backblaze.com",
      },
    ],
  },
};

module.exports = nextConfig;
