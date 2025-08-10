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
    <div className="rs-page">
      <NavBar />
      <main className="rs-container rs-main">
        <Hero />
        <section className="rs-card">
          <SearchControls />
          <div className="rs-divider" />
          <Filters />
        </section>
        <FooterControls resultsCount={8} view={view} onChange={setView} />
      </main>
    </div>
  );
};

export default RestaurantSearch; 