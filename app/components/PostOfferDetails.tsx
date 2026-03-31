"use client";
import { useState, useEffect } from "react";
import type { Post } from "../types";
import { Copy as CopyIcon, Check as CheckIcon, Link as LinkIcon, Gift, RefreshCcw, Info } from "lucide-react";

function CopyButton({ code, onCopy }: { code: string; onCopy?: () => void }) {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(code);
        setIsCopied(true);
        if (onCopy) onCopy();
        setTimeout(() => setIsCopied(false), 2000);
      } catch {
        // ignore errors
      }
    }
  };

  return (
    <button
      onClick={copyToClipboard}
      className={`flex items-center justify-center p-2.5 rounded-lg border transition-all duration-200 ${
        isCopied
          ? "bg-green-500 border-green-500 text-white"
          : "bg-white border-gray-200 text-gray-700 hover:bg-gray-100"
      }`}
      aria-label="Copy referral code"
    >
      {isCopied ? <CheckIcon size={18} /> : <CopyIcon size={18} />}
    </button>
  );
}

export default function PostOfferDetails({ post }: { post: Post }) {
  const codes = Array.isArray(post.referralCode) ? post.referralCode : [post.referralCode];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Randomize initial code on mount to distribute usage fairly
  useEffect(() => {
    if (codes.length > 1) {
      const randomIndex = Math.floor(Math.random() * codes.length);
      setCurrentIndex(randomIndex);
    }
  }, [codes.length]);

  const handleNextCode = () => {
    setCurrentIndex((prev: number) => (prev + 1) % codes.length);
  };

  return (
    <div className="my-10">
      {/* Header */}
      <h3 className="text-2xl font-semibold mb-6 text-gray-900 flex items-center gap-2">
        <Gift className="text-indigo-500" size={22} />
        <span>Offer Details</span>
      </h3>

      {/* Table Container */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-gray-50 shadow-sm hover:shadow-md transition-all duration-300">
        <table className="min-w-full divide-y divide-gray-100">
          <tbody className="divide-y divide-gray-100 text-gray-800">
            {/* Referral Code(s) */}
            <tr className="hover:bg-gray-50/80 transition">
              <th className="py-4 px-5 text-left font-medium text-gray-600 w-48">
                Referral Code
              </th>
              <td className="py-4 px-5">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <div className="relative group">
                      <span className="font-mono text-xl font-bold text-indigo-600 bg-indigo-50/50 px-4 py-2 rounded-xl border border-indigo-100 select-all min-w-[140px] text-center inline-block">
                        {codes[currentIndex]}
                      </span>
                    </div>
                    <CopyButton code={codes[currentIndex]} />
                    
                    {codes.length > 1 && (
                      <button
                        onClick={handleNextCode}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-200 border border-gray-200 transition-all active:scale-95"
                        title="Try another code if this one is used up"
                      >
                        <RefreshCcw size={16} className="text-indigo-500" />
                        Try Another
                      </button>
                    )}
                  </div>
                  
                  {codes.length > 1 && (
                    <div className="flex items-start gap-2 mt-2 bg-indigo-50/30 p-2 rounded-lg border border-indigo-100/50">
                      <Info size={14} className="text-indigo-400 mt-0.5" />
                      <div className="flex flex-col gap-1">
                        <p className="text-xs text-gray-700 leading-tight">
                          Each code has a limited number of uses. Not working? 
                          <span className="text-indigo-600 font-semibold ml-1">Try another one for a fresh bonus!</span>
                        </p>
                        <p className="text-[10px] text-indigo-400 font-bold tracking-widest uppercase mt-0.5">
                           Code {currentIndex + 1} of {codes.length}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </td>
            </tr>

            {/* Referral Link */}
            <tr className="hover:bg-gray-50/80 transition">
              <th className="py-4 px-5 text-left font-medium text-gray-600">
                Referral Link
              </th>
              <td className="py-4 px-5">
                <a
                  href={post.referralLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-indigo-600 font-medium hover:underline hover:text-indigo-700 transition-colors"
                >
                  <LinkIcon size={16} />
                  {post.ctaText}
                </a>
              </td>
            </tr>

            {/* Signup Bonus */}
            <tr className="hover:bg-gray-50/80 transition">
              <th className="py-4 px-5 text-left font-medium text-gray-600">
                Signup Bonus
              </th>
              <td className="py-4 px-5 text-gray-900 font-medium">{post.signupBonus}</td>
            </tr>

            {/* Referral Bonus */}
            <tr className="hover:bg-gray-50/80 transition">
              <th className="py-4 px-5 text-left font-medium text-gray-600">
                Referral Bonus
              </th>
              <td className="py-4 px-5 text-gray-900 font-medium">{post.referralBonus}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

