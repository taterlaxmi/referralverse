import fs from 'fs';
import path from 'path';

const lhciDir = '.lighthouseci';
const linksFile = path.join(lhciDir, 'links.json');
const vitestFile = 'vitest-results.json';
const seoAuditFile = 'seo-audit-results.json';

function schemaLabel(schema) {
  if (!schema) return 'None';
  return (
    Object.entries(schema)
      .filter(([, v]) => v)
      .map(([k]) => k.toUpperCase())
      .join(' · ') || 'None'
  );
}

async function run() {
  let fullSummary = '';
  let vitestPassed = null;
  let seoPassed = null;
  let lighthouseOk = null;

  if (fs.existsSync(vitestFile)) {
    try {
      const data = JSON.parse(fs.readFileSync(vitestFile, 'utf8'));
      vitestPassed =
        data.numTotalTestSuites === data.numPassedTestSuites &&
        data.numTotalTests === data.numPassedTests;

      fullSummary += '## Vitest Test Report\n\n';
      fullSummary += '### Summary\n';
      fullSummary += `- **Test Files:** ${vitestPassed ? 'PASS' : 'FAIL'} ${data.numPassedTestSuites} passes · ${data.numTotalTestSuites} total\n`;
      fullSummary += `- **Test Results:** ${vitestPassed ? 'PASS' : 'FAIL'} ${data.numPassedTests} passes · ${data.numTotalTests} total\n\n`;

      if (data.testResults && Array.isArray(data.testResults)) {
        fullSummary += '#### Test Suites Breakdown\n';
        data.testResults.forEach((suite) => {
          const isPassed = suite.status === 'passed';
          const name = suite.name.split('/').pop() || suite.name;
          fullSummary += `- ${isPassed ? 'PASS' : 'FAIL'} **${name}**\n`;

          if (!isPassed && suite.assertionResults) {
            suite.assertionResults.forEach((test) => {
              if (test.status === 'failed') {
                fullSummary += `  - FAIL *${test.title}*\n`;
              }
            });
          }
        });
        fullSummary += '\n';
      }

      fullSummary += '---\n\n';
    } catch (e) {
      console.error('Error parsing Vitest results:', e);
      fullSummary += '## Vitest Test Report\n\nError parsing vitest-results.json\n\n---\n\n';
    }
  } else {
    fullSummary += '## Vitest Test Report\n\n**Warning:** vitest-results.json not found — unit-tests job may have failed before upload.\n\n---\n\n';
  }

  if (fs.existsSync(seoAuditFile)) {
    try {
      const data = JSON.parse(fs.readFileSync(seoAuditFile, 'utf8'));
      seoPassed = data.passed !== false;

      fullSummary += '## Multi-Page SEO & AI Audit\n\n';
      fullSummary += `**Audit status:** ${seoPassed ? 'PASS' : 'FAIL'}\n\n`;

      if (data.failures?.length) {
        fullSummary += '### Failures\n';
        data.failures.forEach((f) => {
          fullSummary += `- ${f}\n`;
        });
        fullSummary += '\n';
      }

      data.pages.forEach((page) => {
        const tech = page.technical || {};
        fullSummary += `### Page: \`${page.path}\`\n`;
        fullSummary += '| Metric | Result |\n| :--- | :--- |\n';
        fullSummary += `| **Passed** | ${tech.passed ? 'PASS' : 'FAIL'} |\n`;
        fullSummary += `| **Title** | ${tech.title || 'N/A'} |\n`;
        fullSummary += `| **H1** | ${tech.h1 || 'N/A'} |\n`;
        fullSummary += `| **Canonical** | ${tech.canonical || 'N/A'} |\n`;
        fullSummary += `| **Meta desc** | ${tech.metaDescriptionLength ?? 'N/A'} chars |\n`;
        fullSummary += `| **OG** | ${tech.openGraph?.title ? 'Present' : 'Missing'} |\n`;
        fullSummary += `| **Breadcrumb** | ${tech.checks?.breadcrumbSlug?.pass ? 'PASS' : 'FAIL'} |\n`;
        fullSummary += `| **Schema** | ${schemaLabel(tech.schema)} |\n`;

        if (page.performance && !page.performance.skipped && !page.performance.error) {
          fullSummary += `| **Performance** | ${page.performance.passed ? 'PASS' : 'FAIL'} — Score ${page.performance.score} |\n`;
          fullSummary += `| **CWV** | LCP ${page.performance.lcp} · CLS ${page.performance.cls} · FCP ${page.performance.fcp} |\n`;
        }
        fullSummary += '\n';

        if (page.aiVisibility) {
          fullSummary += '#### AI Overview Visibility (informational)\n';
          fullSummary += '| Query | Cited in AI | Organic position |\n| :--- | :---: | :---: |\n';
          page.aiVisibility.forEach((v) => {
            const pos = v.organicPosition ?? (v.error ? 'Error' : '—');
            fullSummary += `| ${v.query} | ${v.citedInAI || '—'} | ${pos} |\n`;
          });
          fullSummary += '\n';
        }
      });
      fullSummary += '---\n\n';
    } catch (e) {
      console.error('Error parsing SEO audit results:', e);
      fullSummary += '## Multi-Page SEO & AI Audit\n\nError parsing seo-audit-results.json\n\n---\n\n';
    }
  } else {
    fullSummary += '## Multi-Page SEO & AI Audit\n\n**Warning:** seo-audit-results.json not found — seo-tests job may have failed before upload.\n\n---\n\n';
  }

  fullSummary += '## Lighthouse Audit Summary\n\n';

  if (fs.existsSync(linksFile)) {
    try {
      const links = JSON.parse(fs.readFileSync(linksFile, 'utf8'));
      const files = fs.readdirSync(lhciDir).filter((f) => f.endsWith('.json') && f.startsWith('lhr-'));

      if (files.length === 0) {
        fullSummary += 'No Lighthouse reports found in .lighthouseci directory.\n';
        lighthouseOk = false;
      } else {
        const reportsByUrl = {};
        for (const file of files) {
          const reportData = JSON.parse(fs.readFileSync(path.join(lhciDir, file), 'utf8'));
          const url = reportData.requestedUrl || reportData.finalUrl;
          if (!reportsByUrl[url] || reportData.fetchTime > reportsByUrl[url].fetchTime) {
            reportsByUrl[url] = reportData;
          }
        }

        fullSummary += '| URL | Performance | Accessibility | Best Practices | SEO | Report |\n';
        fullSummary += '| :--- | :---: | :---: | :---: | :---: | :---: |\n';

        let lowPerf = false;
        for (const url in reportsByUrl) {
          const report = reportsByUrl[url];
          const getScore = (id) => {
            const score = report.categories[id]?.score;
            if (score === null || score === undefined) return 'N/A';
            const val = Math.round(score * 100);
            if (id === 'performance' && val < 90) lowPerf = true;
            return val >= 90 ? `PASS ${val}` : `FAIL ${val}`;
          };

          const displayUrl = url.replace('https://referralverse.in', '').replace('http://localhost:3000', '') || '/';
          const link = links[url] || links[report.finalUrl] || '#';
          fullSummary += `| ${displayUrl} | ${getScore('performance')} | ${getScore('accessibility')} | ${getScore('best-practices')} | ${getScore('seo')} | [View Report](${link}) |\n`;
        }
        lighthouseOk = !lowPerf;
      }
    } catch (e) {
      fullSummary += `Error parsing Lighthouse results: ${e.message}\n`;
      lighthouseOk = false;
    }
  } else {
    fullSummary += '**Warning:** No Lighthouse links found — lighthouse-tests job may have failed or upload is not configured.\n';
    lighthouseOk = false;
  }

  const overallPass =
    (vitestPassed === null || vitestPassed) &&
    (seoPassed === null || seoPassed) &&
    (lighthouseOk === null || lighthouseOk);

  const overallBlock = `## Overall: ${overallPass ? 'PASS' : 'FAIL'}\n\n`;
  fullSummary = overallBlock + fullSummary;

  if (process.env.GITHUB_STEP_SUMMARY) {
    fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, fullSummary);
    console.log('Summary appended to GITHUB_STEP_SUMMARY');
  } else {
    console.log('GITHUB_STEP_SUMMARY not defined. Outputting to console:\n');
    console.log(fullSummary);
  }
}

run().catch(console.error);
