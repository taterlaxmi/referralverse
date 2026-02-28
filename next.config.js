/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
  async rewrites() {
    return [
      {
        // Rewrite root-level slugs (that are not other known routes) to /posts/:slug
        source: '/:slug((?!api|_next|posts|about|contact|privacy|favicon.ico).*)',
        destination: '/posts/:slug',
      },
    ];
  },
};

module.exports = nextConfig;
