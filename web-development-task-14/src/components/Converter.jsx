import React, { useState, useEffect } from 'react';

function Converter({ setShowConverter }) {
  const [amount, setAmount] = useState(1);
  const [fromCrypto, setFromCrypto] = useState('bitcoin');
  const [toCurrency, setToCurrency] = useState('usd');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cryptos, setCryptos] = useState([]);

  const currencies = [
    { value: 'usd', label: 'USD - US Dollar' },
    { value: 'eur', label: 'EUR - Euro' },
    { value: 'gbp', label: 'GBP - British Pound' },
    { value: 'jpy', label: 'JPY - Japanese Yen' },
    { value: 'inr', label: 'INR - Indian Rupee' },
    { value: 'cny', label: 'CNY - Chinese Yuan' },
  ];

  useEffect(() => {
    fetchCryptos();
  }, []);

  const fetchCryptos = async () => {
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false'
      );
      const data = await response.json();
      setCryptos(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleConvert = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${fromCrypto}&vs_currencies=${toCurrency}`
      );
      const data = await response.json();
      const rate = data[fromCrypto][toCurrency];
      setResult(amount * rate);
      setLoading(false);
    } catch (error) {
      console.error('Conversion error:', error);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-gray-900 dark:text-white">
            Crypto Converter
          </h2>
          <button
            onClick={() => setShowConverter(false)}
            className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              From
            </label>
            <select
              value={fromCrypto}
              onChange={(e) => setFromCrypto(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {cryptos.map((crypto) => (
                <option key={crypto.id} value={crypto.id}>
                  {crypto.name} ({crypto.symbol?.toUpperCase()})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              To
            </label>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {currencies.map((currency) => (
                <option key={currency.value} value={currency.value}>
                  {currency.label}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleConvert}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Converting...' : 'Convert'}
          </button>

          {result && (
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl text-center">
              <p className="text-sm text-gray-500 mb-1">Result</p>
              <p className="text-2xl font-black text-gray-900 dark:text-white">
                {result.toLocaleString()} {toCurrency.toUpperCase()}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Converter;