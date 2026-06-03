export async function auditPerformance(url, apiKey) {
    if (!apiKey) {
        console.log('⚠️ Skipping Performance: No PAGESPEED_API_KEY found.');
        return null;
    }

    console.log('⏳ Fetching Core Web Vitals (PSI)...');
    try {
        const psiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&key=${apiKey}&strategy=mobile`;
        const res = await fetch(psiUrl);
        const data = await res.json();

        const metrics = data.lighthouseResult.audits;
        return {
            score: data.lighthouseResult.categories.performance.score * 100,
            lcp: metrics['largest-contentful-paint']?.displayValue || 'N/A',
            cls: metrics['cumulative-layout-shift']?.displayValue || 'N/A',
            fcp: metrics['first-contentful-paint']?.displayValue || 'N/A',
            interactive: metrics['interactive']?.displayValue || 'N/A'
        };
    } catch (e) {
        return { error: 'Failed to fetch PSI data' };
    }
}
