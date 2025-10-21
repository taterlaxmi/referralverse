"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const MenuIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const Header: React.FC = () => {
  const [navOpen, setNavOpen] = useState(false);

  const handleNav = () => {
    setNavOpen(!navOpen);
  };

  const navLinks = (
    <>
      <li className="p-4 border-b border-gray-600 md:border-0 md:p-0">
        <Link href="/" className="text-gray-300 md:text-gray-600 hover:text-indigo-400 md:hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</Link>
      </li>
      <li className="p-4 border-b border-gray-600 md:border-0 md:p-0">
        <Link href="/about" className="text-gray-300 md:text-gray-600 hover:text-indigo-400 md:hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">About</Link>
      </li>
      <li className="p-4 md:border-0 md:p-0">
        <Link href="/contact" className="text-gray-300 md:text-gray-600 hover:text-indigo-400 md:hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Contact</Link>
      </li>
    </>
  );

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <a href="#content" className="sr-only focus:not-sr-only p-2">Skip to content</a>

      <div className="container mx-auto px-4 h-20 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800 hover:text-indigo-600 transition-colors">
          Referral<span className="text-indigo-600">Verse</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav role="navigation" aria-label="Primary" className="hidden md:flex items-center">
          <ul className="flex space-x-4">
            {navLinks}
          </ul>
        </nav>

        {/* Mobile Navigation Toggle */}
        <button
          aria-expanded={navOpen}
          aria-controls="mobile-menu"
          onClick={handleNav}
          className='block md:hidden text-gray-800 cursor-pointer p-2'
        >
          {navOpen ? <CloseIcon className="h-6 w-6"/> : <MenuIcon className="h-6 w-6" />}
        </button>
        
        {/* Mobile Navigation Menu */}
        <div id="mobile-menu" className={navOpen ? 'fixed left-0 top-0 w-[65%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500' : 'ease-in-out duration-500 fixed left-[-100%] top-0 h-full w-[65%]'}>
          <div className="p-4">
            <Link href="/" className="text-2xl font-bold text-white" onClick={() => setNavOpen(false)}>
              Referral<span className="text-indigo-500">Verse</span>
            </Link>
          </div>
          <ul className="uppercase p-4">
            {navLinks}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;