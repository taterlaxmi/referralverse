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
            <div key={post.slug} className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div>
                  <h2 className="text-xl font-semibold">{post.title}</h2>
                </div>
              </div>

              {/* Post Summary */}
              <p className="text-gray-700 mb-4 leading-relaxed">
                {post.summary.length > 70 ? (
                  <>
                    {post.summary.slice(0, 70)}…
                    <a
                      href={`/${post.slug}`}
                      className="text-blue-600 font-medium hover:text-blue-700 hover:underline transition-colors duration-200 ml-1"
                    >
                      Read more
                    </a>
                  </>
                ) : (
                  post.summary
                )}
              </p>

              <div className="flex justify-between items-center">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {post.category}
                </span>
                <span className="text-green-600 font-semibold">
                  {post.offer.currency}{post.offer.price}
                </span>
              </div>
              <a
                href={`/${post.slug}`}
                className="mt-4 block w-full text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                {post.ctaText}
              </a>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-between mt-6">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            Previous
          </button>
          <span className="self-center">Page {currentPage} of {totalPages}</span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
}