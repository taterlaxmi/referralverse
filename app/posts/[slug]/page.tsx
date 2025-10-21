import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { posts } from '../../data/post';
import { Post } from '../../types';
import PostActions from '../../components/PostActions';

type Props = { params: { slug: string } };

export default function PostPage({ params }: Props) {
  const post: Post | undefined = posts.find((p) => p.slug === params.slug);
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

        <section className="mb-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">How to Claim</h3>
          <ol className="list-decimal list-inside space-y-3">
            {post.steps.map((s, i) => (
              <li key={i} className="text-gray-700 flex items-start gap-3">
                <svg className="h-5 w-5 text-green-500 flex-shrink-0 mt-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span>{s}</span>
              </li>
            ))}
          </ol>
        </section>
      </article>
    </>
  );
}