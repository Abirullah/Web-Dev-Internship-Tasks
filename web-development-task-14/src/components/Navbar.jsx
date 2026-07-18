import React from 'react';

function Navbar({ darkMode, setDarkMode, setShowConverter }) {
  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-white text-xl font-bold">₿</span>
            </div>
            <div>
              <h1 className="text-xl font-black text-gray-900 dark:text-white">
                CryptoTracker
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Real-time Crypto Prices
              </p>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Converter Button */}
            <button
              onClick={() => setShowConverter(true)}
              className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
            >
              💱 Converter
            </button>

            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>

            {/* Profile Button */}
            <button className="w-10 h-10 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center hover:bg-blue-700 transition-colors">
              U
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;