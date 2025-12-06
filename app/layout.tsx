import './globals.css'
import {  GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google';
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-HNTYGBLFK3";
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-MW2XFXF7";

export const metadata = {
  title: 'ReferralVerse — Best Referral Offers & Coupons',
  description: 'Find top referral offers, coupons and promo codes curated for travel, finance, food and lifestyle.',
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: 'ReferralVerse',
    description: 'Find top referral offers and coupons',
    url: 'https://referralverse.in',
    siteName: 'ReferralVerse',
    images: [
      {
        url: 'https://referralverse.in/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ReferralVerse'
      }
    ],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ReferralVerse',
    description: 'Find top referral offers and coupons',
    creator: '@referralverse'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ReferralVerse",
    "url": "https://referralverse.in",
    "logo": "https://referralverse.in/logo.png"
  };

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        {/* JSON-LD for Organization (helps SEO) */}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <GoogleAnalytics gaId={GA_ID} />
        <GoogleTagManager gtmId={GTM_ID} />
        {children}
      </body>
    </html>
  )
}