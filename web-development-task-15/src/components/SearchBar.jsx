import React, { useState, useRef, useEffect } from 'react';

function SearchBar({ searchQuery, setSearchQuery, recentSearches }) {
  const [isFocused, setIsFocused] = useState(false);
  const [showRecent, setShowRecent] = useState(false);
  const inputRef = useRef(null);

  const handleClear = () => {
    setSearchQuery('');
    inputRef.current?.focus();
  };

  return (
    <div className="max-w-3xl mx-auto mb-8">
      <div className="relative">
        {/* Search Input */}
        <div className={`relative transition-all duration-300 ${
          isFocused ? 'scale-105' : 'scale-100'
        }`}>
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => {
              setIsFocused(true);
              setShowRecent(true);
            }}
            onBlur={() => {
              setIsFocused(false);
              setTimeout(() => setShowRecent(false), 200);
            }}
            placeholder="Search emojis by name, category, or keyword..."
            className="w-full pl-14 pr-12 py-5 text-lg bg-white border-2 border-purple-200 rounded-3xl focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-100 transition-all shadow-lg shadow-purple-100/50 placeholder-gray-400"
          />
          
          {searchQuery && (
            <button
              onClick={handleClear}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Recent Searches Dropdown */}
        {showRecent && recentSearches.length > 0 && !searchQuery && (
          <div className="absolute z-10 mt-2 w-full bg-white rounded-2xl shadow-2xl border border-gray-100 p-4">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Recent Searches
            </h4>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => setSearchQuery(search)}
                  className="px-4 py-2 bg-purple-50 text-purple-700 rounded-full text-sm font-medium hover:bg-purple-100 transition-colors"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Search Tips */}
      {!searchQuery && (
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-400">
            💡 Try searching for "smile", "heart", "food", or "animal"
          </p>
        </div>
      )}
    </div>
  );
}

export default SearchBar;