import fs from 'fs';
import * as cheerio from 'cheerio';

/**
 * SEO Comparison Tool
 * Compares ReferralVerse against major competitors on key SEO metrics.
 */

const sites = process.argv.slice(2);

if (!sites.length) {
    console.log('Usage: node scripts/compare-seo-with-competitors.mjs https://referralverse.in https://www.techbuy.in');
    process.exit(0);
}

async function audit(site) {
    const start = Date.now();
    try {
        const res = await fetch(site, { headers: { 'User-Agent': 'Mozilla/5.0 (Compatible; ReferralVerseSEO/1.0)' } });
        const html = await res.text();
        const loadTime = Date.now() - start;
        const $ = cheerio.load(html);

        const bodyText = $('body').text();
        const scripts = $('script[type="application/ld+json"]')
            .map((_, el) => $(el).html() || '')
            .get()
            .join('\n');

        const images = $('img');
        let missingAltCount = 0;
        images.each((_, el) => {
            if (!$(el).attr('alt')) missingAltCount++;
        });

        return {
            site: site.replace('https://', '').replace('www.', '').split('/')[0],
            title: $('title').first().text().trim().substring(0, 50) + '...',
            h1: $('h1').first().text().trim() || '❌ Missing',
            h2Count: $('h2').length,
            wordCount: bodyText.split(/\s+/).length,
            canonical: $('link[rel="canonical"]').attr('href') ? '✅' : '❌',
            ogTags: ($('meta[property="og:title"]').length > 0 || $('meta[name="twitter:title"]').length > 0) ? '✅' : '❌',
            faqSchema: /FAQPage/i.test(scripts) ? '✅' : '❌',
            breadcrumb: /BreadcrumbList/i.test(scripts) ? '✅' : '❌',
            loadTime: `${loadTime}ms`,
            missingAlt: missingAltCount > 0 ? `❌ ${missingAltCount}` : '✅',
            hasReferral: /(referral|invite|code|coupon)/i.test(bodyText) ? '✅' : '❌',
        };
    } catch (e) {
        console.log(`❌ Failed to audit ${site}:`, e.message);
        return {
            site,
            title: 'Error',
            h1: 'Error',
            h2Count: 0,
            wordCount: 0,
            canonical: '❌',
            ogTags: '❌',
            faqSchema: '❌',
            breadcrumb: '❌',
            loadTime: 'N/A',
            missingAlt: 'N/A',
            hasReferral: '❌',
        };
    }
}

(async () => {
    console.log('🚀 Starting SEO Competitor Comparison...\n');
    const results = await Promise.all(sites.map(audit));

    console.table(results);

    // 👉 Generate Markdown Report for GitHub Actions
    let reportMd = '## 📊 SEO Competitor Comparison Report\n\n';
    reportMd += '| Site | H1 | H2s | Words | Canonical | OG | FAQ | Breadcrumb | Speed | Missing Alt |\n';
    reportMd += '| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |\n';

    results.forEach(r => {
        reportMd += `| **${r.site}** | ${r.h1} | ${r.h2Count} | ${r.wordCount} | ${r.canonical} | ${r.ogTags} | ${r.faqSchema} | ${r.breadcrumb} | ${r.loadTime} | ${r.missingAlt} |\n`;
    });

    reportMd += `\n\n> *Report generated on ${new Date().toLocaleDateString('en-IN')}*`;

    if (process.env.GITHUB_STEP_SUMMARY) {
        fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, reportMd);
        console.log('✅ Summary added to GITHUB_STEP_SUMMARY');
    }

    fs.writeFileSync('seo-report.json', JSON.stringify(results, null, 2));
    console.log('\n✅ Full report saved to seo-report.json');
})();
