"use client";

import React from 'react';

interface CategoryMenuProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const CategoryMenu: React.FC<CategoryMenuProps> = ({ categories, selectedCategory, setSelectedCategory }) => {
  return (
    <div className="mb-10 flex flex-wrap justify-center gap-2">
      {categories.map(category => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
            selectedCategory === category
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryMenu;