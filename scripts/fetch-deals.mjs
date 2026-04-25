import { readFile, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateWithAI } from './utils/ai-client.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join(__dirname, '../app/data/aggregated-deals.json');
const ENV_FILE = path.join(__dirname, '../.env.local');

// Manually load .env.local for standard node execution
async function loadEnv() {
    if (existsSync(ENV_FILE)) {
        const content = await readFile(ENV_FILE, 'utf8');
        content.split(/\r?\n/).forEach(line => {
            const trimmedLine = line.trim();
            if (!trimmedLine || trimmedLine.startsWith('#')) return;
            const [key, ...valueParts] = trimmedLine.split('=');
            if (key && valueParts.length > 0) {
                const value = valueParts.join('=').trim();
                process.env[key.trim()] = value;
            }
        });
    }
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchFromReddit() {
    const urls = [
        'https://www.reddit.com/r/IndiaReferral/new.json?limit=50',
        'https://old.reddit.com/r/IndiaReferral/new.json?limit=50',
        'https://www.reddit.com/r/IndiaReferral/new.rss?limit=50'
    ];

    for (const url of urls) {
        try {
            console.log(`📡 Attempting fetch: ${url}`);
            const response = await fetch(url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                    'Accept': url.endsWith('.json') ? 'application/json' : 'application/rss+xml'
                }
            });

            if (!response.ok) {
                console.warn(`⚠️ Method failed (${url}): ${response.status}`);
                continue;
            }

            if (url.endsWith('.json')) {
                const data = await response.json();
                const posts = data.data.children
                    .filter((post) => {
                        const flair = post.data.link_flair_text || '';
                        return flair === 'Referral Code 🔑' || flair.toLowerCase() === 'referral code';
                    })
                    .map((post) => ({
                        title: post.data.title,
                        description: post.data.selftext,
                    }));
                if (posts.length > 0) return posts;
            } else {
                const xml = await response.text();
                const entries = [];
                const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
                let match;
                while ((match = entryRegex.exec(xml)) !== null) {
                    const content = match[1];
                    const titleMatch = /<title>(.*?)<\/title>/.exec(content);
                    const textMatch = /&lt;div class=&quot;md&quot;&gt;([\s\S]*?)&lt;\/div&gt;/.exec(content);
                    if (titleMatch) {
                        entries.push({
                            title: titleMatch[1].replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>'),
                            description: textMatch ? textMatch[1].replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&amp;/g, '&') : ''
                        });
                    }
                }
                if (entries.length > 0) return entries;
            }
        } catch (e) {
            console.warn(`❌ Error with ${url}: ${e.message}`);
        }
    }
    throw new Error("Failed to fetch from all Reddit sources.");
}

async function fetchDeals() {
    await loadEnv(); 
    console.log("🚀 Starting Reddit Referral Scraper...");
    
    // Debug keys (masking for security)
    const geminiKey = process.env.GEMINI_API_KEY;
    const groqKey = process.env.GROQ_API_KEY;
    console.log(`🔑 Config loaded: Gemini=${geminiKey ? 'YES' : 'NO'}, Groq=${groqKey ? 'YES' : 'NO'}`);

    const rawPosts = await fetchFromReddit();
    console.log(`📡 Found ${rawPosts.length} relevant posts on Reddit.`);

    if (rawPosts.length === 0) {
        console.log("✅ No new posts to process.");
        return;
    }

    const promptText = `
    Extract referral deals as JSON array with application, code, signUpBonus, referralBonus.
    Reddit Posts:
    ${JSON.stringify(rawPosts.slice(0, 5))}
    `;

    let extractedDeals = [];
    const parsed = await generateWithAI(promptText, true);
    extractedDeals = Array.isArray(parsed) ? parsed : (parsed.deals || (Object.values(parsed)[0]));
    if (!Array.isArray(extractedDeals)) extractedDeals = [];

    // 3. Merge and Save
    const existingData = JSON.parse(await readFile(DATA_FILE, 'utf8'));
    const dealMap = new Map();
    existingData.deals.forEach(d => {
        if (d.application && d.code) {
           dealMap.set(`${d.application.toLowerCase()}-${d.code.toLowerCase()}`, d);
        }
    });
    extractedDeals.forEach(d => {
        if (d.application && d.code) {
           dealMap.set(`${d.application.toLowerCase()}-${d.code.toLowerCase()}`, d);
        }
    });

    await writeFile(DATA_FILE, JSON.stringify({
        lastUpdated: new Date().toISOString(),
        deals: Array.from(dealMap.values())
    }, null, 2));

    console.log(`💾 Saved ${dealMap.size} total deals to JSON.`);
}

fetchDeals().catch(err => {
    console.error("❌ Fatal Error:", err.message);
    process.exit(1);
});
