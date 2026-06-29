"use client";
import { useState, useEffect } from "react";
import type { Post } from "../types";
import { Copy as CopyIcon, Check as CheckIcon, Link as LinkIcon, Gift, RefreshCcw, Info, Send } from "lucide-react";
import SubmitCodeModal from "./SubmitCodeModal";
import { getDisplayReferralCodes } from "../lib/referral-codes";

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
      className={`flex items-center justify-center p-2.5 rounded-lg border transition-all duration-200 copy-referral-code-btn [&>svg]:pointer-events-none ${isCopied
        ? "bg-green-500 border-green-500 text-white"
        : "bg-white border-gray-200 text-gray-700 hover:bg-gray-100"
        }`}
      id={`copy-referral-code-${code}`}
      aria-label="Copy referral code"
    >
      {isCopied ? <CheckIcon size={18} /> : <CopyIcon size={18} />}
    </button>
  );
}

export default function PostOfferDetails({ post, dynamicReferralCodes }: { post: Post; dynamicReferralCodes?: string[] }) {
  const maxCodes = 4;
  const isMultiple = Array.isArray(post.referralCode);
  const staticCodesArray = isMultiple ? (post.referralCode as string[]) : [post.referralCode as string];
  const dynamicCodesArray = Array.isArray(dynamicReferralCodes) ? dynamicReferralCodes : [];
  const availableCodes = dynamicCodesArray.length > 0 ? dynamicCodesArray : staticCodesArray;
  const referralCodesArray = availableCodes.filter((code): code is string => Boolean(code));

  // Initially (SSR), just take the first N codes to ensure static HTML has codes for Googlebot
  const initialCodes = referralCodesArray.slice(0, maxCodes);

  const [displayCodes, setDisplayCodes] = useState<string[]>(
    getDisplayReferralCodes(dynamicReferralCodes, initialCodes, maxCodes)
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (post.slug === "kiwi-referral-code") {
      setDisplayCodes(getDisplayReferralCodes(dynamicReferralCodes, initialCodes, maxCodes));
      return;
    }

    if (isMultiple && referralCodesArray.length > 1) {
      const shuffleAndSet = () => {
        const shuffled = [...referralCodesArray].sort(() => 0.5 - Math.random());
        setDisplayCodes(shuffled.slice(0, maxCodes));
      };
      shuffleAndSet();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post.referralCode, isMultiple, post.slug, dynamicReferralCodes]);

  const handleRotateCodes = () => {
    if (referralCodesArray.length > maxCodes) {
      const shuffled = [...referralCodesArray].sort(() => 0.5 - Math.random());
      setDisplayCodes(shuffled.slice(0, maxCodes));
    }
  };

  return (
    <div className="my-10">
      {/* Header */}
      <h2 id="offer" className="text-2xl font-semibold mb-6 text-gray-900 flex items-center gap-2">
        <Gift className="text-indigo-500" size={22} />
        <span>Verified Offer Details</span>
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
            {displayCodes.length > 0 && (
              <tr id="referral-code" className="hover:bg-gray-50/80 transition scroll-mt-24">
                <th className="py-4 px-5 text-left font-medium text-gray-600 w-auto md:w-48 align-top pt-8">
                  <div className="flex flex-col gap-1">
                    <span>Referral Code</span>
                    <span className="inline-flex w-fit items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 rounded px-1.5 py-0.5 mt-0.5">
                      <CheckIcon size={10} /> Active
                    </span>
                  </div>
                </th>
                <td className="py-4 px-5">
                  <div className="flex flex-col gap-4">
                    {/* Primary Code + Copy Row */}
                    <ul className="flex flex-col gap-3">
                      {displayCodes.map((code, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                          <div className="relative group">
                            <span className="font-mono text-xl font-bold text-indigo-600 bg-indigo-50/50 px-4 py-2 rounded-xl border border-indigo-100 select-all min-w-[140px] text-center inline-block">
                              {code}
                            </span>
                          </div>
                          <CopyButton code={code} />
                        </li>
                      ))}
                    </ul>

                    {/* "Rotate Codes" Action Button */}
                    {referralCodesArray.length > maxCodes && (
                      <button
                        onClick={handleRotateCodes}
                        className="flex items-center justify-center md:justify-start gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-indigo-700 bg-white border border-indigo-200 shadow-sm hover:shadow-md hover:bg-indigo-50 hover:border-indigo-300 transition-all active:scale-[0.98] w-full md:w-fit group/btn ring-1 ring-indigo-100"
                        title="Show more codes"
                      >
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 transition-colors group-hover/btn:bg-indigo-100">
                          <RefreshCcw size={15} className="group-hover/btn:rotate-180 transition-transform duration-500" />
                        </span>
                        <span>Show more codes</span>
                      </button>
                    )}

                    {/* Status Indicator & Note */}
                    {post.referralCodeNote && (
                      <div className="flex items-start gap-3 bg-gradient-to-r from-indigo-50/60 to-white p-4 rounded-2xl border border-indigo-100/60 max-w-lg shadow-sm">
                        <div className="w-8 h-8 rounded-xl bg-white border border-indigo-100 flex items-center justify-center flex-shrink-0 shadow-sm">
                          <Info size={16} className="text-indigo-600" />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <p className="text-[0.85rem] text-gray-700 leading-snug font-medium">
                            {post.referralCodeNote}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Submit Code Prompt */}
                    {((isMultiple && referralCodesArray.length > 1) || post.slug === "kiwi-referral-code") && (
                      <div className="mt-2 bg-indigo-50/60 p-4 rounded-2xl border border-indigo-100 max-w-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
                        <div className="text-sm font-medium text-slate-700">
                          Have your own {post.brand} code?
                        </div>
                        <button
                          onClick={() => setIsModalOpen(true)}
                          className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl text-sm font-semibold transition-colors shadow-sm active:scale-[0.98] w-full sm:w-auto flex-shrink-0"
                        >
                          <Send size={14} />
                          <span>Share yours here</span>
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            )}

            {/* Referral Link */}
            <tr id="referral-link" className="hover:bg-gray-50/80 transition scroll-mt-24">
              <th className="py-4 px-5 text-left font-medium text-gray-600">
                Referral Link
              </th>
              <td className="py-4 px-5">
                <a
                  href={post.referralLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="referral-link-btn inline-flex items-center gap-1.5 text-indigo-600 font-medium hover:underline hover:text-indigo-700 transition-colors"
                >
                  <LinkIcon size={16} />
                  {post.ctaText}
                </a>
              </td>
            </tr>

            {/* Signup Bonus */}
            <tr id="signup-bonus" className="hover:bg-gray-50/80 transition">
              <th className="py-4 px-5 text-left font-medium text-gray-600">
                Signup Bonus
              </th>
              <td className="py-4 px-5 text-gray-900 font-medium">{post.signupBonus}</td>
            </tr>

            {/* Referral Bonus */}
            <tr id="referral-bonus" className="hover:bg-gray-50/80 transition">
              <th className="py-4 px-5 text-left font-medium text-gray-600">
                Referral Bonus
              </th>
              <td className="py-4 px-5 text-gray-900 font-medium">{post.referralBonus}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <SubmitCodeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        appName={post.brand}
      />
    </div>
  );
}

