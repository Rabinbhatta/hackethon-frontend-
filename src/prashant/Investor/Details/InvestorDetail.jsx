

import { useState, useEffect } from "react"
import {
  FiArrowLeft,
  FiStar,
  FiMapPin,
  FiCalendar,
  FiClock,
  FiDollarSign,
  FiTarget,
  FiMessageCircle,
  FiHeart,
  FiShare2,
  FiGlobe,
  FiLinkedin,
  FiMail,
  FiFileText,
  FiTrendingUp,
  FiPieChart,
  FiMessageSquare,
} from "react-icons/fi"
import "./detail.css"
import { useParams } from "react-router-dom"
const base_url = import.meta.env.VITE_API_URL


export default function InvestorProfile() {
  const [investor, setInvestor] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isFollowing, setIsFollowing] = useState(false)
   const { slug } = useParams()

  // Static fallback data
  const staticInvestor = {
    _id: "684d498b791e728e3bd159e0",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah@vcpartners.com",
    phoneNumber: "+1234567890",
    role: "investor",
    investor: {
      investorType: "Angel",
      investmentRange: "$100K - $500K",
      preferredSectors: ["AI/ML", "SaaS", "FinTech", "Enterprise"],
      investmentExperience:
        "Sarah Johnson is a seasoned venture capitalist with a deep technical background and proven track record of identifying and nurturing high-growth technology companies. As Managing Partner at Venture Capital Partners, she leads the firm's investments in early-stage B2B SaaS and AI/ML companies.",
    },
    createdAt: "2019-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
  }


  useEffect(() => {
    fetchInvestor()
  }, [])

  const fetchInvestor = async () => {
    try {
      const response = await fetch(`${base_url}/startup/getUser/${slug}`)
      const data = await response.json()

      if (data && data._id) {
        setInvestor(data)
      } else {
        setInvestor(staticInvestor)
      }
    } catch (error) {
      console.error("Error fetching investor:", error)
      setInvestor(staticInvestor)
    } finally {
      setLoading(false)
    }
  }

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`
  }

  const getRandomColor = () => {
    const colors = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#06B6D4"]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  const getJoinYear = (createdAt) => {
    return new Date(createdAt).getFullYear()
  }

  const getLastActive = () => {
    const hours = Math.floor(Math.random() * 24) + 1
    return `${hours} hours ago`
  }

  const getStats = () => ({
    totalInvestments: Math.floor(Math.random() * 50) + 20,
    successfulExits: Math.floor(Math.random() * 20) + 5,
    portfolioValue: `$${Math.floor(Math.random() * 100) + 25}M`,
    responseRate: `${Math.floor(Math.random() * 20) + 80}%`,
    avgResponseTime: `${Math.floor(Math.random() * 5) + 1} hours`,
    successRate: `${Math.floor(Math.random() * 15) + 20}%`,
  })

  const getRecentActivity = () => [
    { company: "TechFlow AI", date: "2023-09", status: "Active" },
    { company: "DataViz Pro", date: "2023-07", status: "Active" },
    { company: "CloudSecure", date: "2023-05", status: "Active" },
  ]

  const handleContact = () => {
    alert(`Contacting ${investor?.firstName} ${investor?.lastName}`)
  }

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${investor?.firstName} ${investor?.lastName} - Investor Profile`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Profile link copied to clipboard!")
    }
  }

  const handleSocialClick = (platform) => {
    const urls = {
      website: `https://www.${investor?.firstName?.toLowerCase()}${investor?.lastName?.toLowerCase()}.com`,
      linkedin: `https://linkedin.com/in/${investor?.firstName?.toLowerCase()}-${investor?.lastName?.toLowerCase()}`,
      email: `mailto:${investor?.email}`,
    }
    window.open(urls[platform], "_blank")
  }

  if (loading) {
    return <div className="loading-container">Loading investor profile...</div>
  }

  if (!investor) {
    return <div className="loading-container">Investor not found</div>
  }

  const stats = getStats()
  const recentActivity = getRecentActivity()

  return (
    <div className="profile-container">
      <div className="profile-wrapper">
        {/* Back Button */}
        <a href="/" className="back-button">
          <FiArrowLeft size={16} />
          Back to Investors
        </a>

        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-main">
            <div className="profile-left">
              <div className="profile-avatar" style={{ backgroundColor: getRandomColor() }}>
                {getInitials(investor.firstName, investor.lastName)}
                <div className="profile-badge">
                  <FiStar size={12} />
                </div>
              </div>

              <div className="profile-info">
                <div className="profile-name-container">
                  <h1 className="profile-name">
                    {investor.firstName} {investor.lastName}
                  </h1>
                  <FiStar className="profile-star" size={24} />
                </div>

                <p className="profile-title">Managing Partner</p>
                <p className="profile-company">Venture Capital Partners</p>

                <div className="profile-meta">
                  <div className="profile-meta-item">
                    <FiMapPin size={14} />
                    San Francisco, CA
                  </div>
                  <div className="profile-meta-item">
                    <FiCalendar size={14} />
                    Joined {getJoinYear(investor.createdAt)}
                  </div>
                  <div className="profile-meta-item">
                    <FiClock size={14} />
                    Last active {getLastActive()}
                  </div>
                </div>

                <div className="profile-tags">
                  {investor.investor?.preferredSectors?.slice(0, 4).map((sector, index) => (
                    <span key={index} className="profile-tag">
                      {sector}
                    </span>
                  ))}
                  {investor.investor?.preferredSectors?.length > 4 && (
                    <span className="profile-tag">+{investor.investor.preferredSectors.length - 4} more</span>
                  )}
                </div>

                <div className="profile-investment-info">
                  <div className="investment-range">
                    <FiDollarSign size={16} />
                    {investor.investor?.investmentRange || "$100K - $500K"}
                  </div>
                  <div className="investment-stages">
                    <FiTarget size={16} />
                    Seed, Series A
                  </div>
                </div>
              </div>
            </div>

           
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-card-header">
              <span className="stat-card-title">Total Investments</span>
              <FiFileText className="stat-card-icon" size={20} />
            </div>
            <div className="stat-card-value">{stats.totalInvestments}</div>
            <div className="stat-card-description">Active portfolio companies</div>
          </div>

          <div className="stat-card">
            <div className="stat-card-header">
              <span className="stat-card-title">Successful Exits</span>
              <FiTrendingUp className="stat-card-icon" size={20} />
            </div>
            <div className="stat-card-value success">{stats.successfulExits}</div>
            <div className="stat-card-description">{stats.successRate} success rate</div>
          </div>

          <div className="stat-card">
            <div className="stat-card-header">
              <span className="stat-card-title">Portfolio Value</span>
              <FiPieChart className="stat-card-icon" size={20} />
            </div>
            <div className="stat-card-value portfolio">{stats.portfolioValue}</div>
            <div className="stat-card-description">Total portfolio valuation</div>
          </div>

          <div className="stat-card">
            <div className="stat-card-header">
              <span className="stat-card-title">Response Rate</span>
              <FiMessageSquare className="stat-card-icon" size={20} />
            </div>
            <div className="stat-card-value response">{stats.responseRate}</div>
            <div className="stat-card-description">Avg: {stats.avgResponseTime}</div>
          </div>
        </div>

        {/* Navigation Tabs */}


        {/* Content Sections */}
        <div className="profile-content">
          <div className="content-section">
            <h2 className="section-title">
              About {investor.firstName} {investor.lastName}
            </h2>

            <p className="about-text">
              {investor.investor?.investmentExperience ||
                `${investor.firstName} ${investor.lastName} is a seasoned venture capitalist with a deep technical background and proven track record of identifying and nurturing high-growth technology companies.`}
            </p>

            <p className="about-text">
              Before entering venture capital, {investor.firstName} spent over a decade in senior engineering and
              product roles at leading technology companies. At Salesforce, she served as VP of Engineering for the
              Einstein AI platform, where she led a team of 200+ engineers and data scientists in building one of the
              industry's most successful AI-powered CRM solutions.
            </p>

            <p className="about-text">
              {investor.firstName}'s investment philosophy centers on backing exceptional founders who are solving real
              problems with innovative technology. She particularly values companies with strong product-market fit,
              defensible technology moats, and clear paths to scalable growth.
            </p>

            <p className="about-text">
              Her notable investments include several unicorn companies and successful exits, with a combined portfolio
              value exceeding {stats.portfolioValue}. {investor.firstName} is known for her hands-on approach to
              supporting portfolio companies, often serving on boards and providing strategic guidance on product
              development, go-to-market strategy, and scaling operations.
            </p>
          </div>

          <div className="content-section">
            <h2 className="section-title">Investment Focus</h2>

            <div className="focus-section">
              <span className="focus-label">Preferred Stages</span>
              <div className="focus-tags">
                <span className="focus-tag">Seed</span>
                <span className="focus-tag">Series A</span>
              </div>
            </div>

            <div className="focus-section">
              <span className="focus-label">Check Size</span>
              <div className="check-size">{investor.investor?.investmentRange || "$100K - $500K"}</div>
            </div>

            <div className="focus-section">
              <span className="focus-label">Focus Sectors</span>
              <div className="focus-tags">
                {(investor.investor?.preferredSectors || ["AI/ML", "SaaS", "FinTech", "Enterprise", "B2B"]).map(
                  (sector, index) => (
                    <span key={index} className="focus-tag">
                      {sector}
                    </span>
                  ),
                )}
              </div>
            </div>

            <div className="focus-section">
              <span className="focus-label">Recent Activity</span>
              <div>
                {recentActivity.map((activity, index) => (
                  <div key={index} className="activity-item">
                    <div className="activity-info">
                      <div className="activity-company">{activity.company}</div>
                      <div className="activity-date">{activity.date}</div>
                    </div>
                    <div className="activity-status">{activity.status}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
