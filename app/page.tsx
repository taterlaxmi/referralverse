"use client";
import React, { useState, useMemo } from 'react';
import { Post } from './types';
import { posts } from './data/post';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import CategoryMenu from './components/CategoryMenu';

const POSTS_PER_PAGE = 6;

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...new Set(posts.map(post => post.category))];

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const matchesSearch = searchTerm === '' ||
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.referralCode.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the posts to display based on the current page
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center my-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">Find the Best Deals & Coupons</h1>
        </div>

        {/* Search Bar */}
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {/* Category Menu */}
        <CategoryMenu
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentPosts.map((post: Post) => (
            <a
              key={post.slug}
              href={`/${post.slug}`}
              className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col justify-between
                 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lg"
            >
              {/* Gradient border glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
                      opacity-0 group-hover:opacity-20 blur-[6px] transition-opacity duration-500 pointer-events-none" />

              {/* Title */}
              <h2 className="text-xl font-semibold text-gray-900 mb-3 relative z-10 
                     group-hover:text-indigo-600 transition-colors duration-300">
                {post.title}
              </h2>

              {/* Summary */}
              <p className="text-gray-700 mb-4 leading-relaxed text-[0.95rem] relative z-10">
                {post.summary.length > 70 ? (
                  <>
                    {post.summary.slice(0, 70)}…
                    <span className="text-indigo-600 font-medium ml-1 group-hover:underline transition-all duration-200">
                      Read more
                    </span>
                  </>
                ) : (
                  post.summary
                )}
              </p>

              {/* Category & Offer */}
              <div className="flex justify-between items-center mb-4 relative z-10">
                <span className="bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">
                  {post.category}
                </span>
                <span className="text-green-600 font-semibold">
                  {post.offer.currency}{post.offer.price}
                </span>
              </div>

              {/* CTA Button */}
              <div className="mt-auto relative z-10">
                <span
                  className="block w-full text-center 
               bg-gradient-to-r from-blue-100 to-indigo-100 
               text-blue-700 font-semibold py-2 rounded-xl 
               hover:from-blue-600 hover:to-indigo-600 
               hover:text-white hover:shadow-lg hover:scale-[1.03] 
               transition-all duration-300"
                >
                  {post.ctaText}
                </span>
              </div>

            </a>
          ))}
        </div>


        {/* Pagination Controls */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium 
               bg-gradient-to-r from-blue-600 to-indigo-600 text-white 
               hover:from-blue-700 hover:to-indigo-700 
               shadow-md hover:shadow-lg 
               disabled:opacity-50 disabled:cursor-not-allowed 
               transition-all duration-300"
          >
            ← Previous
          </button>

          <div
            className="px-5 py-2.5 rounded-lg bg-white border border-gray-200 
               shadow-sm text-gray-700 font-medium text-sm 
               tracking-wide"
          >
            Page <span className="text-blue-600 font-semibold">{currentPage}</span> of{" "}
            <span className="text-gray-800 font-semibold">{totalPages}</span>
          </div>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium 
               bg-gradient-to-r from-indigo-600 to-purple-600 text-white 
               hover:from-indigo-700 hover:to-purple-700 
               shadow-md hover:shadow-lg 
               disabled:opacity-50 disabled:cursor-not-allowed 
               transition-all duration-300"
          >
            Next →
          </button>
        </div>



      </main>
      <Footer />
    </>
  );
}