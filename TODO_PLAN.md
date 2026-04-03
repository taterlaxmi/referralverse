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

## 🏃‍♂️ Phase 1: End-to-End Testing (Current Priority)

Now that Vitest covers our unit and logic tests, we must ensure the interface actually works for users.

*   [ ] **Set up Playwright**: Initialize Playwright in the project (`npm init playwright@latest`).
*   [ ] **Test Home Feed interactions**: Write tests verifying that changing category filters updates the feed accurately.
*   [ ] **Test Search functionality**: Verify the search bar filters down referral cards.
*   [ ] **Test Referral Code Copy**: Write a test executing the "Copy Code" button and assert clipboard content matches.
*   [ ] **Integrate E2E with CI**: Add a Playwright run to GitHub Actions (`verify-site.yml`).

---

## ✨ Phase 2: UI/UX & Content Polish

*   [ ] **Refine Empty States:** Add a clear, user-friendly empty state when search or filters return 0 results (e.g. "No referral codes found for this category").
*   [ ] **Add Loading Skeletons:** Ensure loading states (especially for Next.js Suspense boundaries) look like the content structure to avoid layout shift.
*   [ ] **Interactive Hover states:** Add subtle CSS transforms and shadow transitions to the referral cards to make the interface feel more premium.

---

## 📈 Phase 3: Growth & Aggregation Automation (Upcoming)

*   [ ] **Automated Data Fetching (Reddit/Telegram):** Finalize and deploy the GitHub Action that aggregates new codes.
*   [ ] **RSS Feed Generation:** Automatically build an `rss.xml` feed based on the latest codes to help users and aggregators subscribe.
*   [ ] **Google Search Console monitoring:** Verify domain indexing standing and watch to see if duplicate URL warnings drop.
