import { Post, Category } from '../types';

/**
 * Normalizes FAQ answers (string | string[] | table) into a single string for JSON-LD
 */
export function formatFaqAnswer(answer: any): string {
    if (typeof answer === 'string') return answer;
    if (Array.isArray(answer)) return answer.join(' ');
    if (answer && typeof answer === 'object' && Array.isArray(answer.headers) && Array.isArray(answer.rows)) {
        const headerLine = answer.headers.join(' | ');
        const rowsText = answer.rows.map((r: string[]) => r.join(' | ')).join(' ; ');
        return `${headerLine}\n${rowsText}`;
    }
    return '';
}

export function getMainEntityForCategory(category: Category): string {
    switch (category) {
        case Category.Finance:
            return 'FinancialProduct';
        default:
            return 'SoftwareApplication';
    }
}

export function getOrganizationSchema() {
    return {
        "@context": "https://schema.org",
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

export function getBreadcrumbSchema(post: Post) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
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
                "name": post.title
            }
        ]
    };
}

export function getHowToSchema(post: Post) {
    return {
        "@context": "https://schema.org",
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
    const mainEntity = getMainEntityForCategory(post.category);

    const schema: any = {
        "@context": "https://schema.org",
        "@type": mainEntity,
        "@id": `https://referralverse.in/${post.slug}#offer`,
        "name": post.brand,
        "offers": {
            "@type": "Offer",
            "url": `https://referralverse.in/${post.slug}#offer`,
            "price": post.offer.price,
            "priceCurrency": post.offer.currency,
            "availability": "https://schema.org/InStock",
            "offeredBy": { "@id": "https://referralverse.in/#organization" }
        }
    };

    // Add category specific properties with correct field names for Google
    if (mainEntity === 'SoftwareApplication') {
        schema.applicationCategory = post.category;
    } else {
        schema.category = post.category;
    }

    return schema;
}

export function getFaqSchema(post: Post) {
    const mainEntity = [
        {
            "@type": "Question",
            "name": "How do I claim this offer?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": post.steps.join(" ")
            }
        },
        {
            "@type": "Question",
            "name": "What is the signup bonus?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": post.signupBonus
            }
        },
        {
            "@type": "Question",
            "name": "What is the referral bonus?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": post.referralBonus
            }
        },
        {
            "@type": "Question",
            "name": "How long is this offer valid?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": post.validity
            }
        }
    ];

    if (Array.isArray(post.faq)) {
        post.faq.forEach(f => {
            mainEntity.push({
                "@type": "Question",
                "name": f.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": formatFaqAnswer(f.answer)
                }
            });
        });
    }

    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": `https://referralverse.in/${post.slug}#faq`,
        "mainEntity": mainEntity
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
