import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import MyBookings from './components/MyBookings';
import Footer from './components/Footer';  // Import Footer

function App() {
  
  return (
    <Router>
      
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/my-bookings" element={<MyBookings />} />
        </Routes>
        <Footer />  
      </div>
    </Router>
  );
}

export default App;
