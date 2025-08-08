// src/App.jsx
// import React from 'react';
import { Routes, Route,BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Counter from './pages/counter';
import RestaurantList from './pages/mc_Components/RestaurantList';
import RestaurantDetails from './pages/mc_Components/RestaurantDetails';
import CustomerProfile from './pages/mc_Components/CustomerProfile'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/counter" element={<Counter />} />
          <Route path="/list" element={<RestaurantList />} />
          <Route path="/list/OneRest/details" element={<RestaurantDetails />} /> 
          <Route path="/custProfile" element={<CustomerProfile/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;