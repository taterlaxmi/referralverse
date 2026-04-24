import { notFound } from 'next/navigation';
import Image from 'next/image';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { posts } from '../../data/post';
import PostOfferDetails from '../../components/PostOfferDetails';
import FAQSection from '../../components/FAQSection';
import ComparisonSection from "@/app/components/ComparisonSection";
import BenefitsSection from "@/app/components/BenefitsSection";
import * as schemaUtils from '@/app/utils/schema';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export const dynamicParams = true;

export async function generateMetadata({ params }: Props) {
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
    description: post.metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      url: `https://referralverse.in/${post.slug}`,
    }
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = posts.find(p => p.slug === slug);
  if (!post) return notFound();

  const howToJson = schemaUtils.getHowToSchema(post);
  const offerJson = schemaUtils.getOfferSchema(post);
  const faqSchema = schemaUtils.getFaqSchema(post);
  const breadcrumbSchema = schemaUtils.getBreadcrumbSchema(post);

  return (
    <>
      <Header />
      <main>
        {/* Structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJson) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(offerJson) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />

        <article id="content" className="container mx-auto px-4 py-12">
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
              {post.title}
            </h1>
          </header>

          {/* Summary */}
          <div className="mb-12 p-6 bg-white rounded-2xl border border-gray-200 ring-1 ring-gray-300/40 shadow-sm hover:shadow-md transition-all duration-300">
            <p className="text-gray-700 leading-relaxed text-lg">
              {post.summary}
            </p>
          </div>

          {/* Post Offer Details */}
          <PostOfferDetails post={post} />

          {/* Post Offer Image */}
          {post.referralImage && (
            <div className="mb-6 flex justify-center">
              <Image
                src={post.referralImage}
                alt={`${post.brand} referral code — ${post.title}. ${post.summary.slice(0, 70)}...`}
                width={600}
                height={400}
                className="w-full max-w-md rounded-2xl shadow-md border border-gray-200 object-cover"
                sizes="(max-width: 768px) 80vw, 400px"
                priority
                fetchPriority="high"
              />
            </div>
          )}

          {/* How to Claim / Signup Steps */}
          {post.steps?.length > 0 && (
            <section id="claim-offer" className="my-20">
              <h2 className="text-3xl md:text-4xl font-semibold mb-10 flex items-center gap-3 text-gray-900">
                <svg className="w-8 h-8 text-indigo-500 drop-shadow-sm" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2       m8-10a4 4 0 100-8 4 4 0 000 8zm8 4h-3m0 0v-3m0 3v3" />
                </svg>
                How to sign up with {post.brand} referral code?
              </h2>
              <ol className="relative border-l border-indigo-100 ml-5 space-y-2">
                {post.steps.map((step, index) => (
                  <li id={`step-${index + 1}`} key={index} className="relative pl-10 group transition-all duration-300 hover:translate-x-1">
                    <div className="absolute -left-5 top-2 w-[34px] h-[34px] flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 text-white font-semibold shadow-md ring-4 ring-white group-hover:scale-110 transition-transform duration-300">
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

              <ol className="relative border-l border-indigo-100 ml-5 space-y-2">
                {post.howToRefer?.map((step, index) => (
                  <li key={index} className="relative pl-10 group transition-all duration-300 hover:translate-x-1">
                    <div className="absolute -left-5 top-2 w-[34px] h-[34px] flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 text-white font-semibold shadow-md ring-4 ring-white group-hover:scale-110 transition-transform duration-300">
                      {index + 1}
                    </div>
                    <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all duration-300">
                      <p className="text-gray-800 leading-relaxed text-[1.05rem]">{step}</p>
                    </div>
                    {post.howToRefer && index < post.howToRefer.length - 1 && (
                      <div className="absolute left-[-1px] top-10 h-full w-[2px] bg-gradient-to-b from-indigo-200 via-purple-100 to-transparent" />
                    )}
                  </li>
                ))}
              </ol>
            </section>
          )}

          {/* Benefits Section */}
          <BenefitsSection benefits={post.benefits} brand={post.brand} />

          {/* Comparison Section */}
          {post.comparisonTable && <ComparisonSection data={post.comparisonTable} brand={post.brand} />}

          {/* Terms & Conditions */}
          {Array.isArray(post.termsAndConditions) && post.termsAndConditions.length > 0 && (
            <section id="offer-validity" className="my-20">
              <h2 className="text-3xl md:text-4xl font-semibold mb-10 flex items-center gap-3 text-gray-900">
                <svg className="w-8 h-8 text-indigo-500 drop-shadow-sm" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l7 4v5c0 5-3.5 9-7 9s-7-4-7-9V7l7-4z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                </svg>
                Terms &amp; Conditions
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

          {/* FAQ Section */}
          {post.faq && post.faq.length > 0 && (
            <FAQSection faq={post.faq} />
          )}
        </article>
      </main>
      <Footer />
    </>
  );
}