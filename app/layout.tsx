import './globals.css'
import Analytics from './components/Analytics';
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-HNTYGBLFK3";
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-MW2XFXF7";

export const metadata = {
  title: 'ReferralVerse — Best Referral Offers & Coupons',
  description: 'Find top referral offers, coupons, and promo codes for travel, finance, food, and lifestyle. Maximize savings & earn exclusive bonuses with the best apps today.',
  metadataBase: new URL('https://referralverse.in'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: "/logo.webp",
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
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
      </head>
      <body suppressHydrationWarning={true}>
        <Analytics gaId={GA_ID} gtmId={GTM_ID} />
        {children}
      </body>
    </html>
  )
}