import React from 'react';

const Hero: React.FC = () => {
  console.log('Hero: Component loaded');
  
  return (
    <div className="text-center py-12 px-4 bg-white">
      <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
        Find Your Perfect Meal
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Filter through thousands of restaurants to find exactly what you're craving
      </p>
    </div>
  );
};

export default Hero; 