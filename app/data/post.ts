import { Post, Category } from '../types';

export const posts: Post[] = [
  {
    slug: 'drinkprime-referral-code',
    title: 'Signup with Drinkprime referral code to get ₹100 Joining Bonus',
    category: Category.Health,
    summary: 'Get 7 days free trial and ₹100 off on your Drinkprime subscription with our exclusive referral code.',
    brand: {
      name: 'Drinkprime',
      logoUrl: 'https://picsum.photos/seed/drinkprime/100/100'
    },
    referralCode: 'QZ5TQZOJ',
    referralLink: 'http://drinkprime.in/lp46?referral_code=QZ5TQZOJ&utm_campaign=subscriber_referral&utm_medium=app&utm_source=whatsapp_share_button',
    signupBonus: '₹100 Off',
    referralBonus: '₹500 Amazon Voucher',
    validity: 'Valid until Dec 31, 2025',
    steps: [
      'Click on the "Claim Now" button to download Drinkprime app.',
      'Enter your details to sign up for a new account.',
      'Apply the referral code QZ5TQZOJ at checkout.',
      'You will get 7 days of free trial and ₹100 off on your subscription.'
    ],
    ctaText: 'Claim Now',
    offer: {
      price: 100,
      currency: 'INR'
    },
    howToRefer: [
      "Open the Drinkprime app and log in to your account.",
      "Go to the referral section from the menu.",
      "Copy your unique referral code or link.",
      "Share it with your friends and family.",
      "Earn rewards when they sign up using your code!"
    ],
    termsAndConitions: [
      "Offer valid for new users only.",
      "Referral bonus will be credited after successful signup and first purchase.",
      "Drinkprime reserves the right to change or withdraw the offer at any time.",
      "Other terms may apply. Please check the Drinkprime app for details."
    ],
    similarApps: [
      { name: "Livpure Smart", link: "/livpure-smart-referral-code" },
      { name: "CultFit", link: "/cultfit-referral-code" }
    ],
    postedOn: 'Oct 10, 2025'
  },
  {
    slug: 'livpure-smart-referral-code',
    title: 'Livpure Smart Referral Code :  7 day free trail + ₹100 off',
    category: Category.Health,
    summary: 'Livpure Smart, a pay-as-you-drink water service, provides pure drinking water using 7-stage purification @ Rs 0.99/liter. Livpure Smart has various subscription plans suiting different needs.',
    brand: {
      name: 'Livpure Smart',
      logoUrl: 'https://picsum.photos/seed/swiggy/100/100'
    },
    referralCode: 'J0YEN7',
    referralLink: 'https://play.google.com/store/apps/details?id=com.livpure.safedrink',
    signupBonus: '50% off first 3 months',
    referralBonus: '₹500 Amazon Voucher',
    validity: 'Limited time offer',
    steps: [
      'Click on the "Claim Now" button to download Livpure Smart app.',
      'Now open the app and sign up for a new account',
      'Choose your plan and apply coupon J0YEN7.',
      'Complete the payment and you will get  ₹100 off on your subscription.'
    ],
    ctaText: 'Get Livpure Subscription',
    offer: {
      price: 100,
      currency: 'INR'
    },
    postedOn: 'Oct 09, 2025'
  },
  {
    slug: 'cultfit-referral-code',
    title: 'Save Big on Your Fitness Journey! Apply Cult Fit Code: IUMEQHMT',
    category: Category.Health,
    summary: 'Sharing a Cult Fit referral code is a smart way to unlock exclusive discounts while promoting a healthier lifestyle. When a friend signs up using your code, both of you benefit—whether it’s discounted memberships, free sessions, or access to premium fitness content. It’s a win-win that turns your fitness journey into a shared, rewarding experience.',
    brand: {
      name: 'CultFit',
      logoUrl: 'https://picsum.photos/seed/zerodha/100/100'
    },
    referralCode: 'IUMEQHMT',
    referralLink: 'https://www.cult.fit/referral/invite?referralCode=IUMEQHMT',
    signupBonus: 'Extra 15 days membership',
    referralBonus: 'Extra 15 days membership',
    validity: 'Ongoing Offer',
    steps: [
      'Visit the Cultfit app using our link.',
      'Enter your mobile number and verify with OTP.',
      'Choose your plan and apply coupon IUMEQHMT.',
      'Complete the payment and you will get extra 15 days membership.'
    ],
    ctaText: 'Get Extra 15 days membership',
    offer: {
      price: 0,
      currency: 'INR'
    },
    postedOn: 'Oct 08, 2025'
  },
  {
    slug: 'tata-neu-credit-card-referral-code',
    title: 'Use Tata Neu Referral code [RAHU7325] to get ₹500 joining bonus ',
    category: Category.Finance,
    summary: 'Enter the world of rewards and savings with the Tata Neu HDFC Bank Credit Card  – powered by RuPay/Visa. Unlock savings of up to 10% and exclusive offers  across fashion, groceries, electronics, medicines, flights and much more with  NeuCard. Travel in style with complementary airport lounge access plus  exclusive offers on hotel stay and dining! Apply now and enjoy unmatched privileges.',
    brand: {
      name: 'Tata Neu',
      logoUrl: 'https://picsum.photos/seed/myntra/100/100'
    },
    referralCode: 'RAHU7325',
    referralLink: 'https://www.tatadigital.com/finance/creditcard/product-detail?referralCode=RAHU7325&amp;utm_content=RAHU7325',
    signupBonus: '499 Neu coins on first transaction within 60 days',
    referralBonus: '₹500',
    validity: 'Valid for new users only',
    steps: [
      'Click on the "Get TataNeu Credit Card" button to apply for the Tata Neu Credit Card.',
      'Apply for the card using referral code RAHU7325.',
      'Complete the application and once you get approved make transactions worth ₹3000 within 60 days.',
      'You will get 499 Neu coins.'
    ],
    ctaText: 'Apply for TataNeu Credit Card',
    offer: {
      price: 500,
      currency: 'INR'
    },
    postedOn: 'Oct 07, 2025'
  }];