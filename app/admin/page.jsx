"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useLanguage } from "@/hooks/useLanguage"
import { LanguageSelector } from "@/components/LanguageSelector"
import {
  Users,
  DollarSign,
  Target,
  Settings,
  Eye,
  Edit,
  Trash2,
  UserX,
  Download,
  Send,
  Activity,
  BarChart3,
  Zap,
  Shield,
} from "lucide-react"

// Datos simulados para el admin
const mockAdminStats = {
  totalUsers: 12847,
  activeUsers: 8934,
  totalRevenue: 487650,
  conversionRate: 23.4,
  newUsersToday: 47,
  activeUsersLast30Days: 8934,
  revenueThisMonth: 89450,
  conversionFromTrials: 23.4,
}

const mockUsers = [
  {
    id: 1,
    name: "María González",
    email: "maria@example.com",
    plan: "pro",
    status: "active",
    joinDate: "2024-01-15",
    lastActive: "2024-01-20T10:30:00Z",
    avatar: "MG",
  },
  {
    id: 2,
    name: "Carlos Ruiz",
    email: "carlos@example.com",
    plan: "enterprise",
    status: "active",
    joinDate: "2024-01-10",
    lastActive: "2024-01-20T14:20:00Z",
    avatar: "CR",
  },
  {
    id: 3,
    name: "Ana Martín",
    email: "ana@example.com",
    plan: "basic",
    status: "inactive",
    joinDate: "2024-01-05",
    lastActive: "2024-01-18T09:15:00Z",
    avatar: "AM",
  },
  {
    id: 4,
    name: "Luis Fernández",
    email: "luis@example.com",
    plan: "pro",
    status: "suspended",
    joinDate: "2024-01-12",
    lastActive: "2024-01-19T16:45:00Z",
    avatar: "LF",
  },
  {
    id: 5,
    name: "Sofia López",
    email: "sofia@example.com",
    plan: "basic",
    status: "active",
    joinDate: "2024-01-18",
    lastActive: "2024-01-20T11:30:00Z",
    avatar: "SL",
  },
]

const mockRecentActivity = [
  { user: "María González", action: "Upgraded to Pro plan", time: "2 hours ago" },
  { user: "New user", action: "Carlos Ruiz registered", time: "4 hours ago" },
  { user: "Ana Martín", action: "Generated 15 proposals", time: "6 hours ago" },
  { user: "System", action: "Monthly backup completed", time: "8 hours ago" },
  { user: "Luis Fernández", action: "Account suspended", time: "1 day ago" },
]

