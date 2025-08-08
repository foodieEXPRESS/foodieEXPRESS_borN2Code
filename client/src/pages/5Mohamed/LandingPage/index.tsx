import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import FeaturesGrid from './FeaturesGrid';
import FeaturedRestaurants from './FeaturedRestaurants';
import Footer from './Footer';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigateToSearch = () => {
    navigate('/restaurant-search');
  };

  const handleNavigateToDelivery = () => {
    navigate('/delivery-history');
  };

  return (
    <div className="MA__landing-page">
      <Navbar />
      <HeroSection 
        onNavigateToSearch={handleNavigateToSearch}
        onNavigateToDelivery={handleNavigateToDelivery}
      />
      <FeaturesGrid />
      <FeaturedRestaurants />
      <Footer />
    </div>
  );
};

export default LandingPage; 