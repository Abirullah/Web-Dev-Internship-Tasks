import React, { useState } from 'react';

function QuoteCard({ quote }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Category badge colors
  const categoryColors = {
    'Creativity': 'bg-purple-100 text-purple-700',
    'Food Philosophy': 'bg-blue-100 text-blue-700',
    'Experience': 'bg-green-100 text-green-700',
    'Humor': 'bg-yellow-100 text-yellow-700',
    'Cooking Philosophy': 'bg-indigo-100 text-indigo-700',
    'Learning': 'bg-teal-100 text-teal-700',
    'Community': 'bg-pink-100 text-pink-700',
    'Life': 'bg-orange-100 text-orange-700'
  };

  return (
    <div className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-red-200 transition-all duration-300 flex flex-col">

      <div className="flex items-center justify-between mb-4">
        <span className={`text-xs font-semibold px-3 py-1  ${categoryColors[quote.category] || 'bg-gray-100 text-gray-700'}`}>
          {quote.category}
        </span>
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="text-gray-300 hover:text-red-500 transition-colors"
        >
          <svg 
            className={`w-5 h-5 ${isLiked ? 'text-red-500 fill-red-500' : ''}`} 
            fill={isLiked ? 'currentColor' : 'none'} 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      {/* Quote */}
      <div className="flex-1">
        <div className="relative">
          <span className="text-5xl text-red-200 font-serif absolute -top-4 -left-2">"</span>
          <p className={`text-gray-700 leading-relaxed pl-6 ${!isExpanded && 'line-clamp-4'}`}>
            {quote.quote}
          </p>
        </div>
        {quote.quote.length > 150 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-red-500 text-sm font-medium mt-2 hover:text-red-600"
          >
            {isExpanded ? 'Show less' : 'Read more'}
          </button>
        )}
      </div>

      {/* Author Info */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
            {quote.author.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-sm">
              {quote.author}
            </h3>
            <p className="text-xs text-gray-500">
              {quote.role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuoteCard;