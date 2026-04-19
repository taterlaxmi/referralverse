import { Post, Category } from '../types';

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

  // Table → natural sentence (CRITICAL FIX)
  if (answer.headers && answer.rows) {
    return answer.rows
      .map((row: string[]) => {
        return `${row[0]} plan starts at ${row[1]} per month and includes ${row[2]}.`;
      })
      .join(" ");
  }

  return "";
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

    // ✅ Dynamic FAQs (clean + normalized)
    if (Array.isArray(post.faq)) {
        post.faq.forEach((f, index) => {
            const formattedAnswer = formatFaqAnswer(f.answer);

            // Skip weak answers
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
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": `${baseUrl}#faq`,
        "name": `Frequently Asked Questions about ${post.brand}`,
        "inLanguage": "en-IN",
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
