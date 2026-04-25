import { google } from 'googleapis';
import { generateWithAI } from './utils/ai-client.mjs';
import { appendFileSync, existsSync } from 'fs';
import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ENV_FILE = path.join(__dirname, '../.env.local');

// Manually load .env.local for local testing
async function loadEnv() {
    if (existsSync(ENV_FILE)) {
        const content = await readFile(ENV_FILE, 'utf8');
        content.split(/\r?\n/).forEach(line => {
            const trimmedLine = line.trim();
            if (!trimmedLine || trimmedLine.startsWith('#')) return;
            // Handle JSON strings in env vars carefully
            const firstEqual = trimmedLine.indexOf('=');
            if (firstEqual > 0) {
                const key = trimmedLine.substring(0, firstEqual).trim();
                let value = trimmedLine.substring(firstEqual + 1).trim();
                // Aggressively strip ANY surrounding quotes (single or double)
                value = value.replace(/^['"]+/, '').replace(/['"]+$/, '');
                process.env[key] = value;
            }
        });
    }
}

async function fetchGscData() {
    console.log("📊 Authenticating with Google Search Console...");
    
    // In GitHub Actions, GCP_SERVICE_ACCOUNT_KEY will be a JSON string
    const credentialsRaw = process.env.GCP_SERVICE_ACCOUNT_KEY;
    if (!credentialsRaw) {
        throw new Error("Missing GCP_SERVICE_ACCOUNT_KEY environment variable. If testing locally, add it to .env.local");
    }
    
    let credentials;
    try {
        credentials = JSON.parse(credentialsRaw);
    } catch (e) {
        console.error("❌ Failed to parse JSON. Here are the first 50 characters of what was read:");
        console.error(`"${credentialsRaw.substring(0, 50)}..."`);
        throw new Error("GCP_SERVICE_ACCOUNT_KEY is not valid JSON. Ensure it starts with {\"type\":...");
    }
    
    const auth = new google.auth.GoogleAuth({
        credentials,
        scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
    });

    const webmasters = google.webmasters({ version: 'v3', auth });

    // Calculate dates (Last 7 days, excluding today to ensure complete data)
    const endDate = new Date();
    endDate.setDate(endDate.getDate() - 1);
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 7);

    // Make sure siteUrl has trailing slash if it's a URL property, or `sc-domain:` prefix
    const siteUrl = process.env.GSC_SITE_URL || "https://referralverse.in/";

    console.log(`📅 Fetching data for ${siteUrl} from ${startDate.toISOString().split('T')[0]} to ${endDate.toISOString().split('T')[0]}`);

    const res = await webmasters.searchanalytics.query({
        siteUrl: siteUrl,
        requestBody: {
            startDate: startDate.toISOString().split('T')[0],
            endDate: endDate.toISOString().split('T')[0],
            dimensions: ['query', 'page'],
            rowLimit: 50,
        },
    });

    return res.data.rows || [];
}

async function analyzeSeo() {
    await loadEnv();
    
    try {
        const rows = await fetchGscData();
        if (rows.length === 0) {
            console.log("⚠️ No data found in GSC for this period.");
            return;
        }

        console.log(`📡 Found ${rows.length} top queries. Sending to AI for analysis...`);

        const promptText = `
You are an expert SEO analyst. Analyze the following Google Search Console data (top 50 queries & pages) for the last 7 days.
Identify the rising long-tail keywords, look for high impression/low CTR opportunities, and provide exactly 10 actionable recommendations for updating content, titles, or FAQs to improve traffic.
Format the response as a beautiful Markdown report. Start with a brief summary of the traffic.

Data:
${JSON.stringify(rows)}
        `;

        // We set expectJson to false since we want a Markdown report
        const reportMarkdown = await generateWithAI(promptText, false);

        // In GitHub Actions, write to GITHUB_STEP_SUMMARY
        if (process.env.GITHUB_STEP_SUMMARY) {
            const header = `## 📈 Weekly SEO Analysis (${new Date().toISOString().split('T')[0]})\n\n`;
            appendFileSync(process.env.GITHUB_STEP_SUMMARY, header + reportMarkdown + '\n');
            console.log("✅ Report appended to GITHUB_STEP_SUMMARY");
        } else {
            console.log("\n============================================\n");
            console.log("✅ AI Analysis Complete (Local execution):\n");
            console.log(reportMarkdown);
            console.log("\n============================================\n");
        }

    } catch (err) {
        console.error("❌ Error running SEO analysis:", err);
        process.exit(1);
    }
}

analyzeSeo();
