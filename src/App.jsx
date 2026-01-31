import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Detector from './components/Detector';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-emerald-100 selection:text-emerald-900">
      <Header />
      <main>
        <Hero />
        <div className="bg-emerald-50/30">
          <Detector />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;