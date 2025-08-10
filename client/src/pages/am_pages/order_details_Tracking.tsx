import React, { useState, useEffect } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { fetchCustomerData, fetchRestaurantData } from '../../store/orderTrackingSlice';

const OrderDetailsTracking: React.FC = () => {
  const [showMap, setShowMap] = useState(true);
  
  // Redux hooks
  const dispatch = useAppDispatch();
  const { 
    customerData, 
    restaurantData, 
    customerLoading, 
    restaurantLoading, 
    customerError, 
    restaurantError 
  } = useAppSelector((state) => state.orderTracking);

  // For demo purposes, using a sample order ID - in real app this would come from props or route params
  const orderId = "123"; // Replace with actual order ID from your app

  useEffect(() => {
    // Dispatch Redux actions to fetch data
    dispatch(fetchCustomerData(orderId));
    dispatch(fetchRestaurantData(orderId));
  }, [dispatch, orderId]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAFAFA' }}>
      {/* Header */}
      <div className="bg-white shadow-md mb-8">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--color-primary)' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.4364 1.96045L13.4828 7.97005L22.0364 8.68045L13.4828 9.39085L12.4364 15.4004L11.39 9.39085L2.83643 8.68045L11.39 7.97005L12.4364 1.96045Z" fill="white"/>
</svg>

            </div>
            <span className="text-xl font-semibold" style={{ color: 'var(--color-secondary-dark)', fontFamily: 'var(--font-primary)' }}>FoodieExpress</span>
          </div>
          <button 
            onClick={() => setShowMap(!showMap)}
            className="rounded-md text-white px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity flex flex-row items-center justify-center gap-2 cursor-pointer"
            style={{ 
              backgroundColor: 'var(--color-primary)', 
              fontFamily: 'var(--font-primary)'
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14 6C14 10 8 14 8 14C8 14 2 10 2 6C2 4.93913 2.42143 3.92172 3.17157 3.17157C3.92172 2.42143 4.93913 2 6 2H10C11.0609 2 12.0783 2.42143 12.8284 3.17157C13.5786 3.92172 14 4.93913 14 6Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8 8C9.10457 8 10 7.10457 10 6C10 4.89543 9.10457 4 8 4C6.89543 4 6 4.89543 6 6C6 7.10457 6.89543 8 8 8Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

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
              <div className="bg-white rounded-2xl p-6 shadow-xl w-xs mx-4">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M42 18C42 30 24 42 24 42C24 42 6 30 6 18C6 14.8174 7.26428 11.7652 9.51472 9.51472C11.7652 7.26428 14.8174 6 18 6H30C33.1826 6 36.2348 7.26428 38.4853 9.51472C40.7357 11.7652 42 14.8174 42 18Z" stroke="#4318D1" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M24 24C27.3137 24 30 21.3137 30 18C30 14.6863 27.3137 12 24 12C20.6863 12 18 14.6863 18 18C18 21.3137 20.6863 24 24 24Z" stroke="#4318D1" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
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
        <div className="bg-white  "> 
          <div className="p-6 space-y-6 w-5/6 justify-center mx-auto">
        {/* Order Details  and order items*/}
            <div className='flex flex-row w-full gap-6 ml-30'>
            {/* Order Details */}
            <div className="bg-white  w-4/10 shadow-md  rounded-md " style={{ borderColor: 'var(--color-secondary-light)' }}>
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
                <div className=" p-4 flex items-start space-x-3 rounded-md mb-8 " style={{ backgroundColor: '#F8F9FA' }}>
                  <div className="w-10 h-10 rounded-md flex items-center justify-center" style={{ backgroundColor: 'var(--color-primary)' }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 11C12.7614 11 15 8.76142 15 6C15 3.23858 12.7614 1 10 1C7.23858 1 5 3.23858 5 6C5 8.76142 7.23858 11 10 11Z" stroke="var(--color-secondary-lighter)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M3.875 19C3.875 15.2721 6.64719 12.25 10 12.25C13.3528 12.25 16.125 15.2721 16.125 19" stroke="var(--color-secondary-lighter)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                                     {customerLoading ? (
                   <div className="animate-pulse">
                     <div className="h-5 bg-gray-200 rounded mb-2 w-32"></div>
                     <div className="h-4 bg-gray-200 rounded mb-2 w-40"></div>
                     <div className="h-4 bg-gray-200 rounded mb-2 w-36"></div>
                     <div className="h-4 bg-gray-200 rounded w-28"></div>
                   </div>
                 ) : customerError ? (
                   <div className="text-red-500 text-sm">
                     <p>Error loading customer data: {customerError}</p>
                   </div>
                    ) : customerData ? (
                      <>
                        <h3 className="font-medium mb-2" style={{ color: 'var(--color-secondary-dark)', fontFamily: 'var(--font-primary)', fontWeight: '600' }}>
                          {customerData.fullName || 'Customer Name Not Available'}
                        </h3>
                        <p className="text-sm mb-2" style={{ color: 'var(--color-secondary-gray)', fontFamily: 'var(--font-primary)' }}>
                          {customerData.address || 'Address Not Available'}
                        </p>
                        <p className="text-sm mb-2" style={{ color: 'var(--color-secondary-gray)', fontFamily: 'var(--font-primary)' }}>
                          {customerData.email || 'Email Not Available'}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_19_98)">
                              <path d="M15.2 11.2002V13.2002C15.2008 13.3987 15.1616 13.5957 15.0849 13.7787C15.0082 13.9617 14.8956 14.1269 14.7538 14.2644C14.612 14.4019 14.4444 14.5086 14.2606 14.5787C14.0769 14.6487 13.8808 14.6806 13.6867 14.6726C11.5196 14.4486 9.44819 13.6895 7.66668 12.4669C6.02407 11.3621 4.67076 9.9088 3.66668 8.16021C2.44008 6.37586 1.68085 4.3009 1.46001 2.13088C1.452 1.93738 1.48375 1.74189 1.55344 1.55866C1.62313 1.37543 1.72938 1.20829 1.86637 1.06682C2.00336 0.925343 2.16805 0.812917 2.35057 0.736109C2.53309 0.659301 2.72957 0.619589 2.92668 0.62021H4.92668C5.32436 0.616112 5.71088 0.748553 6.01689 0.995545C6.3229 1.24254 6.52653 1.58802 6.59334 1.97354C6.71743 2.74425 6.94469 3.49714 7.26668 4.21354C7.37349 4.44382 7.40937 4.7006 7.37008 4.95156C7.33079 5.20252 7.21817 5.43527 7.04668 5.61354L6.17334 6.48688C7.20598 8.21615 8.7174 9.72757 10.4467 10.7602L11.32 9.88688C11.4983 9.71539 11.731 9.60277 11.982 9.56348C12.233 9.52419 12.4897 9.56007 12.72 9.66688C13.4364 9.98887 14.1893 10.2161 14.96 10.3402C15.3507 10.4078 15.7003 10.616 15.9482 10.9281C16.1962 11.2402 16.3262 11.6331 16.32 12.0335L15.2 11.2002Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </g>
                            <defs>
                              <clipPath id="clip0_19_98">
                                <rect width="16" height="16" fill="white"/>
                              </clipPath>
                            </defs>
                          </svg>
                          <span className="text-sm" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-primary)' }}>
                            {customerData.phoneNumber || 'Phone Not Available'}
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className="text-gray-500 text-sm">
                        <p>No customer data available</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Restaurant Info */}
                <div className="p-4 flex items-start space-x-3 rounded-md mb-8" style={{ backgroundColor: '#F8F9FA' }}>
                  <div className="w-10 h-10 rounded-md flex items-center justify-center" style={{ backgroundColor: 'var(--color-primary-alt)' }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M6 10L8.5 12.5L14 7" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>

                  </div>
                  <div className=" flex-1">
                    {restaurantLoading ? (
                      <div className="animate-pulse">
                        <div className="h-5 bg-gray-200 rounded mb-2 w-32"></div>
                        <div className="h-4 bg-gray-200 rounded mb-2 w-40"></div>
                        <div className="h-4 bg-gray-200 rounded mb-2 w-36"></div>
                        <div className="h-4 bg-gray-200 rounded w-28"></div>
                      </div>
                    ) : restaurantError ? (
                      <div className="text-red-500 text-sm">
                        <p>Error loading restaurant data: {restaurantError}</p>
                      </div>
                    ) : restaurantData ? (
                      <>
                        <h3 className="font-medium mb-2" style={{ color: 'var(--color-secondary-dark)', fontFamily: 'var(--font-primary)', fontWeight: '600' }}>
                          {restaurantData.name || 'Restaurant Name Not Available'}
                        </h3>
                        <p className="text-sm mb-2" style={{ color: 'var(--color-secondary-gray)', fontFamily: 'var(--font-primary)' }}>
                          No address available
                        </p>
                        <p className="text-sm mb-2" style={{ color: 'var(--color-secondary-gray)', fontFamily: 'var(--font-primary)' }}>
                          Pickup by: 2:45 PM
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M15.2 11.2002V13.2002C15.2008 13.3987 15.1616 13.5957 15.0849 13.7787C15.0082 13.9617 14.8956 14.1269 14.7538 14.2644C14.612 14.4019 14.4444 14.5086 14.2606 14.5787C14.0769 14.6487 13.8808 14.6806 13.6867 14.6726C11.5196 14.4486 9.44819 13.6895 7.66668 12.4669C6.02407 11.3621 4.67076 9.9088 3.66668 8.16021C2.44008 6.37586 1.68085 4.3009 1.46001 2.13088C1.452 1.93738 1.48375 1.74189 1.55344 1.55866C1.62313 1.37543 1.72938 1.20829 1.86637 1.06682C2.00336 0.925343 2.16805 0.812917 2.35057 0.736109C2.53309 0.659301 2.72957 0.619589 2.92668 0.62021H4.92668C5.32436 0.616112 5.71088 0.748553 6.01689 0.995545C6.3229 1.24254 6.52653 1.58802 6.59334 1.97354C6.71743 2.74425 6.94469 3.49714 7.26668 4.21354C7.37349 4.44382 7.40937 4.7006 7.37008 4.95156C7.33079 5.20252 7.21817 5.43527 7.04668 5.61354L6.17334 6.48688C7.20598 8.21615 8.7174 9.72757 10.4467 10.7602L11.32 9.88688C11.4983 9.71539 11.731 9.60277 11.982 9.56348C12.233 9.52419 12.4897 9.56007 12.72 9.66688C13.4364 9.98887 14.1893 10.2161 14.96 10.3402C15.3507 10.4078 15.7003 10.616 15.9482 10.9281C16.1962 11.2402 16.3262 11.6331 16.32 12.0335L15.2 11.2002Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>

                          <span className="text-sm" style={{ color: 'var(--color-primary-alt)', fontFamily: 'var(--font-primary)' }}>
                            {restaurantData.contactPhone || 'Phone Not Available'}
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className="text-gray-500 text-sm">
                        <p>No restaurant data available</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Special Instructions */}
                <div className="border rounded-md p-3" style={{ 
                  backgroundColor: '#FFF3CD', 
                  borderColor: '#FFEAA7',
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
                <div className="p-4 flex items-center justify-between border rounded-md " style={{ borderColor: '#E5E5E5'}}>
                  <div className="flex items-center space-x-3 ">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--color-primary)', }}>
                      <span className="font-medium text-sm" style={{ color: 'var(--color-secondary-lighter)', fontFamily: 'var(--font-primary)', fontWeight: '500' }}>x1</span>
                    </div>
                    <div >
                      <p className="font-medium" style={{ color: 'var(--color-secondary-dark)', fontFamily: 'var(--font-primary)', fontWeight: '600' }}>Margherita Pizza</p>
                      <p className="text-sm" style={{ color: 'var(--color-secondary-gray)', fontFamily: 'var(--font-primary)' }}>Extra cheese</p>
                    </div>
                  </div>
                  <span className="font-medium" style={{ color: 'var(--color-secondary-dark)', fontFamily: 'var(--font-primary)', fontWeight: '600' }}>$18.99</span>
                </div>

                {/* Order Item 2 */}
                <div className="p-4 flex items-center justify-between border rounded-md " style={{ borderColor: '#E5E5E5'}}>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--color-primary)', borderRadius: 'var(--button-radius)' }}>
                      <span className="font-medium text-sm" style={{ color: 'var(--color-secondary-lighter)', fontFamily: 'var(--font-primary)', fontWeight: '500' }}>x1</span>
                    </div>
                    <div>
                      <p className="font-medium" style={{ color: 'var(--color-secondary-dark)', fontFamily: 'var(--font-primary)', fontWeight: '600' }}>Caesar Salad</p>
                      <p className="text-sm" style={{ color: 'var(--color-secondary-gray)', fontFamily: 'var(--font-primary)' }}>Dressing on the side</p>
                    </div>
                  </div>
                  <span className="font-medium" style={{ color: 'var(--color-secondary-dark)', fontFamily: 'var(--font-primary)', fontWeight: '600' }}>$12.99</span>
                </div>

                {/* Order Item 3 */}
                <div className=" p-4 flex items-center justify-between border rounded-md " style={{ borderColor: '#E5E5E5'}}>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--color-primary)', borderRadius: 'var(--button-radius)' }}>
                      <span className="font-medium text-sm" style={{ color: 'var(--color-secondary-lighter)', fontFamily: 'var(--font-primary)', fontWeight: '500' }}>x2</span>
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
            <div className=" p-2 bg-white rounded-md  shadow-md w-5/6 mx-auto" >
              <div className="p-4 ">
                <h2 className="text-lg font-semibold" style={{ color: 'var(--color-secondary-dark)', fontFamily: 'var(--font-primary)' }}>Delivery Status</h2>
              </div>
              
              <div className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color-primary-alt)' }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.5 5L6 12.5L2.5 9" stroke="var(--color-secondary-lighter)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
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


