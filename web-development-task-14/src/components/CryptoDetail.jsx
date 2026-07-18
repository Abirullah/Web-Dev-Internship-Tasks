import React, { useState, useEffect } from 'react';
import PriceChart from './PriceChart';

function CryptoDetail({ crypto, setSelectedCrypto }) {
  const [detailedData, setDetailedData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDetailedData();
  }, [crypto.id]);

  const fetchDetailedData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${crypto.id}?localization=false&tickers=false&community_data=false&developer_data=false`
      );
      const data = await response.json();
      setDetailedData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching details:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
      </div>
    );
  }

  const prices = {
    usd: detailedData?.market_data?.current_price?.usd,
    eur: detailedData?.market_data?.current_price?.eur,
    btc: detailedData?.market_data?.current_price?.btc,
    eth: detailedData?.market_data?.current_price?.eth,
  };

  return (
    <div className="animate-fadeIn">
      {/* Back Button */}
      <button
        onClick={() => setSelectedCrypto(null)}
        className="mb-6 flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
        Back to all cryptocurrencies
      </button>

      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 mb-6">
        <div className="flex items-center gap-4 mb-6">
          <img src={detailedData?.image?.large} alt={crypto.name} className="w-16 h-16" />
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-black text-gray-900 dark:text-white">
                {detailedData?.name}
              </h1>
              <span className="text-xl text-gray-500 uppercase font-bold">
                {detailedData?.symbol}
              </span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Rank #{detailedData?.market_cap_rank}
            </p>
          </div>
        </div>

        {/* Price in Different Currencies */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {Object.entries(prices).map(([currency, value]) => (
            <div key={currency} className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl">
              <p className="text-sm text-gray-500 uppercase mb-1">{currency}</p>
              <p className="text-xl font-black text-gray-900 dark:text-white">
                {currency === 'btc' || currency === 'eth' 
                  ? value?.toFixed(8) 
                  : '$' + value?.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Price Chart
        </h2>
        <PriceChart cryptoId={crypto.id} />
      </div>

      {/* Market Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Market Statistics
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500">Market Cap</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                ${detailedData?.market_data?.market_cap?.usd?.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">24h Volume</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                ${detailedData?.market_data?.total_volume?.usd?.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Circulating Supply</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {detailedData?.market_data?.circulating_supply?.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">All-Time High</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                ${detailedData?.market_data?.ath?.usd?.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Description
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-6">
            {detailedData?.description?.en?.split('. ').slice(0, 3).join('. ')}.
          </p>
        </div>
      </div>
    </div>
  );
}

export default CryptoDetail;