import { describe, it, expect } from 'vitest';
import { posts } from '../data/post';
import * as schemaUtils from '../utils/schema';
import { Category } from '../types';

describe('Structured Data (Schema) Integrity', () => {

    describe('Data Requirements for Schema', () => {
        it('every post must have a valid offer price (>= 0)', () => {
            posts.forEach(post => {
                expect(post.offer.price, `Post ${post.slug} missing valid offer price`).toBeDefined();
                expect(post.offer.price, `Post ${post.slug} has negative price`).toBeGreaterThanOrEqual(0);
            });
        });

        it('every post must have at least 3 steps for the HowTo schema', () => {
            posts.forEach(post => {
                expect(post.steps.length, `Post ${post.slug} should have at least 3 steps for a valid HowTo guide`).toBeGreaterThanOrEqual(3);
            });
        });

        it('every post must have a non-empty brand name', () => {
            posts.forEach(post => {
                expect(post.brand, `Post ${post.slug} missing brand name`).toBeTruthy();
            });
        });

        it('every post must have a meta description that is not just the summary', () => {
            posts.forEach(post => {
                expect(post.metaDescription, `Post ${post.slug} metaDescription is identical to summary`).not.toBe(post.summary);
            });
        });
    });

    describe('Schema Generator Logic', () => {
        const samplePost = posts[0];

        it('getHowToSchema generates valid HowTo structure', () => {
            const schema = schemaUtils.getHowToSchema(samplePost);
            expect(schema['@type']).toBe('HowTo');
            expect(schema.step.length).toBe(samplePost.steps.length);
            expect(schema['@id']).toContain('#howto');
        });

        it('getOfferSchema uses correct Entity nesting', () => {
            const financePost = posts.find(p => p.category === Category.Finance) || samplePost;
            const schema = schemaUtils.getOfferSchema(financePost);

            if (financePost.category === Category.Finance) {
                expect(schema['@type']).toBe('FinancialProduct');
            } else {
                expect(schema['@type']).toBe('SoftwareApplication');
            }

            expect(schema.offers).toBeDefined();
            expect(schema.offers['@type']).toBe('Offer');
            expect(schema.offers.offeredBy['@id']).toBe('https://referralverse.in/#organization');
        });

        it('getFaqSchema maps all post FAQs correctly', () => {
            const postWithFaq = posts.find(p => p.faq && p.faq.length > 0) || samplePost;
            const schema = schemaUtils.getFaqSchema(postWithFaq);
            expect(schema['@type']).toBe('FAQPage');
            // Base 4 questions + referral code + custom FAQs
            const expectedLength = 4 + 1 + (postWithFaq.faq?.length || 0);
            expect(schema.mainEntity.length).toBe(expectedLength);
        });

        it('getFaqSchema generates correct referral code/link FAQ based on single code, multiple codes, or links', () => {
            // Case 1: Single string code
            const postSingle = { ...samplePost, referralCode: 'SINGLE123', referralLink: '' };
            const schemaSingle = schemaUtils.getFaqSchema(postSingle);
            const faqSingle = schemaSingle.mainEntity.find((q: any) => q['@id'].includes('#referral-code'));
            expect(faqSingle.name).toBe(`What is the ${samplePost.brand} referral code?`);
            expect(faqSingle.acceptedAnswer.text).toContain('SINGLE123');

            // Case 2: Array of codes
            const postArray = { ...samplePost, referralCode: ['CODE1', 'CODE2'], referralLink: '' };
            const schemaArray = schemaUtils.getFaqSchema(postArray);
            const faqArray = schemaArray.mainEntity.find((q: any) => q['@id'].includes('#referral-code'));
            expect(faqArray.name).toBe(`What are the active ${samplePost.brand} referral codes?`);
            expect(faqArray.acceptedAnswer.text).toContain('CODE1, CODE2');

            // Case 3: Empty code but has link
            const postLinkOnly = { ...samplePost, referralCode: [], referralLink: 'https://link.com' };
            const schemaLinkOnly = schemaUtils.getFaqSchema(postLinkOnly);
            const faqLinkOnly = schemaLinkOnly.mainEntity.find((q: any) => q['@id'].includes('#referral-link'));
            expect(faqLinkOnly).toBeDefined();
            expect(faqLinkOnly.acceptedAnswer.text).toContain('does not provide a manual referral code');
            expect(faqLinkOnly.acceptedAnswer.text).toContain('referral link');
        });

        it('getItemListSchema correctly assigns positions', () => {
            const startIndex = 10;
            const schema = schemaUtils.getItemListSchema(posts.slice(0, 3), startIndex);
            expect(schema['@type']).toBe('ItemList');
            expect(schema.itemListElement[0].position).toBe(11);
            expect(schema.itemListElement[2].position).toBe(13);
        });
    });

    describe('Cross-Linking Entity Checks', () => {
        it('Organization schema has a stable @id', () => {
            const schema = schemaUtils.getOrganizationSchema();
            expect(schema['@id']).toBe('https://referralverse.in/#organization');
        });
    });
});
