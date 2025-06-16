
import React from "react";
import "../pages/CSS/home.css";


const HeroSection = () => {
  return (
    <section id="hero">
      <span className="badge">Trusted by 10,000+ investors worldwide</span>
      <h2>Connect with the Next</h2>
      <h2 className="highlight">Generation of Startups</h2>
      <p>
        It is the premier platform connecting accredited investors with
        high-potential startups. Discover, evaluate, and invest in tomorrow's
        unicorns today.
      </p>
      <div className="hero-btn">
        <button id="herobtn1">Start Investing</button>
        <button id="herobtn2">List Your Startup</button>
      </div>
    </section>
  );
};

export default HeroSection;
