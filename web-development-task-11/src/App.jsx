import React from 'react';
import Header from './components/Header';
import QuoteCard from './components/QuoteCard';
import Footer from './components/Footer';
import quotesData from './data/quotes.json';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header totalQuotes={quotesData.length} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quotesData.map(quote => (
            <QuoteCard key={quote.id} quote={quote} />
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;