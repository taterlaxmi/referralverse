"use client";
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ExternalLink, Copy, Check, Calendar } from 'lucide-react';
import aggregatedDeals from '../data/aggregated-deals.json';

interface Deal {
  application: string;
  code: string;
  signUpBonus: string | number | null;
  referralBonus: string | number | null;
}

export default function ReferralAggregatorPage() {
  const [deals] = useState<Deal[]>(aggregatedDeals.deals);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [lastUpdated] = useState<string>(aggregatedDeals.lastUpdated);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(text);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const formatDate = (dateString: string) => {
    try {
      return new Intl.DateTimeFormat('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(new Date(dateString));
    } catch {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFDFF]">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-5xl mx-auto">

          {/* Hero Section */}
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-widest text-indigo-600 uppercase bg-indigo-50 rounded-full">
              Verified Collection
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
              Referral <span className="text-indigo-600">Aggregator</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              A curated collection of verified referral codes from across the Indian community, updated automatically by AI.
            </p>
          </div>

          {/* Status Bar */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Last Updated</p>
                <p className="text-sm font-bold text-gray-800">{formatDate(lastUpdated)}</p>
              </div>
            </div>

            <div className="px-6 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-bold border border-emerald-100 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {deals.length} Active Referral Codes
            </div>
          </div>

          {/* Results Table */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100">
                    <th className="p-6 font-bold text-gray-900 uppercase tracking-wider text-xs">Application</th>
                    <th className="p-6 font-bold text-gray-900 uppercase tracking-wider text-xs">Reward Code</th>
                    <th className="p-6 font-bold text-gray-900 uppercase tracking-wider text-xs">Sign Up Perk</th>
                    <th className="p-6 font-bold text-gray-900 uppercase tracking-wider text-xs">Referral Bonus</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {deals.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="p-24 text-center">
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-2">
                            <ExternalLink className="w-8 h-8 text-gray-300" />
                          </div>
                          <p className="text-gray-500 font-semibold text-lg">Collection Empty</p>
                          <p className="text-gray-400 text-sm">The automated aggregator will update this list shortly.</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    deals.map((deal, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/80 transition-colors group">
                        <td className="p-6">
                          <div className="font-bold text-gray-900 text-lg">{deal.application}</div>
                        </td>
                        <td className="p-6">
                          <button
                            onClick={() => copyToClipboard(deal.code)}
                            className="flex items-center gap-2 font-mono font-bold text-indigo-600 bg-indigo-50/80 px-4 py-2 rounded-xl border border-indigo-100 hover:bg-indigo-600 hover:text-white transition-all transform hover:scale-105 active:scale-95"
                          >
                            {deal.code}
                            {copiedCode === deal.code ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />}
                          </button>
                        </td>
                        <td className="p-6">
                          <div className="text-gray-700 font-medium">{deal.signUpBonus || 'Not specified'}</div>
                        </td>
                        <td className="p-6">
                          <div className="text-emerald-600 font-bold">{deal.referralBonus || 'Not specified'}</div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-12 p-8 bg-gray-50 rounded-3xl border border-gray-100 text-center">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Want to add your referral code?</h3>
            <p className="text-gray-600 mb-6">Post your referral codes in the <strong>r/IndiaReferral</strong> subreddit to get featured in our automated tracker.</p>
            <a
              href="https://www.reddit.com/r/IndiaReferral/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-indigo-600 font-bold hover:underline"
            >
              Visit Community <ExternalLink className="w-4 h-4" />
            </a>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}