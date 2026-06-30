import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-300 mt-16 border-t border-slate-800">
      <div className="container mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 flex-shrink-0">
                <Image
                  src="/logo.webp"
                  alt="ReferralVerse Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xl font-bold text-white">
                Referral<span className="text-indigo-500">Verse</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-300">
              Your ultimate source for verified referral codes, promo offers, and exclusive signup bonuses across top Indian brands.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://www.linkedin.com/company/Referralverse" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
              </a>
              <a href="https://www.youtube.com/@ReferralVerse" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors" aria-label="YouTube">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
              </a>
              <a href="https://x.com/referralverse" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors" aria-label="Twitter/X">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
              <a href="https://github.com/taterlaxmi/referralverse" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors" aria-label="GitHub">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
              </a>
              <a href="https://www.pinterest.com/Referralverse/" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors" aria-label="Pinterest">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.08 3.16 9.43 7.63 11.17-.1-.95-.2-2.41.04-3.44.22-.94 1.4-5.91 1.4-5.91s-.36-.72-.36-1.78c0-1.66.96-2.91 2.17-2.91 1.02 0 1.52.77 1.52 1.69 0 1.03-.65 2.56-.99 3.99-.28 1.19.6 2.16 1.77 2.16 2.12 0 3.76-2.24 3.76-5.48 0-2.86-2.06-4.86-4.99-4.86-3.4 0-5.39 2.55-5.39 5.18 0 1.03.4 2.13.9 2.73.1.12.11.23.08.35l-.33 1.35c-.05.22-.17.27-.39.17-1.46-.68-2.37-2.82-2.37-4.54 0-3.69 2.68-7.08 7.74-7.08 4.06 0 7.22 2.89 7.22 6.76 0 4.04-2.54 7.29-6.07 7.29-1.19 0-2.3-.62-2.68-1.34 0 0-.59 2.24-.73 2.8-.27 1.03-1 2.31-1.49 3.1 1.12.35 2.31.54 3.54.54 6.63 0 12-5.37 12-12S18.63 0 12 0z" /></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6 uppercase tracking-wider text-xs">Navigation</h3>
            <ul className="space-y-4 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Categories Section */}
          <div>
            <h3 className="text-white font-semibold mb-6 uppercase tracking-wider text-xs">Top Categories</h3>
            <ul className="space-y-4 text-sm">
              <li><Link href="/category/shopping" className="hover:text-white transition-colors">Shopping Coupons</Link></li>
              <li><Link href="/category/fitness" className="hover:text-white transition-colors">Fitness & Health</Link></li>
              <li><Link href="/category/water-purifier" className="hover:text-white transition-colors">Water Purifiers</Link></li>
              <li><Link href="/llms.txt" className="flex items-center space-x-1 hover:text-white transition-colors">
                <span>AI Visibility (LLMs)</span>
                <ExternalLink size={14} />
              </Link></li>
            </ul>
          </div>

          {/* Contact/Newsletter Section */}
          <div>
            <h3 className="text-white font-semibold mb-6 uppercase tracking-wider text-xs">Get in Touch</h3>
            <p className="text-sm text-slate-300 mb-4">Have a code to share or found an expired one?</p>
            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 text-sm bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Mail size={16} />
              <span>Contact Us</span>
            </Link>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-slate-900 text-center text-xs text-slate-400">
          <p>&copy; {currentYear} ReferralVerse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;