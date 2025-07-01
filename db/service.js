const { Pool } = require("pg")

class DatabaseService {
  constructor() {
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL || "postgresql://localhost:5432/aiproapply",
      ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
    })
  }

  async query(text, params) {
    const client = await this.pool.connect()
    try {
      const result = await client.query(text, params)
      return result
    } finally {
      client.release()
    }
  }

  // User Profile Methods
  async getUserProfile(userId) {
    const result = await this.query("SELECT * FROM user_profiles WHERE user_id = $1", [userId])
    return result.rows[0]
  }

  async updateUserProfile(userId, profile) {
    const result = await this.query(
      `
      UPDATE user_profiles 
      SET name = $2, title = $3, skills = $4, experience = $5, description = $6, 
          min_budget = $7, max_budget = $8, updated_at = NOW()
      WHERE user_id = $1
      RETURNING *
    `,
      [
        userId,
        profile.name,
        profile.title,
        profile.skills,
        profile.experience,
        profile.description,
        profile.minBudget,
        profile.maxBudget,
      ],
    )
    return result.rows[0]
  }

  // Proposal Methods
  async saveProposal(proposal) {
    const result = await this.query(
      `
      INSERT INTO proposals (
        user_id, job_id, title, platform, client, budget, proposed_price,
        content, success_probability, status, created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *
    `,
      [
        proposal.userId,
        proposal.jobId,
        proposal.title,
        proposal.platform,
        proposal.client,
        proposal.budget,
        proposal.proposedPrice,
        proposal.content,
        proposal.successProbability,
        proposal.status,
        proposal.createdAt,
      ],
    )
    return result.rows[0]
  }

  async getUserProposals(userId, startDate, endDate) {
    const result = await this.query(
      `
      SELECT * FROM proposals 
      WHERE user_id = $1 AND created_at BETWEEN $2 AND $3
      ORDER BY created_at DESC
    `,
      [userId, startDate, endDate],
    )
    return result.rows
  }

  async updateProposalStatus(proposalId, status) {
    const result = await this.query(
      `
      UPDATE proposals SET status = $2, updated_at = NOW()
      WHERE id = $1
      RETURNING *
    `,
      [proposalId, status],
    )
    return result.rows[0]
  }

  // Application Methods
  async saveApplication(application) {
    const result = await this.query(
      `
      INSERT INTO applications (
        user_id, job_id, proposal_id, platform, status, submitted_at
      ) VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `,
      [
        application.userId,
        application.jobId,
        application.proposalId,
        application.platform,
        application.status,
        application.submittedAt,
      ],
    )
    return result.rows[0]
  }

  async getUserApplications(userId, startDate, endDate) {
    const result = await this.query(
      `
      SELECT * FROM applications 
      WHERE user_id = $1 AND submitted_at BETWEEN $2 AND $3
      ORDER BY submitted_at DESC
    `,
      [userId, startDate, endDate],
    )
    return result.rows
  }

  async updateApplicationStatus(applicationId, status) {
    const result = await this.query(
      `
      UPDATE applications SET status = $2, updated_at = NOW()
      WHERE id = $1
      RETURNING *
    `,
      [applicationId, status],
    )
    return result.rows[0]
  }

  // Search Results Methods
  async saveSearchResults(userId, searchData) {
    const result = await this.query(
      `
      INSERT INTO search_results (user_id, query, results, timestamp)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `,
      [userId, JSON.stringify(searchData.query), JSON.stringify(searchData.results), searchData.timestamp],
    )
    return result.rows[0]
  }

  // User Preferences Methods
  async getUserPreferences(userId) {
    const result = await this.query("SELECT * FROM user_preferences WHERE user_id = $1", [userId])
    return (
      result.rows[0] || {
        autoApplyEnabled: false,
        maxDailyApplications: 5,
        minJobScore: 60,
        maxCompetition: 20,
        minClientRating: 4.0,
      }
    )
  }

  async updateUserPreferences(userId, preferences) {
    const result = await this.query(
      `
      INSERT INTO user_preferences (
        user_id, auto_apply_enabled, max_daily_applications, min_job_score,
        max_competition, min_client_rating, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, NOW())
      ON CONFLICT (user_id) DO UPDATE SET
        auto_apply_enabled = $2, max_daily_applications = $3, min_job_score = $4,
        max_competition = $5, min_client_rating = $6, updated_at = NOW()
      RETURNING *
    `,
      [
        userId,
        preferences.autoApplyEnabled,
        preferences.maxDailyApplications,
        preferences.minJobScore,
        preferences.maxCompetition,
        preferences.minClientRating,
      ],
    )
    return result.rows[0]
  }

  // Earnings Methods
  async getUserEarnings(userId, startDate, endDate) {
    const result = await this.query(
      `
      SELECT * FROM earnings 
      WHERE user_id = $1 AND date BETWEEN $2 AND $3
      ORDER BY date DESC
    `,
      [userId, startDate, endDate],
    )
    return result.rows
  }

  async addEarning(userId, amount, projectId, description) {
    const result = await this.query(
      `
      INSERT INTO earnings (user_id, amount, project_id, description, date)
      VALUES ($1, $2, $3, $4, NOW())
      RETURNING *
    `,
      [userId, amount, projectId, description],
    )
    return result.rows[0]
  }

  // Admin Methods
  async getAllUsers(limit = 100, offset = 0) {
    const result = await this.query(
      `
      SELECT u.*, up.name, up.title, up.experience 
      FROM users u
      LEFT JOIN user_profiles up ON u.id = up.user_id
      ORDER BY u.created_at DESC
      LIMIT $1 OFFSET $2
    `,
      [limit, offset],
    )
    return result.rows
  }

  async getUserStats() {
    const result = await this.query(`
      SELECT 
        COUNT(*) as total_users,
        COUNT(CASE WHEN last_login > NOW() - INTERVAL '30 days' THEN 1 END) as active_users,
        COUNT(CASE WHEN created_at > NOW() - INTERVAL '1 day' THEN 1 END) as new_users_today
      FROM users
    `)
    return result.rows[0]
  }

  async getRevenueStats() {
    const result = await this.query(`
      SELECT 
        SUM(amount) as total_revenue,
        SUM(CASE WHEN date > NOW() - INTERVAL '30 days' THEN amount ELSE 0 END) as revenue_this_month
      FROM earnings
    `)
    return result.rows[0]
  }
}

module.exports = { DatabaseService }
