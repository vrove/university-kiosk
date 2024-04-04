/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cedhtinrtjfsqsqyzqsv.supabase.co'],
  },
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/home",
      },
    ];
  },
};

export default nextConfig;
