// src/App.jsx
// import React from 'react';
import { Routes, Route,BrowserRouter } from 'react-router-dom';


import Home from './pages/Home';
import Counter from './pages/counter';

import CustomerProfile from './pages/profiles/mc_Customerprofile/CustomerProfile';
import AuthPage from './pages/auth.component/AuthPage';
import RestaurantList from './pages/mc_Components/RestaurantList';
import RestaurantDetails from './pages/mc_Components/RestaurantDetails';
// Importing the necessary components for routing
import OrderTrackPage from './pages/OrderTrackPage/OrderTrackPage';


// Import All 5Mohamed Components
import DeliveryHistory from './pages/5Mohamed/DeliveryHistoryComponents/DeliveryHistory';
import RestaurantSearch from './pages/5Mohamed/RestaurantSearch';
import LandingPage from './pages/5Mohamed/LandingPage';

// Import 5Mohamed Components CSS
import './pages/5Mohamed/styles.css';

import CartView from './pages/hazem/cartView';
import OrderViewBeforePayment from './pages/hazem/order_view_before_payment';
import RiderProfile from './pages/profiles/riderProfile-am/RiderProfile-am';
import OrderDetailsTracking from './pages/am_pages/order_details_Tracking';

function App() {
  console.log('App component loaded');
  
  return (
    
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/counter" element={<Counter />} />

          <Route path="/list" element={<RestaurantList/>} />
          <Route path="/list/details/:restId" element={<RestaurantDetails />} />
          <Route path="/custProfile" element={<CustomerProfile />} />

          <Route path="/auth" element={<AuthPage />} />
          <Route path="/order-tracking" element={<OrderTrackPage />} />

          {/* All 5Mohamed Component Routes */}
          {/* http://localhost:5173/delivery-history */}
          <Route path="/delivery-history" element={<DeliveryHistory />} />
          {/* http://localhost:5173/restaurant-search */}
          <Route path="/restaurant-search" element={<RestaurantSearch />} />
          {/* http://localhost:5173/landing-page */}
          <Route path="/landing-page" element={<LandingPage />} />
          <Route path="/cart" element={<CartView  />} />
          <Route path="/order-view-before-payment" element={<OrderViewBeforePayment  />} />
          <Route path="/rider-profile" element={<RiderProfile />} />


          <Route path="/order-details-tracking" element={<OrderDetailsTracking />} />
    
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;