import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaGithub, FaWhatsapp } from 'react-icons/fa';
import '../styles/Footer.css'; // Import the custom CSS file
import ParkingSymbol from '../assets/parking.png'; // Use the correct path for the parking symbol

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="footer"
    >
      <div className="container mx-auto flex justify-between items-start p-10 max-w-4xl">

       {/* Left Section */}
       <div className="flex flex-col items-start">
  <h3 className="text-5xl font-extrabold tracking-wide text-white font-poppins">
    Need a parking spot?
  </h3>
  <h3 className="text-5xl font-extrabold tracking-wide text-white font-poppins">
    We’ve got you!
  </h3>


  <div className="flex items-center mt-4"> {/* Flex container for image and text */}
    <img src={ParkingSymbol} alt="Parking symbol" className="w-16 h-16 mr-4" /> {/* Added right margin */}
    <p className="text-lg font-medium text-white ml-10"> {/* Added left margin */}
      Effortless parking, anytime, anywhere.
    </p>
  </div>
</div>



        {/* Right Section */}
        <div className="flex flex-col items-end">
          <motion.button className="btn-primary mb-2">
            Sign up for free
          </motion.button>
          <ul className="flex flex-col items-end space-y-2 no-bullets">
            <li><a href="/pay-for-parking">Pay for Parking</a></li>
            <li><a href="/monthly-pass">Monthly Pass</a></li>
            <li><a href="/find-parking">Find Parking</a></li>
            <li><a href="/terms">Terms and conditions</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
          </ul>
        </div>
      </div>

      {/* Center-Bottom Section */}
      <div className="flex flex-col items-center mt-8">
        <div className="flex justify-center items-center mb-2">
          <a href="https://facebook.com" className="social-icon text-blue-600">
            <FaFacebookF size={30} />
          </a>
          <a href="https://twitter.com" className="social-icon text-[#1DA1F2]">
            <FaTwitter size={30} />
          </a>
          <a href="https://instagram.com" className="social-icon text-[#E1306C]">
            <FaInstagram size={30} />
          </a>
          <a href="https://linkedin.com" className="social-icon text-[#0077B5]">
            <FaLinkedinIn size={30} />
          </a>
          <a href="https://github.com" className="social-icon text-black">
            <FaGithub size={30} />
          </a>
          <a href="https://whatsapp.com" className="social-icon text-[#25D366]">
            <FaWhatsapp size={30} />
          </a>
        </div>

        <p className="footer-note text-lg">
          © 2024 Parkopedia - All rights reserved.
        </p>
      </div>

    </motion.footer>
  );
};

export default Footer;
