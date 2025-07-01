const axios = require("axios")
const { DatabaseService } = require("../db/service")

class SearchAgent {
  constructor() {
    this.db = new DatabaseService()
    this.platforms = {
      upwork: {
        baseUrl: "https://www.upwork.com/api",
        searchEndpoint: "/profiles/v1/search/jobs",
      },
      fiverr: {
        baseUrl: "https://api.fiverr.com",
        searchEndpoint: "/v1/search/gigs",
      },
      freelancer: {
        baseUrl: "https://www.freelancer.com/api",
        searchEndpoint: "/projects/0.1/projects",
      },
    }
  }

  async searchJobs(userId, preferences = {}) {
    try {
      const userProfile = await this.db.getUserProfile(userId)
      if (!userProfile) {
        throw new Error("User profile not found")
      }

      const searchParams = {
        keywords: preferences.keywords || userProfile.skills,
        minBudget: preferences.minBudget || userProfile.minBudget,
        maxBudget: preferences.maxBudget || userProfile.maxBudget,
        platforms: preferences.platforms || ["upwork", "fiverr", "freelancer"],
        location: preferences.location || "remote",
        experienceLevel: preferences.experienceLevel || "intermediate",
      }

      const allJobs = []

      // Search across all enabled platforms
      for (const platform of searchParams.platforms) {
        try {
          const jobs = await this.searchPlatform(platform, searchParams)
          allJobs.push(...jobs.map((job) => ({ ...job, platform })))
        } catch (error) {
          console.error(`Error searching ${platform}:`, error.message)
        }
      }

      // Filter and rank jobs
      const filteredJobs = this.filterJobs(allJobs, userProfile, preferences)
      const rankedJobs = this.rankJobs(filteredJobs, userProfile)

      // Save search results
      await this.db.saveSearchResults(userId, {
        query: searchParams,
        results: rankedJobs,
        timestamp: new Date(),
      })

      return rankedJobs.slice(0, preferences.limit || 50)
    } catch (error) {
      console.error("Error searching jobs:", error)
      throw error
    }
  }

  async searchPlatform(platform, params) {
    // Mock implementation - in real scenario, integrate with actual platform APIs
    const mockJobs = this.generateMockJobs(platform, params)
    return mockJobs
  }

  generateMockJobs(platform, params) {
    const jobTemplates = [
      {
        title: "Full Stack Web Development",
        description:
          "Looking for an experienced full stack developer to build a modern web application using React and Node.js. Must have experience with databases and cloud deployment.",
        budget: "$3,000 - $8,000",
        skills: ["React", "Node.js", "MongoDB", "AWS"],
        client: {
          name: "TechStartup Inc.",
          rating: 4.8,
          reviews: 23,
          verified: true,
        },
        postedDate: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
        proposals: Math.floor(Math.random() * 20) + 5,
        duration: "2-3 months",
      },
      {
        title: "Mobile App UI/UX Design",
        description:
          "Need a talented designer to create modern, user-friendly interfaces for our fitness mobile app. Experience with Figma and mobile design patterns required.",
        budget: "$1,500 - $3,500",
        skills: ["UI/UX Design", "Figma", "Mobile Design", "Prototyping"],
        client: {
          name: "FitLife Solutions",
          rating: 4.9,
          reviews: 45,
          verified: true,
        },
        postedDate: new Date(Date.now() - Math.random() * 5 * 24 * 60 * 60 * 1000),
        proposals: Math.floor(Math.random() * 15) + 3,
        duration: "4-6 weeks",
      },
      {
        title: "Digital Marketing Campaign",
        description:
          "B2B SaaS company seeking digital marketing expert for comprehensive campaign including SEO, PPC, content marketing, and social media management.",
        budget: "$2,000 - $5,000",
        skills: ["Digital Marketing", "SEO", "Google Ads", "Content Marketing"],
        client: {
          name: "CloudTech Corp",
          rating: 4.7,
          reviews: 67,
          verified: true,
        },
        postedDate: new Date(Date.now() - Math.random() * 3 * 24 * 60 * 60 * 1000),
        proposals: Math.floor(Math.random() * 25) + 8,
        duration: "3-4 months",
      },
    ]

    // Generate random variations
    return jobTemplates.map((template, index) => ({
      id: `${platform}_${Date.now()}_${index}`,
      ...template,
      platform,
      url: `https://${platform}.com/jobs/${template.title.toLowerCase().replace(/\s+/g, "-")}`,
    }))
  }

