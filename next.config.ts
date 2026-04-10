/** @type {import('next').NextConfig} */
const nextConfig = {
  // Uncomment for static export (no server needed)
  // output: 'export',

  // Remove console logs in production
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Image optimization
  images: {
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },

  experimental: {
    optimizeCss: true,
  },

  poweredByHeader: false,
}

module.exports = nextConfig
