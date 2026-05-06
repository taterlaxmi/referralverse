export enum Category {
  Finance = "Finance",
  CreditCard = "Credit Card",
  Shopping = "Shopping",
  Health = "Health",
  WaterPurifier = "Water Purifier",
  Fitness = "Fitness"
}

export interface Post {
  slug: string;
  brand: string;
  title: string;
  heroImage?: string;
  heroImageAlt?: string;
  proofImage?: string;
  proofImageAlt?: string;
  proofImageHeader?: string;
  category: Category;
  summary: string;
  metaDescription: string
  referralCode: string | string[];
  referralCodeNote?: string;
  referralLink: string;
  signupBonus: string;
  referralBonus: string;
  validity: string;
  steps: string[];
  ctaText: string;
  offer: {
    price: number;
    currency: string;
  };
  howToRefer?: string[];
  termsAndConditions?: string[];
  benefits?: {
    title?: string;
    description?: string;
    emoji?: string;
    icon?: string; // optional URL for an icon image
  }[];
  comparisonTable?: {
    title: string;
    columns: string[];
    rows: string[][];
  };
  faq?: {
    question: string;
    answer: string |
    string[] | {                     // table structure
      headers: string[];  // column headers
      rows: string[][];   // array of rows
    };
  }[];
  ratingValue?: string;
  reviewCount?: string;
}
