import fs from 'fs';
import { auditTechnical } from './auditors/seo.mjs';
import { auditPerformance } from './auditors/performance.mjs';
import { auditAIVisibility } from './auditors/ai.mjs';
import { collectFailures } from './lib/utils.mjs';
import { pathsToAudit, aiAuditConfig } from './config.mjs';

if (fs.existsSync('.env.local')) {
  const envFile = fs.readFileSync('.env.local', 'utf8');
  envFile.split('\n').forEach((line) => {
    const [key, value] = line.split('=');
    if (key && value) process.env[key.trim()] = value.trim().replace(/['"]/g, '');
  });
}

const baseUrl = process.argv[2] || 'https://referralverse.in';
const PAGESPEED_API_KEY = process.env.PAGESPEED_API_KEY || '';
const SERPER_API_KEY = process.env.SERPER_API_KEY || '';

async function runFullAudit() {
  console.log(`\nStarting Multi-Page Audit for: ${baseUrl}`);
  console.log(`Date: ${new Date().toLocaleString('en-IN')}`);
  console.log('--------------------------------------------------');

  const allResults = [];
  const crossPageIssues = [];

  for (const path of pathsToAudit) {
    const fullUrl = `${baseUrl.replace(/\/$/, '')}${path}`;
    console.log(`\nAuditing: ${path}`);

    const aiQueries = aiAuditConfig[path];
    const result = {
      path,
      url: fullUrl,
      technical: await auditTechnical(fullUrl, path),
      performance: await auditPerformance(fullUrl, PAGESPEED_API_KEY),
      aiVisibility: aiQueries
        ? await auditAIVisibility(fullUrl, SERPER_API_KEY, aiQueries)
        : null,
    };

    allResults.push(result);
  }

  const titles = allResults.map((r) => ({
    path: r.path,
    title: r.technical?.title,
  }));
  const titleGroups = {};
  for (const { path, title } of titles) {
    if (!title || title === 'MISSING') continue;
    if (!titleGroups[title]) titleGroups[title] = [];
    titleGroups[title].push(path);
  }
  for (const [title, paths] of Object.entries(titleGroups)) {
    if (paths.length > 1) {
      crossPageIssues.push(`Duplicate title "${title}" on: ${paths.join(', ')}`);
    }
  }

  const canonicals = allResults.map((r) => ({
    path: r.path,
    canonical: r.technical?.canonical,
  }));
  const canonicalGroups = {};
  for (const { path, canonical } of canonicals) {
    if (!canonical || canonical === 'MISSING') continue;
    if (!canonicalGroups[canonical]) canonicalGroups[canonical] = [];
    canonicalGroups[canonical].push(path);
  }
  for (const [canonical, paths] of Object.entries(canonicalGroups)) {
    if (paths.length > 1) {
      crossPageIssues.push(`Duplicate canonical "${canonical}" on: ${paths.join(', ')}`);
    }
  }

  const failures = [...collectFailures(allResults), ...crossPageIssues];
  const passed = failures.length === 0;

  fs.writeFileSync(
    'seo-audit-results.json',
    JSON.stringify(
      {
        baseUrl,
        date: new Date().toISOString(),
        passed,
        failures,
        pages: allResults,
      },
      null,
      2,
    ),
  );

  console.log('\nConsolidated results saved to seo-audit-results.json');
  generateSummaryReport(allResults, failures, passed);

  if (!passed) {
    console.error('\nAUDIT FAILED:');
    failures.forEach((f) => console.error(`  - ${f}`));
    process.exit(1);
  }

  console.log('\nMulti-page Audit Complete — all checks passed.');
}

function generateSummaryReport(pages, failures, passed) {
  console.log('\n--- AUDIT SUMMARY ---');
  console.log(`Overall: ${passed ? 'PASS' : 'FAIL'}`);

  pages.forEach((res) => {
    console.log(`\nPage: ${res.path}`);
    console.log(`Title: ${res.technical.title?.substring(0, 60)}`);
    console.log(`Technical: ${res.technical.passed ? 'PASS' : 'FAIL'}`);

    const schema = res.technical.schema || {};
    console.log(
      `Schema: BREADCRUMB:${schema.breadcrumb ? 'OK' : 'NO'} | PRODUCT:${schema.product ? 'OK' : 'NO'} | HOWTO:${schema.howto ? 'OK' : 'NO'} | LIST:${schema.itemList ? 'OK' : 'NO'}`,
    );

    if (res.performance && !res.performance.skipped && !res.performance.error) {
      console.log(
        `Performance: ${res.performance.passed ? 'PASS' : 'FAIL'} — Score ${res.performance.score} | LCP ${res.performance.lcp} | CLS ${res.performance.cls} | FCP ${res.performance.fcp}`,
      );
    }
  });

  if (failures.length > 0) {
    console.log('\nFailures:');
    failures.forEach((f) => console.log(`  - ${f}`));
  }
}

runFullAudit().catch((err) => {
  console.error(err);
  process.exit(1);
});
