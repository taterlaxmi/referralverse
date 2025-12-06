import { Post, Category } from '../types';

export const posts: Post[] = [
  {
    slug: 'drinkprime-referral-code',
    brand: "Drinkprime",
    category: Category.Health,
    title: 'Signup with Drinkprime referral code to get ₹200 Bonus',
    summary: 'DrinkPrime App is a smart water purifier subscription service that lets you enjoy clean and healthy drinking water at home without any upfront cost of new filter. With our exclusive DrinkPrime referral code, you’ll get a 7-day free trial and an instant ₹200 discount on your first subscription. Drinkprime subscription plans start from as low as ₹349 per month for single users.',
    metaDescription: "Get clean, healthy drinking water with DrinkPrime smart purifiers. Use our DrinkPrime referral code for a 7-day free trial and ₹200 off your plan.",
    referralCode: 'QZ5TQZOJ',
    referralLink: 'http://drinkprime.in/lp46?referral_code=QZ5TQZOJ&utm_campaign=subscriber_referral&utm_medium=app&utm_source=whatsapp_share_button',
    signupBonus: '₹200 Off',
    referralBonus: '₹1000',
    validity: 'Valid until Dec 31, 2025',
    referralImage: "/drinkprime.png",
    steps: [
      'Download the Drinkprime app from the Play Store or App Store.',
      'Enter your details to sign up for a new account.',
      'Apply the referral code QZ5TQZOJ at checkout.',
      'You will get 7 days of free trial and ₹200 off on your subscription.'
    ],
    ctaText: 'Download Now',
    offer: {
      price: 200,
      currency: '₹'
    },
    howToRefer: [
      "Open the Drinkprime app and log in to your account.",
      "Go to the referral section from the menu.",
      "Copy your unique referral code or link.",
      "Share it with your friends and family.",
      "Earn rewards when they sign up using your code!"
    ],
    termsAndConditions: [
      "Offer valid for new users only.",
      "Referral bonus will be credited after successful signup and first purchase.",
      "Drinkprime reserves the right to change or withdraw the offer at any time.",
      "Other terms may apply. Please check the Drinkprime app for details."
    ],
    faq: [
      {
        "question": "What are the available DrinkPrime subscription plans?",
        "answer": {
          "headers": ["Plan Name", "Starting Price/Month", "Key Features"],
          "rows": [
            ["DrinkPrime UV", "₹299", "UV purification"],
            ["DrinkPrime RO+", "₹349", "RO + UV purification"],
            ["DrinkPrime Copper", "₹417", "Copper-enriched water"],
            ["DrinkPrime Alkaline+", "₹429", "Alkaline water option"],
            ["DrinkPrime Under-the-Sink", "₹629", "Compact purifier for kitchens"]
          ]
        }
      },
      {
        "question": "Is DrinkPrime better than Livpure Smart?",
        "answer": [
          "DrinkPrime starts at ₹299/month, Livpure Smart starts at ₹429/month.",
          "DrinkPrime offers free relocation, Livpure Smart usually charges ₹1,000."
        ]
      },
      {
        "question": "How does DrinkPrime compare to traditional water purifiers?",
        "answer": {
          "headers": ["Option", "Upfront Cost", "Annual Maintenance", "Yearly Total"],
          "rows": [
            ["Traditional RO Purifier", "₹10,000–₹20,000", "₹3,000–₹6,000", "₹13,000–₹26,000"],
            ["DrinkPrime Subscription", "₹0 + ₹1,500 refundable deposit", "₹0", "₹7,548 (highest plan)"]
          ]
        }
      },
      {
        question: "What is the minimum lock-in period for DrinkPrime?",
        answer: "The minimum lock-in period is 3 months. If you cancel during this period, a ₹1,500 cancellation fee applies. After the lock-in, cancellation is free."
      },
      {
        question: "Does DrinkPrime offer a free trial?",
        answer: "Yes, DrinkPrime provides a 7-day free trial for new users. There are no cancellation charges during the trial period."
      },
      {
        question: "Are there installation, maintenance, or relocation charges?",
        answer: "Installation is free. DrinkPrime offers lifetime free maintenance and free relocation within their serviceable regions."
      },
      {
        question: "What is the security deposit and when is it refunded?",
        answer: "A refundable security deposit of ₹1,500 is collected during signup. It is refunded once you complete the minimum lock-in period and return the purifier in good working condition."
      },
      {
        question: "Are there any hidden charges in DrinkPrime subscription?",
        answer: "No. The subscription fee includes installation, purifier usage, maintenance, free filter changes, and relocation. Additional charges apply only if the device is damaged or not returned after cancellation."
      },
      {
        question: "In which cities is DrinkPrime available?",
        answer: [
          "Bengaluru",
          "Hyderabad",
          "Delhi",
          "Gurugram",
          "Ghaziabad",
          "Faridabad",
          "Chennai",
          "Mumbai",
          "Noida"
        ]
      },
      {
        question: "Is DrinkPrime water safe to drink?",
        answer: "Yes. DrinkPrime uses RO + UV + UF purification technology. Technicians replace filters whenever needed at no cost, ensuring consistently safe and high-quality drinking water."
      },
      {
        question: "How do I cancel my DrinkPrime subscription?",
        answer: "You can cancel directly through the DrinkPrime app or by contacting customer support. After the 3-month lock-in period, cancellation is free. During lock-in, a ₹1,500 charge applies."
      },
      {
        question: "How often does DrinkPrime replace filters?",
        answer: "Filters are replaced automatically based on your water usage. The purifier tracks usage data, and technicians replace filters as required at no extra cost."
      }
    ],
    playStoreId: 'waterwala.com.prime',
  },
  {
    slug: 'livpure-smart-referral-code',
    brand: "Livpure Smart",
    category: Category.Health,
    title: 'Livpure Smart Referral Code: 7 day free trail + ₹100 off',
    summary: 'Livpure Smart, a pay-as-you-drink water service, provides pure drinking water using 7-stage purification @ Rs 0.99/liter. Livpure Smart has various subscription plans suiting different needs.',
    metaDescription: "Get pure, healthy water at ₹0.99/litre with Livpure Smart. Use our Livpure Smart referral code for 7-day free trial + ₹100 off your first plan.",
    referralCode: 'J0YEN7',
    referralLink: 'https://play.google.com/store/apps/details?id=com.livpure.safedrink',
    signupBonus: '7 day free trail + ₹100 off',
    referralBonus: '₹500 Amazon Voucher',
    validity: 'Limited time offer',
    referralImage: "/livpure-smart.png",
    steps: [
      'Click on the "Claim Now" button to download Livpure Smart app.',
      'Now open the app and sign up for a new account',
      'Choose your plan and apply coupon J0YEN7.',
      'Complete the payment and you will get ₹100 off on your subscription.'
    ],
    ctaText: 'Get Livpure Subscription',
    offer: {
      price: 100,
      currency: '₹'
    },
    playStoreId: 'com.livpure.safedrink',
  },
  {
    slug: 'cultfit-referral-code',
    brand: "CultFit",
    category: Category.Health,
    title: 'Save on Your Fitness Journey with CultFit Referral Code IUMEQHMT',
    summary: 'Sharing a CultFit referral code is a smart way to unlock exclusive discounts while promoting a healthier lifestyle. When a friend signs up using your code, both of you benefit—whether it’s discounted memberships, free sessions, or access to premium fitness content. It’s a win-win that turns your fitness journey into a shared, rewarding experience.',
    metaDescription: "Use CultFit referral code IUMEQHMT to get up to ₹1000 off on CultPass Lux membership. Stay fit, save more, and enjoy premium workouts with CultFit today.",
    referralCode: 'IUMEQHMT',
    referralLink: 'https://www.cult.fit/referral/invite?referralCode=IUMEQHMT',
    signupBonus: 'Get up to ₹1000 off on CultPass Lux',
    referralBonus: 'Get 30-day membership extension',
    validity: 'Ongoing Offer',
    referralImage: "/cultfit.png",
    steps: [
      'Visit the Cult App using above link.',
      'Enter your mobile number and verify with OTP.',
      'Choose your plan and complete payment.',
      'You will get up to ₹1000 off on CultPass Lux, up to ₹750 off on CultPass Elite, or up to ₹500 off on CultPass Pro.'
    ],
    ctaText: 'Get your CultPass',
    offer: {
      price: 1000,
      currency: '₹'
    },
    howToRefer: [
      'Open the Cult App and go to Profile (top-left).',
      "Click on 'Referral, Vouchers & Gift Cards' → 'Refer a friend'.",
      'Copy your unique referral code or link.',
      'Share it with your friends and family.'
    ],
    termsAndConditions: [
      'Get up to ₹1000 off on CultPass Lux, up to ₹750 off on CultPass Elite, or up to ₹500 off on CultPass Pro.',
      'Referral offer is valid only if your friend completes payment within 30 days of signup.',
      "Referral offer is valid only if your friend's first CultPass purchase is worth ₹5,000 or more.",
      'Referral benefits apply to the first 10 successful referrals.'
    ],
    faq: [
      {
        question: "In which cities is Cultfit available?",
        answer: [
          "Bengaluru",
          "Hyderabad",
          "Delhi",
          "Gurugram",
          "Ghaziabad",
          "Faridabad",
          "Chennai",
          "Mumbai",
          "Noida"
        ]
      },
      {
        question: "How many people can i refer in Cultfit?",
        answer: "You can refer max of 10 people."
      }
    ]
  },
  {
    slug: 'tata-neu-credit-card-referral-code',
    brand: "Tata Neu",
    category: Category.Finance,
    title: 'Use Tata Neu Referral code RAHU7325 to get ₹500 joining bonus',
    summary: 'Enter the world of rewards and savings with the Tata Neu HDFC Bank Credit Card  – powered by RuPay/Visa. Unlock savings of up to 10% and exclusive offers  across fashion, groceries, electronics, medicines, flights and much more with  NeuCard. Travel in style with complementary airport lounge access plus  exclusive offers on hotel stay and dining! Apply now and enjoy unmatched privileges.',
    metaDescription: "Apply with Tata Neu referral code RAHU7325 to get ₹500 joining bonus + 499 NeuCoins. Enjoy cashback, lounge access & exclusive shopping rewards.",
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
      currency: '₹'
    },
  }];