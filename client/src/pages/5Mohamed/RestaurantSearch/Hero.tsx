import React from 'react';

const Hero: React.FC = () => {
  console.log('Hero: Component loaded');

  return (
    <div className="text-center  py-8 px-4 bg-gradient-to-b from-gray-50 to-white justify-items-start ">
      <h1 className="text-3xl md:text-4xl  text-black mb-3  " style={{ fontWeight: 700 ,fontFamily:('var(--font-primary)')}}>
        Find Your Perfect Meal
      </h1>
      <p className="text-base text-gray-600 max-w-2xl  " style={{ fontWeight: 400 ,fontFamily:('var(--font-primary)')}}>
        Filter through thousands of restaurants to find exactly what you're craving
      </p>
    </div>
  );
};

export default Hero; 