  filterJobs(jobs, userProfile, preferences) {
    return jobs.filter((job) => {
      // Budget filter
      if (preferences.minBudget || preferences.maxBudget) {
        const budgetMatch = job.budget?.match(/\$(\d+(?:,\d+)?)\s*-\s*\$(\d+(?:,\d+)?)/)
        if (budgetMatch) {
          const jobMinBudget = Number.parseInt(budgetMatch[1].replace(",", ""))
          const jobMaxBudget = Number.parseInt(budgetMatch[2].replace(",", ""))

          if (preferences.minBudget && jobMaxBudget < preferences.minBudget) return false
          if (preferences.maxBudget && jobMinBudget > preferences.maxBudget) return false
        }
      }

      // Skill matching
      const userSkills =
        userProfile.skills
          ?.toLowerCase()
          .split(",")
          .map((s) => s.trim()) || []
      const jobSkills = job.skills?.map((s) => s.toLowerCase()) || []
      const hasMatchingSkills = jobSkills.some((skill) =>
        userSkills.some((userSkill) => userSkill.includes(skill) || skill.includes(userSkill)),
      )

      if (!hasMatchingSkills && userSkills.length > 0) return false

      // Competition filter
      if (preferences.maxCompetition && job.proposals > preferences.maxCompetition) return false

      // Client rating filter
      if (preferences.minClientRating && job.client.rating < preferences.minClientRating) return false

      return true
    })
  }

  rankJobs(jobs, userProfile) {
    return jobs
      .map((job) => {
        let score = 0

        // Skill matching score
        const userSkills =
          userProfile.skills
            ?.toLowerCase()
            .split(",")
            .map((s) => s.trim()) || []
        const jobSkills = job.skills?.map((s) => s.toLowerCase()) || []
        const skillMatches = jobSkills.filter((skill) =>
          userSkills.some((userSkill) => userSkill.includes(skill) || skill.includes(userSkill)),
        ).length
        score += (skillMatches / Math.max(jobSkills.length, 1)) * 40

        // Budget attractiveness
        const budgetMatch = job.budget?.match(/\$(\d+(?:,\d+)?)\s*-\s*\$(\d+(?:,\d+)?)/)
        if (budgetMatch) {
          const maxBudget = Number.parseInt(budgetMatch[2].replace(",", ""))
          if (maxBudget >= 5000) score += 20
          else if (maxBudget >= 2000) score += 15
          else if (maxBudget >= 1000) score += 10
        }

        // Competition factor (lower competition = higher score)
        if (job.proposals <= 5) score += 20
        else if (job.proposals <= 10) score += 15
        else if (job.proposals <= 20) score += 10

        // Client quality
        if (job.client.verified) score += 10
        if (job.client.rating >= 4.8) score += 10
        else if (job.client.rating >= 4.5) score += 5

        // Recency bonus
        const daysSincePosted = (Date.now() - new Date(job.postedDate).getTime()) / (1000 * 60 * 60 * 24)
        if (daysSincePosted <= 1) score += 15
        else if (daysSincePosted <= 3) score += 10
        else if (daysSincePosted <= 7) score += 5

        return { ...job, score: Math.round(score) }
      })
      .sort((a, b) => b.score - a.score)
  }

  async autoApplyJobs(userId) {
    try {
      const userProfile = await this.db.getUserProfile(userId)
      const preferences = await this.db.getUserPreferences(userId)

      if (!preferences.autoApplyEnabled) {
        throw new Error("Auto-apply is not enabled for this user")
      }

      // Search for jobs
      const jobs = await this.searchJobs(userId, {
        ...preferences,
        limit: preferences.maxDailyApplications || 5,
      })

      const results = {
        searched: jobs.length,
        applied: 0,
        skipped: 0,
        errors: [],
      }

      // Apply to top-ranked jobs
      for (const job of jobs.slice(0, preferences.maxDailyApplications || 5)) {
        try {
          if (job.score >= (preferences.minJobScore || 60)) {
            await this.applyToJob(userId, job, userProfile)
            results.applied++
          } else {
            results.skipped++
          }
        } catch (error) {
          console.error(`Error applying to job ${job.id}:`, error)
          results.errors.push({ jobId: job.id, error: error.message })
        }
      }

      return results
    } catch (error) {
      console.error("Error in auto-apply:", error)
      throw error
    }
  }

  async applyToJob(userId, job, userProfile) {
    // Generate proposal using ProposalAgent
    const { ProposalAgent } = require("./proposal-agent")
    const proposalAgent = new ProposalAgent()

    const proposal = await proposalAgent.generateProposal(job, userProfile)

    // In a real implementation, this would submit to the actual platform
    // For now, we'll just save it as a pending application
    await this.db.saveApplication({
      userId,
      jobId: job.id,
      proposalId: proposal.id,
      platform: job.platform,
      status: "submitted",
      submittedAt: new Date(),
    })

    return proposal
  }
}

module.exports = { SearchAgent }
