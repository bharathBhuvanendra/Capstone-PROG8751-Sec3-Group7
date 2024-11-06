import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Homepage.css';
import backgroundImage from '../assets/map_overlay_test.svg.png';

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section
        className="hero-section"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '500px',
        }}
      >
        <div className="hero-content">
          <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1>Reserve Parking Now & Save</h1>
            <div className="search-container">
              <input type="text" placeholder="Parking Slots available near me" className="search-input" />
              <motion.button className="search-button" whileTap={{ scale: 0.95 }}>
                Search
              </motion.button>
            </div>
            <motion.button className="find-parking-button" whileTap={{ scale: 0.95 }} onClick={() => console.log("Finding parking...")}>
              Find Parking Near Me
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Featured Parking Locations */}
      <section className="featured-parking-section">
        <h2>Popular Parking Locations</h2>
        <div className="featured-locations">
          {['Downtown', 'Airport', 'Mall'].map((location, index) => (
            <motion.div key={index} className="location-card" whileHover={{ scale: 1.05 }}>
              <h3>{location}</h3>
              <p>Convenient parking spots available.</p>
              <motion.button className="book-now-button" whileTap={{ scale: 0.95 }}>
                Book Now
              </motion.button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works-section">
        <h2>How It Works</h2>
        <div className="steps">
          {['Search', 'Select', 'Reserve', 'Park'].map((step, index) => (
            <div key={index} className="step">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.2 }}>
                <h3>{step}</h3>
                <p>Step {index + 1} description.</p>
              </motion.div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
