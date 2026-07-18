import React from 'react';
import EmojiCard from './EmojiCard';

function EmojiGrid({ emojis, onEmojiClick }) {
  if (emojis.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-8xl mb-6">🔍</div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">No emojis found</h3>
        <p className="text-gray-500">Try searching with different keywords or category</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
      {emojis.map((emoji, index) => (
        <EmojiCard
          key={index}
          emoji={emoji}
          onClick={() => onEmojiClick(emoji)}
          index={index}
        />
      ))}
    </div>
  );
}

export default EmojiGrid;