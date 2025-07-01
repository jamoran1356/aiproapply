"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { useLanguage } from "@/hooks/useLanguage"
import { LanguageSelector } from "@/components/LanguageSelector"
import {
  FileText,
  Users,
  TrendingUp,
  Star,
  Zap,
  Target,
  Settings,
  Eye,
  ExternalLink,
  DollarSign,
  Filter,
  RefreshCw,
  Bot,
  Globe,
  MessageSquare,
  ThumbsUp,
  AlertCircle,
} from "lucide-react"

// Datos simulados
const mockProposals = [
  {
    id: 1,
    title: "Desarrollo de E-commerce con React y Node.js",
    titleEn: "E-commerce Development with React and Node.js",
    platform: "Upwork",
    client: "TechStartup Inc.",
    budget: "$3,500 - $5,000",
    proposedPrice: "$4,200",
    status: "pending",
    submittedAt: "2024-01-15T10:30:00Z",
    readAt: null,
    description:
      "Necesitamos desarrollar una plataforma de e-commerce completa con React en el frontend y Node.js en el backend. La aplicación debe incluir carrito de compras, sistema de pagos con Stripe, panel de administración, y gestión de inventario. Experiencia previa con e-commerce es esencial.",
    descriptionEn:
      "We need to develop a complete e-commerce platform with React on the frontend and Node.js on the backend. The application should include shopping cart, Stripe payment system, admin panel, and inventory management. Previous e-commerce experience is essential.",
    requirements: ["React.js", "Node.js", "MongoDB", "Stripe API", "AWS"],
    projectUrl: "https://upwork.com/jobs/react-ecommerce-development",
    competition: 12,
    aiProposal:
      "Hola! Soy un desarrollador Full Stack especializado en React y Node.js con más de 5 años de experiencia creando plataformas de e-commerce exitosas. He desarrollado más de 15 tiendas online similares, incluyendo integración completa con Stripe y sistemas de gestión de inventario avanzados.\n\nMi propuesta incluye:\n- Desarrollo completo del frontend en React con diseño responsive\n- Backend robusto en Node.js con APIs RESTful\n- Integración segura con Stripe para pagos\n- Panel de administración intuitivo\n- Sistema de gestión de inventario en tiempo real\n- Despliegue en AWS con configuración de CI/CD\n\nPuedo completar este proyecto en 6-8 semanas con entregas semanales para tu revisión. Mi tarifa de $4,200 incluye todo el desarrollo, testing, y soporte post-lanzamiento por 30 días.\n\n¿Te gustaría revisar mi portfolio de proyectos similares?",
    aiProposalEn:
      "Hello! I'm a Full Stack developer specialized in React and Node.js with over 5 years of experience creating successful e-commerce platforms. I've developed more than 15 similar online stores, including complete Stripe integration and advanced inventory management systems.\n\nMy proposal includes:\n- Complete React frontend development with responsive design\n- Robust Node.js backend with RESTful APIs\n- Secure Stripe integration for payments\n- Intuitive admin panel\n- Real-time inventory management system\n- AWS deployment with CI/CD configuration\n\nI can complete this project in 6-8 weeks with weekly deliveries for your review. My rate of $4,200 includes all development, testing, and 30-day post-launch support.\n\nWould you like to review my portfolio of similar projects?",
    clientRating: 4.8,
    clientReviews: 23,
    estimatedDuration: "6-8 weeks",
    estimatedDurationEn: "6-8 weeks",
  },
  {
    id: 2,
    title: "Diseño UI/UX para App Móvil de Fitness",
    titleEn: "UI/UX Design for Fitness Mobile App",
    platform: "Fiverr",
    client: "FitLife Solutions",
    budget: "$1,200 - $2,000",
    proposedPrice: "$1,650",
    status: "approved",
    submittedAt: "2024-01-14T14:20:00Z",
    readAt: "2024-01-14T16:45:00Z",
    description:
      "Buscamos un diseñador UI/UX experimentado para crear el diseño completo de nuestra aplicación móvil de fitness. La app incluirá seguimiento de ejercicios, planes nutricionales, y comunidad social. Necesitamos wireframes, mockups de alta fidelidad, y prototipo interactivo.",
    descriptionEn:
      "We're looking for an experienced UI/UX designer to create the complete design for our fitness mobile application. The app will include exercise tracking, nutritional plans, and social community. We need wireframes, high-fidelity mockups, and interactive prototype.",
    requirements: ["Figma", "Diseño móvil", "Prototipado", "UI/UX", "Design System"],
    projectUrl: "https://fiverr.com/gigs/fitness-app-ui-ux-design",
    competition: 8,
    aiProposal:
      "¡Perfecto! Como diseñador UI/UX especializado en aplicaciones móviles de salud y fitness, este proyecto es exactamente mi área de expertise. He diseñado más de 20 apps de fitness que han logrado excelentes ratings en las app stores.\n\nMi proceso incluye:\n- Research y análisis de usuarios objetivo\n- Wireframes detallados para todas las pantallas\n- Design system completo con componentes reutilizables\n- Mockups de alta fidelidad en Figma\n- Prototipo interactivo para testing\n- Guías de implementación para desarrolladores\n\nMi propuesta de $1,650 incluye:\n✅ 25+ pantallas diseñadas\n✅ Prototipo completamente funcional\n✅ Design system documentado\n✅ 3 rondas de revisiones\n✅ Archivos fuente en Figma\n\nPuedo entregar en 3-4 semanas. ¿Te gustaría ver ejemplos de mis apps de fitness anteriores?",
    aiProposalEn:
      "Perfect! As a UI/UX designer specialized in health and fitness mobile applications, this project is exactly my area of expertise. I've designed over 20 fitness apps that have achieved excellent ratings in app stores.\n\nMy process includes:\n- Research and target user analysis\n- Detailed wireframes for all screens\n- Complete design system with reusable components\n- High-fidelity mockups in Figma\n- Interactive prototype for testing\n- Implementation guides for developers\n\nMy $1,650 proposal includes:\n✅ 25+ designed screens\n✅ Fully functional prototype\n✅ Documented design system\n✅ 3 rounds of revisions\n✅ Source files in Figma\n\nI can deliver in 3-4 weeks. Would you like to see examples of my previous fitness apps?",
    clientRating: 4.9,
    clientReviews: 45,
    estimatedDuration: "3-4 semanas",
    estimatedDurationEn: "3-4 weeks",
  },
  {
    id: 3,
    title: "Campaña de Marketing Digital para SaaS B2B",
    titleEn: "Digital Marketing Campaign for B2B SaaS",
    platform: "Freelancer",
    client: "CloudTech Corp",
    budget: "$2,000 - $4,000",
    proposedPrice: "$3,200",
    status: "interview",
    submittedAt: "2024-01-13T09:15:00Z",
    readAt: "2024-01-13T11:30:00Z",
    description:
      "Empresa SaaS B2B busca especialista en marketing digital para lanzar campaña integral. Incluye estrategia de contenido, SEO, Google Ads, LinkedIn Ads, email marketing y análisis de métricas. Experiencia previa con SaaS B2B es fundamental.",
    descriptionEn:
      "B2B SaaS company seeks digital marketing specialist to launch comprehensive campaign. Includes content strategy, SEO, Google Ads, LinkedIn Ads, email marketing and metrics analysis. Previous B2B SaaS experience is essential.",
    requirements: ["Google Ads", "LinkedIn Ads", "SEO", "Content Marketing", "Analytics"],
    projectUrl: "https://freelancer.com/projects/saas-b2b-marketing-campaign",
    competition: 15,
    aiProposal:
      "Excelente oportunidad! Soy especialista en marketing digital para SaaS B2B con 7+ años ayudando a empresas tecnológicas a escalar sus ventas. He trabajado con más de 30 startups SaaS, generando un promedio de 300% ROI en sus campañas.\n\nMi estrategia integral incluye:\n\n🎯 ESTRATEGIA\n- Análisis profundo de buyer personas B2B\n- Competitive intelligence y positioning\n- Funnel de conversión optimizado\n\n📈 EJECUCIÓN\n- Google Ads con targeting específico para decisores\n- LinkedIn Ads para C-level y managers\n- Content marketing técnico (whitepapers, case studies)\n- SEO técnico para keywords de alta intención\n- Email sequences automatizadas\n\n📊 MÉTRICAS\n- Dashboard personalizado con KPIs clave\n- Reportes semanales con insights accionables\n- A/B testing continuo para optimización\n\nMi inversión de $3,200 incluye setup completo, gestión por 2 meses, y training para tu equipo interno.\n\n¿Podemos agendar una llamada para discutir tu mercado objetivo?",
    aiProposalEn:
      "Excellent opportunity! I'm a B2B SaaS digital marketing specialist with 7+ years helping tech companies scale their sales. I've worked with over 30 SaaS startups, generating an average of 300% ROI on their campaigns.\n\nMy comprehensive strategy includes:\n\n🎯 STRATEGY\n- Deep B2B buyer persona analysis\n- Competitive intelligence and positioning\n- Optimized conversion funnel\n\n📈 EXECUTION\n- Google Ads with specific targeting for decision makers\n- LinkedIn Ads for C-level and managers\n- Technical content marketing (whitepapers, case studies)\n- Technical SEO for high-intent keywords\n- Automated email sequences\n\n📊 METRICS\n- Custom dashboard with key KPIs\n- Weekly reports with actionable insights\n- Continuous A/B testing for optimization\n\nMy $3,200 investment includes complete setup, 2-month management, and training for your internal team.\n\nCan we schedule a call to discuss your target market?",
    clientRating: 4.7,
    clientReviews: 67,
    estimatedDuration: "8-10 semanas",
    estimatedDurationEn: "8-10 weeks",
  },
]

