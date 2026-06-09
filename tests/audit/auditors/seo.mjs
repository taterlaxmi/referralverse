import * as cheerio from 'cheerio';
import {
  THRESHOLDS,
  parseJsonLd,
  hasSchemaType,
  check,
  validateBreadcrumbUrls,
} from '../lib/utils.mjs';

function normalizeUrl(url) {
  if (!url) return '';
  return url.replace(/\/$/, '');
}

export async function auditTechnical(url, pagePath = '') {
  const path = pagePath || new URL(url).pathname;
  console.log(`Auditing Technical SEO for ${url}...`);

  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Compatible; RV-Audit/1.0)' },
    });
    const html = await res.text();
    const $ = cheerio.load(html);

    const title = $('title').text().trim();
    const h1 = $('h1').first().text().trim();
    const canonical = $('link[rel="canonical"]').attr('href') || '';
    const robots = $('meta[name="robots"]').attr('content') || 'Not Set';
    const metaDescription = $('meta[name="description"]').attr('content')?.trim() || '';
    const ogTitle = $('meta[property="og:title"]').attr('content')?.trim() || '';
    const ogDescription = $('meta[property="og:description"]').attr('content')?.trim() || '';
    const ogUrl = $('meta[property="og:url"]').attr('content')?.trim() || '';
    const twitterCard = $('meta[name="twitter:card"]').attr('content')?.trim() || '';

    const nodes = parseJsonLd($);
    const schema = {
      breadcrumb: hasSchemaType(nodes, 'BreadcrumbList'),
      product: hasSchemaType(nodes, 'Product'),
      howto: hasSchemaType(nodes, 'HowTo'),
      itemList: hasSchemaType(nodes, 'ItemList'),
    };

    const images = {
      total: $('img').length,
      missingAlt: $('img:not([alt])').length,
    };

    const isContentPage =
      path.startsWith('/category/') ||
      (!path.startsWith('/category/') &&
        path !== '/' &&
        !['/about', '/contact', '/referral-aggregator'].includes(path));

    const checks = {
      h1Present: check(!!h1, h1 ? 'H1 present' : 'Missing H1'),
      canonicalPresent: check(!!canonical, canonical ? 'Canonical present' : 'Missing canonical'),
      metaDescription: check(
        metaDescription.length >= THRESHOLDS.metaDescriptionMin &&
          metaDescription.length <= THRESHOLDS.metaDescriptionMax,
        metaDescription
          ? `Meta description length ${metaDescription.length} (expected ${THRESHOLDS.metaDescriptionMin}-${THRESHOLDS.metaDescriptionMax})`
          : 'Missing meta description',
      ),
      ogTitle: check(!!ogTitle, ogTitle ? 'OG title present' : 'Missing og:title'),
      ogDescription: check(
        !!ogDescription,
        ogDescription ? 'OG description present' : 'Missing og:description',
      ),
      ogUrl: check(
        !canonical || !ogUrl || normalizeUrl(ogUrl) === normalizeUrl(canonical),
        ogUrl ? 'OG URL matches canonical' : 'Missing og:url',
      ),
      twitterCard: check(
        !isContentPage || !!twitterCard,
        twitterCard ? 'Twitter card present' : 'Missing twitter:card on content page',
      ),
      breadcrumbSlug: validateBreadcrumbUrls(nodes, path),
      imagesAlt: check(images.missingAlt === 0, `${images.missingAlt} image(s) missing alt text`),
    };

    const passed = Object.values(checks).every((c) => c.pass);

    return {
      title,
      h1: h1 || 'MISSING',
      canonical: canonical || 'MISSING',
      robots,
      metaDescription,
      metaDescriptionLength: metaDescription.length,
      openGraph: { title: ogTitle, description: ogDescription, url: ogUrl },
      twitter: { card: twitterCard },
      schema,
      images,
      checks,
      passed,
    };
  } catch (e) {
    return { error: e.message, passed: false };
  }
}
