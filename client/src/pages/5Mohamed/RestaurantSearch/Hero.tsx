import React from 'react';

const Hero: React.FC = () => {
  console.log('Hero: Component loaded');
  
  return (
    <div className="rs-hero">
      <h1 className="rs-hero__title">Find Your Perfect Meal</h1>
      <p className="rs-hero__subtitle">
        Filter through thousands of restaurants to find exactly what you're craving
      </p>
    </div>
  );
};

export default Hero; 