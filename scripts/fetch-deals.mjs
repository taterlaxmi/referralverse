import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join(__dirname, '../app/data/aggregated-deals.json');

async function fetchDeals() {
    console.log("🚀 Starting Reddit Referral Scraper...");
    
    // 1. Fetch from Reddit
    const redditUrl = 'https://www.reddit.com/r/IndiaReferral/new.json?limit=50';
    let redditResponse = await fetch(redditUrl, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'application/json',
            'Accept-Language': 'en-US,en;q=0.9',
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
        }
    });

    if (redditResponse.status === 403) {
        console.warn("⚠️ Reddit 403 blocked. Attempting fallback to old.reddit.com...");
        const fallbackUrl = redditUrl.replace('www.reddit.com', 'old.reddit.com');
        redditResponse = await fetch(fallbackUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            }
        });
    }

    if (!redditResponse.ok) {
        throw new Error(`Reddit API error: ${redditResponse.status}`);
    }

    const redditData = await redditResponse.json();
    const rawPosts = redditData.data.children
        .filter((post) => {
            const flair = post.data.link_flair_text || '';
            return flair === 'Referral Code 🔑' || flair.toLowerCase() === 'referral code';
        })
        .map((post) => ({
            title: post.data.title,
            description: post.data.selftext,
        }));

    console.log(`📡 Found ${rawPosts.length} relevant posts on Reddit.`);

    if (rawPosts.length === 0) {
        console.log("✅ No new posts to process.");
        return;
    }

    // 2. Extract with Gemini
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        throw new Error("Missing GEMINI_API_KEY environment variable.");
    }

    const promptText = `
    You are an AI assistant that extracts referral codes and deals from Reddit posts.
    I will provide you with a list of Reddit posts. Each post has a title and a description.
    Please extract the application name, the referral code, the sign up bonus, and the referral bonus for each post.
    Return the result strictly as a valid JSON array of objects.
    Each object must have the following keys:
    - "application": string
    - "code": string (the referral code to use)
    - "signUpBonus": string (the bonus the new user gets, e.g. "Rs 100" or "N/A" if not specified)
    - "referralBonus": string (the bonus the referrer gets, or "N/A" if not specified)
    
    If a post does not contain a clear referral code, skip it.
    Output ONLY the JSON array without any markdown formatting, backticks, or extra text.
    
    Reddit Posts:
    ${JSON.stringify(rawPosts.slice(0, 10))}
    `;

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    
    const geminiResponse = await fetch(geminiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: promptText }] }],
            generationConfig: {
                responseMimeType: "application/json",
            }
        })
    });

    if (!geminiResponse.ok) {
        const errText = await geminiResponse.text();
        throw new Error(`Gemini API Error: ${errText}`);
    }

    const geminiData = await geminiResponse.json();
    const rawJsonText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || "[]";
    const newDeals = JSON.parse(rawJsonText);
    
    console.log(`🤖 AI extracted ${newDeals.length} deals.`);

    // 3. Merge and Save
    const existingData = JSON.parse(await readFile(DATA_FILE, 'utf8'));
    
    // Deduplication logic: brand + code
    const dealMap = new Map();
    existingData.deals.forEach(d => dealMap.set(`${d.application.toLowerCase()}-${d.code.toLowerCase()}`, d));
    newDeals.forEach(d => dealMap.set(`${d.application.toLowerCase()}-${d.code.toLowerCase()}`, d));

    const updatedDeals = Array.from(dealMap.values());

    await writeFile(DATA_FILE, JSON.stringify({
        lastUpdated: new Date().toISOString(),
        deals: updatedDeals
    }, null, 2));

    console.log(`💾 Saved ${updatedDeals.length} total deals to JSON.`);
}

fetchDeals().catch(err => {
    console.error("❌ Fatal Error:", err.message);
    process.exit(1);
});
