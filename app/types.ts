export enum Category {
  Finance = "Finance",
  UPI = "UPI",
  CreditCard = "Credit Card",
  Shopping = "Shopping",
  WaterPurifier = "Water Purifier",
  Fitness = "Fitness",
  Grocery = "Grocery"
}

export interface Post {
  slug: string;
  brand: string;
  title: string;
  heroImage?: string;
  proofImage?: string;
  proofImageAlt?: string;
  proofImageHeader?: string;
  tcImage?: string;
  tcImageAlt?: string;
  category: Category | Category[];
  summary: string;
  metaDescription: string;
  referralCode: string | string[];
  referralCodeNote?: string;
  referralLink: string;
  signupBonus: string;
  referralBonus: string;
  validity?: string;
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
    answer:
    | string
    | string[]
    | {
      // table structure
      headers: string[]; // column headers
      rows: string[][]; // array of rows
    };
  }[];
  ratingValue?: string;
  reviewCount?: string;
}
