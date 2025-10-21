import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="container mx-auto px-4 py-6 text-center">
        <p>&copy; {new Date().getFullYear()} ReferralVerse. All rights reserved.</p>
        <p className="text-sm text-gray-400 mt-1">Your source for the best coupons and referral codes.</p>
        <div className="mt-4">
          <a href="/about" className="text-gray-400 hover:text-white mx-2">About Us</a>
          <a href="/contact" className="text-gray-400 hover:text-white mx-2">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;