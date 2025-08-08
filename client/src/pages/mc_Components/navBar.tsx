import React, { useState } from "react";

interface NavbarProps {
  brandName?: string;
  brandLogo?: React.ReactNode;
  onSignIn?: (email: string, password: string) => void;
  extraContent?: React.ReactNode; 
}

export const Navbar: React.FC<NavbarProps> = ({
  brandName = "FoodieExpress",
  brandLogo,
  onSignIn,
  extraContent,
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const togglePopup = () => setShowPopup((prev) => !prev);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSignIn) {
      onSignIn(email, password);
    } else {
      console.log("Email:", email, "Password:", password);
    }
    setShowPopup(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white text-black flex justify-between items-center px-6 py-3 z-50 shadow-md">
      {/* Brand */}
      <div className="text-2xl font-bold select-none flex items-center gap-2">
        {brandLogo ? (
          <div className="flex items-center justify-center">{brandLogo}</div>
        ) : (
          <div className="w-8 h-8 bg-indigo-800 flex items-center justify-center">
            <span className="text-black text-lg leading-none">+</span>
          </div>
        )}
        {brandName}
      </div>

      <div className="flex items-center gap-6 relative">
        {extraContent}

        <button
          onClick={togglePopup}
          className="text-black px-4 py-1.5 rounded font-semibold hover:bg-transparent"
        >
          Sign In
        </button>

        {/* Sign In Popup */}
        {showPopup && (
          <div className="absolute top-12 right-20 bg-white border border-gray-200 shadow-lg p-5 rounded-lg w-64 z-50">
            <form onSubmit={handleLogin} className="flex flex-col gap-3">
              <h3 className="text-lg font-bold text-center text-indigo-600">
                Sign In
              </h3>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border px-3 py-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border px-3 py-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <button
                type="submit"
                className="bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
              >
                Log In
              </button>
            </form>
          </div>
        )}
      </div>
    </nav>
  );
};