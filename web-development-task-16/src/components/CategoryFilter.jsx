import React from 'react';

function CategoryFilter({ selectedCategory, setSelectedCategory, emojis, getEmojiCategory }) {
  const categories = [
    { id: 'all', icon: '🌟', label: 'All', color: 'from-purple-500 to-pink-500' },
    { id: 'smileys', icon: '😊', label: 'Smileys', color: 'from-yellow-500 to-orange-500' },
    { id: 'gestures', icon: '👋', label: 'Gestures', color: 'from-blue-500 to-cyan-500' },
    { id: 'love', icon: '❤️', label: 'Love', color: 'from-red-500 to-pink-500' },
    { id: 'animals', icon: '🐱', label: 'Animals', color: 'from-green-500 to-emerald-500' },
    { id: 'food', icon: '🍕', label: 'Food', color: 'from-orange-500 to-red-500' },
    { id: 'activities', icon: '⚽', label: 'Activities', color: 'from-indigo-500 to-blue-500' },
    { id: 'travel', icon: '✈️', label: 'Travel', color: 'from-sky-500 to-blue-500' },
    { id: 'nature', icon: '🌸', label: 'Nature', color: 'from-teal-500 to-green-500' },
    { id: 'flags', icon: '🏁', label: 'Flags', color: 'from-violet-500 to-purple-500' },
    { id: 'symbols', icon: '💯', label: 'Symbols', color: 'from-gray-500 to-slate-500' },
    { id: 'other', icon: '✨', label: 'Other', color: 'from-rose-500 to-pink-500' },
  ];

  // Count emojis per category
  const getCategoryCount = (categoryId) => {
    if (categoryId === 'all') return emojis.length;
    return emojis.filter(emoji => getEmojiCategory(emoji) === categoryId).length;
  };

  return (
    <div className="mb-8">
      <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-semibold text-sm whitespace-nowrap transition-all duration-300 ${
              selectedCategory === category.id
                ? `bg-gradient-to-r ${category.color} text-white shadow-lg scale-105`
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            <span className="text-lg">{category.icon}</span>
            <span>{category.label}</span>
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              selectedCategory === category.id
                ? 'bg-white/20 text-white'
                : 'bg-gray-100 text-gray-500'
            }`}>
              {getCategoryCount(category.id)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;