import { THRESHOLDS, parseMetricMs } from '../lib/utils.mjs';

export async function auditPerformance(url, apiKey) {
  if (!apiKey) {
    console.log('Skipping Performance: No PAGESPEED_API_KEY found.');
    return { skipped: true };
  }

  console.log('Fetching Core Web Vitals (PSI)...');
  try {
    const psiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&key=${apiKey}&strategy=mobile`;
    const res = await fetch(psiUrl);
    const data = await res.json();

    if (!data.lighthouseResult) {
      return { error: 'Invalid PSI response', passed: false };
    }

    const metrics = data.lighthouseResult.audits;
    const score = Math.round(data.lighthouseResult.categories.performance.score * 100);
    const lcp = metrics['largest-contentful-paint']?.displayValue || 'N/A';
    const cls = metrics['cumulative-layout-shift']?.displayValue || 'N/A';
    const fcp = metrics['first-contentful-paint']?.displayValue || 'N/A';
    const interactive = metrics['interactive']?.displayValue || 'N/A';

    const lcpMs = parseMetricMs(lcp);
    const clsVal = cls !== 'N/A' ? parseFloat(cls) : null;

    const passed =
      score >= THRESHOLDS.performanceScoreMin &&
      (lcpMs === null || lcpMs <= THRESHOLDS.lcpMsMax) &&
      (clsVal === null || clsVal <= THRESHOLDS.clsMax);

    return {
      score,
      lcp,
      cls,
      fcp,
      interactive,
      lcpMs,
      passed,
    };
  } catch {
    return { error: 'Failed to fetch PSI data', passed: false };
  }
}
