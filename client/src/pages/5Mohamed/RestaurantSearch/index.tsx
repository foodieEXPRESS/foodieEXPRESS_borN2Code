import React, { useState } from 'react';
import NavBar from './NavBar';
import Hero from './Hero';
import SearchControls from './SearchControls';
import Filters from './Filters';
import FooterControls from './FooterControls';

interface RestaurantSearchProps {
  title?: string;
  subtitle?: string;
  resultsCount?: number;
  defaultView?: 'grid' | 'list';
  className?: string;
}

const RestaurantSearch: React.FC<RestaurantSearchProps> = ({
  title = 'Find Your Perfect Meal',
  subtitle = "Filter through thousands of restaurants to find exactly what you're craving",
  resultsCount = 8,
  defaultView = 'grid',
  className = '',
}) => {
  const [view, setView] = useState<'grid' | 'list'>(defaultView);

  return (
    <div className={`rs-page ${className}`}>
      <NavBar />

      <main className="rs-container rs-main">
        <Hero title={title} subtitle={subtitle} />

        <section className="rs-card">
          <SearchControls />
          <div className="rs-divider" />
          <Filters />
        </section>

        <FooterControls resultsCount={resultsCount} view={view} onChange={setView} />
      </main>
    </div>
  );
};

export default RestaurantSearch; 