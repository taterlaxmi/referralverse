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
  brand:string;
  title: string;
  category: Category;
  summary: string;
  referralCode: string;
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
  similarApps?: { name: string; link: string }[];
}