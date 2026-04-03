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
      className={`flex items-center justify-center p-2.5 rounded-lg border transition-all duration-200 ${isCopied
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
      <h2 className="text-2xl font-semibold mb-6 text-gray-900 flex items-center gap-2">
        <Gift className="text-indigo-500" size={22} />
        <span>Offer Details</span>
      </h2>

      {/* Table Container with Visible Scrollbar */}
      <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-gray-50 shadow-sm hover:shadow-md transition-all duration-300 custom-scrollbar">
        <style jsx>{`
          .custom-scrollbar::-webkit-scrollbar {
            height: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f3f4f6;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #e0e7ff;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #c7d2fe;
          }
          @media (max-width: 640px) {
            .custom-scrollbar {
              scrollbar-width: thin;
              scrollbar-color: #e0e7ff #f3f4f6;
            }
          }
        `}</style>
        <table className="min-w-full divide-y divide-gray-100">
          <tbody className="divide-y divide-gray-100 text-gray-800">
            {/* Referral Code(s) */}
            {codes.length > 0 && (
              <tr className="hover:bg-gray-50/80 transition">
                <th className="py-4 px-5 text-left font-medium text-gray-600 w-auto md:w-48 whitespace-nowrap align-top pt-8">
                  Referral Code
                </th>
                <td className="py-4 px-5">
                  <div className="flex flex-col gap-4">
                    {/* Primary Code + Copy Row */}
                    <div className="flex items-center gap-3">
                      <div className="relative group">
                        <span className="font-mono text-xl font-bold text-indigo-600 bg-indigo-50/50 px-4 py-2 rounded-xl border border-indigo-100 select-all min-w-[140px] text-center inline-block">
                          {codes[currentIndex]}
                        </span>
                      </div>
                      <CopyButton code={codes[currentIndex]} />
                    </div>

                    {/* "Try Another" Action Button */}
                    {codes.length > 1 && (
                      <button
                        onClick={handleNextCode}
                        className="flex items-center justify-center md:justify-start gap-2 px-6 py-3 rounded-2xl text-sm font-bold text-indigo-700 bg-white border-2 border-indigo-50 shadow-sm hover:shadow-indigo-100/50 hover:bg-indigo-50 hover:border-indigo-100 transition-all active:scale-[0.98] w-full md:w-fit group/btn"
                        title="Rotate to a new code"
                      >
                        <RefreshCcw size={16} className="text-indigo-500 group-hover/btn:rotate-180 transition-transform duration-500" />
                        Try Another Code
                      </button>
                    )}

                    {/* Status Indicator & Note */}
                    {codes.length > 1 && (
                      <div className="flex items-start gap-3 bg-gradient-to-r from-indigo-50/60 to-white p-4 rounded-2xl border border-indigo-100/60 max-w-lg shadow-sm">
                        <div className="w-8 h-8 rounded-xl bg-white border border-indigo-100 flex items-center justify-center flex-shrink-0 shadow-sm">
                          <Info size={16} className="text-indigo-600" />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <p className="text-[0.85rem] text-gray-700 leading-snug font-medium">
                            Each Referral code works for max 5 users. If this one is exhausted,
                            please click <span className="text-indigo-600 font-bold decoration-indigo-200 decoration-2 underline-offset-2">Try Another</span> to see other codes.
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="px-3 py-1 bg-indigo-600 text-white text-[10px] font-black rounded-lg tracking-widest uppercase shadow-sm">
                              Option {currentIndex + 1} / {codes.length}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            )}

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

