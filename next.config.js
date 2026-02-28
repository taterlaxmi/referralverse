/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fixes the deprecation warning
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
  // In Next.js 15/16, SWC/Turbopack picks up .browserslistrc automatically.
  // We remove the invalid keys and use the stable bundle optimization.
  bundlePagesRouterDependencies: true, 
  
  async rewrites() {
    return [
      {
        source: '/:slug((?!api|_next|posts|about|contact|privacy|favicon.ico).*)',
        destination: '/posts/:slug',
      },
    ];
  },
};

module.exports = nextConfig;