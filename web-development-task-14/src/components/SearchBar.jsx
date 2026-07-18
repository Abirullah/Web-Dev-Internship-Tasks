import React, { useState } from 'react';

function SearchBar({ setSearchResults, setShowSearch, setSelectedCrypto }) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/search?query=${query}`
      );
      const data = await response.json();
      
      // Get detailed info for each coin
      const coinIds = data.coins.slice(0, 10).map(coin => coin.id).join(',');
      const detailedResponse = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinIds}&order=market_cap_desc&sparkline=false`
      );
      const detailedData = await detailedResponse.json();
      
      setSearchResults(detailedData);
      setShowSearch(true);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white shadow-xl">
      <h2 className="text-3xl font-black mb-2">Search Cryptocurrency</h2>
      <p className="text-blue-100 mb-6">Track prices, charts, and market data in real-time</p>
      
      <form onSubmit={handleSearch} className="flex gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search any cryptocurrency (e.g., Bitcoin, ETH)..."
            className="w-full px-5 py-4 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg"
          />
          {loading && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full"></div>
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchBar;