"use client"

import { useState } from "react"
import {
  FiShare2,
  FiEdit3,
  FiEye,
  FiDownload,
  FiHeart,
  FiTrendingUp,
  FiArrowRight,
  FiCornerUpLeft,
} from "react-icons/fi"
import "../pages/CSS/fundraiser-dashboard.css"

const FundraisingDashboard = () => {
  const [activeTab, setActiveTab] = useState("Investors")

  const tabs = ["Investors", "Analytics", "Documents", "Updates", "Settings"]

  const secondaryMetrics = [
    {
      title: "Profile Views",
      value: "1,247",
      change: "+12% from last week",
      icon: FiEye,
    },
    {
      title: "Document Downloads",
      value: "89",
      change: "+8% from last week",
      icon: FiDownload,
    },
    {
      title: "Investor Interest",
      value: "156",
      change: "+15% from last week",
      icon: FiHeart,
    },
    {
      title: "Conversion Rate",
      value: "28.6%",
      change: "+7% from last week",
      icon: FiTrendingUp,
    },
  ]

  const recentActivity = [
    {
      name: "Sarah Johnson",
      time: "2 hours ago",
      amount: "NRS75,000",
      status: "Interested",
      type: "interested",
    },
    {
      name: "Michael Chen",
      time: "1 day ago",
      amount: "NRS100,000",
      status: "Reviewed",
      type: "reviewed",
    },
    {
      name: "Emily Rodriguez",
      time: "2 days ago",
      amount: "NRS50,000",
      status: "Interested",
      type: "interested",
    },
    {
      name: "David Park",
      time: "3 days ago",
      amount: "NRS125,000",
      status: "Reviewed",
      type: "reviewed",
    },
  ]

  const pipeline = [
    {
      stage: "Interested",
      description: "Initial interest expressed",
      count: 89,
      type: "interested",
    },
    {
      stage: "Due Diligence",
      description: "Reviewing documents",
      count: 23,
      type: "diligence",
    },
    {
      stage: "Term Sheet",
      description: "Negotiating terms",
      count: 8,
      type: "term",
    },
    {
      stage: "Committed",
      description: "Investment confirmed",
      count: 45,
      type: "committed",
    },
  ]

  const communications = [
    {
      sender: "Sarah Johnson",
      avatar: "SJ",
      time: "2 hours ago",
      message: "Could you provide more details about your customer acquisition strategy?",
      status: "unread",
    },
    {
      sender: "Michael Chen",
      avatar: "MC",
      time: "1 day ago",
      message: "I'm interested in participating in this round. When can we schedule a call?",
      status: "read",
    },
    {
      sender: "Emily Rodriguez",
      avatar: "ER",
      time: "2 days ago",
      message: "Thank you for the detailed financial projections. Very impressive growth!",
      status: "read",
    },
    {
      sender: "David Park",
      avatar: "DP",
      time: "3 days ago",
      message: "What's your timeline for alternative scenarios?",
      status: "read",
    },
  ]

  return (
    <div className="fundraising-container">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Fundraising Dashboard</h1>
          <p>Manage your Series A campaign and track investor activity</p>
        </div>
        <div className="header-actions">
          <button className="action-button">
            <FiShare2 size={16} />
            Share Campaign
          </button>
          <button className="action-button primary">
            <FiEdit3 size={16} />
            Edit Profile
          </button>
        </div>
      </div>

      <div className="company-section">
        <div className="company-header">
          <div className="company-info">
            <div className="company-logo">TF</div>
            <div className="company-details">
              <h2>TechFlow AI</h2>
              <p>Series A • Active Campaign</p>
            </div>
          </div>
          <div className="campaign-status">
            <span className="status-badge">Live</span>
          </div>
        </div>

        <div className="metrics-row">
          <div className="metric-item">
            <h3 className="metric-value">NRS2.5M</h3>
            <p className="metric-label">Raised</p>
          </div>
          <div className="metric-item">
            <h3 className="metric-value">NRS5.0M</h3>
            <p className="metric-label">Target</p>
          </div>
          <div className="metric-item">
            <h3 className="metric-value">45</h3>
            <p className="metric-label">Investors</p>
          </div>
          <div className="metric-item">
            <h3 className="metric-value">22</h3>
            <p className="metric-label">Days Left</p>
          </div>
          <div className="metric-item">
            <h3 className="metric-value">50%</h3>
            <p className="metric-label">Complete</p>
          </div>
        </div>

        <div className="progress-section">
          <div className="progress-header">
            <span className="progress-label">Funding Progress</span>
            <span className="progress-percentage">50% of target</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "50%" }}></div>
          </div>
        </div>
      </div>

      <div className="secondary-metrics">
        {secondaryMetrics.map((metric, index) => {
          const IconComponent = metric.icon
          return (
            <div key={index} className="secondary-metric-card">
              <div className="metric-header">
                <span className="metric-title">{metric.title}</span>
                <IconComponent className="metric-icon" size={20} />
              </div>
              <h3 className="metric-main-value">{metric.value}</h3>
              <p className="metric-change">{metric.change}</p>
            </div>
          )
        })}
      </div>

      <div className="tabs-container">
        <div className="tabs-list">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`tab-button ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="content-layout">
        <div className="main-content">
          <div className="content-card">
            <div className="card-header">
              <h3 className="card-title">Recent Investor Activity</h3>
            </div>
            <p className="card-subtitle">Latest fundraising and investment interest</p>

            <div className="activity-list">
              {recentActivity.map((activity, index) => (
                <div key={index} className="activity-item">
                  <div className="activity-info">
                    <h4>{activity.name}</h4>
                    <p>{activity.time}</p>
                  </div>
                  <div className="activity-amount">
                    <span className="amount-value">{activity.amount}</span>
                    <span className={`amount-badge ${activity.type}`}>{activity.status}</span>
                  </div>
                </div>
              ))}
            </div>

            <a href="#" className="view-all-link">
              View All Investors
              <FiArrowRight size={14} />
            </a>
          </div>
        </div>

        <div className="content-card">
          <div className="card-header">
            <h3 className="card-title">Investor Pipeline</h3>
          </div>
          <p className="card-subtitle">Track investor engagement stages</p>

          <div className="pipeline-list">
            {pipeline.map((stage, index) => (
              <div key={index} className="pipeline-item">
                <div className="pipeline-info">
                  <h4>{stage.stage}</h4>
                  <p>{stage.description}</p>
                </div>
                <span className={`pipeline-count ${stage.type}`}>{stage.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="communications-section">
        <div className="card-header">
          <h3 className="card-title">Recent Communications</h3>
        </div>
        <p className="card-subtitle">Messages and inquiries from investors</p>

        <div className="communication-list">
          {communications.map((comm, index) => (
            <div key={index} className="communication-item">
              <div className="communication-header">
                <div className="sender-info">
                  <div className="sender-avatar">{comm.avatar}</div>
                  <span className="sender-name">{comm.sender}</span>
                </div>
                <div className="message-time">
                  <span>{comm.time}</span>
                  <span className={`message-badge ${comm.status}`}>{comm.status === "unread" ? "Unread" : "Read"}</span>
                </div>
              </div>
              <p className="message-content">{comm.message}</p>
              <button className="reply-button">
                <FiCornerUpLeft size={14} />
                Reply
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FundraisingDashboard
