import React, { useState } from "react";
import "./css/investor.css";
const base_url = import.meta.env.VITE_API_URL


const Investorsregistration = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    role: "investor",
    investorType: "",
    investmentRange: "",
    preferredSectors: [],
    investmentExperience: "",
  });

  const [errors, setErrors] = useState({});
  const sectors = [
    "AI/ML",
    "HealthTech",
    "EdTech",
    "Agriculture & Food",
    "Education",
    "Healthcare",
    "Technology",
    "Tourism",
    "Manufacturing",
    "Finance",
    "Construction",
    "Retail",
    "Energy",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleSector = (sector) => {
    setFormData((prev) => {
      const exists = prev.preferredSectors.includes(sector);
      return {
        ...prev,
        preferredSectors: exists
          ? prev.preferredSectors.filter((s) => s !== sector)
          : prev.preferredSectors.length < 3
          ? [...prev.preferredSectors, sector]
          : prev.preferredSectors,
      };
    });
  };

  const validate = () => {
    const errs = {};
    if (!formData.firstName.trim()) errs.firstName = "First name required";
    if (!formData.lastName.trim()) errs.lastName = "Last name required";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      errs.email = "Valid email required";
    if (!formData.password || formData.password.length < 6)
      errs.password = "Password must be at least 6 characters";
    if (!formData.confirmPassword.trim())
      errs.confirmPassword = "Please confirm your password";
    else if (formData.confirmPassword !== formData.password)
      errs.confirmPassword = "Passwords do not match";
    if (!formData.phoneNumber.trim())
      errs.phoneNumber = "Phone number required";
    if (!formData.investorType.trim())
      errs.investorType = "Investor type required";
    if (!formData.investmentRange.trim())
      errs.investmentRange = "Investment range required";
    if (formData.preferredSectors.length === 0)
      errs.preferredSectors = "Select at least one sector";
    if (!formData.investmentExperience.trim())
      errs.investmentExperience = "Experience required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const { confirmPassword, ...submissionData } = formData;

    try {
      const res = await fetch(
        `${base_url}/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(submissionData),
        }
      );

      const data = await res.json();
      if (res.ok) {
        alert("Registration successful!");
      } else {
        alert(`Failed: ${data.message || "Unknown error"}`);
      }
    } catch (err) {
      alert("Submission error: " + err.message);
    }
  };

  return (
    <div className="background">
      <div className="registration-form">
        <h2>Investor Registration</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <div className="form-labels">
              <label>First Name:</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && <p className="error">{errors.firstName}</p>}
            </div>

            <div className="form-labels">
              <label>Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
              {errors.lastName && <p className="error">{errors.lastName}</p>}
            </div>

            <div className="form-labels">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
          </div>

          <div className="form-group">
            <div className="form-labels">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <p className="error">{errors.password}</p>}
            </div>

            <div className="form-labels">
              <label>Confirm Password:</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <p className="error">{errors.confirmPassword}</p>
              )}
            </div>

            <div className="form-labels">
              <label>Phone Number:</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              {errors.phoneNumber && (
                <p className="error">{errors.phoneNumber}</p>
              )}
            </div>
          </div>

          <div className="form-group">
            <div className="form-labels">
              <label>Investor Type:</label>
              <input
                type="text"
                name="investorType"
                placeholder="e.g., Angel"
                value={formData.investorType}
                onChange={handleChange}
              />
              {errors.investorType && (
                <p className="error">{errors.investorType}</p>
              )}
            </div>

            <div className="form-labels">
              <label>Investment Range:</label>
              <input
                type="text"
                name="investmentRange"
                placeholder="e.g., $50,000 - $500,000"
                value={formData.investmentRange}
                onChange={handleChange}
              />
              {errors.investmentRange && (
                <p className="error">{errors.investmentRange}</p>
              )}
            </div>

            <div className="form-labels">
              <label>Investment Experience:</label>
              <textarea
                name="investmentExperience"
                value={formData.investmentExperience}
                onChange={handleChange}
                placeholder="e.g., 5+ years"
              />
              {errors.investmentExperience && (
                <p className="error">{errors.investmentExperience}</p>
              )}
            </div>
          </div>

          <h2>Preferred Sectors (Max 3):</h2>
          <div className="sector-buttons">
            {sectors.map((sector, i) => (
              <button
                type="button"
                key={i}
                className={`sector-btn ${
                  formData.preferredSectors.includes(sector) ? "selected" : ""
                }`}
                onClick={() => toggleSector(sector)}
              >
                {sector}
              </button>
            ))}
          </div>
          {errors.preferredSectors && (
            <p className="error">{errors.preferredSectors}</p>
          )}

          <div className="button-group">
            <button type="submit" className="next-btn">
              Register Now
            </button>
          </div>

          <p className="login-link">
            Already Registered? <a href="/signin">Click Me</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Investorsregistration;
