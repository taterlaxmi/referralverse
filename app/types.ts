export enum Category {
  Travel = "Travel",
  Finance = "Finance",
  Food = "Food",
  Shopping = "Shopping",
  Health = "Health",
  Entertainment = "Entertainment"
}

export interface Post {
  slug: string;
  title: string;
  category: Category;
  summary: string;
  brand: {
    name: string;
    logoUrl: string;
  };
  referralCode: string;
  referralLink: string;
  signupBonus: string;
  referralBonus: string;
  validity: string;
  steps: string[];
  // stepsToRefer: string[];
  ctaText: string;
  offer: {
    price: number;
    currency: string;
  };
  // ...existing fields...
  howToRefer?: string[]; // Array of steps for referring
  termsAndConitions?: string[];      // Array of terms and conditions
  similarApps?: { name: string; link: string }[];
  postedOn: string;
}