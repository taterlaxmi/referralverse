"use client";
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { RefreshCw, ExternalLink, Copy, Check } from 'lucide-react';

interface Deal {
  application: string;
  code: string;
  signUpBonus: string;
  referralBonus: string;
}

const REDDIT_SOURCE = {
  label: 'Reddit Community',
  emoji: '🔴',
  apiPath: '/api/reddit-referrals',
  description: 'Fetching the latest real-time referral codes from r/IndiaReferral.',
};

export default function ReferralAggregatorPage() {
  const [loading, setLoading] = useState(false);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [hasFetched, setHasFetched] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleFetchDeals = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(REDDIT_SOURCE.apiPath);
      if (!response.ok) throw new Error('Failed to fetch from community API');
      const data = await response.json();

      if (data.warning) {
        setError(`Note: ${data.warning}`);
      }

      const fetchedDeals = data.deals || [];
      setDeals(fetchedDeals);
      setHasFetched(true);

      if (!data.warning && fetchedDeals.length === 0) {
        setError('No new referral codes found in the last hour. Please try again later.');
      }
    } catch (e) {
      console.error(e);
      setError('Connection error: Unable to reach the referral community at the moment.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(text);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFDFF]">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-5xl mx-auto">

          {/* Hero Section */}
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-widest text-indigo-600 uppercase bg-indigo-50 rounded-full">
              Live Feed
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
              Referral <span className="text-indigo-600">Aggregator</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Real-time referral codes aggregated from Reddit's most active communities, verified and structured by AI.
            </p>
          </div>

          {/* Action Center */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 mb-10 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
            
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                {REDDIT_SOURCE.description}
              </div>
              
              <button
                onClick={handleFetchDeals}
                disabled={loading}
                className={`
                  group relative inline-flex items-center gap-3 px-10 py-4 
                  bg-gray-900 text-white font-bold rounded-2xl
                  shadow-[0_10px_20px_-10px_rgba(0,0,0,0.3)]
                  hover:bg-indigo-600 hover:shadow-indigo-200/50
                  transition-all duration-300 transform active:scale-95
                  disabled:opacity-70 disabled:cursor-not-allowed
                `}
              >
                <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
                {loading ? 'Processing Reddit Data...' : hasFetched ? 'Update Live Feed' : 'Launch Aggregator'}
              </button>
            </div>
          </div>

          {/* Error / Warning States */}
          {error && (
            <div className="mb-8 p-5 bg-indigo-50/50 border border-indigo-100 text-indigo-900 rounded-2xl text-center font-medium animate-in fade-in slide-in-from-top-4">
              {error}
            </div>
          )}

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
                        {loading ? (
                          <div className="flex flex-col items-center gap-4">
                            <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                            <p className="text-gray-400 font-medium">Scouring the community for codes...</p>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-3">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-2">
                              <ExternalLink className="w-8 h-8 text-gray-300" />
                            </div>
                            <p className="text-gray-500 font-semibold text-lg">No codes fetched yet</p>
                            <p className="text-gray-400 text-sm">Click the button above to start the aggregation process.</p>
                          </div>
                        )}
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
                          <div className="text-gray-700 font-medium">{deal.signUpBonus}</div>
                        </td>
                        <td className="p-6">
                          <div className="text-emerald-600 font-bold">{deal.referralBonus}</div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {deals.length > 0 && (
            <div className="flex items-center justify-center gap-6 mt-8">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                {deals.length} Active Codes
              </div>
              <div className="h-4 w-px bg-gray-200"></div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                AI Structured results
              </div>
            </div>
          )}

        </div>
      </main>
      <Footer />
    </div>
  );
}

0