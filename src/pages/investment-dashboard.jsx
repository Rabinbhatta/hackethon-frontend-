"use client"

import { useState, useEffect } from "react"
import { FaDollarSign, FaAward, FaRobot } from "react-icons/fa"
import { IoIosTrendingUp } from "react-icons/io"
import { FiTarget } from "react-icons/fi"
import { MdEnergySavingsLeaf, MdHealthAndSafety } from "react-icons/md"
import '../pages/css/investment-dasboard.css';

const InvestmentDashboard = () => {
  const [activeTab, setActiveTab] = useState("Portfolio")
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/investor/getvendordashboardata/684e43dfdeb81748e303536f",
        )
        const result = await response.json()
        setDashboardData(result.data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (loading) {
    return <div className="dashboard-container">Loading...</div>
  }

  if (!dashboardData) {
    return <div className="dashboard-container">Error loading data</div>
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const metrics = [
    {
      label: "Total Invested",
      value: formatCurrency(dashboardData.totalInvested),
      change: `${dashboardData.totalInvestedChange.percentage} from last month`,
      icon: FaDollarSign,
      positive: true,
    },
    {
      label: "Portfolio Value",
      value: formatCurrency(dashboardData.portfolioValue),
      change: `${dashboardData.portfolioValueChange.percentage} from last month`,
      icon: IoIosTrendingUp,
      positive: true,
    },
    {
      label: "Active Investments",
      value: dashboardData.activeInvestments.count.toString(),
      change: `Across ${dashboardData.activeInvestments.sectorsCount} sectors`,
      icon: FiTarget,
      positive: null,
    },
    {
      label: "Exits",
      value: dashboardData.exits.toString(),
      change: dashboardData.exitsPeriod,
      icon: FaAward,
      positive: null,
    },
  ]

  const getIconForStartup = (startupName) => {
    if (startupName.toLowerCase().includes("health")) return MdHealthAndSafety
    if (startupName.toLowerCase().includes("green") || startupName.toLowerCase().includes("energy"))
      return MdEnergySavingsLeaf
    return FaRobot
  }

  const getTypeForStartup = (startupName) => {
    if (startupName.toLowerCase().includes("health")) return "health"
    if (startupName.toLowerCase().includes("green") || startupName.toLowerCase().includes("energy")) return "energy"
    return "tech"
  }

  const holdings = dashboardData.topHoldings.map((holding) => ({
    name: holding.startupName || holding._doc?.startupName,
    amount: formatCurrency(holding.amount || holding._doc?.amount),
    performance: `+${holding.growth || holding._doc?.growth}`,
    icon: getIconForStartup(holding.startupName || holding._doc?.startupName),
    type: getTypeForStartup(holding.startupName || holding._doc?.startupName),
  }))

  const getSectorType = (sectorName) => {
    switch (sectorName.toLowerCase()) {
      case "tech":
        return "ai"
      case "healthcare":
        return "health"
      case "cleanenergy":
        return "clean"
      case "other":
        return "other"
      default:
        return "fintech"
    }
  }

  const sectors = Object.entries(dashboardData.sectorAllocation).map(([name, data]) => ({
    name: name === "CleanEnergy" ? "CleanTech" : name,
    amount: formatCurrency((dashboardData.portfolioValue * data.percentage) / 100),
    percentage: data.percentage,
    type: getSectorType(name),
  }))

  

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Investment Dashboard</h1>
        <p className="dashboard-subtitle">Welcome back, John. Here's your portfolio overview.</p>
      </div>

      <div className="metrics-grid">
        {metrics.map((metric, index) => {
          const Icon = metric.icon
          return (
            <div key={index} className="metric-card">
              <div className="metric-header">
                <span className="metric-label">{metric.label}</span>
                <Icon className="metric-icon" />
              </div>
              <h2 className="metric-value">{metric.value}</h2>
              <p className={`metric-change ${metric.positive ? "positive" : ""}`}>{metric.change}</p>
            </div>
          )
        })}
      </div>


      <div className="content-grid">
        <div className="content-card">
          <div className="card-header">
            <h3 className="card-title">Top Holdings</h3>
            <a href="#" className="view-all-link">
              View All Investments
            </a>
          </div>
          <p className="card-subtitle">Your largest investments by value</p>

          <div className="holdings-list">
            {holdings.map((holding, index) => {
              const HoldingIcon = holding.icon
              return (
                <div key={index} className="holding-item">
                  <div className="holding-info">
                    <div className={`holding-icon ${holding.type}`}>
                      <HoldingIcon />
                    </div>
                    <div className="holding-details">
                      <h4>{holding.name}</h4>
                      <p>{holding.amount}</p>
                    </div>
                  </div>
                  <div className="holding-performance">
                    <span className="performance-badge positive">{holding.performance}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="content-card">
          <div className="card-header">
            <h3 className="card-title">Sector Allocation</h3>
          </div>
          <p className="card-subtitle">Investment distribution by industry</p>

          <div className="sector-list">
            {sectors.map((sector, index) => (
              <div key={index} className="sector-item">
                <div className="sector-info">
                  <h4 className="sector-name">{sector.name}</h4>
                  <div className="sector-bar">
                    <div className={`sector-progress ${sector.type}`} style={{ width: `${sector.percentage}%` }}></div>
                  </div>
                </div>
                <span className="sector-amount">{sector.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default InvestmentDashboard
