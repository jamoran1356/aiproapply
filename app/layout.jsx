import { Inter } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/hooks/useLanguage"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "AIProApply - Caza trabajos con tu Agente IA",
  description:
    "Automatiza tu búsqueda de empleos freelance con inteligencia artificial. Genera propuestas personalizadas y maximiza tus oportunidades.",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
