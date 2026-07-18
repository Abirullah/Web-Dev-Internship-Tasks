import React from 'react';
import Header from './components/Header';
import BodySection from './components/BodySection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <BodySection />
      <Footer />
    </div>
  );
}

export default App;