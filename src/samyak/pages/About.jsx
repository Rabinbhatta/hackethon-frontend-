import React from "react";
import "../pages/CSS/about.css";
import about from '../../assets/about.PNG'; 

const About = () => {
  return (
    <div className="hackup-about-container">
      <div className="hackup-about-grid">
        <img
          src={about} 
          alt="About Us"
          className="hackup-about-image"
        />
        <div className="hackup-about-content">
          <h2 className="hackup-about-heading">
            Empowering Connections Between Startups and Investors
          </h2>
          <p className="hackup-about-text">
            Our platform bridges the gap between innovative startups and visionary investors. 
            We provide a trusted and dynamic environment where accredited investors can discover, 
            evaluate, and fund the next wave of disruptive companies. Whether you're an investor 
            seeking high-growth potential or a startup looking for capital and mentorship, 
            we streamline the entire process.
            <br /><br />
            With features like verified startup profiles, seamless pitch submissions, 
            investor dashboards, and secure communication channels, we ensure transparency, 
            efficiency, and impact-driven growth.
            <br /><br />
            Join us in shaping the future by backing bold ideas and brilliant founders ready to 
            build tomorrow’s unicorns today.
          </p>
          <a href="#" className="hackup-about-button">Explore Opportunities</a>
        </div>
      </div>
    </div>
  );
};

export default About;
