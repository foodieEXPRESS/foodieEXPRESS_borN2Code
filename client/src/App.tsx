// src/App.jsx
// import React from 'react';
import { Routes, Route,BrowserRouter } from 'react-router-dom';


import Home from './pages/Home';
import Counter from './pages/counter';

import { RestaurantList } from './pages/mc_Components/RestaurantList';
import CustomerProfile from './pages/profiles/mc_Customerprofile/CustomerProfile';
import RestaurantDetails from './pages/mc_Components/RestaurantDetails';

import OrderViewBeforePayment from './pages/hazem/order_view_before_payment';
function App() {
  return (
    
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/counter" element={<Counter />} />

          <Route path="/list" element={<RestaurantList userId={"userId"} />} />
          <Route path="/list/details/:restId" element={<RestaurantDetails />} />
          <Route path="/custProfile" element={<CustomerProfile />} />
  
          <Route path="/order-view-before-payment" element={<OrderViewBeforePayment />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;