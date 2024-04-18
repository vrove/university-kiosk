/** @type {import('next').NextConfig} */

import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
});

export default withPWA({
  images: {
    domains: ["cedhtinrtjfsqsqyzqsv.supabase.co"],
  },
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/home",
      },
    ];
  },
});
