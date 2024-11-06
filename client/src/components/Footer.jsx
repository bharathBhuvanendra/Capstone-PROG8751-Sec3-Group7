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
            <p className="text-lg font-medium text-white ml-10">
              Effortless parking, anytime, anywhere.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end pr-4">
          <motion.button className="btn-primary mb-2">
            Sign up for free
          </motion.button>
          <ul className="flex flex-col items-end space-y-1 no-bullets">
            <li><a>Pay for Parking</a></li>
            <li><a>Monthly Pass</a></li>
            <li><a>Find Parking</a></li>
            <li><a>Terms and conditions</a></li>
            <li><a>Privacy Policy</a></li>
          </ul>
        </div>

        <div className="center-bottom">
          <div className="social-icons">
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
            © 2024 Park-A-Lot - All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
