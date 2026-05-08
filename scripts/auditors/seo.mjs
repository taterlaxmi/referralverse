import * as cheerio from 'cheerio';

export async function auditTechnical(url) {
    console.log(`⏳ Auditing Technical SEO for ${url}...`);
    try {
        const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Compatible; RV-Audit/1.0)' } });
        const html = await res.text();
        const $ = cheerio.load(html);

        const scripts = $('script[type="application/ld+json"]').get().map(el => $(el).html()).join(' ');

        return {
            title: $('title').text().trim(),
            h1: $('h1').first().text().trim() || '❌ MISSING',
            canonical: $('link[rel="canonical"]').attr('href') || '❌ MISSING',
            robots: $('meta[name="robots"]').attr('content') || 'Not Set',
            schema: {
                faq: /FAQPage/i.test(scripts),
                breadcrumb: /BreadcrumbList/i.test(scripts),
                product: /Product/i.test(scripts),
                howto: /HowTo/i.test(scripts),
                itemList: /ItemList/i.test(scripts)
            },
            images: {
                total: $('img').length,
                missingAlt: $('img:not([alt])').length
            }
        };
    } catch (e) {
        return { error: e.message };
    }
}
