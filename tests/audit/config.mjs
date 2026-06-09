/** Pages and AI query sets for the live production audit. */

export const pathsToAudit = [
  '/',
  '/category/credit-card',
  '/category/water-purifier',
  '/drinkprime-referral-code',
  '/tata-neu-credit-card-referral-code',
  '/about',
  '/contact',
  '/referral-aggregator',
];

export const aiAuditConfig = {
  '/': ['referralverse', 'tata new credit card referral code', 'drinkprime referral code'],
  '/tata-neu-credit-card-referral-code': [
    'tata neu credit card referral code',
    'tata new credit card referral code',
  ],
  '/category/credit-card': ['best credit card referral code india', 'supermoney credit card referral'],
};
