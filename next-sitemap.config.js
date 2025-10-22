/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://referralverse.in', // Replace with your actual domain
  generateRobotsTxt: true,
  changefreq: 'monthly',
  priority: 0.7,
  exclude: ['/404', '/500'], // Optional
};