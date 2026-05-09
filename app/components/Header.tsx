"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from "next/image";
import { Menu, X, ChevronRight, ChevronDown } from 'lucide-react';
import { Category } from '../types';

const Header: React.FC = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const categories = Object.values(Category);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCategoryOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNav = () => {
    setNavOpen(!navOpen);
    if (!navOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setMobileCategoryOpen(false);
    }
  };

  const closeNav = () => {
    setNavOpen(false);
    setMobileCategoryOpen(false);
    document.body.style.overflow = 'unset';
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Latest Codes', href: '/referral-aggregator' },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-lg py-3' 
          : 'bg-white py-5 shadow-sm'
      }`}
    >
      <a href="#content" className="sr-only focus:not-sr-only absolute top-4 left-4 bg-indigo-600 text-white p-2 rounded-md z-[110]">
        Skip to content
      </a>

      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center space-x-3 group">
          <Link href="/" className="flex items-center space-x-2 no-underline">
            <div className="relative w-10 h-10 transition-transform duration-300 group-hover:scale-110">
              <Image
                src="/logo.webp"
                alt="ReferralVerse Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight">
              Referral<span className="text-indigo-600">Verse</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav role="navigation" aria-label="Primary" className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              href={link.href} 
              className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 rounded-lg hover:bg-indigo-50 transition-all duration-200"
            >
              {link.name}
            </Link>
          ))}
          
          {/* Categories Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button 
              onMouseEnter={() => setCategoryOpen(true)}
              onClick={() => setCategoryOpen(!categoryOpen)}
              className={`flex items-center space-x-1 px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                categoryOpen ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              <span>Categories</span>
              <ChevronDown size={16} className={`transition-transform duration-200 ${categoryOpen ? 'rotate-180' : ''}`} />
            </button>

            {categoryOpen && (
              <div 
                onMouseLeave={() => setCategoryOpen(false)}
                className="absolute top-full right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 py-3 animate-in fade-in slide-in-from-top-5 duration-200"
              >
                {categories.map((cat) => (
                  <Link
                    key={cat}
                    href={`/category/${cat.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={() => setCategoryOpen(false)}
                    className="block px-6 py-2.5 text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          aria-expanded={navOpen}
          aria-controls="mobile-menu"
          aria-label={navOpen ? "Close menu" : "Open menu"}
          onClick={handleNav}
          className="p-2 text-slate-700 hover:text-indigo-600 md:hidden transition-colors rounded-lg hover:bg-slate-100"
        >
          {navOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[105] transition-opacity duration-300 md:hidden ${
          navOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeNav}
      />

      {/* Mobile Menu Side Panel */}
      <div 
        id="mobile-menu" 
        className={`fixed top-0 right-0 h-full w-[300px] bg-white shadow-2xl z-[110] transition-transform duration-500 transform md:hidden ${
          navOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-slate-100">
            <span className="text-xl font-bold text-slate-800">
              Referral<span className="text-indigo-600">Verse</span>
            </span>
            <button 
              onClick={closeNav} 
              className="p-2 text-slate-500 hover:text-indigo-600 transition-colors"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto py-6 px-4">
            <nav>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      onClick={closeNav}
                      className="flex items-center justify-between py-3 px-4 rounded-xl text-slate-700 font-semibold hover:bg-indigo-50 hover:text-indigo-600 transition-all group"
                    >
                      <span>{link.name}</span>
                      <ChevronRight size={18} className="text-slate-300 group-hover:text-indigo-400" />
                    </Link>
                  </li>
                ))}
                
                {/* Mobile Categories Accordion */}
                <li>
                  <button 
                    onClick={() => setMobileCategoryOpen(!mobileCategoryOpen)}
                    className={`flex items-center justify-between w-full py-3 px-4 rounded-xl font-semibold transition-all ${
                      mobileCategoryOpen ? 'bg-indigo-50 text-indigo-600' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>Categories</span>
                    <ChevronDown size={18} className={`transition-transform duration-200 ${mobileCategoryOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <div className={`overflow-hidden transition-all duration-300 ${mobileCategoryOpen ? 'max-h-[500px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                    <ul className="pl-4 space-y-1 border-l-2 border-indigo-100 ml-4">
                      {categories.map((cat) => (
                        <li key={cat}>
                          <Link
                            href={`/category/${cat.toLowerCase().replace(/\s+/g, '-')}`}
                            onClick={closeNav}
                            className="block py-2.5 px-4 text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors"
                          >
                            {cat}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              </ul>
            </nav>
          </div>

          </div>
        </div>
    </header>
  );
};

export default Header;