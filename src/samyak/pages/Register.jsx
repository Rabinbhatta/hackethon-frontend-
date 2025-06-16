import React from "react";
import { useNavigate } from "react-router-dom";
import "../pages/css/register.css";
import investorpic from "../../assets/ivestor.PNG";
import pitcherpic from "../../assets/startup.png";

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="register-container">
      <h2>Join Company Name</h2>
      <p>Choose your account type to get started</p>

      <div className="container-samyak">
        <div className="register-option">
          <img
            src={investorpic}
            alt="Investor"
            className="register-icon-samyak"
          />
          <h4>I'm an investor</h4>
          <p>Discover and invest in promising startups</p>
          <ul>
            <li>Access to curated startup deals</li>
            <li>Portfolio management tools</li>
            <li>Due diligence materials</li>
            <li>Direct founder communication</li>
            <li>Investment tracking & analytics</li>
          </ul>
          <button
            className="register-button"
            onClick={() => navigate("/register/investor")}
          >
            Register as Investor
          </button>
        </div>

        <div className="register-option">
          <img
            src={pitcherpic}
            alt="Startup"
            className="register-icon-samyak"
          />
          <h4>I'm a startup</h4>
          <p>Raise funding from investors</p>
          <ul>
            <li>Create compelling pitch decks</li>
            <li>Access to investor network</li>
            <li>Fundraising campaign tools</li>
            <li>Investor communication platform</li>
            <li>Analytics & progress tracking</li>
          </ul>
          <button
            className="register-button"
            onClick={() => navigate("/register/startup")}
          >
            Register as Startup
          </button>
        </div>
      </div>

      <br />
      <p>
        Already have an account?{" "}
        <span
          onClick={() => navigate("/signin")}
          style={{ color: "blue", cursor: "pointer" }}
        >
          Sign in
        </span>
      </p>
    </div>
  );
};

export default Register;
