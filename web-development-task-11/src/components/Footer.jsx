import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-100 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <span className="text-xl">🍕</span>
            <span className="font-black text-gray-900">
              Geek <span className="text-red-500">Food</span>
            </span>
          </div>

          {/* Tagline */}
          <p className="text-sm text-gray-500 text-center">
            Feeding your mind with delicious thoughts since {currentYear}
          </p>

          {/* Credits */}
          <p className="text-xs text-gray-400">
            Made with <span className="text-red-500">❤️</span> using React & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;