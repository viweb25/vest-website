/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Force Next.js/SWC to re-transpile these packages from their ESM source so that
  // ES2019 optional catch bindings (catch {}) are compiled correctly and do not
  // produce "ReferenceError: c is not defined" at runtime.
  transpilePackages: [
    '@splinetool/runtime',
    '@splinetool/react-spline',
  ],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: '*.cloudinary.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

module.exports = nextConfig;
