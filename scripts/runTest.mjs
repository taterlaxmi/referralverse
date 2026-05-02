import fs from 'fs';
import path from 'path';

const lhciDir = '.lighthouseci';
const linksFile = path.join(lhciDir, 'links.json');
const vitestFile = 'vitest-results.json';

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
      fullSummary += '---\n\n';
    } catch (e) {
      console.error('Error parsing Vitest results:', e);
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
