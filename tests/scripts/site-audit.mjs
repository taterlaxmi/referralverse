import fs from 'fs';
import { auditTechnical } from './audit-seo.mjs';
import { auditPerformance } from './audit-performance.mjs';
import { auditAIVisibility } from './audit-ai.mjs';

/**
 * 🚀 ReferralVerse Comprehensive Multi-Page Audit
 */

// Manually load .env.local because standalone node doesn't do it automatically
if (fs.existsSync('.env.local')) {
    const envFile = fs.readFileSync('.env.local', 'utf8');
    envFile.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) process.env[key.trim()] = value.trim().replace(/['"]/g, '');
    });
}

const baseUrl = process.argv[2] || 'https://referralverse.in';
const PAGESPEED_API_KEY = process.env.PAGESPEED_API_KEY || '';
const SERPER_API_KEY = process.env.SERPER_API_KEY || '';

// Define key pages to audit for a representative sample
const pathsToAudit = [
    '/',                                // Home
    '/category/credit-card',            // Category Page
    '/drinkprime-referral-code'         // Post Page
];

async function runFullAudit() {
    console.log(`\n🚀 Starting Multi-Page Audit for: ${baseUrl}`);
    console.log(`📅 Date: ${new Date().toLocaleString('en-IN')}`);
    console.log('--------------------------------------------------');

    const allResults = [];

    for (const path of pathsToAudit) {
        const fullUrl = `${baseUrl.replace(/\/$/, '')}${path}`;
        console.log(`\n🔍 Auditing: ${path}`);
        
        const result = {
            path,
            url: fullUrl,
            technical: await auditTechnical(fullUrl),
            performance: await auditPerformance(fullUrl, PAGESPEED_API_KEY),
            aiVisibility: path === '/' ? await auditAIVisibility(fullUrl, SERPER_API_KEY) : null,
        };
        
        allResults.push(result);
    }

    // Save consolidated report for runTest.mjs (GitHub Summary)
    fs.writeFileSync('seo-audit-results.json', JSON.stringify({ 
        baseUrl, 
        date: new Date().toISOString(),
        pages: allResults 
    }, null, 2));
    
    console.log('\n✅ Consolidated results saved to seo-audit-results.json');
    generateSummaryReport(allResults);
}

function generateSummaryReport(pages) {
    console.log('\n--- 📊 AUDIT SUMMARY ---');
    
    pages.forEach(res => {
        console.log(`\n📄 Page: ${res.path}`);
        console.log(`Title: ${res.technical.title?.substring(0, 50)}...`);
        const schema = res.technical.schema;
        console.log(`Schema: FAQ:${schema.faq?'✅':'❌'} | BREADCRUMB:${schema.breadcrumb?'✅':'❌'} | PRODUCT:${schema.product?'✅':'❌'} | HOWTO:${schema.howto?'✅':'❌'} | LIST:${schema.itemList?'✅':'❌'}`);
        
        if (res.performance && !res.performance.error) {
            console.log(`Performance Score: ${res.performance.score} (LCP: ${res.performance.lcp})`);
        }
    });

    console.log('\n✅ Multi-page Audit Complete.');
}

runFullAudit().catch(console.error);
