import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import './detail.css'
const base_url = import.meta.env.VITE_API_URL

function StartupDetail() {
  const { slug } = useParams()
  const [startup, setStartup] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const getStartup = async () => {
      try {
        const response = await fetch(`${base_url}/startup/getUser/${slug}`)
        const result = await response.json()

        if (result.role === 'startup') {
          const raisedValue = 10000 // Change this if actual value comes from backend
          const targetRaw = result.startup.targetFund?.toString() || '0'
          const targetValue = parseFloat(targetRaw.replace(/[^0-9.]/g, '').replace(/,/g, '')) || 1

          setStartup({
            role: result.role,
            name: result.startup.companyName,
            description: result.startup.companyDescription,
            raised: raisedValue,
            target: targetValue,
            investors: 10,
            teamSize: result.startup.teamSize,
            location: result.startup.location,
            category: [result.startup.industry],
            tags: [result.startup.fundingStage, result.startup.foundedYear],
            icon: <img src={result.startup.businessLogo} alt="logo" className="startup-logo" />,
            about: result.startup.companyDescription || '',
          })
        } else if (result.role === 'investor') {
          setStartup({
            role: result.role,
            name: `${result.firstName} ${result.lastName}`,
            email: result.email,
            phone: result.phoneNumber,
            investorType: result.investor.investorType,
            investmentRange: result.investor.investmentRange,
            preferredSectors: result.investor.preferredSectors,
            investmentExperience: result.investor.investmentExperience,
          })
        } else {
          setError("Unsupported user role.")
        }
      } catch (err) {
        console.error("Error fetching startup:", err)
        setError("Failed to load startup details.")
      }
    }

    getStartup()
  }, [slug])

  const formatDescription = (text) => {
    if (!text) return <p>No description available.</p>
    return text.split('\n').map((paragraph, i) => {
      if (paragraph.startsWith('- ')) {
        return (
          <li key={i} style={{ marginLeft: '1.5rem' }}>
            {paragraph.substring(2)}
          </li>
        )
      }
      return <p key={i}>{paragraph}</p>
    })
  }

  if (error) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>{error}</h2>
        <Link to="/startups" className="back-link">← Back to Startups</Link>
      </div>
    )
  }

  if (!startup) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Loading...</h2>
      </div>
    )
  }

  return (
    <div className="startup-detail">
      <Link to="/startups" className="back-link">← Back to Startups</Link>

      {startup.role === 'startup' ? (
        <>
          <div className="detail-header">
            <div className="startup-icon">{startup.icon}</div>
            <h1 className="startup-name">
              {startup.name} <span className="star">★</span>
            </h1>
            <p className="subtitle">{startup.description}</p>

            <div className="detail-tags">
              {startup.category.map((cat, i) => (
                <span key={i} className="badge">{cat}</span>
              ))}
            </div>

            <div className="location-info">
              {startup.location} • {startup.teamSize}
            </div>
          </div>

          <div className="funding-info">
            <div><strong>{startup.raised}</strong><br />Raised</div>
            <div><strong>{startup.target}</strong><br />Target</div>
            <div><strong>{startup.investors}</strong><br />Investors</div>
            <div>
              <strong>
                {Math.round((startup.raised / startup.target) * 100)}%
              </strong><br />Complete
            </div>
          </div>

          <div className="progress-bar-container">
            <div
              className="progress-bar-fill"
              style={{
                width: `${Math.round((startup.raised / startup.target) * 100)}%`
              }}
            />
          </div>

          <div className="about-section">
            <h2>About {startup.name}</h2>
            <div className="about-content">
              {formatDescription(startup.about)}
            </div>
            <p><strong>Tags:</strong> {startup.tags.join(', ')}</p>
          </div>
        </>
      ) : (
        <>
          <div className="detail-header">
            <h1 className="startup-name">{startup.name}</h1>
            <p className="subtitle">{startup.email} • {startup.phone}</p>
          </div>

          <div className="about-section">
            <h2>Investor Profile</h2>
            <p><strong>Type:</strong> {startup.investorType}</p>
            <p><strong>Range:</strong> {startup.investmentRange}</p>
            <p><strong>Preferred Sectors:</strong> {startup.preferredSectors.join(', ')}</p>
            <p><strong>Experience:</strong> {startup.investmentExperience}</p>
          </div>
        </>
      )}
    </div>
  )
}

export default StartupDetail
