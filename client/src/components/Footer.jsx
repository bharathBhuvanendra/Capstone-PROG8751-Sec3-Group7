// src/components/Footer.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaGithub, FaWhatsapp } from 'react-icons/fa';
import '../styles/Footer.css';
import footerBackground from '../assets/blue-footer-background.png';

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="footer"
      aria-label="Footer section"
    >
      {/* Background Image with Light Opacity */}
      <img src={footerBackground} alt="Footer Background" className="footer-background-image" />

      <div className="container mx-auto flex justify-between items-start p-10 max-w-4xl">
        {/* Footer Content */}
        <div className="flex flex-col items-start">
          <h3 className="text-5xl font-extrabold tracking-wide text-white font-poppins">
            Need a parking spot?
          </h3>
          <h3 className="text-5xl font-extrabold tracking-wide text-white font-poppins">
            We’ve got you!
          </h3>

          <div className="flex items-center mt-4">
            <p className="text-lg font-medium text-white ml-10" aria-label="Footer description">
              Effortless parking, anytime, anywhere.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end pr-4">
          <motion.button className="btn-primary mb-2" aria-label="Sign up for free button">
            Sign up for free
          </motion.button>
          <ul className="flex flex-col items-end space-y-1 no-bullets" aria-label="Footer links">
            <li><a href="#pay-parking" aria-label="Pay for Parking link">Pay for Parking</a></li>
            <li><a href="#monthly-pass" aria-label="Monthly Pass link">Monthly Pass</a></li>
            <li><a href="#find-parking" aria-label="Find Parking link">Find Parking</a></li>
            <li><a href="#terms" aria-label="Terms and Conditions link">Terms and conditions</a></li>
            <li><a href="#privacy" aria-label="Privacy Policy link">Privacy Policy</a></li>
          </ul>
        </div>

        <div className="center-bottom">
          <div className="social-icons" aria-label="Social media links">
            <a href="https://facebook.com" className="social-icon text-blue-600" aria-label="Facebook">
              <FaFacebookF size={30} />
            </a>
            <a href="https://twitter.com" className="social-icon text-[#1DA1F2]" aria-label="Twitter">
              <FaTwitter size={30} />
            </a>
            <a href="https://instagram.com" className="social-icon text-[#E1306C]" aria-label="Instagram">
              <FaInstagram size={30} />
            </a>
            <a href="https://linkedin.com" className="social-icon text-[#0077B5]" aria-label="LinkedIn">
              <FaLinkedinIn size={30} />
            </a>
            <a href="https://github.com" className="social-icon text-black" aria-label="GitHub">
              <FaGithub size={30} />
            </a>
            <a href="https://whatsapp.com" className="social-icon text-[#25D366]" aria-label="WhatsApp">
              <FaWhatsapp size={30} />
            </a>
          </div>
          <p className="footer-note text-lg" aria-label="Copyright notice">
            © 2024 Park-A-Lot - All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
