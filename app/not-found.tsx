import React from 'react';
import Link from 'next/link';
import { Search, Home, ArrowRight } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-[70vh] flex items-center justify-center px-4 pt-28 pb-16 bg-gradient-to-b from-white to-indigo-50/30">
        <div className="max-w-2xl w-full text-center space-y-8">
          
          {/* 404 Visual */}
          <div className="relative">
            <h1 className="text-9xl font-black text-slate-100 tracking-tighter select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-indigo-100 text-indigo-600 p-4 rounded-full shadow-sm">
                <Search size={48} className="animate-pulse" />
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              Oops! We lost that page.
            </h2>
            <p className="text-slate-500 text-lg max-w-md mx-auto">
              We couldn't find the referral code or offer you were looking for. It might have been moved or removed.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link 
              href="/"
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 hover:shadow-md hover:shadow-indigo-200 transition-all active:scale-95"
            >
              <Home size={18} />
              <span>Back to Home</span>
            </Link>
            
            <Link 
              href="/referral-aggregator"
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 bg-white text-slate-700 font-semibold rounded-xl border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-95"
            >
              <span>See All Offers</span>
              <ArrowRight size={18} />
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
