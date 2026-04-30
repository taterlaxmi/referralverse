const fs = require('fs');
const cheerio = require('cheerio');

const fetch = globalThis.fetch;

const sites = [
    'https://www.techbuy.in',
    'https://www.bookofer.com'
];

const ALL_POSTS_FILE = 'all-posts.json';
const NEW_POSTS_FILE = 'new-posts.json';

// 👉 Load previous snapshot
function loadOldData() {
    if (!fs.existsSync(ALL_POSTS_FILE)) return {};
    return JSON.parse(fs.readFileSync(ALL_POSTS_FILE));
}

// 👉 Save JSON
function saveFile(file, data) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

// 👉 Crawl sitemap recursively
async function getAllSitemapLinks(site) {
    const visited = new Set();
    const urls = new Set();

    async function processSitemap(sitemapUrl) {
        if (visited.has(sitemapUrl)) return;
        visited.add(sitemapUrl);

        try {
            const res = await fetch(sitemapUrl);
            const xml = await res.text();
            const $ = cheerio.load(xml, { xmlMode: true });

            // Nested sitemap
            if ($('sitemap').length > 0) {
                const promises = [];
                $('sitemap loc').each((_, el) => {
                    promises.push(processSitemap($(el).text()));
                });
                await Promise.all(promises);
                return;
            }

            // Actual URLs
            $('url loc').each((_, el) => {
                const link = $(el).text().trim();

                // ✅ Clean filter
                if (
                    link.startsWith(site) &&
                    !link.includes('/category/') &&
                    !link.includes('/tag/') &&
                    !link.includes('/author/') &&
                    !link.includes('/page/') &&
                    !link.includes('/wp-') &&
                    !link.includes('?') &&
                    link.split('/').length > 4
                ) {
                    urls.add(link);
                }
            });

        } catch (e) {
            console.log(`❌ Failed: ${sitemapUrl}`);
        }
    }

    await processSitemap(site + '/sitemap.xml');
    await processSitemap(site + '/sitemap_index.xml');

    return Array.from(urls);
}

// 👉 MAIN
(async () => {
    const oldData = loadOldData();

    let allPosts = {};
    let newPosts = {};

    for (const site of sites) {
        console.log(`🔍 Checking ${site}`);

        const currentLinks = await getAllSitemapLinks(site);
        const oldLinks = oldData[site] || [];

        const diff = currentLinks.filter(link => !oldLinks.includes(link));

        if (diff.length > 0) {
            console.log(`🆕 ${diff.length} new posts found`);
        }

        allPosts[site] = currentLinks;
        newPosts[site] = diff;
    }

    // Save both files
    saveFile(ALL_POSTS_FILE, allPosts);
    saveFile(NEW_POSTS_FILE, newPosts);

    console.log('\n====================');
    console.log('✅ Done');
})();

