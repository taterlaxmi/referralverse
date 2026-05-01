import React from 'react';
import Link from 'next/link';
import { Post } from '../types';

interface RelatedOffersProps {
  relatedPosts: Post[];
}

export default function RelatedOffers({ relatedPosts }: RelatedOffersProps) {

  if (relatedPosts.length === 0) {
    return null; // Don't render if no related posts
  }

  return (
    <section className="my-20">
      <h2 className="text-3xl md:text-4xl font-semibold mb-10 flex items-center gap-3 text-gray-900 border-b pb-4 border-gray-100">
        <svg className="w-8 h-8 text-indigo-500 drop-shadow-sm" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
        Related Offers
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/${post.slug}`}
            className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lg"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 blur-[6px] transition-opacity duration-500 pointer-events-none" />
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2 relative z-10 group-hover:text-indigo-600 transition-colors duration-300 line-clamp-2">
              {post.title}
            </h3>
            
            <p className="text-gray-600 mb-4 text-sm relative z-10 line-clamp-2">
              {post.summary}
            </p>

            <div className="flex justify-between items-center mb-4 relative z-10">
                <span className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded text-xs font-semibold">
                    {post.category}
                </span>
                <span className="text-green-700 font-semibold text-sm">
                    {post.offer.currency}{post.offer.price}
                </span>
            </div>

            <div className="mt-auto relative z-10">
                <span className="block w-full text-center bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 font-semibold py-2 rounded-xl text-sm hover:from-blue-600 hover:to-indigo-600 hover:text-white hover:shadow-lg transition-all duration-300">
                    {post.ctaText}
                </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
