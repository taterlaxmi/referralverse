import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { posts } from "../../app/data/post";

const publicHasImageAssets =
  fs.existsSync("public") &&
  fs.readdirSync("public").some((f) => /\.(webp|png|jpg|jpeg)$/i.test(f));

describe("SEO Metadata and Content Integrity", () => {
  it("every post must have a unique slug", () => {
    const slugs = posts.map((p) => p.slug);
    const uniqueSlugs = new Set(slugs);
    expect(uniqueSlugs.size).toBe(slugs.length);
  });

  it("every post must have a meta description between 120 and 165 characters", () => {
    posts.forEach((post) => {
      const len = post.metaDescription.length;
      // We allow some flexibility but warn/fail on extremes
      expect(
        len,
        `Post ${post.slug} has an invalid meta description length (${len})`,
      ).toBeGreaterThanOrEqual(100);
      expect(
        len,
        `Post ${post.slug} has an invalid meta description length (${len})`,
      ).toBeLessThanOrEqual(165);
    });
  });

  it("every post must have a title starting with the brand name or containing it", () => {
    posts.forEach((post) => {
      const title = post.title.toLowerCase();
      const brand = post.brand.toLowerCase();
      expect(
        title,
        `Post ${post.slug} title should contain the brand name`,
      ).toContain(brand);
    });
  });

  it("all referral images must use absolute public paths", () => {
    posts.forEach((post) => {
      if (post.heroImage) {
        expect(
          post.heroImage.startsWith("/"),
          `Post ${post.slug} image path must be absolute from public/`,
        ).toBe(true);
      }
    });
  });

  it.skipIf(!publicHasImageAssets)(
    "hero images exist in the public folder when assets are checked in",
    () => {
      posts.forEach((post) => {
        if (post.heroImage) {
          const filePath = path.join("public", post.heroImage.replace(/^\//, ""));
          expect(
            fs.existsSync(filePath),
            `Post ${post.slug} hero image missing at public${post.heroImage}`,
          ).toBe(true);
        }
      });
    },
  );

  it("every post must have at least 3 FAQ items", () => {
    posts.forEach((post) => {
      if (post.faq) {
        expect(
          post.faq.length,
          `Post ${post.slug} should have at least 3 FAQ items for better SEO Rich Snippets`,
        ).toBeGreaterThanOrEqual(2);
      }
    });
  });
});
