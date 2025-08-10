import React from 'react';
import type { SavedCard } from './dataTypes';

// Dummy data for demonstration (replace with real data as needed)
const orderSteps = [
  { title: 'Order Placed', time: '2:30 PM', desc: 'Your order has been confirmed.' },
  { title: 'Cooking', time: '2:35 PM', desc: 'Restaurant is preparing your food.' },
  { title: 'Out for Delivery', time: '01:22 AM', desc: 'Your order is on the way.' },
  { title: 'Delivered', time: '01:22 AM', desc: 'Enjoy your meal!' },
];

const driver = {
  id: 'MJ',
  name: 'Mike Johnson',
  rating: 4.9,
  vehicle: 'Motorcycle',
};

const restaurant = {
  id: 'BI',
  name: 'Bella Italia',
  address: '456 Restaurant Ave, New York, NY',
  phone: '123-456-7890',
};

const items = [
  { category: 'Pizza', name: 'Margherita Pizza', qty: 2, price: 33.98 },
  { category: 'Salad', name: 'Caesar Salad', qty: 1, price: 12.99 },
  { category: 'Dessert', name: 'Tiramisu', qty: 1, price: 7.99 },
];

const total = 54.97;
const deliveryTime = '2:30 PM';
const distance = '1.2 km';
const address = '123 Main Street, Apt 4B, New York, NY 10001';

