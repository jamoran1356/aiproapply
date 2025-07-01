const express = require("express")
const cors = require("cors")
const axios = require("axios")
const { DatabaseService } = require("../db/service")

const app = express()
const PORT = process.env.API_PORT || 3002

app.use(cors())
app.use(express.json())

const db = new DatabaseService()

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() })
})

// User management endpoints
app.get("/api/users/:userId/profile", async (req, res) => {
  try {
    const { userId } = req.params
    const profile = await db.getUserProfile(userId)
    res.json({ success: true, profile })
  } catch (error) {
    console.error("Get profile error:", error)
    res.status(500).json({ success: false, error: error.message })
  }
})

app.put("/api/users/:userId/profile", async (req, res) => {
  try {
    const { userId } = req.params
    const profile = await db.updateUserProfile(userId, req.body)
    res.json({ success: true, profile })
  } catch (error) {
    console.error("Update profile error:", error)
    res.status(500).json({ success: false, error: error.message })
  }
})

// Proposals endpoints
app.get("/api/users/:userId/proposals", async (req, res) => {
  try {
    const { userId } = req.params
    const { startDate, endDate, limit = 50, offset = 0 } = req.query

    const start = startDate ? new Date(startDate) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    const end = endDate ? new Date(endDate) : new Date()

    const proposals = await db.getUserProposals(userId, start, end)
    res.json({ success: true, proposals: proposals.slice(offset, offset + limit) })
  } catch (error) {
    console.error("Get proposals error:", error)
    res.status(500).json({ success: false, error: error.message })
  }
})

app.post("/api/users/:userId/proposals", async (req, res) => {
  try {
    const { userId } = req.params
    const proposalData = { ...req.body, userId }

    // Call agent service to generate proposal
    const agentResponse = await axios.post(`http://localhost:3001/agent/generate-proposal`, {
      userId,
      jobData: proposalData.jobData,
      userProfile: proposalData.userProfile,
    })

    res.json(agentResponse.data)
  } catch (error) {
    console.error("Create proposal error:", error)
    res.status(500).json({ success: false, error: error.message })
  }
})

// Applications endpoints
app.get("/api/users/:userId/applications", async (req, res) => {
  try {
    const { userId } = req.params
    const { startDate, endDate } = req.query

    const start = startDate ? new Date(startDate) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    const end = endDate ? new Date(endDate) : new Date()

    const applications = await db.getUserApplications(userId, start, end)
    res.json({ success: true, applications })
  } catch (error) {
    console.error("Get applications error:", error)
    res.status(500).json({ success: false, error: error.message })
  }
})

// Analytics endpoints
app.get("/api/users/:userId/analytics", async (req, res) => {
  try {
    const { userId } = req.params
    const { timeframe = "30d" } = req.query

    // Call analytics agent
    const analyticsResponse = await axios.post(`http://localhost:3001/agent/analyze-performance`, {
      userId,
      timeframe,
    })

    res.json(analyticsResponse.data)
  } catch (error) {
    console.error("Get analytics error:", error)
    res.status(500).json({ success: false, error: error.message })
  }
})

// Job search endpoints
app.post("/api/users/:userId/search-jobs", async (req, res) => {
  try {
    const { userId } = req.params
    const preferences = req.body

    // Call search agent
    const searchResponse = await axios.post(`http://localhost:3001/agent/search-jobs`, {
      userId,
      preferences,
    })

    res.json(searchResponse.data)
  } catch (error) {
    console.error("Search jobs error:", error)
    res.status(500).json({ success: false, error: error.message })
  }
})

// Auto-apply endpoints
app.post("/api/users/:userId/auto-apply", async (req, res) => {
  try {
    const { userId } = req.params

    // Call auto-apply agent
    const autoApplyResponse = await axios.post(`http://localhost:3001/agent/auto-apply`, {
      userId,
    })

    res.json(autoApplyResponse.data)
  } catch (error) {
    console.error("Auto-apply error:", error)
    res.status(500).json({ success: false, error: error.message })
  }
})

// Preferences endpoints
app.get("/api/users/:userId/preferences", async (req, res) => {
  try {
    const { userId } = req.params
    const preferences = await db.getUserPreferences(userId)
    res.json({ success: true, preferences })
  } catch (error) {
    console.error("Get preferences error:", error)
    res.status(500).json({ success: false, error: error.message })
  }
})

app.put("/api/users/:userId/preferences", async (req, res) => {
  try {
    const { userId } = req.params
    const preferences = await db.updateUserPreferences(userId, req.body)
    res.json({ success: true, preferences })
  } catch (error) {
    console.error("Update preferences error:", error)
    res.status(500).json({ success: false, error: error.message })
  }
})

// Admin endpoints
app.get("/api/admin/users", async (req, res) => {
  try {
    const { limit = 100, offset = 0 } = req.query
    const users = await db.getAllUsers(Number.parseInt(limit), Number.parseInt(offset))
    res.json({ success: true, users })
  } catch (error) {
    console.error("Get admin users error:", error)
    res.status(500).json({ success: false, error: error.message })
  }
})

app.get("/api/admin/stats", async (req, res) => {
  try {
    const userStats = await db.getUserStats()
    const revenueStats = await db.getRevenueStats()

    res.json({
      success: true,
      stats: {
        ...userStats,
        ...revenueStats,
      },
    })
  } catch (error) {
    console.error("Get admin stats error:", error)
    res.status(500).json({ success: false, error: error.message })
  }
})

app.listen(PORT, () => {
  console.log(`🚀 API service running on port ${PORT}`)
})

module.exports = app
