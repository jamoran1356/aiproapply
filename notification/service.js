const { DatabaseService } = require("../db/service")
const nodemailer = require("nodemailer")

class NotificationService {
  constructor() {
    this.db = new DatabaseService()
    this.emailTransporter = this.setupEmailTransporter()
  }

  setupEmailTransporter() {
    return nodemailer.createTransporter({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: process.env.SMTP_PORT || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  }

  async sendNotification(userId, notification) {
    try {
      // Save notification to database
      const savedNotification = await this.saveNotification(userId, notification)

      // Send real-time notification (WebSocket, Push, etc.)
      await this.sendRealTimeNotification(userId, savedNotification)

      // Send email notification if enabled
      if (notification.sendEmail) {
        await this.sendEmailNotification(userId, savedNotification)
      }

      return savedNotification
    } catch (error) {
      console.error("Error sending notification:", error)
      throw error
    }
  }

  async saveNotification(userId, notification) {
    const result = await this.db.query(
      `
      INSERT INTO notifications (user_id, type, title, message, data, created_at)
      VALUES ($1, $2, $3, $4, $5, NOW())
      RETURNING *
    `,
      [userId, notification.type, notification.title, notification.message, JSON.stringify(notification.data || {})],
    )

    return result.rows[0]
  }

  async getUserNotifications(userId, limit = 50, offset = 0, unreadOnly = false) {
    let query = `
      SELECT * FROM notifications 
      WHERE user_id = $1
    `
    const params = [userId]

    if (unreadOnly) {
      query += ` AND read = FALSE`
    }

    query += ` ORDER BY created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`
    params.push(limit, offset)

    const result = await this.db.query(query, params)
    return result.rows.map((row) => ({
      ...row,
      data: typeof row.data === "string" ? JSON.parse(row.data) : row.data,
    }))
  }

  async markAsRead(notificationId) {
    const result = await this.db.query(
      `
      UPDATE notifications 
      SET read = TRUE 
      WHERE id = $1 
      RETURNING *
    `,
      [notificationId],
    )

    return result.rows[0]
  }

  async markAllAsRead(userId) {
    const result = await this.db.query(
      `
      UPDATE notifications 
      SET read = TRUE 
      WHERE user_id = $1 AND read = FALSE
    `,
      [userId],
    )

    return result.rowCount
  }

  async deleteNotification(notificationId) {
    await this.db.query(
      `
      DELETE FROM notifications 
      WHERE id = $1
    `,
      [notificationId],
    )
  }

  async getNotificationStats(userId) {
    const result = await this.db.query(
      `
      SELECT 
        COUNT(*) as total,
        COUNT(CASE WHEN read = FALSE THEN 1 END) as unread,
        COUNT(CASE WHEN created_at > NOW() - INTERVAL '24 hours' THEN 1 END) as today,
        COUNT(CASE WHEN created_at > NOW() - INTERVAL '7 days' THEN 1 END) as this_week
      FROM notifications 
      WHERE user_id = $1
    `,
      [userId],
    )

    return result.rows[0]
  }

  async sendRealTimeNotification(userId, notification) {
    // In a real implementation, this would use WebSockets or Server-Sent Events
    // For now, we'll just log it
    console.log(`📱 Real-time notification for user ${userId}:`, {
      id: notification.id,
      type: notification.type,
      title: notification.title,
      message: notification.message,
    })
  }

  async sendEmailNotification(userId, notification) {
    try {
      // Get user email
      const userResult = await this.db.query("SELECT email FROM users WHERE id = $1", [userId])

      if (!userResult.rows[0]) {
        throw new Error("User not found")
      }

      const userEmail = userResult.rows[0].email

      // Prepare email content
      const emailContent = this.prepareEmailContent(notification)

      // Send email
      await this.emailTransporter.sendMail({
        from: process.env.FROM_EMAIL || "noreply@aiproapply.com",
        to: userEmail,
        subject: notification.title,
        html: emailContent,
      })

      console.log(`📧 Email notification sent to ${userEmail}`)
    } catch (error) {
      console.error("Error sending email notification:", error)
      // Don't throw error to avoid breaking the notification flow
    }
  }

  prepareEmailContent(notification) {
    const baseTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${notification.title}</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; }
          .content { background: #f9f9f9; padding: 20px; }
          .footer { background: #333; color: white; padding: 10px; text-align: center; font-size: 12px; }
          .button { display: inline-block; background: #667eea; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 10px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🤖 AIProApply</h1>
            <h2>${notification.title}</h2>
          </div>
          <div class="content">
            <p>${notification.message}</p>
            ${this.getNotificationTypeContent(notification)}
          </div>
          <div class="footer">
            <p>&copy; 2024 AIProApply. All rights reserved.</p>
            <p>You received this email because you have notifications enabled in your account.</p>
          </div>
        </div>
      </body>
      </html>
    `

    return baseTemplate
  }

  getNotificationTypeContent(notification) {
    const data = typeof notification.data === "string" ? JSON.parse(notification.data) : notification.data || {}

    switch (notification.type) {
      case "proposal_generated":
        return `
          <div style="border-left: 4px solid #667eea; padding-left: 15px; margin: 15px 0;">
            <h3>Proposal Details</h3>
            <p><strong>Job ID:</strong> ${data.jobId || "N/A"}</p>
            <p><strong>Proposal ID:</strong> ${data.proposalId || "N/A"}</p>
            <a href="${process.env.APP_URL}/dashboard" class="button">View Proposal</a>
          </div>
        `

      case "auto_apply_complete":
        return `
          <div style="border-left: 4px solid #28a745; padding-left: 15px; margin: 15px 0;">
            <h3>Auto-Apply Results</h3>
            <p><strong>Applications Sent:</strong> ${data.applied || 0}</p>
            <p><strong>Jobs Searched:</strong> ${data.searched || 0}</p>
            <p><strong>Skipped:</strong> ${data.skipped || 0}</p>
            <a href="${process.env.APP_URL}/dashboard" class="button">View Dashboard</a>
          </div>
        `

      case "application_response":
        return `
          <div style="border-left: 4px solid #ffc107; padding-left: 15px; margin: 15px 0;">
            <h3>Client Response</h3>
            <p><strong>Status:</strong> ${data.status || "Unknown"}</p>
            <p><strong>Response:</strong> ${data.response || "No message provided"}</p>
            <a href="${process.env.APP_URL}/dashboard" class="button">View Application</a>
          </div>
        `

      default:
        return data.actionUrl ? `<a href="${data.actionUrl}" class="button">View Details</a>` : ""
    }
  }

  // Predefined notification templates
  static templates = {
    proposalGenerated: (jobTitle, proposalId) => ({
      type: "proposal_generated",
      title: "Nueva propuesta generada",
      message: `Se ha generado una propuesta personalizada para: ${jobTitle}`,
      data: { proposalId },
    }),

    autoApplyComplete: (results) => ({
      type: "auto_apply_complete",
      title: "Aplicación automática completada",
      message: `Se enviaron ${results.applied} propuestas automáticamente de ${results.searched} trabajos encontrados.`,
      data: results,
    }),

    applicationResponse: (jobTitle, status, response) => ({
      type: "application_response",
      title: "Respuesta del cliente recibida",
      message: `El cliente ha respondido a tu propuesta para: ${jobTitle}`,
      data: { status, response },
    }),

    weeklyReport: (stats) => ({
      type: "weekly_report",
      title: "Reporte semanal de actividad",
      message: `Esta semana enviaste ${stats.proposals} propuestas con una tasa de éxito del ${stats.successRate}%.`,
      data: stats,
      sendEmail: true,
    }),
  }
}

module.exports = { NotificationService }
