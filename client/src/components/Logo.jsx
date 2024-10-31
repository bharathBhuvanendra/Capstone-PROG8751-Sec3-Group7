
import React from 'react';
import logoImage from '../styles/Logo.png'; 
const Logo = () => {
  return (
    <div className="logo-container">
      <img src={logoImage} alt="PARK-A-LOT Logo" className="logo" />
    </div>
  );
};

export default Logo;
