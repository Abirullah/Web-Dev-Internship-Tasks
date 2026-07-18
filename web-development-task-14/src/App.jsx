import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CardSection from './components/CardSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      <HeroSection />
      <CardSection />
      <Footer />
    </div>
  );
}

export default App;