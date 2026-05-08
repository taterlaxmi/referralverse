export async function auditAIVisibility(url, apiKey) {
    if (!apiKey) {
        console.log('⚠️ Skipping AI Visibility: No SERPER_API_KEY found.');
        return null;
    }

    const domain = new URL(url).hostname.replace('www.', '');
    const queries = [
        'tata new credit card referral code',
        'referralverse',
        'stable money referral code'
    ];

    console.log(`⏳ Checking AI Citations for ${queries.length} queries...`);
    const visibilityResults = [];

    for (const q of queries) {
        try {
            const res = await fetch('https://google.serper.dev/search', {
                method: 'POST',
                headers: { 'X-API-KEY': apiKey, 'Content-Type': 'application/json' },
                body: JSON.stringify({ q, sge: true })
            });
            const data = await res.json();

            const inSGE = JSON.stringify(data.sge || {}).includes(domain);
            const inResults = data.organic?.some(r => r.link.includes(domain));

            visibilityResults.push({ query: q, citedInAI: inSGE ? '✅' : '❌', organicRank: inResults ? 'Yes' : 'No' });
        } catch (e) {
            visibilityResults.push({ query: q, error: 'API Error' });
        }
    }
    return visibilityResults;
}
