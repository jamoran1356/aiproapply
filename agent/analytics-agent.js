const { DatabaseService } = require("../db/service")

class AnalyticsAgent {
  constructor() {
    this.db = new DatabaseService()
  }

  async analyzePerformance(userId, timeframe = "30d") {
    try {
      const endDate = new Date()
      const startDate = new Date()

      // Calculate start date based on timeframe
      switch (timeframe) {
        case "7d":
          startDate.setDate(endDate.getDate() - 7)
          break
        case "30d":
          startDate.setDate(endDate.getDate() - 30)
          break
        case "90d":
          startDate.setDate(endDate.getDate() - 90)
          break
        case "1y":
          startDate.setFullYear(endDate.getFullYear() - 1)
          break
        default:
          startDate.setDate(endDate.getDate() - 30)
      }

      // Fetch user data
      const proposals = await this.db.getUserProposals(userId, startDate, endDate)
      const applications = await this.db.getUserApplications(userId, startDate, endDate)
      const earnings = await this.db.getUserEarnings(userId, startDate, endDate)

      // Calculate metrics
      const metrics = this.calculateMetrics(proposals, applications, earnings)

      // Generate insights
      const insights = this.generateInsights(metrics, timeframe)

      // Platform performance
      const platformPerformance = this.analyzePlatformPerformance(proposals, applications)

      // Skill analysis
      const skillAnalysis = this.analyzeSkillPerformance(proposals, applications)

      // Trends
      const trends = this.calculateTrends(proposals, applications, earnings, timeframe)

      return {
        timeframe,
        period: { startDate, endDate },
        metrics,
        insights,
        platformPerformance,
        skillAnalysis,
        trends,
        generatedAt: new Date(),
      }
    } catch (error) {
      console.error("Error analyzing performance:", error)
      throw error
    }
  }

  calculateMetrics(proposals, applications, earnings) {
    const totalProposals = proposals.length
    const totalApplications = applications.length
    const approvedApplications = applications.filter((app) => app.status === "approved").length
    const rejectedApplications = applications.filter((app) => app.status === "rejected").length
    const pendingApplications = applications.filter((app) => app.status === "pending").length

    const successRate = totalApplications > 0 ? (approvedApplications / totalApplications) * 100 : 0
    const responseRate =
      totalApplications > 0 ? ((approvedApplications + rejectedApplications) / totalApplications) * 100 : 0

    const totalEarnings = earnings.reduce((sum, earning) => sum + earning.amount, 0)
    const avgProposalValue =
      proposals.length > 0
        ? proposals.reduce((sum, proposal) => {
            const value = this.extractBudgetValue(proposal.proposedPrice)
            return sum + (value || 0)
          }, 0) / proposals.length
        : 0

    return {
      totalProposals,
      totalApplications,
      approvedApplications,
      rejectedApplications,
      pendingApplications,
      successRate: Math.round(successRate * 100) / 100,
      responseRate: Math.round(responseRate * 100) / 100,
      totalEarnings,
      avgProposalValue: Math.round(avgProposalValue),
      avgEarningsPerProject: approvedApplications > 0 ? totalEarnings / approvedApplications : 0,
    }
  }

  generateInsights(metrics, timeframe) {
    const insights = []

    // Success rate insights
    if (metrics.successRate > 25) {
      insights.push({
        type: "positive",
        category: "success_rate",
        title: "Excellent Success Rate",
        message: `Your ${metrics.successRate}% success rate is above industry average (15-20%).`,
        recommendation: "Keep up the great work! Consider increasing your rates.",
      })
    } else if (metrics.successRate < 10) {
      insights.push({
        type: "warning",
        category: "success_rate",
        title: "Low Success Rate",
        message: `Your ${metrics.successRate}% success rate could be improved.`,
        recommendation: "Review your proposal templates and consider targeting jobs with better skill matches.",
      })
    }

    // Response rate insights
    if (metrics.responseRate < 30) {
      insights.push({
        type: "info",
        category: "response_rate",
        title: "Low Response Rate",
        message: `Only ${metrics.responseRate}% of your applications receive responses.`,
        recommendation: "Try personalizing your proposals more and applying to jobs with fewer competitors.",
      })
    }

    // Earnings insights
    if (metrics.totalEarnings > 0) {
      insights.push({
        type: "positive",
        category: "earnings",
        title: "Revenue Generated",
        message: `You've earned $${metrics.totalEarnings.toLocaleString()} in the last ${timeframe}.`,
        recommendation: "Great progress! Consider scaling up by taking on larger projects.",
      })
    }

    // Proposal volume insights
    if (metrics.totalProposals < 10 && timeframe === "30d") {
      insights.push({
        type: "warning",
        category: "activity",
        title: "Low Activity",
        message: "You sent fewer than 10 proposals this month.",
        recommendation: "Increase your application volume to improve your chances of landing projects.",
      })
    }

    return insights
  }

  analyzePlatformPerformance(proposals, applications) {
    const platforms = {}

    applications.forEach((app) => {
      const platform = app.platform
      if (!platforms[platform]) {
        platforms[platform] = {
          name: platform,
          totalApplications: 0,
          approvedApplications: 0,
          successRate: 0,
          avgResponseTime: 0,
        }
      }

      platforms[platform].totalApplications++
      if (app.status === "approved") {
        platforms[platform].approvedApplications++
      }
    })

    // Calculate success rates
    Object.values(platforms).forEach((platform) => {
      platform.successRate =
        platform.totalApplications > 0 ? (platform.approvedApplications / platform.totalApplications) * 100 : 0
    })

    return Object.values(platforms).sort((a, b) => b.successRate - a.successRate)
  }

