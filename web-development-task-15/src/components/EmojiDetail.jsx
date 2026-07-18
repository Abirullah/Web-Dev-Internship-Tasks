import React, { useState } from 'react';

function EmojiDetail({ emoji, onClose }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(emoji.emoji);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeInUp">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
        {/* Close Button */}
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-2xl font-black text-gray-900">Emoji Details</h3>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Emoji Display */}
        <div className="text-center mb-6">
          <div className="text-9xl mb-4 animate-float">{emoji.emoji}</div>
          <p className="text-lg text-gray-500">
            {emoji.description || 'No description available'}
          </p>
        </div>

        {/* Info */}
        <div className="space-y-4 mb-6">
          {emoji.category && (
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-400 uppercase font-semibold mb-1">Category</p>
              <p className="text-gray-900 font-semibold">{emoji.category}</p>
            </div>
          )}
          
          {emoji.aliases && emoji.aliases.length > 0 && (
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-400 uppercase font-semibold mb-2">Aliases</p>
              <div className="flex flex-wrap gap-2">
                {emoji.aliases.map((alias, index) => (
                  <span key={index} className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm">
                    :{alias}:
                  </span>
                ))}
              </div>
            </div>
          )}

          {emoji.tags && emoji.tags.length > 0 && (
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-400 uppercase font-semibold mb-2">Tags</p>
              <div className="flex flex-wrap gap-2">
                {emoji.tags.map((tag, index) => (
                  <span key={index} className="bg-pink-50 text-pink-700 px-3 py-1 rounded-full text-sm">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-2xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg shadow-purple-200"
        >
          {copied ? '✅ Copied!' : '📋 Copy Emoji'}
        </button>
      </div>
    </div>
  );
}

export default EmojiDetail;