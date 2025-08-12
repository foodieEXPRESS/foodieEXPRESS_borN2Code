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
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="flex flex-col content-between max-w-6xl mx-auto px-4 py-4 mt-6">
        <Hero />
        <section className="bg-white rounded-md shadow-md p-6 mb-4 ">
          <SearchControls />
          <div className=" flex flex-row justify-between border-t border-gray-200 my-3 w-full"></div>
          <Filters />
        </section>
        <FooterControls resultsCount={8} view={view} onChange={setView} />
      </main>
    </div>
  );
};

export default RestaurantSearch; 