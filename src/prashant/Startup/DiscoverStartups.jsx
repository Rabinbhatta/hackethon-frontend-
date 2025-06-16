import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
  FiSearch,
  FiFilter,
  FiStar,
  FiUsers,
  FiTarget,
  FiTrendingUp,
  FiMapPin,
} from "react-icons/fi"
import "./startup.css"

const base_url = import.meta.env.VITE_API_URL

function FeaturedStartups() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [startupData, setStartupData] = useState([])
  const [loading, setLoading] = useState(true)

  const getStartUps = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${base_url}/startup/get`, {
        method: "GET",
      })
      const result = await response.json()

      const formatted = result
        .filter((item) => item.role === "startup")
        .map((item) => ({
          id: item._id,
          name: item.startup.companyName,
          description: item.startup.companyDescription,
          raised: item.startup.evaluation,
          target: item.startup.targetFund,
          investors: item.investors || "N/A",
          teamSize: item.startup.teamSize,
          location: item.startup.location,
          category: [item.startup.industry],
          tags: [item.startup.fundingStage, item.startup.foundedYear],
          icon: (
            <img
              src={item.startup.businessLogo || "/placeholder.svg"}
              alt={`${item.startup.companyName} logo`}
              className="startup-logo"
            />
          ),
        }))

      setStartupData(formatted)
    } catch (error) {
      console.error("Failed to fetch startups:", error)
      setStartupData([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getStartUps()
  }, [])

  const filteredStartups = startupData.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "All" || s.category.includes(selectedCategory))
  )

  return (
    <div className="featured-startups-container">
      {/* Search and Filters */}
      <div className="filters-container">
        <div className="filters-wrapper">
          <div className="search-container">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search startups..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
              disabled={loading}
            />
          </div>

          <div className="filter-controls">
            <div className="select-container">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="category-select"
                disabled={loading}
              >
                <option value="All">All Categories</option>
                <option value="AI/ML">AI/ML</option>
                <option value="HealthTech">HealthTech</option>
                <option value="SaaS">SaaS</option>
                <option value="EdTech">EdTech</option>
                <option value="Cybersecurity">Cybersecurity</option>
                <option value="CleanTech">CleanTech</option>
              </select>
              <FiFilter className="select-icon" />
            </div>
          </div>
        </div>
      </div>

      {/* Featured Startups Header */}
      <div className="section-header">
        <FiStar className="header-star" />
        <h2 className="section-title">Featured Startups</h2>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <span className="loading-text">Loading startups...</span>
        </div>
      ) : (
        /* Startup Cards Grid */
        <div className="startups-grid">
          {filteredStartups.length > 0 ? (
            filteredStartups.map((startup, index) => (
              <div key={index} className="startup-card">
                {/* Card Header */}
                <div className="card-header">
                  <div className="card-header-left">
                    <div className="card-icon">{startup.icon}</div>
                    <div className="card-title-container">
                      <h3 className="card-title">{startup.name}</h3>
                    </div>
                  </div>
                  <FiStar className="card-star" />
                </div>

                {/* Category Badges */}
                <div className="category-badges">
                  {startup.category.map((cat, i) => (
                    <span key={i} className="category-badge">
                      {cat}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <p className="card-description">
                  {startup.description.split(" ").slice(0, 20).join(" ")}
                  {startup.description.split(" ").length > 20 && "..."}
                </p>

                {/* Metrics */}
                <div className="card-metrics">
                  <div className="metric-row">
                    <div className="metric-label">
                      <FiTarget className="metric-icon" />
                      <span>Raised / Target</span>
                    </div>
                    <span className="metric-value">
                      {startup.raised} / {startup.target}
                    </span>
                  </div>

                  <div className="metric-row">
                    <div className="metric-label">
                      <FiTrendingUp className="metric-icon" />
                      <span>Investors</span>
                    </div>
                    <span className="metric-value">10</span>
                  </div>

                  <div className="metric-row">
                    <div className="metric-label">
                      <FiUsers className="metric-icon" />
                      <span>Team Size</span>
                    </div>
                    <span className="metric-value">{startup.teamSize}</span>
                  </div>

                  <div className="metric-row">
                    <div className="metric-label">
                      <FiMapPin className="metric-icon" />
                      <span>Location</span>
                    </div>
                    <span className="metric-value">{startup.location}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="card-tags">
                  {startup.tags.map((tag, i) => (
                    <span key={i} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* View Details Button */}
                <Link to={`/startups/${startup.id}`} className="card-link">
                  <button className="details-button">View Details</button>
                </Link>
              </div>
            ))
          ) : (
            <div className="no-results">
              <div className="no-results-icon">
                <FiSearch />
              </div>
              <p className="no-results-text">No startups found matching your criteria.</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function DiscoverStartups() {
  return (
    <div className="discover-startups-page">
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">Discover Startups</h1>
          <p className="page-subtitle">Explore high-potential startups seeking investment</p>
        </div>

        <FeaturedStartups />
      </div>
    </div>
  )
}

export default DiscoverStartups
