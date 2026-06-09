import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us — ReferralVerse',
  description:
    'Get in touch with ReferralVerse for referral code submissions, partnership inquiries, or general questions about our offers and coupons.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Us — ReferralVerse',
    description:
      'Get in touch with ReferralVerse for referral code submissions, partnership inquiries, or general questions.',
    url: 'https://referralverse.in/contact',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us — ReferralVerse',
    description:
      'Get in touch with ReferralVerse for referral code submissions, partnership inquiries, or general questions.',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
