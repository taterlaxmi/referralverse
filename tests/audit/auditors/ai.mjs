const DEFAULT_QUERIES = [
  'tata new credit card referral code',
  'referralverse',
  'stable money referral code',
];

export async function auditAIVisibility(url, apiKey, queries = DEFAULT_QUERIES) {
  if (!apiKey) {
    console.log('Skipping AI Visibility: No SERPER_API_KEY found.');
    return null;
  }

  const domain = new URL(url).hostname.replace('www.', '');
  console.log(`Checking AI Citations for ${queries.length} queries (${url})...`);
  const visibilityResults = [];

  for (const q of queries) {
    try {
      const res = await fetch('https://google.serper.dev/search', {
        method: 'POST',
        headers: { 'X-API-KEY': apiKey, 'Content-Type': 'application/json' },
        body: JSON.stringify({ q, sge: true }),
      });
      const data = await res.json();

      const inSGE = JSON.stringify(data.sge || {}).includes(domain);
      const organicIndex = (data.organic || []).findIndex((r) => r.link?.includes(domain));
      const organicPosition = organicIndex >= 0 ? organicIndex + 1 : null;

      visibilityResults.push({
        query: q,
        citedInAI: inSGE ? 'Yes' : 'No',
        organicPosition,
        inOrganicTop10: organicPosition !== null && organicPosition <= 10,
      });
    } catch {
      visibilityResults.push({ query: q, error: 'API Error' });
    }
  }
  return visibilityResults;
}
