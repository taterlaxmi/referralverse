"use client";

import React, { useEffect, useState } from 'react';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  // Debounce the search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300); // Wait 300ms after user stops typing

    // Cleanup function to cancel the timeout if the user types again
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  return (
    <div className="my-8 max-w-2xl mx-auto">
      <div className="relative group transition-all duration-300">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-indigo-500 transition-transform duration-300 group-hover:scale-110"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
            />
          </svg>
        </div>

        <input
          type="text"
          placeholder="Search by title, category, or code..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-full bg-white/70 backdrop-blur-sm 
                 border border-gray-200 shadow-md focus:border-indigo-400 
                 focus:ring-2 focus:ring-indigo-200 focus:outline-none
                 placeholder-gray-500 text-gray-800
                 transition-all duration-300 ease-in-out
                 hover:shadow-lg"
        />
      </div>
    </div>

  );
};

export default SearchBar;