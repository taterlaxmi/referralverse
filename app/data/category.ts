import { Category } from '../types';

export type CategorySEOContent = {
  seoTitle: string;
  seoDescription: string;
  headerTitle: string;
  headerDescription: string;
  faqs: {
    question: string;
    answer: string | string[] | { headers: string[]; rows: string[][] }
  }[];
};

export const categoryContent: Partial<Record<Category, CategorySEOContent>> = {
  [Category.CreditCard]: {
    seoTitle: "Best Credit Card Referral Codes & Joining Bonuses",
    seoDescription: "Maximize your rewards with top credit card referral links. Get lifetime free cards, high UPI cashback, and massive sign-up bonuses.",
    headerTitle: "Top Credit Card Referral Offers & Lifetime Free Deals",
    headerDescription: "Credit cards offer some of the most lucrative sign-up bonuses in the financial world. Whether you are looking for Lifetime Free (LTF) RuPay cards for UPI payments, premium travel benefits, or high-yield cashback, using a referral code when applying can unlock exclusive joining bonuses like extra reward points or statement credits.",
    faqs: [
      {
        question: "Do credit card referrals give me a better chance of approval?",
        answer: "While a referral link doesn't bypass bank credit checks or guarantee approval, it often unlocks special joining bonuses (like extra NeuCoins, Cashback, or waived joining fees) that aren't available to the general public."
      },
      {
        question: "Are these credit cards lifetime free (LTF)?",
        answer: "Many cards, such as specific variants of the SuperMoney RuPay card or Kiwi, are offered as Lifetime Free. Always check the specific bank's terms and ongoing promotional offers before applying."
      },
      {
        question: "How do I claim a credit card referral bonus?",
        answer: [
          "Click the unique referral link provided for the card.",
          "Complete the application process and complete your KYC.",
          "Once approved, activate the card and make your first transaction within the specified timeframe (usually 30 days) to unlock your joining bonus."
        ]
      },
      {
        question: "Which RuPay Credit Card Referral is best for UPI Scan & Pay Cashback?",
        answer: {
          headers: ["Feature", "Kiwi Card", "super.money Card", "Tata Neu Card"],
          rows: [
            ["Best For", "Daily UPI Scans", "High UPI Cashback", "Tata Ecosystem Spends"],
            ["UPI Cashback", "1.5% - 2%", "Up to 5%", "Up to 1.5%"],
            ["Annual Fee", "Lifetime Free", "Lifetime Free", "₹1499 (Often Free)"],
            ["Lounge Access", "Yes (Milestone)", "No", "Yes (Milestone)"]
          ]
        }
      }
    ]
  },
  [Category.Finance]: {
    seoTitle: "Best Finance & Investing Referral Codes",
    seoDescription: "Discover top referral codes for finance apps, investment platforms, and trading accounts. Earn sign-up bonuses and start growing your wealth.",
    headerTitle: "Exclusive Finance & Investment Referral Bonuses",
    headerDescription: "Ready to start your investment journey? Finance platforms frequently offer generous sign-up bonuses when you join via an invite link. From high-yield bond platforms like GoldenPi to trading accounts and savings apps, use these verified referral codes to kickstart your portfolio with free cash or reward credits.",
    faqs: [
      {
        question: "Are finance referral bonuses taxable?",
        answer: "Yes, in many jurisdictions including India, referral bonuses and cashback earned from financial platforms may be considered 'Income from Other Sources' and could be taxable. Consult a tax advisor for specific guidance."
      },
      {
        question: "Is it safe to use referral links for investment apps?",
        answer: "Yes, using a referral link is perfectly safe as long as the platform itself is regulated (e.g., by SEBI or RBI). The referral link merely tracks who invited you; the actual application happens securely on the official platform."
      }
    ]
  },
  [Category.WaterPurifier]: {
    seoTitle: "Best Water Purifier Subscription Referral Codes",
    seoDescription: "Save on smart water purifiers with verified referral codes. Get free trials and instant discounts on DrinkPrime, Livpure Smart, and more.",
    headerTitle: "Smart Water Purifier Subscriptions & Free Trials",
    headerDescription: "Skip the heavy upfront costs and high maintenance fees of traditional RO purifiers. Modern smart water purifiers offer pay-as-you-use or fixed monthly subscriptions with zero installation charges and free lifetime maintenance. Use our curated referral codes to grab extended free trials and instant cash discounts on your first month.",
    faqs: [
      {
        question: "Which water purifier subscription is best for renters?",
        answer: "Both DrinkPrime and Livpure Smart are highly recommended for renters. They require zero installation fees, include lifetime free maintenance, and offer free relocation services if you move to a new apartment."
      },
      {
        question: "Can I cancel a water purifier subscription anytime?",
        answer: "Most platforms offer flexible cancellation, but some may have a minimum lock-in period (e.g., 3 months). Always review the cancellation policy before signing up to avoid early termination charges."
      },
      {
        question: "DrinkPrime vs. Livpure Smart: Which water purifier subscription is better?",
        answer: {
          headers: ["Feature", "DrinkPrime", "Livpure Smart"],
          rows: [
            ["Pricing", "Starting ₹299/mo", "Starting ₹429/mo"],
            ["Trial Period", "7 Days Free", "7 Days Free"],
            ["Relocation", "Free Relocation", "Chargeable"],
            ["Maintenance", "Lifetime Free", "Lifetime Free"],
            ["Smart App", "IoT Enabled", "Smart Monitoring"]
          ]
        }
      }
    ]
  },
  [Category.Fitness]: {
    seoTitle: "Best Fitness & Gym Referral Codes",
    seoDescription: "Get massive discounts on gym memberships, yoga classes, and home workouts with our verified fitness referral codes for Cult.fit and more.",
    headerTitle: "Unlock Premium Fitness & Gym Memberships",
    headerDescription: "Starting your fitness journey shouldn't break the bank. By using referral codes for top fitness platforms like Cult.fit, you can unlock massive discounts on premium memberships, extra validity days, or free trial sessions. Compare the best fitness offers below and start saving today.",
    faqs: [
      {
        question: "How do fitness referral discounts work?",
        answer: "When you sign up using a referral link or enter an invite code during checkout, a flat discount or percentage off is automatically applied to your first membership purchase."
      },
      {
        question: "Can existing users use these fitness referral codes?",
        answer: "Typically, referral codes are strictly for new users creating their first account. However, platforms occasionally offer renewal discounts in their app's offers section."
      }
    ]
  },
  [Category.Shopping]: {
    seoTitle: "Top Shopping & Cashback Referral Codes",
    seoDescription: "Earn cashback on your everyday purchases. Use verified referral codes for shopping apps like Club Corra to get sign-up bonuses.",
    headerTitle: "Maximize Savings with Shopping & Cashback Apps",
    headerDescription: "Why pay full price when you can earn cashback on every order? Shopping apps and receipt-scanning platforms reward you for uploading bills from popular e-commerce sites like Myntra, Swiggy, and Zepto. Use the referral codes below to start your account with bonus points and maximize your everyday savings.",
    faqs: [
      {
        question: "How do receipt scanning apps give cashback?",
        answer: "Apps like Club Corra analyze your shopping receipts to gather consumer insights. In exchange for your anonymized purchase data, they reward you with points that can be redeemed for cashback or gift cards."
      }
    ]
  }
};
