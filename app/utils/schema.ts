import { Post } from '../types';

/**
 * Normalizes FAQ answers (string | string[] | table) into a single string for JSON-LD
 */
export function formatFaqAnswer(answer: any): string {
    if (!answer) return "";

    // String
    if (typeof answer === "string") return answer;

    // Array → sentence
    if (Array.isArray(answer)) {
        return answer.join(" ");
    }

    // Table → natural sentence
    if (answer.headers && answer.rows) {
        return answer.rows
            .map((row: string[]) => {
                return `${row[0]} plan starts at ${row[1]} per month and includes ${row[2]}.`;
            })
            .join(" ");
    }

    return "";
}

export function getOrganizationSchema() {
    return {
        "@type": "Organization",
        "@id": "https://referralverse.in/#organization",
        "name": "ReferralVerse",
        "url": "https://referralverse.in",
        "logo": "https://referralverse.in/logo.webp",
        "sameAs": [
            "https://twitter.com/referralverse"
        ]
    };
}

export function getWebSiteSchema() {
    return {
        "@type": "WebSite",
        "@id": "https://referralverse.in/#website",
        "url": "https://referralverse.in",
        "name": "ReferralVerse",
        "description": "Find top referral offers, coupons and promo codes curated for travel, finance, food and lifestyle.",
        "publisher": { "@id": "https://referralverse.in/#organization" },
        "potentialAction": {
            "@type": "SearchAction",
            "target": "https://referralverse.in/?q={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    };
}

export function getWebPageSchema(post: Post) {
    return {
        "@type": "WebPage",
        "@id": `https://referralverse.in/${post.slug}#webpage`,
        "url": `https://referralverse.in/${post.slug}`,
        "name": post.title,
        "description": post.metaDescription,
        "isPartOf": { "@id": "https://referralverse.in/#website" },
        "breadcrumb": { "@id": `https://referralverse.in/${post.slug}#breadcrumb` }
    };
}

export function getBreadcrumbSchema(post: Post) {
    return {
        "@type": "BreadcrumbList",
        "@id": `https://referralverse.in/${post.slug}#breadcrumb`,
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://referralverse.in"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": post.category,
                "item": `https://referralverse.in/category/${post.category.toLowerCase()}`
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": post.title,
                "item": `https://referralverse.in/${post.slug}`
            }
        ]
    };
}

export function getHowToSchema(post: Post) {
    return {
        "@type": "HowTo",
        "@id": `https://referralverse.in/${post.slug}#howto`,
        "name": `How to signup with ${post.brand} referral code`,
        "description": post.summary,
        "step": post.steps.map((s, i) => ({
            "@type": "HowToStep",
            "name": `Step ${i + 1}`,
            "text": s,
            "url": `https://referralverse.in/${post.slug}#step-${i + 1}`
        }))
    };
}

export function getOfferSchema(post: Post) {
    const imageUrl = post.referralImage?.startsWith('/')
        ? `https://referralverse.in${post.referralImage}`
        : (post.referralImage || "https://referralverse.in/logo.webp");

    return {
        "@type": "Product",
        "@id": `https://referralverse.in/${post.slug}#product`,
        "name": post.title,
        "description": post.summary,
        "image": imageUrl,
        "category": post.category,
        "brand": {
            "@type": "Brand",
            "name": post.brand
        },
        "offers": {
            "@type": "Offer",
            "@id": `https://referralverse.in/${post.slug}#offer`,
            "url": `https://referralverse.in/${post.slug}#offer`,
            "description": `${post.signupBonus} for new users`,
            "price": "0",
            "priceCurrency": "INR",
            "availability": "https://schema.org/InStock",
            "itemCondition": "https://schema.org/NewCondition",
            "offeredBy": { "@id": "https://referralverse.in/#organization" }
        }
    };
}

