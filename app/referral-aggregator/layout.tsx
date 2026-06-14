import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Referral Aggregator | ReferralVerse',
  description: 'A curated collection of verified referral codes from across the Indian community, updated automatically by AI.',
  alternates: {
    canonical: '/referral-aggregator',
  },
  openGraph: {
    url: 'https://referralverse.in/referral-aggregator',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
