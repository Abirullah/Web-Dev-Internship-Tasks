import React, { useState, useEffect } from 'react';

function TopCryptos({ setSelectedCrypto }) {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopCryptos();
    const interval = setInterval(fetchTopCryptos, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchTopCryptos = async () => {
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false&price_change_percentage=24h'
      );
      const data = await response.json();
      setCryptos(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching top cryptos:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
        <p className="mt-4 text-gray-500">Loading cryptocurrencies...</p>
      </div>
    );
  }

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white">
            Top Cryptocurrencies
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Real-time market prices • Auto-updates every 30s
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-sm text-gray-500 dark:text-gray-400">Live</span>
        </div>
      </div>

      {/* Horizontal Scroll on Mobile */}
      <div className="overflow-x-auto -mx-4 px-4">
        <div className="inline-flex gap-4 pb-4 min-w-full">
          {cryptos.slice(0, 10).map((crypto, index) => (
            <div
              key={crypto.id}
              onClick={() => setSelectedCrypto(crypto)}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1 min-w-[200px] flex-shrink-0"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-bold text-gray-400">#{index + 1}</span>
                <img src={crypto.image} alt={crypto.name} className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white">{crypto.name}</h3>
              <p className="text-sm text-gray-500 uppercase mb-2">{crypto.symbol}</p>
              <div className="text-xl font-black text-gray-900 dark:text-white">
                ${crypto.current_price.toLocaleString()}
              </div>
              <div className={`text-sm font-semibold ${
                crypto.price_change_percentage_24h >= 0 
                  ? 'text-green-500' 
                  : 'text-red-500'
              }`}>
                {crypto.price_change_percentage_24h?.toFixed(2)}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TopCryptos;