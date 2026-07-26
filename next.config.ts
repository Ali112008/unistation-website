import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.prod.website-files.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
      {
        protocol: "https",
        hostname: "sfile.chatglm.cn",
      },
    ],
  },
  // Redirects: old URLs → new clean URLs (SEO + bookmark preservation)
  async redirects() {
    return [
      // Destinations
      { source: "/destinations/spain", destination: "/spain", permanent: true },
      { source: "/destinations/turkey", destination: "/turkey", permanent: true },
      { source: "/destinations/romania", destination: "/romania", permanent: true },
      { source: "/destinations/italy", destination: "/italy", permanent: true },
      { source: "/destinations/germany", destination: "/germany", permanent: true },
      { source: "/destinations/hungary", destination: "/hungary", permanent: true },
      { source: "/destinations/poland", destination: "/poland", permanent: true },
      { source: "/destinations/finland", destination: "/finland", permanent: true },
      { source: "/destinations/czech-republic", destination: "/czech-republic", permanent: true },
      { source: "/destinations/malta", destination: "/malta", permanent: true },
      { source: "/destinations/cyprus", destination: "/cyprus", permanent: true },
      { source: "/destinations/georgia", destination: "/georgia", permanent: true },
      { source: "/destinations/russia", destination: "/russia", permanent: true },
      { source: "/destinations/malaysia", destination: "/malaysia", permanent: true },
      { source: "/destinations/china", destination: "/china", permanent: true },
      { source: "/destinations/ireland", destination: "/ireland", permanent: true },
      // Packages
      { source: "/packages/uk", destination: "/uk", permanent: true },
      { source: "/packages/uk-medicine", destination: "/uk-medicine", permanent: true },
      { source: "/packages/early-bird", destination: "/early-bird", permanent: true },
      { source: "/packages/spain-foundation-year", destination: "/spain-foundation-year", permanent: true },
      { source: "/packages/profile-building", destination: "/profile-building", permanent: true },
      { source: "/packages/usa", destination: "/usa", permanent: true },
      { source: "/packages/canada", destination: "/canada", permanent: true },
      { source: "/packages/europe", destination: "/europe", permanent: true },
      { source: "/packages/asia", destination: "/asia", permanent: true },
      { source: "/packages/australia", destination: "/australia", permanent: true },
      { source: "/packages/new-zealand", destination: "/new-zealand", permanent: true },
      // Language courses
      { source: "/language-courses/english", destination: "/ielts", permanent: true },
      { source: "/language-courses/german", destination: "/german", permanent: true },
      { source: "/language-courses/spanish", destination: "/spanish", permanent: true },
      { source: "/language-courses/turkish", destination: "/turkish", permanent: true },
      { source: "/language-courses/deutsch", destination: "/german", permanent: true },
      { source: "/language-courses/espanol", destination: "/spanish", permanent: true },
    ];
  },
  // Rewrites: serve content from original location under clean URL
  async rewrites() {
    return {
      beforeFiles: [
        // Destinations
        { source: "/spain", destination: "/destinations/spain" },
        { source: "/turkey", destination: "/destinations/turkey" },
        { source: "/romania", destination: "/destinations/romania" },
        { source: "/italy", destination: "/destinations/italy" },
        { source: "/germany", destination: "/destinations/germany" },
        { source: "/hungary", destination: "/destinations/hungary" },
        { source: "/poland", destination: "/destinations/poland" },
        { source: "/finland", destination: "/destinations/finland" },
        { source: "/czech-republic", destination: "/destinations/czech-republic" },
        { source: "/malta", destination: "/destinations/malta" },
        { source: "/cyprus", destination: "/destinations/cyprus" },
        { source: "/georgia", destination: "/destinations/georgia" },
        { source: "/russia", destination: "/destinations/russia" },
        { source: "/malaysia", destination: "/destinations/malaysia" },
        { source: "/china", destination: "/destinations/china" },
        { source: "/ireland", destination: "/destinations/ireland" },
        // Packages
        { source: "/uk", destination: "/packages/uk" },
        { source: "/uk-medicine", destination: "/packages/uk-medicine" },
        { source: "/early-bird", destination: "/packages/early-bird" },
        { source: "/spain-foundation-year", destination: "/packages/spain-foundation-year" },
        { source: "/profile-building", destination: "/packages/profile-building" },
        { source: "/usa", destination: "/packages/usa" },
        { source: "/canada", destination: "/packages/canada" },
        { source: "/europe", destination: "/packages/europe" },
        { source: "/asia", destination: "/packages/asia" },
        { source: "/australia", destination: "/packages/australia" },
        { source: "/new-zealand", destination: "/packages/new-zealand" },
        // Language courses — /ielts replaces /english
        { source: "/ielts", destination: "/language-courses/english" },
        { source: "/german", destination: "/language-courses/german" },
        { source: "/spanish", destination: "/language-courses/spanish" },
        { source: "/turkish", destination: "/language-courses/turkish" },
      ],
    };
  },
};

export default nextConfig;
