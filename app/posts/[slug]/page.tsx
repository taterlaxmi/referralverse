import { notFound } from 'next/navigation';
import Link from 'next/link';
import { posts } from '../../data/post';
import PostOfferDetails from '../../components/PostOfferDetails';

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

  const canonicalUrl = `https://referralverse.in/${post.slug}`;

  return {
    title: `${post.title}`,
    description: post.summary,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description: post.summary,
      url: `https://referralverse.in/${post.slug}`,
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
    "name": `How to signup with ${post.brand} referral code`,
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

      <article id="content" className="container mx-auto px-4 py-12">
        {/* Back Link */}
        <Link href="/" className="text-sm text-indigo-600 mb-6 inline-block hover:underline">
          ← Back to offers
        </Link>

        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
            {post.title}
          </h1>
        </header>

        {/* Summary */}
        <div className="mb-12 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
          <p className="text-gray-700 leading-relaxed text-lg">{post.summary}</p>
        </div>

        {/* Post Offer Details */}
        <PostOfferDetails post={post} />

        {/* How to Claim / Signup Steps */}
        {post.steps?.length > 0 && (
          <section className="my-20">
            <h2 className="text-3xl md:text-4xl font-semibold mb-10 flex items-center gap-3 text-gray-900">
              <svg className="w-8 h-8 text-indigo-500 drop-shadow-sm" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              How to sign up with  {post.brand} referral code?
            </h2>

            <ol className="relative border-l border-indigo-100 ml-5 space-y-8">
              {post.steps.map((step, index) => (
                <li key={index} className="relative pl-10 group transition-all duration-300 hover:translate-x-1">
                  <div className="absolute -left-5 top-1.5 w-9 h-9 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 text-white font-semibold shadow-md ring-4 ring-white group-hover:scale-110 transition-transform duration-300">
                    {index + 1}
                  </div>
                  <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all duration-300">
                    <p className="text-gray-800 leading-relaxed text-[1.05rem]">{step}</p>
                  </div>
                  {index < post.steps.length - 1 && (
                    <div className="absolute left-[-1px] top-10 h-full w-[2px] bg-gradient-to-b from-indigo-200 via-purple-100 to-transparent" />
                  )}
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* How to Refer */}
        {(post.howToRefer ?? []).length > 0 && (
          <section className="my-20">
            <h2 className="text-3xl md:text-4xl font-semibold mb-10 flex items-center gap-3 text-gray-900">
              <svg className="w-8 h-8 text-indigo-500 drop-shadow-sm" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m0-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" />
              </svg>
              How to refer {post.brand} app
            </h2>

            <ol className="relative border-l border-gray-100 ml-5 space-y-6">
              {post.howToRefer?.map((step, idx) => (
                <li key={idx} className="relative pl-10 group transition-all duration-300 hover:translate-x-1">
                  <div className="absolute -left-5 top-1.5 w-9 h-9 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 text-white font-semibold shadow-md ring-4 ring-white group-hover:scale-110 transition-transform duration-300">
                    {idx + 1}
                  </div>
                  <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all duration-300">
                    <p className="text-gray-800 leading-relaxed text-[1.05rem]">{step}</p>
                  </div>
                  {post.howToRefer && idx < post.howToRefer.length - 1 && (
                    <div className="absolute left-[-1px] top-10 h-full w-[2px] bg-gradient-to-b from-indigo-200 via-purple-100 to-transparent" />
                  )}
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* Terms & Conditions */}
        {Array.isArray(post.termsAndConditions) && post.termsAndConditions.length > 0 && (
          <section className="my-20">
            <h2 className="text-3xl md:text-4xl font-semibold mb-10 flex items-center gap-3 text-gray-900">
              <svg className="w-8 h-8 text-indigo-500 drop-shadow-sm" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v8m0 0H8m4 0h4M4 6h16M4 6l1.5 14a2 2 0 002 1.8h9a2 2 0 002-1.8L20 6" />
              </svg>
              Terms & Conditions
            </h2>

            <ul className="space-y-5 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              {post.termsAndConditions.map((term, idx) => (
                <li key={idx} className="relative pl-7 text-gray-800 leading-relaxed before:absolute before:left-0 before:top-2.5 before:w-2 before:h-2 before:rounded-full before:bg-gradient-to-r before:from-indigo-500 before:to-purple-500">
                  {term}
                </li>
              ))}
            </ul>
          </section>
        )}



        {/* Similar Apps */}
        {post.similarApps && post.similarApps.length > 0 && (
          <section className="my-24">
            <h2 className="text-3xl md:text-4xl font-semibold mb-10 text-gray-900 flex items-center gap-3 tracking-tight">
              <svg
                className="w-8 h-8 text-indigo-500 drop-shadow-sm"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 6l1.5 14a2 2 0 002 1.8h9a2 2 0 002-1.8L20 6"
                />
              </svg>
              Similar Apps
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {post.similarApps?.map((app, idx) => (
                <Link
                  key={idx}
                  href={app.link}
                  className="relative group bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-center gap-4 hover:shadow-md hover:border-indigo-200 transition-all duration-300"
                >
                  {/* Step-like Number Circle */}
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 text-white font-semibold text-lg shadow-md group-hover:scale-110 transition-transform duration-300">
                    {idx + 1}
                  </div>

                  {/* App Name */}
                  <span className="text-gray-900 font-semibold text-lg group-hover:text-indigo-600 transition-colors duration-300">
                    {app.name}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}





      </article>


    </>);
}