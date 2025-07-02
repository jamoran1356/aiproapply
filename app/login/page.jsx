"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Zap, Mail, Lock, User, ArrowRight, CheckCircle } from "lucide-react"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    // Simular login
    setTimeout(() => {
      window.location.href = "/dashboard"
    }, 1500)
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    // Simular registro
    setTimeout(() => {
      window.location.href = "/dashboard"
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Lado izquierdo - Información */}
        <div className="space-y-8">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AIProApply
            </span>
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Tu Agente IA está listo para
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                cazar trabajos
              </span>
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed">
              Únete a más de 10,000 freelancers que han automatizado su búsqueda de empleos y triplicado sus ingresos.
            </p>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <span className="text-gray-700">Búsqueda automática 24/7 en 8+ plataformas</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <span className="text-gray-700">Propuestas personalizadas generadas por IA</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <span className="text-gray-700">Seguimiento y negociación automática</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <span className="text-gray-700">Análisis de competencia en tiempo real</span>
              </div>
            </div>
          </div>

          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-blue-600">85%</p>
                <p className="text-sm text-gray-600">Tasa de respuesta</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">3.2x</p>
                <p className="text-sm text-gray-600">Más proyectos</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600">15h</p>
                <p className="text-sm text-gray-600">Ahorradas/semana</p>
              </div>
            </div>
          </div>
        </div>

        {/* Lado derecho - Formularios */}
        <div className="w-full max-w-md mx-auto">
          <Card className="border-0 shadow-2xl">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl">Comienza Gratis</CardTitle>
              <CardDescription>Configura tu agente IA en menos de 2 minutos</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="register" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="register">Registrarse</TabsTrigger>
                  <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
                </TabsList>

                <TabsContent value="register">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Nombre Completo</label>
                      <div className="relative">
                        <User className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                        <Input className="pl-10" placeholder="Tu nombre completo" required />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Email</label>
                      <div className="relative">
                        <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                        <Input type="email" className="pl-10" placeholder="tu@email.com" required />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Contraseña</label>
                      <div className="relative">
                        <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                        <Input type="password" className="pl-10" placeholder="Mínimo 8 caracteres" required />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Especialidad</label>
                      <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                        <option>Desarrollo Web</option>
                        <option>Diseño UI/UX</option>
                        <option>Marketing Digital</option>
                        <option>Redacción</option>
                        <option>Traducción</option>
                        <option>Consultoría</option>
                        <option>Otro</option>
                      </select>
                    </div>

                    <Button
                      type="submit"
                      className="w-full text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        "Configurando tu agente..."
                      ) : (
                        <>
                          Crear mi Agente IA
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-gray-600 text-center">
                      Al registrarte, aceptas nuestros términos y condiciones
                    </p>
                  </form>
                </TabsContent>

                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Email</label>
                      <div className="relative">
                        <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                        <Input type="email" className="pl-10" placeholder="tu@email.com" required />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Contraseña</label>
                      <div className="relative">
                        <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                        <Input type="password" className="pl-10" placeholder="Tu contraseña" required />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm text-gray-600">Recordarme</span>
                      </label>
                      <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
                        ¿Olvidaste tu contraseña?
                      </a>
                    </div>

                    <Button
                      type="submit"
                      className="w-full text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        "Accediendo..."
                      ) : (
                        <>
                          Acceder al Dashboard
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-center text-sm text-gray-600 mb-4">O continúa con:</p>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="w-full bg-transparent">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Google
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Facebook
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <p className="text-center text-sm text-gray-600 mt-6">
            <a href="/" className="text-blue-600 hover:text-blue-800">
              ← Volver al sitio principal
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
