// src/App.jsx
// import React from 'react';
import { Routes, Route,BrowserRouter } from 'react-router-dom';


// Importing the necessary components for routing
import OrderTrackPage from './pages/OrderTrackPage/OrderTrackPage';
import RestaurantProfile from './pages/profiles/retaurantprofil/RestaurantProfile';
import EarningsReports from './pages/profiles/retaurantprofil/EarningsReports';
import Reviews from './pages/profiles/retaurantprofil/Reviews';
import MenuManagement from './pages/profiles/retaurantprofil/MenuManagement';


// Import All 5Mohamed Components
import DeliveryHistory from './pages/5Mohamed/DeliveryHistoryComponents/DeliveryHistory';
import LandingPage from './pages/5Mohamed/LandingPage';
// Import 5Mohamed Components CSS
import './pages/5Mohamed/styles.css';
import AuthPage from "./pages/auth.component/AuthPage";
import Counter from "./pages/counter";
import RestaurantList from "./pages/mc_Components/RestaurantList";
import RestaurantDetails from "./pages/mc_Components/RestaurantDetails";
import CustomerProfile from "./pages/profiles/mc_Customerprofile/CustomerProfile";
import CartView from "./pages/hazem/cartView";
import OrderViewBeforePayment from "./pages/hazem/order_view_before_payment";
import Checkout from "./pages/hazem/checkout";
import AddPaymentCard from './pages/hazem/add_payment_card';
import LastReview from './pages/hazem/last review';

import RiderProfile from './pages/profiles/riderProfile-am/RiderProfile-am';
import OrderDetailsTracking from './pages/am_pages/order_details_Tracking';
import OrderHistory from './pages/mc_Components/OrderHistory';
import RestauranSearch from './pages/5Mohamed/RestaurantSearch/index';

function App() {
  console.log('App component loaded');
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          <Route path="/counter" element={<Counter />} />

          <Route path="/list" element={<RestaurantList/>} />
          <Route path="/list/details/:restId" element={<RestaurantDetails/>} />
          <Route path="/custProfile" element={<CustomerProfile />} />
          <Route path="/OrderHistory" element={<OrderHistory />} />

          <Route path="/" element={<AuthPage />} />
          <Route path="/order-tracking/:orderId" element={<OrderTrackPage />} />
          <Route path="/restaurant-profile" element={<RestaurantProfile />} />
          <Route path="/earnings-reports" element={<EarningsReports />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/menu-management" element={<MenuManagement />} />

          {/* All 5Mohamed Component Routes */}
          {/* http://localhost:5173/delivery-history */}
          <Route path="/delivery-history" element={<DeliveryHistory />} />
         

          {/* http://localhost:5173/restaurant-search */}
          <Route path="/restaurant-search" element={<RestauranSearch />} />
          {/* http://localhost:5173/landing-page */}
          <Route path="/landing-page" element={<LandingPage />} />
          <Route path="/order-view-before-payment" element={<OrderViewBeforePayment  />} />
          <Route path="/cart" element={<CartView />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/add-payment-card" element={<AddPaymentCard />} />
          <Route path="/last-review" element={<LastReview />} />
          <Route path="/rider-profile" element={<RiderProfile />} />


          <Route path="/order-details-tracking/:orderId" element={<OrderDetailsTracking />} />
    
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
