# ReferralVerse 🚀

A high-performance referral offers directory built with **Next.js**, **React**, and **TypeScript**. Optimized for SEO, core web vitals, and accessibility.

---

## 🛠 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **SEO/Sitemap:** [next-sitemap](https://github.com/iamvishnusankar/next-sitemap)
- **Testing:** [Vitest](https://vitest.dev/) & [Playwright](https://playwright.dev/)
- **Audit:** [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)

---

## 📁 Key Folder Structure

- `app/`: Main application logic and routes.
  - `components/`: UI components (Header, Footer, FAQ, etc.).
  - `data/`: Centralized store for all referral post data.
  - `posts/[slug]/`: Generated individual offer landing pages.
- `scripts/`: Data fetching automation.
- `public/`: Optimized static assets (WebP format).

---

## ✅ Quality Assurance & Testing

### 1. Unit Tests (SEO & Data)
Automated verification of metadata and content integrity.
```bash
npm test
```

### 2. Lighthouse Audit
Automated performance and accessibility audits.
```bash
npx lhci autorun
```

### 3. Case-Insensitive Search & Filtering
The offer feed supports dynamic search and category filtering with URL-based pagination for SEO friendliness.

---

## 🚀 Getting Started (Local Development)

1. **Clone & Install:**
   ```bash
   git clone https://github.com/your-username/referralverse.git
   npm install
   ```

2. **Development:**
   ```bash
   npm run dev
   ```

3. **Build & Build Info:**
   ```bash
   npm run build
   ```

---

## 🤖 GitHub Automation & Workflows

This project uses GitHub Actions to automate site health, SEO analysis, and data fetching.

### 🛡️ Site Health & Quality
| Workflow | Description | Trigger |
| :--- | :--- | :--- |
| **Site Health Check** | Runs Unit Tests, Build check, and Lighthouse Audit. | Daily @ Midnight & Every Push/PR |
| **Code Quality** | Checks for linting errors and code formatting. | Every Push/PR to `main` |
| **Lighthouse CI** | Deep performance audit using Lighthouse. | Daily @ Midnight & Every Push |

### 🔍 SEO & Data Automation
| Workflow | Description | Trigger |
| :--- | :--- | :--- |
| **Weekly SEO Analysis**| Fetches GSC data and uses AI (Gemini/Groq) to suggest SEO improvements. | Every Sunday @ 2 AM UTC |
| **Fetch Reddit Deals** | Scrapes top referral subreddits for new community deals. | 22nd of every month |

### 🔒 Security & Maintenance
| Workflow | Description | Trigger |
| :--- | :--- | :--- |
| **Security Audit** | Scans NPM packages for high-level security vulnerabilities. | Every Monday @ Midnight UTC |
| **Dependabot** | Automatically manages dependency updates (Major versions only). | Weekly |
