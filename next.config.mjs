/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cedhtinrtjfsqsqyzqsv.supabase.co'],
  },
  async redirects() {
    return [
      {
        source: '/about',
        destination: '/',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
