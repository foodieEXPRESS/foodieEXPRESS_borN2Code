import React from 'react';

const Navbar: React.FC = () => {
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
          
          <div className="MA__navbar-auth flex items-center">
            {/* Profile Icon */}
            <div className="mr-4">
              <svg 
                className="w-8 h-8 text-gray-600 hover:text-primary-DEFAULT cursor-pointer"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <a href="#" className="MA__sign-in-link">Sign In</a>
            <a href="#" className="MA__order-now-btn">Order Now</a>
            <button
              className="ml-4 p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT"
              aria-label="Open menu"
            >
              <svg className="w-7 h-7 text-primary-DEFAULT" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;