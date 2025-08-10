import React from 'react';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import FeaturesGrid from './FeaturesGrid';
import FeaturedRestaurants from './FeaturedRestaurants';
import Footer from './Footer';

const LandingPage: React.FC = () => {
  return (
    <div className="MA__landing-page">
      <Navbar />
      <HeroSection/>
      <FeaturedRestaurants />
      <FeaturesGrid />
      <Footer />
    </div>
  );
};

export default LandingPage; 