import React from 'react';

interface HeaderProps {
  onSignIn?: () => void;
  onHelp?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  onSignIn = () => {},
  onHelp = () => {}
}) => {
  return (
    <header className="bg-white px-6 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Left Side - Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
            <span className="text-white text-sm font-bold">+</span>
          </div>
          <h1 className="text-2xl font-bold text-secondary-dark font-brand">FoodieExpress</h1>
        </div>

        {/* Right Side - Navigation/Actions */}
        <div className="flex items-center gap-6">
          <button 
            onClick={onSignIn}
            className="text-secondary-gray hover:text-secondary-dark font-medium transition-colors"
          >
            Sign In
          </button>
          <button 
            onClick={onHelp}
            className="bg-primary text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition-colors font-medium"
          >
            Help
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
