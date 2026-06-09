/**
 * Shared helpers for live site audit scripts.
 */

export const THRESHOLDS = {
  metaDescriptionMin: 100,
  metaDescriptionMax: 165,
  performanceScoreMin: 85,
  lcpMsMax: 2500,
  clsMax: 0.1,
};

export function slugify(text) {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/&/g, 'and')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

export function parseJsonLd($) {
  const nodes = [];
  $('script[type="application/ld+json"]').each((_, el) => {
    const raw = $(el).html();
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw);
      if (parsed['@graph'] && Array.isArray(parsed['@graph'])) {
        nodes.push(...parsed['@graph']);
      } else if (Array.isArray(parsed)) {
        nodes.push(...parsed);
      } else {
        nodes.push(parsed);
      }
    } catch {
      // skip malformed blocks
    }
  });
  return nodes;
}

export function findNodes(nodes, type) {
  return nodes.filter((node) => {
    const nodeType = node['@type'];
    if (Array.isArray(nodeType)) return nodeType.includes(type);
    return nodeType === type;
  });
}

export function hasSchemaType(nodes, type) {
  return findNodes(nodes, type).length > 0;
}

export function check(pass, message) {
  return { pass, message: pass ? message || 'OK' : message };
}

export function validateBreadcrumbUrls(nodes, pagePath) {
  const breadcrumbs = findNodes(nodes, 'BreadcrumbList');
  if (breadcrumbs.length === 0) {
    return check(true, 'No BreadcrumbList (optional for some pages)');
  }

  const failures = [];
  for (const bc of breadcrumbs) {
    for (const item of bc.itemListElement || []) {
      const url = item.item;
      if (!url || typeof url !== 'string') continue;
      if (/\s/.test(url)) {
        failures.push(`Breadcrumb URL contains spaces: ${url}`);
      }
    }
  }

  const isPostPage =
    pagePath &&
    pagePath !== '/' &&
    !pagePath.startsWith('/category/') &&
    !['/about', '/contact', '/referral-aggregator'].includes(pagePath);

  if (isPostPage) {
    for (const bc of breadcrumbs) {
      const categoryCrumb = (bc.itemListElement || []).find((el) => el.position === 2);
      if (categoryCrumb?.item?.includes('/category/') && /\s/.test(categoryCrumb.item)) {
        failures.push(`Post page category breadcrumb not slugified: ${categoryCrumb.item}`);
      }
    }
  }

  if (failures.length > 0) {
    return check(false, failures.join('; '));
  }
  return check(true, 'Breadcrumb URLs valid');
}

export function parseMetricMs(displayValue) {
  if (!displayValue || displayValue === 'N/A') return null;
  const sMatch = displayValue.match(/([\d.]+)\s*s/);
  if (sMatch) return Math.round(parseFloat(sMatch[1]) * 1000);
  const msMatch = displayValue.match(/([\d.]+)\s*ms/);
  if (msMatch) return Math.round(parseFloat(msMatch[1]));
  return null;
}

export function collectFailures(pages) {
  const failures = [];
  for (const page of pages) {
    const tech = page.technical;
    if (tech?.error) {
      failures.push(`${page.path}: fetch error — ${tech.error}`);
      continue;
    }
    if (tech && tech.passed === false) {
      const failedChecks = Object.entries(tech.checks || {})
        .filter(([, v]) => v && !v.pass)
        .map(([k, v]) => `${k}: ${v.message}`);
      failures.push(`${page.path}: ${failedChecks.join('; ') || 'technical audit failed'}`);
    }
    if (page.performance?.passed === false) {
      failures.push(
        `${page.path}: performance score ${page.performance.score} below ${THRESHOLDS.performanceScoreMin}`,
      );
    }
  }
  return failures;
}
