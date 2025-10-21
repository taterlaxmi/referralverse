"use client";

import React, { useState } from "react";
import type { Post } from "../types";

interface Props {
  post: Post;
}

export default function PostActions({ post }: Props) {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(post.referralCode);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch {
        // swallow
      }
    }
  };

  return (
    <div className="mb-8">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Your Referral Code</h3>
        <div className="flex items-stretch">
          <div className="border-2 border-dashed border-gray-300 rounded-l-md p-4 text-2xl font-mono tracking-widest bg-gray-50 flex-grow text-center">
            {post.referralCode}
          </div>
          <button
            onClick={copyToClipboard}
            className={`bg-gray-700 text-white font-bold px-6 rounded-r-md hover:bg-gray-800 transition-colors ${isCopied ? "bg-green-600" : ""}`}
            aria-label="Copy referral code"
          >
            {isCopied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>

      <div>
        <a
          href={post.referralLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full block text-center bg-green-600 text-white font-bold py-4 px-4 rounded-lg text-xl hover:bg-green-700 transition-colors duration-300"
        >
          {post.ctaText} &rarr;
        </a>
      </div>
    </div>
  );
}