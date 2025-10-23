"use client";
import React, { useState } from "react";
import type { Post } from "../types";
import { Copy as CopyIcon, Check as CheckIcon, Link as LinkIcon, Gift } from "lucide-react";

export default function PostOfferDetails({ post }: { post: Post }) {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(post.referralCode);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch {
        // ignore errors
      }
    }
  };

  return (
    <div className="my-10">
      {/* Header */}
      <h3 className="text-2xl font-semibold mb-6 text-gray-900 flex items-center gap-2">
        <Gift className="text-indigo-500" size={22} />
        <span>Offer Details</span>
      </h3>

      {/* Table Container */}
      <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-gray-50 shadow-sm hover:shadow-md transition-all duration-300">
        <table className="min-w-full divide-y divide-gray-100">
          <tbody className="divide-y divide-gray-100 text-gray-800">
            {/* Referral Code */}
            <tr className="hover:bg-gray-50/80 transition">
              <th className="py-4 px-5 text-left font-medium text-gray-600 w-48">
                Referral Code
              </th>
              <td className="py-4 px-5 flex items-center gap-3">
                <span className="font-mono text-lg text-gray-900 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200 select-all">
                  {post.referralCode}
                </span>
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
              <td className="py-4 px-5 text-gray-900">{post.signupBonus}</td>
            </tr>

            {/* Referral Bonus */}
            <tr className="hover:bg-gray-50/80 transition">
              <th className="py-4 px-5 text-left font-medium text-gray-600">
                Referral Bonus
              </th>
              <td className="py-4 px-5 text-gray-900">{post.referralBonus}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
