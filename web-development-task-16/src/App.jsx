import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import EmojiGrid from './components/EmojiGrid';
import CategoryFilter from './components/CategoryFilter';
import EmojiDetail from './components/EmojiDetail';

function App() {
  const [emojis, setEmojis] = useState([]);
  const [filteredEmojis, setFilteredEmojis] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recentSearches, setRecentSearches] = useState([]);

  // Fetch emoji data
  useEffect(() => {
    fetchEmojis();
    // Load recent searches from localStorage
    const saved = localStorage.getItem('recentEmojiSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  const fetchEmojis = async () => {
    try {
      const response = await fetch('https://akhil-06.github.io/emoji_project/emojiList.js');
      const text = await response.text();
      // Extract the array from the JavaScript file
      const jsonStr = text.substring(text.indexOf('['), text.lastIndexOf(']') + 1);
      const data = JSON.parse(jsonStr);
      setEmojis(data);
      setFilteredEmojis(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching emojis:', error);
      setLoading(false);
    }
  };

  // Filter emojis based on search and category
  useEffect(() => {
    let result = emojis;

    // Apply category filter
    if (selectedCategory !== 'all') {
      result = result.filter(emoji => {
        const category = getEmojiCategory(emoji);
        return category === selectedCategory;
      });
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(emoji => {
        const description = emoji.description?.toLowerCase() || '';
        const category = emoji.category?.toLowerCase() || '';
        const aliases = emoji.aliases?.join(' ').toLowerCase() || '';
        const tags = emoji.tags?.join(' ').toLowerCase() || '';
        
        return description.includes(query) ||
               category.includes(query) ||
               aliases.includes(query) ||
               tags.includes(query);
      });
    }

    setFilteredEmojis(result);
  }, [searchQuery, selectedCategory, emojis]);

  // Get emoji category
  const getEmojiCategory = (emoji) => {
    const desc = emoji.description?.toLowerCase() || '';
    const cat = emoji.category?.toLowerCase() || '';
    
    if (desc.includes('smile') || desc.includes('grin') || desc.includes('laugh') || 
        cat.includes('smiley') || cat.includes('emotion')) return 'smileys';
    if (desc.includes('hand') || desc.includes('thumbs') || desc.includes('clap') || 
        cat.includes('people')) return 'gestures';
    if (desc.includes('heart') || desc.includes('kiss') || desc.includes('couple') || 
        cat.includes('love')) return 'love';
    if (desc.includes('animal') || desc.includes('cat') || desc.includes('dog') || 
        cat.includes('animal')) return 'animals';
    if (desc.includes('food') || desc.includes('drink') || desc.includes('fruit') || 
        cat.includes('food')) return 'food';
    if (desc.includes('sport') || desc.includes('ball') || desc.includes('game') || 
        cat.includes('activity')) return 'activities';
    if (desc.includes('car') || desc.includes('plane') || desc.includes('building') || 
        cat.includes('travel')) return 'travel';
    if (desc.includes('light') || desc.includes('star') || desc.includes('moon') || 
        desc.includes('weather') || cat.includes('nature')) return 'nature';
    if (desc.includes('flag') || cat.includes('flag')) return 'flags';
    if (desc.includes('symbol') || desc.includes('arrow') || desc.includes('sign') || 
        cat.includes('symbol')) return 'symbols';
    
    return 'other';
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem('recentEmojiSearches', JSON.stringify(updated));
    }
  };

  const handleEmojiClick = (emoji) => {
    setSelectedEmoji(emoji);
    // Copy to clipboard
    navigator.clipboard.writeText(emoji.emoji).then(() => {
      // Could add a toast notification here
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Header totalEmojis={emojis.length} />
        
        <SearchBar 
          searchQuery={searchQuery}
          setSearchQuery={handleSearch}
          recentSearches={recentSearches}
        />
        
        <CategoryFilter 
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          emojis={emojis}
          getEmojiCategory={getEmojiCategory}
        />
        
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="text-8xl mb-4 animate-bounce">😊</div>
              <div className="animate-spin w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-500 text-lg">Loading emojis...</p>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-4 text-sm text-gray-500">
              Showing {filteredEmojis.length} of {emojis.length} emojis
            </div>
            <EmojiGrid 
              emojis={filteredEmojis}
              onEmojiClick={handleEmojiClick}
            />
          </>
        )}

        {selectedEmoji && (
          <EmojiDetail 
            emoji={selectedEmoji}
            onClose={() => setSelectedEmoji(null)}
          />
        )}
      </div>
    </div>
  );
}

export default App;