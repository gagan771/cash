import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next"
import { MainNav } from "@/components/nav-menu" 
import { ModeToggle } from "@/components/mode-toggle"
import { InteractiveGrid } from "@/components/ui/interactive-grid" // Import the MainNav component
import { Particles } from "@/components/particles"
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Magic UI - Beautiful UI Components",
  description:
    "A beautiful combination of interactive patterns, animations, and components for building modern web applications.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <InteractiveGrid />
        <Particles className="absolute inset-0 -z-10 animate-fade-in" quantity={400} />
        <MainNav />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ModeToggle />  
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'