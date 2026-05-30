import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CheckCircle, ShieldCheck, Search, Link as LinkIcon, BadgeCheck } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - Our Manual Verification Process | ReferralVerse',
  description: 'Learn about ReferralVerse and our strict manual verification process for referral codes. We test every code to ensure you get the rewards you deserve.',
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FDFDFF]">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 bg-gradient-to-b from-indigo-50/50 to-white">
          <div className="container mx-auto max-w-4xl text-center">
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-widest text-indigo-600 uppercase bg-indigo-100/50 rounded-full">
              Our Mission
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
              No More <span className="text-indigo-600 line-through decoration-red-500 decoration-4">Expired</span> Codes.
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              We built ReferralVerse to solve one massive problem: the frustration of trying a dozen referral codes only to find out they are all expired or invalid.
            </p>
          </div>
        </section>

        {/* Editorial Bio & Verification Process */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden flex flex-col md:flex-row">

              {/* Bio Image/Sidebar */}
              <div className="md:w-1/3 bg-slate-900 p-8 text-white flex flex-col justify-center items-center text-center">
                <div className="w-32 h-32 bg-indigo-600 rounded-full mb-6 flex items-center justify-center border-4 border-slate-800 shadow-inner">
                  <span className="text-4xl font-black text-white tracking-tighter">RV</span>
                </div>
                <h3 className="text-2xl font-bold mb-1">Laxmi</h3>
                <p className="text-indigo-300 font-medium mb-6">Founder & Chief Editor</p>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <BadgeCheck size={16} className="text-emerald-400" />
                  <span>Manual Verifier</span>
                </div>
              </div>

              {/* Bio Content */}
              <div className="md:w-2/3 p-8 md:p-12">
                <div className="flex items-center gap-2 mb-4">
                  <ShieldCheck className="text-indigo-600" size={24} />
                  <h2 className="text-2xl font-bold text-slate-900">Why trust our codes?</h2>
                </div>
                <div className="space-y-4 text-slate-600 leading-relaxed">
                  <p>
                    Hi, I'm Laxmi. I started ReferralVerse because I was tired of the spammy, automated coupon sites that scrape the web and serve you broken links.
                  </p>
                  <p>
                    <strong>Here is our promise to you:</strong> Every single referral code, invite link, and signup bonus listed on our core pages is <em>manually verified</em>.
                  </p>
                  <p>
                    Before a code makes it to the site, we personally test it, read the fine print, and confirm that the reward structure is currently active. When an app limits referrals (like Kiwi's 3-user limit), we actively monitor and rotate fresh codes submitted by our community to ensure you always get your signup bonus.
                  </p>
                </div>

                <div className="mt-8 pt-8 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-emerald-50 p-2 rounded-lg text-emerald-600 shrink-0">
                      <CheckCircle size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Tested Manually</h4>
                      <p className="text-xs text-slate-500 mt-1">We don't use bots to scrape fake codes.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600 shrink-0">
                      <Search size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Fine Print Checked</h4>
                      <p className="text-xs text-slate-500 mt-1">We break down exactly how to claim the bonus.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-16 px-4 bg-slate-50">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Connect With Us</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://x.com/referralverse" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-white rounded-xl border border-slate-200 text-slate-700 font-semibold hover:border-slate-300 hover:shadow-sm transition-all">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                Twitter / X
              </a>
              <a href="https://www.linkedin.com/company/Referralverse" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-white rounded-xl border border-slate-200 text-slate-700 font-semibold hover:border-slate-300 hover:shadow-sm transition-all">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                LinkedIn
              </a>
              <a href="https://www.trustpilot.com/review/referralverse.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-white rounded-xl border border-slate-200 text-slate-700 font-semibold hover:border-emerald-300 hover:shadow-sm hover:text-emerald-700 transition-all">
                <BadgeCheck size={18} />
                TrustPilot
              </a>
              <a href="https://open.spotify.com/show/033oAL3Rz1Ad9eCT5fFNao" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-white rounded-xl border border-slate-200 text-slate-700 font-semibold hover:border-green-300 hover:shadow-sm hover:text-green-600 transition-all">
                <LinkIcon size={18} />
                Spotify
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
