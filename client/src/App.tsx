// src/App.jsx
// import React from 'react';
import { Routes, Route,BrowserRouter } from 'react-router-dom';


import Home from './pages/Home';
import About from './pages/About';
import Counter from './pages/counter';
import RestaurantList from './pages/mc_Components/RestaurantList';
import RestaurantDetails from './pages/mc_Components/RestaurantDetails';
import CustomerProfile from './pages/mc_Components/CustomerProfile'

import CartView from './pages/hazem/cartView';
import OrderViewBeforePayment from './pages/hazem/order_view_before_payment';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/counter" element={<Counter />} />
          <Route path="/list" element={<RestaurantList />} />
          <Route path="/list/OneRest/details" element={<RestaurantDetails restId={"OneRest"} />} />
          <Route path="/custProfile" element={<CustomerProfile />} />
          <Route path="/cart" element={<CartView />} />
          <Route path="/order-view-before-payment" element={<OrderViewBeforePayment />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;