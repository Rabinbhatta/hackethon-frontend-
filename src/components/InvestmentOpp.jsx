import React from "react";
import "../pages/CSS/home.css";
import { FaRegStar } from "react-icons/fa";
import "../pages/CSS/home.css";
import { FaRobot } from "react-icons/fa6";
import { RiHealthBookFill } from "react-icons/ri";
import { FaDatabase } from "react-icons/fa6";
const Opportunities = () => {
  const opportunities = [
    {
      id: 1,
      name: "TechFlow AI",
      sector: "AI/ML",
      description: "AI-powered workflow automation for enterprises",
      raised: 2.5,
      target: 5,
      investors: 45,
      icon: <FaRobot />,
    },
    {
      id: 2,
      name: "GreenEnergy Solutions",
      sector: "Clean Tech",
      description: "Sustainable energy storage systems",
      raised: 1.8,
      target: 3,
      investors: 32,
      icon: <RiHealthBookFill />,
    },
    {
      id: 3,
      name: "HealthTech Pro",
      sector: "HealthTech",
      description: "Telemedicine platform for rural healthcare",
      raised: 3.2,
      target: 7,
      investors: 67,
      icon: <FaDatabase />,
    },
  ];

  return (
    <section className="opportunities-section">
      <div className="investment-container">
        <h2 className="investment-section-title">Featured Investment Opportunities</h2>
        <p className="investment-section-subtitle">
          Discover high-potential startups seeking funding
        </p>

        <div className="investment-cards-container">
          {opportunities.map((op) => (
            <div className="investment-card" key={op.id}>
              <div className="investment-card-header">
                <div className="investment-left-header">
                  <span className="investment-icon">{op.icon}</span>
                  <div className="investment-name-tag">
                    <h3 className="investment-startup-name">{op.name}</h3>
                    <span className="investment-tag">{op.sector}</span>
                  </div>
                </div>
                <span className="investment-star">
                  <FaRegStar />
                </span>
              </div>

              <p className="investment-description">{op.description}</p>

              <div className="investment-details">
                <div className="investment-details-row">
                  <span>Raised</span>
                  <strong>NRS{op.raised}M</strong>
                </div>
                <div className="investment-details-row">
                  <span>Target</span>
                  <strong>NRS{op.target}M</strong>
                </div>
                <div className="investment-details-row">
                  <span>Investors</span>
                  <strong>{op.investors}</strong>
                </div>
              </div>

              <button className="investment-view-button">View Details</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Opportunities;
