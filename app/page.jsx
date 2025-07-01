"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Search,
  FileText,
  Users,
  TrendingUp,
  CheckCircle,
  Star,
  Zap,
  Target,
  Clock,
  BarChart3,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Bot,
  Play,
} from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/hooks/useLanguage"
import { LanguageSelector } from "@/components/LanguageSelector"
import { useState, useEffect } from "react"

function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { t } = useLanguage()

  const slides = [
    {
      image: "/assets/images/slider-1.webp"
    },
    {
      image: "/assets/images/slider-2.webp"
    },
    {
      image: "/assets/images/slider-3.webp"
    },
    {
      image: "/assets/images/slider-4.webp"
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  return (
    <div className="relative w-full h-full">
      {/* Slides container */}
      <div
        className="flex transition-transform duration-1000 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="min-w-full h-full relative">
            <Image
              src={slide.image || "/placeholder.svg"}
              alt={`Slide ${index + 1}`}
              width={1920}
              height={800}
              className="w-full h-full object-cover"
            />
            {/* Gradient overlay */}
            <div className={`absolute inset-0 bg-black/30`}></div>
          </div>
        ))}
      </div>

      {/* Dots indicator - posicionados en la parte inferior */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-white scale-125 shadow-lg" : "bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default function HomePage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AIProApply
              </span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-slate-600 hover:text-blue-600 transition-colors">
                {t("header.features")}
              </a>
              <a href="#how-it-works" className="text-slate-600 hover:text-blue-600 transition-colors">
                {t("header.howItWorks")}
              </a>
              <a href="#pricing" className="text-slate-600 hover:text-blue-600 transition-colors">
                {t("header.pricing")}
              </a>
              <a href="#about" className="text-slate-600 hover:text-blue-600 transition-colors">
                {t("header.about")}
              </a>
              <a href="#contact" className="text-slate-600 hover:text-blue-600 transition-colors">
                {t("header.contact")}
              </a>
            </nav>
            <div className="flex items-center space-x-4">
              <LanguageSelector />
              <Button variant="ghost" className="text-slate-600">
                {t("header.login")}
              </Button>
              <Button className="text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                {t("header.signUp")}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <HeroSlider />
        </div>

        {/* Overlay oscuro para mejorar legibilidad del texto */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Contenido del texto superpuesto */}
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                    {t("hero.title")}
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
                    {t("hero.titleHighlight")}
                  </span>
                </h1>
                <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed max-w-3xl mx-auto">
                  {t("hero.description")}
                </p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm max-w-2xl mx-auto">
                <div className="flex items-center justify-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg p-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-white">{t("hero.benefits.time")}</span>
                </div>
                <div className="flex items-center justify-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg p-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-white">{t("hero.benefits.proposals")}</span>
                </div>
                <div className="flex items-center justify-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg p-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-white">{t("hero.benefits.opportunities")}</span>
                </div>
                <div className="flex items-center justify-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg p-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-white">{t("hero.benefits.tracking")}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-4 text-lg rounded-lg flex items-center">
                  <Play className="w-6 h-6 mr-2" />
                  {t("hero.cta.demo")}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/50 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg bg-transparent rounded-lg flex items-center"
                >
                  {t("hero.cta.howItWorks")}
                  <ArrowRight className="w-6 h-6 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t("testimonials.title")}</h2>
            <p className="text-slate-600">{t("testimonials.subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-600 mb-4">{t("testimonials.testimonial1.text")}</p>
                <div className="flex items-center">
                  <Image
                    src="/placeholder.svg?height=40&width=40"
                    alt="María González"
                    width={40}
                    height={40}
                    className="rounded-full mr-3"
                  />
                  <div>
                    <p className="font-semibold">{t("testimonials.testimonial1.name")}</p>
                    <p className="text-sm text-slate-500">{t("testimonials.testimonial1.role")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-600 mb-4">{t("testimonials.testimonial2.text")}</p>
                <div className="flex items-center">
                  <Image
                    src="/placeholder.svg?height=40&width=40"
                    alt="Carlos Ruiz"
                    width={40}
                    height={40}
                    className="rounded-full mr-3"
                  />
                  <div>
                    <p className="font-semibold">{t("testimonials.testimonial2.name")}</p>
                    <p className="text-sm text-slate-500">{t("testimonials.testimonial2.role")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-600 mb-4">{t("testimonials.testimonial3.text")}</p>
                <div className="flex items-center">
                  <Image
                    src="/placeholder.svg?height=40&width=40"
                    alt="Ana Martín"
                    width={40}
                    height={40}
                    className="rounded-full mr-3"
                  />
                  <div>
                    <p className="font-semibold">{t("testimonials.testimonial3.name")}</p>
                    <p className="text-sm text-slate-500">{t("testimonials.testimonial3.role")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <p className="text-blue-100">{t("stats.freelancers")}</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500K+</div>
              <p className="text-blue-100">{t("stats.proposals")}</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">85%</div>
              <p className="text-blue-100">{t("stats.responseRate")}</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">3.2x</div>
              <p className="text-blue-100">{t("stats.projectsWon")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{t("howItWorks.title")}</h2>
            <p className="text-xl text-slate-600">{t("howItWorks.subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t("howItWorks.step1.title")}</h3>
              <p className="text-slate-600">{t("howItWorks.step1.description")}</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t("howItWorks.step2.title")}</h3>
              <p className="text-slate-600">{t("howItWorks.step2.description")}</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t("howItWorks.step3.title")}</h3>
              <p className="text-slate-600">{t("howItWorks.step3.description")}</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t("howItWorks.step4.title")}</h3>
              <p className="text-slate-600">{t("howItWorks.step4.description")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{t("useCases.title")}</h2>
            <p className="text-xl text-slate-600">{t("useCases.subtitle")}</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Desarrolladores */}
            <Card className="border-0 shadow-lg overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-blue-500 to-cyan-500 relative">
                <Image
                  src="/assets/images/programadores.webp"
                  alt={t("useCases.developers.alt")}
                  width={400}
                  height={266}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-4">{t("useCases.developers.title")}</h3>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                    <span>{t("useCases.developers.benefit1")}</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                    <span>{t("useCases.developers.benefit2")}</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                    <span>{t("useCases.developers.benefit3")}</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                    <span>{t("useCases.developers.benefit4")}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Diseñadores */}
            <Card className="border-0 shadow-lg overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-purple-500 to-pink-500 relative">
                <Image
                  src="/assets/images/disenadores.webp"
                  alt={t("useCases.designers.alt")}
                  width={400}
                  height={266}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-4">{t("useCases.designers.title")}</h3>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                    <span>{t("useCases.designers.benefit1")}</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                    <span>{t("useCases.designers.benefit2")}</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                    <span>{t("useCases.designers.benefit3")}</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                    <span>{t("useCases.designers.benefit4")}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Marketing */}
            <Card className="border-0 shadow-lg overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-green-500 to-teal-500 relative">
                <Image
                  src="/assets/images/marketing.webp"
                  alt={t("useCases.marketing.alt")}
                  width={400}
                  height={266}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-4">{t("useCases.marketing.title")}</h3>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                    <span>{t("useCases.marketing.benefit1")}</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                    <span>{t("useCases.marketing.benefit2")}</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                    <span>{t("useCases.marketing.benefit3")}</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                    <span>{t("useCases.marketing.benefit4")}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{t("features.title")}</h2>
            <p className="text-xl text-slate-600">{t("features.subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Search className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>{t("features.intelligentSearch.title")}</CardTitle>
                <CardDescription>{t("features.intelligentSearch.description")}</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>{t("features.personalizedProposals.title")}</CardTitle>
                <CardDescription>{t("features.personalizedProposals.description")}</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>{t("features.profileManagement.title")}</CardTitle>
                <CardDescription>{t("features.profileManagement.description")}</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-yellow-600" />
                </div>
                <CardTitle>{t("features.competitionAnalysis.title")}</CardTitle>
                <CardDescription>{t("features.competitionAnalysis.description")}</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle>{t("features.automation.title")}</CardTitle>
                <CardDescription>{t("features.automation.description")}</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-indigo-600" />
                </div>
                <CardTitle>{t("features.preciseTargeting.title")}</CardTitle>
                <CardDescription>{t("features.preciseTargeting.description")}</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>


      {/* Pricing */}
      <section id="pricing" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{t("pricing.title")}</h2>
            <p className="text-xl text-slate-600">{t("pricing.subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Plan Básico */}
            <Card className="border-2 border-slate-200 hover:border-blue-300 transition-colors">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{t("pricing.basic.title")}</CardTitle>
                <div className="text-4xl font-bold text-slate-900 mt-4">
                  $29<span className="text-lg font-normal text-slate-600">/mes</span>
                </div>
                <CardDescription>{t("pricing.basic.description")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>{t("pricing.basic.feature1")}</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>{t("pricing.basic.feature2")}</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>{t("pricing.basic.feature3")}</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>{t("pricing.basic.feature4")}</span>
                  </div>
                </div>
                <Button className="rounded-lg w-full mt-6 bg-transparent" variant="outline">
                  {t("pricing.basic.cta")}
                </Button>
              </CardContent>
            </Card>

            {/* Plan Pro */}
            <Card className="border-2 border-blue-500 relative hover:border-blue-600 transition-colors">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 ">
                <Badge className="bg-blue-500 text-white p-2 text-sm">{t("pricing.pro.badge")}</Badge>
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{t("pricing.pro.title")}</CardTitle>
                <div className="text-4xl font-bold text-slate-900 mt-4">
                  $79<span className="text-lg font-normal text-slate-600">/mes</span>
                </div>
                <CardDescription>{t("pricing.pro.description")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>{t("pricing.pro.feature1")}</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>{t("pricing.pro.feature2")}</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>{t("pricing.pro.feature3")}</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>{t("pricing.pro.feature4")}</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>{t("pricing.pro.feature5")}</span>
                  </div>
                </div>
                <Button className="text-white rounded-lg w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  {t("pricing.pro.cta")}
                </Button>
              </CardContent>
            </Card>

            {/* Plan Enterprise */}
            <Card className="border-2 border-slate-200 hover:border-purple-300 transition-colors">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{t("pricing.enterprise.title")}</CardTitle>
                <div className="text-4xl font-bold text-slate-900 mt-4">
                  $199<span className="text-lg font-normal text-slate-600">/mes</span>
                </div>
                <CardDescription>{t("pricing.enterprise.description")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>{t("pricing.enterprise.feature1")}</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>{t("pricing.enterprise.feature2")}</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>{t("pricing.enterprise.feature3")}</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>{t("pricing.enterprise.feature4")}</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>{t("pricing.enterprise.feature5")}</span>
                  </div>
                </div>
                <Button className="rounded-lg w-full mt-6 bg-transparent" variant="outline">
                  {t("pricing.enterprise.cta")}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{t("successStories.title")}</h2>
            <p className="text-xl text-slate-600">{t("successStories.subtitle")}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="border-0 shadow-xl overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="p-8">
                  <div className="flex items-center mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{t("successStories.story1.name")}</h3>
                      <p className="text-slate-600">{t("successStories.story1.role")}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-slate-600">{t("successStories.story1.metric1.label")}</span>
                      <span className="font-bold text-green-600">{t("successStories.story1.metric1.value")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">{t("successStories.story1.metric2.label")}</span>
                      <span className="font-bold text-blue-600">{t("successStories.story1.metric2.value")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">{t("successStories.story1.metric3.label")}</span>
                      <span className="font-bold text-purple-600">{t("successStories.story1.metric3.value")}</span>
                    </div>
                  </div>
                  <p className="text-slate-600 mt-4 italic">{t("successStories.story1.quote")}</p>
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-8 text-white">
                  <h4 className="font-bold mb-4">{t("successStories.story1.strategy.title")}</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• {t("successStories.story1.strategy.point1")}</li>
                    <li>• {t("successStories.story1.strategy.point2")}</li>
                    <li>• {t("successStories.story1.strategy.point3")}</li>
                    <li>• {t("successStories.story1.strategy.point4")}</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="border-0 shadow-xl overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="p-8">
                  <div className="flex items-center mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{t("successStories.story2.name")}</h3>
                      <p className="text-slate-600">{t("successStories.story2.role")}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-slate-600">{t("successStories.story2.metric1.label")}</span>
                      <span className="font-bold text-green-600">{t("successStories.story2.metric1.value")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">{t("successStories.story2.metric2.label")}</span>
                      <span className="font-bold text-blue-600">{t("successStories.story2.metric2.value")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">{t("successStories.story2.metric3.label")}</span>
                      <span className="font-bold text-purple-600">{t("successStories.story2.metric3.value")}</span>
                    </div>
                  </div>
                  <p className="text-slate-600 mt-4 italic">{t("successStories.story2.quote")}</p>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-8 text-white">
                  <h4 className="font-bold mb-4">{t("successStories.story2.strategy.title")}</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• {t("successStories.story2.strategy.point1")}</li>
                    <li>• {t("successStories.story2.strategy.point2")}</li>
                    <li>• {t("successStories.story2.strategy.point3")}</li>
                    <li>• {t("successStories.story2.strategy.point4")}</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{t("faq.title")}</h2>
            <p className="text-xl text-slate-600">{t("faq.subtitle")}</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">{t("faq.question1.title")}</h3>
                <p className="text-slate-600">{t("faq.question1.answer")}</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">{t("faq.question2.title")}</h3>
                <p className="text-slate-600">{t("faq.question2.answer")}</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">{t("faq.question3.title")}</h3>
                <p className="text-slate-600">{t("faq.question3.answer")}</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">{t("faq.question4.title")}</h3>
                <p className="text-slate-600">{t("faq.question4.answer")}</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">{t("faq.question5.title")}</h3>
                <p className="text-slate-600">{t("faq.question5.answer")}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">{t("aboutUs.title")}</h2>
              <p className="text-lg text-slate-600 mb-6">{t("aboutUs.description1")}</p>
              <p className="text-lg text-slate-600 mb-8">{t("aboutUs.description2")}</p>

              <h3 className="text-2xl font-semibold mb-4">{t("aboutUs.vision.title")}</h3>
              <p className="text-slate-600">{t("aboutUs.vision.description")}</p>
            </div>

            <div className="relative">
              <Image
                src="/assets/images/nosotros.webp"
                alt={t("aboutUs.teamAlt")}
                width={600}
                height={500}
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">AIProApply</span>
              </div>
              <p className="text-slate-400">{t("footer.description")}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{t("footer.product.title")}</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {t("footer.product.features")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {t("footer.product.pricing")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {t("footer.product.demo")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{t("footer.company.title")}</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {t("footer.company.about")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {t("footer.company.blog")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {t("footer.company.careers")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {t("footer.company.press")}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{t("footer.support.title")}</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {t("footer.support.helpCenter")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {t("footer.support.contact")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {t("footer.support.systemStatus")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {t("footer.support.terms")}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2025 AIProApply. {t("footer.copyright")}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
