import React, { useState } from 'react';
import NavBar from '../LandingPage/Navbar';
import Hero from './Hero';
import SearchControls from './SearchControls';
import Filters from './Filters';
import FooterControls from './FooterControls';

const RestaurantSearch: React.FC = () => {
  const [view, setView] = useState<'grid' | 'list'>('grid');

  console.log('RestaurantSearch: Component loaded, current view:', view);

  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <Hero />
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <SearchControls />
          <div className="border-t border-gray-200 my-6"></div>
          <Filters />
        </section>
        <FooterControls resultsCount={8} view={view} onChange={setView} />
      </main>
    </div>
  );
};

export default RestaurantSearch; 