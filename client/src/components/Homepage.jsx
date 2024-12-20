// src/components/Homepage.jsx
import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Homepage.css';
import backgroundImage from '../assets/map_overlay_test.svg.png';

const Homepage = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section
        className="hero-section"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '500px',
        }}
        aria-label="Hero section with search options for parking"
      >
        <div className="hero-content">
          <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1>Reserve Parking Now & Save</h1>
            <div className="search-container">
              <input
                type="text"
                placeholder="Parking slots available near me"
                className="search-input"
                aria-label="Search for available parking slots near me"
              />
              <motion.button
                className="search-button"
                whileTap={{ scale: 0.95 }}
                aria-label="Search parking"
              >
                Search
              </motion.button>
            </div>
            <motion.button
              className="find-parking-button"
              whileTap={{ scale: 0.95 }}
              onClick={() => console.log("Finding parking...")}
              aria-label="Find parking near me"
            >
              Find Parking Near Me
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Featured Parking Locations */}
      <section className="featured-parking-section" aria-label="Featured parking locations">
        <h2>Popular Parking Locations</h2>
        <div className="featured-locations">
          {['Downtown', 'Airport', 'Mall'].map((location, index) => (
            <motion.div
              key={index}
              className="location-card"
              whileHover={{ scale: 1.05 }}
              aria-label={`Parking location at ${location}`}
            >
              <h3>{location}</h3>
              <p>Convenient parking spots available.</p>
              <motion.button
                className="book-now-button"
                whileTap={{ scale: 0.95 }}
                aria-label={`Book parking at ${location}`}
              >
                Book Now
              </motion.button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works-section" aria-label="Explanation of how the parking reservation system works">
        <h2>How It Works</h2>
        <div className="steps">
          {['Search', 'Select', 'Reserve', 'Park'].map((step, index) => (
            <div key={index} className="step" aria-label={`Step ${index + 1}: ${step}`}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.2 }}>
                <h3>{step}</h3>
                {/* <p>Step {index + 1} description.</p> */}
              </motion.div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Homepage;
