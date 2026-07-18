import React from 'react';

function Header({ totalEmojis }) {
  return (
    <div className="text-center mb-12">
      {/* Floating Emojis */}
      <div className="relative mb-8">
        <div className="text-6xl animate-float inline-block" style={{ animationDelay: '0s' }}>
          😀
        </div>
        <div className="text-5xl animate-float inline-block mx-4" style={{ animationDelay: '0.5s' }}>
          🎉
        </div>
        <div className="text-7xl animate-float inline-block" style={{ animationDelay: '1s' }}>
          😎
        </div>
        <div className="text-5xl animate-float inline-block mx-4" style={{ animationDelay: '1.5s' }}>
          🚀
        </div>
        <div className="text-6xl animate-float inline-block" style={{ animationDelay: '2s' }}>
          ❤️
        </div>
      </div>

      <h1 className="text-6xl lg:text-7xl font-black mb-4">
        <span className="gradient-text">Emoji</span>{' '}
        <span className="text-gray-800">Explorer</span>
      </h1>
      <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-6">
        Discover and search through {totalEmojis.toLocaleString()}+ emojis. 
        Click any emoji to copy it to your clipboard!
      </p>
      
      {/* Stats */}
      <div className="flex items-center justify-center gap-8">
        <div className="bg-white rounded-2xl px-6 py-3 shadow-lg shadow-purple-100">
          <div className="text-2xl font-black text-purple-600">{totalEmojis.toLocaleString()}+</div>
          <div className="text-sm text-gray-500">Total Emojis</div>
        </div>
        <div className="bg-white rounded-2xl px-6 py-3 shadow-lg shadow-purple-100">
          <div className="text-2xl font-black text-purple-600">15+</div>
          <div className="text-sm text-gray-500">Categories</div>
        </div>
        <div className="bg-white rounded-2xl px-6 py-3 shadow-lg shadow-purple-100">
          <div className="text-2xl font-black text-purple-600">Instant</div>
          <div className="text-sm text-gray-500">Search</div>
        </div>
      </div>
    </div>
  );
}

export default Header;