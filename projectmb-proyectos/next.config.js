/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.watchOptions = {
      ignored: [
        '**/node_modules/**',
        '**/.next/**',
        '**/System Volume Information/**'
      ]
    };
    return config;
  }
};

module.exports = nextConfig;