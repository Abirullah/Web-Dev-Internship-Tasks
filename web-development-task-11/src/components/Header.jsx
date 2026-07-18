import React from 'react';

function Header({ totalQuotes }) {
  return (
    <header className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between py-8 gap-4">
          {/* Logo/Brand */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
              <span className="text-white text-2xl">🍕</span>
            </div>
            <div>
              <h1 className="text-2xl font-black text-gray-900 tracking-tight">
                Geek <span className="text-red-500">Food</span>
              </h1>
              <p className="text-sm text-gray-500 font-medium">
                Inspiring Food Quotes
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-3xl font-black text-red-500">{totalQuotes}</div>
              <div className="text-xs text-gray-500 font-semibold uppercase tracking-wide">
                Quotes
              </div>
            </div>
            <div className="w-px h-12 bg-gray-200"></div>
            <div className="text-center">
              <div className="text-3xl font-black text-red-500">
                {new Set(quotesData?.map(q => q.author) || []).size}
              </div>
              <div className="text-xs text-gray-500 font-semibold uppercase tracking-wide">
                Authors
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

// Import quotesData for counting unique authors
import quotesData from '../data/quotes.json';

export default Header;