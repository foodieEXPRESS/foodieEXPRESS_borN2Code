// src/App.jsx
// import React from 'react';
import { Routes, Route,BrowserRouter } from 'react-router-dom';


import Home from './pages/Home';
import About from './pages/About';
import Counter from './pages/counter';


import CartView from './pages/hazem/cartView';
import OrderViewBeforePayment from './pages/hazem/order_view_before_payment';
import RiderProfile from './pages/profles/RiderProfile';{/* TO DELETE LATER*/}
function App() {
  return (
    
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/counter" element={<Counter />} />
          <Route path="/cart" element={<CartView />} />
          <Route path="/order-view-before-payment" element={<OrderViewBeforePayment />} />
          <Route path="/rider-profile" element={<RiderProfile />} />{/* TO DELETE LATER*/}
    
    
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;