const mockStats = {
  proposalsSent: 47,
  proposalsApproved: 12,
  proposalsRead: 28,
  activeSites: 8,
  responseRate: 59.6,
  avgProposalValue: 2850,
  totalEarnings: 34200,
  activeProjects: 5,
}

const platforms = [
  { name: "Upwork", status: "active", proposals: 18, success: 8 },
  { name: "Fiverr", status: "active", proposals: 12, success: 3 },
  { name: "Freelancer", status: "active", proposals: 8, success: 1 },
  { name: "Toptal", status: "paused", proposals: 5, success: 0 },
  { name: "Workana", status: "active", proposals: 4, success: 0 },
]

export default function Dashboard() {
  const [selectedProposal, setSelectedProposal] = useState(null)
  const [activeTab, setActiveTab] = useState("proposals")
  const { t, language } = useLanguage()

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "interview":
        return "bg-blue-100 text-blue-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status) => {
    return t(`dashboard.status.${status}`)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(language === "es" ? "es-ES" : "en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getLocalizedContent = (proposal, field) => {
    if (language === "en" && proposal[field + "En"]) {
      return proposal[field + "En"]
    }
    return proposal[field]
  }

  if (selectedProposal) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => setSelectedProposal(null)}>
                ← {t("dashboard.proposalDetail.backToDashboard")}
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{t("dashboard.proposalDetail.title")}</h1>
                <p className="text-gray-600">
                  #{selectedProposal.id} - {selectedProposal.platform}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSelector />
              <Badge className={getStatusColor(selectedProposal.status)}>
                {getStatusText(selectedProposal.status)}
              </Badge>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Información del Proyecto */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {getLocalizedContent(selectedProposal, "title")}
                    <a
                      href={selectedProposal.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </CardTitle>
                  <CardDescription>
                    {t("dashboard.proposalsList.client")}: {selectedProposal.client} • {selectedProposal.platform}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">{t("dashboard.proposalDetail.projectDescription")}</h4>
                    <p className="text-gray-700 leading-relaxed">
                      {getLocalizedContent(selectedProposal, "description")}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">{t("dashboard.proposalDetail.technicalRequirements")}</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProposal.requirements.map((req, index) => (
                        <Badge key={index} variant="outline">
                          {req}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <p className="text-sm text-gray-600">{t("dashboard.proposalDetail.clientBudget")}</p>
                      <p className="font-semibold">{selectedProposal.budget}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{t("dashboard.proposalDetail.proposedPrice")}</p>
                      <p className="font-semibold text-green-600">{selectedProposal.proposedPrice}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Propuesta Generada por IA */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bot className="w-5 h-5 text-blue-600" />
                    <span>{t("dashboard.proposalDetail.aiProposal")}</span>
                  </CardTitle>
                  <CardDescription>{t("dashboard.proposalDetail.aiProposalDesc")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <pre className="whitespace-pre-wrap text-sm text-gray-800 font-sans">
                      {getLocalizedContent(selectedProposal, "aiProposal")}
                    </pre>
                  </div>
                  <div className="flex justify-end mt-4 space-x-2">
                    <Button variant="outline" size="sm">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      {t("dashboard.proposalDetail.editProposal")}
                    </Button>
                    <Button size="sm">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      {t("dashboard.proposalDetail.regenerateAI")}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar con información adicional */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t("dashboard.proposalDetail.clientInfo")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback>{selectedProposal.client.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{selectedProposal.client}</p>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{selectedProposal.clientRating}</span>
                        <span className="text-sm text-gray-600">
                          ({selectedProposal.clientReviews} {t("dashboard.proposalsList.reviews")})
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">{t("dashboard.proposalDetail.estimatedDuration")}</span>
                      <span className="text-sm font-medium">
                        {getLocalizedContent(selectedProposal, "estimatedDuration")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">{t("dashboard.proposalDetail.competition")}</span>
                      <span className="text-sm font-medium">
                        {selectedProposal.competition} {t("dashboard.stats.proposals")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">{t("dashboard.proposalDetail.submitted")}</span>
                      <span className="text-sm font-medium">{formatDate(selectedProposal.submittedAt)}</span>
                    </div>
                    {selectedProposal.readAt && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">{t("dashboard.proposalDetail.read")}</span>
                        <span className="text-sm font-medium">{formatDate(selectedProposal.readAt)}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t("dashboard.proposalDetail.aiAnalysis")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">{t("dashboard.proposalDetail.successProbability")}</span>
                      <span className="text-sm font-medium">78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">{t("dashboard.proposalDetail.skillsMatch")}</span>
                      <span className="text-sm font-medium">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">{t("dashboard.proposalDetail.priceCompetitiveness")}</span>
                      <span className="text-sm font-medium">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-semibold mb-2">{t("dashboard.proposalDetail.aiRecommendations")}</h4>
                    <ul className="text-sm space-y-1 text-gray-700">
                      <li>• Precio competitivo para el mercado</li>
                      <li>• Experiencia perfecta para el proyecto</li>
                      <li>• Seguimiento recomendado en 3 días</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t("dashboard.proposalDetail.actions")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button className="w-full bg-transparent" variant="outline">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    {t("dashboard.proposalDetail.sendFollowUp")}
                  </Button>
                  <Button className="w-full bg-transparent" variant="outline">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    {t("dashboard.proposalDetail.updateStatus")}
                  </Button>
                  <Button className="w-full bg-transparent" variant="outline">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    {t("dashboard.proposalDetail.reportProblem")}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div
              className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center cursor-pointer"
              onClick={() => (window.location.href = "/")}
            >
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1
                className="text-2xl font-bold text-gray-900 cursor-pointer"
                onClick={() => (window.location.href = "/")}
              >
                {t("dashboard.title")}
              </h1>
              <p className="text-gray-600">{t("dashboard.subtitle")}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-green-100 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-800 font-medium">{t("dashboard.agentActive")}</span>
            </div>
            <LanguageSelector />
            <Button variant="outline" onClick={() => (window.location.href = "/")}>
              ← {t("dashboard.backToSite")}
            </Button>
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              {t("dashboard.configure")}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="proposals">{t("dashboard.tabs.proposals")}</TabsTrigger>
            <TabsTrigger value="stats">{t("dashboard.tabs.stats")}</TabsTrigger>
            <TabsTrigger value="agent">{t("dashboard.tabs.agent")}</TabsTrigger>
            <TabsTrigger value="platforms">{t("dashboard.tabs.platforms")}</TabsTrigger>
          </TabsList>

          {/* Tab de Propuestas */}
          <TabsContent value="proposals" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{t("dashboard.stats.proposalsSent")}</p>
                      <p className="text-3xl font-bold text-gray-900">{mockStats.proposalsSent}</p>
                    </div>
                    <FileText className="w-8 h-8 text-blue-600" />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">+12 {t("dashboard.stats.thisWeek")}</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{t("dashboard.stats.approved")}</p>
                      <p className="text-3xl font-bold text-green-600">{mockStats.proposalsApproved}</p>
                    </div>
                    <ThumbsUp className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {t("dashboard.stats.rate")}{" "}
                    {((mockStats.proposalsApproved / mockStats.proposalsSent) * 100).toFixed(1)}%
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{t("dashboard.stats.read")}</p>
                      <p className="text-3xl font-bold text-blue-600">{mockStats.proposalsRead}</p>
                    </div>
                    <Eye className="w-8 h-8 text-blue-600" />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {mockStats.responseRate}% {t("dashboard.stats.responseRate")}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{t("dashboard.stats.averageValue")}</p>
                      <p className="text-3xl font-bold text-purple-600">
                        ${mockStats.avgProposalValue.toLocaleString()}
                      </p>
                    </div>
                    <DollarSign className="w-8 h-8 text-purple-600" />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{t("dashboard.stats.perProposal")}</p>
                </CardContent>
              </Card>
            </div>

            {/* Filtros */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Filter className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium">{t("dashboard.filters.filters")}</span>
                    </div>
                    <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
                      <option>{t("dashboard.filters.allPlatforms")}</option>
                      <option>Upwork</option>
                      <option>Fiverr</option>
                      <option>Freelancer</option>
                    </select>
                    <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
                      <option>{t("dashboard.filters.allStatuses")}</option>
                      <option>{t("dashboard.filters.pending")}</option>
                      <option>{t("dashboard.filters.approved")}</option>
                      <option>{t("dashboard.filters.interview")}</option>
                    </select>
                  </div>
                  <Button size="sm">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    {t("dashboard.filters.update")}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Lista de Propuestas */}
            <div className="space-y-4">
              {mockProposals.map((proposal) => (
                <Card key={proposal.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {getLocalizedContent(proposal, "title")}
                          </h3>
                          <Badge className={getStatusColor(proposal.status)}>{getStatusText(proposal.status)}</Badge>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-600">{t("dashboard.proposalsList.platform")}</p>
                            <p className="font-medium">{proposal.platform}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">{t("dashboard.proposalsList.client")}</p>
                            <p className="font-medium">{proposal.client}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">{t("dashboard.proposalsList.proposedPrice")}</p>
                            <p className="font-medium text-green-600">{proposal.proposedPrice}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">{t("dashboard.proposalsList.submitted")}</p>
                            <p className="font-medium">{formatDate(proposal.submittedAt)}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>
                              {t("dashboard.proposalsList.competition")} {proposal.competition}{" "}
                              {t("dashboard.stats.proposals")}
                            </span>
                            <span>•</span>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span>
                                {proposal.clientRating} ({proposal.clientReviews} {t("dashboard.proposalsList.reviews")}
                                )
                              </span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" onClick={() => setSelectedProposal(proposal)}>
                            <Eye className="w-4 h-4 mr-2" />
                            {t("dashboard.proposalsList.viewDetail")}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tab de Estadísticas */}
          <TabsContent value="stats" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{t("dashboard.stats.totalEarnings")}</p>
                      <p className="text-3xl font-bold text-green-600">${mockStats.totalEarnings.toLocaleString()}</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">+23% {t("dashboard.stats.vsLastMonth")}</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{t("dashboard.stats.activeProjects")}</p>
                      <p className="text-3xl font-bold text-blue-600">{mockStats.activeProjects}</p>
                    </div>
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{t("dashboard.stats.inProgress")}</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{t("dashboard.stats.successRate")}</p>
                      <p className="text-3xl font-bold text-purple-600">
                        {((mockStats.proposalsApproved / mockStats.proposalsSent) * 100).toFixed(1)}%
                      </p>
                    </div>
                    <Target className="w-8 h-8 text-purple-600" />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{t("dashboard.stats.approvedProposals")}</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{t("dashboard.stats.activeSites")}</p>
                      <p className="text-3xl font-bold text-orange-600">{mockStats.activeSites}</p>
                    </div>
                    <Globe className="w-8 h-8 text-orange-600" />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{t("dashboard.stats.monitoredPlatforms")}</p>
                </CardContent>
              </Card>
            </div>

            {/* Gráfico de rendimiento por plataforma */}
            <Card>
              <CardHeader>
                <CardTitle>{t("dashboard.stats.platformPerformance")}</CardTitle>
                <CardDescription>{t("dashboard.stats.platformPerformanceDesc")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {platforms.map((platform) => (
                    <div key={platform.name} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Globe className="w-6 h-6 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-semibold">{platform.name}</p>
                          <p className="text-sm text-gray-600">
                            {platform.proposals} {t("dashboard.stats.proposals")} • {platform.success}{" "}
                            {t("dashboard.stats.approved")}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          {platform.proposals > 0 ? ((platform.success / platform.proposals) * 100).toFixed(1) : 0}%
                        </p>
                        <p className="text-sm text-gray-600">{t("dashboard.stats.successRateShort")}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab de Configuración del Agente */}
          <TabsContent value="agent" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t("dashboard.agentConfig.professionalProfile")}</CardTitle>
                  <CardDescription>{t("dashboard.agentConfig.profileDesc")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      {t("dashboard.agentConfig.professionalTitle")}
                    </label>
                    <Input
                      placeholder={t("dashboard.agentConfig.titlePlaceholder")}
                      defaultValue="Desarrollador Full Stack Senior"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">{t("dashboard.agentConfig.mainSkills")}</label>
                    <Textarea
                      placeholder={t("dashboard.agentConfig.skillsPlaceholder")}
                      defaultValue="React, Node.js, Python, AWS, MongoDB, PostgreSQL, Docker, Kubernetes"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">{t("dashboard.agentConfig.experience")}</label>
                    <Input type="number" defaultValue="7" />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      {t("dashboard.agentConfig.professionalDescription")}
                    </label>
                    <Textarea
                      placeholder={t("dashboard.agentConfig.descriptionPlaceholder")}
                      defaultValue="Desarrollador Full Stack con 7+ años de experiencia creando aplicaciones web escalables. Especializado en React, Node.js y arquitecturas cloud en AWS."
                      rows={4}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">{t("dashboard.agentConfig.portfolioUrl")}</label>
                    <Input
                      placeholder={t("dashboard.agentConfig.portfolioPlaceholder")}
                      defaultValue="https://portfolio.dev"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t("dashboard.agentConfig.agentConfiguration")}</CardTitle>
                  <CardDescription>{t("dashboard.agentConfig.agentConfigDesc")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">{t("dashboard.agentConfig.priceRange")}</label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input placeholder={t("dashboard.agentConfig.minimum")} defaultValue="1000" />
                      <Input placeholder={t("dashboard.agentConfig.maximum")} defaultValue="10000" />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      {t("dashboard.agentConfig.maxProposalsPerDay")}
                    </label>
                    <Input type="number" defaultValue="5" />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      {t("dashboard.agentConfig.keywordsToSearch")}
                    </label>
                    <Textarea
                      placeholder={t("dashboard.agentConfig.keywordsPlaceholder")}
                      defaultValue="react, node.js, full stack, web development, javascript, typescript"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      {t("dashboard.agentConfig.keywordsToAvoid")}
                    </label>
                    <Textarea
                      placeholder={t("dashboard.agentConfig.avoidPlaceholder")}
                      defaultValue="wordpress, php, data entry, copy paste"
                      rows={2}
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium">{t("dashboard.agentConfig.advancedSettings")}</label>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked />
                        <span className="text-sm">{t("dashboard.agentConfig.verifiedClientsOnly")}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked />
                        <span className="text-sm">{t("dashboard.agentConfig.avoidHighCompetition")}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" />
                        <span className="text-sm">{t("dashboard.agentConfig.highRatingOnly")}</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked />
                        <span className="text-sm">{t("dashboard.agentConfig.autoFollowUp")}</span>
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-end space-x-4">
              <Button variant="outline">{t("dashboard.agentConfig.cancel")}</Button>
              <Button>{t("dashboard.agentConfig.saveConfiguration")}</Button>
            </div>
          </TabsContent>

          {/* Tab de Plataformas */}
          <TabsContent value="platforms" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("dashboard.platforms.connectedPlatforms")}</CardTitle>
                <CardDescription>{t("dashboard.platforms.platformsDesc")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {platforms.map((platform) => (
                    <div key={platform.name} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Globe className="w-6 h-6 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-semibold">{platform.name}</p>
                          <p className="text-sm text-gray-600">
                            {platform.proposals} {t("dashboard.platforms.proposalsSent")} • {platform.success}{" "}
                            {t("dashboard.platforms.successful")}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge
                          className={
                            platform.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                          }
                        >
                          {platform.status === "active"
                            ? t("dashboard.platforms.active")
                            : t("dashboard.platforms.paused")}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Settings className="w-4 h-4 mr-2" />
                          {t("dashboard.platforms.configure")}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t("dashboard.platforms.addNewPlatform")}</CardTitle>
                <CardDescription>{t("dashboard.platforms.addPlatformDesc")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 cursor-pointer">
                    <Globe className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="font-medium">Toptal</p>
                    <p className="text-sm text-gray-600">{t("dashboard.platforms.connectAccount")}</p>
                  </div>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 cursor-pointer">
                    <Globe className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="font-medium">PeoplePerHour</p>
                    <p className="text-sm text-gray-600">{t("dashboard.platforms.connectAccount")}</p>
                  </div>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 cursor-pointer">
                    <Globe className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="font-medium">Guru</p>
                    <p className="text-sm text-gray-600">{t("dashboard.platforms.connectAccount")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
