const express = require("express")
const cors = require("cors")
const { ProposalAgent } = require("./proposal-agent")
const { SearchAgent } = require("./search-agent")
const { AnalyticsAgent } = require("./analytics-agent")
const { NotificationService } = require("../notification/service")

const app = express()
const PORT = process.env.AGENT_PORT || 3001

app.use(cors())
app.use(express.json())

// Initialize agents
const proposalAgent = new ProposalAgent()
const searchAgent = new SearchAgent()
const analyticsAgent = new AnalyticsAgent()
const notificationService = new NotificationService()

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() })
})

// Agent endpoints
app.post("/agent/search-jobs", async (req, res) => {
  try {
    const { userId, preferences } = req.body
    const jobs = await searchAgent.searchJobs(userId, preferences)
    res.json({ success: true, jobs })
  } catch (error) {
    console.error("Search jobs error:", error)
    res.status(500).json({ success: false, error: error.message })
  }
})

app.post("/agent/generate-proposal", async (req, res) => {
  try {
    const { userId, jobData, userProfile } = req.body
    const proposal = await proposalAgent.generateProposal(jobData, userProfile)

    // Send notification
    await notificationService.sendNotification(userId, {
      type: "proposal_generated",
      title: "Nueva propuesta generada",
      message: `Se ha generado una propuesta para: ${jobData.title}`,
      data: { proposalId: proposal.id, jobId: jobData.id },
    })

    res.json({ success: true, proposal })
  } catch (error) {
    console.error("Generate proposal error:", error)
    res.status(500).json({ success: false, error: error.message })
  }
})

app.post("/agent/analyze-performance", async (req, res) => {
  try {
    const { userId, timeframe } = req.body
    const analytics = await analyticsAgent.analyzePerformance(userId, timeframe)
    res.json({ success: true, analytics })
  } catch (error) {
    console.error("Analyze performance error:", error)
    res.status(500).json({ success: false, error: error.message })
  }
})

app.post("/agent/auto-apply", async (req, res) => {
  try {
    const { userId } = req.body
    const results = await searchAgent.autoApplyJobs(userId)

    // Send notification with results
    await notificationService.sendNotification(userId, {
      type: "auto_apply_complete",
      title: "Aplicación automática completada",
      message: `Se enviaron ${results.applied} propuestas automáticamente`,
      data: results,
    })

    res.json({ success: true, results })
  } catch (error) {
    console.error("Auto apply error:", error)
    res.status(500).json({ success: false, error: error.message })
  }
})

app.listen(PORT, () => {
  console.log(`🤖 Agent service running on port ${PORT}`)
})

module.exports = app
