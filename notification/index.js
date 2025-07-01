const express = require("express")
const cors = require("cors")
const { NotificationService } = require("./service")

const app = express()
const PORT = process.env.NOTIFICATION_PORT || 3003

app.use(cors())
app.use(express.json())

const notificationService = new NotificationService()

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() })
})

// Send notification
app.post("/notifications/send", async (req, res) => {
  try {
    const { userId, notification } = req.body
    const result = await notificationService.sendNotification(userId, notification)
    res.json({ success: true, notification: result })
  } catch (error) {
    console.error("Send notification error:", error)
    res.status(500).json({ success: false, error: error.message })
  }
})

// Get user notifications
app.get("/notifications/:userId", async (req, res) => {
  try {
    const { userId } = req.params
    const { limit = 50, offset = 0, unreadOnly = false } = req.query

    const notifications = await notificationService.getUserNotifications(
      userId,
      Number.parseInt(limit),
      Number.parseInt(offset),
      unreadOnly === "true",
    )

    res.json({ success: true, notifications })
  } catch (error) {
    console.error("Get notifications error:", error)
    res.status(500).json({ success: false, error: error.message })
  }
})

// Mark notification as read
app.patch("/notifications/:notificationId/read", async (req, res) => {
  try {
    const { notificationId } = req.params
    const notification = await notificationService.markAsRead(notificationId)
    res.json({ success: true, notification })
  } catch (error) {
    console.error("Mark as read error:", error)
    res.status(500).json({ success: false, error: error.message })
  }
})

// Mark all notifications as read
app.patch("/notifications/:userId/read-all", async (req, res) => {
  try {
    const { userId } = req.params
    const count = await notificationService.markAllAsRead(userId)
    res.json({ success: true, markedCount: count })
  } catch (error) {
    console.error("Mark all as read error:", error)
    res.status(500).json({ success: false, error: error.message })
  }
})

// Delete notification
app.delete("/notifications/:notificationId", async (req, res) => {
  try {
    const { notificationId } = req.params
    await notificationService.deleteNotification(notificationId)
    res.json({ success: true })
  } catch (error) {
    console.error("Delete notification error:", error)
    res.status(500).json({ success: false, error: error.message })
  }
})

// Get notification stats
app.get("/notifications/:userId/stats", async (req, res) => {
  try {
    const { userId } = req.params
    const stats = await notificationService.getNotificationStats(userId)
    res.json({ success: true, stats })
  } catch (error) {
    console.error("Get notification stats error:", error)
    res.status(500).json({ success: false, error: error.message })
  }
})

app.listen(PORT, () => {
  console.log(`🔔 Notification service running on port ${PORT}`)
})

module.exports = app
