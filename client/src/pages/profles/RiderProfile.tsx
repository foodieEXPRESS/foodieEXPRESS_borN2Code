import React from 'react';

const RiderProfile: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded flex items-center justify-center" style={{ backgroundColor: '#4318D1' }}>
                <span className="text-white font-bold text-lg">+</span>
              </div>
              <span className="text-gray-900 font-bold text-xl">FoodieExpress</span>
            </div>
            
            {/* Header Text */}
            <div className="text-gray-500 text-sm font-medium">
              Driver Profile & Settings
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Profile & Settings
          </h1>
          <p className="text-gray-600 text-lg">
            Manage your profile information and delivery preferences
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <nav className="space-y-2">
                <a
                  href="#"
                  className="block w-full text-left px-4 py-3 rounded-md text-white font-medium"
                  style={{ backgroundColor: '#4318D1' }}
                >
                  Profile Information
                </a>
                <a
                  href="#"
                  className="block w-full text-left px-4 py-3 rounded-md text-gray-900 hover:bg-gray-100 transition-colors"
                >
                  Notifications
                </a>
                <a
                  href="#"
                  className="block w-full text-left px-4 py-3 rounded-md text-gray-900 hover:bg-gray-100 transition-colors"
                >
                  Availability Schedule
                </a>
                <a
                  href="#"
                  className="block w-full text-left px-4 py-3 rounded-md text-gray-900 hover:bg-gray-100 transition-colors"
                >
                  Security & Verification
                </a>
              </nav>
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Profile Information
              </h2>

              {/* User Identity Block */}
              <div className="flex items-center mb-8">
                <div className="relative">
                  <div className="w-20 h-20 rounded-lg flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#4318D1' }}>
                    <img 
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face" 
                      alt="Alex Johnson"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    <div className="w-full h-full flex items-center justify-center text-white text-2xl font-bold hidden" style={{ backgroundColor: '#4318D1' }}>
                      AJ
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#4318D1' }}>
                    <span className="text-white text-xs font-bold">+</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-gray-900">Alex Johnson</h3>
                  <p className="text-gray-500 text-sm">alex.johnson@email.com</p>
                  <div className="flex items-center mt-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-green-600 text-sm font-medium">Active Driver</span>
                  </div>
                </div>
              </div>

              {/* Profile Details */}
              <div className="space-y-6">
                {/* Full Name */}
                <div className="flex items-center justify-between py-4 border-b border-gray-200">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">
                      Full Name
                    </label>
                    <span className="text-gray-900">Alex Johnson</span>
                  </div>
                  <a href="#" className="font-medium text-sm" style={{ color: '#4318D1' }}>
                    Edit
                  </a>
                </div>

                {/* Phone Number */}
                <div className="flex items-center justify-between py-4 border-b border-gray-200">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">
                      Phone Number
                    </label>
                    <span className="text-gray-900">+1 (555) 123-4567</span>
                  </div>
                  <a href="#" className="font-medium text-sm" style={{ color: '#4318D1' }}>
                    Edit
                  </a>
                </div>

                {/* Email Address */}
                <div className="flex items-center justify-between py-4 border-b border-gray-200">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">
                      Email Address
                    </label>
                    <span className="text-gray-900">alex.johnson@email.com</span>
                  </div>
                  <span className="text-gray-500 text-sm">
                    Contact support to change
                  </span>
                </div>

                {/* Delivery Vehicle */}
                <div className="flex items-center justify-between py-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">
                      Delivery Vehicle
                    </label>
                    <span className="text-gray-900">Car</span>
                  </div>
                  <a href="#" className="font-medium text-sm" style={{ color: '#4318D1' }}>
                    Edit
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiderProfile;
