import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded flex items-center justify-center" style={{ backgroundColor: '#4318D1' }}>
              <span className="text-white font-bold text-lg font-sans">+</span>
            </div>
            <span className="text-gray-900 font-bold text-xl font-sans">FoodieExpress</span>
          </div>
          
          {/* Header Text */}
          <div className="text-gray-500 text-sm font-medium font-sans">
            Driver Profile & Settings
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
