import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { posts } from '../../data/post';
import { Post } from '../../types';
import PostActions from '../../components/PostActions';

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const post = posts.find(p => p.slug === slug);
  if (!post) {
    return {
      title: 'Offer not found — ReferralVerse',
      description: 'Offer not found'
    };
  }

  return {
    title: `${post.title}`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      url: `https://referralverse.in/${post.slug}`,
      images: [
        {
          url: post.brand.logoUrl,
          width: 1200,
          height: 630,
          alt: post.brand.name
        }
      ]
    }
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = posts.find(p => p.slug === slug);
  if (!post) return notFound();

  const howToJson = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `How to claim ${post.title}`,
    "description": post.summary,
    "step": post.steps.map((s, i) => ({
      "@type": "HowToStep",
      "name": `Step ${i + 1}`,
      "text": s,
      "url": `https://referralverse.in/${post.slug}#step-${i + 1}`
    })),
  };

  const offerJson = {
    "@context": "https://schema.org",
    "@type": "Offer",
    "url": `https://referralverse.in/${post.slug}`,
    "price": post.offer.price,
    "priceCurrency": post.offer.currency,
    "availability": "https://schema.org/InStock"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I claim this offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": post.steps.join(" ")
        }
      },
      {
        "@type": "Question",
        "name": "What is the signup bonus?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": post.signupBonus
        }
      },
      {
        "@type": "Question",
        "name": "What is the referral bonus?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": post.referralBonus
        }
      },
      {
        "@type": "Question",
        "name": "How long is this offer valid?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": post.validity
        }
      }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://referralverse.in"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": post.category,
        "item": `https://referralverse.in/category/${post.category.toLowerCase()}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title
      }
    ]
  };

  return (
    <>
      {/* Structured data for SEO */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJson) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offerJson) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <article id="content" className="container mx-auto px-4 py-8">
        <Link href="/" className="text-sm text-indigo-600 mb-4 inline-block">
          ← Back to offers
        </Link>

        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/" className="text-gray-500 hover:text-indigo-600">Home</Link>
            </li>
            <li>
              <span className="text-gray-400">/</span>
            </li>
            <li>
              <span className="text-gray-500">Offers</span>
            </li>
            <li>
              <span className="text-gray-400">/</span>
            </li>
            <li aria-current="page" className="font-medium text-gray-700 truncate">
              {post.title}
            </li>
          </ol>
        </nav>

        <header className="flex items-center gap-4 mb-6">
          <Image src={post.brand.logoUrl} alt={post.brand.name} width={64} height={64} className="rounded-full" />
          <div>
            <h1 className="text-2xl font-bold">{post.title}</h1>
            <p className="text-sm text-gray-600">{post.brand.name} • {post.postedOn}</p>
          </div>
        </header>

        <p className="mb-6 text-gray-700">{post.summary}</p>

        <section className="mb-6">
          <h2 className="font-semibold mb-2">Offer</h2>
          <p>{post.offer.currency}{post.offer.price} — {post.ctaText}</p>
        </section>

        {/* Insert the client-side actions (copy + CTA) */}
        <PostActions post={post} />

        {/* How to Claim */}
        {post.steps?.length > 0 && (
          <section className="my-16">
            <h2 className="text-3xl font-bold mb-8 text-gray-900 flex items-center gap-3">
              <svg
                className="w-7 h-7 text-indigo-500"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              How to Claim
            </h2>

            <ol className="relative border-l border-indigo-200 ml-4 space-y-6">
              {post.steps.map((step, index) => (
                <li key={index} className="pl-8 relative group">
                  {/* Step bullet number */}
                  <div className="absolute -left-4 top-1.5 w-8 h-8 flex items-center justify-center rounded-full bg-indigo-600 text-white font-semibold shadow-md transition-transform group-hover:scale-110">
                    {index + 1}
                  </div>

                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-xl p-4 hover:border-indigo-300 hover:shadow-lg transition-all duration-300">
                    <p className="text-gray-800 leading-relaxed">{step}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        )}



        {/* How to Refer */}
        {Array.isArray(post.howToRefer) && post.howToRefer?.length > 0 && (
          <section className="my-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-2">
              <svg
                className="w-6 h-6 text-indigo-500"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 16h-1v-4h-1m0-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z"
                />
              </svg>
              How to refer {post.brand?.name} app?
            </h2>

            <ol className="space-y-4">
              {post.howToRefer.map((step, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100 hover:border-indigo-300 transition"
                >
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-indigo-600 text-white font-semibold shadow-sm">
                    {idx + 1}
                  </div>
                  <p className="text-gray-700 leading-relaxed">{step}</p>
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* Terms and Conditions */}
        {Array.isArray(post.termsAndConitions) && post.termsAndConitions.length > 0 && (
          <section className="my-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-2">
              <svg
                className="w-6 h-6 text-indigo-500"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v8m0 0H8m4 0h4M4 6h16M4 6l1.5 14a2 2 0 002 1.8h9a2 2 0 002-1.8L20 6"
                />
              </svg>
              Terms & Conditions
            </h2>

            <ul className="space-y-3">
              {post.termsAndConitions.map((terms, idx) => (
                <li
                  key={idx}
                  className="relative pl-6 text-gray-700 leading-relaxed before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-indigo-400 before:rounded-full"
                >
                  {terms}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Show similar apps if available */}
        {post.similarApps && post.similarApps.length > 0 && (
          <section className="my-12">
            <h2 className="text-xl font-bold mb-6 text-gray-800">Similar Apps</h2>
            <div className="flex flex-wrap gap-4">
              {post.similarApps.map((app, i) => (
                <Link
                  key={i}
                  href={app.link}
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md hover:scale-105 transition-transform"
                >
                  {app.name}
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}