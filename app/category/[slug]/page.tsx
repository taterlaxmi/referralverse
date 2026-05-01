import { notFound } from 'next/navigation';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { posts } from '@/app/data/post';
import { slugify } from '@/app/utils/slugify';
import * as schemaUtils from '@/app/utils/schema';
import Breadcrumbs from '@/app/components/Breadcrumbs';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const uniqueCategories = Array.from(new Set(posts.map(p => p.category)));
  return uniqueCategories.map((category) => ({
    slug: slugify(category),
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const normalizedSlug = decodeURIComponent(slug).toLowerCase();
  
  // Find the original category string by checking the slugified version
  const categoryPost = posts.find(p => slugify(p.category) === normalizedSlug);
  if (!categoryPost) {
    return {
      title: 'Category Not Found — ReferralVerse',
    };
  }
  
  const categoryName = categoryPost.category;

  return {
    title: `Best ${categoryName} Referral Codes & Offers | ReferralVerse`,
    description: `Discover the best referral codes, coupons, and sign-up bonuses for ${categoryName}. Save money and earn rewards today!`,
    alternates: {
      canonical: `https://referralverse.in/category/${slug}`,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const normalizedSlug = decodeURIComponent(slug).toLowerCase();

  // Find all posts matching the category slug
  const categoryPosts = posts.filter(p => slugify(p.category) === normalizedSlug);
  
  if (categoryPosts.length === 0) return notFound();

  const categoryName = categoryPosts[0].category;

  // Generate ItemList schema
  const itemListSchema = schemaUtils.getItemListSchema(categoryPosts);
  
  // Wrap in a graph for the category page
  const categoryGraphSchema = {
    "@context": "https://schema.org",
    "@graph": [
      schemaUtils.getOrganizationSchema(),
      schemaUtils.getWebSiteSchema(),
      {
          "@type": "CollectionPage",
          "@id": `https://referralverse.in/category/${slug}#webpage`,
          "url": `https://referralverse.in/category/${slug}`,
          "name": `Best ${categoryName} Referral Codes & Offers`,
          "description": `Discover the best referral codes and sign-up bonuses for ${categoryName}.`,
          "isPartOf": { "@id": "https://referralverse.in/#website" },
          "breadcrumb": {
              "@type": "BreadcrumbList",
              "@id": `https://referralverse.in/category/${slug}#breadcrumb`,
              "itemListElement": [
                  { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://referralverse.in" },
                  { "@type": "ListItem", "position": 2, "name": categoryName, "item": `https://referralverse.in/category/${slug}` }
              ]
          }
      },
      itemListSchema
    ]
  };

  return (
    <>
      <Header />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(categoryGraphSchema) }}
        />

        <div className="container mx-auto px-4 py-8">
            <div className="mb-4">
               <Breadcrumbs category={categoryName} title={`${categoryName} Offers`} />
            </div>

            <div className="text-center my-8">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight">
                    Best {categoryName} Referral Codes
                </h1>
                <p className="mt-4 text-gray-600 text-lg">
                    Discover {categoryPosts.length} exclusive sign-up bonuses and offers for {categoryName}.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-12">
                {categoryPosts.map((post) => (
                    <a
                        key={post.slug}
                        href={`/${post.slug}`}
                        className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lg"
                    >
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 blur-[6px] transition-opacity duration-500 pointer-events-none" />
                        
                        <h2 className="text-xl font-semibold text-gray-900 mb-3 relative z-10 group-hover:text-indigo-600 transition-colors duration-300">
                            {post.title}
                        </h2>

                        <p className="text-gray-700 mb-4 leading-relaxed text-[0.95rem] relative z-10">
                            {post.summary.length > 70 ? (
                                <>
                                    {post.summary.slice(0, 70)}…
                                    <span className="text-indigo-600 font-medium ml-1 group-hover:underline transition-all duration-200">
                                        Read more <span className="sr-only">about {post.brand} referral code</span>
                                    </span>
                                </>
                            ) : (
                                post.summary
                            )}
                        </p>

                        <div className="flex justify-between items-center mb-4 relative z-10">
                            <span className="bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">
                                {post.category}
                            </span>
                            <span className="text-green-700 font-semibold">
                                {post.offer.currency}{post.offer.price}
                            </span>
                        </div>

                        <div className="mt-auto relative z-10">
                            <span className="block w-full text-center bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 font-semibold py-2 rounded-xl hover:from-blue-600 hover:to-indigo-600 hover:text-white hover:shadow-lg hover:scale-[1.03] transition-all duration-300">
                                {post.ctaText}
                            </span>
                        </div>
                    </a>
                ))}
            </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
