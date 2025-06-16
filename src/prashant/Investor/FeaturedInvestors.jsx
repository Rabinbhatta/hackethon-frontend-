
import { useState, useEffect } from "react"
import {
  FiUsers,
  FiDollarSign,
  FiTrendingUp,
  FiAward,
  FiSearch,
  FiFilter,
  FiChevronDown,
  FiStar,
  FiMapPin,
  FiEye,
  FiMessageCircle,
  FiGlobe,
  FiLinkedin,
  FiMail,
  FiX,
} from "react-icons/fi"
import "./investor.css"
import { Link, Navigate } from "react-router-dom"

const base_url = import.meta.env.VITE_API_URL





export default function InvestorDiscovery() {
  const [investors, setInvestors] = useState([])
  const [filteredInvestors, setFilteredInvestors] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("All Investors")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRange, setSelectedRange] = useState("all")
  const [selectedSector, setSelectedSector] = useState("all")
  const [selectedStage, setSelectedStage] = useState("all")
 
  const [selectedInvestor, setSelectedInvestor] = useState(null)
    const [user, setUser] = useState(null);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  })

  // Static data for when API doesn't return data
  

  useEffect(() => {
    fetchInvestors()
  }, [])

  useEffect(() => {
    filterInvestors()
  }, [investors, searchTerm, selectedRange, selectedSector, selectedStage, activeTab])
   useEffect(() => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }, []);

  const fetchInvestors = async () => {
    try {
      const response = await fetch(`${base_url}/investor/get`)
      const data = await response.json()

      if (data && data.length > 0) {
        setInvestors(data)
      } else {
        setInvestors(staticInvestors)
      }
    } catch (error) {
      console.error("Error fetching investors:", error)
      setInvestors(staticInvestors)
    } finally {
      setLoading(false)
    }
  }

  const filterInvestors = () => {
    let filtered = [...investors]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (investor) =>
          `${investor.firstName} ${investor.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
          investor.investor.preferredSectors.some((sector) =>
            sector.toLowerCase().includes(searchTerm.toLowerCase()),
          ) ||
          investor.investor.investorType.toLowerCase().includes(searchTerm.toLowerCase()) ||
          investor.investor.investmentExperience.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Investment range filter
    if (selectedRange !== "all") {
      filtered = filtered.filter((investor) => investor.investor.investmentRange === selectedRange)
    }

    // Sector filter
    if (selectedSector !== "all") {
      filtered = filtered.filter((investor) => investor.investor.preferredSectors.includes(selectedSector))
    }

    // Tab filter
    if (activeTab === "Featured") {
      // Show investors with higher investment ranges for featured
      filtered = filtered.filter(
        (investor) =>
          investor.investor.investmentRange.includes("NRS1M") ||
          investor.investor.investmentRange.includes("NRS5M") ||
          investor.investor.investmentRange.includes("NRS10M"),
      )
    } else if (activeTab === "Top Investors") {
      // Show VC investors for top investors
      filtered = filtered.filter((investor) => investor.investor.investorType === "VC")
    } else if (activeTab === "Recently Active") {
      // Sort by creation date for recently active
      filtered = filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }

    setFilteredInvestors(filtered)
  }

  const tabs = ["All Investors", "Featured", "Top Investors", "Recently Active"]

  const getInitials = (firstName, lastName) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`
  }

  const getRandomColor = () => {
    const colors = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#06B6D4"]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  const getRandomStats = () => ({
    investments: Math.floor(Math.random() * 50) + 10,
    exits: Math.floor(Math.random() * 20) + 5,
    portfolio: `NRS${Math.floor(Math.random() * 500) + 50}M`,
    responseRate: `${Math.floor(Math.random() * 30) + 70}%`,
    avgResponse: `${Math.floor(Math.random() * 10) + 2} hours`,
  })

  const getRandomCompany = (investorType) => {
    const vcFirms = [
      "Venture Capital Partners",
      "Future Fund Ventures",
      "Tech Ventures LLC",
      "Innovation Capital",
      "Growth Partners",
    ]
    const angelGroups = [
      "Angel Investors Network",
      "Startup Angels",
      "Tech Angel Group",
      "Investment Angels",
      "Capital Angels",
    ]

    return investorType === "VC"
      ? vcFirms[Math.floor(Math.random() * vcFirms.length)]
      : angelGroups[Math.floor(Math.random() * angelGroups.length)]
  }

  const getRandomLocation = () => {
    const locations = [
      "San Francisco, CA",
      "Los Angeles, CA",
      "Seattle, WA",
      "New York, NY",
      "Austin, TX",
      "Boston, MA",
    ]
    return locations[Math.floor(Math.random() * locations.length)]
  }

  const getRecentInvestments = () => {
    const companies = [
      "TechFlow AI",
      "DataViz Pro",
      "GameStudio Pro",
      "StreamTech",
      "CryptoSecure",
      "BlockChain Pro",
      "HealthTech AI",
      "GreenEnergy Co",
    ]
    return companies.slice(0, Math.floor(Math.random() * 3) + 2)
  }

  const handleViewProfile = (investor) => {
    // In a real app, this would navigate to a detailed profile page
    alert(`Viewing profile for ${investor.firstName} ${investor.lastName}`)
  }

  const handleContact = () => {
    Navigate('/chatbox')
  }

  const handleContactSubmit = (e) => {
    e.preventDefault()
    // In a real app, this would send the contact form to an API
    console.log("Contact form submitted:", {
      investor: selectedInvestor,
      form: contactForm,
    })
    alert(`Message sent to ${selectedInvestor?.firstName} ${selectedInvestor?.lastName}!`)
    setShowContactModal(false)
    setContactForm({ name: "", email: "", company: "", message: "" })
  }


  const getInvestmentRanges = () => {
    const ranges = new Set(investors.map((inv) => inv.investor.investmentRange))
    return Array.from(ranges)
  }

  const getSectors = () => {
    const sectors = new Set(investors.flatMap((inv) => inv.investor.preferredSectors))
    return Array.from(sectors)
  }

  if (loading) {
    return <div className="loading-container">Loading investors...</div>
  }

  return (
    <div className="container">
      <div className="main-wrapper">
        {/* Header */}
        <div className="header">
          <h1 className="header-title">Discover Investors</h1>
          <p className="header-subtitle">Connect with angel investors and venture capital firms</p>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stats-card">
            <div className="stats-card-header">
              <FiUsers className="stats-card-icon" size={20} />
              <span className="stats-card-label">Active Investors</span>
            </div>
            <div className="stats-card-value">{investors.length.toLocaleString()}</div>
            <div className="stats-card-description">Across all sectors</div>
          </div>

          <div className="stats-card">
            <div className="stats-card-header">
              <FiDollarSign className="stats-card-icon" size={20} />
              <span className="stats-card-label">Total Invested</span>
            </div>
            <div className="stats-card-value">NRS8.5B</div>
            <div className="stats-card-description">Platform lifetime</div>
          </div>

          <div className="stats-card">
            <div className="stats-card-header">
              <FiTrendingUp className="stats-card-icon" size={20} />
              <span className="stats-card-label">Avg Investment</span>
            </div>
            <div className="stats-card-value">NRS340K</div>
            <div className="stats-card-description">Per deal</div>
          </div>

          <div className="stats-card">
            <div className="stats-card-header">
              <FiAward className="stats-card-icon" size={20} />
              <span className="stats-card-label">Success Rate</span>
            </div>
            <div className="stats-card-value">78%</div>
            <div className="stats-card-description">Successful exits</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="filters-container">
          <div className="search-container">
            <FiSearch className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search investors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="select-container">
            <select className="select-input" value={selectedRange} onChange={(e) => setSelectedRange(e.target.value)}>
              <option value="all">All Ranges</option>
              {getInvestmentRanges().map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
            <FiChevronDown className="select-icon" size={16} />
          </div>

          <div className="select-container">
            <select className="select-input" value={selectedSector} onChange={(e) => setSelectedSector(e.target.value)}>
              <option value="all">All Sectors</option>
              {getSectors().map((sector) => (
                <option key={sector} value={sector}>
                  {sector}
                </option>
              ))}
            </select>
            <FiChevronDown className="select-icon" size={16} />
          </div>

          <div className="select-container">
            <select className="select-input" value={selectedStage} onChange={(e) => setSelectedStage(e.target.value)}>
              <option value="all">All Stages</option>
              <option value="Pre-seed">Pre-seed</option>
              <option value="Seed">Seed</option>
              <option value="Series A">Series A</option>
              <option value="Series B+">Series B+</option>
            </select>
            <FiChevronDown className="select-icon" size={16} />
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs-container">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`tab-button ${activeTab === tab ? "active" : "inactive"}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Investor Cards */}
        {filteredInvestors.length === 0 ? (
          <div className="no-results">
            <FiUsers className="no-results-icon" size={48} />
            <h3 className="no-results-title">No investors found</h3>
            <p className="no-results-description">
              Try adjusting your search criteria or filters to find more investors.
            </p>
          </div>
        ) : (
          <div className="investors-grid">
            {filteredInvestors.map((investor) => {
              const stats = getRandomStats()
              const company = getRandomCompany(investor.investor.investorType)
              const location = getRandomLocation()
              const recentInvestments = getRecentInvestments()

              return (
                <div key={investor._id} className="investor-card">
                  {/* Header */}
                  <div className="investor-header">
                    <div className="investor-avatar" style={{ backgroundColor: getRandomColor() }}>
                      {getInitials(investor.firstName, investor.lastName)}
                    </div>
                    <div className="investor-info">
                      <div className="investor-name-container">
                        <h3 className="investor-name">
                          {investor.firstName} {investor.lastName}
                        </h3>
                        <FiStar className="investor-star" size={16} />
                      </div>
                      <p className="investor-title">Managing Partner</p>
                      <p className="investor-company">{company}</p>
                    </div>
                  </div>

                  <div className="investor-location">
                    <FiMapPin size={14} />
                    <span className="location-text">{location}</span>
                  </div>

                  {/* Investment Range */}
                  <div className="investment-range">
                    <span className="investment-range-label">Investment Range:</span>
                    <span className="investment-range-value">{investor.investor.investmentRange}</span>
                  </div>

                  {/* Focus Areas */}
                  <div className="focus-areas">
                    <span className="focus-areas-label">Focus Areas:</span>
                    <div className="focus-areas-tags">
                      {investor.investor.preferredSectors.map((sector, index) => (
                        <span key={index} className="focus-tag">
                          {sector}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="stats-container">
                    <div className="stat-item">
                      <div className="stat-value investments">{stats.investments}</div>
                      <div className="stat-label">Investments</div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-value exits">{stats.exits}</div>
                      <div className="stat-label">Exits</div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-value portfolio">{stats.portfolio}</div>
                      <div className="stat-label">Portfolio</div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="investor-description">{investor.investor.investmentExperience}</p>

                  {/* Response Rate */}
                  <div className="response-stats">
                    <div>
                      <span className="response-rate-label">Response Rate:</span>
                      <span className="response-rate-value">{stats.responseRate}</span>
                    </div>
                    <div>
                      <span className="avg-response-label">Avg Response:</span>
                      <span className="avg-response-value">{stats.avgResponse}</span>
                    </div>
                  </div>

                  {/* Recent Investments */}
                  <div className="recent-investments">
                    <span className="recent-investments-label">Recent Investments:</span>
                    <div className="recent-investments-tags">
                      {recentInvestments.map((investment, index) => (
                        <span key={index} className="recent-investment-tag">
                          {investment}
                        </span>
                      ))}
                      <span className="recent-investment-more">+{Math.floor(Math.random() * 5) + 1}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="action-buttons">
                    <Link to={`/investor/${investor._id}`}>
                       <button className="view-profile-button">
                      <FiEye size={16} />
                      View Profile
                    </button>
                    </Link>
                  {user && (
                      <Link to={`/chatbox/${investor._id}`}><button className="contact-button ">
                      <FiMessageCircle size={16} />
                      Contact
                    </button>
                  </Link> 
                  )}
                     
                  
                  
                  
                  </div>

                  {/* Social Links */}
                  <div className="social-links">
                    <FiGlobe className="social-icon" size={18} onClick={() => handleSocialClick("website", investor)} />
                    <FiLinkedin
                      className="social-icon"
                      size={18}
                      onClick={() => handleSocialClick("linkedin", investor)}
                    />
                    <FiMail className="social-icon" size={18} onClick={() => handleSocialClick("email", investor)} />
                  </div>

                  {/* Last Active */}
                  <div className="last-active">
                    <span className="last-active-text">
                      Last active: {Math.floor(Math.random() * 24) + 1} hours ago
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        )}

    
      </div>
    </div>
  )
}
