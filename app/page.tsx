import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import PostFeed from './components/PostFeed';
import { posts } from './data/post';
import * as schemaUtils from './utils/schema';

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Home({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const q = typeof resolvedParams.q === 'string' ? resolvedParams.q : '';
  const page = typeof resolvedParams.page === 'string' ? parseInt(resolvedParams.page, 10) : 1;
  
  const homeSchema = schemaUtils.getHomeGraphSchema(posts, q, page);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
      />
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center my-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">Find the Best Deals & Coupons</h1>
        </div>

        <PostFeed />

      </main>
      <Footer />
    </>
  );
}