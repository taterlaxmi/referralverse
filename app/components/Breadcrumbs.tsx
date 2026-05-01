import React from 'react';
import Link from 'next/link';

interface BreadcrumbsProps {
  category: string;
  title: string;
}

export default function Breadcrumbs({ category, title }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center text-sm font-medium mb-8 whitespace-nowrap overflow-x-auto pb-2 scrollbar-hide" aria-label="Breadcrumb">
      {/* Container pill */}
      <ol className="flex items-center p-1.5 bg-gray-50/80 backdrop-blur-sm border border-gray-200/60 rounded-full shadow-sm ring-1 ring-black/5">
        
        {/* Home */}
        <li className="flex items-center">
          <Link 
            href="/" 
            className="flex items-center gap-1.5 px-3 py-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50/50 rounded-full transition-all duration-200"
          >
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="hidden sm:inline">Home</span>
          </Link>
        </li>

        <li className="text-gray-300 mx-0.5">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </li>

        {/* Category */}
        <li className="flex items-center">
          {/* Using search query for category since hub pages aren't built yet */}
          <Link 
            href={`/?q=${category}`} 
            className="flex items-center gap-1.5 px-3 py-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50/50 rounded-full transition-all duration-200"
          >
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span>{category}</span>
          </Link>
        </li>

        <li className="text-gray-300 mx-0.5">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </li>

        {/* Title (Active Page) */}
        <li className="flex items-center">
          <span 
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-indigo-700 rounded-full shadow-sm ring-1 ring-black/5 truncate max-w-[140px] sm:max-w-[200px] md:max-w-md" 
            aria-current="page"
          >
            <svg className="w-4 h-4 text-indigo-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m0-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" />
            </svg>
            <span className="truncate">{title}</span>
          </span>
        </li>

      </ol>
    </nav>
  );
}
