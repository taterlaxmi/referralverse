"use client";

import React, { useEffect } from 'react';
import type { Post } from '../types';

interface CommentsProps {
  post: Post;
}

const Comments: React.FC<CommentsProps> = ({ post }) => {
  useEffect(() => {
    // IMPORTANT: Replace 'referralverse-demo' with YOUR actual Disqus shortname.
    // This is just a placeholder to remove the setup error.
    // You can get your shortname by creating a site on https://disqus.com/admin/create/
    const disqus_shortname = 'referralverse-demo';

    // This configuration tells Disqus which comment thread to load.
    (window as any).disqus_config = function () {
      this.page.url = window.location.href;
      this.page.identifier = post.slug;
      this.page.title = post.title;
    };

    // Remove any existing Disqus script to prevent duplicates on navigation
    const existingScript = document.getElementById('disqus-script');
    if (existingScript) {
      existingScript.remove();
    }

    // Dynamically load the Disqus script
    const script = document.createElement('script');
    script.src = `https://${disqus_shortname}.disqus.com/embed.js`;
    script.id = 'disqus-script';
    script.setAttribute('data-timestamp', new Date().getTime().toString());
    script.async = true;
    document.body.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById('disqus-script');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [post.slug, post.title]); // Rerun effect if post slug or title changes

  return (
    <div className="max-w-4xl mx-auto mt-12">
        <div className="bg-white rounded-lg shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Comments</h2>
            <div id="disqus_thread"></div>
            <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
        </div>
    </div>
  );
};

export default Comments;
