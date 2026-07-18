import React, { useState } from 'react';

function EmojiCard({ emoji, onClick, index }) {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    setCopied(true);
    onClick(emoji);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <div
      className="emoji-card animate-fadeInUp"
      style={{ animationDelay: `${index * 50}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        onClick={handleClick}
        className="group relative bg-white rounded-2xl p-4 border border-gray-100 cursor-pointer hover:border-purple-200 transition-all duration-300 animate-pop"
      >
        {/* Copied Tooltip */}
        {copied && (
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-full animate-scaleIn whitespace-nowrap">
            Copied! 📋
          </div>
        )}

        {/* Emoji */}
        <div className="text-center mb-3">
          <div className={`text-5xl transition-all duration-300 ${
            isHovered ? 'scale-125 animate-wiggle' : 'scale-100'
          }`}>
            {emoji.emoji}
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-gray-500 text-center truncate">
          {emoji.description || 'No description'}
        </p>

        {/* Hover Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-purple-500/10 to-transparent rounded-2xl transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`} />
      </div>
    </div>
  );
}

export default EmojiCard;