/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  // Generate a static frontend in the "out" folder for production builds
  ...(isProd ? { output: 'export' } : {
    // In local development, proxy /api requests to deployed backend to bypass CORS
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'https://api-backend.vestinnovations.com/api/:path*',
        },
      ];
    },
  }),

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
    // Required for static export because Next.js image optimization
    // needs a server in the normal configuration.
    unoptimized: true,

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