// Main tracking page component
const LastReview: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAFAFA] font-inter flex flex-col items-center py-6 px-2">
      {/* Main container, max width for mobile-first design */}
      <div className="w-full max-w-[480px] mx-auto space-y-6">
        {/* Order Status Section */}
        <section className="bg-white rounded-2xl shadow p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-[24px] font-bold text-[#1A1A1A]">Order Status</h2>
            <div className="text-sm text-[#666666] text-right">
              Estimated delivery<br />
              <span className="text-[#10B981] font-bold text-base">Delivered!</span>
            </div>
          </div>
          {/* Timeline */}
          <div className="relative pl-7">
            {/* Vertical line accent */}
            <div className="absolute left-3 top-6 bottom-0 w-1 bg-[#10B981]/30 rounded-full z-0" />
            <ol className="space-y-8">
              {orderSteps.map((step, idx) => (
                <li key={step.title} className="relative z-10 flex items-start gap-4">
                  {/* Step circle */}
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-white text-sm
                    ${idx <= 3 ? 'bg-[#10B981] shadow' : 'bg-[#E5E5E5]'}
                  `}>
                    {/* Show check for delivered, number for others */}
                    {idx < 3 ? <span>{idx + 1}</span> : <svg width="18" height="18" fill="none" viewBox="0 0 20 20"><circle cx="9" cy="9" r="9" fill="#10B981"/><path d="M6 10.5l2 2 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>}
                  </span>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-[#4318D1] text-base">{step.title}</span>
                      <span className="text-xs text-[#10B981] font-semibold">{step.time}</span>
                    </div>
                    <div className="text-sm text-[#666666] mt-0.5">{step.desc}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Delivery Driver Card */}
        <section className="bg-white rounded-2xl shadow p-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Driver ID circle */}
            <span className="w-12 h-12 rounded-full bg-[#10B981] text-white font-bold flex items-center justify-center text-lg">{driver.id}</span>
            <div>
              <div className="font-bold text-[#1A1A1A]">{driver.name}</div>
              <div className="text-sm text-[#666666] flex items-center gap-1">
                <span className="text-[#10B981]">★</span> {driver.rating} <span className="mx-1">·</span> {driver.vehicle}
              </div>
            </div>
          </div>
          <button className="ml-2 p-2 rounded-full bg-[#E5E5E5] hover:bg-[#4318D1] transition-colors" aria-label="Call driver">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21c1.21.49 2.53.76 3.88.76a1 1 0 011 1V20a1 1 0 01-1 1C10.07 21 3 13.93 3 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.35.27 2.67.76 3.88a1 1 0 01-.21 1.11l-2.2 2.2z" stroke="#4318D1" strokeWidth="1.5"/></svg>
          </button>
        </section>

        {/* Live Tracking Section */}
        <section className="bg-white rounded-2xl shadow p-5">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-[#1A1A1A]">Live Tracking</h3>
            <button className="text-[#4318D1] text-sm font-medium hover:underline">Hide Map</button>
          </div>
          {/* Map placeholder */}
          <div className="bg-[#E5E5E5] rounded-xl h-36 flex items-center justify-center relative mb-4">
            <div className="absolute top-3 left-3 bg-white px-3 py-1 rounded-full text-xs font-medium text-[#10B981] border border-[#10B981] shadow">Driver Location</div>
            <div className="flex flex-col items-center">
              <svg width="36" height="36" fill="none" viewBox="0 0 24 24" className="mb-2"><circle cx="12" cy="12" r="10" fill="#E5E5E5"/><path d="M12 8v4l3 3" stroke="#4318D1" strokeWidth="2" strokeLinecap="round"/></svg>
              <span className="text-[#666666] text-sm">Live Map View</span>
              <span className="text-xs text-[#666666]">Real-time tracking would appear here</span>
            </div>
            <div className="absolute bottom-3 right-3 bg-[#4318D1] text-white px-3 py-1 rounded-full text-xs font-medium shadow">Your Location</div>
          </div>
          {/* Tracking details */}
          <div className="flex flex-col gap-1 text-sm">
            <div className="flex justify-between">
              <span className="text-[#666666]">Distance remaining</span>
              <span className="text-[#1A1A1A]">{distance}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#666666]">Estimated arrival</span>
              <span className="text-[#10B981] font-semibold">Delivered!</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#666666]">Delivery address</span>
              <span className="text-[#1A1A1A] text-right max-w-[220px] truncate">{address}</span>
            </div>
          </div>
        </section>

        {/* Order Summary Section */}
        <section className="bg-white rounded-2xl shadow p-6">
          {/* Restaurant header */}
          <div className="flex items-center gap-3 mb-4">
            <span className="w-10 h-10 rounded-full bg-[#4318D1] text-white font-bold flex items-center justify-center text-lg">{restaurant.id}</span>
            <div className="flex-1">
              <div className="font-bold text-[#1A1A1A]">{restaurant.name}</div>
              <div className="text-xs text-[#666666]">{restaurant.address}</div>
            </div>
            <a href={`tel:${restaurant.phone}`} className="ml-2 px-3 py-1 rounded-lg bg-[#4318D1] text-white text-sm font-medium hover:bg-[#10B981] transition-colors">Call Restaurant</a>
          </div>
          {/* Item table */}
          <div className="divide-y divide-[#E5E5E5] mb-3">
            {items.map((item) => (
              <div key={item.name} className="flex items-center py-2">
                <span className="w-16 font-bold text-[#4318D1]">{item.category}</span>
                <span className="flex-1 text-[#1A1A1A]">{item.name}</span>
                <span className="text-[#666666] text-sm ml-2">Qty: {item.qty}</span>
                <span className="text-[#4318D1] font-semibold ml-4">${item.price.toFixed(2)}</span>
              </div>
            ))}
          </div>
          {/* Total section */}
          <div className="flex justify-between items-center font-bold text-[#1A1A1A] text-base mb-1">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="text-xs text-[#666666] mb-3">Ordered at {deliveryTime}</div>
          {/* Action buttons */}
          <div className="flex gap-2 mb-2">
            <button className="flex-1 border border-[#E5E5E5] rounded-lg py-2 text-[#1A1A1A] font-medium hover:bg-[#FAFAFA] transition-colors">Report an Issue</button>
            <button className="flex-1 bg-[#4318D1] hover:bg-[#10B981] text-white font-semibold rounded-lg py-2 transition-colors">Reorder Items</button>
          </div>
          {/* Delivery status footer */}
          <div className="bg-[#E6FAF3] rounded-xl p-4 flex flex-col items-center mt-2 shadow">
            <div className="flex items-center gap-2 mb-1">
              <svg width="22" height="22" fill="none" viewBox="0 0 20 20"><circle cx="10" cy="10" r="10" fill="#10B981"/><path d="M6 10.5l2.5 2.5L14 8.5" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
              <span className="text-[#10B981] font-bold">Order Delivered!</span>
            </div>
            <div className="text-[#666666] text-sm mb-2 text-center">Hope you enjoyed your Bella Italia order!</div>
            <button className="bg-[#10B981] hover:bg-[#4318D1] text-white font-semibold rounded-lg px-6 py-2 transition-colors">Rate Your Experience</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LastReview;
