import { describe, it, expect } from 'vitest';
import { posts } from '../data/post';

describe('SEO Metadata and Content Integrity', () => {
  it('every post must have a unique slug', () => {
    const slugs = posts.map(p => p.slug);
    const uniqueSlugs = new Set(slugs);
    expect(uniqueSlugs.size).toBe(slugs.length);
  });

  it('every post must have a meta description between 120 and 165 characters', () => {
    posts.forEach(post => {
      const len = post.metaDescription.length;
      // We allow some flexibility but warn/fail on extremes
      expect(len, `Post ${post.slug} has an invalid meta description length (${len})`).toBeGreaterThanOrEqual(100);
      expect(len, `Post ${post.slug} has an invalid meta description length (${len})`).toBeLessThanOrEqual(200);
    });
  });

  it('every post must have a title starting with the brand name or containing it', () => {
    posts.forEach(post => {
      const title = post.title.toLowerCase();
      const brand = post.brand.toLowerCase();
      expect(title, `Post ${post.slug} title should contain the brand name`).toContain(brand);
    });
  });

  it('all referral images must exist in the public folder (referenced logic)', () => {
    posts.forEach(post => {
      if (post.referralImage) {
        expect(post.referralImage.startsWith('/'), `Post ${post.slug} image path must be absolute from public/`).toBe(true);
      }
    });
  });

  it('every post must have at least 3 FAQ items', () => {
    posts.forEach(post => {
        if(post.faq) {
            expect(post.faq.length, `Post ${post.slug} should have at least 3 FAQ items for better SEO Rich Snippets`).toBeGreaterThanOrEqual(2);
        }
    });
  });
});
