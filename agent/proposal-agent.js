const { OpenAI } = require("openai")
const { DatabaseService } = require("../db/service")

class ProposalAgent {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
    this.db = new DatabaseService()
  }

  async generateProposal(jobData, userProfile) {
    try {
      // Analyze job requirements
      const jobAnalysis = await this.analyzeJobRequirements(jobData)

      // Generate personalized proposal
      const proposalText = await this.generateProposalText(jobData, userProfile, jobAnalysis)

      // Calculate success probability
      const successProbability = await this.calculateSuccessProbability(jobData, userProfile)

      // Save proposal to database
      const proposal = await this.db.saveProposal({
        userId: userProfile.id,
        jobId: jobData.id,
        title: jobData.title,
        platform: jobData.platform,
        client: jobData.client,
        budget: jobData.budget,
        proposedPrice: this.calculateOptimalPrice(jobData, userProfile),
        content: proposalText,
        successProbability,
        status: "draft",
        createdAt: new Date(),
      })

      return proposal
    } catch (error) {
      console.error("Error generating proposal:", error)
      throw error
    }
  }

  async analyzeJobRequirements(jobData) {
    const prompt = `
    Analyze the following job posting and extract key requirements:
    
    Title: ${jobData.title}
    Description: ${jobData.description}
    Budget: ${jobData.budget}
    Skills: ${jobData.skills?.join(", ") || "Not specified"}
    
    Please provide:
    1. Technical requirements
    2. Experience level needed
    3. Project complexity (1-10)
    4. Key skills required
    5. Client expectations
    
    Respond in JSON format.
    `

    const response = await this.openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
    })

    try {
      return JSON.parse(response.choices[0].message.content)
    } catch (error) {
      console.error("Error parsing job analysis:", error)
      return {
        technicalRequirements: [],
        experienceLevel: "intermediate",
        complexity: 5,
        keySkills: [],
        clientExpectations: "Standard project delivery",
      }
    }
  }

  async generateProposalText(jobData, userProfile, jobAnalysis) {
    const prompt = `
    Generate a personalized, professional proposal for this freelance job:
    
    Job Details:
    - Title: ${jobData.title}
    - Description: ${jobData.description}
    - Budget: ${jobData.budget}
    - Platform: ${jobData.platform}
    
    Freelancer Profile:
    - Name: ${userProfile.name}
    - Title: ${userProfile.title}
    - Experience: ${userProfile.experience} years
    - Skills: ${userProfile.skills}
    - Description: ${userProfile.description}
    
    Job Analysis:
    - Complexity: ${jobAnalysis.complexity}/10
    - Key Skills: ${jobAnalysis.keySkills?.join(", ")}
    - Technical Requirements: ${jobAnalysis.technicalRequirements?.join(", ")}
    
    Guidelines:
    1. Start with a personalized greeting
    2. Demonstrate understanding of the project
    3. Highlight relevant experience and skills
    4. Provide a clear approach/methodology
    5. Include timeline and deliverables
    6. End with a professional call-to-action
    7. Keep it concise but comprehensive (300-500 words)
    8. Use the freelancer's language preference: ${userProfile.language || "English"}
    
    Generate a compelling proposal that stands out from competitors.
    `

    const response = await this.openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 800,
    })

    return response.choices[0].message.content
  }

  calculateOptimalPrice(jobData, userProfile) {
    // Extract budget range
    const budgetMatch = jobData.budget?.match(/\$(\d+(?:,\d+)?)\s*-\s*\$(\d+(?:,\d+)?)/)
    if (!budgetMatch) return null

    const minBudget = Number.parseInt(budgetMatch[1].replace(",", ""))
    const maxBudget = Number.parseInt(budgetMatch[2].replace(",", ""))

    // Calculate optimal price based on experience and market positioning
    const experienceMultiplier = Math.min(userProfile.experience / 10, 1.2)
    const optimalPrice = Math.round(minBudget + (maxBudget - minBudget) * 0.7 * experienceMultiplier)

    return `$${optimalPrice.toLocaleString()}`
  }

  async calculateSuccessProbability(jobData, userProfile) {
    // Simple algorithm to calculate success probability
    let probability = 50 // Base probability

    // Skill matching
    const jobSkills = jobData.skills || []
    const userSkills = userProfile.skills?.split(",").map((s) => s.trim().toLowerCase()) || []
    const skillMatch = jobSkills.filter((skill) =>
      userSkills.some((userSkill) => userSkill.includes(skill.toLowerCase())),
    ).length

    probability += (skillMatch / Math.max(jobSkills.length, 1)) * 30

    // Experience factor
    if (userProfile.experience >= 5) probability += 10
    if (userProfile.experience >= 10) probability += 5

    // Budget competitiveness
    const budgetMatch = jobData.budget?.match(/\$(\d+(?:,\d+)?)\s*-\s*\$(\d+(?:,\d+)?)/)
    if (budgetMatch) {
      const maxBudget = Number.parseInt(budgetMatch[2].replace(",", ""))
      if (maxBudget >= 1000) probability += 5
      if (maxBudget >= 5000) probability += 5
    }

    return Math.min(Math.max(probability, 10), 95)
  }
}

module.exports = { ProposalAgent }
