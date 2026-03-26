import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import PostFeed from './components/PostFeed';

export default function Home() {
  return (
    <>
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