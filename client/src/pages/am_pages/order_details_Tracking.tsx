import React, { useState } from 'react';

const OrderDetailsTracking: React.FC = () => {
  const [showMap, setShowMap] = useState(true);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAFAFA' }}>
      {/* Header */}
      <div className="bg-white shadow-md mb-8">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--color-primary)' }}>
              <span className="text-white font-bold text-sm">+</span>
            </div>
            <span className="text-xl font-semibold" style={{ color: 'var(--color-secondary-dark)', fontFamily: 'var(--font-primary)' }}>FoodieExpress</span>
          </div>
          <button
            onClick={() => setShowMap(!showMap)}
            className="text-white px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
            style={{ 
              backgroundColor: 'var(--color-primary)', 
              borderRadius: 'var(--button-radius)',
              fontFamily: 'var(--font-primary)'
            }}
          >
            {showMap ? 'Hide Map' : 'Show Map'}
          </button>
        </div>
      </div>

      <div className="flex flex-col">
        {/* Map Section */}
        {showMap && (
          <div className="h-80 relative" style={{ background: 'linear-gradient(135deg, #C7D2FE 0%, #DDD6FE 50%, #A7F3D0 100%)' }}>
            <div className="absolute inset-0 flex items-center justify-center">
              {/* ETA Badge */}
              <div className="absolute top-6 left-6 bg-white rounded-md px-4 py-2 shadow-lg flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-primary-alt)' }}></div>
                <span className="text-sm font-medium" style={{ color: 'var(--color-secondary-dark)', fontFamily: 'var(--font-primary)' , fontWeight: '500' }}>ETA: 2 min</span>
              </div>

              {/* Live Navigation Card */}
              <div className="bg-white rounded-2xl p-6 shadow-xl max-w-sm mx-4">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="var(--color-primary)"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-center mb-2" style={{ color: 'var(--color-secondary-dark)', fontFamily: 'var(--font-primary)' }}>
                  Live Navigation
                </h3>
                <p className="text-center text-sm mb-4" style={{ color: 'var(--color-secondary-gray)', fontFamily: 'var(--font-primary)' }}>
                  Real-time directions and<br />traffic updates
                </p>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-primary)' }}></div>
                  <span className="text-sm font-medium" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-primary)' }}>Heading to restaurant</span>
                </div>
              </div>

              {/* Map Controls */}
              <div className="absolute bottom-6 right-6 flex flex-row space-x-2">
                <button className="w-10 h-10 bg-white rounded-md shadow-lg flex items-center justify-center hover:bg-gray-50">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="var(--color-primary)" strokeWidth="2"/>
                    <polyline points="12,6 12,12 16,14" stroke="var(--color-primary)" strokeWidth="2"/>
                  </svg>
                </button>
                <button className="w-10 h-10 bg-white rounded-md shadow-lg flex items-center justify-center hover:bg-gray-50">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2" fill="var(--color-primary)"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Content Section */}
        <div className="bg-white ">
          <div className="p-6 space-y-6 ">
        {/* Order Details  and order items*/}
            <div className='flex flex-row  gap-6 justify-center '>
            {/* Order Details */}
            <div className="bg-white rounded-lg  w-4/10 shadow-md border-none " style={{ borderColor: 'var(--color-secondary-light)', borderRadius: 'var(--button-radius)' }}>
              <div className="flex items-center justify-between p-4 " style={{ borderColor: 'var(--color-secondary-light)' }}>
                <h2 className="text-lg font-semibold" style={{ color: 'var(--color-secondary-dark)', fontFamily: 'var(--font-primary)', fontWeight: '700' }}>Order Details</h2>
                <div className="px-3 py-1 rounded-md text-sm font-medium" style={{ 
                  backgroundColor: 'var(--color-primary)', 
                  color: 'var(--color-secondary-lighter)',
                  fontFamily: 'var(--font-primary)'
                }}>
                  ORD-2024-1547
                </div>
              </div>
              
              <div className="p-4 space-y-4  ">
                {/* Customer Info */}
                <div className="flex items-start space-x-3 rounded-md mb-8 " style={{ backgroundColor: '#F8F9FA' }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(67, 24, 209, 0.1)' }}>
                    <span className="font-medium text-sm" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-primary)' }}>S</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium mb-2" style={{ color: 'var(--color-secondary-dark)', fontFamily: 'var(--font-primary)', fontWeight: '600' }}>Sarah Johnson</h3>
                    <p className="text-sm mb-2" style={{ color: 'var(--color-secondary-gray)', fontFamily: 'var(--font-primary)' }}>123 Oak Street, Apt 4B</p>
                    <p className="text-sm mb-2" style={{ color: 'var(--color-secondary-gray)', fontFamily: 'var(--font-primary)' }}>Downtown, 10001</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm">📞</span>
                      <span className="text-sm" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-primary)' }}>+1 (555) 123-4567</span>
                    </div>
                  </div>
                </div>

                {/* Restaurant Info */}
                <div className="p-4 flex items-start space-x-3 rounded-md mb-8" style={{ backgroundColor: '#F8F9FA' }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)' }}>
                    <span className="font-medium text-sm" style={{ color: 'var(--color-primary-alt)', fontFamily: 'var(--font-primary)' }}>B</span>
                  </div>
                  <div className=" flex-1">
                    <h3 className="font-medium mb-2" style={{ color: 'var(--color-secondary-dark)', fontFamily: 'var(--font-primary)', fontWeight: '600' }}>Bella Italia</h3>
                    <p className="text-sm mb-2" style={{ color: 'var(--color-secondary-gray)', fontFamily: 'var(--font-primary)' }}>456 Main Street</p>
                    <p className="text-sm mb-2" style={{ color: 'var(--color-secondary-gray)', fontFamily: 'var(--font-primary)' }}>Pickup by: 2:45 PM</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm">📞</span>
                      <span className="text-sm" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-primary)' }}>+1 (555) 987-6543</span>
                    </div>
                  </div>
                </div>

                {/* Special Instructions */}
                <div className="border rounded-lg p-3" style={{ 
                  backgroundColor: '#FFF3CD', 
                  borderColor: '#FFEAA7',
                  borderRadius: 'var(--button-radius)'
                }}>
                  <h4 className="font-medium text-sm mb-1" style={{ color: '#856404', fontFamily: 'var(--font-primary)', fontWeight: '600' }}>Special Instructions</h4>
                  <p className="text-sm" style={{ color: '#856404', fontFamily: 'var(--font-primary)', fontWeight: '400' }}>Ring doorbell twice, leave at door if no answer</p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-md w-4/10 shadow-md border-none">
              <div className="p-4 ">
                <h2 className="text-lg font-semibold" style={{ color: 'var(--color-secondary-dark)', fontFamily: 'var(--font-primary)' }}>Order Items</h2>
              </div>
              
              <div className="p-4 space-y-3">
                {/* Order Item 1 */}
                <div className="p-4 flex items-center justify-between border " style={{ borderColor: '#E5E5E5', borderRadius: 'var(--button-radius)'}}>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(67, 24, 209, 0.1)', borderRadius: 'var(--button-radius)' }}>
                      <span className="font-medium text-sm" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-primary)' }}>M</span>
                    </div>
                    <div >
                      <p className="font-medium" style={{ color: 'var(--color-secondary-dark)', fontFamily: 'var(--font-primary)', fontWeight: '600' }}>Margherita Pizza</p>
                      <p className="text-sm" style={{ color: 'var(--color-secondary-gray)', fontFamily: 'var(--font-primary)' }}>Extra cheese</p>
                    </div>
                  </div>
                  <span className="font-medium" style={{ color: 'var(--color-secondary-dark)', fontFamily: 'var(--font-primary)', fontWeight: '600' }}>$18.99</span>
                </div>

                {/* Order Item 2 */}
                <div className="p-4 flex items-center justify-between border " style={{ borderColor: '#E5E5E5', borderRadius: 'var(--button-radius)'}}>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(67, 24, 209, 0.1)', borderRadius: 'var(--button-radius)' }}>
                      <span className="font-medium text-sm" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-primary)' }}>C</span>
                    </div>
                    <div>
                      <p className="font-medium" style={{ color: 'var(--color-secondary-dark)', fontFamily: 'var(--font-primary)', fontWeight: '600' }}>Caesar Salad</p>
                      <p className="text-sm" style={{ color: 'var(--color-secondary-gray)', fontFamily: 'var(--font-primary)' }}>Dressing on the side</p>
                    </div>
                  </div>
                  <span className="font-medium" style={{ color: 'var(--color-secondary-dark)', fontFamily: 'var(--font-primary)', fontWeight: '600' }}>$12.99</span>
                </div>

                {/* Order Item 3 */}
                <div className=" p-4 flex items-center justify-between border" style={{ borderColor: '#E5E5E5', borderRadius: 'var(--button-radius)'}}>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(67, 24, 209, 0.1)', borderRadius: 'var(--button-radius)' }}>
                      <span className="font-medium text-sm" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-primary)' }}>G</span>
                    </div>
                    <div>
                      <p className="font-medium" style={{ color: 'var(--color-secondary-dark)', fontFamily: 'var(--font-primary)', fontWeight: '600' }}>Garlic Bread</p>
                    </div>
                  </div>
                  <span className="font-medium" style={{ color: 'var(--color-secondary-dark)', fontFamily: 'var(--font-primary)' , fontWeight: '600' }}>$6.99</span>
                </div>
            </div>

                {/* Pricing Summary */}
                <div className=" p-4 space-y-2 mt-2 ">
                  <div className="flex justify-between text-sm border-t " style={{ borderColor: 'var(--color-secondary-light)' }}>
                    <span style={{ color: 'var(--color-secondary-gray)', fontFamily: 'var(--font-primary)', fontWeight: '400' }}>Subtotal</span>
                    <span style={{ color: 'var(--color-secondary-dark)', fontFamily: 'var(--font-primary)', fontWeight: '500' }}>$38.97</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: 'var(--color-secondary-gray)', fontFamily: 'var(--font-primary)', fontWeight: '400' }}>Delivery Fee</span>
                    <span style={{ color: 'var(--color-secondary-dark)', fontFamily: 'var(--font-primary)', fontWeight: '500' }}>$3.99</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: 'var(--color-secondary-gray)', fontFamily: 'var(--font-primary)', fontWeight: '400' }}>Tip</span>
                    <span style={{ color: 'var(--color-primary-alt)', fontFamily: 'var(--font-primary)', fontWeight: '500' }}>$7.80</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg border-t pt-2" style={{ borderColor: 'var(--color-secondary-light)' }}>
                    <span style={{ color: 'var(--color-secondary-dark)', fontFamily: 'var(--font-primary)', fontWeight: '700' }}>Total</span>
                    <span style={{ color: 'var(--color-secondary-dark)', fontFamily: 'var(--font-primary)', fontWeight: '700' }}>$50.76</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Status */}
            <div className="bg-white rounded-lg  shadow-md w-3/5 mx-auto " style={{ borderRadius: 'var(--button-radius)' }}>
              <div className="p-4 ">
                <h2 className="text-lg font-semibold" style={{ color: 'var(--color-secondary-dark)', fontFamily: 'var(--font-primary)' }}>Delivery Status</h2>
              </div>
              
              <div className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)' }}>
                    <span className="text-lg" style={{ color: 'var(--color-primary-alt)' }}>✅</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium" style={{ color: 'var(--color-secondary-dark)', fontFamily: 'var(--font-primary)', fontWeight: '600' }}>En Route to Restaurant</h3>
                    <p className="text-sm" style={{ color: 'var(--color-secondary-gray)', fontFamily: 'var(--font-primary)' }}>Heading to pickup location</p>
                  </div>
                </div>
                
                {/* Progress indicators */}
                <div className="mt-4 space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--color-secondary-light)' }}></div>
                    <span className="text-sm" style={{ color: 'var(--color-secondary-gray)', fontFamily: 'var(--font-primary)', fontWeight: '600' }}>Order confirmed</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--color-secondary-light)' }}></div>
                    <span className="text-sm" style={{ color: 'var(--color-secondary-gray)', fontFamily: 'var(--font-primary)', fontWeight: '600' }}>Food being prepared</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--color-primary-alt)' }}></div>
                    <span className="text-sm font-medium" style={{ color: 'var(--color-primary-alt)', fontFamily: 'var(--font-primary)', fontWeight: '600' }}>En route to pickup</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--color-secondary-light)' }}></div>
                    <span className="text-sm" style={{ color: 'var(--color-secondary-gray)', fontFamily: 'var(--font-primary)', fontWeight: '600' }}>Out for delivery</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--color-secondary-light)' }}></div>
                    <span className="text-sm" style={{ color: 'var(--color-secondary-gray)', fontFamily: 'var(--font-primary)', fontWeight: '600' }}>Delivered</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsTracking;


