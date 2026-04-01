/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://referralverse.in',
  generateRobotsTxt: true,
  changefreq: 'monthly',
  priority: 0.7,
  exclude: ['/404', '/500'],
  transform: async (config, path) => {
    // If the path starts with /posts/, remove it from the sitemap entry
    if (path.startsWith('/posts/')) {
      return {
        loc: path.replace('/posts/', '/'),
        changefreq: config.changefreq,
        priority: config.priority,
        lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      };
    }
    // Otherwise, keep the path as is
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};