const mockAnalyticsData = {
  userGrowth: [
    { month: "Jan", users: 1200 },
    { month: "Feb", users: 1890 },
    { month: "Mar", users: 2340 },
    { month: "Apr", users: 3200 },
    { month: "May", users: 4100 },
    { month: "Jun", users: 5200 },
  ],
  revenueData: [
    { month: "Jan", basic: 12000, pro: 28000, enterprise: 45000 },
    { month: "Feb", basic: 15000, pro: 32000, enterprise: 52000 },
    { month: "Mar", basic: 18000, pro: 38000, enterprise: 58000 },
    { month: "Apr", basic: 22000, pro: 45000, enterprise: 65000 },
    { month: "May", basic: 25000, pro: 52000, enterprise: 72000 },
    { month: "Jun", basic: 28000, pro: 58000, enterprise: 78000 },
  ],
  platformUsage: [
    { platform: "Upwork", percentage: 45 },
    { platform: "Fiverr", percentage: 28 },
    { platform: "Freelancer", percentage: 15 },
    { platform: "Toptal", percentage: 8 },
    { platform: "Others", percentage: 4 },
  ],
  industrySuccess: [
    { industry: "Development", rate: 78 },
    { industry: "Design", rate: 65 },
    { industry: "Marketing", rate: 72 },
    { industry: "Writing", rate: 58 },
    { industry: "Consulting", rate: 82 },
  ],
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [userFilter, setUserFilter] = useState({ plan: "all", status: "all", search: "" })
  const { t, language } = useLanguage()

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(language === "es" ? "es-ES" : "en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleDateString(language === "es" ? "es-ES" : "en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getPlanColor = (plan) => {
    switch (plan) {
      case "basic":
        return "bg-gray-100 text-gray-800"
      case "pro":
        return "bg-blue-100 text-blue-800"
      case "enterprise":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-yellow-100 text-yellow-800"
      case "suspended":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredUsers = mockUsers.filter((user) => {
    const matchesPlan = userFilter.plan === "all" || user.plan === userFilter.plan
    const matchesStatus = userFilter.status === "all" || user.status === userFilter.status
    const matchesSearch =
      userFilter.search === "" ||
      user.name.toLowerCase().includes(userFilter.search.toLowerCase()) ||
      user.email.toLowerCase().includes(userFilter.search.toLowerCase())
    return matchesPlan && matchesStatus && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div
              className="w-10 h-10 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg flex items-center justify-center cursor-pointer"
              onClick={() => (window.location.href = "/")}
            >
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1
                className="text-2xl font-bold text-gray-900 cursor-pointer"
                onClick={() => (window.location.href = "/")}
              >
                {t("admin.title")}
              </h1>
              <p className="text-gray-600">{t("admin.subtitle")}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            <Button variant="outline" onClick={() => (window.location.href = "/")}>
              ← {t("dashboard.backToSite")}
            </Button>
            <Button variant="outline" onClick={() => (window.location.href = "/dashboard")}>
              <Zap className="w-4 h-4 mr-2" />
              Dashboard Cliente
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">{t("admin.tabs.overview")}</TabsTrigger>
            <TabsTrigger value="users">{t("admin.tabs.users")}</TabsTrigger>
            <TabsTrigger value="analytics">{t("admin.tabs.analytics")}</TabsTrigger>
            <TabsTrigger value="settings">{t("admin.tabs.settings")}</TabsTrigger>
          </TabsList>

          {/* Tab de Resumen */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{t("admin.overview.totalUsers")}</p>
                      <p className="text-3xl font-bold text-gray-900">{mockAdminStats.totalUsers.toLocaleString()}</p>
                    </div>
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    +{mockAdminStats.newUsersToday} {t("admin.overview.newUsersToday")}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{t("admin.overview.activeUsers")}</p>
                      <p className="text-3xl font-bold text-green-600">{mockAdminStats.activeUsers.toLocaleString()}</p>
                    </div>
                    <Activity className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{t("admin.overview.last30Days")}</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{t("admin.overview.totalRevenue")}</p>
                      <p className="text-3xl font-bold text-purple-600">
                        ${mockAdminStats.totalRevenue.toLocaleString()}
                      </p>
                    </div>
                    <DollarSign className="w-8 h-8 text-purple-600" />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    ${mockAdminStats.revenueThisMonth.toLocaleString()} {t("admin.overview.thisMonth")}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{t("admin.overview.conversionRate")}</p>
                      <p className="text-3xl font-bold text-orange-600">{mockAdminStats.conversionRate}%</p>
                    </div>
                    <Target className="w-8 h-8 text-orange-600" />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{t("admin.overview.fromTrials")}</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Actividad Reciente */}
              <Card>
                <CardHeader>
                  <CardTitle>{t("admin.overview.recentActivity")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockRecentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.action}</p>
                          <p className="text-xs text-gray-500">
                            {activity.user} • {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Usuarios Recientes */}
              <Card>
                <CardHeader>
                  <CardTitle>{t("admin.overview.recentUsers")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockUsers.slice(0, 5).map((user) => (
                      <div key={user.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="text-xs">{user.avatar}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{user.name}</p>
                            <p className="text-xs text-gray-500">{user.email}</p>
                          </div>
                        </div>
                        <Badge className={getPlanColor(user.plan)}>{t(`admin.users.${user.plan}`)}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Acciones Rápidas */}
            <Card>
              <CardHeader>
                <CardTitle>{t("admin.overview.quickActions")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button className="h-20 flex flex-col space-y-2">
                    <Send className="w-6 h-6" />
                    <span className="text-sm">{t("admin.overview.sendAnnouncement")}</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col space-y-2 bg-transparent">
                    <Download className="w-6 h-6" />
                    <span className="text-sm">{t("admin.overview.exportData")}</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col space-y-2 bg-transparent">
                    <Activity className="w-6 h-6" />
                    <span className="text-sm">{t("admin.overview.systemHealth")}</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col space-y-2 bg-transparent">
                    <BarChart3 className="w-6 h-6" />
                    <span className="text-sm">{t("admin.overview.viewReports")}</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab de Usuarios */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("admin.users.userManagement")}</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Filtros */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <Input
                    placeholder={t("admin.users.searchUsers")}
                    value={userFilter.search}
                    onChange={(e) => setUserFilter({ ...userFilter, search: e.target.value })}
                    className="md:w-80"
                  />
                  <select
                    value={userFilter.plan}
                    onChange={(e) => setUserFilter({ ...userFilter, plan: e.target.value })}
                    className="border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option value="all">{t("admin.users.allPlans")}</option>
                    <option value="basic">{t("admin.users.basic")}</option>
                    <option value="pro">{t("admin.users.pro")}</option>
                    <option value="enterprise">{t("admin.users.enterprise")}</option>
                  </select>
                  <select
                    value={userFilter.status}
                    onChange={(e) => setUserFilter({ ...userFilter, status: e.target.value })}
                    className="border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option value="all">{t("admin.users.allStatuses")}</option>
                    <option value="active">{t("admin.users.active")}</option>
                    <option value="inactive">{t("admin.users.inactive")}</option>
                    <option value="suspended">{t("admin.users.suspended")}</option>
                  </select>
                </div>

                {/* Tabla de Usuarios */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium">{t("admin.users.name")}</th>
                        <th className="text-left py-3 px-4 font-medium">{t("admin.users.email")}</th>
                        <th className="text-left py-3 px-4 font-medium">{t("admin.users.plan")}</th>
                        <th className="text-left py-3 px-4 font-medium">{t("admin.users.status")}</th>
                        <th className="text-left py-3 px-4 font-medium">{t("admin.users.joinDate")}</th>
                        <th className="text-left py-3 px-4 font-medium">{t("admin.users.lastActive")}</th>
                        <th className="text-left py-3 px-4 font-medium">{t("admin.users.actions")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-3">
                              <Avatar className="w-8 h-8">
                                <AvatarFallback className="text-xs">{user.avatar}</AvatarFallback>
                              </Avatar>
                              <span className="font-medium">{user.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-gray-600">{user.email}</td>
                          <td className="py-3 px-4">
                            <Badge className={getPlanColor(user.plan)}>{t(`admin.users.${user.plan}`)}</Badge>
                          </td>
                          <td className="py-3 px-4">
                            <Badge className={getStatusColor(user.status)}>{t(`admin.users.${user.status}`)}</Badge>
                          </td>
                          <td className="py-3 px-4 text-gray-600">{formatDate(user.joinDate)}</td>
                          <td className="py-3 px-4 text-gray-600">{formatDateTime(user.lastActive)}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4" />
                                <span className="sr-only">{t("admin.users.viewProfile")}</span>
                              </Button>
                              <Button size="sm" variant="outline">
                                <Edit className="w-4 h-4" />
                                <span className="sr-only">{t("admin.users.editUser")}</span>
                              </Button>
                              <Button size="sm" variant="outline">
                                <UserX className="w-4 h-4" />
                                <span className="sr-only">{t("admin.users.suspend")}</span>
                              </Button>
                              <Button size="sm" variant="outline">
                                <Trash2 className="w-4 h-4" />
                                <span className="sr-only">{t("admin.users.delete")}</span>
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab de Analíticas */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Crecimiento de Usuarios */}
              <Card>
                <CardHeader>
                  <CardTitle>{t("admin.analytics.userGrowth")}</CardTitle>
                  <CardDescription>{t("admin.analytics.userGrowthDesc")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAnalyticsData.userGrowth.map((data, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          {t(`admin.analytics.months.${data.month.toLowerCase()}`)}
                        </span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${(data.users / 5200) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">{data.users.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Análisis de Ingresos */}
              <Card>
                <CardHeader>
                  <CardTitle>{t("admin.analytics.revenueAnalysis")}</CardTitle>
                  <CardDescription>{t("admin.analytics.revenueDesc")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAnalyticsData.revenueData.slice(-3).map((data, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">
                            {t(`admin.analytics.months.${data.month.toLowerCase()}`)}
                          </span>
                          <span className="text-sm font-medium">
                            ${(data.basic + data.pro + data.enterprise).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex space-x-1">
                          <div
                            className="bg-gray-400 h-2 rounded"
                            style={{ width: `${(data.basic / (data.basic + data.pro + data.enterprise)) * 100}%` }}
                          ></div>
                          <div
                            className="bg-blue-500 h-2 rounded"
                            style={{ width: `${(data.pro / (data.basic + data.pro + data.enterprise)) * 100}%` }}
                          ></div>
                          <div
                            className="bg-purple-500 h-2 rounded"
                            style={{ width: `${(data.enterprise / (data.basic + data.pro + data.enterprise)) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                    <div className="flex justify-center space-x-4 text-xs">
                      <div className="flex items-center space-x-1">
                        <div className="w-3 h-3 bg-gray-400 rounded"></div>
                        <span>{t("admin.users.basic")}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-3 h-3 bg-blue-500 rounded"></div>
                        <span>{t("admin.users.pro")}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-3 h-3 bg-purple-500 rounded"></div>
                        <span>{t("admin.users.enterprise")}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Uso de Plataformas */}
              <Card>
                <CardHeader>
                  <CardTitle>{t("admin.analytics.platformUsage")}</CardTitle>
                  <CardDescription>{t("admin.analytics.platformDesc")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAnalyticsData.platformUsage.map((platform, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{platform.platform}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-600 h-2 rounded-full"
                              style={{ width: `${platform.percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">{platform.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Éxito por Industria */}
              <Card>
                <CardHeader>
                  <CardTitle>{t("admin.analytics.proposalSuccess")}</CardTitle>
                  <CardDescription>{t("admin.analytics.proposalDesc")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAnalyticsData.industrySuccess.map((industry, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          {t(`admin.analytics.industries.${industry.industry.toLowerCase()}`)}
                        </span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-purple-600 h-2 rounded-full"
                              style={{ width: `${industry.rate}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">{industry.rate}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tab de Configuración */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Configuración General */}
              <Card>
                <CardHeader>
                  <CardTitle>{t("admin.settings.generalSettings")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">{t("admin.settings.siteName")}</label>
                    <Input defaultValue="AIProApply" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">{t("admin.settings.siteDescription")}</label>
                    <Textarea
                      defaultValue="Automatiza tu búsqueda de empleos freelance con inteligencia artificial"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">{t("admin.settings.contactEmail")}</label>
                    <Input defaultValue="soporte@aiproapply.com" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">{t("admin.settings.supportPhone")}</label>
                    <Input defaultValue="+1 (555) 123-4567" />
                  </div>
                </CardContent>
              </Card>

              {/* Configuración de Precios */}
              <Card>
                <CardHeader>
                  <CardTitle>{t("admin.settings.pricingSettings")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">{t("admin.settings.basicPlan")}</label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input placeholder={t("admin.settings.monthlyPrice")} defaultValue="29" />
                      <Input placeholder={t("admin.settings.features")} defaultValue="1 Agent, 50 proposals" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">{t("admin.settings.proPlan")}</label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input placeholder={t("admin.settings.monthlyPrice")} defaultValue="79" />
                      <Input placeholder={t("admin.settings.features")} defaultValue="3 Agents, 200 proposals" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">{t("admin.settings.enterprisePlan")}</label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input placeholder={t("admin.settings.monthlyPrice")} defaultValue="199" />
                      <Input placeholder={t("admin.settings.features")} defaultValue="Unlimited agents" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Configuración de Email */}
              <Card>
                <CardHeader>
                  <CardTitle>{t("admin.settings.emailSettings")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">{t("admin.settings.smtpServer")}</label>
                    <Input defaultValue="smtp.gmail.com" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">{t("admin.settings.smtpPort")}</label>
                    <Input defaultValue="587" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">{t("admin.settings.smtpUsername")}</label>
                    <Input defaultValue="noreply@aiproapply.com" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">{t("admin.settings.smtpPassword")}</label>
                    <Input type="password" defaultValue="••••••••" />
                  </div>
                </CardContent>
              </Card>

              {/* Configuración de API */}
              <Card>
                <CardHeader>
                  <CardTitle>{t("admin.settings.apiSettings")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">{t("admin.settings.apiKey")}</label>
                    <Input defaultValue="sk-1234567890abcdef" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">{t("admin.settings.rateLimiting")}</label>
                    <Input placeholder={t("admin.settings.requestsPerMinute")} defaultValue="100" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked />
                    <label className="text-sm">{t("admin.settings.enableLogging")}</label>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-end">
              <Button className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700">
                <Settings className="w-4 h-4 mr-2" />
                {t("admin.settings.saveSettings")}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
