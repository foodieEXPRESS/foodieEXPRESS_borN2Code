// src/App.jsx
// import React from 'react';
import { Routes, Route,BrowserRouter } from 'react-router-dom';


import Home from './pages/Home';
import About from './pages/About';
import Counter from './pages/counter';

// Import All 5Mohamed Components
import DeliveryHistory from './pages/5Mohamed/DeliveryHistoryComponents/DeliveryHistory';
import RestaurantSearch from './pages/5Mohamed/RestaurantSearch';
import LandingPage from './pages/5Mohamed/LandingPage';

// Import 5Mohamed Components CSS
import './pages/5Mohamed/styles.css';

import CartView from './pages/hazem/cartView';
import OrderViewBeforePayment from './pages/hazem/order_view_before_payment';
function App() {
  console.log('App component loaded');
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/counter" element={<Counter />} />
          
          {/* All 5Mohamed Component Routes */}
          {/* http://localhost:5173/delivery-history */}
          <Route path="/delivery-history" element={<DeliveryHistory />} />
          {/* http://localhost:5173/restaurant-search */}
          <Route path="/restaurant-search" element={<RestaurantSearch />} />
          {/* http://localhost:5173/landing-page */}
          <Route path="/landing-page" element={<LandingPage />} />
          <Route path="/cart" element={<CartView />} />
          <Route path="/order-view-before-payment" element={<OrderViewBeforePayment />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;