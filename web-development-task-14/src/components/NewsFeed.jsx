import React, { useState, useEffect } from 'react';

function NewsFeed() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      // Using a mock news API - in production, use a real crypto news API
      const mockNews = [
        {
          id: 1,
          title: 'Bitcoin Reaches New All-Time High Above $70,000',
          description: 'The world\'s largest cryptocurrency continues its remarkable rally...',
          source: 'CryptoNews',
          date: '2 hours ago',
          category: 'Markets',
        },
        {
          id: 2,
          title: 'Ethereum 2.0 Upgrade Promises Lower Gas Fees',
          description: 'The long-awaited upgrade aims to solve scalability issues...',
          source: 'BlockchainDaily',
          date: '5 hours ago',
          category: 'Technology',
        },
        {
          id: 3,
          title: 'Major Bank Announces Crypto Custody Services',
          description: 'Institutional adoption continues as traditional finance embraces digital assets...',
          source: 'FinanceWeekly',
          date: '8 hours ago',
          category: 'Adoption',
        },
        {
          id: 4,
          title: 'DeFi Protocol Hits $10 Billion in Total Value Locked',
          description: 'Decentralized finance reaches new milestone amid growing interest...',
          source: 'DeFiPulse',
          date: '12 hours ago',
          category: 'DeFi',
        },
      ];
      
      setNews(mockNews);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching news:', error);
      setLoading(false);
    }
  };

  return (
    <div className="mb-12">
      <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-6">
        Latest Crypto News
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {news.map((article) => (
          <div
            key={article.id}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-xs font-semibold px-2 py-1 rounded">
                {article.category}
              </span>
              <span className="text-xs text-gray-500">{article.date}</span>
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">
              {article.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {article.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">{article.source}</span>
              <button className="text-blue-600 text-sm font-medium hover:underline">
                Read More →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewsFeed;