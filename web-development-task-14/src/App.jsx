import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import TopCryptos from './components/TopCryptos';
import CryptoDetail from './components/CryptoDetail';
import NewsFeed from './components/NewsFeed';
import Converter from './components/Converter';

function App() {
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showConverter, setShowConverter] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <Navbar 
          darkMode={darkMode} 
          setDarkMode={setDarkMode}
          setShowConverter={setShowConverter}
        />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search Section */}
          <div className="mb-8">
            <SearchBar 
              setSearchResults={setSearchResults}
              setShowSearch={setShowSearch}
              setSelectedCrypto={setSelectedCrypto}
            />
          </div>

          {/* Search Results */}
          {showSearch && searchResults.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Search Results
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {searchResults.map((crypto) => (
                  <div
                    key={crypto.id}
                    onClick={() => {
                      setSelectedCrypto(crypto);
                      setShowSearch(false);
                    }}
                    className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg cursor-pointer transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <img src={crypto.image} alt={crypto.name} className="w-8 h-8" />
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {crypto.name}
                        </h3>
                        <p className="text-sm text-gray-500 uppercase">{crypto.symbol}</p>
                      </div>
                      <button className="ml-auto text-blue-600 text-sm font-medium hover:underline">
                        More Info
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Crypto Detail or Top Cryptos */}
          {selectedCrypto ? (
            <CryptoDetail 
              crypto={selectedCrypto} 
              setSelectedCrypto={setSelectedCrypto}
            />
          ) : (
            <>
              <TopCryptos setSelectedCrypto={setSelectedCrypto} />
              <NewsFeed />
            </>
          )}
        </main>

        {/* Converter Modal */}
        {showConverter && (
          <Converter setShowConverter={setShowConverter} />
        )}
      </div>
    </div>
  );
}

export default App;