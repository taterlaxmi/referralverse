import fs from 'fs';
import path from 'path';

const lhciDir = '.lighthouseci';
const linksFile = path.join(lhciDir, 'links.json');
const vitestFile = 'vitest-results.json';
const seoAuditFile = 'seo-audit-results.json';

async function run() {
  let fullSummary = '';

  // 1. Vitest Summary
  if (fs.existsSync(vitestFile)) {
    try {
      const data = JSON.parse(fs.readFileSync(vitestFile, 'utf8'));
      fullSummary += '## ✅ Vitest Test Report\n\n';
      fullSummary += '### Summary\n';
      fullSummary += `- **Test Files:** ${data.numTotalTestSuites === data.numPassedTestSuites ? '✅' : '❌'} ${data.numPassedTestSuites} passes · ${data.numTotalTestSuites} total\n`;
      fullSummary += `- **Test Results:** ${data.numTotalTests === data.numPassedTests ? '✅' : '❌'} ${data.numPassedTests} passes · ${data.numTotalTests} total\n\n`;

      if (data.testResults && Array.isArray(data.testResults)) {
        fullSummary += '#### Test Suites Breakdown\n';
        data.testResults.forEach(suite => {
          const isPassed = suite.status === 'passed';
          const name = suite.name.split('/').pop() || suite.name;
          fullSummary += `- ${isPassed ? '✅' : '❌'} **${name}**\n`;
          
          if (!isPassed && suite.assertionResults) {
            suite.assertionResults.forEach(test => {
              if (test.status === 'failed') {
                fullSummary += `  - ❌ *${test.title}*\n`;
              }
            });
          }
        });
        fullSummary += '\n';
      }

      fullSummary += '---\n\n';
    } catch (e) {
      console.error('Error parsing Vitest results:', e);
    }
  }

  // 1b. SEO & AI Audit Summary
  if (fs.existsSync(seoAuditFile)) {
    try {
      const data = JSON.parse(fs.readFileSync(seoAuditFile, 'utf8'));
      fullSummary += '## 🔍 Multi-Page SEO & AI Audit\n\n';
      
      data.pages.forEach(page => {
        fullSummary += `### 📄 Page: \`${page.path}\`\n`;
        fullSummary += `| Metric | Result |\n| :--- | :--- |\n`;
        fullSummary += `| **Title** | ${page.technical.title} |\n`;
        fullSummary += `| **H1** | ${page.technical.h1} |\n`;
        fullSummary += `| **Canonical** | ${page.technical.canonical} |\n`;
        fullSummary += `| **Schema** | ${Object.entries(page.technical.schema).filter(([k]) => page.technical.schema[k]).map(([k]) => k.toUpperCase()).join(' · ') || '❌ None'} |\n`;
        
        if (page.performance && !page.performance.error) {
            fullSummary += `| **Speed Score** | ${page.performance.score} (LCP: ${page.performance.lcp}) |\n`;
        }
        fullSummary += '\n';

        if (page.aiVisibility) {
            fullSummary += '#### 🤖 AI Overview Visibility (GEO)\n';
            fullSummary += '| Query | Cited in AI | Organic Rank |\n| :--- | :---: | :---: |\n';
            page.aiVisibility.forEach(v => {
                fullSummary += `| ${v.query} | ${v.citedInAI} | ${v.organicRank} |\n`;
            });
            fullSummary += '\n';
        }
      });
      fullSummary += '---\n\n';
    } catch (e) {
      console.error('Error parsing SEO audit results:', e);
    }
  }

  // 2. Lighthouse Summary
  fullSummary += '## ⚡ Lighthouse Audit Summary\n\n';

  if (fs.existsSync(linksFile)) {
    try {
      const links = JSON.parse(fs.readFileSync(linksFile, 'utf8'));
      const files = fs.readdirSync(lhciDir).filter(f => f.endsWith('.json') && f.startsWith('lhr-'));

      if (files.length === 0) {
        fullSummary += 'No Lighthouse reports found in .lighthouseci directory.\n';
      } else {
        // Group by URL and take the latest
        const reportsByUrl = {};
        for (const file of files) {
          const data = JSON.parse(fs.readFileSync(path.join(lhciDir, file), 'utf8'));
          const url = data.requestedUrl || data.finalUrl;
          if (!reportsByUrl[url] || data.fetchTime > reportsByUrl[url].fetchTime) {
            reportsByUrl[url] = data;
          }
        }

        fullSummary += '| URL | Performance | Accessibility | Best Practices | SEO | Report |\n';
        fullSummary += '| :--- | :---: | :---: | :---: | :---: | :---: |\n';

        for (const url in reportsByUrl) {
          const report = reportsByUrl[url];
          const getScore = (id) => {
            const score = report.categories[id]?.score;
            if (score === null || score === undefined) return 'N/A';
            const val = Math.round(score * 100);
            const emoji = val >= 90 ? '🟢' : val >= 50 ? '🟠' : '🔴';
            return `${emoji} ${val}`;
          };

          const displayUrl = url.replace('http://localhost:3000', '') || '/';
          const link = links[url] || links[report.finalUrl] || '#';
          fullSummary += `| ${displayUrl} | ${getScore('performance')} | ${getScore('accessibility')} | ${getScore('best-practices')} | ${getScore('seo')} | [View Report](${link}) |\n`;
        }
      }
    } catch (e) {
      fullSummary += `Error parsing Lighthouse results: ${e.message}\n`;
    }
  } else {
    fullSummary += 'No Lighthouse links found. Make sure lhci upload is configured.\n';
  }

  if (process.env.GITHUB_STEP_SUMMARY) {
    fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, fullSummary);
    console.log('Summary appended to GITHUB_STEP_SUMMARY');
  } else {
    console.log('GITHUB_STEP_SUMMARY not defined. Outputting to console:\n');
    console.log(fullSummary);
  }
}

run().catch(console.error);
