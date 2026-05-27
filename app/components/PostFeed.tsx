"use client";
import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Post } from '../types';
import { posts } from '../data/post';
import SearchBar from './SearchBar';
import CategoryMenu from './CategoryMenu';
import * as schemaUtils from '../utils/schema';

const POSTS_PER_PAGE = 6;

function PostFeedContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Get initial search term from URL
    const initialSearchTerm = searchParams.get('q') || '';

    // States for search and category
    const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');

    // Get current page from URL params, default to 1
    const currentPageParam = searchParams.get('page');
    const currentPage = currentPageParam ? parseInt(currentPageParam, 10) : 1;

    const categories = ['All', ...new Set(posts.map(post => post.category))];

    const filteredPosts = useMemo(() => {
        return posts.filter(post => {
            const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
            const matchesSearch = searchTerm === '' ||
                post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.category.toLowerCase().includes(searchTerm.toLowerCase())
            return matchesCategory && matchesSearch;
        });
    }, [searchTerm, selectedCategory]);

    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

    // Calculate the posts to display based on the current page
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const currentPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

    const updatePage = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', newPage.toString());
        router.push(`/?${params.toString()}`, { scroll: false });

        // Scroll to top of the feed grid when page changes
        const feedElement = document.getElementById('post-feed-grid');
        if (feedElement) {
            feedElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            updatePage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            updatePage(currentPage - 1);
        }
    };

    const handleSearchChange = (newTerm: string) => {
        setSearchTerm(newTerm);
        // Reset to page 1 when search changes and update URL
        const params = new URLSearchParams(searchParams.toString());
        params.delete('page');
        if (newTerm) {
            params.set('q', newTerm);
        } else {
            params.delete('q');
        }
        router.push(`/?${params.toString()}`, { scroll: false });
    };

    const handleCategoryChange = (newCategory: string) => {
        setSelectedCategory(newCategory);
        // Reset to page 1 when category changes
        const params = new URLSearchParams(searchParams.toString());
        params.delete('page');
        router.push(`/?${params.toString()}`, { scroll: false });
    };

    return (
        <>
            <SearchBar searchTerm={searchTerm} setSearchTerm={handleSearchChange} />

            <CategoryMenu
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={handleCategoryChange}
            />

            <div id="post-feed-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 scroll-mt-20">
                {currentPosts.map((post: Post) => (
                    <Link
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
                                        Read more <span className="sr-only">about {post.brand} referral code</span>
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
                            <span className="text-green-700 font-semibold">
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

                    </Link>
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
        </>
    );
}

function PostFeedSkeleton() {
    return (
        <div className="w-full">
            {/* Search Bar Skeleton */}
            <div className="my-8 max-w-2xl mx-auto">
                <div className="w-full h-12 rounded-full bg-gray-100 animate-pulse border border-gray-50"></div>
            </div>

            {/* Category Menu Skeleton */}
            <div className="mb-10 flex flex-wrap justify-center gap-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="h-9 w-24 bg-gray-100 animate-pulse rounded-full"></div>
                ))}
            </div>

            {/* Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="bg-white rounded-2xl border border-gray-50 shadow-sm p-6 flex flex-col h-[280px] animate-pulse">
                        <div className="h-7 bg-gray-100 rounded-md w-3/4 mb-4"></div>
                        <div className="h-4 bg-gray-100 rounded w-full mb-2"></div>
                        <div className="h-4 bg-gray-100 rounded w-5/6 mb-4"></div>
                        <div className="mt-auto flex justify-between items-center mb-4">
                            <div className="h-7 w-20 bg-gray-100 rounded-full"></div>
                            <div className="h-6 w-16 bg-gray-100 rounded"></div>
                        </div>
                        <div className="h-10 w-full bg-gray-100 rounded-xl"></div>
                    </div>
                ))}
            </div>

            {/* Pagination Controls Skeleton */}
            <div className="flex items-center justify-center gap-4 mt-10">
                <div className="h-10 w-28 bg-gray-100 rounded-lg animate-pulse"></div>
                <div className="h-10 w-32 bg-gray-100 rounded-lg animate-pulse"></div>
                <div className="h-10 w-28 bg-gray-100 rounded-lg animate-pulse"></div>
            </div>
        </div>
    );
}

export default function PostFeed() {
    return (
        <Suspense fallback={<PostFeedSkeleton />}>
            <PostFeedContent />
        </Suspense>
    );
}