export function getFaqSchema(post: Post) {
    const baseUrl = `https://referralverse.in/${post.slug}`;
    const mainEntity: any[] = [];

    // ✅ Claim Offer
    mainEntity.push({
        "@type": "Question",
        "@id": `${baseUrl}#claim-offer`,
        "name": `How do I claim the ${post.brand} referral offer?`,
        "acceptedAnswer": {
            "@type": "Answer",
            "text": `${post.steps.join(" ")} This offer is available for new users and may vary based on location and availability.`
        }
    });

    // ✅ Signup Bonus
    mainEntity.push({
        "@type": "Question",
        "@id": `${baseUrl}#signup-bonus`,
        "name": `What is the signup bonus for ${post.brand}?`,
        "acceptedAnswer": {
            "@type": "Answer",
            "text": `New users can get ${post.signupBonus} on their first subscription when applying a valid referral code during signup.`
        }
    });

    // ✅ Referral Bonus
    mainEntity.push({
        "@type": "Question",
        "@id": `${baseUrl}#referral-bonus`,
        "name": `What referral rewards does ${post.brand} offer?`,
        "acceptedAnswer": {
            "@type": "Answer",
            "text": `Users can earn up to ${post.referralBonus} by referring friends who successfully sign up and complete their first subscription.`
        }
    });

    // ✅ Validity
    mainEntity.push({
        "@type": "Question",
        "@id": `${baseUrl}#offer-validity`,
        "name": `How long is the ${post.brand} offer valid?`,
        "acceptedAnswer": {
            "@type": "Answer",
            "text": `${post.validity}. Offers may change or expire depending on company policies.`
        }
    });

    // ✅ Referral Code / Link
    let referralCodeAnswer = "";
    let referralCodeQuestion = `What is the ${post.brand} referral code?`;
    let referralCodeAnchor = "referral-code";

    if (typeof post.referralCode === "string" && post.referralCode.trim() !== "") {
        referralCodeAnswer = `The ${post.brand} referral code is ${post.referralCode}. Use it during signup to claim your reward.`;
    } else if (Array.isArray(post.referralCode) && post.referralCode.length > 0) {
        referralCodeQuestion = `What are the active ${post.brand} referral codes?`;
        referralCodeAnswer = `The active ${post.brand} referral codes are: ${post.referralCode.join(", ")}. Use any of these codes during signup.`;
    } else if (post.referralLink) {
        referralCodeAnchor = "referral-link";
        referralCodeAnswer = `${post.brand} does not provide a manual referral code. You can use the referral link to claim the offer automatically.`;
    }

    if (referralCodeAnswer) {
        mainEntity.push({
            "@type": "Question",
            "@id": `${baseUrl}#${referralCodeAnchor}`,
            "name": referralCodeQuestion,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": referralCodeAnswer
            }
        });
    }

    // ✅ Dynamic FAQs
    if (Array.isArray(post.faq)) {
        post.faq.forEach((f, index) => {
            const formattedAnswer = formatFaqAnswer(f.answer);
            if (!formattedAnswer || formattedAnswer.length < 20) return;

            mainEntity.push({
                "@type": "Question",
                "@id": `${baseUrl}#faq-${index + 1}`,
                "name": f.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": formattedAnswer
                }
            });
        });
    }

    return {
        "@type": "FAQPage",
        "@id": `${baseUrl}#faq`,
        "name": `Frequently Asked Questions about ${post.brand}`,
        "inLanguage": "en-IN",
        "mainEntity": mainEntity
    };
}

export function getFullGraphSchema(post: Post) {
    return {
        "@context": "https://schema.org",
        "@graph": [
            getOrganizationSchema(),
            getWebSiteSchema(),
            getWebPageSchema(post),
            getBreadcrumbSchema(post),
            getHowToSchema(post),
            getOfferSchema(post),
            getFaqSchema(post)
        ]
    };
}

export function getHomeGraphSchema(allPosts: Post[], query: string = '', page: number = 1) {
    const POSTS_PER_PAGE = 6;

    // Filtering logic matches PostFeed.tsx
    const filteredPosts = allPosts.filter(post => {
        const matchesSearch = query === '' ||
            post.title.toLowerCase().includes(query.toLowerCase()) ||
            post.category.toLowerCase().includes(query.toLowerCase());
        return matchesSearch;
    });

    const startIndex = (page - 1) * POSTS_PER_PAGE;
    const currentPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

    return {
        "@context": "https://schema.org",
        "@graph": [
            getOrganizationSchema(),
            getWebSiteSchema(),
            {
                "@type": "WebPage",
                "@id": "https://referralverse.in/#webpage",
                "url": "https://referralverse.in",
                "name": "ReferralVerse — Best Referral Offers & Coupons",
                "description": "Find top referral offers, coupons and promo codes curated for travel, finance, food and lifestyle.",
                "isPartOf": { "@id": "https://referralverse.in/#website" }
            },
            {
                "@type": "ItemList",
                "@id": "https://referralverse.in/#itemlist",
                "name": query ? `Search results for "${query}"` : "Latest Referral Offers",
                "description": query ? `Referral offers matching your search for ${query}` : "A collection of the best referral offers and coupons.",
                "itemListElement": currentPosts.map((post, index) => ({
                    "@type": "ListItem",
                    "position": startIndex + index + 1,
                    "url": `https://referralverse.in/${post.slug}`,
                    "name": post.title
                }))
            }
        ]
    };
}

export function getItemListSchema(currentPosts: Post[], startIndex: number = 0) {
    return {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Latest Referral Offers",
        "description": "A collection of the best referral offers and coupons.",
        "itemListElement": currentPosts.map((post, index) => ({
            "@type": "ListItem",
            "position": startIndex + index + 1,
            "url": `https://referralverse.in/${post.slug}`,
            "name": post.title
        }))
    };
}