  analyzeSkillPerformance(proposals, applications) {
    const skillStats = {}

    proposals.forEach((proposal) => {
      // Extract skills from proposal content or job requirements
      const skills = this.extractSkillsFromProposal(proposal)

      skills.forEach((skill) => {
        if (!skillStats[skill]) {
          skillStats[skill] = {
            skill,
            proposalCount: 0,
            successCount: 0,
            successRate: 0,
            avgValue: 0,
          }
        }

        skillStats[skill].proposalCount++

        // Check if this proposal led to a successful application
        const relatedApp = applications.find((app) => app.proposalId === proposal.id)
        if (relatedApp && relatedApp.status === "approved") {
          skillStats[skill].successCount++
        }

        // Add to average value calculation
        const value = this.extractBudgetValue(proposal.proposedPrice)
        if (value) {
          skillStats[skill].avgValue =
            (skillStats[skill].avgValue * (skillStats[skill].proposalCount - 1) + value) /
            skillStats[skill].proposalCount
        }
      })
    })

    // Calculate success rates
    Object.values(skillStats).forEach((stat) => {
      stat.successRate = stat.proposalCount > 0 ? (stat.successCount / stat.proposalCount) * 100 : 0
      stat.avgValue = Math.round(stat.avgValue)
    })

    return Object.values(skillStats)
      .filter((stat) => stat.proposalCount >= 2) // Only include skills with at least 2 proposals
      .sort((a, b) => b.successRate - a.successRate)
      .slice(0, 10) // Top 10 skills
  }

  calculateTrends(proposals, applications, earnings, timeframe) {
    // Group data by time periods
    const periods = this.groupByTimePeriod(proposals, applications, earnings, timeframe)

    const trends = {
      proposalTrend: this.calculateTrend(periods.map((p) => p.proposals)),
      successRateTrend: this.calculateTrend(periods.map((p) => p.successRate)),
      earningsTrend: this.calculateTrend(periods.map((p) => p.earnings)),
      periods,
    }

    return trends
  }

  groupByTimePeriod(proposals, applications, earnings, timeframe) {
    const periods = []
    const periodLength = timeframe === "7d" ? 1 : timeframe === "30d" ? 7 : 30 // days per period

    // Create time periods
    const endDate = new Date()
    const startDate = new Date()

    switch (timeframe) {
      case "7d":
        startDate.setDate(endDate.getDate() - 7)
        break
      case "30d":
        startDate.setDate(endDate.getDate() - 30)
        break
      case "90d":
        startDate.setDate(endDate.getDate() - 90)
        break
      case "1y":
        startDate.setFullYear(endDate.getFullYear() - 1)
        break
    }

    const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))
    const numPeriods = Math.ceil(totalDays / periodLength)

    for (let i = 0; i < numPeriods; i++) {
      const periodStart = new Date(startDate)
      periodStart.setDate(startDate.getDate() + i * periodLength)

      const periodEnd = new Date(periodStart)
      periodEnd.setDate(periodStart.getDate() + periodLength - 1)

      if (periodEnd > endDate) periodEnd.setTime(endDate.getTime())

      const periodProposals = proposals.filter((p) => {
        const date = new Date(p.createdAt)
        return date >= periodStart && date <= periodEnd
      })

      const periodApplications = applications.filter((a) => {
        const date = new Date(a.submittedAt)
        return date >= periodStart && date <= periodEnd
      })

      const periodEarnings = earnings.filter((e) => {
        const date = new Date(e.date)
        return date >= periodStart && date <= periodEnd
      })

      const approvedApps = periodApplications.filter((a) => a.status === "approved").length
      const successRate = periodApplications.length > 0 ? (approvedApps / periodApplications.length) * 100 : 0

      periods.push({
        startDate: periodStart,
        endDate: periodEnd,
        proposals: periodProposals.length,
        applications: periodApplications.length,
        approved: approvedApps,
        successRate,
        earnings: periodEarnings.reduce((sum, e) => sum + e.amount, 0),
      })
    }

    return periods
  }

  calculateTrend(values) {
    if (values.length < 2) return "stable"

    const recent = values.slice(-3) // Last 3 periods
    const earlier = values.slice(0, -3) // Earlier periods

    if (recent.length === 0 || earlier.length === 0) return "stable"

    const recentAvg = recent.reduce((sum, val) => sum + val, 0) / recent.length
    const earlierAvg = earlier.reduce((sum, val) => sum + val, 0) / earlier.length

    const change = ((recentAvg - earlierAvg) / Math.max(earlierAvg, 1)) * 100

    if (change > 10) return "increasing"
    if (change < -10) return "decreasing"
    return "stable"
  }

  extractBudgetValue(budgetString) {
    if (!budgetString) return null
    const match = budgetString.match(/\$(\d+(?:,\d+)?)/)
    return match ? Number.parseInt(match[1].replace(",", "")) : null
  }

  extractSkillsFromProposal(proposal) {
    // Simple skill extraction - in real implementation, use NLP
    const commonSkills = [
      "React",
      "Node.js",
      "Python",
      "JavaScript",
      "TypeScript",
      "Vue.js",
      "Angular",
      "PHP",
      "Laravel",
      "WordPress",
      "Shopify",
      "AWS",
      "Docker",
      "MongoDB",
      "PostgreSQL",
      "MySQL",
      "UI/UX",
      "Figma",
      "Photoshop",
      "Illustrator",
      "SEO",
      "Google Ads",
      "Facebook Ads",
      "Content Marketing",
      "Social Media",
    ]

    const content = (proposal.content || "").toLowerCase()
    return commonSkills.filter((skill) => content.includes(skill.toLowerCase()))
  }
}

module.exports = { AnalyticsAgent }
