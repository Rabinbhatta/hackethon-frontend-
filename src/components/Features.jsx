import React from 'react';
import { FaUser } from "react-icons/fa";
import { PiSpiralBold } from "react-icons/pi";
import { FaDollarSign } from "react-icons/fa";
import "../pages/CSS/home.css";

const Features = () => {
  return (
    <section id="investment-feature" className="investment-feature-section">
      <div className="investment-feature-container">
        <h3 className="investment-feature-title">How SajiloLagani Works</h3>
        <p className="investment-feature-subtitle">
          Simple steps to start your investment journey
        </p>
        <div className="investment-feature-items">
          <div className="investment-feature-box">
            <div className="investment-feature-icon">
              <FaUser />
            </div>
            <h4>1. Create Profile</h4>
            <p>
              Set up your investor profile and complete accreditation verification
            </p>
          </div>


          <div className="investment-feature-box">
            <div className="investment-feature-icon">
              <PiSpiralBold />
            </div>
            <h4>2. Discover Startups</h4>
            <p>
              Browse curated startups that match your investment criteria
            </p>
          </div>

          <div className="investment-feature-box">
            <div className="investment-feature-icon">
              <FaDollarSign />
            </div>
            <h4>3. Invest & Track</h4>
            <p>
              Make investments and track your portfolio performance
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
