"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Search, Filter, Star, MapPin, Users, Target, TrendingUp } from "lucide-react"

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
      console.log("Raw backend result:", result)

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
              className="w-12 h-12 rounded-full object-cover"
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
      (selectedCategory === "All" || s.category.includes(selectedCategory)),
  )

  return (
    <div className="space-y-8">
      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search startups..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              disabled={loading}
            />
          </div>

          <div className="flex gap-4">
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all cursor-pointer"
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
              <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Featured Startups Header */}
      <div className="flex items-center gap-3">
        <Star className="w-6 h-6 text-yellow-500 fill-current" />
        <h2 className="text-2xl font-bold text-gray-900">Featured Startups</h2>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Loading startups...</span>
        </div>
      ) : (
        /* Startup Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStartups.length > 0 ? (
            filteredStartups.map((startup, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
              >
                {/* Card Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">{startup.icon}</div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">{startup.name}</h3>
                    </div>
                  </div>
                  <Star className="w-5 h-5 text-yellow-400 fill-current flex-shrink-0" />
                </div>

                {/* Category Badges */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {startup.category.map((cat, i) => (
                    <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full">
                      {cat}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {startup.description.split(" ").slice(0, 20).join(" ")}
                  {startup.description.split(" ").length > 20 && "..."}
                </p>

                {/* Metrics */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Target className="w-4 h-4" />
                      <span>Raised / Target</span>
                    </div>
                    <span className="font-semibold text-gray-900">
                      {startup.raised} / {startup.target}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <TrendingUp className="w-4 h-4" />
                      <span>Investors</span>
                    </div>
                    <span className="font-semibold text-gray-900">10</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>Team Size</span>
                    </div>
                    <span className="font-semibold text-gray-900">{startup.teamSize}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>Location</span>
                    </div>
                    <span className="font-semibold text-gray-900">{startup.location}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {startup.tags.map((tag, i) => (
                    <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* View Details Button */}
                <Link to={`/startups/${startup.id}`} className="block">
                  <button className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200">
                    View Details
                  </button>
                </Link>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-400 mb-2">
                <Search className="w-12 h-12 mx-auto" />
              </div>
              <p className="text-gray-600">No startups found matching your criteria.</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function DiscoverStartups() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Discover Startups</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Explore high-potential startups seeking investment</p>
        </div>

        <FeaturedStartups />
      </div>
    </div>
  )
}

export default DiscoverStartups
