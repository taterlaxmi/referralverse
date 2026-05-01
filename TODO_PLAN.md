# ReferralVerse: Updated Action Plan & Strategy

This updated plan reflects the completion of our primary SEO, performance, and unit-testing milestones. Our focus now shifts to finalizing E2E safety (Playwright), UI/UX Polish, and long-term content strategies.

---

## ✅ Completed Milestones
*   **SEO & Structure:** Sitemap fixed (stripped `/posts/`), Duplicate URLs resolved, canonicals enforced.
*   **Performance:** High-res PNG logo replaced with optimized 15KB WebP, improving LCP.
*   **Accessibility:** Added `sr-only` descriptive context to "Read more" links for better screen-reader compatibility.
*   **Unit Testing:** `Vitest` and `JSDOM` successfully configured. Created unit tests covering SEO metadata and sitemap logc.
*   **CI/CD Pipeline:** Lighthouse CI set up and integrated into GitHub actions for PR-level Core Web Vitals checks.
*   **UI/UX:** Migrated to URL-based pagination (`?page=X`) with `Suspense` for crawler indexing.

---

## ✅ Phase 2: Schema & E-E-A-T Optimization (Completed)

*   [x] **Audit Existing Schema:** Verified `HowTo`, `Offer`, `FAQ`, and `Breadcrumb` presence on post pages.
*   [x] **Home Page ItemList:** Added `ItemList` structured data to the home page with pagination support.
*   [x] **Post Schema Consolidation:** Refactored schemas into a single linked graph using `@id` and specialized nesting (`FinancialProduct`/`SoftwareApplication`).
*   [x] **Author & Publisher Markup:** Linked the `Organization` schema to all posts for improved E-E-A-T.
*   [x] **Schema Verification Tests:** Implemented 14 automated Vitest checks covering data and logic.
*   [x] **Dynamic Schema Ratings:** Logic implemented and integrated into `post.ts`. Posts can now define their own ratings or fallback to defaults.
*   [x] **Final Schema Refinement:** Refactored Product IDs, enforced absolute URLs, and added `SearchAction`/`WebPage` to home page for maximum rich result eligibility.

---

## 🏃‍♂️ Phase 3: UI/UX & Reliability

*   [/] **Set up Playwright**: Initial configuration started. Need to finalize E2E test suites for critical user flows.
*   [/] **Refine Empty States:** Basic logic exists; need to add high-quality "Results not found" illustrations and suggestions.
*   [/] **Add Loading Skeletons:** Implement shimmer effects for the post grid during pagination/filtering.
*   [ ] **Internal Linking Strategy:** Implement contextual and structural linking to boost SEO siloing and user engagement.
    *   [x] **Related Offers Component:** Add a "Related Referrals" section to the bottom of post pages based on shared categories/tags.
    *   [ ] **Contextual In-Content Links:** Interlink relevant posts directly within the markdown content (e.g., link "SuperMoney" inside a "Slice" article).
    *   [ ] **Category/Hub Pages:** Create index pages for main categories (Finance, Software) and link tags from individual posts to these hubs. *(Note: Update the `/?q=${category}` link in `Breadcrumbs.tsx` to point to these new hub pages once completed).*
    *   [x] **Breadcrumb Navigation:** Add visual breadcrumb links (Home > Category > Title) at the top of post pages to improve UX and retention.

---

## 📈 Phase 4: Growth & Aggregation Automation (Upcoming)

*   [x] **Automated Data Fetching**: Deployed GitHub Action (`fetch-reddit-deals.yml`) to aggregate community codes.
*   [ ] **RSS Feed Generation**: Build `rss.xml` for automated content distribution.
*   [/] **Google Search Console monitoring**: Service account configured; awaiting initial indexing data for SEO analysis.
