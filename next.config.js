/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'readinfo.org.pk',
        pathname: '/wp-content/**',
      },
      {
        protocol: 'https',
        hostname: 'readinfos.com',
        pathname: '/wp-content/**',
      },
    ],
  },
};

module.exports = nextConfig;
